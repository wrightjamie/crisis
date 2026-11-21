module.exports = {
    "id": "falklands_2",
    "name": "Falklands II: Southern Storm",
    "description": "A surprise aggressive move by Argentine forces threatens the Falkland Islands. Built for solo command or a 2–3 player team, secure the islands, hunt elusive South Atlantic threats, manage the Ascension logistics bridge, and decide whether to escalate to the mainland.",
    "guideUrl": "/scenarios/falklands_2/guide.html",
    "mapConfig": {
        "center": [
            -51.6977,
            -59.5236
        ],
        "zoom": 7
    },
    "roles": [
        "uk_commander",
        "air_maritime",
        "downing_street",
        "display"
    ],
    "roleNames": {
        "uk_commander": "UK Task Force Commander",
        "air_maritime": "Air & Maritime Ops",
        "downing_street": "Downing Street & Foreign Office",
        "display": "Operations Room Display"
    },
    "minUsers": 1,
    "mandatoryRoles": [
        "uk_commander"
    ],
    "roleFallbacks": {
        "air_maritime": [
            "uk_commander"
        ],
        "downing_street": [
            "uk_commander"
        ]
    },
    "briefings": {
        "_general": "Tensions in the South Atlantic have erupted following a shock local election in Port Stanley amid suspected foreign interference. British Forces South Atlantic Islands (BFSAI) hold RAF Mount Pleasant and Port Stanley, supported by HMS Defender and the 7,700-mile Ascension Island airbridge. Unidentified Argentine naval, air, and covert elements are moving into the Total Exclusion Zone.",
        "uk_commander": "As UK Task Force Commander, you hold overall operational command in the South Atlantic. Balance island defence, naval survival, recon-to-strike operations, and the fragile Ascension supply bridge. When playing solo, all air, maritime, and political decisions route directly to your desk.",
        "air_maritime": "You direct 1435 Flight Typhoons, HMS Defender, 1564 Flight helicopters, and maritime patrol/AAR assets. Track elusive submarines and mobile coastal launchers, protect Mount Pleasant's runway, and keep the sea lanes open.",
        "downing_street": "You represent Downing Street and the Foreign Office. Manage UK public support, UN diplomatic pressure, covert intelligence backchannels, and political sign-off on high-risk mainland strikes or SAS raids."
    },
    "initialScores": {
        "uk_public_support": 3,
        "military_readiness": 3,
        "international_pressure": 3,
        "argentina_aggression": 4,
        "supply_lines": 3
    },
    "aiConfig": {
        "systemPrompt": "You are an automated British military operational intelligence (J2) reporting system at PJHQ.\nCRITICAL RULES:\n- Describe objective tactical situations in the South Atlantic and Falkland Islands theatre only.\n- Strict factual tone. NEVER use literary flourishes, metaphors, or melodrama (e.g. no \"shadows\", \"darkness\", \"narrowing eyes\").\n- NEVER refer to the player as \"you\", \"Commander\", and DO NOT include greetings or preamble.\n- DO NOT hallucinate other theatres (e.g. Horn of Africa, Middle East). All supply lines run via Ascension Island and the Atlantic.\n- Write one concise, direct factual sentence per update.\n- Stick strictly to the provided score facts.",
        "scoreLabels": {
            "1": "Critical",
            "2": "Strained",
            "3": "Stable",
            "4": "Secure",
            "5": "Optimal"
        },
        "roleContexts": {
            "uk_commander": "Focus area: South Atlantic operational readiness, air/maritime defence, ground security, and the Ascension Island logistics bridge.",
            "air_maritime": "Focus area: 1435 Flight air superiority, HMS Defender sea control, ASW submarine hunting, and Voyager AAR sorties.",
            "downing_street": "Focus area: UK domestic public support, UN/OAS diplomatic pressure, allied intelligence, and mainland escalation authority."
        },
        "scores": {
            "uk_public_support": {
                "label": "UK Public Support",
                "subject": "UK domestic support",
                "isPlural": false,
                "roles": [
                    "uk_commander",
                    "downing_street"
                ]
            },
            "military_readiness": {
                "label": "Military Readiness",
                "subject": "Task force military readiness",
                "isPlural": false,
                "roles": [
                    "uk_commander",
                    "air_maritime"
                ]
            },
            "international_pressure": {
                "label": "International Pressure",
                "subject": "diplomatic and international pressure",
                "isPlural": false,
                "roles": [
                    "uk_commander",
                    "downing_street"
                ]
            },
            "argentina_aggression": {
                "label": "Argentine Aggression",
                "subject": "Argentine military posture in the South Atlantic",
                "isPlural": false,
                "roles": [
                    "uk_commander",
                    "air_maritime"
                ]
            },
            "supply_lines": {
                "label": "Supply Lines",
                "subject": "Atlantic naval and air logistics via Ascension Island",
                "isPlural": true,
                "roles": [
                    "uk_commander",
                    "air_maritime"
                ]
            }
        }
    },
    "scoreConfigs": {
        "uk_public_support": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "military_readiness": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "international_pressure": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "argentina_aggression": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "supply_lines": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        }
    },
    "assets": [
        {
            "id": "ascension_island",
            "image": "raf_akrotiri",
            "name": "RAF Ascension Island",
            "location": [
                -7.946,
                -14.371
            ],
            "state": "operational",
            "tags": [
                "military",
                "airbase"
            ],
            "briefing": "RAF Ascension Island (Wideawake Airfield) is a vital mid-Atlantic forward staging post situated 4,000 miles from the UK and 3,700 miles from the Falklands. It provides the essential runway, fuel bunkering, and staging facilities required to maintain the South Atlantic air and naval supply bridge."
        },
        {
            "id": "mount_pleasant",
            "image": "nato_air_base",
            "name": "RAF Mount Pleasant",
            "location": [
                -51.823,
                -58.447
            ],
            "state": "operational",
            "tags": [
                "military",
                "airbase"
            ],
            "briefing": "RAF Mount Pleasant is the strategic headquarters and main operating base for British Forces South Atlantic Islands (BFSAI) on East Falkland. Featuring hardened aircraft shelters, early-warning radar arrays, and extensive runway infrastructure, it serves as the linchpin for island defence and rapid reinforcement."
        },
        {
            "id": "port_stanley",
            "image": "bvi_gov_house",
            "name": "Port Stanley",
            "location": [
                -51.692,
                -57.858
            ],
            "state": "operational",
            "tags": [
                "civilian",
                "capital"
            ],
            "briefing": "Port Stanley is the capital, administrative centre, and principal civilian port of the Falkland Islands. Housing the government seat, key communications nodes, and headquarters of the volunteer Falkland Islands Defence Force (FIDF), defending Stanley is politically and strategically paramount."
        },
        {
            "id": "rio_gallegos",
            "image": "act_strike_airbase",
            "name": "Rio Gallegos Air Base (Arg)",
            "location": [
                -51.609,
                -69.289
            ],
            "state": "operational",
            "tags": [
                "military",
                "airbase",
                "hostile"
            ],
            "briefing": "Base Aérea Militar Río Gallegos is the primary southern mainland operating base for the Argentine Air Force (Fuerza Aérea Argentina) in Santa Cruz province. Located within combat radius of the Falklands, it hosts strike squadrons capable of launching anti-shipping and low-level island bombing runs."
        },
        {
            "id": "rio_grande",
            "image": "arg_rio_grande_base",
            "name": "Rio Grande Air Base (Arg)",
            "location": [
                -53.777,
                -67.755
            ],
            "state": "operational",
            "tags": [
                "military",
                "airbase",
                "hostile"
            ],
            "briefing": "Base Aeronaval Río Grande (Hermes Quijada) is a strategic Argentine Naval Aviation (COAN) base in Tierra del Fuego. Historically the launch point for deadly Super Étendard and Exocet anti-ship missile strikes against the Royal Navy task force, it represents a potent maritime strike threat."
        },
        {
            "id": "hms_defender",
            "image": "type_45_destroyer",
            "name": "HMS Defender (Type 45)",
            "location": [
                -51.4,
                -57.5
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval"
            ],
            "briefing": "HMS Defender is a Daring-class Type 45 guided missile air-defence destroyer. Equipped with SAMPSON multi-function radar, S1850M long-range surveillance radar, and the Sea Viper (Aster 15 and Aster 30) missile system, she provides a formidable air-defence umbrella over the Falklands and surrounding seas."
        },
        {
            "id": "falklands_typhoons",
            "image": "typhoon_aircraft",
            "name": "1435 Flight (4x Typhoon FGR4)",
            "location": [
                -51.823,
                -58.447
            ],
            "state": "operational",
            "tags": [
                "military",
                "air"
            ],
            "briefing": "No. 1435 Flight, based permanently at RAF Mount Pleasant, operates four Eurofighter Typhoon FGR4 multi-role combat aircraft. Maintaining 24/7 Quick Reaction Alert (QRA), they are armed with Meteor Beyond-Visual-Range (BVR) and ASRAAM missiles to establish immediate air superiority against incursions."
        },
        {
            "id": "falklands_helis",
            "image": "raf_chinook",
            "name": "1564 Flight (Chinook/Puma)",
            "location": [
                -51.823,
                -58.447
            ],
            "state": "operational",
            "tags": [
                "military",
                "air"
            ],
            "briefing": "No. 1564 Flight provides tactical rotary-wing mobility out of RAF Mount Pleasant using Chinook and Puma helicopters. Tasked with intra-theatre troop transport across treacherous peat bog terrain, casualty evacuation (CASEVAC), and radar site resupply, the flight is vital for rapid ground reaction."
        },
        {
            "id": "falklands_a400m",
            "image": "a400m_transport",
            "name": "A400M Atlas",
            "location": [
                -51.823,
                -58.447
            ],
            "state": "operational",
            "tags": [
                "military",
                "air"
            ],
            "briefing": "The Airbus A400M Atlas provides heavy tactical airlift and maritime surveillance for British Forces South Atlantic Islands. Stationed at RAF Mount Pleasant, it performs continuous long-range maritime patrols around the islands and operates regular logistics flights connecting the Falklands to Ascension Island."
        },
        {
            "id": "ascension_voyager",
            "image": "voyager_refueler",
            "name": "Voyager KC2 (Refueler)",
            "location": [
                -7.946,
                -14.371
            ],
            "state": "operational",
            "tags": [
                "military",
                "air"
            ],
            "briefing": "The Airbus Voyager KC2 (A330 MRTT) based out of RAF Ascension Island delivers crucial Air-to-Air Refuelling (AAR) and strategic airlift. It refuels fast jets and transport aircraft across the mid-Atlantic gap, overcoming the limitation of impermanence in remote air power projection."
        },
        {
            "id": "a_arg_sub_san_juan",
            "image": "ev_sub_detection",
            "name": "Hostile Sub (ARA Salta)",
            "location": [
                -51.05,
                -58.25
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "naval",
                "sub"
            ],
            "briefing": "Argentine Type 209 diesel-electric attack submarine operating silently within the Falklands Total Exclusion Zone. Extremely difficult to track in shallow South Atlantic waters; if not prosecuted once found, it can slip away and ambush UK warships or RFA convoys."
        },
        {
            "id": "a_exocet_coastal_battery",
            "image": "ukr_air_defense",
            "name": "Mobile Coastal Exocet Battery",
            "location": [
                -51.65,
                -60.15
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "missile",
                "coastal"
            ],
            "briefing": "Clandestine truck-mounted MM38/MM40 Exocet coastal defence launcher smuggled onto West Falkland. Concealed under camouflage netting; requires FIDF or aerial reconnaissance to pinpoint before Typhoon precision strikes can destroy it."
        },
        {
            "id": "a_arg_specops_west",
            "image": "ev_drone_swarm_perimeter",
            "name": "Buzos Tácticos Sabotage Cell",
            "location": [
                -51.88,
                -59.55
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "specops",
                "sabotage"
            ],
            "briefing": "Argentine naval special forces team inserted covertly by rubber craft to sabotage early-warning radar heads, fuel pipelines, and Mount Pleasant perimeter defences."
        },
        {
            "id": "a_shadow_oiler",
            "image": "rfa_mounts_bay",
            "name": "Covert Argentine Fleet Oiler",
            "location": [
                -49.85,
                -58.6
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "naval",
                "logistics"
            ],
            "briefing": "Unflagged commercial tanker acting as an illicit underway replenishment vessel for Argentine fast attack craft and corvettes loitering north of the Exclusion Zone."
        }
    ],
    "variantAxes": [
        {
            "id": "ascension_status",
            "name": "Ascension Island Status",
            "options": [
                {
                    "id": "ascension_operational",
                    "name": "Fully Operational",
                    "briefingText": "RAF Ascension Island is fully operational, acting as a vital staging post for the Task Force.",
                    "roleBriefings": {
                        "uk_commander": "Our main logistics hub at Ascension is secure and facilitating rapid deployment."
                    },
                    "scoreModifiers": {
                        "supply_lines": 1
                    }
                },
                {
                    "id": "ascension_sabotaged",
                    "name": "Sabotaged / Out of Use",
                    "briefingText": "A covert sabotage attack on the fuel depot at RAF Ascension Island has rendered it temporarily unusable as a staging point.",
                    "roleBriefings": {
                        "uk_commander": "With Ascension crippled, our supply lines are stretched to the breaking point. Reinforcements will take much longer."
                    },
                    "scoreModifiers": {
                        "supply_lines": -2,
                        "military_readiness": -1
                    },
                    "assetModifiers": [
                        {
                            "id": "ascension_island",
                            "image": "raf_akrotiri",
                            "name": "RAF Ascension Island",
                            "location": [
                                -7.946,
                                -14.371
                            ],
                            "state": "sabotaged",
                            "tags": [
                                "military",
                                "airbase"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "weather_conditions",
            "name": "Weather Conditions",
            "options": [
                {
                    "id": "weather_clear",
                    "name": "Clear Skies",
                    "briefingText": "The weather in the South Atlantic is currently clear, favoring air and naval operations.",
                    "roleBriefings": {
                        "uk_commander": "Clear weather will allow our air assets to operate at peak efficiency."
                    },
                    "scoreModifiers": {
                        "military_readiness": 1
                    }
                },
                {
                    "id": "weather_storm",
                    "name": "Severe Storms",
                    "briefingText": "A severe storm system is moving through the South Atlantic, hindering operations and delaying supply lines.",
                    "roleBriefings": {
                        "uk_commander": "Expect significant delays in reinforcements and reduced effectiveness of early warning radar."
                    },
                    "scoreModifiers": {
                        "military_readiness": -1,
                        "supply_lines": -1
                    }
                }
            ]
        },
        {
            "id": "early_warning",
            "name": "Early Warning Intel",
            "options": [
                {
                    "id": "intel_surprise",
                    "name": "Surprise Attack",
                    "briefingText": "Argentine forces have mobilized with unexpected speed, catching UK defenses off guard.",
                    "roleBriefings": {
                        "uk_commander": "We are on the back foot. Immediate action is required to secure key installations."
                    },
                    "scoreModifiers": {
                        "argentina_aggression": 1,
                        "international_pressure": 1
                    },
                    "assetModifiers": [
                        {
                            "id": "hms_defender",
                            "image": "type_45_destroyer",
                            "name": "HMS Defender (Type 45)",
                            "location": [
                                -50,
                                -56
                            ],
                            "state": "operational",
                            "tags": [
                                "military",
                                "naval"
                            ]
                        }
                    ]
                },
                {
                    "id": "intel_advanced",
                    "name": "Advance Warning",
                    "briefingText": "GCHQ has provided advance warning of Argentine mobilization, allowing for preemptive defensive posture.",
                    "roleBriefings": {
                        "uk_commander": "Assets are in position and ready to repel the initial assault."
                    },
                    "scoreModifiers": {
                        "military_readiness": 1,
                        "uk_public_support": 1
                    },
                    "assetModifiers": [
                        {
                            "id": "hms_defender",
                            "image": "type_45_destroyer",
                            "name": "HMS Defender (Type 45)",
                            "location": [
                                -51.5,
                                -58
                            ],
                            "state": "operational",
                            "tags": [
                                "military",
                                "naval"
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "stages": [],
    "eventTemplates": [
        {
            "id": "ev_start",
            "isOpeningEvent": true,
            "image": "generic_press",
            "sound": "teletype",
            "repeatable": false,
            "name": "Shock Election Result in Stanley",
            "description": "A fiercely contested local election in Port Stanley has resulted in a surprise victory for a candidate openly sympathetic to Argentine sovereignty. MI6 reports circumstantial evidence of foreign electoral interference and vote buying, but lacks concrete proof. The international community is watching closely.",
            "location": [
                -51.692,
                -57.858
            ],
            "roleDescriptions": {
                "uk_commander": "Sir, the political situation on the ground is volatile. The new \"Mayor-elect\" is demanding the immediate withdrawal of UK forces. The PM needs your assessment on our security posture.",
                "downing_street": "Whitehall legal advisers warn that detaining an elected local figure without hard MI6 evidence will trigger an immediate OAS and UN diplomatic storm."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we posture our forces in response to this political crisis?",
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt_covert_investigation",
                    "options": [
                        {
                            "id": "opt_lockdown",
                            "text": "Lock down military installations and prepare for civil unrest.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_public_support": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_military_incursion",
                                        "delayMs": 90000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_public_denial",
                            "text": "Publicly denounce the election as fraudulent and detain the candidate.",
                            "effects": {
                                "scores": {
                                    "international_pressure": 2,
                                    "argentina_aggression": 1,
                                    "military_readiness": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_military_incursion",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_covert_investigation",
                            "text": "Maintain normal posture to avoid provoking them while MI6 investigates covertly.",
                            "effects": {
                                "scores": {
                                    "international_pressure": -1,
                                    "military_readiness": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_military_incursion",
                                        "delayMs": 120000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_military_incursion",
            "image": "ev_maritime_shadowing",
            "sound": "klaxon",
            "repeatable": false,
            "name": "Initial Reports of Aggression",
            "description": "Claiming they are acting to \"protect the legitimate administration\" following the election unrest, Argentine naval elements and fast jets have crossed into the Total Exclusion Zone.",
            "location": [
                -50.4,
                -60.8
            ],
            "roleDescriptions": {
                "uk_commander": "Early warning radars confirm multiple surface and air contacts inbound. Wave 1 of the incursion has begun.",
                "air_maritime": "1435 Flight Typhoons are on QRA-5 at Mount Pleasant. HMS Defender is bringing Sea Viper batteries to red readiness."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "How should we respond to this initial incursion?",
                    "options": [
                        {
                            "id": "opt_scramble",
                            "text": "Scramble 1435 Flight Typhoons to intercept and establish CAP.",
                            "effects": {
                                "assetStateChanges": {
                                    "falklands_typhoons": "intercepting"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "argentina_aggression": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_naval_skirmish",
                                        "delayMs": 65000,
                                        "probability": 1
                                    },
                                    {
                                        "id": "ev_chilean_intel",
                                        "delayMs": 95000,
                                        "probability": 0.65
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_sub_detected",
                                        "delayMs": 110000,
                                        "probability": 0.55
                                    },
                                    {
                                        "id": "ev_merchant_seized",
                                        "delayMs": 110000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_defensive",
                            "text": "Hold defensive CAP over MPA and monitor their intentions.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "international_pressure": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_naval_skirmish",
                                        "delayMs": 75000,
                                        "probability": 1
                                    },
                                    {
                                        "id": "ev_chilean_intel",
                                        "delayMs": 100000,
                                        "probability": 0.65
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_sub_detected",
                                        "delayMs": 115000,
                                        "probability": 0.5
                                    },
                                    {
                                        "id": "ev_merchant_seized",
                                        "delayMs": 115000,
                                        "probability": 0.4
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_chilean_intel",
            "image": "ev_strike_options_secured",
            "sound": "teletype",
            "repeatable": false,
            "visibleTo": [
                "uk_commander",
                "downing_street"
            ],
            "name": "Eyes-Only: Chilean Radar Backchannel Tip-Off",
            "description": "A discreet liaison in Santiago passes raw long-range radar plots showing Argentine transport flights making low-altitude night drops onto West Falkland—consistent with a mobile coastal Exocet launcher.",
            "location": [
                -51.65,
                -60.15
            ],
            "roleDescriptions": {
                "uk_commander": "CLASSIFICATION: UK EYES ONLY. If we act on this tip immediately, we can pinpoint their hidden coastal Exocet battery before it ambushes HMS Defender.",
                "downing_street": "Santiago insists on absolute deniability. Sharing this publicly will burn the source and anger regional neighbours."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "How should we use the clandestine Chilean intelligence?",
                    "options": [
                        {
                            "id": "opt_chile_task_recon",
                            "text": "Keep source strictly classified and vector A400M/FIDF quietly onto the coordinates.",
                            "effects": {
                                "revealAssets": [
                                    "a_exocet_coastal_battery"
                                ],
                                "scores": {
                                    "military_readiness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_chile_publicise",
                            "text": "Release the radar plots to the UN to prove Argentine escalation (Burns source).",
                            "effects": {
                                "revealAssets": [
                                    "a_exocet_coastal_battery"
                                ],
                                "scores": {
                                    "international_pressure": -1,
                                    "uk_public_support": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_merchant_seized",
            "image": "ev_maritime_shadowing",
            "sound": "alert",
            "repeatable": false,
            "name": "British-Flagged Tanker Seized in Exclusion Zone",
            "description": "An Argentine corvette supported by a covert fleet oiler has boarded a British-flagged supply tanker 40 miles north of Falkland Sound, demanding it divert to Ushuaia.",
            "location": [
                -50.2,
                -59.1
            ],
            "possibleLocations": [
                [
                    -50.2,
                    -59.1
                ],
                [
                    -50.6,
                    -57.8
                ],
                [
                    -50.9,
                    -60.2
                ]
            ],
            "autoEffects": {
                "revealAssets": [
                    "a_shadow_oiler"
                ]
            },
            "roleDescriptions": {
                "uk_commander": "Our recon just flagged the covert Argentine fleet oiler sustaining their corvettes. Letting them take the tanker will gut our fuel reserves.",
                "air_maritime": "We can scramble a Wildcat boarding team from HMS Defender or use Typhoons for a low-pass show of force."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "How do we respond to the boarding of the supply tanker?",
                    "timeLimitMs": 50000,
                    "defaultOptionId": "opt_merchant_protest",
                    "options": [
                        {
                            "id": "opt_merchant_wildcat",
                            "text": "Send HMS Defender's Wildcat and Royal Marines to retake the vessel.",
                            "effects": {
                                "scores": {
                                    "supply_lines": 1,
                                    "uk_public_support": 1,
                                    "international_pressure": 1
                                },
                                "assetStateChanges": {
                                    "a_shadow_oiler": "damaged"
                                }
                            }
                        },
                        {
                            "id": "opt_merchant_show_force",
                            "text": "Order 1435 Flight Typhoons to buzz the corvette and force a withdrawal.",
                            "effects": {
                                "scores": {
                                    "supply_lines": 1,
                                    "argentina_aggression": -1
                                }
                            }
                        },
                        {
                            "id": "opt_merchant_protest",
                            "text": "Log the piracy for the UN and avoid risking civilian crew in a firefight.",
                            "effects": {
                                "scores": {
                                    "supply_lines": -1,
                                    "international_pressure": -1,
                                    "uk_public_support": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_naval_skirmish",
            "assetLocation": "hms_defender",
            "image": "ev_sea_skimming_missiles",
            "sound": "explosion",
            "repeatable": false,
            "name": "Naval Skirmish off East Falkland",
            "description": "HMS Defender is engaging multiple fast attack craft and incoming sea-skimming anti-ship missiles off East Falkland.",
            "location": [
                -51.4,
                -57.5
            ],
            "roleDescriptions": {
                "uk_commander": "Defender is tracking multiple sea-skimming targets. Immediate weapons release authorization is required.",
                "air_maritime": "Sea Viper is engaging inbound missiles. If the hidden West Falkland Exocet battery has been located, Typhoons can strike it simultaneously."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "Authorize HMS Defender's engagement and air support posture:",
                    "timeLimitMs": 50000,
                    "defaultOptionId": "opt_evade",
                    "options": [
                        {
                            "id": "opt_engage_all",
                            "text": "Weapons free. Sink the fast attack craft.",
                            "effects": {
                                "scores": {
                                    "argentina_aggression": -1,
                                    "international_pressure": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 75000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_pebble_bvr",
                                        "delayMs": 75000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_strike_coastal_exocet",
                            "text": "Vector Typhoons to destroy the pinpointed West Falkland Exocet battery while Defender clears the sea!",
                            "conditions": {
                                "visibleAssets": [
                                    "a_exocet_coastal_battery"
                                ],
                                "assetStates": {
                                    "a_exocet_coastal_battery": "operational"
                                }
                            },
                            "effects": {
                                "assetStateChanges": {
                                    "a_exocet_coastal_battery": "destroyed"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_pebble_bvr",
                                        "delayMs": 75000,
                                        "probability": 0.6
                                    },
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 75000,
                                        "probability": 0.4
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_evade",
                            "text": "Prioritize point defense and evasive maneuvers.",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ship_damaged",
                                        "delayMs": 70000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 75000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_pebble_bvr",
            "image": "ev_airspace_intercept",
            "sound": "klaxon",
            "repeatable": false,
            "name": "1435 Flight BVR Engagement Over Pebble Island",
            "description": "A four-ship package of Argentine fighters is sweeping low over Pebble Island to draw off our CAP while strike jets race toward RAF Mount Pleasant.",
            "location": [
                -51.31,
                -59.61
            ],
            "possibleLocations": [
                [
                    -51.31,
                    -59.61
                ],
                [
                    -51.45,
                    -60.1
                ],
                [
                    -51.18,
                    -59.1
                ]
            ],
            "roleDescriptions": {
                "air_maritime": "Typhoon Meteor missiles outrange enemy radar by 40 miles, but committing all four jets leaves Mount Pleasant's fuel farm uncovered.",
                "uk_commander": "Decisive air victory here will shatter their strike tempo and bolster domestic confidence."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "How should 1435 Flight engage the Pebble Island raid?",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_bvr_split",
                    "options": [
                        {
                            "id": "opt_bvr_meteor",
                            "text": "Fire long-range Meteor BVR salvos to break the package before weapons release.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_naval_victory",
                                        "delayMs": 75000,
                                        "probability": 0.75
                                    },
                                    {
                                        "id": "ev_radar_damaged",
                                        "delayMs": 70000,
                                        "probability": 0.25
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_bvr_split",
                            "text": "Split the flight: two jets intercept over Pebble Island, two stay on close defence of MPA.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_naval_victory",
                                        "delayMs": 80000,
                                        "probability": 0.6
                                    },
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 70000,
                                        "probability": 0.4
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_air_raid",
            "image": "ev_akrotiri_strike",
            "sound": "klaxon",
            "repeatable": false,
            "name": "Air Raid on Mount Pleasant",
            "description": "Argentine strike aircraft are racing in below radar coverage to crater the main runway at RAF Mount Pleasant.",
            "location": [
                -51.823,
                -58.447
            ],
            "roleDescriptions": {
                "uk_commander": "Incoming strike package. If we lose the runway, our air superiority and Ascension airbridge are crippled.",
                "air_maritime": "Sky Sabre surface-to-air batteries and 1435 Flight are ready—choose how to allocate defence."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "How should we allocate our limited air defenses?",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_defend_runway",
                    "options": [
                        {
                            "id": "opt_defend_runway",
                            "text": "Focus all Sky Sabre batteries on protecting the runway and hardened shelters.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "supply_lines": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_naval_victory",
                                        "delayMs": 80000,
                                        "probability": 0.7
                                    },
                                    {
                                        "id": "ev_radar_damaged",
                                        "delayMs": 75000,
                                        "probability": 0.3
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_intercept_fighters",
                            "text": "Send 1435 Flight forward to engage them before bomb release.",
                            "effects": {
                                "scores": {
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_naval_victory",
                                        "delayMs": 80000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_ship_damaged",
                                        "delayMs": 75000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_radar_damaged",
            "image": "ev_kinetic_strike",
            "sound": "explosion",
            "repeatable": false,
            "name": "Mount Pleasant Early-Warning Radar Hit",
            "description": "An anti-radiation missile has clipped the Mount Alice radar head, creating a 90-degree blind spot to the west and forcing reliance on HMS Defender's air-search radar.",
            "location": [
                -51.823,
                -58.447
            ],
            "autoEffects": {
                "assetStateChanges": {
                    "mount_pleasant": "degraded"
                },
                "scores": {
                    "military_readiness": -1
                }
            },
            "roleDescriptions": {
                "air_maritime": "With Mount Alice offline, low-flying Argentine helicopters could slip into East Falkland undetected.",
                "uk_commander": "Royal Engineers estimate rapid repair requires helicopter lift from 1564 Flight."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we close the radar gap?",
                    "options": [
                        {
                            "id": "opt_radar_repair",
                            "text": "Task 1564 Flight Chinooks to fly emergency repair spares to Mount Alice immediately.",
                            "effects": {
                                "assetStateChanges": {
                                    "mount_pleasant": "operational"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "supply_lines": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ground_incursion",
                                        "delayMs": 80000,
                                        "probability": 0.6
                                    },
                                    {
                                        "id": "ev_san_carlos_landing",
                                        "delayMs": 80000,
                                        "probability": 0.4
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_radar_defender",
                            "text": "Rely on HMS Defender's S1850M radar and keep helicopters reserved for infantry.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 0
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_san_carlos_landing",
                                        "delayMs": 70000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_ground_incursion",
                                        "delayMs": 70000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_ship_damaged",
            "assetLocation": "hms_defender",
            "image": "ev_sea_skimming_missiles",
            "sound": "explosion",
            "repeatable": false,
            "name": "HMS Defender Takes Damage",
            "description": "An Exocet missile has struck HMS Defender's aft superstructure, sparking fires and knocking out one gas turbine.",
            "location": [
                -51.4,
                -57.5
            ],
            "roleDescriptions": {
                "uk_commander": "Damage control teams are fighting fires. The ship is limping but Sea Viper remains partially online.",
                "air_maritime": "Withdrawing Defender leaves East Falkland without naval radar cover; fighting on risks losing the ship."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "What is the order for HMS Defender?",
                    "options": [
                        {
                            "id": "opt_withdraw",
                            "text": "Withdraw east out of Exocet range to stabilise damage.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "military_readiness": -1
                                },
                                "assetStateChanges": {
                                    "hms_defender": "withdrawing"
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_naval_defeat",
                                        "delayMs": 80000,
                                        "probability": 0.85
                                    },
                                    {
                                        "id": "ev_naval_victory",
                                        "delayMs": 85000,
                                        "probability": 0.15
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_fight_on",
                            "text": "Maintain station and keep providing radar and Sea Viper coverage.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_public_support": 1
                                },
                                "assetStateChanges": {
                                    "hms_defender": "damaged_but_fighting"
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_naval_victory",
                                        "delayMs": 80000,
                                        "probability": 0.55
                                    },
                                    {
                                        "id": "ev_naval_defeat",
                                        "delayMs": 80000,
                                        "probability": 0.45
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_naval_victory",
            "image": "type_45_destroyer",
            "sound": "alert",
            "repeatable": false,
            "name": "Sea Control Re-established",
            "description": "The Royal Navy and 1435 Flight have repelled the first wave of naval and air assaults, re-establishing control of the waters around East Falkland.",
            "location": [
                -51.5,
                -58
            ],
            "roleDescriptions": {
                "uk_commander": "The immediate maritime threat has been blunted, sir. Expect Argentine forces to shift to amphibious or heliborne landings on the islands."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "Acknowledge report and transition posture for Wave 2 (Island Defence).",
                    "options": [
                        {
                            "id": "opt_ack_naval_vic",
                            "text": "Understood. Shift ISR and quick-reaction troops to island defence.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1,
                                    "military_readiness": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ground_incursion",
                                        "delayMs": 65000,
                                        "probability": 0.6
                                    },
                                    {
                                        "id": "ev_san_carlos_landing",
                                        "delayMs": 65000,
                                        "probability": 0.4
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_cyber_attack",
                                        "delayMs": 95000,
                                        "probability": 0.6
                                    },
                                    {
                                        "id": "ev_southern_gale",
                                        "delayMs": 120000,
                                        "probability": 0.45
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_naval_defeat",
            "image": "ev_portsmouth_strike",
            "sound": "explosion",
            "repeatable": false,
            "name": "Loss of Sea Control",
            "description": "UK naval forces have been forced east out of Falkland Sound, leaving the islands' coastline exposed to amphibious and heliborne assault.",
            "location": [
                -51.5,
                -58
            ],
            "roleDescriptions": {
                "uk_commander": "We cannot sustain this fight at sea without reinforcements. Ground forces must now hold Stanley and Mount Pleasant."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "Acknowledge report and brace for Argentine landings.",
                    "options": [
                        {
                            "id": "opt_ack_naval_def",
                            "text": "Understood. Dig in around Stanley and MPA.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -2,
                                    "military_readiness": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_san_carlos_landing",
                                        "delayMs": 55000,
                                        "probability": 0.55
                                    },
                                    {
                                        "id": "ev_ground_incursion",
                                        "delayMs": 55000,
                                        "probability": 0.45
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_cyber_attack",
                                        "delayMs": 90000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_specops_sabotage",
                                        "delayMs": 105000,
                                        "probability": 0.55
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_ground_incursion",
            "image": "ev_combat_recovery_medevac",
            "sound": "klaxon",
            "repeatable": false,
            "name": "Heliborne Assault on Port Stanley",
            "description": "Argentine marine commandos have landed via low-flying transport helicopters on the western outskirts of Port Stanley.",
            "location": [
                -51.692,
                -57.858
            ],
            "roleDescriptions": {
                "uk_commander": "Hostiles have touched down outside Stanley. The civilian population is directly in the line of fire."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How should we counter the landing?",
                    "options": [
                        {
                            "id": "opt_counter_attack",
                            "text": "Launch an immediate infantry counter-attack backed by 1564 Flight.",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1,
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_urban_combat",
                                        "delayMs": 75000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 75000,
                                        "probability": 0.35
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_contact",
                                        "delayMs": 95000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_south_georgia_distress",
                                        "delayMs": 115000,
                                        "probability": 0.45
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_cordon",
                            "text": "Establish a tight cordon around Stanley and evacuate civilians first.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 75000,
                                        "probability": 0.7
                                    },
                                    {
                                        "id": "ev_goose_green_cut_off",
                                        "delayMs": 75000,
                                        "probability": 0.3
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_contact",
                                        "delayMs": 95000,
                                        "probability": 0.65
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_san_carlos_landing",
            "image": "generic_deployment",
            "sound": "explosion",
            "repeatable": false,
            "name": "San Carlos Bay Night Landing Attempt",
            "description": "Under cover of darkness and sea mist, Argentine amphibious craft are disembarking light armour and troops at San Carlos Water to cut the road between Mount Pleasant and West Falkland.",
            "location": [
                -51.505,
                -59.015
            ],
            "possibleLocations": [
                [
                    -51.505,
                    -59.015
                ],
                [
                    -51.83,
                    -58.97
                ],
                [
                    -51.41,
                    -58.38
                ]
            ],
            "roleDescriptions": {
                "uk_commander": "If they establish a beachhead at San Carlos, they can threaten Mount Pleasant from the rear.",
                "air_maritime": "Typhoons can strike the landing craft with Paveway IV precision bombs, or we can air-lift the Roulement Infantry Company via Chinook."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we smash the San Carlos beachhead?",
                    "timeLimitMs": 50000,
                    "defaultOptionId": "opt_san_carlos_contain",
                    "options": [
                        {
                            "id": "opt_san_carlos_airstrike",
                            "text": "Task 1435 Flight Typhoons for precision strikes on the landing craft at dawn.",
                            "effects": {
                                "scores": {
                                    "argentina_aggression": -1,
                                    "military_readiness": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_goose_green_cut_off",
                                        "delayMs": 75000,
                                        "probability": 0.45
                                    },
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 80000,
                                        "probability": 0.55
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_contact",
                                        "delayMs": 90000,
                                        "probability": 0.65
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_san_carlos_contain",
                            "text": "Air-lift infantry by Chinook to hold the high ground and bottle them into the bay.",
                            "effects": {
                                "scores": {
                                    "supply_lines": -1,
                                    "uk_public_support": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 75000,
                                        "probability": 0.6
                                    },
                                    {
                                        "id": "ev_urban_combat",
                                        "delayMs": 75000,
                                        "probability": 0.4
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_contact",
                                        "delayMs": 95000,
                                        "probability": 0.6
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_goose_green_cut_off",
            "image": "ev_chinook_underslung_mountain",
            "sound": "alert",
            "repeatable": false,
            "name": "Goose Green Outpost Cut Off",
            "description": "An isolated UK observation detachment and local settlers at Goose Green are surrounded by advancing Argentine patrols, running low on ammunition and medical kit.",
            "location": [
                -51.829,
                -58.969
            ],
            "roleDescriptions": {
                "uk_commander": "Leaving Goose Green isolated risks hostages and a major propaganda coup for Buenos Aires."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we relieve Goose Green?",
                    "options": [
                        {
                            "id": "opt_gg_chinook",
                            "text": "Launch a daring low-level Chinook extraction & reinforcement flight with Typhoon top-cover.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1,
                                    "military_readiness": 1,
                                    "supply_lines": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 80000,
                                        "probability": 0.7
                                    },
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 80000,
                                        "probability": 0.3
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_gg_hold",
                            "text": "Order the detachment to evade into the peat hills and conserve helicopters for MPA.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "supply_lines": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 75000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_ground_defeat",
                                        "delayMs": 80000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_urban_combat",
            "image": "generic_deployment",
            "sound": "explosion",
            "repeatable": false,
            "name": "Heavy Fighting in Stanley",
            "description": "Fierce street-to-street fighting has broken out in Port Stanley. Argentine teams are fortifying harbour buildings near civilian homes.",
            "location": [
                -51.692,
                -57.858
            ],
            "roleDescriptions": {
                "uk_commander": "Casualties are mounting. We are struggling to root them out of residential areas without causing collateral damage."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "Authorize heavy weapons and close air support in urban areas?",
                    "options": [
                        {
                            "id": "opt_heavy_weapons",
                            "text": "Yes. Use precision mortar and air fires to break them quickly.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "international_pressure": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 80000,
                                        "probability": 0.8
                                    },
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 80000,
                                        "probability": 0.2
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_infantry_only",
                            "text": "No. Rely on close infantry clearance to protect civilians.",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1,
                                    "uk_public_support": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 80000,
                                        "probability": 0.55
                                    },
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 85000,
                                        "probability": 0.45
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_standoff",
            "image": "ev_stanley_standoff",
            "sound": "alert",
            "repeatable": false,
            "name": "Stalemate at Stanley",
            "description": "A tense deadlock has developed along the ridges west of Port Stanley. Neither side is gaining ground as winter squalls roll in.",
            "location": [
                -51.692,
                -57.858
            ],
            "roleDescriptions": {
                "uk_commander": "They are dug in on Mount Tumbledown and Wireless Ridge. We need to break this deadlock before they reinforce."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we break the deadlock?",
                    "options": [
                        {
                            "id": "opt_night_assault",
                            "text": "Launch a coordinated night infantry assault with night-vision advantage.",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1,
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 75000,
                                        "probability": 0.7
                                    },
                                    {
                                        "id": "ev_ground_defeat",
                                        "delayMs": 80000,
                                        "probability": 0.3
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_wait",
                            "text": "Hold the perimeter and wait for UK reinforcements.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ground_defeat",
                                        "delayMs": 85000,
                                        "probability": 0.5
                                    },
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 85000,
                                        "probability": 0.5
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_ground_victory",
            "image": "generic_deployment",
            "sound": "alert",
            "repeatable": false,
            "name": "Port Stanley Secured",
            "description": "UK forces have neutralized the Argentine lodgement around Port Stanley and captured key prisoners.",
            "location": [
                -51.692,
                -57.858
            ],
            "roleDescriptions": {
                "uk_commander": "Stanley is clear and civilians are safe. Now the battle shifts to logistics and the diplomatic endgame."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "Acknowledge report and consolidate for Wave 3 (Logistics & Diplomatic Climax).",
                    "options": [
                        {
                            "id": "opt_ack_gnd_vic",
                            "text": "Excellent work. Consolidate supply lines and brief London.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1,
                                    "argentina_aggression": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_supply_shortage",
                                        "delayMs": 60000,
                                        "probability": 0.85
                                    },
                                    {
                                        "id": "ev_political_pressure",
                                        "delayMs": 85000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_ground_defeat",
            "image": "ev_endgame_domestic",
            "sound": "explosion",
            "repeatable": false,
            "name": "Stanley Occupied",
            "description": "Argentine forces have pushed UK units out of Port Stanley and raised their flag over Government House.",
            "location": [
                -51.692,
                -57.858
            ],
            "autoEffects": {
                "assetStateChanges": {
                    "port_stanley": "occupied"
                }
            },
            "roleDescriptions": {
                "uk_commander": "We have been pushed back toward Mount Pleasant. Downing Street is in crisis mode."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "Acknowledge report.",
                    "options": [
                        {
                            "id": "opt_ack_gnd_def",
                            "text": "Regroup at MPA and prepare to retake the capital.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -2,
                                    "international_pressure": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_supply_shortage",
                                        "delayMs": 55000,
                                        "probability": 0.9
                                    },
                                    {
                                        "id": "ev_political_pressure",
                                        "delayMs": 75000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_southern_gale",
            "image": "ev_weather_warning",
            "sound": "alert",
            "repeatable": false,
            "name": "Severe Southern Ocean Gale Grounds Rotary Ops",
            "description": "A 65-knot Antarctic storm front has slammed into the Falklands, grounding 1564 Flight helicopters and cutting visibility at Mount Pleasant to near zero.",
            "location": [
                -51.823,
                -58.447
            ],
            "autoEffects": {
                "assetStateChanges": {
                    "falklands_helis": "grounded"
                }
            },
            "roleDescriptions": {
                "air_maritime": "Helicopters cannot fly in this crosswind, though Typhoons can still launch on instrument flight rules if necessary."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "How do we manage air operations during the storm?",
                    "options": [
                        {
                            "id": "opt_gale_wait",
                            "text": "Hold flights until the squall clears to avoid losing airframes to weather.",
                            "effects": {
                                "assetStateChanges": {
                                    "falklands_helis": "operational"
                                },
                                "scores": {
                                    "supply_lines": -1
                                }
                            }
                        },
                        {
                            "id": "opt_gale_push",
                            "text": "Push emergency IFR resupply flights through the gale anyway.",
                            "effects": {
                                "assetStateChanges": {
                                    "falklands_helis": "operational"
                                },
                                "scores": {
                                    "supply_lines": 1,
                                    "military_readiness": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_specops_sabotage",
            "image": "ev_drone_swarm_perimeter",
            "sound": "klaxon",
            "repeatable": false,
            "name": "Buzos Tácticos Sabotage Alert Near MPA",
            "description": "Perimeter thermal sensors at RAF Mount Pleasant have detected a small Argentine naval special forces sabotage team cutting through the outer wire toward the aviation fuel bladders.",
            "location": [
                -51.88,
                -59.55
            ],
            "possibleLocations": [
                [
                    -51.84,
                    -58.49
                ],
                [
                    -51.88,
                    -59.55
                ],
                [
                    -51.78,
                    -58.41
                ]
            ],
            "autoEffects": {
                "revealAssets": [
                    "a_arg_specops_west"
                ]
            },
            "roleDescriptions": {
                "uk_commander": "If those saboteurs blow the Avtur fuel farm, 1435 Flight will be grounded within 24 hours."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we neutralise the sabotage cell?",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_sabotage_lockdown",
                    "options": [
                        {
                            "id": "opt_sabotage_sweep",
                            "text": "Deploy RAF Regiment and FIDF trackers to hunt down and capture the cell.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_arg_specops_west": "destroyed"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_public_support": 1
                                }
                            }
                        },
                        {
                            "id": "opt_sabotage_lockdown",
                            "text": "Seal the fuel farm bunkers and drive them off with mortar illumination.",
                            "effects": {
                                "hideAssets": [
                                    "a_arg_specops_west"
                                ],
                                "scores": {
                                    "supply_lines": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_south_georgia_distress",
            "image": "ev_maritime_shadowing",
            "sound": "teletype",
            "repeatable": false,
            "name": "South Georgia Garrison Distress Call",
            "description": "British Antarctic Survey scientists and the small Royal Marine detachment at King Edward Point report an Argentine icebreaker and armed launch entering Cumberland Bay.",
            "location": [
                -54.28,
                -36.49
            ],
            "roleDescriptions": {
                "uk_commander": "South Georgia is 800 miles east. Sending an A400M overflight or diverting naval assets stretches our Falklands force, but abandoning it is a symbolic blow."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we respond to the South Georgia incursion?",
                    "options": [
                        {
                            "id": "opt_sg_overflight",
                            "text": "Task the A400M Atlas for a long-range deterrence overflight and supply drop.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1,
                                    "supply_lines": -1
                                }
                            }
                        },
                        {
                            "id": "opt_sg_evade",
                            "text": "Order the detachment to evacuate to the hills and focus 100% on the Falklands.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "military_readiness": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_political_pressure",
            "image": "ev_crisis_cabinet",
            "sound": "teletype",
            "repeatable": false,
            "name": "PM Demands Decisive Action",
            "description": "Downing Street is under intense parliamentary and media scrutiny, demanding a decisive operational result to reassure the British public.",
            "location": [
                -51.5,
                -59
            ],
            "conditions": {
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_naval_skirmish"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_ground_incursion"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_san_carlos_landing"
                        ]
                    }
                ]
            },
            "roleDescriptions": {
                "uk_commander": "The PM is on a secure line. They want a clear military turning point—or they are prepared to authorise mainland strikes.",
                "downing_street": "Backbench MPs are restless, and the opposition is demanding an emergency Commons debate on rules of engagement."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "How should we handle the political pressure from London?",
                    "options": [
                        {
                            "id": "opt_assure",
                            "text": "Assure Cabinet the situation is manageable within the Exclusion Zone.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_un_resolution",
                                        "delayMs": 80000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_casualty_leak",
                                        "delayMs": 50000,
                                        "probability": 0.45
                                    },
                                    {
                                        "id": "ev_regional_airspace_ban",
                                        "delayMs": 55000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_recommend_strike",
                            "text": "Recommend preparing direct strikes against Argentine mainland airbases.",
                            "effects": {
                                "scores": {
                                    "international_pressure": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_mainland_escalation",
                                        "delayMs": 80000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_regional_airspace_ban",
                                        "delayMs": 50000,
                                        "probability": 0.5
                                    },
                                    {
                                        "id": "ev_casualty_leak",
                                        "delayMs": 55000,
                                        "probability": 0.3
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_casualty_leak",
            "image": "ev_uk_casualty_leak",
            "sound": "teletype",
            "repeatable": false,
            "hiddenFrom": [
                "air_maritime"
            ],
            "name": "Press Leak of UK Casualty Figures",
            "description": "A leaked MoD situation report detailing early British casualties and HMS Defender's near-misses has hit the London front pages, sparking fierce public debate.",
            "location": [
                -51.692,
                -57.858
            ],
            "roleDescriptions": {
                "downing_street": "Tabloids are demanding answers. A candid statement may steady nerves, while clamping down on press access risks backlash."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "How do we respond to the casualty leak?",
                    "options": [
                        {
                            "id": "opt_leak_transparent",
                            "text": "Address the nation openly, honouring the personnel and reaffirming our mission.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1
                                }
                            }
                        },
                        {
                            "id": "opt_leak_dnotice",
                            "text": "Issue an immediate DSMA-Notice to restrict operational reporting.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "military_readiness": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_regional_airspace_ban",
            "image": "generic_un",
            "sound": "teletype",
            "repeatable": false,
            "name": "South American Neighbours Restrict Overflight",
            "description": "Under pressure from Buenos Aires, neighbouring South American states have closed civilian diversion airfields and overflight corridors to UK-chartered logistics aircraft.",
            "location": [
                -51.5,
                -64
            ],
            "roleDescriptions": {
                "downing_street": "Our Ascension-to-Falklands flights now have zero mainland diversion options, adding heavy fuel burn to every sortie."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "How should the Foreign Office respond?",
                    "options": [
                        {
                            "id": "opt_airspace_diplomacy",
                            "text": "Offer quiet trade assurances and humanitarian corridor guarantees to reopen diversions.",
                            "effects": {
                                "scores": {
                                    "international_pressure": -1,
                                    "supply_lines": 1
                                }
                            }
                        },
                        {
                            "id": "opt_airspace_oceanic",
                            "text": "Accept the ban and route all flights exclusively over international Atlantic waters.",
                            "effects": {
                                "scores": {
                                    "supply_lines": -1,
                                    "uk_public_support": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_un_resolution",
            "image": "generic_un",
            "sound": "teletype",
            "repeatable": false,
            "name": "UN Security Council Convenes",
            "description": "The UN Security Council is debating an emergency ceasefire resolution freezing forces in place.",
            "location": [
                -51.5,
                -59
            ],
            "roleDescriptions": {
                "uk_commander": "If a ceasefire is imposed while Argentine units still hold Falklands soil, we lose strategically.",
                "downing_street": "We hold a permanent Security Council veto, but using it unilaterally will spike international pressure."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "Our UN Ambassador needs immediate instructions. What is our stance?",
                    "options": [
                        {
                            "id": "opt_stall",
                            "text": "Exercise diplomatic stall tactics and threaten a UK veto unless Argentina withdraws first.",
                            "effects": {
                                "scores": {
                                    "international_pressure": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_endgame_trigger",
                                        "delayMs": 90000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_accept",
                            "text": "Signal openness to a conditional ceasefire backed by international monitors.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "international_pressure": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_endgame_trigger",
                                        "delayMs": 90000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_mainland_escalation",
            "image": "ev_crisis_cabinet",
            "sound": "klaxon",
            "repeatable": false,
            "name": "Mainland Escalation Debate",
            "description": "Reports that Britain is preparing strikes on mainland Argentine airbases at Río Gallegos and Río Grande have sparked urgent warnings from Washington and Brussels.",
            "location": [
                -51.609,
                -69.289
            ],
            "roleDescriptions": {
                "uk_commander": "Hitting Río Gallegos could ground their strike force permanently, but allies are threatening to pull diplomatic backing.",
                "downing_street": "Striking the South American mainland crosses a major red line—weigh the military payoff against international isolation."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "Do we authorise direct strikes on mainland Argentine airbases?",
                    "options": [
                        {
                            "id": "opt_stand_down_strike",
                            "text": "Stand down mainland strikes. Restrict combat strictly to the Exclusion Zone.",
                            "effects": {
                                "scores": {
                                    "international_pressure": -1,
                                    "military_readiness": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_endgame_trigger",
                                        "delayMs": 85000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_prepare_strike",
                            "text": "Authorise precision Storm Shadow / Typhoon strikes on Río Gallegos.",
                            "effects": {
                                "assetStateChanges": {
                                    "rio_gallegos": "damaged"
                                },
                                "scores": {
                                    "international_pressure": 2,
                                    "argentina_aggression": -2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_endgame_trigger",
                                        "delayMs": 85000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_resistance_contact",
            "image": "ev_fidf_resistance",
            "sound": "teletype",
            "repeatable": false,
            "name": "FIDF Resistance Mobilizes",
            "description": "Members of the Falkland Islands Defence Force (FIDF) and local farmers have formed a covert observation and resistance network across the Camp.",
            "location": [
                -51.75,
                -58
            ],
            "roleDescriptions": {
                "uk_commander": "We have encrypted comms from an FIDF cell. They can either launch sabotage ambushes or stay hidden to spot enemy missile batteries and spec-ops teams."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How should we task the FIDF network?",
                    "options": [
                        {
                            "id": "opt_arm_resistance",
                            "text": "Airdrop anti-armour weapons and authorise direct ambushes.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_public_support": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_resistance_success",
                                        "delayMs": 85000,
                                        "probability": 0.55
                                    },
                                    {
                                        "id": "ev_resistance_reprisal",
                                        "delayMs": 85000,
                                        "probability": 0.45
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_stand_down_fidf",
                            "text": "Keep them covert as scouts to pinpoint hidden enemy batteries and sabotage cells.",
                            "effects": {
                                "scores": {
                                    "international_pressure": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_intel",
                                        "delayMs": 75000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_resistance_success",
            "image": "ev_kinetic_strike",
            "sound": "explosion",
            "repeatable": false,
            "name": "Resistance Sabotage Success",
            "description": "The FIDF cell has ambushed an Argentine forward munitions convoy, destroying vital fuel and mortar stocks.",
            "location": [
                -51.75,
                -58
            ],
            "autoEffects": {
                "scores": {
                    "argentina_aggression": -1,
                    "military_readiness": 1
                }
            },
            "roleDescriptions": {
                "uk_commander": "The FIDF cell hit them hard. Enemy ground logistics are severely disrupted."
            },
            "decisions": []
        },
        {
            "id": "ev_resistance_reprisal",
            "image": "generic_police",
            "sound": "alert",
            "repeatable": false,
            "name": "Civilian Reprisals",
            "description": "Following partisan ambushes, Argentine occupation patrols have imposed harsh curfews and detained islanders in Stanley.",
            "location": [
                -51.692,
                -57.858
            ],
            "roleDescriptions": {
                "uk_commander": "The international press is reporting civilian detentions triggered by our armed proxy attacks."
            },
            "autoEffects": {
                "scores": {
                    "uk_public_support": -2,
                    "international_pressure": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_resistance_intel",
            "image": "ev_strike_options_secured",
            "sound": "teletype",
            "repeatable": false,
            "name": "Critical FIDF Recon Intel",
            "description": "Staying covert paid off: FIDF scouts have relayed GPS coordinates for both the hidden West Falkland coastal Exocet battery and an Argentine sabotage cell.",
            "location": [
                -51.75,
                -58
            ],
            "roleDescriptions": {
                "uk_commander": "Their recon just lit up the enemy's hidden assets on our tactical map—we can now strike them directly."
            },
            "autoEffects": {
                "revealAssets": [
                    "a_exocet_coastal_battery",
                    "a_arg_specops_west"
                ],
                "scores": {
                    "military_readiness": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_cyber_attack",
            "image": "generic_cyber",
            "sound": "teletype",
            "repeatable": false,
            "name": "Severe Cyber Disruption",
            "description": "GCHQ reports a coordinated cyber attack targeting BFSAI logistics manifests and Skynet satellite links between Mount Pleasant and PJHQ Northwood.",
            "location": [
                -51.5,
                -59
            ],
            "roleDescriptions": {
                "uk_commander": "We are losing satcom bandwidth. If C2 degrades further, air defence coordination will suffer."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How should we allocate our cyber defence teams?",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_cyber_defend",
                    "options": [
                        {
                            "id": "opt_cyber_defend",
                            "text": "Prioritize defence. Isolate and harden Skynet C2 links immediately.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "supply_lines": -1
                                }
                            }
                        },
                        {
                            "id": "opt_cyber_counter",
                            "text": "Launch an offensive counter-hack against Argentine mainland air-traffic and radar nodes.",
                            "effects": {
                                "scores": {
                                    "international_pressure": 1,
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_cyber_blowback",
                                        "delayMs": 70000,
                                        "probability": 0.45
                                    },
                                    {
                                        "id": "ev_cyber_disrupt_arg",
                                        "delayMs": 70000,
                                        "probability": 0.45
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_cyber_blowback",
            "image": "ev_cyber_fail",
            "sound": "alert",
            "repeatable": false,
            "name": "Cyber Counter-Attack Traced",
            "description": "The offensive cyber strike spilled into civilian telecoms in Patagonia and was traced back to UK assets, sparking international condemnation.",
            "location": [
                -51.5,
                -59
            ],
            "autoEffects": {
                "scores": {
                    "uk_public_support": -1,
                    "international_pressure": 2
                }
            },
            "decisions": []
        },
        {
            "id": "ev_cyber_disrupt_arg",
            "image": "ev_cyber_success",
            "sound": "teletype",
            "repeatable": false,
            "name": "Argentine Air-Control Network Disrupted",
            "description": "GCHQ's counter-operation scrambled Argentine coastal radar feeds at Río Grande for 6 hours, blunting their strike coordination.",
            "location": [
                -53.777,
                -67.755
            ],
            "autoEffects": {
                "scores": {
                    "military_readiness": 1,
                    "argentina_aggression": -1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_sub_detected",
            "image": "ev_sub_detection",
            "sound": "sonar",
            "repeatable": false,
            "name": "Unidentified Submarine Detected",
            "description": "Sonar operators on HMS Defender have detected a faint acoustic signature matching an Argentine Type 209 diesel-electric submarine (ARA Salta) operating inside the Exclusion Zone.",
            "location": [
                -51.05,
                -58.25
            ],
            "possibleLocations": [
                [
                    -51.05,
                    -58.25
                ],
                [
                    -51.35,
                    -57.15
                ],
                [
                    -52.05,
                    -58.3
                ]
            ],
            "autoEffects": {
                "revealAssets": [
                    "a_arg_sub_san_juan"
                ]
            },
            "roleDescriptions": {
                "uk_commander": "ARA Salta is now plotted on the tactical map. If she slips away un-prosecuted, she will hunt our supply convoys later.",
                "air_maritime": "Wildcat Sting Ray torpedoes are armed and ready. Engaging now risks escalation; shadowing risks losing the contact in shallow water."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "What are the rules of engagement regarding ARA Salta?",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_sub_shadow",
                    "options": [
                        {
                            "id": "opt_sub_hunt",
                            "text": "Declare hostile. Prosecute with ASW Wildcat and Sting Ray torpedoes.",
                            "effects": {
                                "scores": {
                                    "argentina_aggression": -1,
                                    "international_pressure": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_sub_sunk",
                                        "delayMs": 75000,
                                        "probability": 0.65
                                    },
                                    {
                                        "id": "ev_sub_evades",
                                        "delayMs": 75000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_sub_shadow",
                            "text": "Shadow the contact passively. Hold fire unless she opens torpedo tubes.",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_sub_attacks",
                                        "delayMs": 80000,
                                        "probability": 0.45
                                    },
                                    {
                                        "id": "ev_sub_evades",
                                        "delayMs": 80000,
                                        "probability": 0.55
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_sub_sunk",
            "image": "astute_class_submarine",
            "sound": "explosion",
            "repeatable": false,
            "name": "Hostile Submarine Neutralised",
            "description": "HMS Defender's Wildcat helicopter has forced ARA Salta to the surface with a Sting Ray torpedo hit; the crew is abandoning ship.",
            "location": [
                -51.05,
                -58.25
            ],
            "autoEffects": {
                "assetStateChanges": {
                    "a_arg_sub_san_juan": "destroyed"
                },
                "scores": {
                    "uk_public_support": 1,
                    "military_readiness": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_sub_evades",
            "image": "ev_sub_detection",
            "sound": "sonar",
            "repeatable": false,
            "name": "Submarine Slips Sonar Net",
            "description": "ARA Salta has dived beneath a thermal layer and vanished from sonar. She remains operational and hidden somewhere in the South Atlantic.",
            "location": [
                -51.05,
                -58.25
            ],
            "autoEffects": {
                "hideAssets": [
                    "a_arg_sub_san_juan"
                ],
                "scores": {
                    "military_readiness": -1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_sub_attacks",
            "image": "ev_sub_surfaces",
            "sound": "explosion",
            "repeatable": false,
            "name": "Submarine Launches Torpedoes",
            "description": "The shadowed Argentine submarine has fired wire-guided torpedoes at HMS Defender before diving deep to escape!",
            "location": [
                -51.05,
                -58.25
            ],
            "roleDescriptions": {
                "uk_commander": "Incoming torpedoes! Defender took blast damage and the sub has slipped away again."
            },
            "autoEffects": {
                "hideAssets": [
                    "a_arg_sub_san_juan"
                ],
                "scores": {
                    "military_readiness": -2,
                    "uk_public_support": -1
                },
                "assetStateChanges": {
                    "hms_defender": "damaged"
                }
            },
            "decisions": []
        },
        {
            "id": "ev_sub_reemerges",
            "image": "ev_sub_surfaces",
            "sound": "sonar",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "Elusive Submarine Re-Emerges on Supply Lane!",
            "description": "Because ARA Salta escaped earlier without being destroyed, she has resurfaced on the eastern approach and fired on an inbound RFA resupply ship!",
            "location": [
                -51.45,
                -56.8
            ],
            "possibleLocations": [
                [
                    -51.45,
                    -56.8
                ],
                [
                    -50.8,
                    -57.2
                ],
                [
                    -52.1,
                    -57.4
                ]
            ],
            "conditions": {
                "assetStates": {
                    "a_arg_sub_san_juan": "operational"
                },
                "hiddenAssets": [
                    "a_arg_sub_san_juan"
                ],
                "triggeredEvents": [
                    "ev_sub_evades",
                    "ev_supply_shortage"
                ]
            },
            "autoEffects": {
                "revealAssets": [
                    "a_arg_sub_san_juan"
                ],
                "scores": {
                    "supply_lines": -1
                }
            },
            "roleDescriptions": {
                "uk_commander": "The escaped sub came back to haunt our logistics lane! We have a brief firing window before she dives again."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "Counter-attack the resurfaced submarine?",
                    "timeLimitMs": 40000,
                    "defaultOptionId": "opt_sub_re_evade",
                    "options": [
                        {
                            "id": "opt_sub_re_sink",
                            "text": "Commit ASW helicopters immediately to finish ARA Salta.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_arg_sub_san_juan": "destroyed"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "supply_lines": 1
                                }
                            }
                        },
                        {
                            "id": "opt_sub_re_evade",
                            "text": "Order the RFA convoy to scatter east at full speed.",
                            "effects": {
                                "hideAssets": [
                                    "a_arg_sub_san_juan"
                                ],
                                "scores": {
                                    "supply_lines": -1,
                                    "uk_public_support": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_exocet_ambush",
            "image": "ev_sea_skimming_missiles",
            "sound": "explosion",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "Coastal Exocet Ambush from West Falkland!",
            "description": "An undetected mobile Exocet launcher on West Falkland has fired a salvo across Falkland Sound at UK vessels supporting the ground fight!",
            "location": [
                -51.65,
                -60.15
            ],
            "conditions": {
                "assetStates": {
                    "a_exocet_coastal_battery": "operational"
                },
                "triggeredEvents": [
                    "ev_ground_incursion"
                ],
                "notTriggeredEvents": [
                    "ev_exocet_ambush"
                ]
            },
            "autoEffects": {
                "revealAssets": [
                    "a_exocet_coastal_battery"
                ],
                "scores": {
                    "military_readiness": -1
                }
            },
            "roleDescriptions": {
                "air_maritime": "Their launch plume just exposed the battery's position on West Falkland—scramble Typhoons now before they relocate!"
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "How do we respond to the coastal Exocet launch?",
                    "timeLimitMs": 40000,
                    "defaultOptionId": "opt_exocet_duck",
                    "options": [
                        {
                            "id": "opt_exocet_retaliate",
                            "text": "Scramble 1435 Flight immediately to destroy the launcher before it packs up.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_exocet_coastal_battery": "destroyed"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "argentina_aggression": -1
                                }
                            }
                        },
                        {
                            "id": "opt_exocet_duck",
                            "text": "Pop chaff and pull ships back out of coastal range.",
                            "effects": {
                                "hideAssets": [
                                    "a_exocet_coastal_battery"
                                ],
                                "scores": {
                                    "supply_lines": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_supply_shortage",
            "image": "ev_logistics_failure",
            "sound": "alert",
            "repeatable": false,
            "name": "Critical Supply Shortage",
            "description": "High-tempo air defence and ground combat have drained ammunition, Sea Viper reloads, and medical supplies at Mount Pleasant.",
            "location": [
                -51.692,
                -57.858
            ],
            "conditions": {
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_ground_incursion"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_san_carlos_landing"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_naval_skirmish"
                        ]
                    }
                ]
            },
            "roleDescriptions": {
                "uk_commander": "We cannot hold the islands if Mount Pleasant runs dry. Choose between sea resupply or an Ascension A400M airlift."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we deliver the emergency supplies?",
                    "options": [
                        {
                            "id": "opt_supply_sea",
                            "text": "Run an RFA surface convoy into Stanley (Vulnerable to Exocet/sub ambush).",
                            "effects": {
                                "scores": {
                                    "supply_lines": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_convoy_hit",
                                        "delayMs": 75000,
                                        "probability": 0.45
                                    },
                                    {
                                        "id": "ev_convoy_safe",
                                        "delayMs": 75000,
                                        "probability": 0.55
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_supply_air",
                            "text": "Execute a heavy A400M Atlas airbridge surge from RAF Ascension Island.",
                            "conditions": {
                                "assets": {
                                    "ascension_island": "operational"
                                }
                            },
                            "effects": {
                                "scores": {
                                    "supply_lines": 1,
                                    "military_readiness": 1
                                },
                                "assetStateChanges": {
                                    "falklands_a400m": "deployed"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_convoy_hit",
            "image": "ev_kinetic_strike",
            "sound": "explosion",
            "repeatable": false,
            "name": "Supply Convoy Ambushed",
            "description": "The surface supply convoy was struck by anti-ship missiles 30 miles east of Stanley, causing heavy materiel losses.",
            "location": [
                -51.5,
                -57
            ],
            "autoEffects": {
                "scores": {
                    "uk_public_support": -2,
                    "supply_lines": -2
                }
            },
            "decisions": []
        },
        {
            "id": "ev_convoy_safe",
            "image": "rfa_mounts_bay",
            "sound": "alert",
            "repeatable": false,
            "name": "RFA Convoy Reaches Stanley Intact",
            "description": "Using storm cover and Royal Navy escort screening, the RFA logistics ship has docked safely and unloaded fresh munitions and fuel.",
            "location": [
                -51.692,
                -57.858
            ],
            "autoEffects": {
                "scores": {
                    "supply_lines": 1,
                    "uk_public_support": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_ascension_fuel_crisis",
            "image": "ev_logistics_failure",
            "sound": "alert",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "RFA Tanker Interdiction & Wideawake Fuel Crisis",
            "description": "A combination of South Atlantic gales and covert Argentine harassment of our chartered fuel tanker has starved RAF Ascension Island's aviation fuel reserve. Voyager KC2 AAR tankers are temporarily grounded!",
            "location": [
                -7.946,
                -14.371
            ],
            "conditions": {
                "maxScores": {
                    "supply_lines": 1
                },
                "triggeredEvents": [
                    "ev_military_incursion"
                ]
            },
            "autoEffects": {
                "assetStateChanges": {
                    "ascension_voyager": "grounded"
                }
            },
            "roleDescriptions": {
                "uk_commander": "With Voyager grounded at Ascension, long-range AAR strikes and reinforcements are locked out until we authorise an Emergency Ascension Fuel Sealift or secure allied refuelling."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "How do we manage the Wideawake fuel crisis immediately?",
                    "options": [
                        {
                            "id": "opt_fuel_ration",
                            "text": "Ration MPA sorties to defensive QRA only while preparing an emergency fuel sealift.",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1,
                                    "supply_lines": 1
                                }
                            }
                        },
                        {
                            "id": "opt_fuel_us_request",
                            "text": "Request emergency US Air Force fuel drawdown from Wideawake's US stocks.",
                            "effects": {
                                "assetStateChanges": {
                                    "ascension_voyager": "operational"
                                },
                                "scores": {
                                    "supply_lines": 1,
                                    "international_pressure": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_saturation_raid",
            "image": "ev_akrotiri_strike",
            "sound": "klaxon",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "Super Étendard Saturation Raid on MPA & Stanley",
            "description": "With Argentine aggression at maximum pitch, Buenos Aires has launched an all-out mixed package of Super Étendards and strike fighters from Río Grande!",
            "location": [
                -51.823,
                -58.447
            ],
            "conditions": {
                "minScores": {
                    "argentina_aggression": 5
                },
                "triggeredEvents": [
                    "ev_naval_skirmish"
                ]
            },
            "roleDescriptions": {
                "air_maritime": "All available Typhoons and Sky Sabre batteries must commit immediately or Mount Pleasant's runway will be cratered."
            },
            "decisions": [
                {
                    "role": "air_maritime",
                    "text": "Defend against the saturation raid:",
                    "timeLimitMs": 40000,
                    "defaultOptionId": "opt_sat_shelter",
                    "options": [
                        {
                            "id": "opt_sat_all_out",
                            "text": "Scramble every serviceable Typhoon and go weapons-free with Sky Sabre.",
                            "effects": {
                                "scores": {
                                    "argentina_aggression": -2,
                                    "supply_lines": -1
                                }
                            }
                        },
                        {
                            "id": "opt_sat_shelter",
                            "text": "Keep jets in hardened shelters and rely on point air defence alone.",
                            "effects": {
                                "assetStateChanges": {
                                    "mount_pleasant": "damaged"
                                },
                                "scores": {
                                    "military_readiness": -1,
                                    "uk_public_support": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_un_ceasefire_ultimatum",
            "image": "generic_un",
            "sound": "teletype",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "Emergency UN Ceasefire Ultimatum",
            "description": "International pressure has reached critical levels. The UN Secretary-General and key European allies are demanding an immediate 24-hour halt to all offensive operations.",
            "location": [
                -51.5,
                -59
            ],
            "conditions": {
                "minScores": {
                    "international_pressure": 5
                },
                "triggeredEvents": [
                    "ev_naval_skirmish"
                ]
            },
            "roleDescriptions": {
                "downing_street": "Defying this ultimatum risks severe diplomatic isolation; accepting it freezes the tactical map where it stands."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "How does HMG respond to the UN ultimatum?",
                    "options": [
                        {
                            "id": "opt_un_ult_comply",
                            "text": "Agree to a temporary operational pause and push for mediated withdrawal.",
                            "effects": {
                                "scores": {
                                    "international_pressure": -2,
                                    "military_readiness": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_endgame_trigger",
                                        "delayMs": 60000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_un_ult_defy",
                            "text": "Reject any ceasefire while Argentine forces threaten British sovereign territory.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1,
                                    "military_readiness": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_pm_ultimatum",
            "image": "act_national_address",
            "sound": "teletype",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "Downing Street Ultimatum",
            "description": "Due to collapsing public support and mounting setbacks, the Prime Minister has issued a final ultimatum to the Task Force Commander.",
            "location": [
                -51.5,
                -59
            ],
            "conditions": {
                "maxScores": {
                    "uk_public_support": 1
                },
                "triggeredEvents": [
                    "ev_naval_skirmish"
                ]
            },
            "roleDescriptions": {
                "uk_commander": "The PM is threatening to relieve you of command and sue for peace unless you turn the tide immediately."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "The political situation is untenable. What is your response?",
                    "options": [
                        {
                            "id": "opt_pm_resign",
                            "text": "Offer my resignation. I cannot win under these constraints.",
                            "effects": {
                                "triggerEvents": [
                                    {
                                        "id": "ev_end_defeat",
                                        "delayMs": 5000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_pm_push",
                            "text": "Promise a decisive push within 24 hours (All or nothing).",
                            "effects": {
                                "scores": {
                                    "military_readiness": 2,
                                    "international_pressure": 1,
                                    "uk_public_support": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_us_support",
            "image": "ev_us_support_success",
            "sound": "teletype",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "US Offers Quiet Material Support",
            "description": "With Britain maintaining strong international standing, Washington has quietly offered satellite ISR feeds, AIM-9X/ASRAAM reloads, and Wideawake fuel access.",
            "location": [
                -51.5,
                -59
            ],
            "conditions": {
                "maxScores": {
                    "international_pressure": 2
                },
                "triggeredEvents": [
                    "ev_naval_skirmish"
                ]
            },
            "roleDescriptions": {
                "downing_street": "Washington wants this kept strictly off the record, but the intelligence and logistics boost could decide the campaign."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "Accept the discreet US material support package?",
                    "options": [
                        {
                            "id": "opt_accept_us",
                            "text": "Accept. Integrate US satellite ISR and Ascension fuel immediately.",
                            "effects": {
                                "revealAssets": [
                                    "a_shadow_oiler"
                                ],
                                "scores": {
                                    "military_readiness": 2,
                                    "supply_lines": 1
                                }
                            }
                        },
                        {
                            "id": "opt_decline_us",
                            "text": "Decline politely to avoid complicating regional diplomacy.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_un_sanctions",
            "image": "generic_un",
            "sound": "alert",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "name": "UN Threatens Economic Sanctions",
            "description": "Following aggressive UK escalation, a coalition of states at the UN is tabling targeted sanctions unless operations are de-escalated.",
            "location": [
                -51.5,
                -59
            ],
            "conditions": {
                "minScores": {
                    "international_pressure": 4
                },
                "triggeredEvents": [
                    "ev_naval_skirmish"
                ]
            },
            "roleDescriptions": {
                "downing_street": "The Treasury and Foreign Office warn that losing international cover will make sustaining the South Atlantic effort politically costly."
            },
            "decisions": [
                {
                    "role": "downing_street",
                    "text": "How do we mitigate the diplomatic fallout?",
                    "options": [
                        {
                            "id": "opt_pause_ops",
                            "text": "Announce strict defensive ROE inside the Exclusion Zone to calm allies.",
                            "effects": {
                                "scores": {
                                    "international_pressure": -1,
                                    "military_readiness": -1
                                }
                            }
                        },
                        {
                            "id": "opt_ignore_un",
                            "text": "Reject the resolution and press the military advantage.",
                            "effects": {
                                "scores": {
                                    "international_pressure": 1,
                                    "uk_public_support": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_sf_success",
            "image": "ev_sf_success",
            "sound": "explosion",
            "repeatable": false,
            "name": "SAS Operation Successful",
            "description": "Covert SAS teams on the Argentine mainland have destroyed Super Étendard strike aircraft and fuel dumps at Río Grande before extracting cleanly.",
            "location": [
                -53.777,
                -67.755
            ],
            "autoEffects": {
                "scores": {
                    "argentina_aggression": -2,
                    "military_readiness": 1
                },
                "assetStateChanges": {
                    "rio_grande": "damaged"
                }
            },
            "roleDescriptions": {
                "uk_commander": "The lads pulled it off. Massive blow to Argentine Naval Aviation's strike capacity."
            },
            "decisions": []
        },
        {
            "id": "ev_sf_failure",
            "image": "ev_sf_fail",
            "sound": "klaxon",
            "repeatable": false,
            "name": "SAS Team Compromised",
            "description": "The covert UK special forces team was spotted near Río Grande and forced into a running firefight, sparking an international incident.",
            "location": [
                -53.777,
                -67.755
            ],
            "autoEffects": {
                "scores": {
                    "uk_public_support": -1,
                    "international_pressure": 2
                }
            },
            "roleDescriptions": {
                "uk_commander": "Buenos Aires is broadcasting captured equipment on live television. Severe diplomatic fallout."
            },
            "decisions": []
        },
        {
            "id": "ev_reinforcements_arrive",
            "image": "hms_prince_of_wales",
            "sound": "alert",
            "repeatable": false,
            "name": "UK Task Group Reinforcements Arrive",
            "description": "Additional Royal Navy escorts, fresh Typhoon airframes, and Royal Marine commandos have arrived via the Ascension bridge.",
            "location": [
                -51.5,
                -57
            ],
            "autoEffects": {
                "scores": {
                    "military_readiness": 2,
                    "uk_public_support": 1
                },
                "assetStateChanges": {
                    "hms_defender": "operational",
                    "mount_pleasant": "operational"
                }
            },
            "roleDescriptions": {
                "uk_commander": "The cavalry has arrived. Damaged units are relieved and operational readiness is restored."
            },
            "decisions": []
        },
        {
            "id": "ev_recon_sweep_success",
            "image": "a400m_transport",
            "sound": "teletype",
            "repeatable": false,
            "name": "FIDF & A400M Recon Pinpoints Hidden Threats",
            "description": "Joint maritime radar sweeps and FIDF hill patrols have uncovered the hidden coastal Exocet battery and Argentine sabotage cell on the islands.",
            "location": [
                -51.65,
                -60.15
            ],
            "autoEffects": {
                "revealAssets": [
                    "a_exocet_coastal_battery",
                    "a_arg_specops_west"
                ],
                "scores": {
                    "military_readiness": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_recon_sweep_compromised",
            "image": "ev_airspace_intercept",
            "sound": "klaxon",
            "repeatable": false,
            "name": "Recon Sweep Forced Off by Enemy CAP",
            "description": "Argentine interceptors forced the A400M surveillance flight to break off early, yielding only partial imagery of West Falkland.",
            "location": [
                -51.65,
                -60.15
            ],
            "autoEffects": {
                "revealAssets": [
                    "a_exocet_coastal_battery"
                ],
                "scores": {
                    "supply_lines": -1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_black_buck_success",
            "image": "ev_raf_bases_strike",
            "sound": "explosion",
            "repeatable": false,
            "name": "Black Buck II: Long-Range Strike Hits Río Gallegos",
            "description": "Supported by Voyager KC2 air-to-air refuelling from Ascension, RAF Typhoons have delivered Storm Shadow cruise missiles onto Río Gallegos's hardened shelters and runway!",
            "location": [
                -51.609,
                -69.289
            ],
            "autoEffects": {
                "assetStateChanges": {
                    "rio_gallegos": "damaged"
                },
                "scores": {
                    "argentina_aggression": -2,
                    "uk_public_support": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_black_buck_aborted",
            "image": "voyager_refueler",
            "sound": "alert",
            "repeatable": false,
            "name": "Black Buck II: AAR Weather Abort",
            "description": "Severe mid-Atlantic turbulence damaged a Voyager refuelling drogue, forcing the long-range strike package to abort and divert back to Mount Pleasant.",
            "location": [
                -45,
                -52
            ],
            "autoEffects": {
                "scores": {
                    "supply_lines": -1,
                    "international_pressure": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_astute_kill",
            "image": "astute_class_submarine",
            "sound": "sonar",
            "repeatable": false,
            "name": "HMS Astute Clears Subsurface Threat",
            "description": "A Royal Navy Astute-class hunter-killer submarine has tracked and neutralised ARA Salta and forced the covert Argentine fleet oiler to flee the Exclusion Zone.",
            "location": [
                -50.8,
                -58.4
            ],
            "autoEffects": {
                "assetStateChanges": {
                    "a_arg_sub_san_juan": "destroyed",
                    "a_shadow_oiler": "withdrawing"
                },
                "scores": {
                    "military_readiness": 1,
                    "supply_lines": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_astute_dry_hole",
            "image": "ev_sub_detection",
            "sound": "sonar",
            "repeatable": false,
            "name": "Astute Patrol Reports Empty Sector",
            "description": "HMS Astute swept the northern approaches without regaining contact on ARA Salta, though her presence has pushed surface raiders back.",
            "location": [
                -50.5,
                -58
            ],
            "autoEffects": {
                "scores": {
                    "argentina_aggression": -1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_sealift_complete",
            "image": "raf_akrotiri",
            "sound": "alert",
            "repeatable": false,
            "name": "Ascension Fuel Sealift Restores Airbridge",
            "description": "An escorted RFA tanker has pumped fresh Avtur into RAF Ascension Island's storage tanks, returning Voyager KC2 tankers and the South Atlantic airbridge to full service.",
            "location": [
                -7.946,
                -14.371
            ],
            "autoEffects": {
                "assetStateChanges": {
                    "ascension_island": "operational",
                    "ascension_voyager": "operational"
                },
                "scores": {
                    "supply_lines": 2
                }
            },
            "decisions": []
        },
        {
            "id": "ev_endgame_trigger",
            "image": "ev_crisis_cabinet",
            "sound": "teletype",
            "repeatable": false,
            "name": "Strategic Assessment",
            "description": "The South Atlantic crisis has reached its decisive turning point. Downing Street requires your final operational assessment to conclude the campaign.",
            "location": [
                -51.5,
                -59
            ],
            "conditions": {
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_un_resolution"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_mainland_escalation"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_un_ceasefire_ultimatum"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_ground_victory"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_ground_defeat"
                        ]
                    }
                ]
            },
            "roleDescriptions": {
                "uk_commander": "Finalize your strategic assessment for the Prime Minister based on the state of our forces and public support."
            },
            "decisions": [
                {
                    "role": "uk_commander",
                    "text": "What is the final operational outcome?",
                    "options": [
                        {
                            "id": "opt_end_victory",
                            "text": "Declare Victory — Falkland Islands secured and Argentine forces expelled.",
                            "conditions": {
                                "minScores": {
                                    "uk_public_support": 3,
                                    "military_readiness": 3
                                }
                            },
                            "effects": {
                                "triggerEvents": [
                                    {
                                        "id": "ev_end_victory",
                                        "delayMs": 8000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_end_defeat",
                            "text": "Acknowledge Strategic Defeat — Task Force unable to hold the islands.",
                            "conditions": {
                                "maxScores": {
                                    "military_readiness": 2
                                }
                            },
                            "effects": {
                                "triggerEvents": [
                                    {
                                        "id": "ev_end_defeat",
                                        "delayMs": 8000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_end_stalemate",
                            "text": "Accept Negotiated Stalemate — Freeze lines and dig in for the southern winter.",
                            "effects": {
                                "triggerEvents": [
                                    {
                                        "id": "ev_end_stalemate",
                                        "delayMs": 8000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_end_victory",
            "isEndGame": true,
            "image": "ev_eu_success",
            "sound": "alert",
            "repeatable": false,
            "name": "Scenario Concluded: Victory",
            "description": "The UK has decisively defended the Falkland Islands against Argentine aggression. Sea control, air superiority, and the Ascension logistics bridge held firm.",
            "location": [
                -51.5,
                -59
            ],
            "roleDescriptions": {
                "uk_commander": "Well done, Commander. The Prime Minister and Chiefs of Staff send their commendations."
            },
            "decisions": []
        },
        {
            "id": "ev_end_defeat",
            "isEndGame": true,
            "image": "ev_endgame_domestic",
            "sound": "explosion",
            "repeatable": false,
            "name": "Scenario Concluded: Defeat",
            "description": "UK forces have been overwhelmed or forced to withdraw. The Falkland Islands have fallen under Argentine control.",
            "location": [
                -51.5,
                -59
            ],
            "roleDescriptions": {
                "uk_commander": "A dark day for British arms in the South Atlantic. Prepare for the Parliamentary inquiry."
            },
            "decisions": []
        },
        {
            "id": "ev_end_stalemate",
            "isEndGame": true,
            "image": "ev_endgame_diplomatic",
            "sound": "teletype",
            "repeatable": false,
            "name": "Scenario Concluded: Stalemate",
            "description": "A bitter ceasefire and winter stalemate have settled over the South Atlantic, leaving sovereignty contested and UK forces facing an indefinite garrison.",
            "location": [
                -51.5,
                -59
            ],
            "roleDescriptions": {
                "uk_commander": "Neither a clear victory nor a defeat. The diplomatic and military burden will endure for years."
            },
            "decisions": []
        },
        {
            "id": "act_sf_mainland",
            "isManualAction": true,
            "image": "act_special_forces",
            "name": "Deploy SAS to Mainland",
            "description": "Authorize a covert SAS raid on Río Grande airbase to destroy Super Étendard strike aircraft on the ground. High risk of diplomatic fallout if compromised.",
            "initiator": [
                "uk_commander"
            ],
            "requiresApprovalFrom": [
                "downing_street"
            ],
            "conditions": {
                "minScores": {
                    "military_readiness": 2
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_air_raid"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_pebble_bvr"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_political_pressure"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_mainland_escalation"
                        ]
                    }
                ],
                "notTriggeredEvents": [
                    "ev_sf_success",
                    "ev_sf_failure"
                ]
            },
            "effects": {
                "scores": {
                    "international_pressure": 1
                },
                "randomEvents": [
                    {
                        "id": "ev_sf_success",
                        "delayMs": 35000,
                        "probability": 0.6
                    },
                    {
                        "id": "ev_sf_failure",
                        "delayMs": 35000,
                        "probability": 0.4
                    }
                ]
            }
        },
        {
            "id": "act_request_reinforcements",
            "isManualAction": true,
            "image": "act_us_support",
            "name": "Request Emergency Reinforcements",
            "description": "Request immediate deployment of additional Royal Navy escorts, Typhoons, and Royal Marines from the UK. Requires RAF Ascension Island to be operational.",
            "initiator": [
                "uk_commander",
                "air_maritime"
            ],
            "requiresApprovalFrom": [
                "downing_street"
            ],
            "conditions": {
                "maxScores": {
                    "supply_lines": 4
                },
                "assets": {
                    "ascension_island": "operational"
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_military_incursion"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_supply_shortage"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_ship_damaged"
                        ]
                    }
                ],
                "notTriggeredEvents": [
                    "ev_reinforcements_arrive"
                ]
            },
            "effects": {
                "scores": {
                    "uk_public_support": -1,
                    "supply_lines": 1
                },
                "triggerEvents": [
                    {
                        "id": "ev_reinforcements_arrive",
                        "delayMs": 90000,
                        "probability": 1
                    }
                ]
            }
        },
        {
            "id": "act_fidf_recon",
            "isManualAction": true,
            "image": "a400m_transport",
            "name": "Task FIDF & A400M Covert Recon Sweep",
            "description": "Coordinate FIDF ground scouts and an A400M Atlas maritime patrol to sweep West Falkland and locate hidden coastal Exocet launchers and sabotage cells.",
            "initiator": [
                "uk_commander",
                "air_maritime"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_military_incursion"
                ],
                "notTriggeredEvents": [
                    "ev_recon_sweep_success",
                    "ev_recon_sweep_compromised"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_recon_sweep_success",
                        "delayMs": 30000,
                        "probability": 0.75
                    },
                    {
                        "id": "ev_recon_sweep_compromised",
                        "delayMs": 30000,
                        "probability": 0.25
                    }
                ]
            }
        },
        {
            "id": "act_black_buck_strike",
            "isManualAction": true,
            "image": "voyager_refueler",
            "name": "Authorise Long-Range AAR Strike (Black Buck II)",
            "description": "Mount a Voyager-refuelled Typhoon Storm Shadow strike from Ascension/MPA against Río Gallegos Air Base. Requires Voyager KC2 operational.",
            "initiator": [
                "uk_commander",
                "air_maritime"
            ],
            "requiresApprovalFrom": [
                "downing_street"
            ],
            "conditions": {
                "assets": {
                    "ascension_voyager": "operational"
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_naval_skirmish"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_air_raid"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_mainland_escalation"
                        ]
                    }
                ],
                "notTriggeredEvents": [
                    "ev_black_buck_success",
                    "ev_black_buck_aborted"
                ]
            },
            "effects": {
                "scores": {
                    "international_pressure": 1
                },
                "randomEvents": [
                    {
                        "id": "ev_black_buck_success",
                        "delayMs": 45000,
                        "probability": 0.65
                    },
                    {
                        "id": "ev_black_buck_aborted",
                        "delayMs": 45000,
                        "probability": 0.35
                    }
                ]
            }
        },
        {
            "id": "act_astute_patrol",
            "isManualAction": true,
            "image": "astute_class_submarine",
            "name": "Task HMS Astute Barrier Patrol",
            "description": "Vector a Royal Navy Astute-class nuclear attack submarine into the northern approaches to hunt ARA Salta and disrupt covert Argentine fleet oilers.",
            "initiator": [
                "uk_commander",
                "air_maritime"
            ],
            "conditions": {
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_sub_detected"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_merchant_seized"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_naval_skirmish"
                        ]
                    }
                ],
                "notTriggeredEvents": [
                    "ev_astute_kill",
                    "ev_astute_dry_hole"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_astute_kill",
                        "delayMs": 45000,
                        "probability": 0.7
                    },
                    {
                        "id": "ev_astute_dry_hole",
                        "delayMs": 45000,
                        "probability": 0.3
                    }
                ]
            }
        },
        {
            "id": "act_ascension_sealift",
            "isManualAction": true,
            "image": "rfa_mounts_bay",
            "name": "Emergency Ascension Fuel Sealift",
            "description": "Dispatch an escorted RFA tanker to replenish RAF Ascension Island's aviation fuel reserves, restoring Wideawake Airfield and Voyager KC2 tankers to operational status.",
            "initiator": [
                "uk_commander",
                "downing_street"
            ],
            "conditions": {
                "any": [
                    {
                        "maxScores": {
                            "supply_lines": 2
                        }
                    },
                    {
                        "assets": {
                            "ascension_island": "sabotaged"
                        }
                    },
                    {
                        "assets": {
                            "ascension_voyager": "grounded"
                        }
                    }
                ],
                "triggeredEvents": [
                    "ev_start"
                ],
                "notTriggeredEvents": [
                    "ev_sealift_complete"
                ]
            },
            "effects": {
                "scores": {
                    "uk_public_support": -1
                },
                "triggerEvents": [
                    {
                        "id": "ev_sealift_complete",
                        "delayMs": 45000,
                        "probability": 1
                    }
                ]
            }
        }
    ]
};
