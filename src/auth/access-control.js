const crypto = require('crypto');
const { getDb } = require('../db/database');

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function hashPassword(password, salt) {
    return crypto.scryptSync(password, salt, 64).toString('hex');
}

class AccessControl {
    constructor(dbProvider = getDb) {
        this.getDb = dbProvider;
    }

    setAdminPassword(newPassword) {
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
        return true;
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
        const row = db.prepare(`SELECT value FROM system_config WHERE key = 'admin_auth'`).get();
        if (!row) {
            return { success: false, error: 'Admin password has not been configured yet' };
        }

        try {
            const authData = JSON.parse(row.value);
            const computedHash = hashPassword(password, authData.salt);
            const bufA = Buffer.from(computedHash, 'hex');
            const bufB = Buffer.from(authData.hash, 'hex');

            if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
                return { success: false, error: 'Invalid credentials' };
            }

            const token = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

            db.prepare(`
                INSERT INTO active_sessions (token, username, expires_at)
                VALUES (?, 'admin', ?)
            `).run(token, expiresAt);

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

    requireAuth(capability = 'admin') {
        return (req, res, next) => {
            let token = null;

            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
                token = req.headers.authorization.substring(7).trim();
            } else if (req.query && req.query.token) {
                token = req.query.token;
            } else if (req.headers.cookie) {
                const match = req.headers.cookie.match(/(?:^|;\s*)auth_token=([^;]+)/);
                if (match) token = match[1];
            }

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
