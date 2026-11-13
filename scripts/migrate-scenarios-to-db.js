#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { initDatabase } = require('../src/db/database');
const imageService = require('../src/db/image-service');
const scenarioService = require('../src/db/scenario-service');

async function migrate() {
    console.log('🚀 Starting Crisis Wargame SQLite migration...');

    // 1. Initialize SQLite Database
    initDatabase();

    // 2. Seed Base Images from Shared Image Library
    console.log('📦 Seeding base image library into SQLite...');
    const seededCount = imageService.seedBaseImages();
    console.log(`✅ Seeded ${seededCount} base images with SHA-256 hashes.`);

    // 3. Scan and import scenarios
    const portableScenariosDir = path.join(__dirname, '..', 'scenarios');
    const legacyScenariosDir = path.join(__dirname, '..', 'data', 'scenarios');
    let migratedCount = 0;

    if (fs.existsSync(portableScenariosDir)) {
        const zipFiles = fs.readdirSync(portableScenariosDir).filter(f => f.endsWith('.zip'));
        if (zipFiles.length > 0) {
            console.log(`📦 Found ${zipFiles.length} portable scenario ZIP packages in scenarios/`);
            for (const file of zipFiles) {
                const zipPath = path.join(portableScenariosDir, file);
                try {
                    console.log(`\nImporting package: '${file}'...`);
                    const zipBuffer = fs.readFileSync(zipPath);
                    const result = scenarioService.importScenarioZip(zipBuffer, { overwrite: true });
                    console.log(`  ✅ Imported scenario: ${result.name} (${result.id}) [Guide: ${result.hasGuide ? 'Yes' : 'No'}]`);
                    migratedCount++;
                } catch (err) {
                    console.error(`  ❌ Error importing ${file}:`, err.message);
                }
            }
        }
    }

    // Fallback to legacy data/scenarios if no portable ZIPs were found
    if (migratedCount === 0 && fs.existsSync(legacyScenariosDir)) {
        console.log(`🔍 No portable ZIPs imported. Scanning legacy scenarios in data/scenarios/...`);
        const dirents = fs.readdirSync(legacyScenariosDir, { withFileTypes: true });

        for (const dirent of dirents) {
            if (!dirent.isDirectory()) continue;
            const scenarioFolder = path.join(legacyScenariosDir, dirent.name);
            const scenarioJsPath = path.join(scenarioFolder, 'scenario.js');

            if (!fs.existsSync(scenarioJsPath)) continue;

            try {
                console.log(`\nImporting scenario: '${dirent.name}'...`);
                delete require.cache[require.resolve(scenarioJsPath)];
                const scenario = require(scenarioJsPath);

                const guidePath = path.join(scenarioFolder, 'guide.html');
                let guideHtml = null;
                if (fs.existsSync(guidePath)) {
                    guideHtml = fs.readFileSync(guidePath, 'utf8');
                    console.log(`  - Found instructor guide (${guideHtml.length} bytes)`);
                }

                const acronymsPath = path.join(scenarioFolder, 'acronyms.json');
                if (fs.existsSync(acronymsPath)) {
                    try {
                        const acronymsRaw = fs.readFileSync(acronymsPath, 'utf8');
                        scenario.acronyms = JSON.parse(acronymsRaw);
                        console.log(`  - Loaded ${Object.keys(scenario.acronyms).length} acronyms`);
                    } catch (e) {
                        console.warn(`  - Warning: Failed to parse acronyms: ${e.message}`);
                    }
                }

                const wikiPath = path.join(scenarioFolder, 'wiki.md');
                if (fs.existsSync(wikiPath)) {
                    scenario.wiki = fs.readFileSync(wikiPath, 'utf8');
                    console.log(`  - Loaded wiki notes`);
                }

                scenarioService.saveScenario(scenario, {
                    guideHtml,
                    isBuiltin: 1,
                    force: true
                });

                migratedCount++;
            } catch (err) {
                console.error(`❌ Error migrating scenario '${dirent.name}':`, err.message);
            }
        }
    }

    console.log(`\n🎉 Successfully migrated ${migratedCount} scenarios into SQLite database.`);
    console.log(`📁 Portable scenario packages in: ${portableScenariosDir}`);
}

if (require.main === module) {
    migrate().catch(err => {
        console.error('Migration failed:', err);
        process.exit(1);
    });
}

module.exports = migrate;
