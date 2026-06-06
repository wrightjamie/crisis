const scenarios = require('../data/scenarios');
const { validateScenario } = require('./validate-scenarios');

console.log("Running scenario validation tests...");

let allValid = true;

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
const { validateBasicStructure, validateRoles } = require('./validate-scenarios');

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

if (allValid) {
    console.log("All scenarios are valid.");
    process.exit(0);
} else {
    console.error("Some scenarios failed validation.");
    process.exit(1);
}
