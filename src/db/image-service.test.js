const assert = require('assert');
const { initDatabase, closeDb } = require('./database');
const { ImageService, computeBufferHash } = require('./image-service');

function runTests() {
    console.log("Running Image Service unit tests...");

    const testDb = initDatabase(':memory:');
    const imageService = new ImageService(() => testDb);

    // 1. Register base image
    const hash1 = computeBufferHash(Buffer.from('fake_image_bytes_1'));
    imageService.registerImage({
        id: 'base_img_1',
        filename: '/images/library/base_img_1.png',
        hash: hash1,
        title: 'Base Image One',
        tags: ['military', 'aircraft'],
        isBase: 1
    });

    const foundBase = imageService.getImage('base_img_1');
    assert.ok(foundBase, 'Should find registered base image');
    assert.strictEqual(foundBase.is_base, 1);
    assert.strictEqual(foundBase.hash, hash1);

    // 2. Hash lookup
    const foundByHash = imageService.findImageByHash(hash1);
    assert.ok(foundByHash, 'Should find image by hash');
    assert.strictEqual(foundByHash.id, 'base_img_1');

    // 3. Register custom images
    const hash2 = computeBufferHash(Buffer.from('custom_image_bytes_2'));
    imageService.registerImage({
        id: 'custom_img_2',
        filename: '/images/custom/custom_img_2.png',
        hash: hash2,
        title: 'Custom Tank',
        tags: ['vehicle'],
        isBase: 0
    });

    const hash3 = computeBufferHash(Buffer.from('custom_image_bytes_3'));
    imageService.registerImage({
        id: 'custom_img_3',
        filename: '/images/custom/custom_img_3.png',
        hash: hash3,
        title: 'Custom Drone',
        tags: ['drone'],
        isBase: 0
    });

    // 4. Extract scenario images
    const mockScenario = {
        id: 'test_scen',
        assets: [
            { id: 'a1', imageId: 'base_img_1' },
            { id: 'a2', image: '/images/custom/custom_img_2.png' }
        ],
        eventTemplates: [
            { id: 'ev1', imageId: 'custom_img_3' }
        ]
    };

    const extracted = imageService.extractScenarioImageIds(mockScenario);
    assert.strictEqual(extracted.length, 3);
    assert.ok(extracted.includes('base_img_1'));
    assert.ok(extracted.includes('/images/custom/custom_img_2.png'));
    assert.ok(extracted.includes('custom_img_3'));

    // 5. Link scenario images
    testDb.prepare(`INSERT INTO scenarios (id, name, data) VALUES ('scen_A', 'Scenario A', '{}'), ('scen_B', 'Scenario B', '{}')`).run();
    imageService.linkScenarioImages('scen_A', extracted);
    const scenAImages = imageService.getScenarioImages('scen_A');
    assert.strictEqual(scenAImages.length, 3, 'Should have linked 3 images to scen_A');

    // Link custom_img_2 to scen_B as well
    imageService.linkScenarioImages('scen_B', ['custom_img_2']);

    // 6. Cleanup unused images when scen_A is deleted:
    // - base_img_1: should NOT be deleted (is_base = 1)
    // - custom_img_2: should NOT be deleted (still used by scen_B)
    // - custom_img_3: SHOULD be deleted (only used by scen_A)
    const deleted = imageService.cleanupUnusedImages('scen_A');
    assert.strictEqual(deleted.length, 1);
    assert.strictEqual(deleted[0], 'custom_img_3');

    assert.ok(imageService.getImage('base_img_1'), 'Base image should remain');
    assert.ok(imageService.getImage('custom_img_2'), 'Shared custom image should remain');
    assert.strictEqual(imageService.getImage('custom_img_3'), null, 'Unused custom image should be deleted');

    closeDb();
    console.log("✅ Image Service unit tests passed successfully!");
}

if (require.main === module) {
    runTests();
}

module.exports = runTests;
