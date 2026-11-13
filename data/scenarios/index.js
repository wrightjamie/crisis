const scenarioService = require('../../src/db/scenario-service');

// Load scenarios dynamically from SQLite database
function loadScenariosFromDb() {
    try {
        const summaries = scenarioService.listScenarios();
        return summaries.map(s => scenarioService.getScenario(s.id)).filter(Boolean);
    } catch (err) {
        console.error('Failed to load scenarios from database:', err.message);
        return [];
    }
}

const scenarios = loadScenariosFromDb();

module.exports = scenarios;
module.exports.loadScenariosFromDb = loadScenariosFromDb;
