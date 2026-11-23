#!/usr/bin/env node
const { resetDatabase, closeDb } = require('../src/db/database');
const accessControl = require('../src/auth/access-control');
const scenarioService = require('../src/db/scenario-service');

function parseArgs() {
    const args = process.argv.slice(2);
    let password = process.env.ADMIN_PASSWORD || null;
    let rebuild = false;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--password' || args[i] === '-p') {
            password = args[i + 1];
            i++;
        } else if (args[i] === '--rebuild' || args[i] === '--hard') {
            rebuild = true;
        }
    }
    return { password, rebuild };
}

function main() {
    try {
        const { password, rebuild } = parseArgs();

        if (rebuild) {
            console.log('Rebuilding SQLite database (removing crisis.db, -wal, -shm)...');
            resetDatabase();
        }

        if (password && password.trim().length > 0) {
            accessControl.setAdminPassword(password.trim(), { persistBackup: true });
            accessControl.clearAllSessions();
            console.log('✅ Admin password updated and persisted to data/.admin-auth.json.');
        } else {
            const restored = accessControl.restorePersistedAdminAuth();
            if (restored.restored) {
                console.log(`✅ Restored persisted admin password from ${restored.source}.`);
            }
        }

        const refreshed = scenarioService.refreshAllBuiltinScenarios();
        console.log(`✅ Synced ${refreshed.count} built-in scenario(s) and base images from disk into SQLite.`);
        accessControl.generateRecoveryCode({ logToConsole: true });
        closeDb();
    } catch (err) {
        console.error('Server reset failed:', err.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
