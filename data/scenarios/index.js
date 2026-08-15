const fs = require('fs');
const path = require('path');

const scenarios = [];
fs.readdirSync(__dirname, { withFileTypes: true }).forEach(dirent => {
    if (dirent.isDirectory()) {
        const scenarioPath = path.join(__dirname, dirent.name, 'scenario.js');
        if (fs.existsSync(scenarioPath)) {
            const scenario = require(scenarioPath);
            // Optionally, load acronyms and wiki if we want the server to have them
            scenarios.push(scenario);
        }
    }
});
module.exports = scenarios;
