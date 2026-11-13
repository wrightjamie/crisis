#!/usr/bin/env node
const readline = require('readline');
const accessControl = require('../src/auth/access-control');

function parseArgs() {
    const args = process.argv.slice(2);
    let password = null;
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--password' || args[i] === '-p') {
            password = args[i + 1];
            i++;
        }
    }
    if (!password && process.env.ADMIN_PASSWORD) {
        password = process.env.ADMIN_PASSWORD;
    }
    return password;
}

async function promptPassword() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter new admin password: ', (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function main() {
    try {
        let password = parseArgs();
        if (!password) {
            password = await promptPassword();
        }

        if (!password) {
            console.error('Error: Password cannot be empty.');
            process.exit(1);
        }

        accessControl.setAdminPassword(password);
        console.log('✅ Admin password updated successfully in SQLite database.');
    } catch (err) {
        console.error('Failed to set admin password:', err.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
