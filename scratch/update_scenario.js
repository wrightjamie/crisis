const fs = require('fs');
const path = require('path');

const scenarioPath = path.join(__dirname, '..', 'data', 'scenarios', 'uk_crisis.js');
let content = fs.readFileSync(scenarioPath, 'utf8');

const stagesStr = `
        stages: [
            { id: 'stage_1', name: 'Intelligence & Warnings' },
            { id: 'stage_2', name: 'Tension & Sabotage' },
            { id: 'stage_3', name: 'Initial Skirmishes' },
            { id: 'stage_4', name: 'Open Kinetic Conflict' },
            { id: 'stage_5', name: 'Escalation / Resolution' }
        ],
        eventTemplates: [`;

if (!content.includes('stages: [')) {
    content = content.replace('eventTemplates: [', stagesStr);
}

const stageMapping = {
    'ev_maritime_shadowing': 'stage_1',
    'ev_cyber_exposure': 'stage_1',
    'ev_protest_manchester': 'stage_1',
    
    'ev_cyber_london': 'stage_2',
    'ev_logistics_failure': 'stage_2',
    'ev_undersea_cables': 'stage_2',
    'ev_uk_casualty_leak': 'stage_2',
    
    'ev_airspace_intercept': 'stage_3',
    'ev_airspace_incursion': 'stage_3',
    'ev_sub_surfaces': 'stage_3',
    'ev_akrotiri_strike': 'stage_3',
    
    'ev_kinetic_strike': 'stage_4',
    'ev_raf_bases_strike': 'stage_4',
    'ev_portsmouth_strike': 'stage_4',
    'ev_faslane_strike_1': 'stage_4',
    'ev_faslane_strike_2': 'stage_4',
    'ev_power_grid_strike': 'stage_4',
    'ev_nuclear_readiness': 'stage_4',
    'ev_strike_options_leak': 'stage_4',
    'ev_strike_options_secured': 'stage_4',
    'ev_strike_options_ready': 'stage_4',
    
    'ev_us_neutrality': 'stage_5',
    'ev_chemical_attempt': 'stage_5',
    'ev_article5_ambiguity': 'stage_5',
    'ev_final_authorization': 'stage_5',
    'ev_endgame_diplomatic': 'stage_5',
    'ev_endgame_domestic': 'stage_5',
    'ev_endgame_eu_defense': 'stage_5',
    
    // Everything else (success/fail events) naturally goes to the stage of their parent, 
    // but we can explicitly put them in 4/5
    'ev_us_support_success': 'stage_4',
    'ev_us_support_fail': 'stage_4',
    'ev_russia_deescalate': 'stage_5',
    'ev_russia_leak': 'stage_5',
    'ev_cyber_success': 'stage_3',
    'ev_cyber_fail': 'stage_3',
    'ev_sf_success': 'stage_3',
    'ev_sf_fail': 'stage_3',
    'ev_f35_success': 'stage_4',
    'ev_f35_fail': 'stage_4',
    'ev_eu_success': 'stage_4',
    'ev_eu_fail': 'stage_4',
};

// Insert stage into event templates
// We look for id: 'ev_X', and insert stage: 'stage_Y', immediately after it.
for (const [evtId, stageId] of Object.entries(stageMapping)) {
    const regex = new RegExp(`(id:\\s*'${evtId}',)`);
    if (content.match(regex)) {
        // Only insert if it doesn't already have a stage
        const checkRegex = new RegExp(`id:\\s*'${evtId}',\\s*stage:`);
        if (!content.match(checkRegex)) {
            content = content.replace(regex, `$1\n                stage: '${stageId}',`);
        }
    }
}

// Convert some manual events to timed automatic triggers.
// Example: If PM authorizes F35s (f35_deploy option), we trigger 'ev_f35_success' or 'ev_f35_fail' automatically.
// Wait, `uk_crisis.js` uses `randomEvents` array in `option.effects` for probability events!
// Let's add `triggerEvents` to some options.

// "Execute targeted offensive cyber operation" option in ev_cyber_exposure
content = content.replace(
    /text: 'Execute targeted offensive cyber operation against Russian C2',([\s\S]*?)effects: {([\s\S]*?)}/,
    `text: 'Execute targeted offensive cyber operation against Russian C2',$1effects: {$2,
                            triggerEvents: [
                                { id: 'ev_cyber_success', delayMs: 45000, probability: 0.6 },
                                { id: 'ev_cyber_fail', delayMs: 45000, probability: 0.4 }
                            ]
                        }`
);

// "Deploy Special Forces" option in ev_akrotiri_strike
content = content.replace(
    /text: 'Deploy Special Forces to locate and destroy the SAM site',([\s\S]*?)effects: {([\s\S]*?)}/,
    `text: 'Deploy Special Forces to locate and destroy the SAM site',$1effects: {$2,
                            triggerEvents: [
                                { id: 'ev_sf_success', delayMs: 60000, probability: 0.5 },
                                { id: 'ev_sf_fail', delayMs: 60000, probability: 0.5 }
                            ]
                        }`
);

// "Intercept and force down" option in ev_airspace_intercept
content = content.replace(
    /text: 'Intercept and force down at RAF Lossiemouth',([\s\S]*?)effects: {([\s\S]*?)}/,
    `text: 'Intercept and force down at RAF Lossiemouth',$1effects: {$2,
                            triggerEvents: [
                                { id: 'ev_kinetic_strike', delayMs: 120000, probability: 1.0 }
                            ]
                        }`
);

fs.writeFileSync(scenarioPath, content);
console.log('Scenario updated!');
