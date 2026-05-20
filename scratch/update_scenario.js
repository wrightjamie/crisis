const fs = require('fs');
let content = fs.readFileSync('data/scenarios/uk_crisis.js', 'utf8');

content = content.replace(
    /id: 'ev_cyber_london',\s*name: 'Major Cyber Attack on London Financial District',/,
    `id: 'ev_cyber_london',\n                name: 'Major Cyber Attack on London Financial District',\n                prerequisites: ['ev_logistics_failure'],`
);

content = content.replace(
    /id: 'ev_cyber_exposure',\s*name: 'Allied Intelligence Leak: Cyber Operations Exposed',/,
    `id: 'ev_cyber_exposure',\n                name: 'Allied Intelligence Leak: Cyber Operations Exposed',\n                prerequisites: ['ev_cyber_london'],`
);

content = content.replace(
    /id: 'ev_airspace_intercept',\s*name: 'Airspace Intercept Incident',/,
    `id: 'ev_airspace_intercept',\n                name: 'Airspace Intercept Incident',\n                prerequisites: ['ev_logistics_failure'],`
);

content = content.replace(
    /id: 'ev_maritime_shadowing',\s*name: 'Maritime Shadowing & Infrastructure Tension',/,
    `id: 'ev_maritime_shadowing',\n                name: 'Maritime Shadowing & Infrastructure Tension',\n                prerequisites: ['ev_logistics_failure'],`
);

content = content.replace(
    /id: 'ev_russia_hub_explosion',\s*name: 'Russian Logistics Hub Explosion',/,
    `id: 'ev_russia_hub_explosion',\n                name: 'Russian Logistics Hub Explosion',\n                prerequisites: ['ev_cyber_exposure'],\n                conditions: { minScores: { military_escalation: 2 } },`
);

content = content.replace(
    /id: 'ev_kinetic_strike',\s*name: 'Kinetic Incident Against UK Military Asset',/,
    `id: 'ev_kinetic_strike',\n                name: 'Kinetic Incident Against UK Military Asset',\n                prerequisites: ['ev_maritime_shadowing'],\n                conditions: { minScores: { military_escalation: 3 } },`
);

fs.writeFileSync('data/scenarios/uk_crisis.js', content);
console.log('done');
