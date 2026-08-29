module.exports = {
    id: 'falklands_2',
    name: 'Falklands II: Southern Storm',
    description: 'A surprise aggressive move by Argentine forces threatens the Falkland Islands. As the UK Military Commander, you must secure the islands, manage political pressure from the PM, and decide whether to strike the Argentine mainland.',
    mapConfig: {
        center: [-51.6977, -59.5236], // Falkland Islands
        zoom: 7
    },
    roles: ['uk_commander'],
    roleNames: {
        uk_commander: 'UK Task Force Commander'
    },
    minUsers: 1,
    mandatoryRoles: ['uk_commander'],
    initialScores: {
        uk_public_support: 3,
        military_readiness: 3,
        international_pressure: 3,
        argentina_aggression: 4,
        supply_lines: 3
    },
    aiConfig: {
        systemPrompt: "You are an AI military assistant briefing the UK Task Force Commander on the evolving situation in the South Atlantic. Provide concise, tactical, and slightly tense briefings, emphasizing the immediate threats and strategic implications.",
        scoreLabels: {
            1: "Critical",
            2: "Poor",
            3: "Stable",
            4: "Good",
            5: "Excellent"
        },
        roleContexts: {
            uk_commander: "You are responsible for all UK military operations in the South Atlantic, reporting directly to the Ministry of Defence and the Prime Minister."
        },
        scores: {
            uk_public_support: {
                label: "UK Public Support",
                subject: "UK public support",
                isPlural: false,
                roles: ["uk_commander"]
            },
            military_readiness: {
                label: "Military Readiness",
                subject: "military readiness",
                isPlural: false,
                roles: ["uk_commander"]
            },
            international_pressure: {
                label: "International Pressure",
                subject: "international pressure",
                isPlural: false,
                roles: ["uk_commander"]
            },
            argentina_aggression: {
                label: "Argentine Aggression",
                subject: "Argentine aggression",
                isPlural: false,
                roles: ["uk_commander"]
            },
            supply_lines: {
                label: "Supply Lines",
                subject: "supply lines",
                isPlural: true,
                roles: ["uk_commander"]
            }
        }
    },
    assets: [
        {
            id: 'ascension_island',
            name: 'RAF Ascension Island',
            location: [-7.946, -14.371],
            state: 'operational',
            tags: ['military', 'airbase']
        },
        {
            id: 'mount_pleasant',
            name: 'RAF Mount Pleasant',
            location: [-51.823, -58.447],
            state: 'operational',
            tags: ['military', 'airbase']
        },
        {
            id: 'port_stanley',
            name: 'Port Stanley',
            location: [-51.692, -57.858],
            state: 'operational',
            tags: ['civilian', 'capital']
        },
        {
            id: 'rio_gallegos',
            name: 'Rio Gallegos Air Base (Arg)',
            location: [-51.609, -69.289],
            state: 'operational',
            tags: ['military', 'airbase']
        },
        {
            id: 'rio_grande',
            name: 'Rio Grande Air Base (Arg)',
            location: [-53.777, -67.755],
            state: 'operational',
            tags: ['military', 'airbase']
        },
        {
            id: 'hms_defender',
            name: 'HMS Defender (Type 45)',
            location: [-51.4, -57.5],
            state: 'operational',
            tags: ['military', 'naval']
        },
        {
            id: 'falklands_typhoons',
            name: '1435 Flight (4x Typhoon FGR4)',
            location: [-51.823, -58.447],
            state: 'operational',
            tags: ['military', 'air']
        },
        {
            id: 'falklands_helis',
            name: '1564 Flight (Chinook/Puma)',
            location: [-51.823, -58.447],
            state: 'operational',
            tags: ['military', 'air']
        },
        {
            id: 'falklands_a400m',
            name: 'A400M Atlas',
            location: [-51.823, -58.447],
            state: 'operational',
            tags: ['military', 'air']
        },
        {
            id: 'ascension_voyager',
            name: 'Voyager KC2 (Refueler)',
            location: [-7.946, -14.371],
            state: 'operational',
            tags: ['military', 'air']
        }
    ],
    variantAxes: [
        {
            id: 'ascension_status',
            name: 'Ascension Island Status',
            options: [
                {
                    id: 'ascension_operational',
                    name: 'Fully Operational',
                    briefingText: 'RAF Ascension Island is fully operational, acting as a vital staging post for the Task Force.',
                    roleBriefings: {
                        uk_commander: 'Our main logistics hub at Ascension is secure and facilitating rapid deployment.'
                    },
                    scoreModifiers: {
                        supply_lines: 1
                    }
                },
                {
                    id: 'ascension_sabotaged',
                    name: 'Sabotaged / Out of Use',
                    briefingText: 'A covert sabotage attack on the fuel depot at RAF Ascension Island has rendered it temporarily unusable as a staging point.',
                    roleBriefings: {
                        uk_commander: 'With Ascension crippled, our supply lines are stretched to the breaking point. Reinforcements will take much longer.'
                    },
                    scoreModifiers: {
                        supply_lines: -2,
                        military_readiness: -1
                    },
                    assetModifiers: [
                        {
                            id: 'ascension_island',
                            name: 'RAF Ascension Island',
                            location: [-7.946, -14.371],
                            state: 'sabotaged',
                            tags: ['military', 'airbase']
                        }
                    ]
                }
            ]
        },
        {
            id: 'weather_conditions',
            name: 'Weather Conditions',
            options: [
                {
                    id: 'weather_clear',
                    name: 'Clear Skies',
                    briefingText: 'The weather in the South Atlantic is currently clear, favoring air and naval operations.',
                    roleBriefings: {
                        uk_commander: 'Clear weather will allow our air assets to operate at peak efficiency.'
                    },
                    scoreModifiers: {
                        military_readiness: 1
                    }
                },
                {
                    id: 'weather_storm',
                    name: 'Severe Storms',
                    briefingText: 'A severe storm system is moving through the South Atlantic, hindering operations and delaying supply lines.',
                    roleBriefings: {
                        uk_commander: 'Expect significant delays in reinforcements and reduced effectiveness of early warning radar.'
                    },
                    scoreModifiers: {
                        military_readiness: -1,
                        supply_lines: -1
                    }
                }
            ]
        },
        {
            id: 'early_warning',
            name: 'Early Warning Intel',
            options: [
                {
                    id: 'intel_surprise',
                    name: 'Surprise Attack',
                    briefingText: 'Argentine forces have mobilized with unexpected speed, catching UK defenses off guard.',
                    roleBriefings: {
                        uk_commander: 'We are on the back foot. Immediate action is required to secure key installations.'
                    },
                    scoreModifiers: {
                        argentina_aggression: 1,
                        international_pressure: 1
                    },
                    assetModifiers: [
                        {
                            id: 'hms_defender',
                            name: 'HMS Defender (Type 45)',
                            location: [-50.0, -56.0], // Further away
                            state: 'operational',
                            tags: ['military', 'naval']
                        }
                    ]
                },
                {
                    id: 'intel_advanced',
                    name: 'Advance Warning',
                    briefingText: 'GCHQ has provided advance warning of Argentine mobilization, allowing for preemptive defensive posture.',
                    roleBriefings: {
                        uk_commander: 'Assets are in position and ready to repel the initial assault.'
                    },
                    scoreModifiers: {
                        military_readiness: 1,
                        uk_public_support: 1
                    },
                    assetModifiers: [
                        {
                            id: 'hms_defender',
                            name: 'HMS Defender (Type 45)',
                            location: [-51.5, -58.0], // Closer
                            state: 'operational',
                            tags: ['military', 'naval']
                        }
                    ]
                }
            ]
        }
    ],
    stages: [],
    eventTemplates: [
        {
            id: 'ev_start',
            name: 'Initial Reports of Aggression',
            description: 'Multiple reports indicate Argentine naval elements and aircraft have crossed into the exclusion zone.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'Sir, early warning systems confirm multiple bogeys inbound. We have a rapidly developing situation on our hands.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'How should we respond to this initial incursion?',
                    options: [
                        {
                            id: 'opt_scramble',
                            text: 'Scramble 1435 Flight Typhoons to intercept.',
                            effects: {
                                scores: { military_readiness: 1, argentina_aggression: 1 },
                                triggerEvents: [
                                    { id: 'ev_naval_skirmish', delayMs: 90000, probability: 1.0 },
                                    { id: 'ev_ground_incursion', delayMs: 180000, probability: 1.0 },
                                    { id: 'ev_political_pressure', delayMs: 270000, probability: 1.0 },
                                    { id: 'ev_us_support', delayMs: 360000, probability: 0.8 },
                                    { id: 'ev_un_sanctions', delayMs: 360000, probability: 0.8 }
                                ]
                            }
                        },
                        {
                            id: 'opt_defensive',
                            text: 'Maintain defensive posture and monitor.',
                            effects: {
                                scores: { uk_public_support: -1, international_pressure: -1 },
                                triggerEvents: [
                                    { id: 'ev_naval_skirmish', delayMs: 90000, probability: 1.0 },
                                    { id: 'ev_ground_incursion', delayMs: 180000, probability: 1.0 },
                                    { id: 'ev_political_pressure', delayMs: 270000, probability: 1.0 },
                                    { id: 'ev_us_support', delayMs: 360000, probability: 0.8 },
                                    { id: 'ev_un_sanctions', delayMs: 360000, probability: 0.8 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // --- THREAD 1: Naval / Air Combat ---
        {
            id: 'ev_naval_skirmish',
            name: 'Naval Skirmish off East Falkland',
            description: 'HMS Defender is engaging multiple fast attack craft and incoming anti-ship missiles.',
            location: [-51.4, -57.5],
            roleDescriptions: {
                uk_commander: 'Defender is tracking multiple sea-skimming targets. We need immediate authorization to use lethal force beyond self-defense.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Authorize offensive strikes against the attack craft?',
                    options: [
                        {
                            id: 'opt_engage_all',
                            text: 'Weapons free. Sink them.',
                            effects: {
                                scores: { argentina_aggression: -1, international_pressure: 1 },
                                triggerEvents: [
                                    { id: 'ev_air_raid', delayMs: 100000, probability: 0.8 }
                                ]
                            }
                        },
                        {
                            id: 'opt_evade',
                            text: 'Prioritize point defense and evasive maneuvers.',
                            effects: {
                                scores: { military_readiness: -1 },
                                triggerEvents: [
                                    { id: 'ev_ship_damaged', delayMs: 95000, probability: 0.6 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_air_raid',
            name: 'Air Raid on Mount Pleasant',
            description: 'Argentine aircraft are attempting to bomb the runway at RAF Mount Pleasant.',
            location: [-51.823, -58.447],
            roleDescriptions: {
                uk_commander: 'Incoming strike package. If we lose the runway, our air superiority is gone.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'How should we allocate our limited air defenses?',
                    options: [
                        {
                            id: 'opt_defend_runway',
                            text: 'Focus all batteries on protecting the runway.',
                            effects: {
                                scores: { military_readiness: 1, supply_lines: 1 },
                                triggerEvents: [
                                    { id: 'ev_naval_victory', delayMs: 120000, probability: 0.7 }
                                ]
                            }
                        },
                        {
                            id: 'opt_intercept_fighters',
                            text: 'Send fighters to engage them before they drop.',
                            effects: {
                                scores: { argentina_aggression: -1 },
                                triggerEvents: [
                                    { id: 'ev_naval_victory', delayMs: 120000, probability: 0.5 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_ship_damaged',
            name: 'HMS Defender Takes Damage',
            description: 'An Exocet missile has struck HMS Defender, causing significant damage.',
            location: [-51.4, -57.5],
            roleDescriptions: {
                uk_commander: 'Damage control teams are fighting fires. The ship is limping.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'What is the order for HMS Defender?',
                    options: [
                        {
                            id: 'opt_withdraw',
                            text: 'Withdraw from the combat zone.',
                            effects: {
                                scores: { uk_public_support: -1, military_readiness: -1 },
                                triggerEvents: [
                                    { id: 'ev_naval_defeat', delayMs: 110000, probability: 0.9 }
                                ]
                            }
                        },
                        {
                            id: 'opt_fight_on',
                            text: 'Maintain station and provide radar coverage.',
                            effects: {
                                scores: { military_readiness: 1, uk_public_support: 1 },
                                triggerEvents: [
                                    { id: 'ev_naval_victory', delayMs: 110000, probability: 0.4 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_naval_victory',
            name: 'Sea Control Re-established',
            description: 'The Royal Navy has successfully repelled the naval and air assaults, securing the waters around the islands.',
            location: [-51.5, -58.0],
            roleDescriptions: {
                uk_commander: 'The immediate naval threat has been neutralized, sir. We own the seas again.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Acknowledge report.',
                    options: [
                        {
                            id: 'opt_ack',
                            text: 'Understood. Shift focus to ground ops.',
                            effects: {
                                scores: { uk_public_support: 1, military_readiness: 1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_naval_defeat',
            name: 'Loss of Sea Control',
            description: 'UK naval forces have been forced to retreat, leaving the islands vulnerable to resupply.',
            location: [-51.5, -58.0],
            roleDescriptions: {
                uk_commander: 'We cannot sustain this fight at sea. We must rely on our ground forces now.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Acknowledge report.',
                    options: [
                        {
                            id: 'opt_ack',
                            text: 'Understood. Dig in on the ground.',
                            effects: {
                                scores: { uk_public_support: -2, military_readiness: -1 }
                            }
                        }
                    ]
                }
            ]
        },

        // --- THREAD 2: Ground Operations ---
        {
            id: 'ev_ground_incursion',
            name: 'Heliborne Assault on Port Stanley',
            description: 'Argentine special forces have landed near Port Stanley via helicopter.',
            location: [-51.692, -57.858],
            roleDescriptions: {
                uk_commander: 'Hostiles touch down on the outskirts of Stanley. The civilian population is at risk.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'How should we counter the landing?',
                    options: [
                        {
                            id: 'opt_counter_attack',
                            text: 'Immediate infantry counter-attack.',
                            effects: {
                                scores: { military_readiness: -1, argentina_aggression: -1 },
                                triggerEvents: [
                                    { id: 'ev_urban_combat', delayMs: 105000, probability: 0.8 }
                                ]
                            }
                        },
                        {
                            id: 'opt_cordon',
                            text: 'Establish a cordon and protect civilians.',
                            effects: {
                                scores: { uk_public_support: 1 },
                                triggerEvents: [
                                    { id: 'ev_standoff', delayMs: 110000, probability: 0.7 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_urban_combat',
            name: 'Heavy Fighting in Stanley',
            description: 'Fierce street-to-street fighting has broken out in Port Stanley.',
            location: [-51.692, -57.858],
            roleDescriptions: {
                uk_commander: 'Casualties are mounting. We are struggling to root them out of the residential areas without causing collateral damage.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Authorize heavy weapons in urban areas?',
                    options: [
                        {
                            id: 'opt_heavy_weapons',
                            text: 'Yes. We must break them quickly.',
                            effects: {
                                scores: { uk_public_support: -1, international_pressure: 1 },
                                triggerEvents: [
                                    { id: 'ev_ground_victory', delayMs: 115000, probability: 0.9 }
                                ]
                            }
                        },
                        {
                            id: 'opt_infantry_only',
                            text: 'No. Rely on infantry tactics.',
                            effects: {
                                scores: { military_readiness: -1 },
                                triggerEvents: [
                                    { id: 'ev_standoff', delayMs: 120000, probability: 0.6 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_standoff',
            name: 'Stalemate at Stanley',
            description: 'A tense standoff has developed. Neither side is making ground.',
            location: [-51.692, -57.858],
            roleDescriptions: {
                uk_commander: 'They are dug in. We need to break this deadlock before they can reinforce.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'How to break the deadlock?',
                    options: [
                        {
                            id: 'opt_night_assault',
                            text: 'Launch a night assault.',
                            effects: {
                                scores: { military_readiness: -1, argentina_aggression: -1 },
                                triggerEvents: [
                                    { id: 'ev_ground_victory', delayMs: 110000, probability: 0.7 }
                                ]
                            }
                        },
                        {
                            id: 'opt_wait',
                            text: 'Wait for reinforcements.',
                            effects: {
                                scores: { uk_public_support: -1 },
                                triggerEvents: [
                                    { id: 'ev_ground_defeat', delayMs: 125000, probability: 0.5 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_ground_victory',
            name: 'Port Stanley Secured',
            description: 'UK forces have successfully neutralized the Argentine threat in Port Stanley.',
            location: [-51.692, -57.858],
            roleDescriptions: {
                uk_commander: 'Stanley is clear. The locals are safe, and we have prisoners.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Acknowledge report.',
                    options: [
                        {
                            id: 'opt_ack',
                            text: 'Excellent work.',
                            effects: {
                                scores: { uk_public_support: 1, argentina_aggression: -1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_ground_defeat',
            name: 'Stanley Occupied',
            description: 'Argentine forces have taken control of Port Stanley.',
            location: [-51.692, -57.858],
            roleDescriptions: {
                uk_commander: 'We have been pushed out of the capital. This is a disaster.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Acknowledge report.',
                    options: [
                        {
                            id: 'opt_ack',
                            text: 'Regroup and prepare to retake it.',
                            effects: {
                                scores: { uk_public_support: -2, international_pressure: 1 }
                            }
                        }
                    ]
                }
            ]
        },

        // --- THREAD 3: Political & Mainland Strikes ---
        {
            id: 'ev_political_pressure',
            name: 'PM Demands Decisive Action',
            description: 'Downing Street is demanding a strong response to reassure the public.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'The PM is on a secure line. They want a spectacular win, or they will authorize mainland strikes politically.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'How to handle the political pressure?',
                    options: [
                        {
                            id: 'opt_assure',
                            text: 'Assure them the situation is under control locally.',
                            effects: {
                                scores: { uk_public_support: -1 },
                                triggerEvents: [
                                    { id: 'ev_un_resolution', delayMs: 110000, probability: 1.0 }
                                ]
                            }
                        },
                        {
                            id: 'opt_recommend_strike',
                            text: 'Recommend we utilize the mainland strike option immediately.',
                            effects: {
                                scores: { international_pressure: 1 },
                                triggerEvents: [
                                    { id: 'ev_mainland_escalation', delayMs: 120000, probability: 0.9 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_un_resolution',
            name: 'UN Security Council Convenes',
            description: 'The UN is debating a ceasefire resolution.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'If a ceasefire is declared while they hold territory, we lose.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Our ambassador needs advice. Stance?',
                    options: [
                        {
                            id: 'opt_stall',
                            text: 'Tell them to stall for time.',
                            effects: {
                                scores: { international_pressure: 1 },
                                triggerEvents: [
                                    { id: 'ev_endgame_trigger', delayMs: 180000, probability: 1.0 }
                                ]
                            }
                        },
                        {
                            id: 'opt_accept',
                            text: 'Accept terms if favorable.',
                            effects: {
                                scores: { uk_public_support: -1 },
                                triggerEvents: [
                                    { id: 'ev_endgame_trigger', delayMs: 180000, probability: 1.0 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_mainland_escalation',
            name: 'Mainland Escalation Debate',
            description: 'The possibility of striking mainland bases is causing severe international backlash.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'Our allies are threatening to pull support if we hit the mainland. But it might be the only way to stop their airforce.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Do we proceed with planning mainland strikes?',
                    options: [
                        {
                            id: 'opt_stand_down_strike',
                            text: 'Stand down. Focus on the islands.',
                            effects: {
                                scores: { international_pressure: -1, military_readiness: -1 },
                                triggerEvents: [
                                    { id: 'ev_endgame_trigger', delayMs: 130000, probability: 1.0 }
                                ]
                            }
                        },
                        {
                            id: 'opt_prepare_strike',
                            text: 'Yes. Target Rio Gallegos.',
                            effects: {
                                scores: { international_pressure: 2, argentina_aggression: -1 },
                                triggerEvents: [
                                    { id: 'ev_endgame_trigger', delayMs: 130000, probability: 1.0 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },

        // --- Manual Action Results & Endgames ---
        {
            id: 'ev_sf_success',
            name: 'SAS Operation Successful',
            description: 'Covert operations on the mainland have successfully destroyed several aircraft on the ground.',
            location: [-51.609, -69.289],
            roleDescriptions: {
                uk_commander: 'The lads did it. Huge blow to their air capabilities.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Acknowledge.',
                    options: [
                        { id: 'opt_ack', text: 'Excellent.' }
                    ]
                }
            ]
        },
        {
            id: 'ev_sf_failure',
            name: 'SAS Team Compromised',
            description: 'A covert UK team has been captured on Argentine soil, causing an international incident.',
            location: [-53.777, -67.755],
            roleDescriptions: {
                uk_commander: 'They are parading our men on television. It is a disaster.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Acknowledge.',
                    options: [
                        { id: 'opt_ack', text: 'Damage control needed.' }
                    ]
                }
            ]
        },
        {
            id: 'ev_reinforcements_arrive',
            name: 'Reinforcements Arrive',
            description: 'Additional naval and air assets have arrived from the UK.',
            location: [-51.5, -57.0],
            roleDescriptions: {
                uk_commander: 'The cavalry is here. We have the numbers now.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Acknowledge.',
                    options: [
                        { id: 'opt_ack', text: 'Deploy them immediately.' }
                    ]
                }
            ]
        },
        {
            id: 'ev_endgame_trigger',
            name: 'Strategic Assessment',
            description: 'The conflict has reached a critical juncture.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'Sir, we need to finalize our assessment of the situation for London.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'What is the final outcome?',
                    options: [
                        {
                            id: 'opt_end_victory',
                            text: 'Declare Victory. Islands secured.',
                            conditions: {
                                minScores: { uk_public_support: 3, military_readiness: 3 }
                            },
                            effects: {
                                triggerEvents: [ { id: 'ev_end_victory', delayMs: 10000, probability: 1.0 } ]
                            }
                        },
                        {
                            id: 'opt_end_defeat',
                            text: 'We have lost the islands.',
                            conditions: {
                                maxScores: { military_readiness: 2 }
                            },
                            effects: {
                                triggerEvents: [ { id: 'ev_end_defeat', delayMs: 10000, probability: 1.0 } ]
                            }
                        },
                        {
                            id: 'opt_end_stalemate',
                            text: 'Accept Stalemate. Dig in for winter.',
                            effects: {
                                triggerEvents: [ { id: 'ev_end_stalemate', delayMs: 10000, probability: 1.0 } ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_end_victory',
            name: 'Scenario Concluded: Victory',
            description: 'The UK has successfully defended the Falkland Islands against Argentine aggression. The Task Force has achieved its objectives.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'Well done, Commander. The PM sends their regards.'
            },
            decisions: []
        },
        {
            id: 'ev_end_defeat',
            name: 'Scenario Concluded: Defeat',
            description: 'UK forces have been overwhelmed. The Falkland Islands have fallen under Argentine control.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'A dark day for the Armed Forces. Prepare for the fallout.'
            },
            decisions: []
        },
        {
            id: 'ev_end_stalemate',
            name: 'Scenario Concluded: Stalemate',
            description: 'A bitter stalemate has ensued. Both sides remain entrenched, facing a long and costly standoff.',
            location: [-51.5, -59.0],
            roleDescriptions: {
                uk_commander: 'Neither a win nor a loss. The political ramifications will be significant.'
            },
            decisions: []
        },
        {
            id: 'ev_us_support',
            name: 'US Offers Material Support',
            description: 'Due to favorable international standing, the US has offered satellite intelligence and Sidewinder missiles.',
            location: [-51.5, -59.0],
            conditions: {
                maxScores: { international_pressure: 2 }
            },
            roleDescriptions: {
                uk_commander: 'Sir, Washington is quietly offering assistance. This could turn the tide.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'Accept the US offer?',
                    options: [
                        {
                            id: 'opt_accept_us',
                            text: 'Accept. We need everything we can get.',
                            effects: {
                                scores: { military_readiness: 2, international_pressure: 1 }
                            }
                        },
                        {
                            id: 'opt_decline_us',
                            text: 'Decline. We do this alone.',
                            effects: {
                                scores: { uk_public_support: 1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_un_sanctions',
            name: 'UN Threatens Sanctions',
            description: 'Due to highly aggressive UK actions, the UN is threatening economic sanctions if a ceasefire is not reached.',
            location: [-51.5, -59.0],
            conditions: {
                minScores: { international_pressure: 4 }
            },
            roleDescriptions: {
                uk_commander: 'The international community is turning on us. The PM is warning that we cannot sustain this politically.'
            },
            decisions: [
                {
                    role: 'uk_commander',
                    text: 'How to mitigate the fallout?',
                    options: [
                        {
                            id: 'opt_pause_ops',
                            text: 'Pause offensive operations temporarily.',
                            effects: {
                                scores: { international_pressure: -1, military_readiness: -1 }
                            }
                        },
                        {
                            id: 'opt_ignore_un',
                            text: 'Ignore them and press the attack.',
                            effects: {
                                scores: { international_pressure: 1, uk_public_support: -1 }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    manualActions: [
        {
            id: 'act_start_scenario',
            name: 'COMMENCE SCENARIO',
            description: 'Triggers the initial intelligence reports and begins the scenario.',
            initiator: ['facilitator'],
            conditions: {},
            effects: {
                triggerEvents: [
                    { id: 'ev_start', delayMs: 1000, probability: 1.0 }
                ]
            }
        },
        {
            id: 'act_sf_mainland',
            name: 'Deploy Special Forces to Mainland',
            description: 'Authorize a covert SAS operation on the Argentine mainland to sabotage airbases and disrupt their supply chain. High risk of international condemnation if discovered.',
            initiator: ['uk_commander'],
            conditions: {
                minScores: { military_readiness: 2 }
            },
            effects: {
                scores: { international_pressure: 1 },
                randomEvents: [
                    { id: 'ev_sf_success', weight: 60, effects: { scores: { argentina_aggression: -1, military_readiness: 1 } } },
                    { id: 'ev_sf_failure', weight: 40, effects: { scores: { uk_public_support: -1, international_pressure: 1 } } }
                ]
            }
        },
        {
            id: 'act_request_reinforcements',
            name: 'Request Emergency Reinforcements',
            description: 'Request immediate deployment of additional naval and air assets from the UK. Requires Ascension Island to be fully operational as a staging base.',
            initiator: ['uk_commander'],
            conditions: {
                maxScores: { supply_lines: 4 },
                assets: { ascension_island: 'operational' }
            },
            effects: {
                scores: { uk_public_support: -1, supply_lines: 1 },
                triggerEvents: [
                    { id: 'ev_reinforcements_arrive', delayMs: 120000, probability: 1.0 }
                ]
            }
        }
    ]
};
