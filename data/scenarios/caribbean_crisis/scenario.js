module.exports = {
    id: 'caribbean_crisis',
    name: 'Caribbean Hurricane: Ticking Clock',
    description: 'A 45-minute real-time crisis response following a Category 5 hurricane hitting the British Virgin Islands.',
    mapConfig: { center: [18.42, -64.62], zoom: 10 },
    roles: ['PM', 'fcdo', 'defence', 'dfid', 'media', 'display'],
    roleNames: {
        'PM': 'Prime Minister',
        'fcdo': 'Foreign Secretary',
        'defence': 'Defence Secretary',
        'dfid': 'Intl Development Sec',
        'media': 'Media Director',
        'display': 'Display Screen'
    },
    minUsers: 2,
    mandatoryRoles: ['PM'],
    roleFallbacks: {
        media: ['fcdo', 'PM'],
        dfid: ['fcdo', 'PM'],
        defence: ['PM'],
        fcdo: ['PM']
    },
    initialScores: {
        humanitarian: 5,
        public_order: 5,
        infrastructure: 2,
        political: 4,
        logistics: 3
    },
    briefings: {
        _general: 'Hurricane Zephyr, a Category 5 storm, has devastated the British Virgin Islands. Communications are severely degraded. You have 45 minutes to coordinate the initial disaster response, secure public order, and manage the political fallout.',
        PM: 'As Prime Minister, your primary concern is the strategic overview and ensuring all departments are pulling together.',
        fcdo: 'As Foreign Secretary, you are liaising with the BVI Governor, managing international aid offers, and dealing with stranded UK nationals.',
        defence: 'As Defence Secretary, you command military assets. Deploying them effectively and quickly is your top priority.',
        dfid: 'As Intl Development Secretary, you coordinate civilian aid, NGOs, and medical supplies. You must ensure logistics chains are viable.',
        media: 'As Media Director, you control the narrative. The press is demanding answers and imagery of the destruction is leaking.'
    },
    aiConfig: {
        systemPrompt: `You are an automated crisis reporting system.
CRITICAL RULES:
- Describe the objective situation.
- NEVER refer to the player, "you", "your", or their role name.
- Write exactly ONE short paragraph.
- Start directly with the operational impact. Do not use greetings.
- Stick to the provided facts.`,
        scoreLabels: { 1: "Critical", 2: "Poor", 3: "Adequate", 4: "Strong", 5: "Secure" },
        roleContexts: {
            fcdo: "Focus area: international relations and local government liaison.",
            defence: "Focus area: military logistics and engineering.",
            dfid: "Focus area: humanitarian aid and civilian casualties.",
            media: "Focus area: public perception and press."
        },
        scores: {
            humanitarian: { label: "Humanitarian Crisis", subject: "civilian casualties and suffering", isPlural: false, roles: ["dfid"] },
            public_order: { label: "Public Order", subject: "looting and civil unrest", isPlural: false, roles: ["fcdo"] },
            infrastructure: { label: "Infrastructure", subject: "power, water, and comms", isPlural: false, roles: ["dfid", "defence"] },
            political: { label: "Political Fallout", subject: "media perception and government stability", isPlural: false, roles: ["media"] },
            logistics: { label: "Logistics", subject: "throughput of aid delivery", isPlural: false, roles: ["defence", "dfid"] }
        }
    },
    variantAxes: [
        {
            id: 'rfa_location',
            name: 'RFA Vessel Location',
            options: [
                {
                    id: 'rfa_narcotics',
                    name: 'Counter-Narcotics (Curacao)',
                    briefingText: 'The RFA Mounts Bay is currently off the coast of Curacao conducting counter-narcotics ops.',
                    scoreModifiers: { logistics: -1 },
                    assetModifiers: [{ id: 'a_rfa', name: 'RFA Mounts Bay', location: [12.11, -68.93], state: 'deployed', tags: ['military', 'naval'], image: '', briefing: 'Bay-class landing ship.' }]
                },
                {
                    id: 'rfa_prepo',
                    name: 'Pre-positioned (Bahamas)',
                    briefingText: 'The RFA Mounts Bay tracked the storm and pre-positioned in the Bahamas.',
                    scoreModifiers: { logistics: +1 },
                    assetModifiers: [{ id: 'a_rfa', name: 'RFA Mounts Bay', location: [24.0, -76.0], state: 'deployed', tags: ['military', 'naval'], image: '', briefing: 'Bay-class landing ship.' }]
                }
            ]
        },
        {
            id: 'airport_status',
            name: 'Terrance B. Lettsome Airport',
            options: [
                { id: 'airport_debris', name: 'Debris Covered', briefingText: 'The airport runway is intact but covered in debris.', scoreModifiers: { infrastructure: +1 } },
                { id: 'airport_flooded', name: 'Severely Flooded', briefingText: 'The airport runway is severely flooded.', scoreModifiers: { infrastructure: -1 } }
            ]
        }
    ],
    assets: [
        { id: 'a_bvi_gov', name: 'Governor House', location: [18.42, -64.62], state: 'operational', tags: ['civilian'], image: '', briefing: 'The seat of local government in Road Town.' },
        { id: 'a_airport', name: 'Terrance B. Lettsome Airport', location: [18.44, -64.54], state: 'offline', tags: ['infrastructure'], image: '', briefing: 'The main international airport on Beef Island.' }
    ],
    
    eventTemplates: [
        // T+0 to T+5
        {
            id: 'ev_start',
            name: 'COBRA Briefing: Initial Response',
            description: 'Hurricane Zephyr has passed. Immediate decisions are required on asset deployment.',
            decisions: [
                {
                    role: 'PM', text: 'Authorize A400M Medical Deployment?',
                    options: [
                        { id: 'opt_a400_yes', text: 'Scramble immediately', effects: { scores: { logistics: -1 }, triggerEvents: [{ id: 'ev_a400_enroute', delayMs: 1000 }] } },
                        { id: 'opt_a400_no', text: 'Wait for assessment', effects: { scores: { political: -1 } } }
                    ]
                },
                {
                    role: 'defence', text: 'Redirect RFA Mounts Bay to BVI?',
                    options: [
                        { id: 'opt_rfa_yes', text: 'Redirect immediately', effects: { triggerEvents: [{ id: 'ev_rfa_enroute', delayMs: 1000 }] } },
                        { id: 'opt_rfa_no', text: 'Hold position', effects: { scores: { humanitarian: -1 } } }
                    ]
                }
            ],
            triggerEvents: [
                { id: 'ev_initial_recon', delayMs: 15000 },
                { id: 'ev_hospital_power', delayMs: 30000 },
                { id: 'ev_prison_damage', delayMs: 45000 },
                { id: 'ev_water_plant', delayMs: 60000 },
                { id: 'ev_tourist_resort', delayMs: 75000 },
                { id: 'ev_roads_blocked', delayMs: 90000 },
                { id: 'ev_police_disband', delayMs: 105000 },
                { id: 'ev_port_damage', delayMs: 120000 },
                { id: 'ev_funds_request', delayMs: 135000 },
                { id: 'ev_weather_warning', delayMs: 900000 }, // 15 mins (warning for 25 min event)
                { id: 'ev_secondary_weather', delayMs: 1500000 }, // 25 mins
                { id: 'ev_endgame_trigger', delayMs: 2700000 } // 45 mins
            ]
        },
        { id: 'ev_a400_enroute', name: 'A400M Airborne', description: 'RAF transport planes are airborne.', triggerEvents: [{ id: 'ev_a400_arrives', delayMs: 300000 }] },
        { id: 'ev_rfa_enroute', name: 'RFA Mounts Bay En Route', description: 'The RFA vessel has altered course.', triggerEvents: [{ id: 'ev_rfa_arrives', delayMs: 300000 }] },
        { id: 'ev_initial_recon', name: 'First Aerial Reconnaissance', description: 'Road Town is devastated.', decisions: [{ role: 'media', text: 'Release imagery?', options: [{ id: 'rel', text: 'Release', effects: { scores: { political: +1, public_order: -1 } } }, { id: 'hold', text: 'Hold', effects: { scores: { political: -1, public_order: +1 } } }] }] },
        { id: 'ev_hospital_power', name: 'Hospital Generators Failing', description: 'Peebles Hospital reports flooding.', decisions: [{ role: 'dfid', text: 'Hospital Priority?', options: [{ id: 'evac', text: 'Evacuate', effects: { scores: { humanitarian: -1, logistics: -1 } } }, { id: 'eng', text: 'Send Engineers', effects: { scores: { infrastructure: +1 } } }] }], triggerEvents: [{ id: 'ev_hospital_blackout', delayMs: 120000 }] },
        { id: 'ev_prison_damage', name: 'Prison Roof Collapsed', description: 'Guards are abandoning posts at Balsam Ghut.', decisions: [{ role: 'fcdo', text: 'Request local police to secure?', options: [{ id: 'yes', text: 'Yes', effects: { scores: { public_order: +1 } } }, { id: 'no', text: 'Wait for military', effects: { scores: { public_order: -1 } } }] }] },
        { id: 'ev_water_plant', name: 'Desalination Plant Destroyed', description: 'Fresh water supply severed.', effects: { scores: { infrastructure: -1 } } },
        { id: 'ev_tourist_resort', name: 'Resort Flooded', description: 'Hundreds of UK/US nationals trapped.', effects: { scores: { humanitarian: -1 } } },
        { id: 'ev_roads_blocked', name: 'Arteries Blocked', description: 'Main roads blocked by landslides.', effects: { scores: { logistics: -1 } } },
        { id: 'ev_police_disband', name: 'Police Absent', description: 'Local police force largely absent checking on families.', effects: { scores: { public_order: -1 } } },
        { id: 'ev_port_damage', name: 'Port Cranes Collapsed', description: 'Heavy lift capability destroyed at port.', effects: { scores: { infrastructure: -1, logistics: -1 } } },
        { id: 'ev_funds_request', name: 'Emergency Funds', description: 'FCDO requests immediate release of emergency funds.', decisions: [{ role: 'PM', text: 'Approve?', options: [{ id: 'yes', text: 'Approve', effects: { scores: { political: +1 } } }, { id: 'delay', text: 'Delay', effects: { scores: { humanitarian: -1 } } }] }] },

        // T+5 to T+20
        { id: 'ev_a400_arrives', name: 'A400M in Airspace', description: 'Runway is not clear yet. Divert or airdrop?', decisions: [{ role: 'defence', text: 'A400M Action?', options: [{ id: 'airdrop', text: 'Airdrop (risky)', effects: { scores: { public_order: -1, humanitarian: +1 }, triggerEvents: [{ id: 'ev_airdrop_riot', delayMs: 60000 }] } }, { id: 'divert', text: 'Divert to PR', effects: { scores: { political: -1, logistics: -1 } } }] }] },
        { id: 'ev_rfa_arrives', name: 'RFA Arrives', description: 'Where to deploy engineers first?', decisions: [{ role: 'defence', text: 'Deployment?', options: [{ id: 'airport', text: 'Clear Airport', effects: { scores: { infrastructure: +2, logistics: +1 }, triggerEvents: [{ id: 'ev_airport_cleared', delayMs: 60000 }] } }, { id: 'hospital', text: 'Secure Hospital', effects: { scores: { humanitarian: +2 } } }] }] },
        { id: 'ev_hospital_blackout', name: 'Hospital Loses Power', description: 'Generators failed. Critical patients dying.', effects: { scores: { humanitarian: -2 } } },
        { id: 'ev_airdrop_riot', name: 'Airdrop Riot', description: 'Supplies landed in unsecured area causing a riot.', effects: { scores: { public_order: -2 } } },
        { id: 'ev_airport_cleared', name: 'Airport Cleared', description: 'Runway cleared for fixed-wing aircraft.', effects: { scores: { logistics: +2 } } },
        { id: 'ev_cruise_ship', name: 'Cruise Ship Offer', description: 'Cruise ship offshore offers medical assistance.', decisions: [{ role: 'fcdo', text: 'Accept?', options: [{ id: 'yes', text: 'Accept (Needs secure dock)', effects: { scores: { humanitarian: +1, logistics: -1 } } }, { id: 'no', text: 'Decline', effects: { scores: { political: -1 } } }] }], triggerEvents: [{ id: 'ev_us_coastguard', delayMs: 30000 }] },
        { id: 'ev_us_coastguard', name: 'US Coast Guard Offers Cutter', description: 'USCG offers to divert a cutter.', decisions: [{ role: 'fcdo', text: 'Approve?', options: [{ id: 'yes', text: 'Yes', effects: { scores: { logistics: +1 } } }] }] },
        { id: 'ev_stadium_hospital', name: 'Stadium Hospital', description: 'Makeshift hospital setup requested in national stadium.', effects: { scores: { infrastructure: -1 } } },
        { id: 'ev_supermarket_looting', name: 'Supermarket Looting', description: 'First reports of coordinated looting at supermarkets.', effects: { scores: { public_order: -1 } } },
        { id: 'ev_fuel_contam', name: 'Fuel Contaminated', description: 'Aviation fuel reserves are contaminated.', effects: { scores: { logistics: -2 } } },
        { id: 'ev_media_timeline', name: 'Media Demands Timeline', description: 'Press demands timeline for Royal Navy arrival.', decisions: [{ role: 'media', text: 'Provide timeline?', options: [{ id: 'honest', text: 'Be honest', effects: { scores: { political: -1 } } }, { id: 'vague', text: 'Be vague', effects: { scores: { political: -2 } } }] }] },
        { id: 'ev_hnwi_evac', name: 'HNWI Demands', description: 'High-net-worth individuals demand private helicopter evacuations.', decisions: [{ role: 'PM', text: 'Allow private evacs?', options: [{ id: 'yes', text: 'Allow', effects: { scores: { public_order: -1, political: -1 } } }, { id: 'no', text: 'Deny', effects: { scores: { political: +1 } } }] }] },
        { id: 'ev_sar_dogs', name: 'SAR Success', description: 'Search dogs locate survivors in a school.', effects: { scores: { humanitarian: +1 } } },
        
        // T+20 to T+35
        { id: 'ev_water_runs_out', name: 'Potable Water Depleted', description: 'Water runs out in Road Town. Desperate crowds gather.', effects: { scores: { humanitarian: -1, public_order: -1 } } },
        { id: 'ev_illness', name: 'Waterborne Illness', description: 'Outbreak suspected in makeshift camps.', effects: { scores: { humanitarian: -1 } } },
        { id: 'ev_pharmacy_raid', name: 'Pharmacy Raided', description: 'Looters raid main pharmacy for narcotics.', effects: { scores: { public_order: -1 } } },
        { id: 'ev_ngo_refusal', name: 'NGOs Refuse to Operate', description: 'NGOs refuse to operate without military escort.', effects: { scores: { logistics: -1 } } },
        { id: 'ev_telecom_offer', name: 'Telecom Restoration Offer', description: 'Company offers to restore cell service if military secures towers.', decisions: [{ role: 'defence', text: 'Divert troops to towers?', options: [{ id: 'yes', text: 'Yes', effects: { scores: { infrastructure: +2, public_order: -1 } } }, { id: 'no', text: 'No', effects: { scores: { political: -1 } } }] }] },
        { id: 'ev_foreign_clash', name: 'Evacuation Clashes', description: 'Foreign nationals clash with locals over priority lines.', effects: { scores: { public_order: -1 } } },
        { id: 'ev_tabloid_attack', name: 'Tabloid Attack', description: 'UK tabloid publishes "UK Abandons Its Own".', effects: { scores: { political: -2 } } },
        
        // Secondary Weather
        { id: 'ev_weather_warning', name: 'Weather Warning', description: 'A massive secondary sea swell is approaching.', effects: { scores: { political: 0 } } },
        { id: 'ev_secondary_weather', name: 'Secondary Swell Hits', description: 'A massive secondary sea swell has hit. Temporary structures damaged.', effects: { scores: { infrastructure: -1, logistics: -1 } }, triggerEvents: [{ id: 'ev_gangs_emerge', delayMs: 15000 }, { id: 'ev_prison_riot', delayMs: 30000 }] },

        // Score Gated (T+25 onwards)
        { id: 'ev_gangs_emerge', name: 'Criminal Gangs Take Control', description: 'Organised gangs take control of eastern district.', conditions: { maxScores: { public_order: 2 } }, effects: { scores: { public_order: -2, humanitarian: -1 } } },
        { id: 'ev_prison_riot', name: 'Prison Break', description: 'Escaped prisoners raid a police armory.', conditions: { maxScores: { public_order: 2 } }, effects: { scores: { public_order: -2 } } },
        
        // T+35 to T+45
        { id: 'ev_gunfire_gov', name: 'Gunfire at Gov Residence', description: 'Gunfire reported near Governor\'s residence.', effects: { scores: { public_order: -1, political: -1 } } },
        { id: 'ev_local_threat', name: 'Local Gov Threatens US Intervention', description: 'Local gov threatens to request US intervention if UK fails.', decisions: [{ role: 'fcdo', text: 'Response?', options: [{ id: 'reassure', text: 'Reassure', effects: { scores: { political: +1 } } }, { id: 'allow', text: 'Allow US lead', effects: { scores: { political: -2, logistics: +2 } } }] }], triggerEvents: [{ id: 'ev_curfew', delayMs: 15000 }] },
        { id: 'ev_curfew', name: 'Curfew Declared', description: 'Decision on rules of engagement for Royal Marines.', decisions: [{ role: 'defence', text: 'ROE?', options: [{ id: 'strict', text: 'Strict (Self-defence only)', effects: { scores: { public_order: -1 } } }, { id: 'loose', text: 'Loose (Lethal force authorized)', effects: { scores: { public_order: +2, political: -2 } } }] }] },
        { id: 'ev_port_riot', name: 'Port Riots', description: 'Riots at port as aid shipment unloaded.', effects: { scores: { public_order: -1, logistics: -1 } } },
        { id: 'ev_black_market', name: 'Black Market Emerges', description: 'Black market for water and fuel run by armed groups.', effects: { scores: { public_order: -1 } } },
        { id: 'ev_media_attacked', name: 'Media Crew Attacked', description: 'Media crew attacked while filming riots.', effects: { scores: { political: -1 } } },
        { id: 'ev_bridge_collapse', name: 'Bridge Collapse', description: 'Critical bridge collapses under aid convoy.', effects: { scores: { logistics: -2, infrastructure: -1 } } },
        { id: 'ev_mass_exodus', name: 'Mass Exodus', description: 'Small boats attempting to reach Puerto Rico.', effects: { scores: { humanitarian: -1, political: -1 } } },
        
        { id: 'ev_marines_push', name: 'Marines Retake Prison', description: 'Royal Marines launch operation to retake prison.', effects: { scores: { public_order: +2 } } },
        { id: 'ev_epidemic', name: 'Epidemic Confirmed', description: 'Major epidemic confirmed; strict quarantine required.', effects: { scores: { humanitarian: -2 } } },
        { id: 'ev_task_force', name: 'Naval Task Force Arrives', description: 'Full naval task force arrives with heavy lift.', effects: { scores: { logistics: +3, infrastructure: +2 } } },
        { id: 'ev_donor_conf', name: 'Donor Conference', description: 'International donor conference requires PM commitment.', decisions: [{ role: 'PM', text: 'Commit funding?', options: [{ id: 'yes', text: 'Yes (£2bn)', effects: { scores: { political: +2 } } }, { id: 'no', text: 'No', effects: { scores: { political: -2 } } }] }] },
        { id: 'ev_arrest_officials', name: 'Officials Arrested', description: 'Local officials arrested for hoarding aid.', effects: { scores: { public_order: +1, political: -1 } } },
        { id: 'ev_mutiny', name: 'Police Mutiny', description: 'Widespread mutiny among remaining local police forces.', conditions: { maxScores: { public_order: 1, humanitarian: 2 } }, effects: { scores: { public_order: -3 } } },
        { id: 'ev_turning_point', name: 'Turning Point Address', description: 'PM addresses the territory.', effects: { scores: { political: +1 } } },

        // Endgame Evaluation
        { id: 'ev_endgame_trigger', name: '45 Minutes Reached', description: 'The 45-minute response window has closed.', triggerEvents: [
            { id: 'ev_end_success', delayMs: 1000 },
            { id: 'ev_end_mixed', delayMs: 1000 },
            { id: 'ev_end_failure', delayMs: 1000 }
        ] },
        { id: 'ev_end_success', name: 'Scenario Concluded: Success', description: 'Order was maintained and humanitarian suffering was minimized. A successful crisis response.', isEndGame: true, conditions: { minScores: { public_order: 3, humanitarian: 3 } } },
        { id: 'ev_end_mixed', name: 'Scenario Concluded: Mitigated Disaster', description: 'The situation was stabilized, but at a high cost. A mixed response.', isEndGame: true, conditions: { minScores: { public_order: 2 }, maxScores: { humanitarian: 2 } } },
        { id: 'ev_end_failure', name: 'Scenario Concluded: Total Collapse', description: '"UK Abandons Its Own". The territory has fallen into anarchy and mass casualties.', isEndGame: true, conditions: { maxScores: { public_order: 1 } } }
    ]
};
