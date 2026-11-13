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

    // 3. Scan existing scenarios in data/scenarios/
    const scenariosDir = path.join(__dirname, '..', 'data', 'scenarios');
    const archiveDir = path.join(__dirname, '..', 'data', 'scenarios_archive');
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
    }

    if (!fs.existsSync(scenariosDir)) {
        console.error(`Scenarios directory not found at ${scenariosDir}`);
        process.exit(1);
    }

    const dirents = fs.readdirSync(scenariosDir, { withFileTypes: true });
    let migratedCount = 0;

    for (const dirent of dirents) {
        if (!dirent.isDirectory()) continue;
        const scenarioFolder = path.join(scenariosDir, dirent.name);
        const scenarioJsPath = path.join(scenarioFolder, 'scenario.js');

        if (!fs.existsSync(scenarioJsPath)) continue;

        try {
            console.log(`\nImporting scenario: '${dirent.name}'...`);
            // Load scenario definition
            delete require.cache[require.resolve(scenarioJsPath)];
            const scenario = require(scenarioJsPath);

            // Load optional guide.html
            const guidePath = path.join(scenarioFolder, 'guide.html');
            let guideHtml = null;
            if (fs.existsSync(guidePath)) {
                guideHtml = fs.readFileSync(guidePath, 'utf8');
                console.log(`  - Found instructor guide (${guideHtml.length} bytes)`);
            }

            // Load optional acronyms.json
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

            // Load optional wiki.md
            const wikiPath = path.join(scenarioFolder, 'wiki.md');
            if (fs.existsSync(wikiPath)) {
                scenario.wiki = fs.readFileSync(wikiPath, 'utf8');
                console.log(`  - Loaded wiki notes`);
            }

            // Save to SQLite
            scenarioService.saveScenario(scenario, {
                guideHtml,
                isBuiltin: 1,
                force: true
            });

            // Export backup .zip package to scenarios_archive
            const zipBuffer = scenarioService.exportScenarioZip(scenario.id);
            const archiveZipPath = path.join(archiveDir, `${scenario.id}.zip`);
            fs.writeFileSync(archiveZipPath, zipBuffer);
            console.log(`  - Exported standalone ZIP archive to: ${archiveZipPath}`);

            migratedCount++;
        } catch (err) {
            console.error(`❌ Error migrating scenario '${dirent.name}':`, err.message);
        }
    }

    console.log(`\n🎉 Successfully migrated ${migratedCount} scenarios into SQLite database.`);
    console.log(`📁 Scenario packages archived in: ${archiveDir}`);
}

if (require.main === module) {
    migrate().catch(err => {
        console.error('Migration failed:', err);
        process.exit(1);
    });
}

module.exports = migrate;
