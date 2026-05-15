const fs = require('fs');
const path = require('path');

const scenarios = [];
fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js' && file.endsWith('.js')) {
        scenarios.push(require('./' + file));
    }
});
module.exports = scenarios;
