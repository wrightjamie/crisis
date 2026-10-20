const scenarios = require('../data/scenarios');
const { validateScenario, validateImageLibrary, validateAssets, validateImageReference } = require('./validate-scenarios');
const { getImage, getAllImages, getAllTags, resolveScenarioImages } = require('./image-library');

console.log("Running image library validation...");
const libResult = validateImageLibrary();
if (libResult.isValid) {
    console.log(`✅ Shared image library is valid (${getAllImages().length} images, ${getAllTags().length} unique tags).`);
} else {
    console.error("❌ Shared image library has validation errors:");
    libResult.errors.forEach(err => console.error(`   - ${err}`));
}

console.log("Running scenario validation tests...");

let allValid = libResult.isValid;

scenarios.forEach(scenario => {
    const result = validateScenario(scenario);
    if (result.isValid) {
        console.log(`✅ Scenario '${scenario.id || 'unknown'}' is valid.`);
    } else {
        console.error(`❌ Scenario '${scenario.id || 'unknown'}' has validation errors:`);
        result.errors.forEach(err => console.error(`   - ${err}`));
        allValid = false;
    }
});

// --- Unit tests for validation logic ---
const assert = require('assert');
const { validateBasicStructure, validateRoles, validateEventTemplates, validateManualActions, validateAiConfig } = require('./validate-scenarios');

console.log("Testing validateBasicStructure...");
let testScen = {};
let resultErrors = [];
validateBasicStructure(testScen, resultErrors);
assert.strictEqual(resultErrors.length, 3, "Should have 3 errors for missing id, name, description");

testScen = { id: 'test', name: 'Test', description: 'Desc' };
resultErrors = [];
validateBasicStructure(testScen, resultErrors);
assert.strictEqual(resultErrors.length, 0, "Should have 0 errors for valid basic structure");
console.log("✅ validateBasicStructure tests passed.");

console.log("Testing validateRoles...");
testScen = { roles: ['role1'], roleNames: { role2: 'Role 2' } };
resultErrors = [];
validateRoles(testScen, resultErrors);
assert.strictEqual(resultErrors.length, 1, "Should have error for missing roleName entry");
console.log("✅ validateRoles tests passed.");

console.log("Testing validateEventTemplates...");
testScen = {
    eventTemplates: [{
        id: 'test_event',
        name: 'Test',
        visibleTo: 'not_an_array', // Invalid
        conditions: { activeRoles: 'not_an_array' }, // Invalid
        decisions: [{
            options: [{
                conditions: { anyActiveRoles: 'not_an_array' } // Invalid
            }]
        }]
    }]
};
resultErrors = [];
validateEventTemplates(testScen, resultErrors);
assert.ok(resultErrors.some(e => e.includes("'visibleTo' must be an array")), "Should catch invalid visibleTo");
assert.ok(resultErrors.some(e => e.includes("'activeRoles' must be an array")), "Should catch invalid activeRoles in event");
assert.ok(resultErrors.some(e => e.includes("'anyActiveRoles' must be an array")), "Should catch invalid anyActiveRoles in decision option");
console.log("✅ validateEventTemplates tests passed.");

console.log("Testing validateManualActions...");
testScen = {
    manualActions: [{
        id: 'test_action',
        name: 'Test Action',
        initiator: ['home'],
        conditions: { activeRoles: 'string' } // Invalid
    }]
};
resultErrors = [];
validateManualActions(testScen, resultErrors);
assert.ok(resultErrors.some(e => e.includes("'activeRoles' must be an array")), "Should catch invalid activeRoles in manual action");
console.log("✅ validateManualActions tests passed.");

console.log("Testing validateAiConfig...");
testScen = {
    aiConfig: {
        // Missing systemPrompt, scoreLabels, roleContexts, scores
    }
};
resultErrors = [];
validateAiConfig(testScen, resultErrors);
assert.ok(resultErrors.some(e => e.includes("aiConfig missing 'systemPrompt'")), "Should catch missing systemPrompt");
assert.ok(resultErrors.some(e => e.includes("aiConfig missing or invalid 'scores'")), "Should catch missing scores");

testScen.aiConfig = {
    systemPrompt: "test",
    scoreLabels: { 1: "test" },
    roleContexts: { test: "test" },
    scores: { test: {} }
};
resultErrors = [];
validateAiConfig(testScen, resultErrors);
assert.strictEqual(resultErrors.length, 0, "Should have 0 errors for valid aiConfig");
console.log("✅ validateAiConfig tests passed.");

console.log("Testing image library resolution and validation...");
resultErrors = [];
validateImageReference({ image: 'non_existent_image_id' }, 'eventTemplate[0]', resultErrors);
assert.strictEqual(resultErrors.length, 1, "Should catch unknown image ID");
assert.ok(resultErrors[0].includes("references unknown image ID 'non_existent_image_id'"));

resultErrors = [];
validateAssets({ assets: [{ id: 'a1', image: 'type_45_destroyer' }] }, resultErrors);
assert.strictEqual(resultErrors.length, 0, "Valid library image ID should pass validation");

const mockScenario = {
    assets: [{ id: 'a1', name: 'Destroyer', image: 'type_45_destroyer' }],
    eventTemplates: [{ id: 'ev1', name: 'Cyber Event', image: 'ev_cyber_london' }],
    manualActions: [{ id: 'act1', name: 'Backchannel', initiator: ['foreign'], image: 'act_backchannel_russia' }]
};
resolveScenarioImages(mockScenario);
assert.strictEqual(mockScenario.assets[0].imageId, 'type_45_destroyer');
assert.strictEqual(mockScenario.assets[0].image, '/images/library/type_45_destroyer.png');
assert.ok(mockScenario.assets[0].imageMeta && mockScenario.assets[0].imageMeta.title.length > 0);
assert.strictEqual(mockScenario.eventTemplates[0].image, '/images/library/ev_cyber_london.png');
assert.strictEqual(mockScenario.manualActions[0].image, '/images/library/act_backchannel_russia.png');

const navalImages = getAllImages({ tag: 'naval' });
assert.ok(navalImages.length > 0 && navalImages.every(img => img.tags.includes('naval')), "Tag filtering should return matching images");
const searchImages = getAllImages({ q: 'Destroyer' });
assert.ok(searchImages.some(img => img.id === 'type_45_destroyer'), "Query search should match title/description");
console.log("✅ Image library resolution and validation tests passed.");

if (allValid) {
    console.log("All scenarios are valid and unit tests passed.");
    process.exit(0);
} else {
    console.error("Some scenarios failed validation.");
    process.exit(1);
}
