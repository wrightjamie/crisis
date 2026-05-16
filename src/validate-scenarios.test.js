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

if (allValid) {
    console.log("All scenarios are valid.");
    process.exit(0);
} else {
    console.error("Some scenarios failed validation.");
    process.exit(1);
}
