module.exports = {
    id: 'cuban_missile_crisis',
    name: 'The Cuban Missile Crisis',
    description: 'A 13-day diplomatic and military standoff between the United States and the Soviet Union over the installation of nuclear-armed Soviet missiles on Cuba.',
    mapConfig: {
        center: [23.1136, -82.3666], // Havana, Cuba
        zoom: 5
    },
    roles: [
        'usa_potus', 'usa_defsec', 'usa_intel', 'usa_display',
        'ussr_premier', 'ussr_defmin', 'ussr_kgb', 'ussr_display'
    ],
    roleNames: {
        'usa_potus': 'US President',
        'usa_defsec': 'US Secretary of Defense',
        'usa_intel': 'US Director of Central Intelligence',
        'usa_display': 'USA Strategic Command',
        'ussr_premier': 'Soviet Premier',
        'ussr_defmin': 'Soviet Minister of Defence',
        'ussr_kgb': 'Director of the KGB',
        'ussr_display': 'USSR Stavka Command'
    },
    minUsers: 4,
    mandatoryRoles: ['usa_potus', 'ussr_premier'],
    roleFallbacks: {
        'usa_intel': ['usa_defsec', 'usa_potus'],
        'usa_defsec': ['usa_potus'],
        'ussr_kgb': ['ussr_defmin', 'ussr_premier'],
        'ussr_defmin': ['ussr_premier']
    },
    initialScores: {
        global_tension: 3,
        nuclear_readiness: 1,
        diplomatic_progress: 2,
        usa_momentum: 3,
        ussr_momentum: 3
    },
    briefings: {
        _general: 'October 1962. U-2 spy planes have photographed medium-range ballistic missile sites under construction in Cuba. The world is on the brink of nuclear war. Factions must navigate military posturing and diplomatic backchannels to achieve their strategic goals without triggering global annihilation.',
        usa_potus: 'As President, you must balance military strength with diplomatic tact to remove the missiles from Cuba while avoiding World War III.',
        usa_defsec: 'As Secretary of Defense, your focus is on military readiness, the naval quarantine, and preparing for possible invasion strikes.',
        usa_intel: 'As DCI, you direct intelligence gathering, analyze Soviet intentions, and manage covert operations.',
        ussr_premier: 'As Premier, your goal is to secure Cuba, project Soviet strength globally, and extract concessions (like US missiles in Turkey) from the Americans.',
        ussr_defmin: 'As Defence Minister, you manage the deployment of Soviet forces, submarine escorts, and readiness of the missile sites.',
        ussr_kgb: 'As KGB Director, you handle counter-intelligence, secret diplomatic backchannels, and covert ground operations in Cuba.'
    },
    aiConfig: {
        systemPrompt: "You are an automated intelligence summary system. CRITICAL RULES: - Describe the objective situation. - NEVER refer to the player, 'you', 'your', or their role name. - Write exactly ONE short paragraph. - Start directly with the operational impact. Do not use greetings. - Stick to the provided facts.",
        scoreLabels: { 1: "Low", 2: "Elevated", 3: "Significant", 4: "Critical", 5: "Maximum" },
        roleContexts: {
            usa_potus: "Focus area: Global diplomatic posture and executive decisions.",
            usa_defsec: "Focus area: Naval blockades and military strike readiness.",
            usa_intel: "Focus area: Reconnaissance and Soviet troop movements.",
            ussr_premier: "Focus area: Geopolitical leverage and strategic signaling.",
            ussr_defmin: "Focus area: Missile site readiness and submarine patrols.",
            ussr_kgb: "Focus area: Covert operations and intelligence security."
        },
        scores: {
            global_tension: { label: "DEFCON / Tension", subject: "global nuclear tension", isPlural: false, roles: ["usa_potus", "ussr_premier"] },
            nuclear_readiness: { label: "Nuclear Readiness", subject: "strategic nuclear forces", isPlural: true, roles: ["usa_defsec", "ussr_defmin"] },
            diplomatic_progress: { label: "Diplomatic Channels", subject: "diplomatic negotiations", isPlural: true, roles: ["usa_potus", "ussr_premier"] },
            usa_momentum: { label: "US Initiative", subject: "US strategic initiative", isPlural: false, roles: ["usa_potus", "usa_defsec", "usa_intel"] },
            ussr_momentum: { label: "Soviet Initiative", subject: "Soviet strategic initiative", isPlural: false, roles: ["ussr_premier", "ussr_defmin", "ussr_kgb"] }
        }
    },
    variantAxes: [
        {
            id: 'us_intel_readiness',
            name: 'Initial US Intelligence Readiness',
            options: [
                { id: 'intel_high', name: 'High Alert', briefingText: 'US Intelligence has comprehensive early tracking of Soviet shipping.', scoreModifiers: { usa_momentum: 1 }, assetModifiers: [] },
                { id: 'intel_low', name: 'Delayed Analysis', briefingText: 'Photographic evidence was delayed in processing, reducing US response time.', scoreModifiers: { usa_momentum: -1 }, assetModifiers: [] }
            ]
        },
        {
            id: 'caribbean_weather',
            name: 'Caribbean Weather Conditions',
            options: [
                { id: 'weather_clear', name: 'Clear Skies', briefingText: 'Optimal weather allows unhindered U-2 flights and naval operations.', scoreModifiers: { nuclear_readiness: 1 }, assetModifiers: [] },
                { id: 'weather_storms', name: 'Tropical Storms', briefingText: 'Heavy cloud cover and rough seas hamper reconnaissance and naval blockades.', scoreModifiers: { diplomatic_progress: 1 }, assetModifiers: [] }
            ]
        }
    ],
    assets: [
        { id: 'a_cuba_missile_site', name: 'San Cristobal MRBM Site', location: [22.7, -83.0], state: 'operational', tags: ['military', 'ussr'], briefing: 'Primary suspected location of Soviet SS-4 medium-range ballistic missiles.' },
        { id: 'a_florida_base', name: 'Homestead AFB', location: [25.48, -80.38], state: 'operational', tags: ['military', 'usa'], briefing: 'Staging ground for US tactical air forces and potential invasion troops.' },
        { id: 'a_soviet_convoy', name: 'Soviet Freighter Poltava', location: [24.0, -60.0], state: 'operational', tags: ['naval', 'ussr'], briefing: 'Suspected of carrying additional missile components to Cuba.' },
        { id: 'a_us_blockade', name: 'US Quarantine Line', location: [24.5, -65.0], state: 'operational', tags: ['naval', 'usa'], briefing: 'The "quarantine" perimeter established by the US Navy.' }
    ],
    manualActions: [
        {
            id: 'act_usa_recon',
            name: 'Order Covert U-2 Sortie',
            description: 'Request an immediate intelligence sweep over Cuba.',
            initiator: ['usa_intel'],
            requiresApprovalFrom: ['usa_potus'],
            conditions: { minScores: { usa_momentum: 1 } },
            effects: {
                scores: { global_tension: 1, usa_momentum: 1 },
                randomEvents: [
                    { id: 'ev_u2_success_manual', weight: 70, effects: { scores: { usa_momentum: 1 } } },
                    { id: 'ev_u2_shot_down_manual', weight: 30, effects: { scores: { global_tension: 2, diplomatic_progress: -1 } } }
                ]
            }
        },
        {
            id: 'act_ussr_sub_patrol',
            name: 'Aggressive Submarine Patrol',
            description: 'Order B-59 and other Foxtrot-class subs to surface near the quarantine line to project strength.',
            initiator: ['ussr_defmin'],
            requiresApprovalFrom: ['ussr_premier'],
            conditions: { minScores: { ussr_momentum: 1 } },
            effects: {
                scores: { global_tension: 1, ussr_momentum: 1 },
                randomEvents: [
                    { id: 'ev_sub_evades_manual', weight: 60, effects: { scores: { ussr_momentum: 1 } } },
                    { id: 'ev_sub_depth_charge_manual', weight: 40, effects: { scores: { global_tension: 2, diplomatic_progress: -1 } } }
                ]
            }
        },
        {
            id: 'act_backchannel_push',
            name: 'Initiate Urgent Backchannel',
            description: 'Attempt to bypass formal diplomacy using journalists or intelligence assets.',
            initiator: ['ussr_kgb'],
            requiresApprovalFrom: ['ussr_premier'],
            conditions: { minScores: { global_tension: 3 } },
            effects: {
                scores: { diplomatic_progress: 1 },
                randomEvents: [
                    { id: 'ev_backchannel_success', weight: 50, effects: { scores: { diplomatic_progress: 1 } } },
                    { id: 'ev_backchannel_fail', weight: 50, effects: { scores: { usa_momentum: -1 } } }
                ]
            }
        }
    ],
    eventTemplates: [
        {
            id: 'ev_start',
            name: 'EXCOMM and Stavka Convene',
            description: 'The existence of Soviet missiles in Cuba is confirmed. Both sides convene their top military and political leadership.',
            location: [38.8951, -77.0364], // Washington DC
            decisions: [],
            triggerEvents: [
                { id: 'ev_thread1_quarantine_init', delayMs: 90000, probability: 1.0 }, // Naval Blockade
                { id: 'ev_thread2_diplomacy_init', delayMs: 270000, probability: 1.0 }, // Backchannel Diplomacy
                { id: 'ev_thread3_intel_init', delayMs: 450000, probability: 1.0 } // U-2 & Intelligence
            ]
        },

        // ---------------------------------------------------------
        // THREAD 1: Naval Blockade / Quarantine (Focus: DEFSEC / DEFMIN)
        // ---------------------------------------------------------
        {
            id: 'ev_thread1_quarantine_init',
            name: 'Quarantine Line Established',
            description: 'US Naval forces establish a quarantine line around Cuba. Soviet freighters are approaching.',
            location: [24.5, -65.0],
            decisions: [
                {
                    role: 'usa_defsec',
                    text: 'What are the rules of engagement for the blockade?',
                    options: [
                        { id: 'opt_strict_roe', text: 'Strict ROE: Warning shots only', effects: { scores: { usa_momentum: -1, diplomatic_progress: 1 }, triggerEvents: [{ id: 'ev_thread1_soviet_approach', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_loose_roe', text: 'Loose ROE: Disable vessels running the line', effects: { scores: { global_tension: 1, usa_momentum: 1 }, triggerEvents: [{ id: 'ev_thread1_soviet_approach', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread1_soviet_approach',
            name: 'Soviet Convoy Nears Quarantine',
            description: 'The Soviet freighter Poltava is nearing the US quarantine line, escorted by Foxtrot submarines.',
            location: [24.0, -60.0],
            hiddenFrom: ['usa_potus', 'usa_defsec', 'usa_intel', 'usa_display'],
            decisions: [
                {
                    role: 'ussr_defmin',
                    text: 'Orders for the Poltava?',
                    options: [
                        { id: 'opt_hold_course', text: 'Hold course. Challenge the blockade.', effects: { scores: { ussr_momentum: 1, global_tension: 1 }, triggerEvents: [{ id: 'ev_thread1_sub_encounter', delayMs: 90000, probability: 0.7 }, { id: 'ev_thread1_convoy_turns', delayMs: 90000, probability: 0.3 }] } },
                        { id: 'opt_turn_around', text: 'Turn the convoy around.', effects: { scores: { ussr_momentum: -1, diplomatic_progress: 1 }, triggerEvents: [{ id: 'ev_thread1_convoy_turns', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread1_sub_encounter',
            name: 'B-59 Submarine Incident',
            description: 'US destroyers detect a Soviet submarine (B-59) near the quarantine line and begin dropping signaling depth charges.',
            location: [24.5, -65.0],
            decisions: [
                {
                    role: 'ussr_defmin',
                    text: 'Submarine B-59 reports depth charges. Communications with Moscow are severed.',
                    hiddenFrom: ['usa_potus', 'usa_defsec', 'usa_intel', 'usa_display'],
                    options: [
                        { id: 'opt_arm_torpedo', text: 'Arm nuclear torpedo (Requires consensus onboard)', effects: { scores: { global_tension: 2, nuclear_readiness: 1 }, triggerEvents: [{ id: 'ev_thread1_b59_surfaces', delayMs: 90000, probability: 0.8 }, { id: 'ev_endgame_trigger', delayMs: 90000, probability: 0.2 }] } },
                        { id: 'opt_surface', text: 'Order sub to surface and identify', effects: { scores: { ussr_momentum: -1, diplomatic_progress: 1 }, triggerEvents: [{ id: 'ev_thread1_b59_surfaces', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread1_convoy_turns',
            name: 'Soviet Ships Reverse Course',
            description: 'US Navy reports that Soviet freighters appear to be turning around, halting at the quarantine line.',
            location: [24.0, -60.0],
            effects: { scores: { usa_momentum: 1, global_tension: -1 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 360000 }] // Towards resolution
        },
        {
            id: 'ev_thread1_b59_surfaces',
            name: 'Soviet Submarine Surfaces',
            description: 'A Soviet Foxtrot-class submarine surfaces within the quarantine zone amidst US naval vessels.',
            location: [24.5, -65.0],
            effects: { scores: { usa_momentum: 1, diplomatic_progress: 1 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 360000 }]
        },

        // ---------------------------------------------------------
        // THREAD 2: Diplomatic Backchannels (Focus: POTUS / PREMIER / KGB)
        // ---------------------------------------------------------
        {
            id: 'ev_thread2_diplomacy_init',
            name: 'The Scali-Fomin Backchannel',
            description: 'ABC News correspondent John Scali is approached by KGB operative Aleksandr Fomin with a proposal.',
            location: [38.8951, -77.0364], // Washington DC
            hiddenFrom: ['ussr_premier', 'ussr_defmin', 'ussr_kgb', 'ussr_display'],
            decisions: [
                {
                    role: 'usa_potus',
                    text: 'Fomin proposes Soviet withdrawal from Cuba in exchange for a public US pledge not to invade. Response?',
                    options: [
                        { id: 'opt_accept_fomin', text: 'Accept the proposal conditionally.', effects: { scores: { diplomatic_progress: 1 }, triggerEvents: [{ id: 'ev_thread2_khrushchev_letter1', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_reject_fomin', text: 'Reject informal offers. Demand formal UN resolution.', effects: { scores: { usa_momentum: 1, global_tension: 1 }, triggerEvents: [{ id: 'ev_thread2_khrushchev_letter1', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread2_khrushchev_letter1',
            name: 'Khrushchev\'s First Letter',
            description: 'A long, emotional letter arrives from Premier Khrushchev, echoing the Fomin proposal for a non-invasion pledge.',
            location: [55.7558, 37.6173], // Moscow
            hiddenFrom: ['usa_potus', 'usa_defsec', 'usa_intel', 'usa_display'],
            decisions: [
                {
                    role: 'ussr_premier',
                    text: 'The Politburo urges a tougher stance. Send a second, more demanding letter?',
                    options: [
                        { id: 'opt_send_letter2', text: 'Send Letter 2: Demand removal of US Jupiters from Turkey.', effects: { scores: { ussr_momentum: 1, diplomatic_progress: -1 }, triggerEvents: [{ id: 'ev_thread2_letter2_received', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_hold_firm', text: 'Stand by the first letter.', effects: { scores: { diplomatic_progress: 1 }, triggerEvents: [{ id: 'ev_thread2_trollope_ploy', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread2_letter2_received',
            name: 'Khrushchev\'s Second Letter',
            description: 'A second, much more belligerent letter from Moscow is broadcast publicly, demanding the removal of US Jupiter missiles from Turkey.',
            location: [38.8951, -77.0364], // Washington DC
            decisions: [
                {
                    role: 'usa_potus',
                    text: 'How do we respond to the contradictory letters?',
                    options: [
                        { id: 'opt_trollope', text: 'Trollope Ploy: Ignore the second letter, accept the first.', effects: { scores: { diplomatic_progress: 1, usa_momentum: 1 }, triggerEvents: [{ id: 'ev_thread2_robert_kennedy_meeting', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_hardline', text: 'Reject both. Prepare airstrikes on Cuba.', effects: { scores: { global_tension: 2, nuclear_readiness: 1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread2_trollope_ploy',
            name: 'US Accepts Initial Terms',
            description: 'The US formally accepts the terms of the first letter, pledging not to invade Cuba.',
            location: [38.8951, -77.0364],
            effects: { scores: { diplomatic_progress: 2, global_tension: -1 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }]
        },
        {
            id: 'ev_thread2_robert_kennedy_meeting',
            name: 'RFK-Dobrynin Meeting',
            description: 'Robert Kennedy meets Soviet Ambassador Dobrynin in secret.',
            location: [38.8951, -77.0364], // Washington DC
            hiddenFrom: ['ussr_premier', 'ussr_defmin', 'ussr_kgb', 'ussr_display'],
            decisions: [
                {
                    role: 'usa_potus',
                    text: 'Authorize RFK to offer a secret deal on Jupiter missiles in Turkey?',
                    options: [
                        { id: 'opt_offer_turkey', text: 'Offer secret withdrawal from Turkey in 6 months.', effects: { scores: { diplomatic_progress: 2, global_tension: -1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 120000, probability: 1.0 }] } },
                        { id: 'opt_no_deal', text: 'Refuse Turkey deal. Ultimatum on Cuba.', effects: { scores: { global_tension: 2, usa_momentum: 1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 120000, probability: 1.0 }] } }
                    ]
                }
            ]
        },

        // ---------------------------------------------------------
        // THREAD 3: Intelligence / U-2 Operations (Focus: INTEL / KGB)
        // ---------------------------------------------------------
        {
            id: 'ev_thread3_intel_init',
            name: 'Black Saturday: U-2 Sorties',
            description: 'Strategic Air Command has ordered extensive U-2 reconnaissance flights over Cuba and the Soviet Arctic.',
            location: [22.7, -83.0], // Cuba
            hiddenFrom: ['usa_potus', 'usa_defsec', 'usa_intel', 'usa_display'],
            decisions: [
                {
                    role: 'ussr_defmin',
                    text: 'Local Soviet commanders in Cuba track a US U-2 spy plane overhead.',
                    options: [
                        { id: 'opt_shoot_down', text: 'Authorize SA-2 SAM launch to shoot it down.', effects: { scores: { global_tension: 2, ussr_momentum: 1 }, triggerEvents: [{ id: 'ev_thread3_u2_shot_down', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_hold_fire', text: 'Hold fire. Do not provoke.', effects: { scores: { diplomatic_progress: 1, ussr_momentum: -1 }, triggerEvents: [{ id: 'ev_thread3_u2_survives', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread3_u2_shot_down',
            name: 'U-2 Shot Down Over Cuba',
            description: 'Major Rudolf Anderson\'s U-2 plane is shot down by a Soviet SAM over Cuba. He is killed in action.',
            location: [22.7, -83.0],
            decisions: [
                {
                    role: 'usa_defsec',
                    text: 'A US pilot is dead. EXCOMM previously agreed to retaliate if a U-2 was downed.',
                    options: [
                        { id: 'opt_retaliate', text: 'Launch airstrikes on Cuban SAM sites.', effects: { scores: { global_tension: 2, nuclear_readiness: 2 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 90000, probability: 1.0 }] } },
                        { id: 'opt_pause', text: 'Hold retaliation. Give diplomacy one last chance.', effects: { scores: { diplomatic_progress: 1, usa_momentum: -1 }, triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 90000, probability: 1.0 }] } }
                    ]
                }
            ]
        },
        {
            id: 'ev_thread3_u2_survives',
            name: 'U-2 Completes Mission',
            description: 'The U-2 returns safely with critical intelligence confirming missile sites are fully operational.',
            location: [25.48, -80.38], // Homestead
            effects: { scores: { usa_momentum: 1, nuclear_readiness: 1 } },
            triggerEvents: [{ id: 'ev_endgame_trigger', delayMs: 180000 }]
        },

        // ---------------------------------------------------------
        // MANUAL ACTION RANDOM EVENTS (Stubs to satisfy the schema)
        // ---------------------------------------------------------
        { id: 'ev_u2_success_manual', name: 'Intel: Recon Success', description: 'Covert U-2 flight gathered valuable intelligence without incident.', effects: { scores: { usa_momentum: 1 } } },
        { id: 'ev_u2_shot_down_manual', name: 'Intel: Recon Intercepted', description: 'A U-2 plane was fired upon, drastically raising tensions.', effects: { scores: { global_tension: 2 } } },
        { id: 'ev_sub_evades_manual', name: 'Soviet Naval Flex', description: 'Soviet subs successfully penetrated the quarantine line undetected.', effects: { scores: { ussr_momentum: 1 } } },
        { id: 'ev_sub_depth_charge_manual', name: 'Submarine Crisis', description: 'US destroyers dropped depth charges on a Soviet sub, nearly sparking war.', effects: { scores: { global_tension: 2 } } },
        { id: 'ev_backchannel_success', name: 'Backchannel Breakthrough', description: 'KGB-CIA backchannel yields constructive dialogue.', effects: { scores: { diplomatic_progress: 1 } } },
        { id: 'ev_backchannel_fail', name: 'Backchannel Burned', description: 'The backchannel was leaked to the press, embarrassing both sides.', effects: { scores: { usa_momentum: -1, ussr_momentum: -1 } } },

        // ---------------------------------------------------------
        // FACILITATOR INJECTS (Requires Unlock)
        // ---------------------------------------------------------
        {
            id: 'ev_facil_usa_ally',
            name: 'OAS Support',
            description: 'The Organization of American States unanimously supports the US quarantine.',
            requiresUnlock: true,
            effects: { scores: { usa_momentum: 2, diplomatic_progress: 1 } }
        },
        {
            id: 'ev_facil_usa_sabotage',
            name: 'CIA Sabotage Success',
            description: 'CIA operatives successfully sabotage a Cuban rail line, delaying missile readiness.',
            requiresUnlock: true,
            effects: { scores: { usa_momentum: 1, ussr_momentum: -1 } }
        },
        {
            id: 'ev_facil_ussr_cuba_push',
            name: 'Castro Demands Action',
            description: 'Fidel Castro demands Soviet preemptive strikes against the US, rallying Cuban forces.',
            requiresUnlock: true,
            effects: { scores: { ussr_momentum: 2, global_tension: 1 } }
        },
        {
            id: 'ev_facil_ussr_berlin',
            name: 'Pressure on Berlin',
            description: 'Soviet forces increase pressure in West Berlin, dividing US attention.',
            requiresUnlock: true,
            effects: { scores: { ussr_momentum: 1, usa_momentum: -1 } }
        },

        // ---------------------------------------------------------
        // ENDGAME LOGIC
        // ---------------------------------------------------------
        {
            id: 'ev_endgame_trigger',
            name: 'The Climax',
            description: 'The critical deadline has been reached.',
            triggerEvents: [
                { id: 'ev_end_nuclear_war', delayMs: 1000 },
                { id: 'ev_end_peaceful_res', delayMs: 1000 },
                { id: 'ev_end_stalemate', delayMs: 1000 }
            ]
        },
        {
            id: 'ev_end_nuclear_war',
            name: 'Scenario Concluded: Mutual Assured Destruction',
            description: 'Miscalculations and aggressive posturing have led to the launch of nuclear weapons. Millions are dead.',
            isEndGame: true,
            conditions: { minScores: { global_tension: 5, nuclear_readiness: 4 } }
        },
        {
            id: 'ev_end_peaceful_res',
            name: 'Scenario Concluded: Diplomatic Triumph',
            description: 'Through secret backchannels and careful diplomacy, a deal was struck. The missiles will be removed.',
            isEndGame: true,
            conditions: { minScores: { diplomatic_progress: 4 }, maxScores: { global_tension: 4 } }
        },
        {
            id: 'ev_end_stalemate',
            name: 'Scenario Concluded: Frozen Standoff',
            description: 'Neither side blinked, but neither side fired. The blockade remains, and the world holds its breath.',
            isEndGame: true,
            conditions: { maxScores: { diplomatic_progress: 3, global_tension: 4 } }
        }
    ]
};