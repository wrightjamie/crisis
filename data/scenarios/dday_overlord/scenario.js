module.exports = {
    id: 'dday_overlord',
    name: 'D-Day: Operation Overlord',
    description: 'A Team vs. Team historical simulation. The Allies must establish a beachhead in Normandy, while the Axis must hold the Atlantic Wall. Features Fog of War—each team only sees their own intelligence.',
    mapConfig: { center: [49.332, -0.852], zoom: 9 }, // Normandy coast
    roles: ['allied_command', 'allied_logistics', 'allied_display', 'axis_command', 'axis_panzer', 'axis_display'],
    roleNames: {
        'allied_command': 'Allied High Command (SHAEF)',
        'allied_logistics': 'Allied Logistics & Naval',
        'allied_display': 'Allied War Room Display (No Decisions)',
        'axis_command': 'Axis OB West (Rundstedt)',
        'axis_panzer': 'Axis Panzer Group West (Rommel)',
        'axis_display': 'Axis War Room Display (No Decisions)'
    },
    minUsers: 2,
    mandatoryRoles: ['allied_command', 'axis_command'],
    roleFallbacks: {
        allied_logistics: ['allied_command'],
        axis_panzer: ['axis_command']
    },
    initialScores: {
        beach_control: 1,       // 1 = Axis Controlled, 5 = Allied Breakout
        allied_momentum: 4,     // 1 = Stalled, 5 = Overwhelming
        allied_supply: 5,       // 1 = Critical Shortage, 5 = Fully Supplied
        axis_fortifications: 5, // 1 = Breached, 5 = Impenetrable
        axis_reserves: 4        // 1 = Depleted, 5 = Ready
    },
    briefings: {
        _general: 'June 6, 1944. Operation Overlord has begun. This is a Team vs. Team simulation. You will only see intelligence and events relevant to your faction until contact is made on the battlefield.',
        allied_command: 'You must secure the beaches and push inland. Manage your momentum and rely on logistics to keep your troops supplied.',
        allied_logistics: 'You control the naval bombardment and supply lines. The beachhead will fail without your support.',
        allied_display: 'ALLIED WAR ROOM: Monitor the situation. Do not make decisions from this terminal.',
        axis_command: 'You command the Atlantic Wall. You must guess where the true invasion is and hold the line.',
        axis_panzer: 'You command the mobile reserve. You must get authorization to release the Panzers and push the Allies back into the sea.',
        axis_display: 'AXIS WAR ROOM: Monitor the situation. Do not make decisions from this terminal.'
    },
    aiConfig: {
        systemPrompt: 'You are an objective historical observer. Summarize the state of the Normandy invasion based on the scores. Do not reveal secret intelligence. Keep it to one concise paragraph.',
        scoreLabels: { 1: "Critical / Axis Favored", 2: "Struggling / Axis Leaning", 3: "Contested", 4: "Advancing / Allied Leaning", 5: "Dominant / Allied Favored" },
        roleContexts: {
            allied_command: "Focus on beach control and overall momentum.",
            allied_logistics: "Focus on allied supply levels and momentum.",
            allied_display: "Focus on overall allied progress.",
            axis_command: "Focus on beach control and fortifications.",
            axis_panzer: "Focus on axis reserves and holding the line.",
            axis_display: "Focus on overall axis defense."
        },
        scores: {
            beach_control: { label: "Beachhead Control", subject: "beachhead control", isPlural: false, roles: ["allied_command", "allied_logistics", "allied_display", "axis_command", "axis_panzer", "axis_display"] },
            allied_momentum: { label: "Allied Momentum", subject: "Allied invasion momentum", isPlural: false, roles: ["allied_command", "allied_logistics", "allied_display"] },
            allied_supply: { label: "Allied Supply", subject: "Allied logistics", isPlural: false, roles: ["allied_command", "allied_logistics", "allied_display"] },
            axis_fortifications: { label: "Axis Fortifications", subject: "Atlantic Wall integrity", isPlural: false, roles: ["axis_command", "axis_panzer", "axis_display"] },
            axis_reserves: { label: "Axis Reserves", subject: "Axis mobile reserves", isPlural: true, roles: ["axis_command", "axis_panzer", "axis_display"] }
        }
    },
    variantAxes: [],
    assets: [
        { id: 'omaha_beach', name: 'Omaha Beach', location: [49.37, -0.88], state: 'contested', tags: ['objective'] },
        { id: 'utah_beach', name: 'Utah Beach', location: [49.42, -1.17], state: 'contested', tags: ['objective'] },
        { id: 'caen', name: 'Caen', location: [49.18, -0.37], state: 'axis_controlled', tags: ['city', 'axis_panzer'] },
        { id: 'mulberry_harbor', name: 'Mulberry Harbor (Planned)', location: [49.34, -0.63], state: 'planned', tags: ['logistics', 'allied_logistics'] }
    ],
    eventTemplates: [
        // FOG OF WAR - STARTING EVENTS
        {
            id: 'ev_allied_airborne',
            name: 'Airborne Drops Commenced',
            description: 'Paratroopers have landed behind enemy lines to secure the flanks.',
            location: [49.31, -1.3], // Ste Mere Eglise
            hiddenFrom: ['axis_command', 'axis_panzer', 'axis_display'], // Axis doesn't know exact drop success yet
            decisions: [
                {
                    role: 'allied_command',
                    text: 'Drop Zone Chaos?',
                    options: [
                        { id: 'consolidate', text: 'Consolidate scattered units', effects: { scores: { allied_momentum: -1, allied_supply: +1 } } },
                        { id: 'push', text: 'Push objectives immediately (Risky)', effects: { scores: { allied_momentum: +1, allied_supply: -1 } } }
                    ]
                }
            ],
            triggerEvents: [
                { id: 'ev_axis_reports', delayMs: 10000 },
                { id: 'ev_naval_bombardment', delayMs: 120000 },
                { id: 'ev_endgame_eval', delayMs: 600000 }
            ]
        },
        {
            id: 'ev_axis_reports',
            name: 'Confused Reports',
            description: 'Reports of paratroopers and naval activity are flooding in. Is this the main invasion or a diversion for Pas-de-Calais?',
            location: [49.18, -0.37], // Caen HQ
            hiddenFrom: ['allied_command', 'allied_logistics', 'allied_display'],
            decisions: [
                {
                    role: 'axis_command',
                    text: 'Assess Intelligence?',
                    options: [
                        { id: 'commit_normandy', text: 'Assume Normandy is main effort (Move reserves)', effects: { scores: { axis_reserves: -1, axis_fortifications: +1 } } },
                        { id: 'hold_calais', text: 'Hold reserves for Calais', effects: { scores: { axis_reserves: +1, axis_fortifications: -1 } } }
                    ]
                }
            ]
        },
        // MID-GAME CONFLICT
        {
            id: 'ev_naval_bombardment',
            name: 'Naval Bombardment & Landings',
            description: 'The Allied fleet has opened fire on the Atlantic Wall. The first wave is hitting the beaches.',
            location: [49.37, -0.88], // Omaha
            // Visible to everyone - contact is made
            decisions: [
                {
                    role: 'allied_logistics',
                    text: 'Bombardment Focus?',
                    options: [
                        { id: 'bunkers', text: 'Target heavy bunkers (Help infantry)', effects: { scores: { beach_control: +1, axis_fortifications: -1, allied_supply: -1 } } },
                        { id: 'roads', text: 'Target roads (Delay Panzers)', effects: { scores: { allied_momentum: +1, axis_reserves: -1, allied_supply: -1 } } }
                    ]
                },
                {
                    role: 'axis_panzer',
                    text: 'Panzer Counter-Attack?',
                    options: [
                        { id: 'attack_beaches', text: 'Drive them into the sea', effects: { scores: { beach_control: -2, axis_reserves: -2 } } },
                        { id: 'defend_caen', text: 'Form defensive line at Caen', effects: { scores: { axis_fortifications: +2, axis_reserves: -1 } } }
                    ]
                }
            ],
            triggerEvents: [
                { id: 'ev_weather_turns', delayMs: 180000 },
                { id: 'ev_mulberry_construction', delayMs: 240000 }
            ]
        },
        {
            id: 'ev_weather_turns',
            name: 'Channel Storm',
            description: 'A sudden storm in the English Channel is halting supply convoys and grounding Allied air support.',
            location: [49.5, -0.5], // Channel
            effects: { scores: { allied_supply: -2, allied_momentum: -1, axis_reserves: +1 } }
            // Visible to everyone, no decisions, just environmental impact
        },
        {
            id: 'ev_mulberry_construction',
            name: 'Mulberry Harbors',
            description: 'The Allies are attempting to construct artificial harbors to bypass captured ports.',
            location: [49.34, -0.63], // Arromanches
            hiddenFrom: ['axis_command', 'axis_panzer', 'axis_display'],
            decisions: [
                {
                    role: 'allied_logistics',
                    text: 'Expedite Construction?',
                    options: [
                        { id: 'rush', text: 'Rush build (Risk failure in storm)', effects: { scores: { allied_supply: +2, allied_momentum: +1 } } }, // In reality, the storm destroyed them if rushed
                        { id: 'delay', text: 'Secure foundations first', effects: { scores: { allied_supply: +1 } } }
                    ]
                }
            ]
        },
        // ENDGAME
        {
            id: 'ev_endgame_eval',
            name: 'Nightfall, June 6th',
            description: 'The first day of the invasion comes to a close. Assessing control of the beachhead...',
            triggerEvents: [
                { id: 'ev_end_allied_victory', delayMs: 1000 },
                { id: 'ev_end_axis_victory', delayMs: 1000 },
                { id: 'ev_end_stalemate', delayMs: 1000 }
            ]
        },
        {
            id: 'ev_end_allied_victory',
            name: 'Allied Breakout',
            description: 'The Allies have successfully breached the Atlantic Wall, secured the beaches, and are pushing deep into Normandy. The liberation of Europe has begun.',
            isEndGame: true,
            conditions: { minScores: { beach_control: 4 } }
        },
        {
            id: 'ev_end_axis_victory',
            name: 'Repelled at the Beaches',
            description: 'The Atlantic Wall held. Panzer reserves effectively counter-attacked, and the Allied forces were thrown back into the sea with heavy losses. Operation Overlord has failed.',
            isEndGame: true,
            conditions: { maxScores: { beach_control: 2 } }
        },
        {
            id: 'ev_end_stalemate',
            name: 'A Bloody Stalemate',
            description: 'The Allies have a tenuous foothold, but the Axis defensive line remains intact. A brutal, grinding war of attrition in the bocage country awaits.',
            isEndGame: true,
            // Fallback ending
        }
    ]
};
