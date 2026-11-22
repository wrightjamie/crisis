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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Force Protection Posture Raised",
                                        "messages": [
                                            "BFSAI garrisons at RAF Mount Pleasant and Port Stanley have assumed heightened perimeter lockdown; QRA readiness is elevated.",
                                            "Security cordons are established around key Stanley infrastructure and MPA installations, though local civic friction is rising."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Domestic Reaction to Stanley Lockdown",
                                        "message": "UK media outlets report visible military checkpoints in Stanley, prompting early opposition queries in Westminster.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Whitehall Denunciation Issued",
                                        "message": "HMG has formally rejected the Stanley poll and detained the Mayor-elect; OAS and UN delegations have lodged urgent protests.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "TEZ Alert Status Escalated",
                                        "message": "Detention of the pro-Argentine candidate has triggered heightened Argentine radio traffic along the Patagonian coast; QRA-5 crews are strapped in.",
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "STANLEY ELECTION DISPUTED — DETENTION ORDERED",
                                        "message": "HMG denounces election interference; Argentine forces accelerating movement toward TEZ.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "MI6 Covert Inquiry Authorised",
                                        "message": "Whitehall retains diplomatic latitude while MI6 and GCHQ trace illicit funding channels behind the Stanley vote.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Standing Posture Maintained",
                                        "message": "BFSAI units hold routine patrol patterns to avoid provocation; tactical readiness remains unreinforced pending MI6 findings.",
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Unconfirmed Acoustic Transient",
                                                "messages": [
                                                    "HMS Defender passive sonar registers a faint low-frequency diesel transient inside the northern TEZ; ASW team is correlating bearings.",
                                                    "Sonar watch reports intermittent propeller cavitation consistent with a Type 209 hull north of East Falkland."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_merchant_seized",
                                        "delayMs": 110000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Merchant AIS Anomaly Reported",
                                                "messages": [
                                                    "Maritime surveillance flags a British-flagged tanker halting abruptly 40 miles north of Falkland Sound near an unlit surface track.",
                                                    "VHF distress squelch detected from a UK-registered RFA-chartered tanker north of the Sound; A400M radar diverting to investigate."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "deployAssets": {
                                    "falklands_typhoons": 120000
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "1435 Flight Scrambled to CAP",
                                        "messages": [
                                            "Four Typhoon FGR4 aircraft from 1435 Flight are airborne from MPA on active intercept vectors inside the TEZ.",
                                            "1435 Flight Typhoons have cleared Mount Pleasant runway and established forward CAP, challenging inbound Argentine tracks."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "1435 FLIGHT SCRAMBLED — TEZ INTERCEPT ACTIVE",
                                        "message": "Typhoon FGR4 CAP airborne; HMS Defender Sea Viper batteries at red readiness.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            },
                            "conditions": {
                                "assets": {
                                    "falklands_typhoons": "operational"
                                }
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
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Passive Sonar Cue — Northern Approaches",
                                                "messages": [
                                                    "With outer CAP held back, HMS Defender detects a suspected submerged contact closing the eastern approaches.",
                                                    "Acoustic array logs a brief snort-mast radar emission 35 miles northeast of Stanley before fading."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_merchant_seized",
                                        "delayMs": 115000,
                                        "probability": 0.4,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Surface Interference on Tanker Lane",
                                                "messages": [
                                                    "Coastguard relay indicates an unescorted British tanker being shadowed by an Argentine corvette north of Falkland Sound.",
                                                    "AIS transponder on a UK-flagged fuel carrier went dark 40 miles north of the Sound."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "Defensive CAP Over MPA",
                                        "messages": [
                                            "1435 Flight maintains tight defensive orbit over RAF Mount Pleasant, conceding outer TEZ airspace to inbound Argentine patrols.",
                                            "Typhoons remain inside MPA radar umbrella under restrictive ROE; HMS Defender holds fire pending hostile intent."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Restrained ROE Logged",
                                        "message": "Restraint inside the TEZ lowers immediate diplomatic friction, though domestic commentators question why Argentine aircraft were not challenged.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "EYES ONLY: Coastal Exocet Plot Pinpointed",
                                        "messages": [
                                            "Source remains strictly compartmentalised. Vectoring FIDF/A400M ISR onto the Santiago coordinates confirmed the West Falkland Exocet battery position.",
                                            "Compartmentalised tasking succeeded without burning Santiago channels; the mobile coastal Exocet battery is now plotted for strike clearance."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Radar Plots Released at UN",
                                        "message": "UN delegations acknowledge proof of covert Argentine deployments, boosting UK standing; Santiago backchannel has been permanently severed.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "West Falkland Exocet Site Confirmed",
                                        "message": "Declassified intelligence plots reveal a mobile Argentine coastal Exocet battery on West Falkland.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "WEST FALKLAND EXOCET BATTERY EXPOSED",
                                        "message": "Declassified radar evidence confirms coastal launcher; UN briefed.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "Covert Fleet Oiler Tracked",
                        "messages": [
                            "A400M ISR accompanying the tanker intercept identified an unflagged Argentine fleet oiler sustaining corvette operations north of the TEZ.",
                            "Radar and EO imagery confirm a clandestine commercial tanker refuelling the boarding corvette; asset plotted on tactical display."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "UK TANKER BOARDED — COVERT OILER LOCATED",
                        "message": "Argentine corvette boarding reported 40nm north of Falkland Sound.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
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
                                    "uk_public_support": 1
                                },
                                "assetStateChanges": {
                                    "a_shadow_oiler": "damaged"
                                },
                                "conditionalEffects": [
                                    {
                                        "conditions": {
                                            "not": {
                                                "any": [
                                                    {
                                                        "minScores": {
                                                            "argentina_aggression": 4
                                                        }
                                                    },
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
                                                            "ev_ground_incursion"
                                                        ]
                                                    },
                                                    {
                                                        "triggeredEvents": [
                                                            "ev_sub_detected"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "effects": {
                                            "scores": {
                                                "international_pressure": 1
                                            },
                                            "outcomeMessages": [
                                                {
                                                    "roles": [
                                                        "downing_street",
                                                        "uk_commander"
                                                    ],
                                                    "title": "Diplomatic Criticism Over Early Boarding Action",
                                                    "message": "Because major fleet combat had not yet been internationally verified, regional capitals criticised UK boarding force as premature escalation (+1 International Pressure).",
                                                    "severity": "warning",
                                                    "aiRandomize": false
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "Wildcat Boarding Team Recovers Tanker",
                                        "messages": [
                                            "Royal Marines fast-roped from HMS Defender's Wildcat, securing the bridge and disabling the supporting Argentine oiler's steering gear.",
                                            "Boarding party regained control of the British tanker without crew casualties; the covert fleet oiler took cannon fire and is damaged."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Fuel Tanker & Supply Integrity Secured",
                                        "message": "Recovery of the tanker preserves South Atlantic fuel stocks and reinforces domestic resolve.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_merchant_show_force",
                            "text": "Order 1435 Flight Typhoons to buzz the corvette and force a withdrawal.",
                            "effects": {
                                "scores": {
                                    "supply_lines": 1,
                                    "argentina_aggression": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "Typhoon Low-Pass Breaks Off Boarding",
                                        "messages": [
                                            "Two 1435 Flight Typhoons executed supersonic passes across the Argentine corvette's bow, forcing it to abort the seizure and clear the tanker.",
                                            "Show of force deterred the boarding party; the British tanker has resumed course toward East Falkland."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Formal Piracy Dossier Lodged at UN",
                                        "message": "HMG avoided a maritime firefight and lodged legal protests in New York, moderating diplomatic pressure.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Tanker Lost to Ushuaia Diversion",
                                        "message": "Yielding the tanker costs vital fuel reserves and draws sharp domestic criticism over unanswered coercion.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
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
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 75000,
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Inbound Raid Signature Detected",
                                                "messages": [
                                                    "S1850M surveillance radar detects low-level strike tracks accelerating east from Patagonia toward Mount Pleasant.",
                                                    "J2 flash: FAA strike aircraft lifting off coastal radar horizon—prepare MPA Sky Sabre batteries for inbound raid."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_pebble_bvr",
                                        "delayMs": 75000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "High-Altitude Fighter Sweep Inbound",
                                                "messages": [
                                                    "Long-range radar plots a four-ship Argentine fighter sweep crossing West Falkland toward Pebble Island.",
                                                    "1435 Flight intercepts high-fast radar contacts manoeuvring over Pebble Island to draw off CAP."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "conditionalEffects": [
                                    {
                                        "conditions": {
                                            "not": {
                                                "any": [
                                                    {
                                                        "minScores": {
                                                            "argentina_aggression": 4
                                                        }
                                                    },
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
                                                            "ev_ground_incursion"
                                                        ]
                                                    },
                                                    {
                                                        "triggeredEvents": [
                                                            "ev_sub_detected"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "effects": {
                                            "scores": {
                                                "international_pressure": 1
                                            },
                                            "outcomeMessages": [
                                                {
                                                    "roles": [
                                                        "downing_street",
                                                        "uk_commander"
                                                    ],
                                                    "title": "UN Scrutiny on First Kinetic Engagement",
                                                    "message": "Diplomatic observers note UK units opened full weapons-free fire ahead of corroborated large-scale attrition (+1 International Pressure).",
                                                    "severity": "warning",
                                                    "aiRandomize": false
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "deployAssets": {
                                    "hms_defender": 120000
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "HMS Defender Weapons Free",
                                        "messages": [
                                            "Sea Viper and 4.5-inch naval gunfire engaged incoming fast attack craft and sea-skimmers; multiple hostile surface contacts neutralised.",
                                            "HMS Defender cleared the immediate surface threat off East Falkland with heavy expenditure of Aster missiles."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "HMS DEFENDER ENGAGES HOSTILE SURFACE GROUP",
                                        "message": "Sea Viper active off East Falkland; hostile fast attack craft repulsed.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            },
                            "conditions": {
                                "assets": {
                                    "hms_defender": "operational"
                                }
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
                                        "probability": 0.6,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Enemy Escort Fighters Closing Pebble Island",
                                                "messages": [
                                                    "Following the West Falkland strike, radar picks up four Argentine fighters climbing over Pebble Island to contest airspace.",
                                                    "Fast-air contacts inbound from the northwest; 1435 Flight transitioning to BVR intercept."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 75000,
                                        "probability": 0.4,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Low-Level Strike Package Inbound",
                                                "messages": [
                                                    "Argentine strike aircraft are exploiting terrain masking east of West Falkland, heading toward RAF Mount Pleasant.",
                                                    "Early-warning radar registers fast low-altitude tracks piercing the western sector."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "West Falkland Exocet Battery Destroyed",
                                        "messages": [
                                            "Guided onto the plotted coordinates, 1435 Flight Typhoons delivered Paveway IV munitions directly onto the coastal Exocet launcher—secondary explosions confirmed.",
                                            "Precision Typhoon strike eliminated the West Falkland Exocet battery while HMS Defender held the seaward approaches."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "COASTAL EXOCET BATTERY DESTROYED",
                                        "message": "1435 Flight precision strike neutralises West Falkland missile threat.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Sea-Skimming Missile Seeker Lock Warning",
                                                "messages": [
                                                    "HMS Defender ESM warns of active Exocet seeker emissions closing rapidly through chaff decoys—bracing for impact.",
                                                    "Multiple sea-skimmers have penetrated the outer point-defence envelope on Defender's port quarter."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 75000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Strike Wave Bypassing Naval Screen",
                                                "messages": [
                                                    "With Defender disengaging eastward, enemy strike jets are routing past the northern flank toward MPA.",
                                                    "Mount Pleasant radar plots low-flying strike aircraft bypassing maritime air defence."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "HMS Defender Breaks Contact Eastward",
                                        "messages": [
                                            "HMS Defender deploys chaff and manoeuvres evasively under restrictive fire; hostile surface craft retain initiative near the coast.",
                                            "Holding defensive posture surrenders sea-lane tempo while inbound threats continue tracking Defender."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                        "probability": 0.75,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Enemy Air Cover Collapsing",
                                                "messages": [
                                                    "Surviving Argentine aircraft are jettisoning external tanks and retreating west across Falkland Sound; surface units are exposed.",
                                                    "GCHQ intercepts indicate Argentine air controllers ordering a general withdrawal from East Falkland airspace."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_radar_damaged",
                                        "delayMs": 70000,
                                        "probability": 0.25,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "ARM Leaker Toward Mount Alice",
                                                "messages": [
                                                    "With all four Typhoons committed forward over Pebble Island, ESM detects an anti-radiation missile launch streaking toward Mount Alice radar.",
                                                    "One low-flying Argentine jet slipped south of the BVR engagement and lofted an anti-radiation weapon toward MPA sensors."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "Meteor BVR Salvo Released",
                                        "messages": [
                                            "1435 Flight launched long-range Meteor missiles at maximum range, forcing Argentine fighters to abort and defend before reaching MPA.",
                                            "Four-ship Typhoon formation prosecuted the Pebble Island package at BVR, scoring multiple radar-track kills."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                        "probability": 0.6,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Argentine Raid Breaking Off",
                                                "messages": [
                                                    "Forward pair forced the Pebble Island decoy flight to turn back; MPA defences remained unchallenged.",
                                                    "Air picture clearing over East Falkland as hostile tracks withdraw west."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_air_raid",
                                        "delayMs": 70000,
                                        "probability": 0.4,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Low-Level Strikers Slipping Past Split CAP",
                                                "messages": [
                                                    "The forward Typhoon pair is tied down over Pebble Island while a trailing strike element dives beneath radar toward MPA.",
                                                    "Ground controllers warn of fast low-level contacts closing Mount Pleasant from the southwest."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "Split CAP Engagement",
                                        "messages": [
                                            "Two Typhoons engage over Pebble Island at reduced salvo weight while the second pair orbits Mount Pleasant's fuel farm.",
                                            "Split formation preserves MPA close air cover while contesting the northern approach with two FGR4s."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
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
                                        "probability": 0.7,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "FAA Strike Wave Repulsed",
                                                "messages": [
                                                    "Heavy Sky Sabre attrition forced surviving Argentine strike aircraft to abort bomb runs and exit the TEZ.",
                                                    "Air raid broken up over MPA; remaining hostile maritime units lack air cover."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_radar_damaged",
                                        "delayMs": 75000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Outer Radar Head Targeted",
                                                "messages": [
                                                    "While Sky Sabre protected the runway, an anti-radiation missile tracked onto the exposed Mount Alice early-warning array.",
                                                    "Radar watch reports sudden sidelobe interference on Mount Alice as enemy strikers break off."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "Sky Sabre Point Defence Engaged",
                                        "messages": [
                                            "Sky Sabre batteries around Mount Pleasant ripple-fired Land Ceptor missiles, shielding the main runway and hardened shelters.",
                                            "MPA air-defence umbrella held the runway intact and protected the Ascension airbridge terminal."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Wave 1 Air Threat Neutralised",
                                                "messages": [
                                                    "1435 Flight downed lead strike aircraft and scattered the formation, securing operational control of the TEZ.",
                                                    "Enemy air and naval forces are withdrawing westward under heavy losses."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ship_damaged",
                                        "delayMs": 75000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Split Strike Diverting Toward HMS Defender",
                                                "messages": [
                                                    "With Typhoons committed inland, two Super Étendards broke off seaward and locked radar onto HMS Defender.",
                                                    "ESM alerts on HMS Defender: sea-skimming missile profiles inbound from the southern flank."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "deployAssets": {
                                    "falklands_typhoons": 120000
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "1435 Flight Forward Intercept",
                                        "messages": [
                                            "Typhoons pushed west to intercept the strike package prior to weapon release, degrading Argentine strike capacity.",
                                            "Forward fighter engagement broke up the incoming attack formation over East Falkland."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            },
                            "conditions": {
                                "assets": {
                                    "falklands_typhoons": "operational"
                                }
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "Mount Alice Radar Degraded",
                        "message": "Anti-radiation strike knocked Mount Alice offline, leaving a 90-degree western surveillance blind spot and degrading Mount Pleasant readiness.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "MPA EARLY-WARNING RADAR DAMAGED",
                        "message": "Mount Alice array hit; 90-degree western gap active.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                        "probability": 0.6,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Low-Level Rotary Contacts Near Stanley",
                                                "messages": [
                                                    "Restored radar immediately picks up multiple slow, low-altitude helicopter returns skimming east toward Port Stanley.",
                                                    "FIDF lookouts west of Stanley report heavy turbine rotor noise approaching at treetop height."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_san_carlos_landing",
                                        "delayMs": 80000,
                                        "probability": 0.4,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander",
                                                    "air_maritime"
                                                ],
                                                "title": "Surface Echoes Entering Falkland Sound",
                                                "messages": [
                                                    "Coastal radar detects slow-moving landing craft signatures slipping under mist into San Carlos Water.",
                                                    "Acoustic and thermal watch flags amphibious engine noise near the San Carlos narrows."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "Mount Alice Radar Restored",
                                        "messages": [
                                            "1564 Flight Chinooks airlifted Royal Engineers and replacement waveguide assemblies to Mount Alice; full 360-degree radar sweep is back online.",
                                            "Emergency Chinook sling-load restored MPA early-warning coverage at the cost of heavy aviation fuel expenditure."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Unobserved Approach in Falkland Sound",
                                                "messages": [
                                                    "Terrain masking blocks HMS Defender's S1850M sweep over San Carlos; coastal watchers report diesel craft entering the bay.",
                                                    "Ground observers near San Carlos Water report unlit landing vessels approaching the beaches."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ground_incursion",
                                        "delayMs": 70000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Low-Flying Helicopters Sighted Near Stanley",
                                                "messages": [
                                                    "Visual spotters report Argentine transport helicopters hugging ridges west of Port Stanley under the radar horizon.",
                                                    "Stanley harbour police report troop-carrying helicopters approaching from the northwest."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "S1850M Gap-Filler Coverage Active",
                                        "message": "HMS Defender assumed primary air-surveillance duty while 1564 Flight Chinooks remain staged for rapid infantry mobility; terrain masking persists to the west.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                        "probability": 0.85,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander",
                                                    "air_maritime"
                                                ],
                                                "title": "Argentine Surface Units Closing Falkland Sound",
                                                "messages": [
                                                    "With HMS Defender clear to the east, Argentine corvettes and transports are pushing unopposed into Falkland Sound.",
                                                    "Loss of naval radar coverage leaves coastal approaches open to imminent amphibious movement."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_naval_victory",
                                        "delayMs": 85000,
                                        "probability": 0.15,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "1435 Flight Holding the Exclusion Zone",
                                                "messages": [
                                                    "Despite Defender's withdrawal, 1435 Flight Typhoons have caught and turned back the lead Argentine surface group.",
                                                    "Argentine strike elements appear low on fuel and are breaking off despite Defender pulling east."
                                                ],
                                                "severity": "info",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "HMS Defender Withdrawing East",
                                        "message": "HMS Defender has turned east out of Exocet range to stabilise turbine fires, leaving East Falkland waters uncovered.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Public Concern Over Naval Withdrawal",
                                        "message": "Reports of HMS Defender pulling back under fire trigger immediate pressure on Whitehall and domestic media.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Sea Viper Salvo Disrupting Enemy Flotilla",
                                                "messages": [
                                                    "HMS Defender's continued radar lock has forced incoming Argentine strike aircraft to abort and scatter.",
                                                    "Combined Sea Viper and Typhoon fire is breaking the momentum of the Argentine maritime push."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_naval_defeat",
                                        "delayMs": 80000,
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Overwhelming Surface Pressure on Damaged Destroyer",
                                                "messages": [
                                                    "Reduced propulsion limits HMS Defender's firing arcs as fresh Argentine surface groups press into Falkland Sound.",
                                                    "Sea Viper magazine levels are critical while hostile escorts close from the north."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "HMS Defender Holding Station Under Damage",
                                        "messages": [
                                            "Damage control teams contained aft superstructure fires; HMS Defender maintains Sea Viper coverage on one turbine.",
                                            "HMS Defender remains on station off East Falkland, bolstering task force morale and air defence."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "HMS DEFENDER DAMAGED — HOLDING STATION",
                                        "message": "Type 45 destroyer remains in the line; Sea Viper air defence operational.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                        "probability": 0.6,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Low-Altitude Heliborne Infiltration Tracked",
                                                "messages": [
                                                    "Radar plots desperate Argentine transport helicopters flying nape-of-the-earth across East Falkland toward Port Stanley.",
                                                    "FIDF scouts report multiple heavy helicopters descending west of Stanley despite maritime losses."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_san_carlos_landing",
                                        "delayMs": 65000,
                                        "probability": 0.4,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Nocturnal Small-Boat Activity in Falkland Sound",
                                                "messages": [
                                                    "Maritime patrol detects shallow-draft landing craft slipping through sea mist into San Carlos Water.",
                                                    "Thermal ISR registers amphibious craft disembarking troops along the San Carlos shoreline."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Wave 1 Complete — Sea Control Secured",
                                        "message": "Maritime exclusion around East Falkland is re-established; BFSAI ISR and ground companies are shifting to counter Wave 2 island landings.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "SEA CONTROL RE-ESTABLISHED — WAVE 2 TRANSITION",
                                        "message": "First maritime wave repulsed; task force shifting to island defence.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Amphibious Approach Detected at San Carlos",
                                                "messages": [
                                                    "Uncontested in Falkland Sound, Argentine amphibious craft are moving directly toward San Carlos Water.",
                                                    "Coastal watchers report landing craft hulls silhouetted in San Carlos Bay."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ground_incursion",
                                        "delayMs": 55000,
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Air-Assault Helicopters Approaching Stanley",
                                                "messages": [
                                                    "With naval air-defence pushed offshore, Argentine assault helicopters are flying straight toward Port Stanley.",
                                                    "Multiple rotary-wing contacts inbound on Stanley's western perimeter."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Wave 1 Setback — Garrison Digging In",
                                        "message": "With sea control lost east of Falkland Sound, all ground forces are entrenching around Port Stanley and RAF Mount Pleasant.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "LOSS OF SEA CONTROL — ISLAND GARRISON ON HIGH ALERT",
                                        "message": "Naval screen pushed east; amphibious and heliborne landings imminent.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Hostiles Falling Back Into Stanley Suburbs",
                                                "messages": [
                                                    "Dislodged from the western ridge, Argentine marine commandos are infiltrating harbour buildings inside Port Stanley.",
                                                    "Forward platoons report close-range automatic fire erupting along the western edge of Stanley."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 75000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Fighting Bogging Down Along Western Ridges",
                                                "messages": [
                                                    "Both sides are trading mortar fire across Mount Tumbledown and Wireless Ridge as winter squalls close in.",
                                                    "Counter-attack stalled short of the landing zone; opposing positions are hardening along the ridge line."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Infantry & 1564 Flight Counter-Attack Launched",
                                        "messages": [
                                            "Roulement Infantry Company and 1564 Flight helicopters have engaged the commando landing force outside Port Stanley.",
                                            "Immediate counter-attack blunted the Argentine momentum west of Stanley, though unit exhaustion is climbing."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                        "probability": 0.7,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Enemy Digging In Outside Cordon",
                                                "messages": [
                                                    "Forward observation posts confirm Argentine commandos entrenching along Wireless Ridge facing the UK cordon.",
                                                    "Contact along the Stanley perimeter has settled into static mortar and sniper exchanges."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_goose_green_cut_off",
                                        "delayMs": 75000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Comms Drop From Goose Green Outpost",
                                                "messages": [
                                                    "While forces concentrated around Stanley, Argentine patrols moved south toward Darwin and Goose Green; HF radio checks just went silent.",
                                                    "FIDF lookout near Goose Green reports hostile reconnaissance vehicles cutting the track to MPA."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_contact",
                                        "delayMs": 95000,
                                        "probability": 0.65
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "Stanley Perimeter Cordon & Civilian Evacuation",
                                        "message": "UK troops sealed key roads around Port Stanley and moved civilians to hardened shelters, earning domestic praise while giving commandos space to dig in.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Surviving Enemy Columns Pushing South",
                                                "messages": [
                                                    "Elements that disembarked before the dawn raid are moving south along Brenton Loch toward Goose Green.",
                                                    "Air recon spots Argentine light armour bypassing San Carlos toward the Goose Green isthmus."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 80000,
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander",
                                                    "air_maritime"
                                                ],
                                                "title": "San Carlos Beachhead Collapsing",
                                                "messages": [
                                                    "With landing craft burning in the bay, stranded Argentine units are surrendering or retreating in disarray across East Falkland.",
                                                    "Ground patrols report white flags and abandoned equipment along the San Carlos ridges."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_contact",
                                        "delayMs": 90000,
                                        "probability": 0.65
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Dawn Paveway IV Strike on San Carlos",
                                        "messages": [
                                            "1435 Flight Typhoons struck amphibious landing craft in San Carlos Water at first light, wrecking enemy vehicles on the slipway.",
                                            "Precision dawn air strikes crippled Argentine landing logistics in San Carlos Bay and boosted task force readiness."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                        "probability": 0.6,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Positional Deadlock Over San Carlos & Stanley Approaches",
                                                "messages": [
                                                    "Containment holds the bay, though enemy units are filtering east into defensive ridge positions.",
                                                    "Ground forces are locked into a static holding action across the central peat ridges."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_urban_combat",
                                        "delayMs": 75000,
                                        "probability": 0.4,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Infiltrators Slipping East Toward Stanley",
                                                "messages": [
                                                    "Small Argentine commando detachments bypassed the San Carlos screen during darkness and are probing Port Stanley.",
                                                    "Stanley garrison reports hostile mortar fire from the western harbour approaches."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_resistance_contact",
                                        "delayMs": 95000,
                                        "probability": 0.6
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "Chinook Air-Assault Contains San Carlos",
                                        "message": "1564 Flight Chinooks inserted infantry onto the San Carlos heights, pinning the beachhead at heavy helicopter fuel and spares cost.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                        "probability": 0.7,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Southern Flank Crumbling",
                                                "messages": [
                                                    "Reinforced Goose Green troops are rolling up isolated Argentine blocking positions across Lafonia.",
                                                    "Intercepted enemy net indicates Argentine ground morale collapsing around Darwin and Stanley."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 80000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Goose Green Held — Ridge Line Still Contested",
                                                "messages": [
                                                    "Goose Green is secure, but surviving enemy detachments have fallen back to fortify the ridges west of Stanley.",
                                                    "Ground offensive momentum is slowing in worsening sleet along the central ridges."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "Goose Green Relieved by Low-Level Chinook Raid",
                                        "messages": [
                                            "Under Typhoon top-cover, 1564 Flight Chinooks flew nap-of-the-earth into Goose Green, delivering ammunition and evacuating wounded settlers.",
                                            "Daring rotary extraction broke the encirclement at Goose Green, though intense sortie tempo taxed supply stocks."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Front Stabilising in Stalemate",
                                                "messages": [
                                                    "The Goose Green detachment went to ground in the peat hills while main UK forces dig in outside Stanley.",
                                                    "Neither side holds sufficient combat power to force an immediate breakthrough."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ground_defeat",
                                        "delayMs": 80000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Enemy Exploiting Southern Breakthrough",
                                                "messages": [
                                                    "Buenos Aires media is broadcasting footage from Goose Green as Argentine columns mass for a final push on Port Stanley.",
                                                    "Forward defensive screen west of Stanley is buckling under concentrated enemy assault."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "Goose Green Detachment Ordered to Evade",
                                        "message": "Rotary lift is conserved for Mount Pleasant, while news of settlers cut off at Goose Green damages UK public support.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                    "uk_public_support": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 80000,
                                        "probability": 0.8,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Harbour Strongpoints Surrendering",
                                                "messages": [
                                                    "Argentine marine commandos cut off inside Stanley are laying down arms after precision mortar suppression.",
                                                    "Company commanders report Port Stanley streets nearly clear of organised resistance."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_standoff",
                                        "delayMs": 80000,
                                        "probability": 0.2,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Remnants Pulling Back to Western Ridges",
                                                "messages": [
                                                    "Surviving enemy squads have withdrawn from the harbour into prepared positions on Wireless Ridge.",
                                                    "Urban clearance stalled at the western outskirts under persistent sniper and mortar fire."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "conditionalEffects": [
                                    {
                                        "conditions": {
                                            "not": {
                                                "any": [
                                                    {
                                                        "minScores": {
                                                            "argentina_aggression": 4
                                                        }
                                                    },
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
                                                            "ev_ground_incursion"
                                                        ]
                                                    },
                                                    {
                                                        "triggeredEvents": [
                                                            "ev_sub_detected"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "effects": {
                                            "scores": {
                                                "international_pressure": 1
                                            },
                                            "outcomeMessages": [
                                                {
                                                    "roles": [
                                                        "downing_street",
                                                        "uk_commander"
                                                    ],
                                                    "title": "International Condemnation of Urban Bombardment",
                                                    "message": "Without prior corroborated heavy combat footage at the UN, television reports of heavy ordnance in Stanley drew swift diplomatic backlash (+1 International Pressure).",
                                                    "severity": "warning",
                                                    "aiRandomize": false
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Heavy Mortar & CAS Fires Employed in Stanley",
                                        "messages": [
                                            "81mm mortars and Typhoon close air support suppressed fortified enemy harbour strongpoints, though civilian property damage draws domestic criticism.",
                                            "Combined heavy fires shattered Argentine pockets in Stanley at the cost of civilian collateral scrutiny."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Clearance Slowing Along Ridge Approaches",
                                                "messages": [
                                                    "Restricted fire rules slowed momentum, allowing Argentine units to consolidate along Mount Tumbledown.",
                                                    "Fighting has ground into a static perimeter line west of Port Stanley."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 85000,
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Stanley Defenders Outmanoeuvred",
                                                "messages": [
                                                    "Close-quarter infantry assaults isolated the remaining harbour pockets; prisoners are being rounded up.",
                                                    "Final enemy strongpoints in Stanley are collapsing without civilian casualties."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "Close Infantry Clearance Protects Civilians",
                                        "message": "UK infantry cleared Stanley buildings room-by-room without heavy bombardment, sparing islanders at high tactical attrition.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                        "probability": 0.7,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Ridge Crest Breached",
                                                "messages": [
                                                    "Lead platoons have seized the Wireless Ridge crest; Argentine defenders are retreating down the eastern slope toward Stanley.",
                                                    "Night-vision assault surprised forward bunkers—enemy line breaking."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ground_defeat",
                                        "delayMs": 80000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Night Assault Pinned by Crossfire",
                                                "messages": [
                                                    "Exhausted UK companies ran into interlocking machine-gun belts in sleet; enemy counter-attacks are advancing toward Stanley.",
                                                    "Communications with the lead assault platoon have broken down under heavy defensive mortar fire."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Night Infantry Assault Underway",
                                        "messages": [
                                            "Equipped with night-vision optics, UK rifle companies are advancing up Mount Tumbledown and Wireless Ridge under winter squalls.",
                                            "Coordinated night assault has engaged enemy ridge bunkers despite freezing winds and high readiness strain."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Enemy Probing Weakened Perimeter",
                                                "messages": [
                                                    "Argentine assault teams reinforced during the pause are pressing hard against the western Stanley defences.",
                                                    "Forward observation posts report UK outer trenches pulling back under artillery pressure."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_ground_victory",
                                        "delayMs": 85000,
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "Enemy Ridge Garrisons Freezing & Running Low",
                                                "messages": [
                                                    "Exposed Argentine positions on Tumbledown are suffering cold-weather attrition and supply exhaustion; patrols report withdrawals.",
                                                    "SIGINT indicates Argentine ridge commanders requesting permission to pull back into Stanley."
                                                ],
                                                "severity": "info",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "Perimeter Held Pending Reinforcements",
                                        "message": "Forces dig in along the freezing Stanley approaches awaiting relief; prolonged deadlock erodes domestic confidence.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Port Stanley Secured — Wave 3 Transition",
                                        "message": "Port Stanley is back under British control and civilians are safe. Attention now shifts to logistics sustainability and Whitehall/UN endgame diplomacy.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "PORT STANLEY SECURED — WAVE 3 LOGISTICS & DIPLOMACY",
                                        "message": "UK ground forces clear capital; transition to final diplomatic phase.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Port Stanley Occupied",
                        "message": "Argentine forces have overrun Port Stanley defences and hoisted their flag over Government House; remaining UK units are falling back toward Mount Pleasant.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "PORT STANLEY OCCUPIED — GARRISON FALLING BACK TO MPA",
                        "message": "Government House lost; UK perimeter contracting around RAF Mount Pleasant.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "MPA Defensive Perimeter Consolidated",
                                        "message": "Surviving units are regrouping around RAF Mount Pleasant while London faces severe public shock and rising UN intervention calls.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "65-Knot Antarctic Gale Grounds 1564 Flight",
                        "message": "Zero-visibility blizzard conditions at RAF Mount Pleasant have forced immediate grounding of all Chinook and Puma rotary sorties.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SEVERE SOUTHERN OCEAN GALE — ROTARY OPS GROUNDED",
                        "message": "65-knot storm front over East Falkland suspends helicopter lift.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Rotary Airframes Preserved Through Squall",
                                        "messages": [
                                            "Holding 1564 Flight until squall passage prevented weather losses; helicopters are back operational though forward supply stockpiles dipped.",
                                            "Storm front cleared without airframe damage; forward resupply backlog now requires catch-up sorties."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "IFR Storm Resupply Delivered Under Extreme Risk",
                                        "messages": [
                                            "1564 Flight crews forced emergency instrument flights through severe icing, keeping forward supply lines open while sustaining heavy maintenance wear.",
                                            "Storm resupply succeeded, though airframe stress and minor runway incidents degraded task force readiness."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "uk_commander",
                            "air_maritime"
                        ],
                        "title": "Saboteurs Detected on MPA Perimeter",
                        "messages": [
                            "Thermal cameras along RAF Mount Pleasant's southern wire detected Buzos Tácticos operators probing toward the Avtur fuel farm.",
                            "Perimeter intrusion alarm triggered near MPA aviation fuel bladders; hostile spec-ops cell plotted on map."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "MPA PERIMETER ALERT — SABOTAGE CELL DETECTED",
                        "message": "Argentine naval commandos spotted approaching Mount Pleasant fuel farm.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Buzos Tácticos Cell Neutralised",
                                        "messages": [
                                            "RAF Regiment and FIDF trackers intercepted and captured the Argentine sabotage team intact before explosives could be armed.",
                                            "MPA fuel farm secured; elimination of the Buzos Tácticos cell boosts readiness and domestic morale."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Fuel Farm Bunkered — Saboteurs Slip Away",
                                        "messages": [
                                            "Mortar illumination drove the raiders back into the dark peat hills; the fuel farm held, though lockdown slowed sortie turnaround.",
                                            "Sabotage cell evaded capture and remains unaccounted for in West Falkland."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "A400M Deterrence Overflight Reaches King Edward Point",
                                        "messages": [
                                            "A400M Atlas dropped emergency rations and flared over Cumberland Bay, forcing the Argentine launch seaward at high fuel burn.",
                                            "Long-range A400M overflight reassured British scientists at South Georgia while stretching Falklands airlift reserves."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "South Georgia Presence Upheld",
                                        "message": "Prompt British relief over South Georgia draws strong domestic support across Westminster and the press.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_sg_evade",
                            "text": "Order the detachment to evacuate to the hills and focus 100% on the Falklands.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Economy of Force Prioritised for East Falkland",
                                        "message": "Royal Marine detachment and BAS personnel dispersed into South Georgia's interior, keeping every airframe concentrated on the Falklands.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Media Backlash Over South Georgia Withdrawal",
                                        "message": "News of King Edward Point being abandoned to an Argentine icebreaker draws sharp criticism from London commentators.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "downing_street",
                                                    "uk_commander"
                                                ],
                                                "title": "Fleet Street Media Rumours Circulating",
                                                "messages": [
                                                    "Cabinet Office press desk flags unverified Whitehall leaks regarding early South Atlantic casualty figures reaching Sunday editors.",
                                                    "MOD press office warns of an impending tabloid story citing leaked situation reports."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_regional_airspace_ban",
                                        "delayMs": 55000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "downing_street"
                                                ],
                                                "title": "Foreign Office Notes South American Demarches",
                                                "messages": [
                                                    "British embassies in South America report rising diplomatic pressure from Buenos Aires to restrict UK diversion airfields.",
                                                    "FCO cables warn neighbouring aviation ministries are reviewing overflight clearances for UK charters."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "COBRA Assured of TEZ Containment",
                                        "message": "Cabinet accepted continued Exclusion Zone containment for now, though opposition MPs press for faster decisive results.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Whitehall Retains Current ROE",
                                        "message": "Downing Street held off mainland escalation, keeping focus inside the TEZ ahead of UNSC debate.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "downing_street"
                                                ],
                                                "title": "Regional Capitals Alarmed by Escalation Signals",
                                                "messages": [
                                                    "Word of mainland strike planning has prompted South American aviation authorities to convene emergency overflight reviews.",
                                                    "Regional diplomats warn diversion airfield access for Ascension flights is under immediate threat."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_casualty_leak",
                                        "delayMs": 55000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "downing_street",
                                                    "uk_commander"
                                                ],
                                                "title": "Parliamentary Leak Alert",
                                                "messages": [
                                                    "Heated Commons exchanges have coincided with a suspected leak of MOD casualty figures to London newspapers.",
                                                    "Whitehall whips report sensitive South Atlantic casualty numbers circulating among lobby correspondents."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Mainland Strike Contingency Tabled at COBRA",
                                        "message": "Recommending direct strikes on Patagonian airbases triggers urgent calls from Washington and European capitals.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Mainland Strike Planning Initiated",
                                        "message": "PJHQ instructed to prepare Storm Shadow target folders for Río Gallegos pending final Cabinet sign-off.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "PM Delivers Candid National Statement",
                                        "message": "Addressing the nation openly steadies public opinion and honours deployed personnel without eroding parliamentary trust.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Whitehall Confirms Operational Losses Publicly",
                                        "message": "Downing Street issued a transparent briefing affirming full government backing for British Forces South Atlantic Islands.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "PM ADDRESS — PUBLIC SUPPORT STEADIED",
                                        "message": "Candid Whitehall briefing rallies domestic backing for task force.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_leak_dnotice",
                            "text": "Issue an immediate DSMA-Notice to restrict operational reporting.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": -1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street",
                                            "uk_commander"
                                        ],
                                        "title": "EYES ONLY: DSMA-Notice Media Clampdown Enforced",
                                        "message": "DSMA-Notice suppressed publication of operational vulnerabilities and safeguarded readiness, though opposition press accuses Whitehall of censorship.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Quiet Diplomatic Guarantees Reopen Diversions",
                                        "message": "FCO trade and humanitarian corridor assurances persuaded regional capitals to maintain emergency diversion access.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "South Atlantic Diversion Fields Cleared",
                                        "message": "Ascension-to-Falklands logistics flights retain coastal diversion options, preserving fuel reserves.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_airspace_oceanic",
                            "text": "Accept the ban and route all flights exclusively over international Atlantic waters.",
                            "effects": {
                                "scores": {
                                    "supply_lines": -1,
                                    "uk_public_support": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Pure Oceanic Airbridge Routing Ordered",
                                        "message": "All A400M and Voyager flights now route strictly over international Atlantic waters, adding heavy fuel burn per sortie.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Sovereign Resolve Welcomed Domestically",
                                        "message": "Refusal to bow to diplomatic coercion plays well with UK domestic audiences despite logistics strain.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "UK Threatens Security Council Veto",
                                        "message": "British Ambassador stalled the ceasefire draft pending Argentine withdrawal, drawing sharp diplomatic friction across the UNSC.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Operational Freedom Preserved at UN",
                                        "message": "Diplomatic stall buys BFSAI time to complete island clearance without an imposed ceasefire freeze.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Conditional Ceasefire Framework Endorsed",
                                        "message": "Signalling openness to monitored ceasefire terms eases international pressure but provokes domestic protests over concessions.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UNSC CEASEFIRE FRAMEWORK SIGNALLED",
                                        "message": "HMG signals conditional truce; final strategic assessment approaching.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Mainland Strikes Ruled Out",
                                        "message": "Restricting combat to the TEZ reassures Washington and Brussels, easing international diplomatic pressure.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Patagonian Airbases Remain Sanctuary",
                                        "message": "With mainland strikes stood down, FAA squadrons at Río Gallegos continue operating unmolested; task force readiness dips.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                    "international_pressure": 1,
                                    "argentina_aggression": -2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_endgame_trigger",
                                        "delayMs": 85000,
                                        "probability": 1
                                    }
                                ],
                                "conditionalEffects": [
                                    {
                                        "conditions": {
                                            "not": {
                                                "any": [
                                                    {
                                                        "minScores": {
                                                            "argentina_aggression": 4
                                                        }
                                                    },
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
                                                            "ev_ground_incursion"
                                                        ]
                                                    },
                                                    {
                                                        "triggeredEvents": [
                                                            "ev_sub_detected"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "effects": {
                                            "scores": {
                                                "international_pressure": 1
                                            },
                                            "outcomeMessages": [
                                                {
                                                    "roles": [
                                                        "downing_street",
                                                        "uk_commander"
                                                    ],
                                                    "title": "Allies Condemn Unprovoked Mainland Strike",
                                                    "message": "Lacking documented major TEZ engagements to justify mainland retaliation, allies imposed an extra diplomatic penalty (+1 International Pressure).",
                                                    "severity": "danger",
                                                    "aiRandomize": false
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Storm Shadow Strikes Hit Río Gallegos",
                                        "messages": [
                                            "RAF Typhoons released Storm Shadow cruise missiles onto Río Gallegos Air Base, cratering runways and degrading FAA strike capacity.",
                                            "Long-range precision strike damaged Río Gallegos infrastructure, sharply blunting Argentine air offensive potential."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Mainland Red Line Crossed",
                                        "message": "Striking mainland Patagonia triggers intense condemnation in Washington, Brussels, and the UN.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "STRIKE ON RÍO GALLEGOS AIR BASE CONFIRMED",
                                        "message": "Storm Shadow hits mainland base; international diplomatic fallout escalating.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander"
                                                ],
                                                "title": "FIDF Cell Moving Into Ambush Position",
                                                "messages": [
                                                    "Encrypted burst transmission confirms FIDF fighters tracking an unescorted Argentine munitions convoy east of Darwin.",
                                                    "Local scouts report enemy fuel bowsers moving along an isolated Camp track without infantry cover."
                                                ],
                                                "severity": "info",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_resistance_reprisal",
                                        "delayMs": 85000,
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander",
                                                    "downing_street"
                                                ],
                                                "title": "Enemy Counter-Insurgency Sweeps Reported",
                                                "messages": [
                                                    "Radio intercepts indicate Argentine occupation patrols reacting aggressively to partisan sightings near Stanley settlements.",
                                                    "Civilians report armoured patrols cordoning farms following early resistance skirmishes."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "FIDF Resistance Armed for Direct Action",
                                        "messages": [
                                            "Night parachute drop delivered anti-armour weapons and encrypted radios to FIDF cells across the Camp.",
                                            "FIDF resistance teams are cleared for ambush operations against Argentine forward logistics."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "FIDF Tasked as Covert ISR Scouts",
                                        "message": "Keeping FIDF personnel in concealed observation roles protects civilians and prepares high-grade targeting intelligence.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "uk_commander"
                        ],
                        "title": "FIDF Ambush Destroys Enemy Munitions Convoy",
                        "messages": [
                            "FIDF resistance fighters knocked out Argentine fuel and mortar trucks in the Camp, severely disrupting enemy ground tempo.",
                            "Sabotage strike burned forward Argentine ammunition reserves without friendly losses."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "FIDF SABOTAGE DESTROYS HOSTILE MUNITIONS CONVOY",
                        "message": "Resistance ambush disrupts Argentine forward ground logistics.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "downing_street",
                            "uk_commander"
                        ],
                        "title": "Civilian Curfews & Detentions in Stanley",
                        "message": "Argentine forces imposed harsh curfews and detained Falkland Islanders in reprisal for partisan ambushes; domestic and UN criticism mounts.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "CIVILIAN REPRISALS REPORTED IN STANLEY",
                        "message": "Occupation patrols impose curfews and detentions after partisan ambush.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "uk_commander",
                            "air_maritime"
                        ],
                        "title": "FIDF Scouts Pinpoint Exocet & Sabotage Targets",
                        "messages": [
                            "Covert FIDF observers transmitted exact GPS coordinates for both the West Falkland coastal Exocet battery and the Buzos Tácticos cell.",
                            "High-value FIDF reconnaissance updated the tactical map with exact locations of hidden Argentine coastal missile and spec-ops units."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "FIDF RECON REVEALS HIDDEN HOSTILE ASSETS",
                        "message": "Coastal Exocet battery and spec-ops sabotage cell plotted on map.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "Skynet C2 Links Isolated & Hardened",
                                        "messages": [
                                            "GCHQ and Royal Signals purged malicious traffic and restored secure PJHQ Northwood C2; isolating logistics servers temporarily delayed manifest routing.",
                                            "Skynet satellite links hardened against intrusion; air-defence C2 remains intact despite brief logistics friction."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_cyber_counter",
                            "text": "Launch an offensive counter-hack against Argentine mainland air-traffic and radar nodes.",
                            "effects": {
                                "scores": {
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_cyber_blowback",
                                        "delayMs": 70000,
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "downing_street",
                                                    "uk_commander"
                                                ],
                                                "title": "Anomalous Telecom Spillover Detected in Patagonia",
                                                "messages": [
                                                    "GCHQ telemetry warns the counter-cyber payload is propagating beyond military routers into Patagonian civilian telecom switches.",
                                                    "Signal monitors flag unintended collateral disruption across southern Argentine civil infrastructure."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_cyber_disrupt_arg",
                                        "delayMs": 70000,
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander",
                                                    "air_maritime"
                                                ],
                                                "title": "Argentine Radar Telemetry Degrading",
                                                "messages": [
                                                    "SIGINT confirms packet loss and erratic radar sweeps across Río Grande air-control frequencies.",
                                                    "GCHQ sensors observe Patagonian air-defence datalink dropouts as payload activates."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "conditionalEffects": [
                                    {
                                        "conditions": {
                                            "not": {
                                                "any": [
                                                    {
                                                        "minScores": {
                                                            "argentina_aggression": 4
                                                        }
                                                    },
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
                                                            "ev_ground_incursion"
                                                        ]
                                                    },
                                                    {
                                                        "triggeredEvents": [
                                                            "ev_sub_detected"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "effects": {
                                            "scores": {
                                                "international_pressure": 1
                                            },
                                            "outcomeMessages": [
                                                {
                                                    "roles": [
                                                        "downing_street",
                                                        "uk_commander"
                                                    ],
                                                    "title": "International Alarm Over Early UK Cyber Strike",
                                                    "message": "Offensive cyber operations launched prior to corroborated kinetic clashes drew swift diplomatic concern (+1 International Pressure).",
                                                    "severity": "warning",
                                                    "aiRandomize": false
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Offensive Cyber Retaliation Launched",
                                        "messages": [
                                            "UK cyber teams injected disruption payloads toward Patagonian military radar and air-traffic nodes, degrading Argentine sortie coordination.",
                                            "Offensive counter-hack targeting Río Grande radar networks underway; diplomatic attribution risk remains."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "downing_street",
                            "uk_commander"
                        ],
                        "title": "Civilian Telecom Spillover Traced to UK",
                        "message": "Forensic attribution linked Patagonian telecom outages to British cyber assets, triggering sharp international censure and domestic unease.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "CYBER BLOWBACK — CIVILIAN TELECOM OUTAGES TRACED",
                        "message": "Collateral spillover in Patagonia triggers international condemnation.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "Río Grande Radar Feeds Scrambled",
                        "messages": [
                            "GCHQ intrusion blinded Argentine coastal radar coordination at Río Grande for six hours, blunting FAA strike tempo.",
                            "Argentine air-control network disrupted; enemy strike sorties face severe command degradation."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "ARGENTINE AIR-CONTROL NETWORK DISRUPTED",
                        "message": "Río Grande radar feeds scrambled for 6 hours; FAA strike tempo degraded.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "ARA Salta Plotted Inside TEZ",
                        "messages": [
                            "HMS Defender sonar classified a Type 209 diesel-electric signature inside the TEZ; ARA Salta is now plotted on the tactical display.",
                            "Hostile submarine ARA Salta detected on acoustic array; immediate prosecution decision required before she slips thermal layers."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SUBMARINE CONTACT — ARA SALTA PLOTTED",
                        "message": "Argentine Type 209 submarine detected inside Total Exclusion Zone.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
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
                                    "argentina_aggression": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_sub_sunk",
                                        "delayMs": 75000,
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Sting Ray Homing Transient Confirmed",
                                                "messages": [
                                                    "Wildcat sonobuoys register active Sting Ray seeker lock followed by underwater acoustic detonation signatures.",
                                                    "ASW aircrew report active torpedo run closing on ARA Salta's last bearing."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_sub_evades",
                                        "delayMs": 75000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Submarine Diving Toward Thermal Layer",
                                                "messages": [
                                                    "ARA Salta deployed acoustic countermeasures and is diving steeply into a cold-water thermocline.",
                                                    "Wildcat dipping sonar reports fading contact strength as the submarine exploits shallow seabed clutter."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "conditionalEffects": [
                                    {
                                        "conditions": {
                                            "not": {
                                                "any": [
                                                    {
                                                        "minScores": {
                                                            "argentina_aggression": 4
                                                        }
                                                    },
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
                                                            "ev_ground_incursion"
                                                        ]
                                                    },
                                                    {
                                                        "triggeredEvents": [
                                                            "ev_sub_detected"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "effects": {
                                            "scores": {
                                                "international_pressure": 1
                                            },
                                            "outcomeMessages": [
                                                {
                                                    "roles": [
                                                        "downing_street",
                                                        "uk_commander"
                                                    ],
                                                    "title": "Diplomatic Protest Over Subsurface ROE",
                                                    "message": "Regional observers questioned lethal ASW engagement before overt surface clashes were recorded (+1 International Pressure).",
                                                    "severity": "warning",
                                                    "aiRandomize": false
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "deployAssets": {
                                    "hms_defender": 120000
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime"
                                        ],
                                        "title": "ASW Wildcat Prosecuting ARA Salta",
                                        "messages": [
                                            "HMS Defender cleared Wildcat ASW launch with Sting Ray torpedoes to prosecute the submerged contact inside the TEZ.",
                                            "Weapons-free ASW prosecution underway; dipping sonar buoys dropped across the submarine's escape bearing."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            },
                            "conditions": {
                                "assets": {
                                    "hms_defender": "operational"
                                }
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
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime",
                                                    "uk_commander"
                                                ],
                                                "title": "Torpedo Tube Flood & Launch Transients!",
                                                "messages": [
                                                    "Sonar watch calls emergency torpedo-in-the-water alert—high-speed screws bearing directly on HMS Defender!",
                                                    "Shadowed submarine opened outer doors and fired wire-guided torpedoes at close range!"
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_sub_evades",
                                        "delayMs": 80000,
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "air_maritime"
                                                ],
                                                "title": "Acoustic Track Degrading Under Thermocline",
                                                "messages": [
                                                    "Passive track on ARA Salta is breaking up beneath a strong salinity layer; risk of losing contact entirely.",
                                                    "Submarine has cut snort speed and is slipping quietly out of Defender's passive sonar cone."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Passive Shadowing ROE Ordered",
                                        "message": "HMS Defender holds fire to avoid escalation, trailing ARA Salta passively in challenging shallow-water acoustics.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "ARA Salta Neutralised",
                        "message": "HMS Defender's Wildcat scored a Sting Ray torpedo hit, forcing ARA Salta to surface and eliminating the subsurface threat.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "HOSTILE SUBMARINE ARA SALTA NEUTRALISED",
                        "message": "Sting Ray hit forces surface abandonment; sea lanes secured.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "ARA Salta Escapes Sonar Net",
                        "messages": [
                            "ARA Salta slipped beneath the thermocline and vanished from tracking; she remains operational and threatens eastern supply lanes.",
                            "Contact lost on ARA Salta; submarine remains un-neutralised inside South Atlantic waters."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "HMS Defender Struck by Submarine Torpedo",
                        "message": "ARA Salta struck HMS Defender with wire-guided torpedoes before diving clear, degrading task force readiness and UK public morale.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "HMS DEFENDER DAMAGED BY SUBMARINE TORPEDO",
                        "message": "ARA Salta escapes after ambush; destroyer readiness degraded.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "ARA Salta Resurfaces on Eastern Supply Lane",
                        "messages": [
                            "The escaped Argentine submarine re-emerged east of Stanley and fired on an inbound RFA resupply vessel; firing window is brief.",
                            "Logistics lane ambush: ARA Salta spotted on surface radar attacking RFA shipping before diving."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "ARA SALTA RE-EMERGES — RFA SUPPLY LANE UNDER ATTACK",
                        "message": "Escaped submarine firing on inbound logistics ship.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "ARA Salta Destroyed by ASW Counter-Attack",
                                        "messages": [
                                            "ASW helicopters prosecuted the resurfaced submarine immediately, sinking ARA Salta and reopening the eastern RFA convoy lane.",
                                            "Rapid Sting Ray strike eliminated ARA Salta before she could dive clear."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "RFA Convoy Scattered East — Sub Escapes Again",
                                        "message": "Emergency evasive scatter saved the supply ship from a second torpedo salvo, but ARA Salta slipped away again and logistics flow stalled.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "Coastal Exocet Launch Detected on West Falkland",
                        "messages": [
                            "Infrared plume telemetry exposed the concealed coastal Exocet launcher on West Falkland after firing across Falkland Sound.",
                            "Mobile Exocet battery revealed by launch signature; immediate Typhoon scramble needed before shoot-and-scoot relocation."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "COASTAL EXOCET AMBUSH — WEST FALKLAND LAUNCH",
                        "message": "Unprosecuted missile battery fires across Falkland Sound.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Coastal Exocet Battery Destroyed",
                                        "messages": [
                                            "1435 Flight Typhoons struck the firing point before the launcher vehicle could displace, destroying the West Falkland Exocet battery.",
                                            "Counter-battery Typhoon strike obliterated the mobile coastal launcher, restoring maritime safety in Falkland Sound."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Ships Pull Out of Coastal Missile Arc",
                                        "message": "UK vessels deployed chaff and withdrew out of coastal Exocet range; the launcher displaced under cover and logistics tempo slipped.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander",
                                                    "air_maritime"
                                                ],
                                                "title": "Convoy Radar Warning — Inbound Missile Tracks",
                                                "messages": [
                                                    "Escort ESM detects hostile fire-control radar painting the inbound RFA merchant hull 30 miles east of Stanley.",
                                                    "Flash warning from the RFA convoy: sea-skimming radar contacts detected closing the port quarter."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_convoy_safe",
                                        "delayMs": 75000,
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "uk_commander",
                                                    "air_maritime"
                                                ],
                                                "title": "RFA Convoy Entering Port Stanley Channel",
                                                "messages": [
                                                    "Using low-cloud squall cover and tight escort screening, the RFA logistics vessel has cleared outer approaches unmolested.",
                                                    "Port Stanley harbour pilot reports the RFA supply ship crossing the Narrows intact."
                                                ],
                                                "severity": "success",
                                                "aiRandomize": true
                                            }
                                        ]
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "RFA Surface Convoy Dispatched to Stanley",
                                        "messages": [
                                            "An escorted RFA supply ship is steaming into Stanley harbour carrying Sea Viper reloads, ammunition, and medical kit.",
                                            "Sea resupply convoy has entered the eastern TEZ approach under naval escort."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_supply_air",
                            "text": "Execute a heavy A400M Atlas airbridge surge from RAF Ascension Island.",
                            "conditions": {
                                "assets": {
                                    "ascension_island": "operational",
                                    "falklands_a400m": "operational"
                                }
                            },
                            "effects": {
                                "scores": {
                                    "supply_lines": 1,
                                    "military_readiness": 1
                                },
                                "deployAssets": {
                                    "falklands_a400m": 120000
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "A400M Atlas Airbridge Surge Underway",
                                        "messages": [
                                            "A400M Atlas is flying continuous high-priority shuttles from RAF Ascension Island, restoring MPA munition and medical stockpiles.",
                                            "Ascension airbridge surge delivered critical Sea Viper reloads and infantry ammunition directly to Mount Pleasant."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "RFA Supply Convoy Struck East of Stanley",
                        "message": "Anti-ship missiles hit the surface convoy 30 miles east of Stanley, inflicting severe materiel losses and eroding public support.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "RFA SUPPLY CONVOY AMBUSHED — HEAVY MATERIEL LOSS",
                        "message": "Missile strike hits logistics ship east of Port Stanley.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "RFA Convoy Unloads Safely at Stanley",
                        "message": "Escorted RFA vessel reached Port Stanley intact, replenishing ammunition, fuel, and medical stocks for the garrison.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "RFA CONVOY DOCKS INTACT — STOCKS REPLENISHED",
                        "message": "Munitions and fuel safely landed at Port Stanley.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Wideawake Fuel Crisis — Voyager KC2 Grounded",
                        "message": "Harassment of chartered tankers and Atlantic storms have exhausted Ascension Avtur reserves, grounding Voyager KC2 AAR tankers.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "ASCENSION FUEL CRISIS — VOYAGER KC2 GROUNDED",
                        "message": "Wideawake Avtur depleted; long-range AAR sorties suspended.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "air_maritime"
                                        ],
                                        "title": "MPA Sorties Restricted to Defensive QRA",
                                        "message": "Strict fuel rationing stabilises remaining reserves while awaiting sealift replenishment, curtailing offensive air patrols.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "US Wideawake Fuel Drawdown Restores Voyager KC2",
                                        "message": "Emergency USAF aviation fuel transfer at Ascension Island returns Voyager KC2 tankers to operational status immediately.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Diplomatic Cost of US Ascension Drawdown",
                                        "message": "Visible reliance on US Wideawake reserves draws regional diplomatic scrutiny over Washington's logistical role.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "All-Out Typhoon & Sky Sabre Defence Repels Raid",
                                        "messages": [
                                            "Every serviceable 1435 Flight Typhoon scrambled alongside Sky Sabre batteries, breaking up the Super Étendard saturation raid at heavy missile and fuel cost.",
                                            "Full-scale air defence blunted Argentine strike aggression and preserved Mount Pleasant's runway intact."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "SATURATION RAID REPULSED — MPA RUNWAY INTACT",
                                        "message": "1435 Flight and Sky Sabre defeat massed Super Étendard attack.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "air_maritime",
                                            "uk_commander"
                                        ],
                                        "title": "Mount Pleasant Struck While Jets Sheltered",
                                        "message": "Aircraft survived inside hardened shelters, but Argentine ordnance cratered Mount Pleasant facilities and degraded task force readiness.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "RAF MOUNT PLEASANT DAMAGED IN SATURATION RAID",
                                        "message": "Runway and base infrastructure hit; jets preserved in shelters.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "24-Hour Operational Pause Agreed at UN",
                                        "message": "Accepting the Security Council pause relieves intense allied pressure and moves the crisis straight into final strategic assessment.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Offensive Operations Frozen",
                                        "message": "All BFSAI offensive manoeuvres halted for mediated withdrawal talks; readiness dips under static freeze.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UN CEASEFIRE PAUSE ACCEPTED — ENDGAME INITIATED",
                                        "message": "24-hour operational halt ordered; strategic assessment pending.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "UK Rejects UN Ceasefire Ultimatum",
                                        "message": "HMG refused any operational pause while Argentine forces threaten British sovereign territory, rallying domestic support amid diplomatic isolation.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "uk_commander"
                                        ],
                                        "title": "Full Operational Authority Retained",
                                        "message": "Theatre forces remain cleared to press military operations without a ceasefire freeze.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Task Force Commander Resigns Command",
                                        "message": "Following sustained setbacks and collapse of domestic confidence, the Task Force Commander has tendered resignation; London is moving to terminate hostilities.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "COMMAND RESIGNATION — CAMPAIGN TERMINATING",
                                        "message": "Task Force Commander steps down; HMG suing for peace.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "uk_commander",
                                            "downing_street"
                                        ],
                                        "title": "24-Hour All-Out Push Authorised",
                                        "message": "Task force committed all reserves to a decisive 24-hour offensive, rallying domestic opinion and combat readiness while accepting higher diplomatic pressure.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street",
                                            "uk_commander"
                                        ],
                                        "title": "US Satellite ISR & Fuel Package Integrated",
                                        "message": "Discreet Washington intelligence feeds revealed the covert Argentine fleet oiler and boosted Wideawake fuel stocks and ASRAAM/readiness.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "US MATERIAL SUPPORT INTEGRATED — OILER REVEALED",
                                        "message": "Allied satellite ISR plots covert fleet oiler; readiness boosted.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_decline_us",
                            "text": "Decline politely to avoid complicating regional diplomacy.",
                            "effects": {
                                "scores": {
                                    "uk_public_support": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "US Package Politely Declined",
                                        "message": "Maintaining strict national self-reliance avoids regional diplomatic complications and wins approval at home.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street",
                                            "uk_commander"
                                        ],
                                        "title": "Strict Defensive ROE Announced",
                                        "message": "Limiting forces to defensive TEZ posture defuses looming economic sanctions at the UN while constraining offensive readiness.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_ignore_un",
                            "text": "Reject the resolution and press the military advantage.",
                            "effects": {
                                "scores": {
                                    "international_pressure": 1,
                                    "uk_public_support": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "downing_street"
                                        ],
                                        "title": "Sanctions Draft Ignored — Treasury Warns of Fallout",
                                        "message": "Pressing military operations despite UN sanctions threats deepens international isolation and alarms domestic markets.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "SAS Raid Damages Río Grande Air Base",
                        "message": "SAS operators destroyed Super Étendard strike jets and aviation fuel dumps at Río Grande before extracting cleanly.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SAS RAID SUCCESSFUL — RÍO GRANDE DAMAGED",
                        "message": "Super Étendard strike capacity degraded on the mainland.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "downing_street",
                            "uk_commander"
                        ],
                        "title": "SAS Team Compromised Near Río Grande",
                        "message": "Argentine television broadcast captured British special forces kit after a mainland firefight, provoking severe UN backlash and public shock.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SAS RAID COMPROMISED — DIPLOMATIC CRISIS",
                        "message": "Mainland special forces mission exposed; international backlash.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "UK Task Group Reinforcements Arrive",
                        "message": "Fresh Royal Navy escorts, Typhoon airframes, and Royal Marine commandos have arrived via Ascension, restoring HMS Defender and Mount Pleasant to operational status.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "REINFORCEMENTS ARRIVE — DEFENDER & MPA RESTORED",
                        "message": "Fresh escorts, Typhoons, and commandos operational in theatre.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "FIDF & A400M Sweep Reveals Hidden Threats",
                        "messages": [
                            "Combined A400M maritime radar and FIDF patrols pinpointed both the coastal Exocet battery and the Buzos Tácticos sabotage cell.",
                            "Joint reconnaissance sweep plotted the concealed West Falkland Exocet launcher and special forces team on the tactical map."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "RECON SWEEP SUCCESS — EXOCET & SPEC-OPS PLOTTED",
                        "message": "FIDF and A400M locate concealed threats on West Falkland.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "A400M Recon Forced Off — Partial Imagery Recovered",
                        "messages": [
                            "Hostile CAP chased the A400M Atlas off station early, though synthetic aperture radar still fixed the coastal Exocet battery.",
                            "Recon sweep broke off under enemy fighter pressure; coastal Exocet launcher revealed while fuel burn strained supply lines."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Black Buck II Hits Río Gallegos Air Base",
                        "message": "Voyager-refuelled RAF Typhoons struck Río Gallegos hardened shelters and runway with Storm Shadow missiles, slashing Argentine air aggression.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "BLACK BUCK II SUCCESS — RÍO GALLEGOS DAMAGED",
                        "message": "Long-range AAR Storm Shadow strike craters mainland airbase.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "Black Buck II Aborted Over Mid-Atlantic",
                        "message": "Severe turbulence damaged a Voyager refuelling drogue, forcing the strike flight to divert back to MPA with wasted fuel and diplomatic scrutiny.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "HMS Astute Sinks ARA Salta & Drives Off Oiler",
                        "message": "Royal Navy Astute-class SSN neutralised ARA Salta in the northern approaches and forced the covert Argentine fleet oiler out of the TEZ.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "HMS ASTUTE NEUTRALISES ARA SALTA",
                        "message": "Subsurface threat eliminated; covert fleet oiler withdrawing.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "HMS Astute Patrol Clears Northern Approaches",
                        "messages": [
                            "HMS Astute found no sonar contact on ARA Salta in the northern sector, though SSN deterrence forced Argentine surface raiders back.",
                            "Northern barrier sweep recorded an empty acoustic sector while pushing hostile naval patrols westward."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Ascension Fuel Sealift Restores Airbridge",
                        "message": "Escorted RFA tanker refilled RAF Ascension Island Avtur tanks, returning Wideawake Airfield and Voyager KC2 tankers to full operational status.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "ASCENSION AIRBRIDGE RESTORED — SEALIFT COMPLETE",
                        "message": "Wideawake fuel reserves replenished; Voyager KC2 operational.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Strategic Assessment Submitted: Victory",
                                        "message": "PJHQ assesses that UK forces have secured the Falkland Islands with sea control, air superiority, and logistics intact.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Strategic Assessment Submitted: Defeat",
                                        "message": "PJHQ assesses that depleted combat readiness prevents holding the islands; withdrawal directives are being issued.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Strategic Assessment Submitted: Stalemate",
                                        "message": "PJHQ assesses neither side can achieve a decisive breakthrough; forces are consolidating along frozen ceasefire lines.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
            "decisions": [],
            "autoEffects": {
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Campaign Concluded: UK Victory",
                        "message": "British Forces South Atlantic Islands have defeated Argentine aggression and secured Port Stanley, RAF Mount Pleasant, and the Ascension airbridge.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SCENARIO CONCLUDED — BRITISH VICTORY",
                        "message": "Falkland Islands secured; sea control and air superiority upheld.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
            }
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
            "decisions": [],
            "autoEffects": {
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Campaign Concluded: Strategic Defeat",
                        "message": "UK forces have been overwhelmed or compelled to withdraw from the Falkland Islands; Whitehall faces a full parliamentary inquiry.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SCENARIO CONCLUDED — STRATEGIC DEFEAT",
                        "message": "UK garrison unable to hold islands; withdrawal ordered.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
            }
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
            "decisions": [],
            "autoEffects": {
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Campaign Concluded: Negotiated Stalemate",
                        "message": "A bitter winter ceasefire has frozen positions across the South Atlantic, leaving sovereignty disputed and forces facing a prolonged garrison.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SCENARIO CONCLUDED — NEGOTIATED STALEMATE",
                        "message": "Ceasefire freezes theatre lines for the southern winter.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
            }
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
                "scores": {},
                "randomEvents": [
                    {
                        "id": "ev_sf_success",
                        "delayMs": 35000,
                        "probability": 0.6,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "uk_commander"
                                ],
                                "title": "SAS Insertion Unobserved — Approaching Perimeter",
                                "messages": [
                                    "Brief encrypted burst confirms the SAS patrol inserted cleanly outside Río Grande and is moving into observation positions.",
                                    "Special forces team reports minimal Patagonian perimeter patrols along the Super Étendard dispersal apron."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_sf_failure",
                        "delayMs": 35000,
                        "probability": 0.4,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "uk_commander",
                                    "downing_street"
                                ],
                                "title": "Patagonian Coastal Radar Alert Spike",
                                "messages": [
                                    "GCHQ intercepts emergency Argentine garrison transmissions around Río Grande reporting an armed perimeter breach.",
                                    "Encrypted SAS check-in missed at the rally point as Argentine search flares light up outside Río Grande."
                                ],
                                "severity": "danger",
                                "aiRandomize": true
                            }
                        ]
                    }
                ],
                "conditionalEffects": [
                    {
                        "conditions": {
                            "not": {
                                "any": [
                                    {
                                        "minScores": {
                                            "argentina_aggression": 4
                                        }
                                    },
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
                                            "ev_ground_incursion"
                                        ]
                                    },
                                    {
                                        "triggeredEvents": [
                                            "ev_sub_detected"
                                        ]
                                    }
                                ]
                            }
                        },
                        "effects": {
                            "scores": {
                                "international_pressure": 1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "downing_street",
                                        "uk_commander"
                                    ],
                                    "title": "Diplomatic Backlash Over Unprovoked Mainland Raid",
                                    "message": "With major TEZ combat not yet corroborated globally, intelligence leaks of UK special forces crossing to the mainland incur an added diplomatic penalty (+1 International Pressure).",
                                    "severity": "danger",
                                    "aiRandomize": false
                                }
                            ]
                        }
                    }
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "uk_commander"
                        ],
                        "title": "SAS Mainland Insertion Underway",
                        "messages": [
                            "Cabinet approval granted. Special Forces insertion flight has departed covertly toward Tierra del Fuego targeting Río Grande.",
                            "SAS detachment cleared for mainland insertion; operators are en route to Río Grande Air Base."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "downing_street"
                        ],
                        "title": "Covert Mainland Raid Authorised",
                        "message": "Downing Street signed off on covert SAS deployment against Río Grande; foreign diplomatic risk is now live.",
                        "severity": "warning",
                        "aiRandomize": false
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Emergency Task Group Reinforcements Dispatched",
                        "message": "Downing Street approved emergency dispatch of Royal Navy escorts, Typhoons, and Royal Marines via RAF Ascension Island.",
                        "severity": "info",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "EMERGENCY REINFORCEMENTS EN ROUTE VIA ASCENSION",
                        "message": "UK escorts, Typhoons, and Royal Marines staging south.",
                        "severity": "info",
                        "aiRandomize": false
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
                ],
                "assets": {
                    "falklands_a400m": "operational"
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_recon_sweep_success",
                        "delayMs": 30000,
                        "probability": 0.75,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "air_maritime",
                                    "uk_commander"
                                ],
                                "title": "Strong SAR & Ground Scout Corroboration",
                                "messages": [
                                    "A400M synthetic aperture radar is returning clear vehicular tracks near West Falkland coves; FIDF scouts moving to confirm.",
                                    "Recon flight reports clean radar sweep over West Falkland with no enemy CAP interference."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_recon_sweep_compromised",
                        "delayMs": 30000,
                        "probability": 0.25,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "air_maritime",
                                    "uk_commander"
                                ],
                                "title": "Hostile Interceptors Closing A400M Track",
                                "messages": [
                                    "Long-range radar warns of Argentine interceptors vectoring fast toward the A400M patrol corridor over West Falkland.",
                                    "A400M crew reports airborne fire-control radar lock and is initiating evasive break-off."
                                ],
                                "severity": "warning",
                                "aiRandomize": true
                            }
                        ]
                    }
                ],
                "deployAssets": {
                    "falklands_a400m": 120000
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "FIDF & A400M Covert Recon Sweep Launched",
                        "messages": [
                            "A400M Atlas is airborne from MPA on a maritime radar sweep coordinated with FIDF ground scouts across West Falkland.",
                            "Joint covert reconnaissance tasked to locate concealed coastal Exocet launchers and spec-ops cells."
                        ],
                        "severity": "info",
                        "aiRandomize": true
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
                "scores": {},
                "randomEvents": [
                    {
                        "id": "ev_black_buck_success",
                        "delayMs": 45000,
                        "probability": 0.65,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "air_maritime",
                                    "uk_commander"
                                ],
                                "title": "AAR Bracket Complete — Strikers Ingressing",
                                "messages": [
                                    "Voyager KC2 completed full fuel transfer cleanly; Typhoon package is descending to Storm Shadow release point.",
                                    "Tanker rendezvous succeeded on schedule; strike aircraft are within mainland cruise-missile range."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_black_buck_aborted",
                        "delayMs": 45000,
                        "probability": 0.35,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "air_maritime",
                                    "uk_commander"
                                ],
                                "title": "Severe Turbulence at AAR Rendezvous",
                                "messages": [
                                    "Voyager KC2 crew reports violent mid-Atlantic clear-air turbulence threatening the wing-pod refuelling drogue.",
                                    "AAR receiver hookup failed twice in heavy storm shear; mission commander assessing abort."
                                ],
                                "severity": "warning",
                                "aiRandomize": true
                            }
                        ]
                    }
                ],
                "conditionalEffects": [
                    {
                        "conditions": {
                            "not": {
                                "any": [
                                    {
                                        "minScores": {
                                            "argentina_aggression": 4
                                        }
                                    },
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
                                            "ev_ground_incursion"
                                        ]
                                    },
                                    {
                                        "triggeredEvents": [
                                            "ev_sub_detected"
                                        ]
                                    }
                                ]
                            }
                        },
                        "effects": {
                            "scores": {
                                "international_pressure": 1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "downing_street",
                                        "uk_commander"
                                    ],
                                    "title": "Allied Concern Over Pre-Emptive Black Buck II",
                                    "message": "Launching a mainland airbase strike ahead of internationally verified TEZ battles incurs additional diplomatic pressure (+1 International Pressure).",
                                    "severity": "warning",
                                    "aiRandomize": false
                                }
                            ]
                        }
                    }
                ],
                "deployAssets": {
                    "ascension_voyager": 120000
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "Black Buck II Strike Package Airborne",
                        "messages": [
                            "Cabinet authorisation confirmed. Voyager KC2 has lifted off Ascension to refuel Typhoon Storm Shadow strikers bound for Río Gallegos.",
                            "Black Buck II long-range strike launched; Voyager AAR rendezvous underway over the South Atlantic."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "downing_street"
                        ],
                        "title": "Black Buck II Long-Range Strike Cleared",
                        "message": "Political clearance issued for Voyager-supported Storm Shadow strike on Río Gallegos Air Base.",
                        "severity": "warning",
                        "aiRandomize": false
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
                        "probability": 0.7,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "air_maritime",
                                    "uk_commander"
                                ],
                                "title": "Astute Acoustic Array Acquires High-Priority Contact",
                                "messages": [
                                    "Subsurface flash: HMS Astute passive towed array locked onto a diesel-electric hull and nearby tanker screws.",
                                    "HMS Astute reports positive classification on hostile submarine track; closing to weapons solution."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_astute_dry_hole",
                        "delayMs": 45000,
                        "probability": 0.3,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "air_maritime",
                                    "uk_commander"
                                ],
                                "title": "Heavy Thermal Layer Obscuring Northern Sector",
                                "messages": [
                                    "Initial barrier sweep reports strong ocean-current thermal gradients masking submerged acoustics in the northern box.",
                                    "HMS Astute reports surface raiders scattering westward, with no confirmed subsurface acoustic lock yet."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    }
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "air_maritime",
                            "uk_commander"
                        ],
                        "title": "HMS Astute Vectored to Northern Barrier",
                        "messages": [
                            "VLF tasking transmitted: HMS Astute is sprinting into the northern TEZ approaches to hunt ARA Salta and hostile replenishment tankers.",
                            "Royal Navy Astute-class SSN has entered barrier patrol sector north of East Falkland."
                        ],
                        "severity": "info",
                        "aiRandomize": true
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Emergency Ascension Fuel Sealift Dispatched",
                        "message": "An escorted RFA tanker is steaming into Wideawake anchorage to replenish RAF Ascension Island Avtur reserves; domestic commentators note supply vulnerability.",
                        "severity": "info",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "EMERGENCY ASCENSION FUEL SEALIFT EN ROUTE",
                        "message": "Escorted RFA tanker inbound to restore Wideawake airbridge.",
                        "severity": "info",
                        "aiRandomize": false
                    }
                ]
            }
        }
    ]
};
