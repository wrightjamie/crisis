const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { getDb, getDatabasePath } = require('../db/database');

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const RECOVERY_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Unambiguous uppercase chars

function hashPassword(password, salt) {
    return crypto.scryptSync(password, salt, 64).toString('hex');
}

function safeCompareStrings(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    const bufA = Buffer.from(a, 'utf8');
    const bufB = Buffer.from(b, 'utf8');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

class AccessControl {
    constructor(dbProvider = getDb, options = {}) {
        this.getDb = dbProvider;
        this.isDefaultDb = dbProvider === getDb;
        this.backupAuthPath = options.backupAuthPath || path.join(path.dirname(getDatabasePath()), '.admin-auth.json');
        this.recoveryCodePath = options.recoveryCodePath || path.join(path.dirname(getDatabasePath()), 'recovery-code.txt');
        this.activeRecoveryCode = null;
    }

    _shouldUseDiskFiles() {
        if (!this.isDefaultDb) return false;
        try {
            const db = this.getDb();
            return Boolean(db && !db.memory);
        } catch {
            return false;
        }
    }

    setAdminPassword(newPassword, { persistBackup = true } = {}) {
        if (!newPassword || typeof newPassword !== 'string' || newPassword.trim().length === 0) {
            throw new Error('Password must be a non-empty string');
        }
        const db = this.getDb();
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = hashPassword(newPassword, salt);
        const authData = JSON.stringify({
            username: 'admin',
            salt,
            hash,
            updatedAt: new Date().toISOString()
        });

        const stmt = db.prepare(`
            INSERT INTO system_config (key, value, updated_at)
            VALUES ('admin_auth', ?, CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
        `);
        stmt.run(authData);

        if (persistBackup && this._shouldUseDiskFiles()) {
            try {
                const dir = path.dirname(this.backupAuthPath);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(this.backupAuthPath, authData, { encoding: 'utf8', mode: 0o600 });
            } catch {}
        }
        return true;
    }

    restorePersistedAdminAuth() {
        if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length > 0) {
            this.setAdminPassword(process.env.ADMIN_PASSWORD.trim(), { persistBackup: true });
            return { restored: true, source: 'env' };
        }

        if (!this._shouldUseDiskFiles()) {
            return { restored: false, source: null };
        }

        if (fs.existsSync(this.backupAuthPath)) {
            try {
                const raw = fs.readFileSync(this.backupAuthPath, 'utf8').trim();
                const parsed = JSON.parse(raw);
                if (parsed && parsed.salt && parsed.hash) {
                    const db = this.getDb();
                    db.prepare(`
                        INSERT INTO system_config (key, value, updated_at)
                        VALUES ('admin_auth', ?, CURRENT_TIMESTAMP)
                        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
                    `).run(JSON.stringify(parsed));
                    return { restored: true, source: 'backup_file' };
                }
            } catch {}
        }
        return { restored: false, source: null };
    }

    generateRecoveryCode({ logToConsole = true } = {}) {
        const bytes = crypto.randomBytes(8);
        let chars = '';
        for (let i = 0; i < 8; i++) {
            chars += RECOVERY_ALPHABET[bytes[i] % RECOVERY_ALPHABET.length];
        }
        const formatted = `${chars.slice(0, 4)}-${chars.slice(4, 8)}`;
        this.activeRecoveryCode = formatted;

        if (this._shouldUseDiskFiles()) {
            try {
                const dir = path.dirname(this.recoveryCodePath);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(
                    this.recoveryCodePath,
                    `CRISIS SERVER RECOVERY CODE: ${formatted}\nGenerated: ${new Date().toISOString()}\nUse this code at /reset or /reset.php to reset the admin password or rebuild the database.\n`,
                    { encoding: 'utf8', mode: 0o600 }
                );
            } catch {}
        }

        if (logToConsole) {
            console.log('============================================================');
            console.log(`🔐 CRISIS SERVER RECOVERY CODE: ${formatted}`);
            console.log('   Use this code at /reset (or /reset.php) to reset password or refresh DB.');
            console.log('   (Also saved to data/recovery-code.txt)');
            console.log('============================================================');
        }
        return formatted;
    }

    getActiveRecoveryCode() {
        if (this._shouldUseDiskFiles() && fs.existsSync(this.recoveryCodePath)) {
            try {
                const content = fs.readFileSync(this.recoveryCodePath, 'utf8');
                const match = content.match(/([23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4})/);
                if (match) {
                    this.activeRecoveryCode = match[1];
                    return this.activeRecoveryCode;
                }
            } catch {}
        }
        if (!this.activeRecoveryCode) {
            return this.generateRecoveryCode({ logToConsole: false });
        }
        return this.activeRecoveryCode;
    }

    _verifyPasswordRaw(password) {
        if (!password || typeof password !== 'string') return false;
        const db = this.getDb();
        const row = db.prepare(`SELECT value FROM system_config WHERE key = 'admin_auth'`).get();
        if (!row) return false;
        try {
            const authData = JSON.parse(row.value);
            const computedHash = hashPassword(password, authData.salt);
            const bufA = Buffer.from(computedHash, 'hex');
            const bufB = Buffer.from(authData.hash, 'hex');
            return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
        } catch {
            return false;
        }
    }

    verifyResetAuthorization({ token = null, currentPassword = null, recoveryKey = null } = {}) {
        // 1. If no admin password has been configured yet (fresh/wiped DB), allow initial setup
        if (!this.hasAdminPassword()) {
            return { authorized: true, method: 'initial_setup' };
        }

        // 2. Valid active admin session token
        if (token) {
            const session = this.verifySession(token);
            if (session.authenticated && this.checkCapability(session.user, 'admin')) {
                return { authorized: true, method: 'session' };
            }
        }

        const candidateSecret = (recoveryKey || currentPassword || '').trim();
        if (!candidateSecret) {
            return {
                authorized: false,
                error: 'Recovery code or current admin password is required.'
            };
        }

        // 3. Matches current admin password
        if (this._verifyPasswordRaw(candidateSecret) || (currentPassword && this._verifyPasswordRaw(currentPassword))) {
            return { authorized: true, method: 'password' };
        }

        // 4. Matches configured environment secret (RESET_SECRET / ADMIN_RESET_KEY / ADMIN_PASSWORD)
        const envSecrets = [
            process.env.RESET_SECRET,
            process.env.ADMIN_RESET_KEY,
            process.env.ADMIN_PASSWORD
        ].filter(s => typeof s === 'string' && s.trim().length > 0).map(s => s.trim());

        for (const envSecret of envSecrets) {
            if (safeCompareStrings(candidateSecret, envSecret)) {
                return { authorized: true, method: 'env_secret' };
            }
        }

        // 5. Matches active one-time recovery code (case/hyphen-insensitive)
        const activeCode = this.getActiveRecoveryCode();
        const normCandidate = candidateSecret.toUpperCase().replace(/[\s-]/g, '');
        const normActive = String(activeCode || '').toUpperCase().replace(/[\s-]/g, '');
        if (normActive.length > 0 && safeCompareStrings(normCandidate, normActive)) {
            // Rotate one-time code after successful authorization
            this.generateRecoveryCode({ logToConsole: true });
            return { authorized: true, method: 'recovery_code' };
        }

        return {
            authorized: false,
            error: 'Invalid recovery code or admin password. Check server logs (or data/recovery-code.txt) for the active recovery code.'
        };
    }

    clearAllSessions() {
        const db = this.getDb();
        db.prepare(`DELETE FROM active_sessions`).run();
    }

    createAdminSession() {
        const db = this.getDb();
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
        db.prepare(`
            INSERT INTO active_sessions (token, username, expires_at)
            VALUES (?, 'admin', ?)
        `).run(token, expiresAt);
        return token;
    }

    hasAdminPassword() {
        const db = this.getDb();
        const row = db.prepare(`SELECT value FROM system_config WHERE key = 'admin_auth'`).get();
        return !!row;
    }

    authenticate({ username, password }) {
        if (!username || !password) {
            return { success: false, error: 'Username and password are required' };
        }

        const normalizedUser = username.trim().toLowerCase();
        if (normalizedUser !== 'admin') {
            return { success: false, error: 'Invalid credentials' };
        }

        const db = this.getDb();
        let row = db.prepare(`SELECT value FROM system_config WHERE key = 'admin_auth'`).get();
        if (!row) {
            this.restorePersistedAdminAuth();
            row = db.prepare(`SELECT value FROM system_config WHERE key = 'admin_auth'`).get();
        }
        if (!row) {
            return { success: false, error: 'Admin password has not been configured yet' };
        }

        try {
            if (!this._verifyPasswordRaw(password)) {
                // If git pull replaced crisis.db with an older hash, try restoring from local backup or env
                const restored = this.restorePersistedAdminAuth();
                if (!restored.restored || !this._verifyPasswordRaw(password)) {
                    return { success: false, error: 'Invalid credentials' };
                }
            }

            const token = this.createAdminSession();

            return {
                success: true,
                token,
                user: {
                    username: 'admin',
                    role: 'admin',
                    capabilities: ['admin', 'facilitator']
                }
            };
        } catch (err) {
            return { success: false, error: 'Authentication failed: ' + err.message };
        }
    }

    verifySession(token) {
        if (!token || typeof token !== 'string') {
            return { authenticated: false, error: 'No token provided' };
        }

        const db = this.getDb();
        const session = db.prepare(`
            SELECT token, username, expires_at FROM active_sessions WHERE token = ?
        `).get(token);

        if (!session) {
            return { authenticated: false, error: 'Invalid or expired session' };
        }

        if (new Date(session.expires_at) < new Date()) {
            db.prepare(`DELETE FROM active_sessions WHERE token = ?`).run(token);
            return { authenticated: false, error: 'Session expired' };
        }

        return {
            authenticated: true,
            user: {
                username: session.username,
                role: 'admin',
                capabilities: ['admin', 'facilitator']
            }
        };
    }

    invalidateSession(token) {
        if (!token) return false;
        const db = this.getDb();
        const result = db.prepare(`DELETE FROM active_sessions WHERE token = ?`).run(token);
        return result.changes > 0;
    }

    checkCapability(user, capability) {
        if (!user || !user.username) return false;
        // For now, the admin user has all capabilities (admin, facilitator, etc.)
        if (user.username === 'admin' || user.role === 'admin') {
            return true;
        }
        return false;
    }

    extractToken(req) {
        if (!req) return null;
        if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            return req.headers.authorization.substring(7).trim();
        }
        if (req.query && req.query.token) {
            return req.query.token;
        }
        if (req.body && req.body.token) {
            return req.body.token;
        }
        if (req.headers && req.headers.cookie) {
            const match = req.headers.cookie.match(/(?:^|;\s*)auth_token=([^;]+)/);
            if (match) return match[1];
        }
        return null;
    }

    verifyRequest(req) {
        return this.verifySession(this.extractToken(req));
    }

    requireAuth(capability = 'admin') {
        return (req, res, next) => {
            const token = this.extractToken(req);
            const result = this.verifySession(token);
            if (!result.authenticated) {
                if (req.accepts('html') && !req.xhr && !req.path.startsWith('/api/')) {
                    return res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
                }
                return res.status(401).json({ error: 'Unauthorized: ' + result.error });
            }

            if (!this.checkCapability(result.user, capability)) {
                return res.status(403).json({ error: `Forbidden: requires capability '${capability}'` });
            }

            req.user = result.user;
            req.authToken = token;
            next();
        };
    }
}

const defaultInstance = new AccessControl();

module.exports = defaultInstance;
module.exports.AccessControl = AccessControl;
