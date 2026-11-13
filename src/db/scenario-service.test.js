const assert = require('assert');
const path = require('path');
const AdmZip = require('adm-zip');
const { initDatabase, closeDb } = require('./database');
const { ImageService, computeBufferHash } = require('./image-service');
const { ScenarioService } = require('./scenario-service');

function runTests() {
    console.log("Running Scenario Service unit tests...");

    const testDb = initDatabase(':memory:');
    const imageService = new ImageService(() => testDb);
    const scenarioService = new ScenarioService(() => testDb, imageService);

    // Register a base image
    const baseHash = computeBufferHash(Buffer.from('base_pixel_bytes'));
    imageService.registerImage({
        id: 'base_jet',
        filename: '/images/library/base_jet.png',
        hash: baseHash,
        title: 'Fighter Jet',
        tags: ['military'],
        isBase: 1
    });

    const mockScenario = {
        id: 'test_mission',
        name: 'Operation Northern Light',
        description: 'A tactical crisis response simulation.',
        roles: ['defence', 'foreign'],
        roleNames: {
            defence: 'Ministry of Defence',
            foreign: 'Foreign Office'
        },
        mapConfig: {
            center: [55.0, -3.0],
            zoom: 6
        },
        initialScores: {
            readiness: 70
        },
        assets: [
            { id: 'jet_1', name: 'Eurofighter Typhoon', location: [55.1, -3.1], state: 'operational', imageId: 'base_jet' }
        ],
        eventTemplates: [
            {
                id: 'evt_radar',
                name: 'Unidentified Radar Track',
                title: 'Unidentified Radar Track',
                location: [56.0, -2.0],
                roleDescriptions: { defence: 'Radar contact' }
            }
        ]
    };

    // 1. Save built-in scenario
    const saved = scenarioService.saveScenario(mockScenario, {
        guideHtml: '<h1>Instructor Guide</h1>',
        isBuiltin: 1
    });
    assert.strictEqual(saved.id, 'test_mission');
    assert.strictEqual(saved.name, 'Operation Northern Light');
    assert.strictEqual(saved.guideUrl, '/scenarios/test_mission/guide.html');

    // 2. List scenarios
    const list = scenarioService.listScenarios();
    assert.strictEqual(list.length, 1);
    assert.strictEqual(list[0].id, 'test_mission');
    assert.strictEqual(list[0].isBuiltin, true);
    assert.strictEqual(list[0].hasGuide, true);

    // 3. Export to ZIP
    const zipBuffer = scenarioService.exportScenarioZip('test_mission');
    assert.ok(Buffer.isBuffer(zipBuffer), 'Should return zip buffer');

    const zip = new AdmZip(zipBuffer);
    assert.ok(zip.getEntry('scenario.json'), 'Zip must contain scenario.json');
    assert.ok(zip.getEntry('guide.html'), 'Zip must contain guide.html');

    const exportedScenario = JSON.parse(zip.getEntry('scenario.json').getData().toString('utf8'));
    assert.strictEqual(exportedScenario.id, 'test_mission');

    // 4. Test conflict handling on import (overwrite = false)
    const conflictResult = scenarioService.importScenarioZip(zipBuffer, { overwrite: false });
    assert.strictEqual(conflictResult.conflict, true, 'Should detect conflict when scenario already exists');

    // 5. Test overwrite on import
    const overwriteResult = scenarioService.importScenarioZip(zipBuffer, { overwrite: true });
    assert.strictEqual(overwriteResult.success, true, 'Should overwrite when requested');

    // 6. Test delete built-in protection
    scenarioService.saveScenario({
        ...mockScenario,
        id: 'protected_builtin'
    }, { isBuiltin: 1 });

    assert.throws(() => {
        scenarioService.deleteScenario('protected_builtin', { force: false });
    }, /Cannot delete built-in system scenario/);

    // 7. Save custom scenario and delete it
    const customScenario = {
        ...mockScenario,
        id: 'custom_mission',
        name: 'Custom Mission'
    };
    scenarioService.saveScenario(customScenario, { isBuiltin: 0 });
    assert.strictEqual(scenarioService.listScenarios().length, 3);

    const deleteRes = scenarioService.deleteScenario('custom_mission');
    assert.strictEqual(deleteRes.success, true);
    assert.strictEqual(scenarioService.listScenarios().length, 2);

    closeDb();
    console.log("✅ Scenario Service unit tests passed successfully!");
}

if (require.main === module) {
    runTests();
}

module.exports = runTests;
