const fs = require('fs');
const path = require('path');

const scenarios = [];
fs.readdirSync(__dirname, { withFileTypes: true }).forEach(dirent => {
    if (dirent.isDirectory()) {
        const scenarioPath = path.join(__dirname, dirent.name, 'scenario.js');
        if (fs.existsSync(scenarioPath)) {
            const scenario = require(scenarioPath);
            const guidePath = path.join(__dirname, dirent.name, 'guide.html');
            if (!scenario.guideUrl && fs.existsSync(guidePath)) {
                scenario.guideUrl = `/scenarios/${dirent.name}/guide.html`;
            }
            // Optionally, load acronyms and wiki if we want the server to have them
            scenarios.push(scenario);
        }
    }
});
module.exports = scenarios;
