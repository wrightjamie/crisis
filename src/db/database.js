const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let dbInstance = null;

function getDatabasePath() {
    return process.env.DB_PATH || path.join(__dirname, '..', '..', 'data', 'crisis.db');
}

function removeWalFiles(dbPath) {
    if (!dbPath || dbPath === ':memory:') return;
    for (const suffix of ['-wal', '-shm']) {
        const file = `${dbPath}${suffix}`;
        if (fs.existsSync(file)) {
            try {
                fs.unlinkSync(file);
            } catch {}
        }
    }
}

function openValidatedDatabase(dbPath) {
    if (dbPath === ':memory:') {
        return new Database(dbPath);
    }

    // If main DB file was replaced by git pull while older -wal/-shm files remained on disk,
    // SQLite can report 'database disk image is malformed'. Detect and recover automatically.
    const tryOpen = () => {
        const candidate = new Database(dbPath);
        const check = candidate.pragma('quick_check', { simple: true });
        if (check !== 'ok') {
            candidate.close();
            throw new Error(`SQLite quick_check failed: ${check}`);
        }
        return candidate;
    };

    try {
        return tryOpen();
    } catch (firstErr) {
        console.warn(`SQLite open/check warning on ${dbPath} (${firstErr.message}). Removing stale WAL/SHM journal files...`);
        removeWalFiles(dbPath);
        try {
            return tryOpen();
        } catch (secondErr) {
            console.warn(`SQLite database file ${dbPath} is corrupted (${secondErr.message}). Recreating clean database...`);
            try {
                if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
            } catch {}
            removeWalFiles(dbPath);
            return new Database(dbPath);
        }
    }
}

function initDatabase(customPath = null) {
    const dbPath = customPath || getDatabasePath();

    if (dbPath !== ':memory:') {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    const db = openValidatedDatabase(dbPath);
    try {
        db.pragma('journal_mode = WAL');
    } catch (err) {
        // Fallback if WAL shared-memory mapping is restricted by the environment
    }
    db.pragma('foreign_keys = ON');
    db.pragma('busy_timeout = 5000');

    // Create system_config table (stores admin auth credentials & system parameters)
    db.exec(`
        CREATE TABLE IF NOT EXISTS system_config (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create active_sessions table
    db.exec(`
        CREATE TABLE IF NOT EXISTS active_sessions (
            token TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            expires_at DATETIME NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_sessions_expires ON active_sessions(expires_at);
    `);

    // Create images table
    db.exec(`
        CREATE TABLE IF NOT EXISTS images (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            hash TEXT NOT NULL,
            title TEXT,
            description TEXT,
            tags TEXT,
            is_base INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_images_hash ON images(hash);
    `);

    // Create scenarios table
    db.exec(`
        CREATE TABLE IF NOT EXISTS scenarios (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            is_builtin INTEGER DEFAULT 0,
            guide_html TEXT,
            data TEXT NOT NULL,
            draft_data TEXT,
            has_draft INTEGER DEFAULT 0,
            status TEXT DEFAULT 'published',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Migrate existing scenarios table if draft columns are missing
    const cols = db.prepare(`PRAGMA table_info(scenarios)`).all().map(c => c.name);
    if (!cols.includes('draft_data')) {
        db.exec(`ALTER TABLE scenarios ADD COLUMN draft_data TEXT;`);
    }
    if (!cols.includes('has_draft')) {
        db.exec(`ALTER TABLE scenarios ADD COLUMN has_draft INTEGER DEFAULT 0;`);
    }
    if (!cols.includes('status')) {
        db.exec(`ALTER TABLE scenarios ADD COLUMN status TEXT DEFAULT 'published';`);
    }
    db.exec(`UPDATE scenarios SET draft_data = data WHERE draft_data IS NULL;`);

    // Create scenario_images junction table
    db.exec(`
        CREATE TABLE IF NOT EXISTS scenario_images (
            scenario_id TEXT NOT NULL,
            image_id TEXT NOT NULL,
            PRIMARY KEY (scenario_id, image_id),
            FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
            FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_scenario_images_image_id ON scenario_images(image_id);
    `);

    dbInstance = db;
    return db;
}

function getDb() {
    if (!dbInstance) {
        return initDatabase();
    }
    return dbInstance;
}

function closeDb() {
    if (dbInstance) {
        try {
            dbInstance.close();
        } catch {}
        dbInstance = null;
    }
}

function resetDatabase(customPath = null) {
    const dbPath = customPath || getDatabasePath();
    closeDb();
    if (dbPath && dbPath !== ':memory:') {
        removeWalFiles(dbPath);
        if (fs.existsSync(dbPath)) {
            try {
                fs.unlinkSync(dbPath);
            } catch {}
        }
        removeWalFiles(dbPath);
    }
    return initDatabase(dbPath);
}

module.exports = {
    initDatabase,
    getDb,
    closeDb,
    resetDatabase,
    getDatabasePath
};
