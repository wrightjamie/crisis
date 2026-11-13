/**
 * Export All Scenarios CLI
 * Exports all scenarios from SQLite (crisis.db) into self-contained .zip archives
 * in the scenarios/ directory (including scenario.json, guide.html, and all images).
 */

const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');
const { getDb } = require('../src/db/database');
const imageService = require('../src/db/image-service');
const scenarioService = require('../src/db/scenario-service');

function exportAll() {
    const targetDir = path.join(__dirname, '..', 'scenarios');
    console.log(`📦 Exporting all scenarios to: ${targetDir}`);

    const results = scenarioService.exportAllScenarios(targetDir);
    console.log(`\nSuccessfully exported ${results.length} scenarios:`);
    console.log('------------------------------------------------------------');

    let totalImages = 0;
    let totalBytes = 0;

    for (const r of results) {
        const zip = new AdmZip(r.path);
        const entries = zip.getEntries();
        const imageEntries = entries.filter(e => e.entryName.startsWith('images/'));
        const hasGuide = entries.some(e => e.entryName === 'guide.html');
        const sizeKb = (r.sizeBytes / 1024).toFixed(1);

        totalImages += imageEntries.length;
        totalBytes += r.sizeBytes;

        console.log(`• [${r.id}] "${r.name}"`);
        console.log(`   Size: ${sizeKb} KB | Images: ${imageEntries.length} | Guide: ${hasGuide ? 'Yes' : 'No'}`);
    }

    console.log('------------------------------------------------------------');
    console.log(`Total: ${results.length} scenarios, ${totalImages} images bundled, ${(totalBytes / (1024 * 1024)).toFixed(2)} MB total.`);
}

if (require.main === module) {
    try {
        exportAll();
    } catch (err) {
        console.error('❌ Export failed:', err);
        process.exit(1);
    }
}

module.exports = { exportAll };
