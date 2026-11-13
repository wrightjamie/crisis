const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let dbInstance = null;

function getDatabasePath() {
    return process.env.DB_PATH || path.join(__dirname, '..', '..', 'data', 'crisis.db');
}

function initDatabase(customPath = null) {
    const dbPath = customPath || getDatabasePath();

    if (dbPath !== ':memory:') {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

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
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

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
        dbInstance.close();
        dbInstance = null;
    }
}

module.exports = {
    initDatabase,
    getDb,
    closeDb,
    getDatabasePath
};
