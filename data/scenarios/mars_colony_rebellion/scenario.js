module.exports = {
    id: 'mars_colony_rebellion',
    name: 'Mars Colony Rebellion',
    description: 'A tense, real-time crisis set in 2084. Mars Colony Secundus has declared independence from Earth Command. Manage resources, blockades, and propaganda.',
    mapConfig: {
        center: [0.0, 0.0], // Equator of Mars
        zoom: 3
    },
    roles: [
        'earth_commander', 'earth_logistics', 'earth_display',
        'mars_leader', 'mars_engineering', 'mars_display'
    ],
    roleNames: {
        'earth_commander': 'Earth Fleet Commander',
        'earth_logistics': 'UN Logistics Director',
        'earth_display': 'Earth Strategic Map',
        'mars_leader': 'Martian Resistance Leader',
        'mars_engineering': 'Chief Colony Engineer',
        'mars_display': 'Colony Secundus Hub'
    },
    minUsers: 2,
    mandatoryRoles: ['earth_commander', 'mars_leader'],
    roleFallbacks: {
        'earth_logistics': ['earth_commander'],
        'mars_engineering': ['mars_leader']
    },
    initialScores: {
        colony_morale: 3,
        earth_supply: 4,
        mars_supply: 2,
        tension: 3,
        propaganda_war: 3 // 1: Total Earth Control, 5: Total Mars Control
    },
    briefings: {
        _general: 'Year 2084. Mars Colony Secundus, exhausted by heavy taxation and poor supplies, has severed communications and declared independence. The UN Space Command has dispatched a blockade fleet. Both sides face critical resource shortages and a ticking clock.',
        earth_commander: 'You command the blockade fleet. Your goal is to force a surrender without destroying the colony infrastructure.',
        earth_logistics: 'You manage the supply lines from Earth. The blockade fleet is expensive to maintain, and public opinion on Earth is wavering.',
        mars_leader: 'You lead the rebellion. You must hold out against the blockade, secure essential resources, and win the propaganda war.',
        mars_engineering: 'You keep the colony alive. Water extractors, power grids, and life support are failing.'
    },
    aiConfig: {
        systemPrompt: "You are an automated logistics and tactical summary system. CRITICAL RULES: - Describe the objective situation. - NEVER refer to the player, 'you', 'your', or their role name. - Write exactly ONE short paragraph. - Start directly with the operational impact. Do not use greetings. - Stick to the provided facts.",
        scoreLabels: { 1: "Critical", 2: "Low", 3: "Stable", 4: "High", 5: "Maximum" },
        roleContexts: {
            earth_commander: "Focus area: Fleet positioning and military strikes.",
            earth_logistics: "Focus area: Supply chains and Earth politics.",
            mars_leader: "Focus area: Rebellion morale and strategic decisions.",
            mars_engineering: "Focus area: Infrastructure, life support, and resource extraction."
        },
        scores: {
            colony_morale: { label: "Colony Morale", subject: "rebel determination", isPlural: false, roles: ["mars_leader", "mars_engineering"] },
            earth_supply: { label: "Earth Fleet Supply", subject: "fleet logistics", isPlural: false, roles: ["earth_commander", "earth_logistics"] },
            mars_supply: { label: "Mars Essential Supply", subject: "colony resources", isPlural: true, roles: ["mars_leader", "mars_engineering"] },
            tension: { label: "Conflict Escalation", subject: "military escalation", isPlural: false, roles: ["earth_commander", "mars_leader"] },
            propaganda_war: { label: "Propaganda Dominance", subject: "public opinion", isPlural: false, roles: ["earth_logistics", "mars_leader"] }
        }
    },
    variantAxes: [
        {
            id: 'mars_initial_supplies',
            name: 'Initial Colony Stockpile',
            options: [
                { id: 'stock_high', name: 'Well Prepared', briefingText: 'The rebellion stockpiled supplies before declaring independence.', scoreModifiers: { mars_supply: 1 }, assetModifiers: [] },
                { id: 'stock_low', name: 'Desperate Measures', briefingText: 'The rebellion was rushed; supplies are already critically low.', scoreModifiers: { mars_supply: -1 }, assetModifiers: [] }
            ]
        },
        {
            id: 'fleet_arrival',
            name: 'Fleet Arrival Vector',
            options: [
                { id: 'orbit_low', name: 'Low Orbit Blockade', briefingText: 'The UN Fleet has established a tight, low-orbit blockade.', scoreModifiers: { earth_supply: -1, tension: 1 }, assetModifiers: [] },
                { id: 'orbit_high', name: 'High Orbit Stand-off', briefingText: 'The UN Fleet is keeping distance, prioritizing supply lines.', scoreModifiers: { earth_supply: 1, tension: -1 }, assetModifiers: [] }
            ]
        }
    ],
    assets: [
        { id: 'a_colony_hub', name: 'Secundus Hub', location: [0.0, 0.0], state: 'operational', tags: ['civilian', 'mars'], briefing: 'The main population center of Mars Colony Secundus.' },
        { id: 'a_water_extractor', name: 'Polar Extractor Alpha', location: [80.0, 0.0], state: 'operational', tags: ['infrastructure', 'mars'], briefing: 'Critical ice mining facility providing water to the colony.' },
        { id: 'a_un_flagship', name: 'UNS Resolve', location: [5.0, 5.0], state: 'operational', tags: ['military', 'earth'], briefing: 'The flagship of the Earth blockade fleet.' }
    ],
    manualActions: [
        {
            id: 'act_mars_hack',
            name: 'Hack Earth Comms',
            description: 'Attempt to slice into the UN Fleet communications to broadcast rebel propaganda.',
            initiator: ['mars_leader'],
            requiresApprovalFrom: ['mars_engineering'],
            conditions: { minScores: { mars_supply: 2 } },
            effects: {
                scores: { propaganda_war: 1, mars_supply: -1 },
                randomEvents: [
                    { id: 'ev_hack_success', weight: 60, effects: { scores: { propaganda_war: 1 } } },
                    { id: 'ev_hack_traced', weight: 40, effects: { scores: { tension: 1, colony_morale: -1 } } }
                ]
            }
        },
        {
            id: 'act_earth_resupply',
            name: 'Emergency Resupply Drop',
            description: 'Request an emergency supply torpedo from Earth. Highly expensive politically.',
            initiator: ['earth_logistics'],
            requiresApprovalFrom: ['earth_commander'],
            conditions: { minScores: { propaganda_war: 2 } },
            effects: {
                scores: { earth_supply: 2, propaganda_war: -1 },
                randomEvents: [
                    { id: 'ev_drop_success', weight: 80, effects: { scores: { tension: -1 } } },
                    { id: 'ev_drop_intercepted', weight: 20, effects: { scores: { mars_supply: 1, earth_supply: -1 } } }
                ]
            }
        }
    ],
    eventTemplates: [
        {
            id: 'ev_start',
            name: 'Blockade Established',
            description: 'The UN Fleet has entered Mars orbit. The blockade is now active. No unsanctioned ships may leave or arrive.',
            location: [5.0, 5.0],
            decisions: [],
            triggerEvents: [
                { id: 'ev_thread1_resource_crisis', delayMs: 90000, probability: 1.0 }, // Resource Control
                { id: 'ev_thread2_blockade_run', delayMs: 270000, probability: 1.0 }, // Orbital Blockade
                { id: 'ev_thread3_earth_protests', delayMs: 450000, probability: 1.0 } // Propaganda & Earth Politics
            ]
        },

        // ---------------------------------------------------------
        // THREAD 1: Resource Control (Focus: MARS ENGINEERING / LOGISTICS)
        // ---------------------------------------------------------
        {
            id: 'ev_thread1_resource_crisis',
            name: 'Polar Extractor Failure',
            description: 'A critical pump at Polar Extractor Alpha has failed due to lack of Earth-made spare parts.',
            location: [80.0, 0.0],
            hiddenFrom: ['earth_commander', 'earth_logistics', 'earth_display'],
            decisions: [
                {
                    role: 'mars_engineering',
                    text: 'Water reserves are dropping rapidly. How do we repair the extractor?',
                    options: [
                        { id: 'opt_cannibalize', text: 'Cannibalize life support systems in Sector 4.', effects: { scores: { mars_supply: 1, colony_morale: -1 }, triggerEvents: [{ id: 'ev_thread1_sector4_riot', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_jury_rig', text: 'Attempt a risky jury-rig without proper parts.', effects: { scores: { mars_supply: -1 }, triggerEvents: [{ id: 'ev_thread1_jury_rig_fails', delayMs: 90000, probability: 0.6 }, { id: 'ev_thread1_jury_rig_works', delayMs: 90000, probability: 0.4 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread1_sector4_riot',
            name: 'Riots in Sector 4',
            description: 'Reduced life support in Sector 4 has sparked riots against the rebellion leadership.',
            location: [1.0, 1.0],
            hiddenFrom: ['earth_commander', 'earth_logistics', 'earth_display'],
            decisions: [
                {
                    role: 'mars_leader',
                    text: 'Citizens are demanding a surrender to Earth. How do we respond?',
                    options: [
                        { id: 'opt_suppress', text: 'Send security forces to suppress the riot.', effects: { scores: { colony_morale: -1, tension: 1 }, triggerEvents: [{ id: 'ev_thread1_earth_detects_riot', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_appease', text: 'Divert emergency rations to Sector 4.', effects: { scores: { mars_supply: -1, colony_morale: 1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread1_jury_rig_fails',
            name: 'Extractor Blowout',
            description: 'The jury-rigged pump exploded, severely damaging the facility and causing casualties.',
            location: [80.0, 0.0],
            effects: { scores: { mars_supply: -2, colony_morale: -1 } },
            triggerEvents: [{ id: 'ev_thread1_earth_detects_riot', delayMs: 90000, probability: 1.0 }] // Earth detects the explosion
        },
        {
            id: 'ev_thread1_jury_rig_works',
            name: 'Extractor Stabilized',
            description: 'The risky repair held. Water flow is restored, buying the colony precious time.',
            location: [80.0, 0.0],
            hiddenFrom: ['earth_commander', 'earth_logistics', 'earth_display'],
            effects: { scores: { mars_supply: 1, colony_morale: 1 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }]
        },
        {
            id: 'ev_thread1_earth_detects_riot',
            name: 'UN Fleet Detects Instability',
            description: 'Sensors on the UNS Resolve have picked up signs of internal explosions or riots within the colony.',
            location: [0.0, 0.0],
            decisions: [
                {
                    role: 'earth_commander',
                    text: 'The colony appears vulnerable. Should we issue a surrender ultimatum or launch a precision strike?',
                    options: [
                        { id: 'opt_ultimatum', text: 'Broadcast surrender ultimatum.', effects: { scores: { propaganda_war: -1, tension: -1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 120000 }] } },
                        { id: 'opt_strike', text: 'Precision orbital strike on rebel military comms.', effects: { scores: { tension: 2, colony_morale: -1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 120000 }] } }
                    ]
                }
            ]
        },

        // ---------------------------------------------------------
        // THREAD 2: Orbital Blockade (Focus: COMMANDER / LEADER)
        // ---------------------------------------------------------
        {
            id: 'ev_thread2_blockade_run',
            name: 'Smuggler Ship Detected',
            description: 'A heavily modified civilian freighter is attempting to run the blockade from the asteroid belt.',
            location: [10.0, 10.0],
            decisions: [
                {
                    role: 'earth_commander',
                    text: 'The ship refuses to halt. It may contain vital supplies for the rebels, or it could be a trap.',
                    options: [
                        { id: 'opt_destroy_ship', text: 'Destroy the ship.', effects: { scores: { tension: 1, propaganda_war: 1 }, triggerEvents: [{ id: 'ev_thread2_ship_destroyed', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_board_ship', text: 'Deploy marines to board.', effects: { scores: { earth_supply: -1 }, triggerEvents: [{ id: 'ev_thread2_boarding_trap', delayMs: 90000, probability: 0.5 }, { id: 'ev_thread2_boarding_success', delayMs: 90000, probability: 0.5 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread2_ship_destroyed',
            name: 'Freighter Destroyed',
            description: 'The UN Fleet destroys the freighter. Debris analysis confirms it was carrying medical supplies.',
            location: [10.0, 10.0],
            effects: { scores: { mars_supply: -1, propaganda_war: 2 } }, // Mars wins propaganda
            triggerEvents: [{ id: 'ev_thread2_martian_retaliation', delayMs: 90000, probability: 1.0 }]
        },
        {
            id: 'ev_thread2_boarding_trap',
            name: 'Boarding Action Fails',
            description: 'The freighter was rigged with explosives. Several UN Marines are killed during the boarding action.',
            location: [10.0, 10.0],
            effects: { scores: { earth_supply: -1, tension: 2 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }]
        },
        {
            id: 'ev_thread2_boarding_success',
            name: 'Smugglers Captured',
            description: 'UN Marines successfully capture the freighter, seizing a large cache of rebel weapons and supplies.',
            location: [10.0, 10.0],
            effects: { scores: { earth_supply: 1, mars_supply: -1, propaganda_war: -1 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }]
        },
        {
            id: 'ev_thread2_martian_retaliation',
            name: 'Surface-to-Orbit Missiles Fired',
            description: 'In retaliation, rebel forces launch hidden surface-to-orbit missiles at the UN Fleet.',
            location: [5.0, 5.0],
            decisions: [
                {
                    role: 'mars_leader',
                    text: 'The missiles are away. Target the flagship or the supply haulers?',
                    hiddenFrom: ['earth_commander', 'earth_logistics', 'earth_display'],
                    options: [
                        { id: 'opt_target_flagship', text: 'Target UNS Resolve (High Risk)', effects: { scores: { tension: 2 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 120000 }] } },
                        { id: 'opt_target_haulers', text: 'Target UN Supply Haulers', effects: { scores: { earth_supply: -2, tension: 1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 120000 }] } }
                    ]
                }
            ]
        },

        // ---------------------------------------------------------
        // THREAD 3: Earth Propaganda (Focus: LOGISTICS / LEADER)
        // ---------------------------------------------------------
        {
            id: 'ev_thread3_earth_protests',
            name: 'Anti-War Protests on Earth',
            description: 'Massive protests have erupted in Geneva, demanding an end to the blockade and recognizing Mars independence.',
            location: [0, 0], // Off-map (Earth)
            hiddenFrom: ['mars_leader', 'mars_engineering', 'mars_display'],
            decisions: [
                {
                    role: 'earth_logistics',
                    text: 'The UN Security Council is pressuring us to resolve this quickly or face severe budget cuts.',
                    options: [
                        { id: 'opt_media_blackout', text: 'Institute a media blackout on fleet actions.', effects: { scores: { propaganda_war: 1, earth_supply: 1 }, triggerEvents: [{ id: 'ev_thread3_blackout_leaks', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_concessions', text: 'Offer minor political concessions to the protests.', effects: { scores: { propaganda_war: -1, tension: -1 }, triggerEvents: [{ id: 'ev_thread3_rebels_emboldened', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread3_blackout_leaks',
            name: 'Media Blackout Leaks',
            description: 'Whistleblowers in the UN Fleet leak footage of the blockade to Earth media, causing outrage.',
            location: [0, 0],
            effects: { scores: { propaganda_war: 2, earth_supply: -1 } }, // Mars wins propaganda
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }]
        },
        {
            id: 'ev_thread3_rebels_emboldened',
            name: 'Rebels Emboldened by Protests',
            description: 'News of the Earth protests reaches Mars, drastically boosting colony morale.',
            location: [0.0, 0.0],
            effects: { scores: { colony_morale: 2, propaganda_war: 1 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }]
        },

        // ---------------------------------------------------------
        // MANUAL ACTION RANDOM EVENTS
        // ---------------------------------------------------------
        { id: 'ev_hack_success', name: 'Cyber Warfare Success', description: 'Rebel hackers successfully disrupted UN Fleet comms.', effects: { scores: { propaganda_war: 1 } } },
        { id: 'ev_hack_traced', name: 'Hack Traced', description: 'UN Cyber-warfare units traced the hack and retaliated, damaging rebel infrastructure.', effects: { scores: { colony_morale: -1 } } },
        { id: 'ev_drop_success', name: 'Resupply Successful', description: 'Emergency supplies from Earth arrived safely at the fleet.', effects: { scores: { earth_supply: 1 } } },
        { id: 'ev_drop_intercepted', name: 'Resupply Intercepted', description: 'Rebel forces managed to intercept the drop pod using improvised tractors.', effects: { scores: { mars_supply: 1, earth_supply: -1 } } },

        // ---------------------------------------------------------
        // FACILITATOR INJECTS
        // ---------------------------------------------------------
        {
            id: 'ev_facil_earth_reinforcements',
            name: 'UN Reinforcements Arrive',
            description: 'A second UN task force arrives from Luna, tightening the blockade.',
            requiresUnlock: true,
            effects: { scores: { earth_supply: 2, tension: 1 } }
        },
        {
            id: 'ev_facil_earth_cyberattack',
            name: 'UN Cyberattack',
            description: 'A devastating UN cyberattack disables major sections of the Martian power grid.',
            requiresUnlock: true,
            effects: { scores: { mars_supply: -1, colony_morale: -1 } }
        },
        {
            id: 'ev_facil_mars_strike',
            name: 'Martian Labor Strike',
            description: 'Workers on Earth strike in solidarity with Mars, halting fleet resupply launches.',
            requiresUnlock: true,
            effects: { scores: { earth_supply: -2, propaganda_war: 1 } }
        },
        {
            id: 'ev_facil_mars_cache',
            name: 'Hidden Pre-War Cache Found',
            description: 'Rebel engineers discover a hidden cache of pre-war military supplies.',
            requiresUnlock: true,
            effects: { scores: { mars_supply: 2, colony_morale: 1 } }
        },

        // ---------------------------------------------------------
        // ENDGAME LOGIC
        // ---------------------------------------------------------
        {
            id: 'ev_endgame_trigger',
            name: 'The Breaking Point',
            description: 'Resources are exhausted and patience has run out.',
            triggerEvents: [
                { id: 'ev_end_earth_victory', delayMs: 1000 },
                { id: 'ev_end_mars_victory', delayMs: 1000 },
                { id: 'ev_end_destruction', delayMs: 1000 }
            ]
        },
        {
            id: 'ev_end_earth_victory',
            name: 'Scenario Concluded: Rebellion Crushed',
            description: 'Starved of resources and facing overwhelming firepower, Mars Colony Secundus surrenders to Earth Command.',
            isEndGame: true,
            conditions: { maxScores: { mars_supply: 2, colony_morale: 2 } }
        },
        {
            id: 'ev_end_mars_victory',
            name: 'Scenario Concluded: Martian Independence',
            description: 'Unable to sustain the expensive blockade and facing massive protests at home, the UN Fleet withdraws. Mars is free.',
            isEndGame: true,
            conditions: { minScores: { propaganda_war: 4, colony_morale: 3 } }
        },
        {
            id: 'ev_end_destruction',
            name: 'Scenario Concluded: Mutual Ruin',
            description: 'The conflict escalated beyond control. The colony infrastructure is destroyed, and the UN Fleet is heavily damaged. A pyrrhic outcome for all.',
            isEndGame: true,
            conditions: { minScores: { tension: 4 } }
        }
    ]
};