module.exports = {
    "id": "uk_crisis",
    "name": "UK Crisis: Russian Tensions",
    "description": "Lead the British government through a dangerous standoff with Russia. Balance public safety, military readiness, and international diplomacy.",
    "guideUrl": "/scenarios/uk_crisis/guide.html",
    "mapConfig": {
        "center": [
            54.5,
            -2.5
        ],
        "zoom": 6
    },
    "roles": [
        "PM",
        "home",
        "defence",
        "foreign",
        "media",
        "cyber",
        "display"
    ],
    "roleNames": {
        "PM": "Prime Minister",
        "home": "Home Secretary",
        "defence": "Defence Secretary",
        "foreign": "Foreign Secretary",
        "media": "Media & Comms Director",
        "cyber": "Cyber Security Lead",
        "display": "Display Screen"
    },
    "minUsers": 2,
    "mandatoryRoles": [
        "PM"
    ],
    "roleFallbacks": {
        "cyber": [
            "home",
            "defence",
            "PM"
        ],
        "media": [
            "foreign",
            "home",
            "PM"
        ],
        "home": [
            "defence",
            "foreign",
            "PM"
        ],
        "defence": [
            "foreign",
            "home",
            "PM"
        ],
        "foreign": [
            "defence",
            "home",
            "PM"
        ]
    },
    "initialScores": {
        "uk_russia": 3,
        "military_escalation": 2,
        "civilian_stability": 3,
        "uk_us": 2,
        "uk_europe": 2,
        "military_readiness": 2
    },
    "briefings": {
        "_general": "It is early 2025. Tensions between NATO and Russia are at a breaking point after Russian troop buildups near the Baltic states. The Prime Minister has called an emergency COBRA meeting to protect Britain and coordinate the response.",
        "home": "As Home Secretary, your main job is keeping the country safe and calm. The public is worried. You must keep order on the streets while protecting people's freedoms.",
        "defence": "As Defence Secretary, you command the British Armed Forces. Our troops, ships, and jets are on high alert, and every move you make could deter the enemy or trigger a war.",
        "foreign": "As Foreign Secretary, you are Britain's lead diplomat. You must keep our NATO allies united and talk to international leaders before tensions spiral out of control.",
        "media": "As Communications Director, you manage the news. Journalists are demanding answers, and social media is flooded with fake news and panic. You must keep the public informed and calm.",
        "cyber": "As Cyber Security Director, you protect the UK from digital attacks. Enemy hackers are targeting power grids, banks, and hospitals. You are Britain's digital shield."
    },
    "aiConfig": {
        "systemPrompt": "You are an automated intelligence reporting system.\nCRITICAL RULES:\n- Describe the objective situation.\n- NEVER refer to the player, \"you\", \"your\", or their role name.\n- Write exactly ONE short paragraph (1-2 sentences). Do NOT output bullet points.\n- Start directly with the operational impact. Do not use greetings.\n- Do not use markdown formatting.\n- Stick to the provided facts.\n- Use clear, simple language suitable for 13-18 year olds while maintaining a professional report style.",
        "scoreLabels": {
            "1": "Critical",
            "2": "Poor",
            "3": "Adequate",
            "4": "Strong",
            "5": "Secure"
        },
        "roleContexts": {
            "home": "Focus area: domestic public order, police readiness, civilian morale, and internal security.",
            "defence": "Focus area: military readiness, troop deployments, and global kinetic threats.",
            "foreign": "Focus area: diplomatic relations, international alliances, and geopolitical maneuvering.",
            "cyber": "Focus area: critical infrastructure defense, cyber threats, and intelligence.",
            "media": "Focus area: public perception, media narrative, and managing civilian panic."
        },
        "scores": {
            "uk_russia": {
                "label": "UK-Russia Relations",
                "subject": "diplomatic relations with Russia",
                "isPlural": true,
                "roles": [
                    "foreign",
                    "defence"
                ]
            },
            "military_escalation": {
                "label": "Military Escalation",
                "subject": "the global military threat level",
                "isPlural": false,
                "roles": [
                    "home",
                    "defence",
                    "cyber"
                ]
            },
            "civilian_stability": {
                "label": "Civilian Stability",
                "subject": "domestic public order and civilian morale",
                "isPlural": false,
                "roles": [
                    "home",
                    "media"
                ]
            },
            "uk_us": {
                "label": "UK-US Alliance",
                "subject": "the strength of the special relationship with the USA",
                "isPlural": false,
                "roles": [
                    "foreign",
                    "cyber"
                ]
            },
            "uk_europe": {
                "label": "European Cohesion",
                "subject": "cohesion with European allies",
                "isPlural": false,
                "roles": [
                    "foreign",
                    "media"
                ]
            },
            "military_readiness": {
                "label": "Mil. Readiness",
                "subject": "the combat capability and deployment status of armed forces",
                "isPlural": false,
                "roles": [
                    "defence"
                ]
            }
        }
    },
    "variantAxes": [
        {
            "id": "pow_location",
            "name": "HMS Prince of Wales Location",
            "options": [
                {
                    "id": "pow_australia",
                    "name": "Deployed to RIMPAC (Australia)",
                    "briefingText": "The QEC Prince of Wales is currently deployed to RIMPAC exercises near Australia, approximately 3 weeks from home waters.",
                    "roleBriefings": {
                        "defence": "The QEC Prince of Wales is currently deployed to RIMPAC in Australia. Your primary carrier group is on the far side of the world. Air cover for the North Atlantic will be severely limited until she returns.",
                        "foreign": "The QEC Prince of Wales is currently deployed to RIMPAC. Australia is expecting the deployment to continue. Withdrawing early risks damaging the AUKUS relationship."
                    },
                    "scoreModifiers": {
                        "military_readiness": -1
                    },
                    "assetModifiers": [
                        {
                            "id": "a_pow",
                            "name": "UK Carrier Strike Group",
                            "location": [
                                -33.86,
                                151.2
                            ],
                            "state": "deployed",
                            "tags": [
                                "military",
                                "naval"
                            ],
                            "image": "hms_prince_of_wales",
                            "briefing": "The UK Carrier Strike Group, centered around HMS Prince of Wales and including a Type 45 destroyer and other escorts, currently deployed to the Indo-Pacific."
                        }
                    ]
                },
                {
                    "id": "pow_channel",
                    "name": "Exercising in English Channel",
                    "briefingText": "The QEC Prince of Wales is exercising in the English Channel, approximately 2 hours from Portsmouth.",
                    "roleBriefings": {
                        "defence": "The QEC Prince of Wales is exercising in the English Channel. Your carrier is close to home and can be operationally deployed within hours. This gives you significant flexibility."
                    },
                    "scoreModifiers": {
                        "military_readiness": 1
                    },
                    "assetModifiers": [
                        {
                            "id": "a_pow",
                            "name": "UK Carrier Strike Group",
                            "location": [
                                50.5,
                                -1
                            ],
                            "state": "operational",
                            "tags": [
                                "military",
                                "naval"
                            ],
                            "image": "hms_prince_of_wales",
                            "briefing": "The UK Carrier Strike Group, centered around HMS Prince of Wales and including a Type 45 destroyer and other escorts, currently operating in home waters."
                        }
                    ]
                }
            ]
        },
        {
            "id": "iran_conflict",
            "name": "Iran Conflict Status",
            "options": [
                {
                    "id": "iran_ongoing",
                    "name": "War in Iran ongoing",
                    "briefingText": "British forces remain committed to coalition operations in the Persian Gulf. Logistics chains are stretched and reserve units are depleted.",
                    "roleBriefings": {
                        "defence": "The war in Iran is ongoing. Two brigades are committed to Gulf operations. Redeployment would take weeks and damage coalition credibility.",
                        "home": "The war in Iran is ongoing. Anti-war sentiment is growing domestically. A second front would be politically toxic.",
                        "foreign": "The war in Iran is ongoing. The US expects continued UK commitment. Wavering now would severely damage the special relationship."
                    },
                    "scoreModifiers": {
                        "military_readiness": -1,
                        "uk_us": 1
                    }
                },
                {
                    "id": "iran_ended",
                    "name": "Iran conflict resolved",
                    "briefingText": "The Iran conflict concluded 6 months ago. Forces are returning but morale is fragile and equipment requires refurbishment.",
                    "roleBriefings": {
                        "defence": "The Iran conflict concluded 6 months ago. Returning units are fatigued but available. Equipment serviceability is around 70%.",
                        "home": "The Iran conflict concluded 6 months ago. Public appetite for further military action is extremely low. Veterans' support is a hot-button issue."
                    },
                    "scoreModifiers": {
                        "civilian_stability": 1
                    }
                }
            ]
        },
        {
            "id": "us_administration",
            "name": "US Administration Stance",
            "options": [
                {
                    "id": "us_staunch",
                    "name": "Staunch Ally",
                    "briefingText": "The current US administration is firmly committed to NATO and the special relationship.",
                    "scoreModifiers": {
                        "uk_us": 1
                    }
                },
                {
                    "id": "us_isolationist",
                    "name": "Isolationist Shift",
                    "briefingText": "The US administration is facing domestic pressure to pull back from European conflicts, focusing heavily on the Indo-Pacific instead.",
                    "roleBriefings": {
                        "foreign": "The US administration is facing domestic pressure to pivot to the Indo-Pacific. Washington is reluctant to commit resources here. You will need to rely more heavily on European partners.",
                        "defence": "The US administration is pivoting to the Indo-Pacific. US logistical support is not guaranteed. Conserve your assets."
                    },
                    "scoreModifiers": {
                        "uk_us": -2,
                        "uk_europe": 1
                    }
                }
            ]
        },
        {
            "id": "domestic_climate",
            "name": "Domestic Climate",
            "options": [
                {
                    "id": "dom_stable",
                    "name": "Stable Economy",
                    "briefingText": "The UK economy is relatively stable and public trust in institutions is holding.",
                    "scoreModifiers": {
                        "civilian_stability": 1
                    }
                },
                {
                    "id": "dom_winter",
                    "name": "Winter of Discontent",
                    "briefingText": "The crisis hits during a period of intense domestic strife, with ongoing strikes in public sectors and high inflation.",
                    "roleBriefings": {
                        "home": "We are in a \"Winter of Discontent\" with ongoing strikes. Public order is already fragile. Any disruption to supply chains will lead to immediate panic buying and unrest.",
                        "media": "We are in a \"Winter of Discontent\" with ongoing strikes. The press is highly critical of government competence. Selling a war narrative will be extremely difficult."
                    },
                    "scoreModifiers": {
                        "civilian_stability": -2
                    }
                }
            ]
        }
    ],
    "assets": [
        {
            "id": "a1",
            "name": "GCHQ Bude",
            "location": [
                50.88,
                -4.55
            ],
            "state": "operational",
            "tags": [
                "intel",
                "cyber"
            ],
            "image": "gchq_bude",
            "briefing": "GCHQ Bude is a satellite ground station and eavesdropping centre located on the north coast of Cornwall, England."
        },
        {
            "id": "a2",
            "name": "HMNB Clyde",
            "location": [
                56.06,
                -4.81
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval"
            ],
            "image": "hmnb_clyde",
            "briefing": "His Majesty's Naval Base Clyde is one of three operating bases in the United Kingdom for the Royal Navy and is the base for the UK's continuous at-sea nuclear deterrent."
        },
        {
            "id": "a3",
            "name": "National Grid Control",
            "location": [
                51.41,
                -0.99
            ],
            "state": "operational",
            "tags": [
                "civilian",
                "infrastructure"
            ],
            "image": "national_grid",
            "briefing": "The National Grid Control Centre oversees the electricity and gas transmission system in Great Britain, balancing supply and demand."
        },
        {
            "id": "a_typhoon",
            "name": "Eurofighter Typhoon",
            "location": [
                53.09,
                -0.16
            ],
            "state": "operational",
            "tags": [
                "military",
                "air"
            ],
            "image": "typhoon_aircraft",
            "briefing": "The Eurofighter Typhoon is the RAF's primary multi-role combat aircraft. Coningsby squadrons are on Quick Reaction Alert (QRA), fully armed and fueled for interception of hostile incursions."
        },
        {
            "id": "a_f35",
            "name": "F-35B Lightning II",
            "location": [
                52.64,
                0.54
            ],
            "state": "operational",
            "tags": [
                "military",
                "air"
            ],
            "image": "f35_aircraft",
            "briefing": "The F-35B Lightning II provides advanced stealth strike capabilities. Currently exercising with US assets to ensure NATO interoperability in contested airspace."
        },
        {
            "id": "a_voyager",
            "name": "Voyager Tanker",
            "location": [
                51.75,
                -1.58
            ],
            "state": "operational",
            "tags": [
                "military",
                "air",
                "support"
            ],
            "image": "voyager_refueler",
            "briefing": "The Voyager fleet is crucial for extending the combat radius of RAF fighters. One aircraft is permanently on standby to support QRA operations."
        },
        {
            "id": "a_a400m",
            "name": "A400M Atlas",
            "location": [
                51.74,
                -1.59
            ],
            "state": "operational",
            "tags": [
                "military",
                "air",
                "logistics"
            ],
            "image": "a400m_transport",
            "briefing": "The A400M Atlas provides tactical airlift capabilities. Heavy transport readiness is at 80%, critical for rapid deployment of personnel and equipment."
        },
        {
            "id": "a_type45",
            "name": "Type 45 Destroyer",
            "location": [
                50.8,
                -1.11
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval"
            ],
            "image": "type_45_destroyer",
            "briefing": "Type 45 Daring-class destroyers form the backbone of the Royal Navy's air defense. HMS Defender is currently at sea providing a protective umbrella over carrier groups."
        },
        {
            "id": "a_type23",
            "name": "Type 23 Frigate",
            "location": [
                50.38,
                -4.18
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval"
            ],
            "image": "type_23_frigate",
            "briefing": "The Type 23 Duke-class frigates are the core anti-submarine warfare (ASW) vessels. Two are currently tracking suspected Russian Akula-class submarines in the GIUK gap."
        },
        {
            "id": "a_type26",
            "name": "Type 26 Frigate",
            "location": [
                59,
                -10
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval"
            ],
            "image": "type_26_frigate",
            "briefing": "The advanced Type 26 City-class frigate provides next-generation ASW capabilities. Currently patrolling the North Atlantic."
        },
        {
            "id": "a_qe",
            "name": "HMS Queen Elizabeth",
            "location": [
                56.02,
                -3.44
            ],
            "state": "maintenance",
            "tags": [
                "military",
                "naval"
            ],
            "image": "qe_class_carrier",
            "briefing": "HMS Queen Elizabeth is the fleet flagship. Currently undergoing deep maintenance in Rosyth. Unavailable for immediate deployment."
        },
        {
            "id": "a_astute",
            "name": "Astute Class Submarine",
            "location": [
                60.5,
                -5
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval",
                "sub"
            ],
            "image": "astute_class_submarine",
            "briefing": "Astute-class nuclear attack submarines are actively deployed. Their exact locations are classified, but they are tasked with shadowing hostile ballistic missile submarines."
        },
        {
            "id": "a_astute2",
            "name": "Astute Class Submarine (HMS Ambush)",
            "location": [
                55,
                -0.5
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval",
                "sub"
            ],
            "image": "astute_class_submarine",
            "briefing": "A second Astute-class submarine currently patrolling the North Sea approaches to the UK."
        },
        {
            "id": "a_vanguard",
            "name": "Vanguard Class Submarine",
            "location": [
                62,
                -15
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval",
                "sub",
                "strategic"
            ],
            "image": "vanguard_class_sub",
            "briefing": "The Vanguard-class carries the UK's Trident nuclear deterrent. At least one boat is always on Continuous At-Sea Deterrence (CASD) patrol. Communications are secure."
        },
        {
            "id": "a_rus_sub_faslane",
            "name": "Russian Severodvinsk Submarine",
            "location": [
                56,
                -5.5
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "naval",
                "sub"
            ],
            "image": "ev_sub_detection",
            "briefing": "Russian Yasen-class nuclear-powered cruise missile submarine operating submerged near the entrance to the Clyde estuary."
        },
        {
            "id": "a_gru_sabotage_cell",
            "name": "GRU Sabotage Cell (UK Energy Grid)",
            "location": [
                52.95,
                -1.15
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "intel",
                "sabotage"
            ],
            "image": "substation_alpha",
            "briefing": "Clandestine Russian GRU Unit 29155 sabotage team operating inside the UK, targeting high-voltage substations and rail signalling junctions."
        },
        {
            "id": "a_rus_spy_trawler",
            "name": "Russian Shadow-Fleet Spy Trawler",
            "location": [
                57.8,
                1.4
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "naval",
                "intel"
            ],
            "image": "ev_undersea_cable",
            "briefing": "Commercial-flagged trawler outfitted with seabed-mapping sonar and ROV cutting gear loitering over North Sea gas pipelines and telecoms cables."
        },
        {
            "id": "a_kaliningrad_iskander",
            "name": "Kaliningrad Mobile Iskander Battery",
            "location": [
                54.71,
                20.51
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "military",
                "missile"
            ],
            "image": "rus_iskander",
            "briefing": "Road-mobile Russian 9K720 Iskander-M ballistic missile launcher deployed out of garrison in Kaliningrad Oblast, threatening NATO logistics hubs and Baltic forces."
        },
        {
            "id": "a_compromised_telecom_node",
            "name": "Compromised UK Telecoms Core Node",
            "location": [
                51.52,
                -0.14
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "cyber",
                "infrastructure"
            ],
            "image": "generic_cyber",
            "briefing": "Deeply embedded SVR/Sandworm implant inside a Tier-1 UK fibre exchange, enabling silent NHS ransomware cascades and emergency broadcast hijacking."
        },
        {
            "id": "a_usaf_lakenheath",
            "name": "USAF 48th Fighter Wing (RAF Lakenheath)",
            "location": [
                52.41,
                0.56
            ],
            "state": "operational",
            "tags": [
                "military",
                "air",
                "us",
                "allied"
            ],
            "image": "nato_air_base",
            "briefing": "US Air Force 48th Fighter Wing operating F-35A and F-15E squadrons out of Suffolk. Provides critical NATO air policing, heavy airlift staging, and allied deterrence—subject to Washington authorisation."
        },
        {
            "id": "a_usn_carrier_group",
            "name": "US 6th Fleet Carrier Group (North Atlantic)",
            "location": [
                58.5,
                -14
            ],
            "state": "operational",
            "tags": [
                "military",
                "naval",
                "us",
                "allied"
            ],
            "image": "as_truman",
            "briefing": "US Navy Carrier Strike Group and Aegis destroyers operating in the North Atlantic approaches to reinforce the GIUK Gap and protect transatlantic sea lanes."
        }
    ],
    "stages": [
        {
            "id": "stage_1",
            "name": "Stage 1: Intelligence & Early Warnings"
        },
        {
            "id": "stage_2",
            "name": "Stage 2: Rising Tension & Sabotage"
        },
        {
            "id": "stage_3",
            "name": "Stage 3: Military Clashes & Skirmishes"
        },
        {
            "id": "stage_4",
            "name": "Stage 4: Armed Military Conflict"
        },
        {
            "id": "stage_5",
            "name": "Stage 5: Escalation & Ceasefire"
        }
    ],
    "eventTemplates": [
        {
            "id": "ev_kremlin_ultimatum",
            "isOpeningEvent": true,
            "stage": "stage_1",
            "name": "Kremlin Statement: Warning Over European Intervention in Ukraine",
            "sound": "teletype",
            "repeatable": false,
            "location": [
                55.75,
                37.61
            ],
            "image": "ev_russia_false_flag",
            "description": "In a televised address from Moscow, the Kremlin condemns UK and European military advisers, intelligence sharing, and weapons logistics supporting Ukraine as \"direct belligerent intervention.\" Russian Northern and Baltic Fleet task groups are placed on high combat alert.",
            "roleDescriptions": {
                "PM": "COBRA has been convened immediately. Allies in Paris, Berlin, and Warsaw are waiting to see whether Britain stands firm or blinks first.",
                "foreign": "Washington's response is still unclear—pushing too hard unilaterally could alienate an already cautious White House, while hesitation will rattle European NATO partners.",
                "defence": "RAF QRA and Royal Navy North Atlantic patrols are on standby; USAF Lakenheath and the US 6th Fleet Carrier Group remain in theatre for now.",
                "media": "24-hour news channels are leading with the Kremlin threat. Financial markets and energy futures are already jittery."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How should Britain respond diplomatically to the Kremlin's warning over Ukraine?",
                    "options": [
                        {
                            "id": "opt_krem_firm_nato",
                            "text": "Issue a joint UK–European declaration rejecting Russian intimidation and reaffirming support for Ukraine.",
                            "effects": {
                                "scores": {
                                    "uk_europe": 1,
                                    "uk_russia": -1,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_uk_casualty_leak",
                                    "ev_maritime_shadowing",
                                    "ev_disinfo_campaign",
                                    "ev_bomber_intercept"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Joint UK–European Declaration Issued",
                                        "message": "London, Paris, Berlin, and Warsaw issue a united statement rejecting Kremlin intimidation and reaffirming support for Ukraine, strengthening European cohesion as diplomatic ties with Moscow freeze.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Allied Force Posture Hardened",
                                        "messages": [
                                            "RAF Quick Reaction Alert squadrons and Royal Navy North Atlantic patrols step up readiness alongside European NATO partners.",
                                            "Joint European air and maritime alert levels rise as Russian fleet units deploy in the Northern and Baltic Seas."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK–EUROPE DECLARATION — KREMLIN ULTIMATUM REJECTED",
                                        "message": "Britain and European allies stand firm on Ukraine support; military alert levels rising.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_krem_coord_us",
                            "text": "Coordinate a measured statement with Washington first to keep the UK–US alliance locked in step.",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_europe": -1
                                },
                                "unlockEvents": [
                                    "ev_uk_casualty_leak",
                                    "ev_maritime_shadowing",
                                    "ev_dissident_discovery",
                                    "ev_gps_jamming"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Washington Statement Coordinated",
                                        "message": "Downing Street and the White House release a tightly aligned response that reinforces the UK–US Special Relationship, though European capitals express concern over being sidelined.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "cyber"
                                        ],
                                        "title": "Five Eyes Threat Watch Elevated",
                                        "messages": [
                                            "GCHQ and US intelligence partners synchronise early-warning telemetry as Moscow shifts attention toward UK diplomatic and digital targets.",
                                            "Transatlantic cyber watch desks tighten joint monitoring of Russian state networks following the UK–US statement."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_krem_deescalate",
                            "text": "Call for urgent diplomatic talks and emphasise Britain's role is strictly defensive.",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_europe": -1,
                                    "uk_us": -1
                                },
                                "unlockEvents": [
                                    "ev_uk_casualty_leak",
                                    "ev_protest_manchester",
                                    "ev_disinfo_campaign"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Urgent Diplomatic Talks Proposed",
                                        "message": "Britain calls for emergency dialogue and stresses its strictly defensive posture; immediate military tension eases, but Washington and European allies question UK resolve.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "media"
                                        ],
                                        "title": "Conciliatory Line Splits Commentators",
                                        "messages": [
                                            "Westminster correspondents highlight the government's push for talks while opposition critics warn against appearing hesitant.",
                                            "Evening news panels debate Britain's call for talks, with hawkish pundits arguing Moscow may exploit restraint."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "LONDON URGES TALKS — ALLIED CONCERN OVER RESOLVE",
                                        "message": "UK calls for emergency diplomatic dialogue; military tension dips as NATO partners urge firmness.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "PM",
                    "text": "What initial readiness posture should COBRA authorise?",
                    "options": [
                        {
                            "id": "opt_krem_high_alert",
                            "text": "Raise UK military and NCSC cyber alert levels immediately and brief Parliament.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "civilian_stability": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_uk_casualty_leak",
                                        "delayMs": 65000,
                                        "probability": 0.7,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "PM",
                                                    "defence",
                                                    "media"
                                                ],
                                                "title": "Unconfirmed Baltic Incident Traffic",
                                                "messages": [
                                                    "Encrypted liaison traffic flags a sharp firefight near an allied Baltic border post, with unverified casualty rumours reaching London newsdesks.",
                                                    "MOD duty officers receive urgent signals of a clash involving British advisers in the Baltics as reporters begin pressing for comment."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_deepfake_pm",
                                        "delayMs": 70000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "media",
                                                    "cyber"
                                                ],
                                                "title": "Suspicious Synthetic Media Surge",
                                                "messages": [
                                                    "NCSC monitors detect coordinated bot clusters preparing synthetic broadcast clips targeting Downing Street.",
                                                    "GCHQ alerts press officers to unusual dark-web chatter and automated video uploads mimicking official UK broadcasts."
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
                                            "defence",
                                            "cyber"
                                        ],
                                        "title": "Military & NCSC Alert Levels Raised",
                                        "messages": [
                                            "UK Armed Forces and NCSC incident teams move onto heightened readiness, placing QRA fighter crews and national cyber shields on 24-hour watch.",
                                            "Readiness orders take effect across MOD commands and GCHQ defence centres, sharpening British response times."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Commons Statement Sparks Public Unease",
                                        "message": "An emergency Parliamentary briefing reassures MPs of defensive preparedness, though live coverage of heightened alert levels unsettles commuters and markets.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "COBRA RAISES UK ALERT — FORCES & NCSC ON STANDBY",
                                        "message": "Prime Minister briefs Parliament as military and cyber readiness levels step up.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_krem_quiet_prep",
                            "text": "Prepare defences quietly behind closed doors to avoid triggering public panic.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_uk_casualty_leak",
                                        "delayMs": 80000,
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "PM",
                                                    "defence",
                                                    "media"
                                                ],
                                                "title": "Encrypted Baltic Casualty Rumours",
                                                "messages": [
                                                    "Whitehall duty officers pick up urgent reports of a border skirmish involving British troops in the Baltic states.",
                                                    "Unconfirmed press enquiries begin circulating in Westminster over secret UK military casualties in Eastern Europe."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_heathrow_gps_spoof",
                                        "delayMs": 85000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "cyber",
                                                    "defence"
                                                ],
                                                "title": "Anomalous GNSS Interference South-East",
                                                "messages": [
                                                    "NATS air-traffic sensors and NCSC monitors log early GPS signal drift along commercial approaches to Heathrow and Gatwick.",
                                                    "Electronic warfare sensors detect hostile radio-frequency interference probing civilian aviation navigation corridors south of London."
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
                                            "home",
                                            "media"
                                        ],
                                        "title": "Calm Maintained Across the UK",
                                        "message": "Quiet preparations keep crisis headlines off evening bulletins, preserving public calm and steady financial markets.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "defence",
                                            "cyber"
                                        ],
                                        "title": "Discreet Posture Slows Mobilisation",
                                        "messages": [
                                            "Without formal mobilisation orders, reserve recalls and full NCSC infrastructure sweeps proceed slowly behind closed doors.",
                                            "Commanders warn that quiet preparations keep force readiness below optimum levels if threats accelerate."
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
            "id": "ev_protest_manchester",
            "stage": "stage_1",
            "name": "Mass Anti-War Protests in Manchester",
            "repeatable": false,
            "conditions": {
                "triggeredEvents": [
                    "ev_uk_casualty_leak"
                ]
            },
            "location": [
                53.48,
                -2.24
            ],
            "image": "ev_protest_manchester",
            "description": "Over 100,000 demonstrators march through Manchester city centre, demanding Britain stay out of any war in Eastern Europe.",
            "roleDescriptions": {
                "home": "The protest is peaceful so far, but local police are stretched thin across the city.",
                "media": "Global news crews are filming the crowds. Some reports call it peaceful democracy; others call it a threat.",
                "foreign": "Our NATO allies are watching closely, worried that Britain's resolve is weakening."
            },
            "decisions": [
                {
                    "role": "media",
                    "text": "What statement should the government give to the media?",
                    "options": [
                        {
                            "id": "opt5",
                            "text": "Respect the protesters' right to march, and emphasize our search for peace",
                            "effects": {
                                "scores": {
                                    "uk_europe": -1,
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_protest_london"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "Conciliatory Statement Emboldens Protest Organisers",
                                        "messages": [
                                            "Respecting the marchers' peaceful rights avoids an immediate flashpoint in Manchester, yet critics accuse Whitehall of weakness as organisers announce larger rallies in London.",
                                            "Local disorder is avoided in Manchester, though campaigners swiftly call for a mass march outside Downing Street."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "European Allies Question British Resolve",
                                        "message": "NATO diplomats express concern that Downing Street's cautious tone signals wavering domestic support for deterrence.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt6",
                            "text": "Criticize the street disruption and warn that national security comes first",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": 1
                                },
                                "unlockEvents": [
                                    "ev_protest_london"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "Firm Security Message Steadies Public Confidence",
                                        "messages": [
                                            "Emphasising national security and lawful order reassures the wider public in Manchester, even as protest leaders vow to march on Westminster next.",
                                            "Downing Street's firm stance on street order steadies public sentiment while anti-war organisers shift focus toward London."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "European Partners Welcome Firm Leadership",
                                        "message": "Allied capitals note Downing Street's decisive messaging positively, reinforcing confidence in UK commitment.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "sound": "alert"
        },
        {
            "id": "ev_maritime_shadowing",
            "stage": "stage_1",
            "name": "Russian Warships Over Undersea Cables",
            "sound": "sonar",
            "conditions": {
                "triggeredEvents": [
                    "ev_uk_casualty_leak"
                ]
            },
            "repeatable": true,
            "location": [
                57,
                -15
            ],
            "image": "ev_maritime_shadowing",
            "description": "Royal Navy warships are shadowing a Russian naval task force sailing directly over vital undersea internet cables. Internet traffic between the UK and America suddenly slowed down.",
            "roleDescriptions": {
                "defence": "Russian warships are sailing extremely close to our frigates in international waters.",
                "cyber": "Data flowing through underwater cables has dropped sharply, affecting banks and government emails.",
                "foreign": "Russian diplomats accuse the Royal Navy of harassing their ships."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should our warships handle the Russian naval flotilla?",
                    "options": [
                        {
                            "id": "opt_mar_1",
                            "text": "Keep tracking them at a safe distance and photograph their movements",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_undersea_cable",
                                    "ev_sub_detection"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_north_sea_pipeline",
                                        "delayMs": 85000,
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "home",
                                                    "foreign"
                                                ],
                                                "title": "St Fergus Pipeline Telemetry Dip",
                                                "messages": [
                                                    "North Sea terminal sensors register an abrupt pressure dip on the Langeled gas interconnector near an unlit vessel.",
                                                    "Energy monitors flag abnormal flow readings on a vital North Sea gas pipeline as surface radar tracks a suspicious trawler."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_spy_trawler_anchor",
                                        "delayMs": 90000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "cyber"
                                                ],
                                                "title": "Unflagged Trawler Lingering Over Seabed Trunk",
                                                "messages": [
                                                    "Coastguard radar spots an unflagged trawler slowing suspiciously over a primary North Sea communications cable.",
                                                    "Maritime surveillance detects an AIS-dark trawler dropping speed directly above UK–European subsea fibre routes."
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
                                            "defence"
                                        ],
                                        "title": "Shadowing Operation Logs Russian Capabilities",
                                        "messages": [
                                            "Royal Navy frigates and Wildcat helicopters maintain safe standoff distance, capturing high-resolution imagery of Russian deck gear and boosting maritime readiness.",
                                            "Escorts continuously track the flotilla's course and speed without provoking a collision, building valuable intelligence."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "cyber",
                                            "foreign"
                                        ],
                                        "title": "Subsea Cable Traffic Monitored",
                                        "message": "NCSC continues tracking transatlantic bandwidth dips while diplomats log the Russian task force's movements for NATO partners.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_mar_2",
                            "text": "Deploy extra destroyers and cut across their path to force them away",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "uk_russia": 1,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_undersea_cable",
                                    "ev_sub_detection"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_giuk_tanker_collision",
                                        "delayMs": 80000,
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "foreign"
                                                ],
                                                "title": "Fogbound Manoeuvring Alert in GIUK Gap",
                                                "messages": [
                                                    "Flash traffic from North Atlantic patrols warns of dangerous close-quarters manoeuvring near an RFA tanker in thick fog.",
                                                    "Royal Navy escorts report a Russian destroyer closing aggressively across an allied supply tanker's bow in the GIUK Gap."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_north_sea_pipeline",
                                        "delayMs": 85000,
                                        "probability": 0.4,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "home",
                                                    "foreign"
                                                ],
                                                "title": "North Sea Interconnector Pressure Anomaly",
                                                "messages": [
                                                    "Automated alarms at St Fergus gas terminal flag a sudden drop in pipeline pressure near a shadow-fleet vessel.",
                                                    "Energy grid operators detect unexpected pressure loss along the Langeled North Sea gas link."
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
                                            "defence"
                                        ],
                                        "title": "Destroyers Force Russian Flotilla Off Cable Lane",
                                        "messages": [
                                            "Type 45 destroyers cross the Russian task group's bow at speed, driving the warships clear of the subsea corridor at high escalation risk.",
                                            "Royal Navy warships shoulder the Russian flotilla off the Atlantic cable route, sharpening readiness while raising maritime tension."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Moscow Condemns Naval Intercept",
                                        "message": "Russian diplomats lodge an angry protest accusing the Royal Navy of reckless brinkmanship in international waters.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL NAVY INTERCEPTS RUSSIAN FLOTILLA OVER CABLES",
                                        "message": "Extra destroyers drive Russian warships off Atlantic cable lanes; tensions spike.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "foreign",
                    "text": "How should we handle the slowdown in undersea internet cables?",
                    "options": [
                        {
                            "id": "opt_mar_3",
                            "text": "Raise the cable threat with NATO and ask allies for naval support",
                            "effects": {
                                "scores": {
                                    "uk_europe": 1,
                                    "uk_us": 1,
                                    "uk_russia": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "defence"
                                        ],
                                        "title": "NATO Allies Pledge Maritime Patrol Support",
                                        "messages": [
                                            "Washington and European allies back Britain's subsea cable warning and pledge maritime patrol aircraft, though Moscow condemns the allied mobilisation.",
                                            "NATO partners commit extra patrol aircraft to guard Atlantic seabed cables as diplomatic friction with Russia rises."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_mar_4",
                            "text": "Say nothing publicly to avoid causing panic in financial markets",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_us": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "City Markets Stay Calm",
                                        "message": "Withholding public comment prevents panic selling in the City of London and keeps retail banking confidence steady.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "foreign",
                                            "cyber"
                                        ],
                                        "title": "Washington Frustrated by Public Silence",
                                        "message": "US officials privately criticise Whitehall for withholding attribution while shared transatlantic data links remain degraded.",
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
            "id": "ev_uk_casualty_leak",
            "stage": "stage_1",
            "name": "British Soldier Casualties Leaked to Press",
            "image": "ev_uk_casualty_leak",
            "repeatable": false,
            "location": [
                51.5,
                -0.1
            ],
            "description": "News breaks that three British soldiers have been killed in a border skirmish in the Baltic states. The government had kept their deployment secret.",
            "roleDescriptions": {
                "media": "The press is outraged that troops were sent without telling Parliament.",
                "defence": "Our soldiers died bravely defending an allied checkpoint from armed militias.",
                "foreign": "Our Baltic allies are begging us to stand firm and not pull our soldiers back."
            },
            "decisions": [
                {
                    "role": "media",
                    "text": "How should the government handle the news of the casualties?",
                    "options": [
                        {
                            "id": "opt_cas_1",
                            "text": "Hold a press conference praising their sacrifice and explaining our NATO mission",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": 1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_deepfake_pm",
                                        "delayMs": 85000,
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "media",
                                                    "cyber"
                                                ],
                                                "title": "Synthetic Broadcast Chatter Detected",
                                                "messages": [
                                                    "NCSC threat hunters spot adversarial bot clusters preparing manipulated video clips of the Prime Minister.",
                                                    "GCHQ flags automated disinformation networks priming fake emergency statements across major social platforms."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_mi5_sleeper_cell",
                                        "delayMs": 90000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "PM",
                                                    "home",
                                                    "cyber"
                                                ],
                                                "title": "EYES ONLY: Midlands Comms Intercept",
                                                "messages": [
                                                    "MI5 surveillance flags encrypted radio bursts from suspected foreign operatives moving near Midlands National Grid sites.",
                                                    "GCHQ and MI5 trace burst communications from a suspected hostile cell scouting electricity infrastructure in the Midlands."
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
                                            "media",
                                            "PM"
                                        ],
                                        "title": "Downing Street Tribute Steadies Public Mood",
                                        "message": "A dignified press conference honouring the fallen soldiers and explaining Britain's NATO mission rallies public backing and reassures European allies.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Baltic Capitals Praise UK Steadfastness",
                                        "message": "Allied governments in Tallinn, Riga, and Vilnius welcome Britain's public commitment to collective defence.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "DOWNING STREET HONOURS FALLEN — NATO MISSION DEFENDED",
                                        "message": "Government confirms Baltic deployment; public and European allies rally behind UK forces.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_cas_2",
                            "text": "Keep comments brief and avoid giving details while the operation continues",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1
                                },
                                "randomEvents": [
                                    {
                                        "id": "ev_deepfake_pm",
                                        "delayMs": 75000,
                                        "probability": 0.6,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "media",
                                                    "cyber"
                                                ],
                                                "title": "Botnets Exploit Official Silence",
                                                "messages": [
                                                    "Foreign troll farms flood social feeds to fill the information vacuum, priming fake emergency video content.",
                                                    "NCSC detects rapid amplification of fabricated Downing Street rumours across X, TikTok, and WhatsApp."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_commons_no_confidence",
                                        "delayMs": 95000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "PM",
                                                    "home",
                                                    "foreign",
                                                    "media",
                                                    "cyber"
                                                ],
                                                "title": "Westminster Backbench Restlessness",
                                                "messages": [
                                                    "Parliamentary whips warn that anger over secret deployments is fuelling backbench calls for an emergency Commons confidence vote.",
                                                    "Westminster correspondents report growing murmurs among MPs demanding accountability over undisclosed military casualties."
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
                                            "media",
                                            "PM"
                                        ],
                                        "title": "Terse Briefing Fuels Press Scrutiny",
                                        "message": "Withholding operational details sparks front-page accusations of secrecy in Whitehall, eroding domestic trust during the crisis.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "defence",
                    "text": "Should we pull back our remaining troops in the area?",
                    "options": [
                        {
                            "id": "opt_cas_3",
                            "text": "Reinforce our soldiers with tanks and artillery to protect them",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 1,
                                    "uk_russia": 1
                                },
                                "unlockEvents": [
                                    "ev_russia_hub_explosion"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_baltic_drone_ambush",
                                        "delayMs": 110000,
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "media"
                                                ],
                                                "title": "Hostile Drone Telemetry Near Estonian Border",
                                                "messages": [
                                                    "Forward ISR units detect loitering munition launch signatures tracking British reinforcement convoys moving toward Estonia.",
                                                    "Electronic sensors along the Baltic frontier flag enemy reconnaissance drones shadowing UK armoured columns."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_heathrow_gps_spoof",
                                        "delayMs": 95000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "cyber",
                                                    "defence"
                                                ],
                                                "title": "South-East Aviation GPS Signal Drift",
                                                "messages": [
                                                    "NCSC receives urgent NATS alerts of erratic GPS readings affecting commercial approaches around London.",
                                                    "Aviation beacons south-east of London report anomalous navigation interference from high-power jammers."
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
                                            "defence"
                                        ],
                                        "title": "Armoured Reinforcements Pushed to Baltic Front",
                                        "messages": [
                                            "Challenger 2 armoured squadrons and artillery batteries deploy forward to shield British troops, boosting combat readiness while sharpening border escalation.",
                                            "Heavy armour and mobile artillery reinforce UK positions in Estonia, hardening deterrence as Russian forces go on high alert."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Moscow Condemns British Armour Surge",
                                        "message": "Russian officials warn that deploying heavy British tanks and artillery near the frontier crosses a dangerous line.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK ARMOUR REINFORCES BALTIC BORDER",
                                        "message": "Tanks and artillery ordered forward to protect British troops; military escalation rises.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_cas_4",
                            "text": "Pull back troops to safer positions behind the main border",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_europe": -1,
                                    "uk_us": -1
                                },
                                "unlockEvents": [
                                    "ev_russia_hub_explosion"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_heathrow_gps_spoof",
                                        "delayMs": 95000,
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "cyber",
                                                    "defence"
                                                ],
                                                "title": "Electronic Interference Near London Airports",
                                                "messages": [
                                                    "Air-traffic sensors around Heathrow and Gatwick detect early signs of hostile GNSS spoofing.",
                                                    "NCSC logs suspicious electronic-warfare jamming sweeps probing South-East England flight corridors."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_mi5_sleeper_cell",
                                        "delayMs": 100000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "PM",
                                                    "home",
                                                    "cyber"
                                                ],
                                                "title": "EYES ONLY: Covert Cell Activity Logged",
                                                "messages": [
                                                    "MI5 counter-espionage teams intercept suspicious short-range radio traffic near a Midlands power substation.",
                                                    "Domestic intelligence flags covert reconnaissance activity close to critical National Grid infrastructure in the Midlands."
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
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Troops Repositioned Behind Main Border",
                                        "message": "Pulling British units back lowers immediate flashpoint risk, but Washington and European allies voice sharp concern over allied deterrence.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK FORCES REDEPLOYED TO REAR POSITIONS",
                                        "message": "Troops pulled back to reduce border friction; NATO allies express concern.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "sound": "teletype",
            "requiresUnlock": true,
            "conditions": {
                "triggeredEvents": [
                    "ev_kremlin_ultimatum"
                ]
            }
        },
        {
            "id": "ev_protest_london",
            "stage": "stage_1",
            "name": "Huge Anti-War Protest Outside Downing Street",
            "repeatable": false,
            "location": [
                51.5,
                -0.12
            ],
            "image": "ev_protest_london",
            "description": "Over 50,000 protesters pack Whitehall and Parliament Square, chanting anti-war slogans and demanding an immediate halt to all military actions.",
            "roleDescriptions": {
                "home": "Protesters are banging on the Downing Street security gates. Police riot barriers are holding for now.",
                "media": "Every major news network is broadcasting live from the protest outside our windows."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "How should the police manage the crowds outside Downing Street?",
                    "options": [
                        {
                            "id": "opt_prt_1",
                            "text": "Order riot police to clear the street to keep government buildings secure",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -2,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_protest_violence"
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_protest_violence",
                                        "delayMs": 15000,
                                        "probability": 1
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Riot Police Advance Along Whitehall",
                                        "messages": [
                                            "Public order officers push forward with shields to clear Whitehall; live television captures heated clashes outside Downing Street gates.",
                                            "Baton charges disperse front-row demonstrators in central London, triggering furious anger across crowds and breaking news alerts."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "PM"
                                        ],
                                        "title": "Whitehall Disorder Escalates Rapidly",
                                        "message": "Heavy-handed clearance outside Downing Street inflicts a sharp drop in domestic stability and risks full-scale rioting.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "CLASHES IN WHITEHALL — RIOT POLICE DEPLOYED",
                                        "message": "Police move to clear anti-war crowds outside Downing Street; unrest spreading.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_prt_2",
                            "text": "Allow the protest to continue peacefully while protecting government gates",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": 1
                                },
                                "unlockEvents": [
                                    "ev_cyber_london"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "Peaceful Containment Holds Downing Street",
                                        "messages": [
                                            "Police maintain firm perimeter barriers without confrontation, allowing the rally to disperse peacefully and reinforcing domestic stability.",
                                            "Officers hold Downing Street gates calmly while protesters disperse, preserving street order across Whitehall."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "European Allies Note Democratic Resilience",
                                        "message": "Allied governments commend Whitehall's calm handling of mass dissent without losing strategic composure.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "sound": "alert"
        },
        {
            "id": "ev_protest_violence",
            "stage": "stage_1",
            "name": "Rioting Breaks Out Outside Parliament",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                51.5,
                -0.12
            ],
            "image": "ev_protest_london",
            "description": "Following orders to clear the street, masked agitators throw bottles and fireworks at police. Fighting breaks out across central London.",
            "roleDescriptions": {
                "home": "Police report foreign provocateurs stirring up the crowds. Multiple officers are injured.",
                "foreign": "Intelligence suggests foreign agents are helping organize the riots to paralyze the government."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "How should the government handle the escalating violence? (TIME CRITICAL)",
                    "options": [
                        {
                            "id": "opt_prv_1",
                            "text": "Deploy full riot squads and make mass arrests of violent ringleaders",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "military_readiness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Mass Arrests Restore Fragile Street Order",
                                        "messages": [
                                            "Full riot squads regain control of Parliament Square after dozens of arrests, though violent footage damages public confidence.",
                                            "Public order teams clear violent pockets around Westminster with mass detentions, leaving domestic stability bruised."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Reserve Security Units Tied Down",
                                        "message": "Diverting emergency support personnel to back up London policing reduces immediate military readiness.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_prv_2",
                            "text": "Have undercover officers extract foreign provocateurs instigating the clashes",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_russia": 1,
                                    "uk_us": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "PM"
                                        ],
                                        "title": "Undercover Teams Detain Foreign Provocateurs",
                                        "messages": [
                                            "Specialist police teams cleanly extract masked foreign agitators from Parliament Square, defusing the riot without wider clashes.",
                                            "Targeted arrests remove external instigators from central London crowds, rapidly restoring street calm."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign",
                                            "media"
                                        ],
                                        "title": "Evidence of Russian Agitation Shared",
                                        "message": "Washington welcomes intelligence linking detained provocateurs to Moscow, while bilateral tension with Russia intensifies.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "FOREIGN PROVOCATEURS ARRESTED IN LONDON RIOTS",
                                        "message": "Undercover police detain foreign agitators; Parliament Square unrest subsides.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_prv_3",
                            "text": "Hesitate while debating orders (Police lines break, rioters smash government windows)",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -2
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "PM",
                                            "media"
                                        ],
                                        "title": "Police Cordons Breached in Whitehall",
                                        "message": "Delayed command orders leave officers overwhelmed as rioters break through barriers and smash government windows, severely shaking public order.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "WHITEHALL SECURITY BREACHED — RIOTERS BREAK LINES",
                                        "message": "Delayed police response allows crowds to damage government buildings in central London.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "sound": "klaxon"
        },
        {
            "id": "ev_dissident_discovery",
            "stage": "stage_1",
            "name": "Russian Defector Found Unconscious",
            "repeatable": false,
            "conditions": {
                "triggeredEvents": [
                    "ev_uk_casualty_leak"
                ]
            },
            "location": [
                51.06,
                -1.79
            ],
            "image": "ev_dissident_discovery",
            "description": "A prominent Russian defector who criticized Putin has been found slumped on a park bench in Salisbury. Paramedics are treating him.",
            "autoEffects": {
                "scores": {
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "home",
                            "foreign"
                        ],
                        "title": "Salisbury Park Cordoned for Hazmat Sweep",
                        "messages": [
                            "Counter-terrorism police and specialist hazmat teams seal off Salisbury park while Porton Down begins testing samples from the unconscious defector.",
                            "Emergency responders establish a chemical exclusion zone in Salisbury as doctors treat the critically ill Russian dissident."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "media",
                            "PM"
                        ],
                        "title": "Public Alarm Over Suspected Poisoning",
                        "message": "Breaking news from Wiltshire revives fears of chemical attacks on British soil, unsettling public confidence while laboratory results are awaited.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SALISBURY INCIDENT — RUSSIAN DEFECTOR HOSPITALISED",
                        "message": "Hazmat cordon established in Wiltshire; Porton Down testing suspected toxin.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
            },
            "triggerEvents": [
                {
                    "id": "ev_dissident_results",
                    "probability": 1,
                    "delayMs": 120000
                }
            ],
            "roleDescriptions": {
                "home": "Hazmat teams are inspecting the park as a precaution against poison.",
                "foreign": "The victim is a high-profile defector granted asylum in the UK."
            },
            "decisions": [],
            "sound": "teletype"
        },
        {
            "id": "ev_disinfo_campaign",
            "stage": "stage_1",
            "name": "Flood of Fake News on Social Media",
            "repeatable": true,
            "conditions": {
                "triggeredEvents": [
                    "ev_uk_casualty_leak"
                ]
            },
            "location": [
                51.5,
                -0.1
            ],
            "image": "ev_disinfo_campaign",
            "description": "GCHQ detects millions of automated bot accounts flooding social media with fake news stories designed to turn the British public against each other.",
            "autoEffects": {
                "scores": {
                    "civilian_stability": -1,
                    "uk_russia": 1
                },
                "unlockEvents": [
                    "ev_protest_london"
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "cyber",
                            "media"
                        ],
                        "title": "GCHQ Traces Bot Swarm to St Petersburg",
                        "messages": [
                            "Automated Russian troll farms flood UK social feeds with fabricated crisis claims, forcing urgent fact-checking as false rumours reach live news.",
                            "NCSC analysts trace millions of hostile bot posts to St Petersburg networks attempting to polarise British audiences."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "Disinformation Campaign Strains Public Cohesion",
                        "message": "Viral falsehoods deepen domestic divisions and sharpen confrontation with Moscow as protest groups mobilise toward Downing Street.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "HOSTILE DISINFORMATION SURGE DETECTED",
                        "message": "GCHQ traces millions of fake news bots to Russia; public cohesion under strain.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
            },
            "roleDescriptions": {
                "cyber": "The bot accounts trace straight back to Russian military troll farms in St Petersburg.",
                "media": "Mainstream TV channels are accidentally reporting some of the fake rumours as real news."
            },
            "decisions": [],
            "sound": "teletype"
        },
        {
            "id": "ev_bomber_intercept",
            "stage": "stage_1",
            "name": "Record Scrambles to Intercept Russian Bombers",
            "repeatable": true,
            "conditions": {
                "triggeredEvents": [
                    "ev_uk_casualty_leak"
                ]
            },
            "location": [
                59,
                0
            ],
            "image": "ev_bomber_intercept",
            "description": "RAF Typhoons have scrambled ten times this week to intercept Russian Tu-95 Bear bombers flying along the Scottish coast without radio transponders.",
            "autoEffects": {
                "scores": {
                    "military_escalation": 1,
                    "uk_russia": 1
                },
                "unlockEvents": [
                    "ev_black_sea_intercept"
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence"
                        ],
                        "title": "RAF QRA Typhoons Escort Tu-95 Bears Clear",
                        "messages": [
                            "Quick Reaction Alert Typhoons from RAF Lossiemouth and Coningsby intercept Russian Bear bombers off Scotland, protecting UK airspace amid growing crew fatigue.",
                            "RAF fighters shadow unannounced Russian long-range bombers clear of the UK Air Policing area as military friction rises."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "foreign",
                            "PM"
                        ],
                        "title": "Airspace Probing Heightens UK–Russia Friction",
                        "messages": [
                            "Repeated dark-transponder bomber flights signal Kremlin intimidation and escalate military tension across Northern Europe.",
                            "Persistent long-range bomber patrols near Scotland sharpen diplomatic confrontation between London and Moscow."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "RAF SCRAMBLES RECORD INTERCEPTS OFF SCOTLAND",
                        "message": "Typhoon QRA crews turn back Russian Tu-95 bombers; air escalation rises.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
            },
            "roleDescriptions": {
                "defence": "Russia is constantly probing our reaction times and exhausting our fighter pilots.",
                "foreign": "This flying intimidation is meant to remind the British public of Russia's long-range bombers."
            },
            "decisions": [],
            "sound": "klaxon"
        },
        {
            "id": "ev_gps_jamming",
            "stage": "stage_1",
            "name": "Defence Secretary's Plane GPS Jammed",
            "repeatable": false,
            "conditions": {
                "triggeredEvents": [
                    "ev_uk_casualty_leak"
                ]
            },
            "location": [
                55,
                19
            ],
            "image": "ev_gps_jamming",
            "description": "An RAF VIP transport plane carrying the Defence Secretary experienced severe GPS jamming while flying over the Baltic Sea near Kaliningrad.",
            "roleDescriptions": {
                "defence": "The pilots switched to backup gyro instruments and landed safely, but the electronic attack was deliberate.",
                "foreign": "This is a direct, dangerous provocation against a senior British cabinet minister."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How should Britain respond to the GPS jamming incident?",
                    "options": [
                        {
                            "id": "opt_gps1",
                            "text": "Summon the Russian Ambassador to Downing Street and deliver a fierce official protest",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_cyber_london"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Russian Ambassador Summoned to Whitehall",
                                        "message": "The Foreign Office delivers an angry rebuke over electronic warfare interference against a British ministerial aircraft, hardening diplomatic and military friction with Moscow.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Baltic Flight Routing Hardened",
                                        "messages": [
                                            "RAF transport crews adopt hardened inertial navigation protocols along Kaliningrad air corridors.",
                                            "Air Mobility Force crews switch to backup non-GPS navigation procedures across Baltic transit routes."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_gps2",
                            "text": "Downplay the incident publicly so we don't frighten airline passengers",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": -1
                                },
                                "unlockEvents": [
                                    "ev_cyber_london"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "Commercial Aviation Confidence Held Steady",
                                        "message": "Playing down the Baltic jamming keeps airline travellers calm and avoids airport disruption across Britain.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "foreign",
                                            "defence"
                                        ],
                                        "title": "Baltic Partners Concerned by Quiet Response",
                                        "message": "European allies along the Baltic rim worry that Whitehall left hostile Kaliningrad jamming unchallenged.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "sound": "alert"
        },
        {
            "id": "ev_black_sea_intercept",
            "stage": "stage_1",
            "name": "Dangerous Jet Intercept Over Black Sea",
            "repeatable": false,
            "location": [
                43,
                31
            ],
            "image": "ev_black_sea_intercept",
            "description": "A British Rivet Joint spy plane was aggressively buzzed by Russian fighter jets over international waters in the Black Sea, passing within 15 feet.",
            "roleDescriptions": {
                "defence": "The Russian jet fired decoy flares right across our aircraft's flight path, forcing evasive action.",
                "foreign": "Russia claims our plane was violating their airspace, which GPS logs prove is false."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should we adjust our intelligence reconnaissance flights?",
                    "options": [
                        {
                            "id": "opt_bsi1",
                            "text": "Temporarily suspend surveillance flights over the Black Sea to avoid a shootdown",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1,
                                    "military_escalation": -1
                                },
                                "unlockEvents": [
                                    "ev_airspace_intercept"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Black Sea Rivet Joint Sorties Suspended",
                                        "message": "Pausing reconnaissance patrols reduces the immediate risk of a mid-air clash, though real-time intelligence coverage over the Black Sea drops.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_bsi2",
                            "text": "Continue the flights, but assign armed Typhoon fighters to escort the spy plane",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 2
                                },
                                "unlockEvents": [
                                    "ev_airspace_intercept"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Armed Typhoons Escort Rivet Joint Patrols",
                                        "messages": [
                                            "Armed Typhoon FGR4 fighters take station alongside RAF Rivet Joint sorties, protecting intelligence collection while sharply increasing air-to-air escalation.",
                                            "Escort Typhoons maintain continuous weapons-ready cover over the Black Sea, holding operational readiness high at acute escalation risk."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Armed Escorts Trigger Acute Airspace Friction",
                                        "message": "Moscow denounces armed British fighter patrols near Crimea, narrowing diplomatic margin against an accidental shootdown.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ARMED TYPHOONS ESCORT BLACK SEA SPY FLIGHTS",
                                        "message": "RAF fighters assigned to protect Rivet Joint patrols; air escalation jumps sharply.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "klaxon"
        },
        {
            "id": "ev_cyber_london",
            "stage": "stage_2",
            "name": "Cyber Attack on London Banks",
            "sound": "teletype",
            "repeatable": true,
            "location": [
                51.51,
                -0.09
            ],
            "image": "ev_cyber_london",
            "description": "A major cyber attack hits London's financial district. Trading screens go dark, and cash machines across the city stop dispensing money.",
            "roleDescriptions": {
                "home": "Panic is growing as bank cards stop working. Shoppers cannot buy food, and small riots are starting.",
                "cyber": "The attack came from Russian state hacker networks targeting international banking channels.",
                "defence": "Military networks are secure, but our bases rely on civilian power and water systems.",
                "media": "Social media is flooded with rumours that the UK economy has collapsed. TV news wants answers."
            },
            "decisions": [
                {
                    "role": "cyber",
                    "text": "How should we defend against the ongoing cyber attack on our banks?",
                    "options": [
                        {
                            "id": "opt1",
                            "text": "Filter traffic through our national security firewall (Safe, but slows business transactions)",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_logistics_failure"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_nhs_ransomware",
                                        "delayMs": 85000,
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "cyber",
                                                    "home"
                                                ],
                                                "title": "Wiper Signatures Probing NHS Gateways",
                                                "messages": [
                                                    "NCSC threat sensors spot destructive malware probing regional NHS trust firewalls in a spill-over from the banking assault.",
                                                    "Hospital IT watchdogs report aggressive ransomware scans hitting UK healthcare gateways."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_gchq_war_cabinet",
                                        "delayMs": 90000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "PM",
                                                    "foreign",
                                                    "cyber"
                                                ],
                                                "title": "EYES ONLY: GCHQ Bude Priority Decrypt",
                                                "messages": [
                                                    "GCHQ Bude analysts isolate high-grade Moscow military traffic suggesting senior war-cabinet friction.",
                                                    "Top-secret signals intelligence from Bude captures Kremlin defence briefings warning of Northern Fleet overstretch."
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
                                            "cyber"
                                        ],
                                        "title": "National Firewall Absorbs Banking Attack",
                                        "messages": [
                                            "NCSC traffic scrubbing blocks further wiper intrusion into London clearing banks, though heavy packet filtering slows card payments nationwide.",
                                            "Defensive routing protects core City of London ledgers while leaving retail transaction queues sluggish."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Payment Slowdowns Frustrate High Streets",
                                        "message": "Delays at shop tills and online banking apps test public patience even though accounts remain secure.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt2",
                            "text": "Hack back and strike the Russian command servers (Risks triggering bigger retaliatory cyber attacks)",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_logistics_failure"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_nhs_ransomware",
                                        "delayMs": 80000,
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "cyber",
                                                    "home"
                                                ],
                                                "title": "Retaliatory Malware Targeting NHS Trusts",
                                                "messages": [
                                                    "Adversary operators retaliate immediately after the UK hack-back, pushing wiper payloads toward hospital networks.",
                                                    "NCSC detects intense retaliatory traffic aimed at regional NHS patient systems."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_mi5_sleeper_cell",
                                        "delayMs": 90000,
                                        "probability": 0.25,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "PM",
                                                    "home",
                                                    "cyber"
                                                ],
                                                "title": "EYES ONLY: Sabotage Cell Comms Triggered",
                                                "messages": [
                                                    "MI5 intercepts urgent activation traffic from suspected GRU operatives near Midlands National Grid infrastructure.",
                                                    "Covert surveillance logs sudden encrypted bursts from a suspected sabotage cell operating in the Midlands."
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
                                            "cyber",
                                            "PM"
                                        ],
                                        "title": "Offensive Cyber Strike Hits Command Servers",
                                        "messages": [
                                            "GCHQ offensive units disrupt Russian attack servers, halting the immediate banking assault while raising escalation and retaliation risk.",
                                            "Counter-cyber operators knock hostile relay infrastructure offline, sharpening confrontation with Moscow."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Digital Counter-Strike Escalates Conflict",
                                        "message": "Diplomats warn that hitting Russian command infrastructure raises the danger of broader retaliation against UK services.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK LAUNCHES CYBER COUNTER-STRIKE ON HOSTILE SERVERS",
                                        "message": "GCHQ disrupts Russian command nodes after City banking attack; escalation rises.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ],
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt2"
                },
                {
                    "role": "home",
                    "text": "How should we deal with public unrest on the streets?",
                    "options": [
                        {
                            "id": "opt3",
                            "text": "Deploy riot police to protect banks and shopping centres",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Riot Cordons Outside Banks Alarm Shoppers",
                                        "messages": [
                                            "Police prevent looting at high-street branches, yet images of riot shields outside shopping centres deepen public anxiety.",
                                            "Visible public-order units secure retail districts across London, though heavy policing unsettles ordinary shoppers."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt4",
                            "text": "Broadcast a live speech urging calm and promising banks will reopen",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Televised Reassurance Calms ATM Queues",
                                        "messages": [
                                            "Clear ministerial assurance that savings remain protected eases street tension and restores orderly queues across London.",
                                            "Broadcast assurances from Downing Street calm anxious savers, easing pressure outside high-street bank branches."
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
            "id": "ev_logistics_failure",
            "stage": "stage_2",
            "name": "Power & Transport Blackouts",
            "repeatable": false,
            "location": [
                51.5,
                -0.1
            ],
            "image": "ev_logistics_failure",
            "description": "Sudden blackouts knock out ports, train signals, and fuel distribution hubs across the UK. Security teams confirm it was caused by a coordinated cyber attack.",
            "roleDescriptions": {
                "home": "Petrol stations are running dry in the South East, and supermarket deliveries are backed up.",
                "cyber": "The malware attacked freight and delivery networks. We suspect Russian hackers, but cannot 100% prove it yet.",
                "foreign": "Russian state TV claims the UK brought this on itself by hacking Russian computers."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "How should we handle fuel shortages and panic buying?",
                    "options": [
                        {
                            "id": "opt_log_1",
                            "text": "Call in the British Army to drive fuel tankers and guard supermarkets",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -2,
                                    "military_readiness": 1,
                                    "military_escalation": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Army Tankers Trigger Nationwide Panic Buying",
                                        "message": "Deploying soldiers to petrol forecourts and supermarkets convinces households the crisis is worsening, sparking severe hoarding and falling stability.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Strategic Logistics Mobilisation Tested",
                                        "messages": [
                                            "Activating military tanker crews exercises defence logistics chains, boosting readiness while raising visible escalation.",
                                            "Army transport regiments deploy across fuel depots, increasing operational tempo."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ARMY DEPLOYED TO FUEL & SUPERMARKET LOGISTICS",
                                        "message": "Troops drive tankers and guard supply hubs amid blackouts; public alarm rises.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_log_2",
                            "text": "Let civilian companies handle supplies without sending in troops",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Civilian Supply Chains Recover Quietly",
                                        "message": "Commercial hauliers gradually clear freight backlogs without troops on the streets, calming household panic.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Allies Query Pace of UK Resilience",
                                        "message": "European partners note that Whitehall held back emergency mobilisation despite severe infrastructure disruption.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "foreign",
                    "text": "How should we respond to Russian media claims?",
                    "options": [
                        {
                            "id": "opt_log_3",
                            "text": "Publicly accuse the Russian government of attacking British infrastructure",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "military_escalation": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "media"
                                        ],
                                        "title": "Britain Blames Moscow for Blackout Attacks",
                                        "message": "Formal public attribution places direct pressure on the Kremlin, deepening bilateral confrontation and raising military tension.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK PUBLICLY ACCUSES RUSSIA OF INFRASTRUCTURE ATTACK",
                                        "message": "Foreign Office blames Moscow for power and transport blackouts; tensions escalate.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_log_4",
                            "text": "Hold back blame and call for an independent international investigation",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "uk_europe": 1,
                                    "civilian_stability": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "cyber"
                                        ],
                                        "title": "International Forensic Inquiry Gains Backing",
                                        "message": "Calling for an impartial technical investigation builds European solidarity and reassures the public, though friction with Moscow continues.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "cyber",
                    "text": "Should British intelligence launch a counter-attack against the hackers?",
                    "options": [
                        {
                            "id": "opt_log_5",
                            "text": "Launch a secret cyber strike against foreign hacker infrastructure",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "military_escalation": 2,
                                    "uk_us": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_cyber_exposure",
                                        "probability": 0.5,
                                        "delayMs": 15000
                                    }
                                ],
                                "unlockEvents": [
                                    "ev_power_grid_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "cyber",
                                            "PM"
                                        ],
                                        "title": "Covert Cyber Strike Hits Supply Networks",
                                        "messages": [
                                            "British offensive cyber operators breach adversary logistics servers, sharply escalating confrontation while risking allied disapproval from Washington.",
                                            "GCHQ launches retaliatory intrusions against foreign hacker infrastructure, driving military escalation up."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Washington Uneasy Over Unilateral Cyber Strike",
                                        "message": "US officials express concern that Britain carried out offensive cyber strikes without prior allied coordination.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_log_6",
                            "text": "Focus strictly on strengthening our own firewalls and defences",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1
                                },
                                "unlockEvents": [
                                    "ev_power_grid_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "cyber",
                                            "home"
                                        ],
                                        "title": "NCSC Hardens National Infrastructure Firewalls",
                                        "messages": [
                                            "Focusing strictly on defensive network isolation avoids further cyber escalation while teams patch transport and energy gateways.",
                                            "NCSC containment teams reinforce power and rail network firewalls without triggering counter-strikes."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "alert"
        },
        {
            "id": "ev_cyber_exposure",
            "stage": "stage_2",
            "name": "Allied Leak: UK Cyber Strike Exposed",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                51.5,
                -0.1
            ],
            "image": "ev_cyber_exposure",
            "description": "Leaked intelligence reveals Britain secretly hacked Russian supply networks. The US President publicly warns Britain against reckless escalation.",
            "roleDescriptions": {
                "foreign": "The White House says our attack risks dragging NATO into war. Other European allies agree.",
                "media": "Front-page headlines accuse Britain of starting a cyber war. Russian TV calls it an act of war.",
                "cyber": "Our digital trail was spotted. Foreign intelligence services have confirmed British involvement."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How should Britain respond to the public leak?",
                    "options": [
                        {
                            "id": "opt_exp_1",
                            "text": "Defend our cyber operations publicly as necessary self-defence",
                            "effects": {
                                "scores": {
                                    "uk_us": -2,
                                    "uk_europe": -1,
                                    "military_escalation": 1,
                                    "uk_russia": 1,
                                    "civilian_stability": 1
                                },
                                "unlockEvents": [
                                    "ev_us_neutrality"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Public Defence of Cyber Strike Strains Alliances",
                                        "message": "Defending covert strikes as self-defence wins domestic backing, yet severely damages UK–US trust, unsettles European partners, and heightens friction with Moscow.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "media"
                                        ],
                                        "title": "Robust Stance Rallies Domestic Press",
                                        "message": "British newspapers praise the refusal to apologise under pressure, lifting domestic morale despite allied criticism.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK DEFENDS CYBER STRIKE — US & EU ALLIES ALARMED",
                                        "message": "London stands by covert cyber action; sharp rift opens with Washington.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_exp_2",
                            "text": "Deny that the British government authorized the attack",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_russia": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "media"
                                        ],
                                        "title": "Official Denial Eases Allied Fallout",
                                        "message": "Denying government authorisation gives Washington room to steady UK–US cooperation, though Moscow rejects the denial fiercely.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_exp_3",
                            "text": "Request an emergency meeting with NATO allies to explain our actions",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_europe": 1,
                                    "military_escalation": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Emergency NATO Consultations Rebuild Trust",
                                        "message": "Candid briefings at NATO headquarters reassure Washington and European capitals, easing alliance friction and dialling back escalation.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "cyber",
                    "text": "What should we do with our other ongoing cyber operations?",
                    "options": [
                        {
                            "id": "opt_exp_4",
                            "text": "Pause all offensive hacks to cool down tensions",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_us": 1,
                                    "uk_europe": 1,
                                    "uk_russia": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "cyber",
                                            "foreign"
                                        ],
                                        "title": "Offensive Cyber Operations Suspended",
                                        "messages": [
                                            "Standing down offensive cyber teams cools escalation immediately and repairs relations with Washington, Europe, and Moscow.",
                                            "GCHQ halts active intrusion operations, easing allied diplomatic pressure across Brussels and Washington."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_exp_5",
                            "text": "Continue secret cyber operations against Russian targets",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_us": -2,
                                    "uk_europe": -1,
                                    "uk_russia": 2
                                },
                                "unlockEvents": [
                                    "ev_us_neutrality"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "cyber",
                                            "PM"
                                        ],
                                        "title": "Covert Cyber Campaign Continues Under Pressure",
                                        "messages": [
                                            "Pressing ahead with offensive strikes despite the leak sharply escalates confrontation with Russia and alienates US and European allies.",
                                            "Sustained GCHQ cyber operations draw fierce Kremlin anger while pushing UK–US trust toward breaking point."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Special Relationship Reaches Breaking Point",
                                        "message": "Washington warns that continued unilateral British cyber strikes could force the US to distance itself from the crisis.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK CONTINUES CYBER OPS — ALLIED RIFT DEEPENS",
                                        "message": "Offensive cyber campaign persists despite leak; Washington and Moscow warn of fallout.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "sound": "teletype"
        },
        {
            "id": "ev_russia_hub_explosion",
            "stage": "stage_2",
            "name": "Explosion at Russian Military Rail Hub",
            "repeatable": false,
            "location": [
                55.75,
                37.61
            ],
            "image": "ev_russia_hub_explosion",
            "description": "A huge explosion has destroyed a key military transport depot in western Russia. The Russian government formally accuses Britain of planting the bomb.",
            "roleDescriptions": {
                "foreign": "Moscow summoned our ambassador and warned that Britain will face direct retaliation.",
                "media": "British newspapers are questioning whether our special forces carried out the attack.",
                "home": "Security services warn that Russian agents in the UK may launch revenge attacks."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How should Britain reply to the direct Russian accusation?",
                    "options": [
                        {
                            "id": "opt_hub_1",
                            "text": "Firmly deny involvement and demand Russia show proof",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "uk_us": 1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "media"
                                        ],
                                        "title": "Whitehall Demands Proof From Moscow",
                                        "messages": [
                                            "Britain's firm denial rallies Washington and European partners behind London, while diplomatic friction with Moscow continues to climb.",
                                            "Allies back Whitehall's demand for evidence over the rail hub blast as Kremlin rhetoric sharpens."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_hub_2",
                            "text": "Propose an independent international investigation into the blast",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "uk_europe": 1,
                                    "uk_us": 1,
                                    "military_escalation": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Independent Inquiry Wins Allied Backing",
                                        "message": "Proposing an impartial investigation eases immediate military tension and unites US and European allies, even as Kremlin hostility lingers.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_hub_3",
                            "text": "Warn Russia that making false accusations will not intimidate Britain",
                            "effects": {
                                "scores": {
                                    "uk_russia": 2,
                                    "military_escalation": 1,
                                    "uk_europe": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "media"
                                        ],
                                        "title": "Defiant Rebuke Hardens Stand-Off With Moscow",
                                        "message": "Bluntly rejecting Russian threats spikes bilateral hostility and escalation while unsettling European allies pushing for restraint.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "LONDON DEFIES MOSCOW OVER RAIL HUB BLAST",
                                        "message": "Britain rejects Kremlin threats; bilateral tension and escalation intensify.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_hub_4",
                            "text": "Reach out via backchannels to calm Russian leaders and avoid retaliation",
                            "effects": {
                                "scores": {
                                    "uk_russia": -1,
                                    "military_escalation": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Backchannel Outreach Eases Tension",
                                        "message": "Confidential diplomatic contact lowers the temperature in Moscow and reduces immediate pressure for Russian retaliation.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "defence",
                    "text": "Should UK military bases increase their security level?",
                    "options": [
                        {
                            "id": "opt_hub_5",
                            "text": "Put all British military bases on maximum terrorist threat alert",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 1,
                                    "uk_us": 1,
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_akrotiri_strike",
                                    "ev_kinetic_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "home"
                                        ],
                                        "title": "UK Bases Placed on Maximum Threat Alert",
                                        "messages": [
                                            "Armed patrols and air-defence crews lock down all UK bases at home and abroad; Washington backs the posture, though public unease and escalation jump.",
                                            "Maximum security lockdown takes effect across British garrisons and airfields, reassuring US allies while alarming local communities."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ALL UK BASES AT MAXIMUM THREAT ALERT",
                                        "message": "Armed forces lock down domestic and overseas bases amid fears of Russian retaliation.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_hub_6",
                            "text": "Keep current security levels to avoid alarming the public",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "uk_us": 1
                                },
                                "unlockEvents": [
                                    "ev_akrotiri_strike",
                                    "ev_kinetic_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "home"
                                        ],
                                        "title": "Baseline Garrison Security Retained",
                                        "messages": [
                                            "Maintaining existing base alert levels prevents domestic alarm and satisfies Washington's call for steady nerves, though military tension stays elevated.",
                                            "British bases hold standard security posture to calm the home front while intelligence watches for retaliatory threats."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "explosion"
        },
        {
            "id": "ev_undersea_cables",
            "stage": "stage_2",
            "name": "Undersea Internet Cables Cut",
            "image": "ev_undersea_cables",
            "conditions": {
                "minScores": {
                    "uk_russia": 3
                }
            },
            "repeatable": false,
            "location": [
                50,
                -10
            ],
            "description": "Undersea internet and communications cables connecting Britain to North America have been cut on the seabed. Financial markets pause trading as blackouts hit communications.",
            "roleDescriptions": {
                "cyber": "Sensors show the cables were deliberately cut deep under water by deep-sea submersibles.",
                "foreign": "No country has claimed responsibility. Allies are scrambling to reroute satellite communications.",
                "home": "Cash machines and card payment machines in shops are failing across the country."
            },
            "decisions": [
                {
                    "role": "cyber",
                    "text": "How should our cyber teams respond to the cable outage?",
                    "options": [
                        {
                            "id": "opt_cab_1",
                            "text": "Reroute essential government and banking data through secure military satellites",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": -1
                                },
                                "unlockEvents": [
                                    "ev_logistics_failure"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "cyber",
                                            "home"
                                        ],
                                        "title": "Banking Data Rerouted via Military Satellites",
                                        "messages": [
                                            "NCSC shifts urgent Treasury and clearing-bank traffic onto Skynet military satellites, restoring retail payments while reducing defence bandwidth.",
                                            "Military satellite links restore essential financial networks nationwide, steadying public order at a cost to armed forces comms capacity."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Skynet Capacity Shared With Civilian Grid",
                                        "message": "Diverting defence satellite channels to rescue civilian banking trims military communications readiness.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_cab_2",
                            "text": "Publicly call out Russia for seabed sabotage and ask allies to inspect the damage",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "uk_us": 1,
                                    "uk_europe": 1,
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_logistics_failure"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "cyber"
                                        ],
                                        "title": "Seabed Sabotage Attributed to Russia",
                                        "message": "Publicly naming Russian sabotage brings US and European survey ships to inspect the cut cables, though markets wobble and confrontation with Moscow deepens.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "TRANSATLANTIC CABLES CUT — UK BLAMES SABOTAGE",
                                        "message": "Britain calls on NATO allies to inspect seabed damage; banking disruptions persist.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "sonar"
        },
        {
            "id": "ev_dissident_results",
            "stage": "stage_2",
            "name": "Nerve Agent Confirmed in Salisbury Attack",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                51.06,
                -1.79
            ],
            "image": "ev_dissident_results",
            "description": "Hospital tests confirm the unconscious defector was poisoned with a military-grade nerve agent. Intelligence points to Russian military assassins.",
            "roleDescriptions": {
                "foreign": "Our allies are waiting to see how Britain reacts. Showing weakness will invite more assassinations.",
                "home": "Chemical weapons used on British soil demands an immediate and decisive response."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "What diplomatic action should Britain take against Russia?",
                    "options": [
                        {
                            "id": "opt_dr1",
                            "text": "Expel 23 Russian diplomats from London and publicly blame Russian state intelligence",
                            "effects": {
                                "scores": {
                                    "uk_russia": 2,
                                    "civilian_stability": 1,
                                    "uk_europe": 1
                                },
                                "unlockEvents": [
                                    "ev_oligarch_sanctions",
                                    "ev_chemical_attempt"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "23 Russian Diplomats Expelled From London",
                                        "message": "Britain orders the largest diplomatic expulsion in decades and formally blames Moscow for the Salisbury nerve-agent attack, rallying European solidarity amid severe rupture with Russia.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Decisive Attribution Reassures Public",
                                        "messages": [
                                            "Swift action against suspected Russian intelligence officers boosts domestic confidence in national security.",
                                            "Public backing rises sharply as Whitehall takes visible measures against suspected Kremlin operatives in London."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "SALISBURY NERVE AGENT — 23 RUSSIAN DIPLOMATS EXPELLED",
                                        "message": "UK blames Russian state intelligence; European allies back decisive British response.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_dr2",
                            "text": "Demand an international chemical weapons inspection before taking any action",
                            "effects": {
                                "scores": {
                                    "uk_europe": -1,
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_oligarch_sanctions",
                                    "ev_chemical_attempt"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "home"
                                        ],
                                        "title": "Delayed Response Draws Allied & Domestic Criticism",
                                        "message": "Waiting for international inspectors frustrates European partners and leaves British citizens uneasy after a chemical weapon attack on UK soil.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "sound": "teletype"
        },
        {
            "id": "ev_sub_detection",
            "stage": "stage_2",
            "name": "Russian Submarine Detected Near Faslane",
            "repeatable": false,
            "sound": "sonar",
            "location": [
                56,
                -5.5
            ],
            "image": "ev_sub_detection",
            "autoEffects": {
                "revealAssets": [
                    "a_rus_sub_faslane"
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence"
                        ],
                        "title": "Acoustic Contact: Russian Attack Sub Off Faslane",
                        "messages": [
                            "Clyde sonar arrays plot a Russian Severodvinsk-class submarine on the tactical map just outside territorial waters near HMNB Clyde.",
                            "Undersea listening posts confirm a hostile Russian attack submarine probing approaches to Britain's nuclear deterrent base."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "PM",
                            "foreign"
                        ],
                        "title": "Hostile Submarine Probing Trident Approaches",
                        "message": "Naval intelligence warns the intrusion directly tests Royal Navy anti-submarine defences guarding HMNB Clyde.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SUBMARINE CONTACT — RUSSIAN BOAT OFF HMNB CLYDE",
                        "message": "Sonar reveals hostile attack submarine near Faslane deterrent approaches.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
            },
            "description": "Sonar listening posts detect a Russian attack submarine creeping close to HMNB Clyde, where our Trident nuclear submarines operate.",
            "roleDescriptions": {
                "defence": "The submarine is just outside our territorial waters, testing how fast our patrol boats respond.",
                "foreign": "This is a bold attempt to track and threaten Britain's nuclear submarines."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "What orders do you give to our anti-submarine forces?",
                    "options": [
                        {
                            "id": "opt_sub1",
                            "text": "Hunt the submarine aggressively with active pinging sonar and Merlin helicopters",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_sub_surfaces"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_sub_breaks_contact",
                                        "delayMs": 75000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence"
                                                ],
                                                "title": "Contact Fading in North Channel Thermocline",
                                                "messages": [
                                                    "Heavy acoustic layering off the Clyde is scattering active sonar returns; ASW crews warn the submarine may slip the net.",
                                                    "Merlin operators report erratic sonar echoes as the Russian boat dives beneath a deep thermal layer."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_giuk_tanker_collision",
                                        "delayMs": 85000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "foreign"
                                                ],
                                                "title": "Fogbound Surface Alert in GIUK Gap",
                                                "messages": [
                                                    "Urgent radio traffic from North Atlantic escorts reports Russian destroyers closing dangerously on an RFA tanker in poor visibility.",
                                                    "Surface patrols in the GIUK Gap flag risky close-quarters Russian warship manoeuvres around a British supply tanker."
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
                                            "defence"
                                        ],
                                        "title": "Active ASW Hunt Launched Off Faslane",
                                        "messages": [
                                            "Merlin helicopters dip active sonar alongside Type 23 frigates, driving up ASW readiness while sharply escalating underwater confrontation near the Clyde.",
                                            "Aggressive active pinging boxes in the intruder off Faslane, boosting readiness at steep escalation cost."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "PM",
                                            "foreign"
                                        ],
                                        "title": "Aggressive Pursuit Raises Underwater Flashpoint Risk",
                                        "message": "Active sonar prosecution forces the Russian submarine into evasive manoeuvres, raising the danger of an undersea incident.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ACTIVE SUBMARINE HUNT OFF FASLANE",
                                        "message": "Merlin helicopters and Royal Navy frigates ping Russian sub; escalation jumps.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_sub2",
                            "text": "Quietly track the submarine using passive sonar to record its acoustic engine signature",
                            "effects": {
                                "scores": {
                                    "military_readiness": 2,
                                    "military_escalation": -1
                                },
                                "unlockEvents": [
                                    "ev_sub_surfaces"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_sub_breaks_contact",
                                        "delayMs": 70000,
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence"
                                                ],
                                                "title": "Passive Contact Weakening Near Clyde Sill",
                                                "messages": [
                                                    "Passive towed-array operators report the submarine's quiet acoustic trail fading into North Channel background noise.",
                                                    "Submarine watch logs weakening passive bearings as the intruder creeps toward deeper Atlantic waters."
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
                                            "defence"
                                        ],
                                        "title": "Acoustic Signature Logged via Passive Sonar",
                                        "messages": [
                                            "Astute-class and Type 26 passive arrays capture vital propeller and reactor acoustic fingerprints without alerting the intruder, boosting readiness and easing escalation.",
                                            "Silent tracking builds a valuable acoustic library on the Russian boat while avoiding an aggressive maritime confrontation."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "PM"
                                        ],
                                        "title": "Silent Tracking Avoids Underwater Flashpoint",
                                        "message": "Measured restraint preserves intelligence advantage while keeping the Clyde approaches calm.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ],
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt_sub2"
                }
            ],
            "requiresUnlock": true
        },
        {
            "id": "ev_oligarch_sanctions",
            "stage": "stage_2",
            "name": "Freezing Russian Oligarch Assets",
            "repeatable": false,
            "location": [
                51.5,
                -0.1
            ],
            "image": "ev_oligarch_sanctions",
            "description": "With tensions mounting, MPs demand immediate action to seize mansions and freeze bank accounts belonging to Russian billionaires in London.",
            "roleDescriptions": {
                "home": "The public strongly supports seizing oligarch mansions and cracking down on corrupt money in London.",
                "treasury": "Sudden property seizures might face court challenges, but doing nothing looks cowardly."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "How far should we go with financial sanctions against Russian oligarchs?",
                    "options": [
                        {
                            "id": "opt_os1",
                            "text": "Immediately freeze all oligarch bank accounts and seize their UK mansions and superyachts",
                            "effects": {
                                "scores": {
                                    "uk_russia": 2,
                                    "civilian_stability": 1
                                },
                                "unlockEvents": [
                                    "ev_cyber_london"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Oligarch Mansions & Accounts Frozen Across London",
                                        "messages": [
                                            "National Crime Agency officers freeze billions in Russian billionaire assets and seal Belgravia mansions, winning strong public approval while infuriating Moscow.",
                                            "Sweeping asset seizures against Kremlin-linked billionaires boost public confidence in the government's resolve."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign",
                                            "cyber"
                                        ],
                                        "title": "Kremlin Threatens Retaliation Over Asset Seizures",
                                        "message": "Moscow denounces the seizures as state theft, and NCSC warns Russian state hackers are preparing financial retaliation against the City of London.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK SEIZES OLIGARCH MANSIONS & FREEZES BILLIONS",
                                        "message": "Government cracks down on Kremlin wealth in London; Moscow vows retaliation.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_os2",
                            "text": "Introduce stricter financial audits and wealth checks without immediate seizures",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "uk_europe": -1
                                },
                                "unlockEvents": [
                                    "ev_cyber_london"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Cautious Financial Audits Spark Public Backlash",
                                        "messages": [
                                            "MPs and newspapers accuse Whitehall of going soft on dirty money as Russian billionaires move funds offshore ahead of slow financial audits.",
                                            "Holding back from immediate property seizures frustrates voters and weakens domestic confidence."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "European Allies Question Soft London Sanctions",
                                        "message": "EU capitals express disappointment that Britain stopped short of freezing Kremlin-linked holdings in the City.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "teletype"
        },
        {
            "id": "ev_undersea_cable",
            "stage": "stage_2",
            "name": "Russian Spy Ship Loitering Over Sea Cables",
            "repeatable": false,
            "location": [
                50,
                -6.5
            ],
            "image": "ev_undersea_cable",
            "description": "A Russian oceanographic research ship equipped with deep-sea robot submarines is lingering directly above transatlantic communications cables off Cornwall.",
            "roleDescriptions": {
                "defence": "The ship carries mini-submersibles capable of tapping or severing underwater internet lines.",
                "cyber": "If those undersea cables are cut, British internet and financial links to America will shut down."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should the Royal Navy deal with the Russian research vessel?",
                    "options": [
                        {
                            "id": "opt_uc1",
                            "text": "Send a Royal Navy frigate to sail between the ship and the cables, ordering them to move on",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "uk_russia": 1
                                },
                                "unlockEvents": [
                                    "ev_undersea_cables"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "cyber"
                                        ],
                                        "title": "Royal Navy Frigate Blocks Russian Cable Ship",
                                        "messages": [
                                            "A Type 23 frigate manoeuvres directly across the Russian research vessel's stern off Cornwall, forcing her away from the transatlantic cables while raising maritime tension.",
                                            "Royal Navy bridge warnings compel the Russian spy ship to haul in her submersibles, increasing bilateral friction."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL NAVY INTERCEPTS RUSSIAN SPY SHIP OFF CORNWALL",
                                        "message": "British frigate forces Russian research vessel away from transatlantic sea cables.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_uc2",
                            "text": "Shadow the ship quietly from several miles away to photograph their robotic submersibles",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_us": -1
                                },
                                "unlockEvents": [
                                    "ev_undersea_cables"
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_undersea_cables",
                                        "delayMs": 45000,
                                        "probability": 0.7
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "cyber"
                                        ],
                                        "title": "Distant Surveillance Leaves Sea Cables Exposed",
                                        "messages": [
                                            "Watching from over the horizon avoids a naval clash, but leaves the Russian ship free to lower deep-sea submersibles onto the transatlantic cables.",
                                            "Royal Navy lookouts record imagery of submersible recovery gear from afar while NCSC warns the cables remain vulnerable."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Washington Frustrated by Passive Cable Patrol",
                                        "message": "US officials complain that failing to challenge the spy ship puts shared UK–US communications trunks at acute risk.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_board_spy_trawler",
                            "text": "Board and detain the identified shadow-fleet spy trawler with Royal Marines!",
                            "conditions": {
                                "visibleAssets": [
                                    "a_rus_spy_trawler"
                                ],
                                "assetStates": {
                                    "a_rus_spy_trawler": "operational"
                                }
                            },
                            "effects": {
                                "assetStateChanges": {
                                    "a_rus_spy_trawler": "detained"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_europe": 1,
                                    "uk_russia": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "cyber"
                                        ],
                                        "title": "Royal Marines Board & Detain Shadow Spy Trawler",
                                        "messages": [
                                            "Royal Marines fast-rope onto the Russian spy trawler, detaining the vessel and seizing intact seabed mapping servers.",
                                            "Commando boarding teams secure the shadow-fleet trawler off Cornwall, neutralising the threat to underwater cables."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Seizure Applauded by European Maritime Allies",
                                        "message": "European partners welcome the decisive seizure of the cable-cutting vessel, while Moscow quietly pulls back other auxiliary ships.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL MARINES SEIZE SUSPECTED RUSSIAN SPY TRAWLER",
                                        "message": "Shadow-fleet vessel detained off UK coast with deep-sea sabotage equipment aboard.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "sonar"
        },
        {
            "id": "ev_airspace_intercept",
            "stage": "stage_3",
            "name": "Near-Miss Over the Atlantic",
            "sound": "klaxon",
            "repeatable": true,
            "location": [
                60,
                -10
            ],
            "image": "ev_airspace_intercept",
            "description": "RAF Typhoons scrambled to intercept Russian spy planes skirting British airspace. A Russian jet cut directly across a passenger airliner, nearly causing a mid-air disaster.",
            "roleDescriptions": {
                "defence": "Russian spy planes flew far closer to commercial flight paths than usual.",
                "media": "Russian media claims British fighter jets flew aggressively and endangered civilian passengers.",
                "foreign": "The Ministry of Defence insists our Typhoon pilots followed all safety rules."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should the RAF respond to future Russian flights near UK airspace?",
                    "options": [
                        {
                            "id": "opt_air_1",
                            "text": "Send more fighter patrols to aggressively intercept any approaching aircraft",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 1,
                                    "uk_us": 1,
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_akrotiri_strike",
                                    "ev_raf_bases_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Aggressive Typhoon Patrols Box In Russian Aircraft",
                                        "messages": [
                                            "Additional Quick Reaction Alert Typhoons crowd approaching Russian aircraft far out over the Atlantic, winning US backing while sharply escalating air tensions.",
                                            "Hard-edged RAF air intercepts demonstrate resolve to Washington, though Moscow warns of a mid-air clash."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Transatlantic Flights Rerouted Amid Air Stand-Off",
                                        "message": "Civilian airlines divert passenger routes away from the North Atlantic intercept zone, unsettling travellers.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "RAF EXPANDS AGGRESSIVE NORTH ATLANTIC INTERCEPTS",
                                        "message": "Extra Typhoon patrols ordered to confront Russian aircraft; air escalation rises.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_air_2",
                            "text": "Stick to standard escort distances to avoid accidental collisions",
                            "effects": {
                                "scores": {
                                    "military_escalation": 0
                                },
                                "unlockEvents": [
                                    "ev_akrotiri_strike",
                                    "ev_raf_bases_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "RAF Maintains Standard Safe Escort Separation",
                                        "messages": [
                                            "Typhoon pilots shadow Russian aircraft at disciplined international safety distances, avoiding an accidental mid-air collision.",
                                            "Standard NATO intercept separation keeps UK airspace monitored without adding fuel to the confrontation."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "foreign",
                    "text": "What is our diplomatic message to Russia?",
                    "options": [
                        {
                            "id": "opt_air_3",
                            "text": "Privately contact Moscow to set up rules to prevent air crashes",
                            "effects": {
                                "scores": {
                                    "uk_russia": -1,
                                    "uk_us": 1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "defence"
                                        ],
                                        "title": "Air Safety Deconfliction Protocol Agreed",
                                        "messages": [
                                            "Quiet diplomatic outreach establishes emergency radio frequencies with Russian air command, cooling bilateral friction and earning praise from US and European allies.",
                                            "Allies welcome Whitehall's air-safety deconfliction channel as near-miss risks around commercial airliners ease."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_air_4",
                            "text": "Publicly release cockpit video proving the Russian pilot flew dangerously",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "military_escalation": 1,
                                    "uk_us": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "media"
                                        ],
                                        "title": "Cockpit Video Exposes Reckless Russian Jet Manoeuvre",
                                        "messages": [
                                            "Declassified Typhoon HUD footage dominates global broadcasts and wins US support, while angering Moscow and sharpening military tension.",
                                            "Releasing the gun-camera video rebuts Russian propaganda conclusively, though bilateral hostility rises."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "MOD RELEASES COCKPIT VIDEO OF ATLANTIC NEAR-MISS",
                                        "message": "Typhoon footage proves Russian jet cut across civilian airliner path.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true
        },
        {
            "id": "ev_sub_surfaces",
            "stage": "stage_3",
            "name": "Russian Nuclear Submarine in the Channel",
            "image": "ev_sub_surfaces",
            "conditions": {
                "maxScores": {
                    "civilian_stability": 4
                }
            },
            "repeatable": false,
            "location": [
                51,
                1.5
            ],
            "description": "A massive Russian ballistic missile submarine surfaces right in the English Channel near Dover, in full view of passenger ferries. Videos are going viral online.",
            "roleDescriptions": {
                "defence": "The submarine surfaced on purpose to intimidate the British public.",
                "media": "Videos of the submarine have millions of views. Tabloids run panic headlines about nuclear war.",
                "home": "People are terrified. Phone lines to police and local councils are jammed with calls."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should the Royal Navy deal with the surfaced submarine?",
                    "options": [
                        {
                            "id": "opt_sub_1",
                            "text": "Surround the submarine with Royal Navy warships and patrol helicopters until it leaves",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "uk_russia": 1,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_portsmouth_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "media"
                                        ],
                                        "title": "Royal Navy Box-Escort Forces Russian Sub Down-Channel",
                                        "messages": [
                                            "Royal Navy frigates and Wildcat helicopters box in the surfaced Russian submarine off Dover, demonstrating high readiness while intensifying confrontation with Moscow.",
                                            "Close naval escort herds the Russian boat through the Dover Strait under visible British guns, lifting readiness as tension climbs."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL NAVY WARSHIPS SURROUND RUSSIAN SUB OFF DOVER",
                                        "message": "British frigates and helicopters escort surfaced nuclear submarine out of the Channel.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_sub_2",
                            "text": "Monitor the submarine from a distance to avoid an accidental confrontation",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_portsmouth_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "home",
                                            "media"
                                        ],
                                        "title": "Distant Shadowing Calms Sea Lane But Rattles Public",
                                        "messages": [
                                            "Keeping Royal Navy ships over the horizon reduces immediate clash risk, but ferry passengers filming the unchallenged Russian submarine trigger public alarm.",
                                            "Avoiding a close naval showdown lowers military tension while viral clips of the unescorted submarine erode public confidence."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "media",
                    "text": "How should Downing Street address the public panic?",
                    "options": [
                        {
                            "id": "opt_sub_3",
                            "text": "Broadcast a live address reassuring the public that the submarine is being tracked and cannot harm them",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "Live Downing Street Briefing Calms Coastal Panic",
                                        "messages": [
                                            "Clear live television assurances that the Royal Navy has tracked every mile of the submarine's transit steady public nerves across Kent and the South East.",
                                            "Authoritative broadcast updates counter tabloid alarm and restore calm along the Channel coast."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_sub_4",
                            "text": "Release a brief written statement reminding the public that the Channel is an international waterway",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "Dry Legal Statement Fails to Quell Viral Panic",
                                        "messages": [
                                            "Quoting maritime transit law in a short press release looks out of touch as terrifying videos of the Russian submarine flood social media.",
                                            "Voters dismiss Whitehall's low-key written statement as evasive, deepening anxiety across southern coastal towns."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "sonar"
        },
        {
            "id": "ev_akrotiri_strike",
            "stage": "stage_3",
            "name": "Missile Strike on RAF Base in Cyprus",
            "image": "ev_akrotiri_strike",
            "conditions": {
                "minScores": {
                    "military_escalation": 3
                }
            },
            "repeatable": false,
            "location": [
                34.58,
                32.94
            ],
            "description": "Russian hypersonic cruise missiles slam into RAF Akrotiri in Cyprus, destroying two transport planes, cratering the runway, and killing twelve servicemen.",
            "roleDescriptions": {
                "defence": "Our main Mediterranean airbase is badly damaged. Runways are blocked with debris.",
                "foreign": "Striking a British military base is an act of war. Russia claims the base launched attacks against them."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should Britain respond to the missile strike on RAF Akrotiri?",
                    "options": [
                        {
                            "id": "opt_akr_1",
                            "text": "Launch immediate airstrikes against the Russian missile batteries that fired",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 2,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_raf_bases_strike",
                                    "ev_kinetic_strike"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_iskander_mobile",
                                        "delayMs": 75000,
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "foreign"
                                                ],
                                                "title": "Kaliningrad Iskander Launchers Leaving Garrison",
                                                "messages": [
                                                    "NATO radar satellites spot road-mobile Iskander-M missile launchers dispersing from Kaliningrad bunkers after the British counter-strike.",
                                                    "Allied reconnaissance flags Russian ballistic missile batteries moving into forward forest firing positions."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_channel_tunnel_alert",
                                        "delayMs": 80000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "home",
                                                    "cyber"
                                                ],
                                                "title": "Sabotage Chatter Targets Folkestone Rail Terminal",
                                                "messages": [
                                                    "Anglo-French counter-terror analysts intercept urgent coded traffic pointing to a retaliatory plot against the Channel Tunnel.",
                                                    "Border security sensors flag suspicious reconnaissance activity near Eurotunnel freight approaches in Kent."
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
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "RAF Storm Shadows Destroy Russian Launch Batteries",
                                        "messages": [
                                            "Surviving RAF strike jets fire Storm Shadow cruise missiles that obliterate the Russian coastal batteries, restoring combat momentum while sending escalation soaring.",
                                            "Immediate counter-strikes smash the Russian missile launchers responsible for Akrotiri, pushing Britain and Russia into direct armed clash."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "Direct Kinetic Exchange With Russian Forces",
                                        "message": "Moscow vows homeland retaliation after British missiles destroy Russian launchers in the Eastern Mediterranean.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK LAUNCHES RETALIATORY AIRSTRIKES AFTER AKROTIRI ATTACK",
                                        "message": "RAF jets strike Russian missile batteries in response to Cyprus base bombing.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_akr_2",
                            "text": "Evacuate non-essential personnel and repair the runway behind air defences",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": -1
                                },
                                "unlockEvents": [
                                    "ev_kinetic_strike"
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_secret_moscow_offer",
                                        "delayMs": 80000,
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "foreign",
                                                    "PM"
                                                ],
                                                "title": "Swiss Intermediaries Signal Urgent Moscow Message",
                                                "messages": [
                                                    "Diplomatic couriers in Geneva report Russian officials seeking a confidential channel following Britain's restraint over Akrotiri.",
                                                    "Neutral Swiss diplomats relay word of a potential Kremlin pause proposal on the backchannel."
                                                ],
                                                "severity": "info",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_iskander_mobile",
                                        "delayMs": 85000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "defence",
                                                    "foreign"
                                                ],
                                                "title": "Satellite Warning: Iskander Movement in Kaliningrad",
                                                "messages": [
                                                    "Overhead imagery detects Russian mobile ballistic missile units deploying out of Kaliningrad depots.",
                                                    "NATO intelligence warns that Russian Iskander-M launchers are dispersing into field hides near the Polish border."
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
                                            "defence",
                                            "home"
                                        ],
                                        "title": "Akrotiri Families Evacuated as Engineers Repair Runway",
                                        "messages": [
                                            "Royal Engineers patch the cratered Cyprus runway under Sky Sabre missile cover while families evacuate safely, reassuring the public at a temporary cost to air readiness.",
                                            "Focusing on base recovery and casualty evacuation steadies domestic nerves, though Mediterranean strike readiness drops during repairs."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_akr_3",
                            "text": "Ask NATO to invoke collective defence under Article 5",
                            "effects": {
                                "scores": {
                                    "uk_europe": 1,
                                    "uk_us": 1,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_article5_ambiguity",
                                    "ev_kinetic_strike"
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_article5_ambiguity",
                                        "delayMs": 25000,
                                        "probability": 1
                                    }
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Britain Formally Requests NATO Article 5 Activation",
                                        "messages": [
                                            "Emergency North Atlantic Council sessions convene in Brussels after Britain calls for collective defence over the Akrotiri strike, rallying US and European attention as tension rises.",
                                            "Invoking Article 5 draws immediate solidarity from Washington and key European capitals while elevating alliance war readiness."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "BRITAIN CALLS FOR NATO ARTICLE 5 AFTER CYPRUS STRIKE",
                                        "message": "Emergency session convenes in Brussels following deadly missile attack on RAF Akrotiri.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ],
                    "timeLimitMs": 65000,
                    "defaultOptionId": "opt_akr_2"
                }
            ],
            "requiresUnlock": true,
            "sound": "explosion"
        },
        {
            "id": "ev_kinetic_strike",
            "stage": "stage_4",
            "name": "Explosion at UK Military Supply Base",
            "sound": "explosion",
            "conditions": {
                "minScores": {
                    "military_escalation": 3
                }
            },
            "repeatable": false,
            "location": [
                34.5,
                33
            ],
            "image": "ev_kinetic_strike",
            "description": "A large blast damages a British military logistics warehouse supporting overseas forces. Russian state media hints that Britain had it coming.",
            "roleDescriptions": {
                "defence": "The explosion disrupted ammunition deliveries and looks like a planned sabotage attack.",
                "foreign": "The Russian Defence Ministry warned: 'Britain must reconsider its aggressive moves or face consequences.'",
                "home": "Public fear is rising. People worry the UK is sliding into a direct war with a nuclear superpower."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "This is a direct attack on a British military base. How do we respond diplomatically?",
                    "options": [
                        {
                            "id": "opt_kin_1",
                            "text": "Trigger emergency NATO consultations under Article 4 to rally our allies",
                            "effects": {
                                "scores": {
                                    "uk_europe": 1,
                                    "uk_us": 1,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_article5_ambiguity"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "NATO Article 4 Consultations Rally Allied Backing",
                                        "messages": [
                                            "Allied ambassadors convene under Article 4 to condemn the sabotage of British supply lines, strengthening US and European unity while military tension edges higher.",
                                            "Emergency NATO consultations secure joint intelligence support from Washington and Brussels as confrontation deepens."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_kin_2",
                            "text": "Open immediate secret talks with Moscow to freeze the conflict",
                            "effects": {
                                "scores": {
                                    "uk_russia": -1,
                                    "military_escalation": -1,
                                    "uk_us": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Secret Ceasefire Outreach Cools Tempo",
                                        "messages": [
                                            "Quiet diplomatic contact with Moscow lowers immediate escalation and bilateral friction, though Washington objects to Britain negotiating unilaterally after a base attack.",
                                            "Backchannel dialogue tempers Kremlin rhetoric at the cost of friction with the White House."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "defence",
                    "text": "What military action should we take in response?",
                    "options": [
                        {
                            "id": "opt_kin_3",
                            "text": "Launch a retaliatory air strike against a Russian logistics depot",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 2
                                },
                                "unlockEvents": [
                                    "ev_raf_bases_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "British Air Strike Destroys Russian Supply Depot",
                                        "messages": [
                                            "Precision munitions flatten a Russian military logistics hub in direct tit-for-tat retaliation, sharply escalating the conflict and infuriating Moscow.",
                                            "RAF strike aircraft hit Russian supply infrastructure, driving bilateral hostility and war risk to critical levels."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "RAF BOMBS RUSSIAN LOGISTICS DEPOT IN RETALIATION",
                                        "message": "Direct tit-for-tat air strike hits Russian military supply hub; escalation surges.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_kin_4",
                            "text": "Order Vanguard nuclear submarines to high combat readiness as a warning",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "civilian_stability": -2
                                },
                                "unlockEvents": [
                                    "ev_raf_bases_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "Vanguard Deterrent Placed on High Combat Alert",
                                        "messages": [
                                            "Signalling heightened nuclear readiness sends a stark deterrent message, but spikes global military escalation and triggers severe domestic panic.",
                                            "Raising the alert state of Britain's Trident fleet escalates strategic tension and rattles the public across the UK."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Nuclear Alert Rumours Spark Nationwide Panic",
                                        "message": "Reports that Britain's nuclear submarines are moving to combat readiness cause widespread fear and supermarket hoarding.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK NUCLEAR DETERRENT PLACED ON HIGH COMBAT ALERT",
                                        "message": "Vanguard submarine readiness raised following base explosion; public fear surges.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_kin_5",
                            "text": "Boost perimeter security at all UK bases without launching a strike",
                            "effects": {
                                "scores": {
                                    "military_escalation": 0
                                },
                                "unlockEvents": [
                                    "ev_raf_bases_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "home"
                                        ],
                                        "title": "Base Perimeter Defences Reinforced Without Counter-Strike",
                                        "messages": [
                                            "Extra armed guards, bomb dogs, and counter-drone jammers lock down British supply depots while holding the escalation line steady.",
                                            "Tightened garrison security hardens logistics hubs against further sabotage without provoking an immediate kinetic exchange."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true
        },
        {
            "id": "ev_raf_bases_strike",
            "stage": "stage_4",
            "name": "Cruise Missile Strikes on UK Airbases",
            "sound": "explosion",
            "image": "ev_raf_bases_strike",
            "conditions": {
                "minScores": {
                    "military_escalation": 4
                }
            },
            "repeatable": false,
            "location": [
                53.09,
                -0.16
            ],
            "description": "Long-range cruise missiles fired from Russian warships hit RAF Waddington and RAF Coningsby in Lincolnshire. Hangars are ablaze and radar domes destroyed.",
            "roleDescriptions": {
                "defence": "Our Typhoon fighter squadrons have lost radar support. Ground crews are putting out fires.",
                "home": "Foreign bombs have fallen on English soil for the first time in 80 years. Panic sweeps the country."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How do we protect our remaining fighter squadrons?",
                    "options": [
                        {
                            "id": "opt_raf_1",
                            "text": "Disperse remaining Typhoon jets to civilian airports and motorway strips",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -2,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_airspace_incursion",
                                    "ev_power_grid_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Typhoon Squadrons Dispersed to Emergency Strips",
                                        "messages": [
                                            "RAF ground crews scatter surviving Typhoon fighters across regional airports and prepared motorway strips, preserving combat air power from follow-up missile salvos.",
                                            "Agile combat dispersal keeps British fighter squadrons operational despite the destruction at Coningsby and Waddington."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Armed Fighters on Motorways Terrify Civilians",
                                        "message": "Seeing armed fighter jets operating from closed motorways and regional passenger airports convinces the public that full-scale homeland war has arrived.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "RAF DISPERSES FIGHTER JETS TO CIVILIAN AIRPORTS & MOTORWAYS",
                                        "message": "Typhoons relocate after Lincolnshire airbases hit; public panic deepens.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_raf_2",
                            "text": "Scramble all available fighters to hunt down the Russian warships that fired",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 1
                                },
                                "unlockEvents": [
                                    "ev_airspace_incursion",
                                    "ev_power_grid_strike"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "All Surviving Fighters Scrambled Against Russian Fleet",
                                        "messages": [
                                            "Every airworthy RAF jet launches with anti-ship missiles to hunt the Russian surface group, driving escalation and bilateral confrontation toward all-out war.",
                                            "Massed RAF strike packages surge into the North Sea after the Russian firing ships, sharply escalating the air-sea battle."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "RAF SCRAMBLES STRIKE WINGS TO HUNT RUSSIAN WARSHIPS",
                                        "message": "British jets launch all-out pursuit after cruise missiles hit Lincolnshire bases.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true
        },
        {
            "id": "ev_portsmouth_strike",
            "stage": "stage_4",
            "name": "Naval Base Portsmouth Struck",
            "sound": "explosion",
            "image": "ev_portsmouth_strike",
            "repeatable": false,
            "location": [
                50.81,
                -1.1
            ],
            "description": "Submarine-launched missiles hit Portsmouth Naval Base, damaging dry docks and an escort destroyer. Smoke billows over the Solent.",
            "roleDescriptions": {
                "defence": "Our main naval repair docks are knocked out. Warships must relocate to Devonport and Scotland.",
                "home": "Thousands of residents in Portsmouth are fleeing inland. Roads are completely gridlocked."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "What orders should be given to the Royal Navy fleet?",
                    "options": [
                        {
                            "id": "opt_pms_1",
                            "text": "Order all operational warships to sea immediately to avoid being hit in port",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 1
                                },
                                "assetStateChanges": {
                                    "a_type45": "deployed"
                                },
                                "unlockEvents": [
                                    "ev_faslane_strike_1"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Surface Fleet Sorties From Portsmouth & Deployed to Sea",
                                        "messages": [
                                            "Type 45 Air Defence Destroyers and surviving escorts slip harbour through the smoke into the Channel, boosting fleet readiness while raising maritime escalation.",
                                            "Emergency fleet sortie clears Portsmouth harbour before a second salvo arrives, putting Type 45 destroyers on deployed war patrol."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL NAVY FLEET SORTIES FROM PORTSMOUTH UNDER FIRE",
                                        "message": "Type 45 destroyers deploy to open sea after missile strike on dockyard.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_pms_2",
                            "text": "Keep ships in port to provide anti-aircraft missile cover for civilian cities",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": -1
                                },
                                "assetStateChanges": {
                                    "a_type23": "damaged"
                                },
                                "unlockEvents": [
                                    "ev_faslane_strike_1"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Type 23 Frigate Damaged Guarding Solent Airspace",
                                        "messages": [
                                            "Holding warships along the jetty shields Portsmouth residents with Sea Viper radar cover, but secondary dockyard blasts leave a Type 23 ASW Frigate damaged and reduce fleet readiness.",
                                            "Stationary ships in Portsmouth absorb follow-on shrapnel damage to a Type 23 frigate while providing air-defence cover over the city."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Naval Air-Defence Shield Reassures South Coast",
                                        "message": "Seeing Royal Navy destroyers remain on station to intercept incoming missiles calms evacuating families around the Solent.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true
        },
        {
            "id": "ev_faslane_strike_1",
            "stage": "stage_4",
            "name": "Drone Attack on Faslane Nuclear Base",
            "image": "ev_faslane_strike_1",
            "repeatable": false,
            "location": [
                56.06,
                -4.81
            ],
            "description": "Explosive sea drones attack the outer gates of HMNB Clyde at Faslane in Scotland, where Britain's Trident nuclear submarines are based. Guard boats shoot them down.",
            "roleDescriptions": {
                "defence": "The submarine pens were not damaged, but the enemy is testing our nuclear base defences.",
                "home": "The Scottish public is in shock. Demonstrators surround the base gates calling for nuclear disarmament."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should we protect our nuclear submarine base at Faslane?",
                    "options": [
                        {
                            "id": "opt_fas1_1",
                            "text": "Deploy Royal Marines and anti-submarine nets to seal off the loch completely",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 1
                                },
                                "assetStateChanges": {
                                    "a_rus_sub_faslane": "damaged"
                                },
                                "unlockEvents": [
                                    "ev_faslane_strike_2"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Gareloch Sealed; Intruding Russian Submarine Damaged",
                                        "messages": [
                                            "Royal Marines and anti-submarine barriers lock down Gare Loch while depth-charge countermeasures damage the lurking Russian attack submarine off Faslane.",
                                            "Heavy boom defences and ASW patrols secure HMNB Clyde approaches, damaging the hostile Russian submarine and raising readiness."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL MARINES SEAL FASLANE LOCH — HOSTILE SUB DAMAGED",
                                        "message": "Anti-submarine barriers and patrols secure HMNB Clyde after sea-drone attack.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_fas1_2",
                            "text": "Quietly slip our Vanguard nuclear submarines out to sea where they cannot be found",
                            "effects": {
                                "scores": {
                                    "military_readiness": 2,
                                    "uk_russia": 1
                                },
                                "unlockEvents": [
                                    "ev_faslane_strike_2"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "Vanguard Deterrent Boats Slip Deep Into North Atlantic",
                                        "messages": [
                                            "Britain's remaining Vanguard-class submarines depart Faslane under night cover and vanish into deep Atlantic patrol zones, maximising deterrent survivability.",
                                            "Dispersing the Trident fleet into open ocean guarantees second-strike readiness while signalling unmistakable resolve to Moscow."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "klaxon"
        },
        {
            "id": "ev_faslane_strike_2",
            "stage": "stage_4",
            "name": "Direct Missile Strike on Faslane",
            "image": "ev_faslane_strike_2",
            "conditions": {
                "minScores": {
                    "military_escalation": 4
                }
            },
            "repeatable": false,
            "location": [
                56.06,
                -4.81
            ],
            "description": "A second, heavier missile attack hits Faslane base, setting fuel depots on fire and damaging submarine support docks.",
            "roleDescriptions": {
                "defence": "The nuclear reactors and missiles are safe inside bomb-proof pens, but the base cannot resupply returning subs.",
                "PM": "Attacking Britain's nuclear deterrent is the ultimate red line. Are we on the verge of nuclear war?"
            },
            "decisions": [
                {
                    "role": "PM",
                    "text": "What is Britain's response to an attack on our nuclear deterrent base?",
                    "options": [
                        {
                            "id": "opt_fas2_1",
                            "text": "Issue an ultimatum to Moscow: stop all attacks immediately or face nuclear retaliation",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 2,
                                    "civilian_stability": -2,
                                    "uk_europe": -1
                                },
                                "unlockEvents": [
                                    "ev_nuclear_readiness"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Downing Street Issues Nuclear Deterrent Ultimatum",
                                        "messages": [
                                            "Threatening nuclear retaliation over the Faslane strike pushes strategic escalation to the brink, rattles European capitals, and sparks acute fear across Britain.",
                                            "Moscow places strategic forces on alert after London warns that further attacks on HMNB Clyde risk nuclear response."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Nuclear Ultimatum Triggers Mass Public Panic",
                                        "message": "Families pack train stations and highways out of major cities after Downing Street publicly warns of potential nuclear retaliation.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "PM ISSUES NUCLEAR ULTIMATUM TO MOSCOW AFTER FASLANE STRIKE",
                                        "message": "Downing Street warns further attacks risk nuclear retaliation; global tension peaks.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_fas2_2",
                            "text": "Launch conventional air strikes against Russian submarine bases in the Arctic",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "uk_russia": 1,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_nuclear_readiness"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "Conventional Strike Hits Northern Fleet Facilities",
                                        "messages": [
                                            "Long-range conventional cruise missiles strike Russian submarine support piers on the Kola Peninsula, answering the Faslane attack without crossing the nuclear threshold.",
                                            "Precision conventional strikes degrade Northern Fleet submarine logistics, lifting UK readiness while raising escalation."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK LAUNCHES CONVENTIONAL STRIKES ON ARCTIC SUB BASES",
                                        "message": "British missiles hit Northern Fleet docks in direct response to Faslane attack.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "explosion"
        },
        {
            "id": "ev_power_grid_strike",
            "stage": "stage_4",
            "name": "National Power Grid Blackout",
            "image": "ev_power_grid_strike",
            "conditions": {
                "minScores": {
                    "military_escalation": 4
                }
            },
            "repeatable": false,
            "location": [
                53.79,
                -0.98
            ],
            "description": "Coordinated cyber attacks and missile strikes on major substations knock out power across half the UK. Millions are plunged into darkness.",
            "roleDescriptions": {
                "home": "Hospitals are running on backup generators. Streetlights and phone towers are dying.",
                "cyber": "Hackers have locked utility computer systems with ransomware, preventing engineers from restarting the grid."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "How do we keep the country running during a nationwide blackout?",
                    "options": [
                        {
                            "id": "opt_pow_1",
                            "text": "Declare a National State of Emergency, enforce night curfews, and deploy the Army",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "military_readiness": -1,
                                    "military_escalation": 1
                                },
                                "assetStateChanges": {
                                    "a2": "damaged"
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Night Curfews & Army Patrols Imposed Across Darkened Cities",
                                        "messages": [
                                            "Armed troops enforce blacked-out city curfews as Substation Alpha remains damaged, deepening public dread and straining military resources.",
                                            "Emergency martial regulations and darkened grid sectors unsettle households while pulling soldiers away from frontline duties."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "defence",
                                            "cyber"
                                        ],
                                        "title": "Substation Alpha Damaged & Troops Diverted to Civil Order",
                                        "message": "Transformer damage at Substation Alpha and heavy domestic troop commitments reduce national defence readiness.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "STATE OF EMERGENCY: NIGHT CURFEWS & ARMY DEPLOYED IN BLACKOUT",
                                        "message": "Troops patrol darkened UK cities as Substation Alpha suffers severe damage.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_pow_2",
                            "text": "Ration emergency generators and ask communities to support vulnerable neighbours",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Community Resilience & Generator Priority Steady Blackout",
                                        "messages": [
                                            "Prioritising mobile generators for hospitals and water pumping while rallying local volunteers keeps communities calm and leaves armed forces free for defence.",
                                            "Civic mutual-aid networks and disciplined power rationing sustain public morale through the blackout without tying down combat troops."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ],
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt_pow_2"
                }
            ],
            "requiresUnlock": true,
            "sound": "klaxon"
        },
        {
            "id": "ev_airspace_incursion",
            "stage": "stage_4",
            "name": "Mass Bomber Fleet Approaches UK Airspace",
            "sound": "klaxon",
            "image": "ev_airspace_incursion",
            "conditions": {
                "minScores": {
                    "military_escalation": 5
                },
                "maxScores": {
                    "uk_us": 2,
                    "uk_europe": 3
                }
            },
            "repeatable": false,
            "location": [
                55,
                0
            ],
            "description": "Radar detects twenty Russian strategic bombers flying across the North Sea straight toward Britain, protected by escort fighters.",
            "roleDescriptions": {
                "defence": "This is a full-scale air raid. Every remaining Typhoon and F-35 fighter must scramble right now.",
                "home": "Air raid sirens sound across eastern England. Millions of people are heading into shelters."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How should our fighter squadrons engage the approaching bomber fleet?",
                    "options": [
                        {
                            "id": "opt_inc_usaf_joint",
                            "text": "Scramble RAF Typhoons jointly with USAF Lakenheath F-35As for an overwhelming NATO intercept!",
                            "conditions": {
                                "visibleAssets": [
                                    "a_usaf_lakenheath"
                                ],
                                "assetStates": {
                                    "a_usaf_lakenheath": "operational"
                                }
                            },
                            "effects": {
                                "scores": {
                                    "military_readiness": 2,
                                    "uk_us": 1,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_nuclear_readiness",
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Joint RAF–USAF Fighter Wall Turns Back Russian Bombers",
                                        "messages": [
                                            "RAF Typhoons and USAF 48th Fighter Wing F-35As from Lakenheath form an overwhelming air-defence wall over the North Sea, forcing the Russian bomber wave to abort before launch range.",
                                            "Combined Anglo-American stealth and fighter squadrons lock radar onto the approaching bombers, boosting readiness and cementing UK–US solidarity."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "JOINT RAF & USAF FIGHTER FORCE INTERCEPTS BOMBER FLEET",
                                        "message": "Typhoons and Lakenheath F-35As confront twenty Russian bombers over the North Sea.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_inc_1",
                            "text": "Commit all fighters into a mass interception over the North Sea before bombers reach weapons range",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "military_readiness": -1,
                                    "civilian_stability": 1
                                },
                                "unlockEvents": [
                                    "ev_nuclear_readiness",
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "home"
                                        ],
                                        "title": "Mass RAF North Sea Intercept Shields British Cities",
                                        "messages": [
                                            "Throwing every airworthy RAF fighter into a forward North Sea battle breaks up the Russian bomber formation before missile release, reassuring citizens while exhausting airframes and munitions.",
                                            "Maximum-effort forward interception protects eastern England from cruise missile salvoes at a heavy cost to remaining fighter readiness."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "RAF LAUNCHES MASS INTERCEPTION OVER NORTH SEA",
                                        "message": "British fighters engage approaching bomber fleet before weapons release.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_inc_2",
                            "text": "Hold back half our jets near London to defend the capital against cruise missiles",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": -1
                                },
                                "unlockEvents": [
                                    "ev_nuclear_readiness",
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "home"
                                        ],
                                        "title": "Inner Fighter Screen Protects London & Thames Estuary",
                                        "messages": [
                                            "Holding half the Typhoon force over southern England creates a dense cruise-missile shield around London, reassuring the public.",
                                            "Layered fighter patrols over the capital calm domestic fears even as outer North Sea sectors remain contested."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "foreign"
                                        ],
                                        "title": "North Sea Allies Criticise Pullback of RAF Patrols",
                                        "message": "European neighbours complain that pulling British fighters back to London leaves shared North Sea airspace exposed.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ],
                    "timeLimitMs": 55000,
                    "defaultOptionId": "opt_inc_2"
                }
            ],
            "requiresUnlock": true
        },
        {
            "id": "ev_nuclear_readiness",
            "stage": "stage_4",
            "name": "Russian Nuclear Forces on High Alert",
            "image": "ev_nuclear_readiness",
            "conditions": {
                "minScores": {
                    "military_escalation": 5
                }
            },
            "repeatable": false,
            "location": [
                54.7,
                20.5
            ],
            "description": "Satellite photos show Russian mobile nuclear missile launchers rolling out of bunkers, and bomber crews loading nuclear warheads.",
            "roleDescriptions": {
                "defence": "Russian strategic nuclear forces are at full readiness. Launch could occur within fifteen minutes.",
                "foreign": "Western leaders are holding an emergency hotline conference. The world is on the brink of nuclear war."
            },
            "decisions": [
                {
                    "role": "PM",
                    "text": "What orders do you send to Britain's Trident nuclear submarine commander at sea?",
                    "options": [
                        {
                            "id": "opt_nuc_1",
                            "text": "Order the submarine to prepare for launch on warning of incoming missiles",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 2,
                                    "civilian_stability": -2
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "defence"
                                        ],
                                        "title": "Trident Submarines Ordered to Launch-on-Warning Posture",
                                        "messages": [
                                            "Emergency VLF transmissions place Britain's patrolling Vanguard submarines at launch-on-warning readiness, driving strategic escalation and bilateral tension to the absolute precipice.",
                                            "Preparing Trident missile tubes for rapid retaliation signals maximum nuclear resolve while pushing nuclear war risk to critical."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Emergency Broadcast Warnings Spark Nationwide Terror",
                                        "message": "Rumours of imminent nuclear exchange cause widespread panic across British cities.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "TRIDENT DETERRENT ORDERED TO LAUNCH-ON-WARNING POSTURE",
                                        "message": "UK strategic nuclear forces move to highest alert as Russian launchers deploy.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_nuc_2",
                            "text": "Order the submarine to stay silent and hidden deep underwater to preserve our deterrent",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "defence"
                                        ],
                                        "title": "Vanguard Patrol Runs Ultra-Quiet in Deep Atlantic",
                                        "messages": [
                                            "Keeping the patrolling Trident submarine completely silent and undetectable guarantees Britain's second-strike survivability while avoiding a hair-trigger nuclear miscalculation.",
                                            "Disciplined silent running preserves the invulnerability of the nuclear deterrent and edges strategic tension back from the brink."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "klaxon"
        },
        {
            "id": "ev_chemical_attempt",
            "stage": "stage_5",
            "name": "Chemical Weapon Threat Foil in Salisbury",
            "image": "ev_chemical_attempt",
            "conditions": {
                "minScores": {
                    "uk_russia": 3,
                    "military_escalation": 2
                }
            },
            "repeatable": false,
            "location": [
                51.53,
                -0.12
            ],
            "description": "Police and MI5 arrest two foreign agents trying to contaminate a water facility near Salisbury. Traces of a military nerve agent were discovered.",
            "roleDescriptions": {
                "home": "Water supplies were protected and remain safe, but public fear of poison is skyrocketing.",
                "foreign": "The suspects hold Russian diplomatic passports. Expelling them will cause a diplomatic storm.",
                "cyber": "The agents were guided using encrypted messaging apps linked to Russian military intelligence."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "What public safety measures should we order?",
                    "options": [
                        {
                            "id": "opt_chem_1",
                            "text": "Test water reservoirs nationwide and send troops to guard treatment plants",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -2,
                                    "military_readiness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media"
                                        ],
                                        "title": "Troops at Water Plants Trigger Bottled-Water Stampede",
                                        "messages": [
                                            "Deploying soldiers and hazmat teams to reservoirs nationwide convinces households that tap water is poisoned, emptying supermarket shelves and eroding stability.",
                                            "Visible military guards outside water treatment works spark nationwide panic buying of bottled water."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "defence"
                                        ],
                                        "title": "Infantry Battalions Tied Down Guarding Reservoirs",
                                        "message": "Diverting regular troops to guard hundreds of domestic water utilities reduces combat readiness.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_chem_2",
                            "text": "Quietly step up security at water plants without alarming the public",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "cyber"
                                        ],
                                        "title": "Discreet Utility Protection Limits Public Alarm",
                                        "messages": [
                                            "Plain-clothes police and automated chemical sensors secure water facilities quietly, though leaked rumours of the Salisbury arrest still cause mild public unease.",
                                            "Covert infrastructure monitoring avoids a nationwide tap-water panic while keeping reservoirs protected."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ],
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt_chem_2"
                },
                {
                    "role": "foreign",
                    "text": "How should we handle the captured Russian agents?",
                    "options": [
                        {
                            "id": "opt_chem_3",
                            "text": "Expel all Russian diplomats from London and demand an apology from Moscow",
                            "effects": {
                                "scores": {
                                    "uk_russia": 2,
                                    "military_escalation": 1,
                                    "uk_europe": 1
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Russian Embassy Closed After Water Sabotage Plot",
                                        "messages": [
                                            "Britain expels the remaining Russian diplomatic mission from Kensington, winning strong European solidarity while severing formal ties with Moscow and raising escalation.",
                                            "Shutting down Russian diplomatic presence in London draws backing from European capitals as Kremlin fury peaks."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK EXPELS ALL RUSSIAN DIPLOMATS OVER WATER POISONING PLOT",
                                        "message": "Foreign Office shuts diplomatic ties after nerve-agent suspects arrested near Salisbury.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_chem_4",
                            "text": "Hold the suspects under arrest and present the chemical evidence to the UN",
                            "effects": {
                                "scores": {
                                    "uk_russia": 0,
                                    "civilian_stability": -1
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "home"
                                        ],
                                        "title": "Porton Down Dossier Sent to UN Security Council",
                                        "messages": [
                                            "Presenting forensic nerve-agent samples at the UN avoids an immediate diplomatic rupture, though domestic critics call the legal route too slow after a threat to drinking water.",
                                            "Filing charges and briefing the UN keeps diplomatic channels alive while leaving anxious voters demanding tougher action."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "klaxon"
        },
        {
            "id": "ev_us_neutrality",
            "stage": "stage_5",
            "name": "US Pulls Back: Declares Neutrality",
            "image": "ev_us_neutrality",
            "conditions": {
                "maxScores": {
                    "uk_us": 2
                }
            },
            "repeatable": false,
            "location": [
                38.89,
                -77.03
            ],
            "description": "In a stunning speech, the US President announces America will not get dragged into a European war, urging European countries to solve their own problems.",
            "roleDescriptions": {
                "foreign": "Without US backing, NATO's mutual defence guarantee is in doubt. European allies are in shock.",
                "defence": "Our military relies on US spy satellites and fuel planes. We must prepare to fight on our own.",
                "media": "Newspaper headlines call this the end of the Special Relationship. The public is terrified."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How do we salvage our international alliances?",
                    "options": [
                        {
                            "id": "opt_us_1",
                            "text": "Call an emergency European summit to create a joint European defence command",
                            "effects": {
                                "scores": {
                                    "uk_europe": 2,
                                    "uk_us": -1
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "London & Paris Spearhead Joint European Defence Command",
                                        "messages": [
                                            "Britain rallies European powers into an emergency continental defence pact, dramatically boosting European cohesion even as Washington cools further.",
                                            "European leaders unite behind British leadership to form an autonomous defence council following the US pullback."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK LEADS EMERGENCY SUMMIT FOR EUROPEAN DEFENCE COMMAND",
                                        "message": "Britain and European allies forge joint command after Washington declares neutrality.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_us_2",
                            "text": "Send our Foreign Secretary to Washington to beg the US President to reconsider",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_europe": -1
                                },
                                "unlockEvents": [
                                    "ev_final_authorization"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Emergency Washington Mission Wins Partial US Assurances",
                                        "messages": [
                                            "Urgent face-to-face talks in the Oval Office salvage limited US intelligence cooperation, though European capitals resent London pleading with Washington instead of leading Europe.",
                                            "Last-ditch diplomacy in Washington steadies UK–US ties slightly while leaving European partners feeling sidelined."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "defence",
                    "text": "How do we adjust our military plans without US support?",
                    "options": [
                        {
                            "id": "opt_us_3",
                            "text": "Put all British forces on defensive footing to protect the UK homeland",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "home"
                                        ],
                                        "title": "UK Forces Consolidate Around Homeland Air & Sea Shield",
                                        "messages": [
                                            "Concentrating ships, radars, and fighter squadrons around the British Isles strengthens national defence readiness while raising wartime alert posture.",
                                            "Homeland defence mobilisation locks down UK skies and territorial waters after the American pullback."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_us_4",
                            "text": "Double down on our Baltic deployments alongside French and German troops",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_europe": -2
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Forward Baltic Surge Strains European Logistics",
                                        "messages": [
                                            "Rushing extra British brigades to the Baltic frontier boosts forward combat readiness, but triggers fierce arguments with European capitals over command authority and supply lines.",
                                            "Unilateral British reinforcement in the Baltics sharpens frontline readiness while exposing deep command friction among European allies."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "teletype"
        },
        {
            "id": "ev_article5_ambiguity",
            "stage": "stage_5",
            "name": "NATO Allies Hesitate on Article 5",
            "image": "ev_article5_ambiguity",
            "repeatable": false,
            "location": [
                50.84,
                4.39
            ],
            "description": "Britain calls for NATO Article 5 (collective defence). Several European nations hesitate, worried that joining will spark World War Three.",
            "roleDescriptions": {
                "foreign": "Some European allies say an attack on a Cyprus base outside Europe doesn't force a full NATO response.",
                "defence": "If our allies back out, Britain stands alone against a massive military power."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How do we convince our NATO allies to stand with us?",
                    "options": [
                        {
                            "id": "opt_art_1",
                            "text": "Remind allies that abandoning Britain destroys NATO and leaves them next in line",
                            "effects": {
                                "scores": {
                                    "uk_europe": 1,
                                    "uk_us": 1,
                                    "military_escalation": 1
                                },
                                "unlockEvents": [
                                    "ev_us_neutrality"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Blunt Warning Brings Wavering NATO Capitals Into Line",
                                        "messages": [
                                            "Warning that NATO's credibility dies if Britain is abandoned convinces Washington and reluctant European capitals to back collective deterrence, though alliance war posture escalates.",
                                            "Forceful British diplomacy in Brussels secures US and European endorsement of mutual defence commitments."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_art_2",
                            "text": "Agree to a limited coalition of willing nations (UK, Poland, Baltic States, France)",
                            "effects": {
                                "scores": {
                                    "uk_europe": 2,
                                    "uk_us": -1
                                },
                                "unlockEvents": [
                                    "ev_us_neutrality"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "defence"
                                        ],
                                        "title": "Northern & Eastern European Coalition Formed",
                                        "messages": [
                                            "Forging a fast-moving coalition with France, Poland, and the Baltic states creates a tight European front, though bypassing full NATO consensus distances Washington.",
                                            "Frontline European states rally tightly around British command while US planners step back from the regional pact."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "teletype"
        },
        {
            "id": "ev_final_authorization",
            "stage": "stage_5",
            "name": "COBRA FINAL VOTE: War or Ceasefire",
            "image": "ev_final_authorization",
            "conditions": {
                "minScores": {
                    "military_escalation": 5
                }
            },
            "repeatable": false,
            "description": "The crisis reaches its climax. Russian bombers are in the air, cities are in blackout, and thousands have died. Cabinet must decide Britain's final path.",
            "location": [
                51.5033,
                -0.1276
            ],
            "roleDescriptions": {
                "PM": "You carry the ultimate responsibility for Britain's survival. Your decision will decide the future of our nation."
            },
            "decisions": [
                {
                    "role": "PM",
                    "text": "What is Britain's final cabinet decision?",
                    "options": [
                        {
                            "id": "opt_fin_1",
                            "text": "Order a full-scale joint counter-offensive with all allied air and naval forces",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "uk_europe": 1,
                                    "military_readiness": 1
                                },
                                "unlockEvents": [
                                    "ev_endgame_eu_defense",
                                    "ev_endgame_domestic",
                                    "ev_endgame_diplomatic"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "COBRA Authorises Full-Scale Allied Counter-Offensive",
                                        "messages": [
                                            "British and allied air and naval forces launch a coordinated theatre-wide counter-offensive to drive back Russian forces, uniting European command at maximum wartime intensity.",
                                            "Cabinet authorises full allied combat operations across the North Atlantic and Baltic theatres."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_fin_2",
                            "text": "Offer an immediate ceasefire and open emergency peace negotiations in Switzerland",
                            "effects": {
                                "scores": {
                                    "military_escalation": -3,
                                    "uk_russia": -3,
                                    "civilian_stability": 1
                                },
                                "unlockEvents": [
                                    "ev_endgame_diplomatic",
                                    "ev_endgame_eu_defense",
                                    "ev_endgame_domestic"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Emergency Geneva Ceasefire Halts Combats",
                                        "messages": [
                                            "Downing Street and Moscow order an immediate standstill across air and sea theatres as emergency peace delegations convene in Geneva, sharply lowering war escalation and relieving the public.",
                                            "Bilateral ceasefire orders take effect along the North Sea and Baltic fronts as Swiss-mediated peace talks open."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_fin_3",
                            "text": "Order a limited nuclear warning demonstration shot over uninhabited Arctic waters",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 2,
                                    "civilian_stability": -3,
                                    "uk_europe": -2,
                                    "uk_us": -2
                                },
                                "unlockEvents": [
                                    "ev_endgame_domestic",
                                    "ev_endgame_eu_defense",
                                    "ev_endgame_diplomatic"
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "all"
                                        ],
                                        "title": "Arctic Nuclear Warning Shot Shatters Global Order",
                                        "messages": [
                                            "Detonating a nuclear warning warhead over the high Arctic triggers worldwide diplomatic condemnation from Washington and Europe, sends Moscow to full nuclear launch status, and sparks domestic collapse at home.",
                                            "Breaking the nuclear taboo over Arctic waters isolates Britain from US and European allies while plunging British cities into mass panic."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "requiresUnlock": true,
            "sound": "klaxon"
        },
        {
            "id": "ev_endgame_diplomatic",
            "stage": "stage_5",
            "name": "CAMPAIGN VICTORY: Diplomatic Peace Secured",
            "image": "ev_endgame_diplomatic",
            "description": "PEACE BREAKTHROUGH! Strong deterrence combined with skilled diplomacy forced Moscow to agree to an internationally monitored ceasefire. British independence and European borders are saved without nuclear war.",
            "location": [
                46.2044,
                6.1432
            ],
            "isEndGame": true,
            "conditions": {
                "maxScores": {
                    "military_escalation": 2,
                    "uk_russia": 2
                }
            },
            "roleDescriptions": {
                "PM": "Your leadership prevented World War Three while keeping Britain strong, free, and secure.",
                "foreign": "Allies praise British diplomacy for finding an off-ramp while standing firm on national security."
            },
            "decisions": [],
            "sound": "alert"
        },
        {
            "id": "ev_endgame_domestic",
            "stage": "stage_5",
            "name": "CAMPAIGN FAILURE: Domestic Collapse & Riots",
            "image": "ev_endgame_domestic",
            "description": "GOVERNMENT COLLAPSES: Nationwide blackouts, food shortages, and terrifying bomb strikes sparked uncontrollable riots across major UK cities. The government has lost control of the country.",
            "location": [
                51.5072,
                -0.1276
            ],
            "isEndGame": true,
            "conditions": {
                "maxScores": {
                    "civilian_stability": 1
                }
            },
            "roleDescriptions": {
                "home": "Police stations and supply warehouses have been overrun. Order has broken down.",
                "media": "International news reports that the British government has collapsed amid public revolt."
            },
            "decisions": [],
            "sound": "explosion"
        },
        {
            "id": "ev_endgame_eu_defense",
            "stage": "stage_5",
            "name": "CAMPAIGN VICTORY: United European Fortress",
            "image": "ev_endgame_eu_defense",
            "description": "VICTORY: Britain led a united European alliance that stopped Russian aggression in its tracks. A historic European security treaty guarantees peace and mutual defence for a generation.",
            "location": [
                50.8503,
                4.3517
            ],
            "isEndGame": true,
            "conditions": {
                "minScores": {
                    "uk_europe": 5,
                    "military_escalation": 4
                }
            },
            "roleDescriptions": {
                "defence": "Combined European armed forces held the line, deterring all further attacks.",
                "foreign": "Britain stands at the head of a strong and united European defence network."
            },
            "decisions": [],
            "sound": "alert"
        },
        {
            "id": "ev_cyber_success",
            "stage": "stage_3",
            "name": "British Cyber Strike Shuts Down Enemy Radar",
            "image": "ev_cyber_success",
            "hidden": true,
            "description": "GCHQ and military cyber operators successfully infect Russian air-defence networks with malware, turning their radar screens black across the border.",
            "location": [
                55.75,
                37.61
            ],
            "roleDescriptions": {
                "cyber": "A brilliant digital victory. The enemy's radar network is offline for the next 12 hours.",
                "defence": "Our fighter jets and bombers can now operate without being tracked by ground radar."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "military_readiness": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "cyber",
                            "defence"
                        ],
                        "title": "GCHQ Payload Blinds Russian Air-Defence Radar",
                        "messages": [
                            "Covert British malware blacks out Russian early-warning radar screens along the western sector for twelve hours, giving RAF aircraft a major readiness advantage.",
                            "National Cyber Force operators successfully disable hostile surface-to-air radar networks, opening safe corridors for allied patrols."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    }
                ]
            },
            "sound": "teletype"
        },
        {
            "id": "ev_cyber_fail",
            "stage": "stage_3",
            "name": "British Cyber Strike Blocked & Traced",
            "image": "ev_cyber_fail",
            "hidden": true,
            "description": "Russian security teams detected our cyber intrusion before it reached command servers, and traced the malware back to British government servers.",
            "location": [
                55.75,
                37.61
            ],
            "roleDescriptions": {
                "cyber": "The enemy upgraded their encryption and locked us out of their network.",
                "media": "Moscow is using the attempted hack to justify launching their own cyber strikes on the UK."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "uk_europe": -1,
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "cyber",
                            "media",
                            "foreign"
                        ],
                        "title": "Failed UK Cyber Intrusion Exposed by Moscow",
                        "messages": [
                            "Russian cyber defenders block the British payload and broadcast forensic proof of the intrusion, unnerving European partners and rattling domestic confidence.",
                            "Kremlin media publishes traced UK server signatures from the blocked cyber operation, sparking European criticism and public unease."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            },
            "sound": "alert"
        },
        {
            "id": "ev_sf_success",
            "stage": "stage_3",
            "name": "Special Forces Raid Gathers Vital Intel",
            "image": "ev_sf_success",
            "hidden": true,
            "description": "British Special Forces inserted behind enemy lines capture Russian missile codes and targeting maps before extracting safely by helicopter.",
            "location": [
                50,
                30
            ],
            "roleDescriptions": {
                "defence": "The captured maps pinpoint every mobile missile launcher moving toward the Baltic.",
                "foreign": "Sharing this intelligence with our allies restores confidence in British military capability."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "military_readiness": 1,
                    "uk_us": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "foreign",
                            "PM"
                        ],
                        "title": "SAS Reconnaissance Team Extracts Russian Missile Plans",
                        "messages": [
                            "UKSF operators recover encrypted missile deployment schedules and extract cleanly without losses, boosting UK combat readiness and earning high praise from the Pentagon.",
                            "Captured Russian targeting maps from the special forces raid give British and US commanders complete visibility over forward missile units."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    }
                ]
            },
            "sound": "alert"
        },
        {
            "id": "ev_sf_fail",
            "stage": "stage_3",
            "name": "Special Forces Patrol Ambushed Behind Lines",
            "image": "ev_sf_fail",
            "hidden": true,
            "description": "A British Special Forces reconnaissance team was spotted and surrounded by enemy troops. Four commandos are captured and paraded on Russian television.",
            "location": [
                50,
                30
            ],
            "roleDescriptions": {
                "media": "Videos of British soldiers held as prisoners of war dominate the global news cycle.",
                "home": "Public grief and anger are boiling over. Families are demanding an end to secret operations."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "civilian_stability": -1,
                    "military_escalation": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "media",
                            "home"
                        ],
                        "title": "Captured UK Commandos Paraded on Russian State TV",
                        "messages": [
                            "Footage of four captured British special forces soldiers triggers domestic shock and sharply escalates military confrontation.",
                            "Russian networks broadcast interrogations of the ambushed UK reconnaissance patrol, shaking public morale and heightening war tension."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "UK SPECIAL FORCES PATROL CAPTURED BEHIND LINES",
                        "message": "Russian television broadcasts images of four captured British commandos.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
            },
            "sound": "explosion"
        },
        {
            "id": "ev_us_support_success",
            "stage": "stage_4",
            "name": "US Supplies & Cargo Planes Arrive",
            "image": "ev_us_support_success",
            "hidden": true,
            "description": "The US President agrees to help! American C-17 transport planes begin landing at RAF Brize Norton packed with Patriot missile interceptors and spare parts.",
            "location": [
                51.5,
                -0.1
            ],
            "roleDescriptions": {
                "defence": "US supplies give our armed forces a vital boost in ammunition and air defence.",
                "foreign": "American military aid signals to Moscow that the Western alliance remains unbroken."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "military_readiness": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "foreign"
                        ],
                        "title": "USAF C-17 Airlift Delivers Munitions to Brize Norton",
                        "messages": [
                            "Heavy American transport aircraft land continuously at RAF Brize Norton with air-defence interceptors and spares, lifting British military readiness.",
                            "Transatlantic US resupply flights replenish depleted RAF and Royal Navy war stocks."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "ev_us_support_fail",
            "stage": "stage_4",
            "name": "US Declines Military Aid Request",
            "image": "ev_us_support_fail",
            "hidden": true,
            "description": "The White House rejects our urgent request for military cargo aircraft, stating that America must keep its reserves for Pacific defence.",
            "location": [
                38.89,
                -77.03
            ],
            "roleDescriptions": {
                "foreign": "Britain must look to European allies and our own industry for war supplies.",
                "defence": "Our supply lines are severely strained. Munitions must be carefully rationed."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "uk_europe": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "foreign",
                            "defence"
                        ],
                        "title": "Pentagon Denies Airlift Request Over Pacific Priorities",
                        "messages": [
                            "Washington refuses to release strategic C-17 airlift or munitions reserves, leaving European allies nervous over Western supply depth.",
                            "White House rejection of Britain's resupply appeal highlights allied logistics strain across Europe."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "ev_f35_success",
            "stage": "stage_4",
            "name": "Stealth Bombers Destroy Enemy Airbase",
            "image": "ev_f35_success",
            "hidden": true,
            "description": "British F-35B stealth fighters slip undetected through enemy radar rings, dropping bunker-buster bombs that completely crater a Russian bomber airfield.",
            "location": [
                55.75,
                37.61
            ],
            "roleDescriptions": {
                "defence": "Enemy bombers that were launching cruise missiles at Britain are destroyed on the ground.",
                "foreign": "The strike shows British military teeth and forces Moscow to pull remaining bombers back."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "military_escalation": -2,
                    "uk_russia": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "PM",
                            "foreign"
                        ],
                        "title": "F-35B Precision Strike Neutralises Russian Bomber Base",
                        "messages": [
                            "RAF F-35B Lightning stealth jets crater the forward Russian bomber runway and munitions bunkers without loss, forcing Moscow to pull surviving bombers out of range and reducing air-raid pressure.",
                            "Direct stealth strikes smash Russia's forward cruise-missile launch airfield, curbing immediate strike threats against the UK."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "RAF F-35 STEALTH STRIKE CRATERS RUSSIAN BOMBER BASE",
                        "message": "Precision raid disables forward airfield used to launch missiles at Britain.",
                        "severity": "info",
                        "aiRandomize": false
                    }
                ]
            },
            "sound": "explosion"
        },
        {
            "id": "ev_f35_fail",
            "stage": "stage_4",
            "name": "Stealth Strike Package Intercepted",
            "image": "ev_f35_fail",
            "hidden": true,
            "description": "Russian advanced surface-to-air missiles shoot down an RAF F-35 fighter over the sea. The remaining jets are forced to drop bombs off-target and turn back.",
            "location": [
                55.75,
                37.61
            ],
            "roleDescriptions": {
                "defence": "Losing an advanced stealth jet is a heavy military blow. The pilot's fate is unknown.",
                "media": "Russian state TV shows wreckage of the British jet as proof that Western stealth is useless."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "military_escalation": 2,
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "media",
                            "PM"
                        ],
                        "title": "RAF F-35B Downed by S-400 Battery During Deep Raid",
                        "messages": [
                            "Russian long-range surface-to-air missiles shoot down a British F-35B and force the strike package to abort, spiking military escalation and shocking the British public.",
                            "Loss of an RAF stealth jet during the aborted air raid dominates Russian broadcasts and shakes domestic morale."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "RAF F-35 STEALTH FIGHTER SHOT DOWN IN ABORTED RAID",
                        "message": "Russian air defences intercept British strike package; escalation surges.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
            },
            "sound": "klaxon"
        },
        {
            "id": "ev_eu_success",
            "stage": "stage_4",
            "name": "European Defence Coalition Formed",
            "image": "ev_eu_success",
            "hidden": true,
            "description": "Britain, France, Germany, and Poland sign an emergency defence pact, pledging to fight together and combine their air defence networks.",
            "location": [
                50.8503,
                4.3517
            ],
            "roleDescriptions": {
                "foreign": "Europe stands united! Our combined military strength equals Russia's forces in theatre.",
                "defence": "French and German air defence missile batteries are being flown to the UK to protect our cities."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "uk_europe": 2,
                    "military_escalation": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "foreign",
                            "defence",
                            "PM"
                        ],
                        "title": "Emergency European Defence Pact Integrates Air Shield",
                        "messages": [
                            "Britain, France, Germany, and Poland lock in a joint air-and-naval defence treaty, boosting European cohesion and deterring further Russian escalation.",
                            "Allied European missile batteries deploy to reinforce UK skies under the new four-nation defence pact."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "ev_eu_fail",
            "stage": "stage_4",
            "name": "European Defence Summit Collapses",
            "image": "ev_eu_fail",
            "hidden": true,
            "description": "Talks in Brussels break down without an agreement. European nations refuse to commit troops to defend Britain, each choosing to protect their own borders.",
            "location": [
                50.8503,
                4.3517
            ],
            "roleDescriptions": {
                "foreign": "Diplomatic disaster. European unity is fractured.",
                "defence": "We must rely exclusively on British armed forces to defend the homeland."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "uk_europe": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "foreign",
                            "defence",
                            "PM"
                        ],
                        "title": "Brussels Emergency Defence Talks Break Down",
                        "messages": [
                            "European capitals hold back national air-defence units to guard their own borders, leaving European cohesion fractured and Britain reliant on sovereign forces.",
                            "Disagreements over command and border priorities sink the proposed European defence coalition."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "ev_strike_options_leak",
            "stage": "stage_4",
            "name": "Strike Target Plans Leaked to Press",
            "image": "ev_strike_options_leak",
            "hidden": true,
            "description": "Classified military plans to bomb airbases inside Russia have been leaked to the newspapers. Moscow issues furious warnings of immediate retaliation.",
            "location": [
                51.5033,
                -0.1276
            ],
            "roleDescriptions": {
                "media": "Headlines scream that Britain is planning to attack Russia directly.",
                "foreign": "Allies are panicked that our military plans became public knowledge."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "military_escalation": 1,
                    "uk_europe": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "media",
                            "foreign",
                            "defence"
                        ],
                        "title": "Leaked MoD Deep-Strike Dossier Sparks Allied Alarm",
                        "messages": [
                            "Newspaper revelations of British targeting plans inside Russia trigger furious Kremlin warnings and rattle European capitals.",
                            "Unauthorized disclosure of RAF deep-strike options inflames military tension and strains trust with European partners."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "ev_strike_options_secured",
            "stage": "stage_4",
            "name": "Strike Planning Completed in Secret",
            "image": "ev_strike_options_secured",
            "hidden": true,
            "description": "Military staff have finalized precision bombing plans against key Russian bases. Security remains airtight with zero leaks.",
            "location": [
                51.5033,
                -0.1276
            ],
            "roleDescriptions": {
                "defence": "Our F-35 stealth fighters and cruise missiles have their target data programmed and ready."
            },
            "decisions": [],
            "requiresUnlock": true
        },
        {
            "id": "ev_strike_options_ready",
            "stage": "stage_4",
            "name": "Deep Strike Options Ready for Prime Minister",
            "image": "ev_strike_options_ready",
            "hidden": true,
            "description": "The Chief of the Defence Staff informs the Prime Minister that precision strike packages against Russian airbases and command bunkers are ready for launch.",
            "location": [
                51.5033,
                -0.1276
            ],
            "roleDescriptions": {
                "defence": "F-35 stealth fighters with Storm Shadow missiles are armed on the runway, awaiting orders.",
                "PM": "The decision to bomb targets inside Russia rests solely in your hands."
            },
            "decisions": [],
            "requiresUnlock": true
        },
        {
            "id": "ev_russia_deescalate",
            "stage": "stage_5",
            "name": "Secret Talks Succeed: Russia Agrees to Pause",
            "image": "ev_russia_deescalate",
            "hidden": true,
            "description": "Emergency backchannel talks between British diplomats and Russian officials result in a temporary 48-hour pause on strikes against civilian infrastructure.",
            "location": [
                55.75,
                37.61
            ],
            "roleDescriptions": {
                "foreign": "Both sides agreed to pull back warships in the North Sea while diplomats talk.",
                "PM": "Use this breathing space to evacuate wounded, restore power grids, and repair airfields."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "military_escalation": -1,
                    "uk_russia": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "foreign",
                            "PM",
                            "defence"
                        ],
                        "title": "48-Hour Infrastructure Ceasefire Takes Hold",
                        "messages": [
                            "Backchannel diplomacy secures a 48-hour mutual pause on infrastructure strikes and a North Sea naval pullback, easing immediate war tension.",
                            "Russian and British forces stand down from infrastructure strikes for 48 hours as confidential de-escalation talks gain traction."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "ev_russia_leak",
            "stage": "stage_5",
            "name": "Secret Talks Leaked to the Press",
            "image": "ev_russia_leak",
            "hidden": true,
            "description": "Moscow deliberately leaks recordings of our secret phone calls to state television, claiming Britain is begging for mercy and betraying its allies.",
            "location": [
                55.75,
                37.61
            ],
            "roleDescriptions": {
                "media": "Allied newspapers accuse Britain of cowardice. The public is furious.",
                "foreign": "Our Baltic and European allies are deeply upset that we held talks without telling them."
            },
            "decisions": [],
            "requiresUnlock": true,
            "autoEffects": {
                "scores": {
                    "uk_europe": -1,
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "foreign",
                            "media",
                            "PM"
                        ],
                        "title": "Kremlin Broadcasts Leaked Backchannel Recordings",
                        "messages": [
                            "Russian state TV airs edited audio of British diplomatic approaches, provoking outrage in European capitals and shaking public trust at home.",
                            "Moscow's deliberate leak of confidential ceasefire feelers angers Baltic allies and sparks domestic political uproar."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "act_nuke",
            "name": "Authorise Nuclear Strike",
            "description": "Order Vanguard-class submarines to launch Trident nuclear missiles against Russian targets. Total, catastrophic escalation.",
            "initiator": [
                "home",
                "defence"
            ],
            "requiresApprovalFrom": [
                "home",
                "defence"
            ],
            "conditions": {
                "assets": {
                    "a_vanguard": "operational"
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_nuclear_readiness"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_faslane_strike_2"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_final_authorization"
                        ]
                    }
                ]
            },
            "effects": {
                "scores": {
                    "military_escalation": 5,
                    "civilian_stability": -5
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "all"
                        ],
                        "title": "TRIDENT NUCLEAR LAUNCH AUTHORISED",
                        "messages": [
                            "Emergency Action Messages transmit to Britain's Vanguard-class submarine on patrol; Trident II D5 ballistic missiles breach the North Atlantic surface, triggering strategic nuclear exchange and total domestic collapse.",
                            "Strategic nuclear release orders are executed by HM Submarine Vanguard, sending global escalation to maximum and plunging the country into catastrophe."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            },
            "image": "ev_nuclear_alert",
            "isManualAction": true
        },
        {
            "id": "act_backchannel_russia",
            "name": "Emergency Secret Talks with Russia",
            "description": "Open direct, private talks with Moscow to stop the fighting. High risk of political outrage if leaked to the public.",
            "initiator": [
                "foreign"
            ],
            "conditions": {
                "minScores": {
                    "military_escalation": 3
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_russia_hub_explosion"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_black_sea_intercept"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_airspace_intercept"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_akrotiri_strike"
                        ]
                    }
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_russia_deescalate",
                        "probability": 0.5,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "foreign",
                                    "PM"
                                ],
                                "title": "Moscow Backchannel Signals Interest in Mutual Pause",
                                "messages": [
                                    "Senior Russian Foreign Ministry intermediaries respond constructively on the private line, exploring a temporary pause in strikes.",
                                    "Confidential diplomatic traffic from Moscow indicates readiness to test a 48-hour de-escalation window."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_russia_leak",
                        "probability": 0.5,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "foreign",
                                    "media"
                                ],
                                "title": "Russian State Media Prepares Leak of Secret Talks",
                                "messages": [
                                    "Embassy press monitors warn that Kremlin broadcasters are preparing to air recordings of Britain's private diplomatic outreach.",
                                    "Foreign Office analysts detect Moscow priming state media to spin the secret British approach as capitulation."
                                ],
                                "severity": "danger",
                                "aiRandomize": true
                            }
                        ]
                    }
                ],
                "scores": {
                    "uk_russia": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "foreign",
                            "PM"
                        ],
                        "title": "Covert Diplomatic Channel Opened With Moscow",
                        "messages": [
                            "Senior British diplomats establish an unacknowledged communication line with the Russian Foreign Ministry to probe for an off-ramp.",
                            "Quiet diplomatic feelers reach Moscow intermediaries, slightly easing bilateral temperature while awaiting the Kremlin's response."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            },
            "image": "act_backchannel_russia",
            "isManualAction": true
        },
        {
            "id": "act_us_support",
            "name": "Request US Military Transport",
            "description": "Request urgent US military airlift and munitions support from USAF Lakenheath & Atlantic commands. Unavailable if the US has withdrawn its assets from theatre.",
            "initiator": [
                "foreign",
                "defence"
            ],
            "conditions": {
                "minScores": {
                    "uk_us": 2
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_maritime_shadowing"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_bomber_intercept"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_cyber_london"
                        ]
                    }
                ],
                "triggeredEvents": [
                    "ev_kremlin_ultimatum"
                ],
                "visibleAssets": [
                    "a_usaf_lakenheath"
                ],
                "assetStates": {
                    "a_usaf_lakenheath": "operational"
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_us_support_success",
                        "effects": {
                            "scores": {
                                "military_readiness": 1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "foreign"
                                    ],
                                    "title": "Pentagon Clears Emergency C-17 Airlift to UK",
                                    "messages": [
                                        "US European Command approves priority airlift of interceptors and spares into RAF Brize Norton, boosting UK military readiness.",
                                        "American military cargo flights begin loading munitions for urgent delivery to British bases."
                                    ],
                                    "severity": "success",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.6,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "foreign"
                                ],
                                "title": "Pentagon Clears Emergency C-17 Airlift to UK",
                                "messages": [
                                    "US European Command approves priority airlift of interceptors and spares into RAF Brize Norton, boosting UK military readiness.",
                                    "American military cargo flights begin loading munitions for urgent delivery to British bases."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_us_support_fail",
                        "effects": {
                            "scores": {
                                "uk_europe": -1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "foreign",
                                        "defence"
                                    ],
                                    "title": "White House Holds Back Strategic Airlift Reserves",
                                    "messages": [
                                        "Washington declines the British transport request to preserve Indo-Pacific stocks, unsettling European defence planners.",
                                        "Pentagon logistics chiefs turn down the UK airlift request, citing competing global commitments."
                                    ],
                                    "severity": "warning",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.4,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "foreign",
                                    "defence"
                                ],
                                "title": "White House Holds Back Strategic Airlift Reserves",
                                "messages": [
                                    "Washington declines the British transport request to preserve Indo-Pacific stocks, unsettling European defence planners.",
                                    "Pentagon logistics chiefs turn down the UK airlift request, citing competing global commitments."
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
                            "foreign",
                            "defence"
                        ],
                        "title": "Urgent Military Airlift Request Sent to Washington",
                        "messages": [
                            "MoD and Foreign Office channels transmit a formal request to the Pentagon and USAF Lakenheath for heavy C-17 transport and missile resupply.",
                            "British defence attachés in Washington press the Joint Chiefs for immediate munitions airlift support."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            },
            "image": "act_us_support",
            "isManualAction": true
        },
        {
            "id": "act_cyber_offensive",
            "name": "Launch Covert Cyber Strike",
            "description": "Order government hackers to secretly disable Russian military command networks and radar.",
            "initiator": [
                "cyber"
            ],
            "requiresApprovalFrom": [
                "home"
            ],
            "conditions": {
                "minScores": {
                    "military_readiness": 2
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_disinfo_campaign"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_gps_jamming"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_cyber_london"
                        ]
                    }
                ]
            },
            "effects": {
                "scores": {
                    "military_escalation": 1
                },
                "randomEvents": [
                    {
                        "id": "ev_cyber_success",
                        "effects": {
                            "scores": {
                                "military_readiness": 1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "cyber",
                                        "defence"
                                    ],
                                    "title": "Offensive Payload Penetrates Russian Radar Grid",
                                    "messages": [
                                        "GCHQ implants propagate across Russian air-defence command nodes, blinding border radar sectors and raising UK readiness.",
                                        "National Cyber Force operators confirm successful disruption of Russian air-defence links."
                                    ],
                                    "severity": "success",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.5,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "cyber",
                                    "defence"
                                ],
                                "title": "Offensive Payload Penetrates Russian Radar Grid",
                                "messages": [
                                    "GCHQ implants propagate across Russian air-defence command nodes, blinding border radar sectors and raising UK readiness.",
                                    "National Cyber Force operators confirm successful disruption of Russian air-defence links."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_cyber_fail",
                        "effects": {
                            "scores": {
                                "uk_europe": -1,
                                "civilian_stability": -1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "cyber",
                                        "foreign"
                                    ],
                                    "title": "Russian Firewalls Quarantine & Trace UK Payload",
                                    "messages": [
                                        "Adversary cyber defenders isolate the British intrusion and trace its routing, triggering European discomfort and domestic concern.",
                                        "Russian military network monitors block the GCHQ exploit and publish attribution data."
                                    ],
                                    "severity": "warning",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.5,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "cyber",
                                    "foreign"
                                ],
                                "title": "Russian Firewalls Quarantine & Trace UK Payload",
                                "messages": [
                                    "Adversary cyber defenders isolate the British intrusion and trace its routing, triggering European discomfort and domestic concern.",
                                    "Russian military network monitors block the GCHQ exploit and publish attribution data."
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
                            "cyber",
                            "home",
                            "PM"
                        ],
                        "title": "National Cyber Force Launches Covert Radar Intrusion",
                        "messages": [
                            "With Home Office warrant approval, GCHQ and National Cyber Force teams deploy zero-day exploits against Russian military command servers, nudging escalation higher.",
                            "Offensive cyber packages begin probing Russian air-defence networks as operators await battle-damage telemetry."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            },
            "image": "act_cyber_offensive",
            "isManualAction": true
        },
        {
            "id": "act_national_address",
            "name": "Live Address to the Nation",
            "description": "Broadcast a live speech from Downing Street to reassure the public and stop panic buying.",
            "initiator": [
                "media"
            ],
            "requiresApprovalFrom": [
                "home"
            ],
            "conditions": {
                "maxScores": {
                    "civilian_stability": 3
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_protest_manchester"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_disinfo_campaign"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_protest_london"
                        ]
                    }
                ]
            },
            "effects": {
                "scores": {
                    "civilian_stability": 1,
                    "uk_europe": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "media",
                            "home",
                            "PM"
                        ],
                        "title": "Prime Minister's Televised Address Steadies Public Mood",
                        "messages": [
                            "A prime-time Downing Street broadcast reassures households that food, banking, and energy supplies are secure, lifting domestic stability while European capitals note Britain's inward focus.",
                            "Live national television appeals calm supermarket queues across Britain, though Brussels diplomats worry London is prioritising domestic politics."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "DOWNING STREET BROADCASTS LIVE ADDRESS TO THE NATION",
                        "message": "Government urges calm and unity across Britain; public confidence improves.",
                        "severity": "info",
                        "aiRandomize": false
                    }
                ]
            },
            "image": "act_national_address",
            "isManualAction": true
        },
        {
            "id": "act_special_forces",
            "name": "Deploy Special Forces Behind Lines",
            "description": "Send SAS and SBS commandos on secret missions to spy on Russian troop movements.",
            "initiator": [
                "defence"
            ],
            "conditions": {
                "minScores": {
                    "military_readiness": 2
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_russia_hub_explosion"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_undersea_cable"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_sub_detection"
                        ]
                    }
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_sf_success",
                        "effects": {
                            "scores": {
                                "military_readiness": 1,
                                "uk_us": 1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "foreign"
                                    ],
                                    "title": "UKSF Patrol Transmits High-Value Targeting Data",
                                    "messages": [
                                        "Covert SAS observation posts relay encrypted coordinates of Russian missile units before exfiltrating safely, boosting readiness and UK–US intelligence standing.",
                                        "Special Forces reconnaissance teams extract vital enemy order-of-battle data behind the lines."
                                    ],
                                    "severity": "success",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.5,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "foreign"
                                ],
                                "title": "UKSF Patrol Transmits High-Value Targeting Data",
                                "messages": [
                                    "Covert SAS observation posts relay encrypted coordinates of Russian missile units before exfiltrating safely, boosting readiness and UK–US intelligence standing.",
                                    "Special Forces reconnaissance teams extract vital enemy order-of-battle data behind the lines."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_sf_fail",
                        "effects": {
                            "scores": {
                                "civilian_stability": -1,
                                "military_escalation": 1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "PM"
                                    ],
                                    "title": "Emergency Beacon: UKSF Patrol Compromised",
                                    "messages": [
                                        "Encrypted burst transmissions report the British reconnaissance team surrounded by Russian counter-spetsnaz units, raising escalation and domestic fallout.",
                                        "Hereford operations room loses contact with the inserted patrol after a firefight behind enemy lines."
                                    ],
                                    "severity": "danger",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.5,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "PM"
                                ],
                                "title": "Emergency Beacon: UKSF Patrol Compromised",
                                "messages": [
                                    "Encrypted burst transmissions report the British reconnaissance team surrounded by Russian counter-spetsnaz units, raising escalation and domestic fallout.",
                                    "Hereford operations room loses contact with the inserted patrol after a firefight behind enemy lines."
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
                            "defence",
                            "PM"
                        ],
                        "title": "SAS & SBS Reconnaissance Teams Inserted Covertly",
                        "messages": [
                            "UKSF patrols slip across the frontier under low-level night helicopter and submarine insertion to reconnoitre Russian missile deployments.",
                            "Special Forces reconnaissance teams go dark inside the operational zone on high-risk intelligence collection."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            },
            "image": "act_special_forces",
            "isManualAction": true
        },
        {
            "id": "act_request_strike_options",
            "name": "Request Air Strike Plans",
            "description": "Ask military commanders to draw up stealth bomber strike targets inside Russia. Small risk of an intelligence leak.",
            "image": "act_request_strike_options",
            "initiator": [
                "PM",
                "defence"
            ],
            "conditions": {
                "minScores": {
                    "military_readiness": 3
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_airspace_intercept"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_akrotiri_strike"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_sub_surfaces"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_kinetic_strike"
                        ]
                    }
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_strike_options_leak",
                        "effects": {
                            "scores": {
                                "military_escalation": 1,
                                "uk_europe": -1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "media",
                                        "foreign"
                                    ],
                                    "title": "Press Inquiry Hints at Leaked Deep-Strike Dossier",
                                    "messages": [
                                        "Journalists contact the MoD with details of classified Russian airbase target folders, heightening escalation and European concern.",
                                        "Security breach inside Whitehall exposes RAF deep-strike planning to the press."
                                    ],
                                    "severity": "danger",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.2,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "media",
                                    "foreign"
                                ],
                                "title": "Press Inquiry Hints at Leaked Deep-Strike Dossier",
                                "messages": [
                                    "Journalists contact the MoD with details of classified Russian airbase target folders, heightening escalation and European concern.",
                                    "Security breach inside Whitehall exposes RAF deep-strike planning to the press."
                                ],
                                "severity": "danger",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_strike_options_secured",
                        "probability": 0.8,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "PM"
                                ],
                                "title": "Target Folders Sealed Under Tight Operational Security",
                                "messages": [
                                    "PJHQ targeteers complete F-35B and Storm Shadow mission routing inside a secure vault with zero leaks.",
                                    "Operational security holds firm as RAF strike planners lock in radar-evasion corridors."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    }
                ],
                "triggerEvents": [
                    {
                        "id": "ev_strike_options_ready",
                        "delayMs": 60000
                    }
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "PM",
                            "defence"
                        ],
                        "title": "PJHQ Tasked to Prepare Deep-Strike Target Packages",
                        "messages": [
                            "Permanent Joint Headquarters begins calculating F-35B stealth corridors and Storm Shadow aimpoints against forward Russian airbases and command bunkers.",
                            "RAF strike planners convene in the Northwood bunker to build precision target folders for the Prime Minister."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            },
            "isManualAction": true
        },
        {
            "id": "act_strike_airbase",
            "name": "Strike Russian Airbase (F-35)",
            "description": "Launch British F-35 stealth fighters to bomb a forward Russian bomber base to stop airstrikes on the UK.",
            "image": "act_strike_airbase",
            "initiator": [
                "PM",
                "defence"
            ],
            "requiresApprovalFrom": [
                "PM",
                "home"
            ],
            "conditions": {
                "minScores": {
                    "military_readiness": 3
                },
                "triggeredEvents": [
                    "ev_strike_options_ready"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_f35_success",
                        "effects": {
                            "scores": {
                                "military_escalation": -2,
                                "uk_russia": 1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "PM"
                                    ],
                                    "title": "Strike Telemetry Confirms Russian Bomber Runway Cratered",
                                    "messages": [
                                        "F-35B weapons release goes clean; satellite assessment shows the forward Russian bomber base knocked out of action, reducing incoming air-raid pressure.",
                                        "All British stealth jets clear the target zone after destroying the Russian bomber dispersal aprons."
                                    ],
                                    "severity": "success",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.6,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "PM"
                                ],
                                "title": "Strike Telemetry Confirms Russian Bomber Runway Cratered",
                                "messages": [
                                    "F-35B weapons release goes clean; satellite assessment shows the forward Russian bomber base knocked out of action, reducing incoming air-raid pressure.",
                                    "All British stealth jets clear the target zone after destroying the Russian bomber dispersal aprons."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_f35_fail",
                        "effects": {
                            "scores": {
                                "military_escalation": 2,
                                "civilian_stability": -1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "PM"
                                    ],
                                    "title": "SAM Launch Warning: F-35B Package Under Heavy Fire",
                                    "messages": [
                                        "Dense S-400 air-defence fire intercepts the approaching RAF stealth flight, downing one jet and driving escalation up sharply.",
                                        "AWACS reports an RAF F-35B lost over the target area as the remaining strike flight aborts."
                                    ],
                                    "severity": "danger",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.4,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "PM"
                                ],
                                "title": "SAM Launch Warning: F-35B Package Under Heavy Fire",
                                "messages": [
                                    "Dense S-400 air-defence fire intercepts the approaching RAF stealth flight, downing one jet and driving escalation up sharply.",
                                    "AWACS reports an RAF F-35B lost over the target area as the remaining strike flight aborts."
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
                            "PM",
                            "defence",
                            "home"
                        ],
                        "title": "RAF F-35B Stealth Flight Launches for Russian Airbase",
                        "messages": [
                            "617 Squadron F-35B Lightning jets refuel from Voyager tankers and go radar-silent en route to the forward Russian bomber airfield.",
                            "Cabinet strike authorisation is transmitted; British stealth fighters cross into hostile airspace toward the bomber base."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            },
            "isManualAction": true
        },
        {
            "id": "act_strike_c2",
            "name": "Strike Russian Command Bunker (F-35)",
            "description": "High-risk stealth air strike against Russia's main military headquarters to cut off communication to their frontline troops.",
            "image": "act_strike_c2",
            "initiator": [
                "PM",
                "defence"
            ],
            "requiresApprovalFrom": [
                "PM",
                "home"
            ],
            "conditions": {
                "minScores": {
                    "military_readiness": 3
                },
                "triggeredEvents": [
                    "ev_strike_options_ready"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_f35_success",
                        "effects": {
                            "scores": {
                                "military_escalation": -3,
                                "uk_russia": 2
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "PM"
                                    ],
                                    "title": "Direct Hit Paralyses Russian Theatre Command Bunker",
                                    "messages": [
                                        "Deep-penetration munitions sever communications at the Russian Western Military District command bunker, paralysing frontline offensive coordination.",
                                        "Stealth strike package scores a direct hit on the Russian C2 bunker, halting coordinated enemy strikes."
                                    ],
                                    "severity": "success",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.3,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "PM"
                                ],
                                "title": "Direct Hit Paralyses Russian Theatre Command Bunker",
                                "messages": [
                                    "Deep-penetration munitions sever communications at the Russian Western Military District command bunker, paralysing frontline offensive coordination.",
                                    "Stealth strike package scores a direct hit on the Russian C2 bunker, halting coordinated enemy strikes."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_f35_fail",
                        "effects": {
                            "scores": {
                                "military_escalation": 3,
                                "civilian_stability": -2
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "defence",
                                        "PM"
                                    ],
                                    "title": "Heavy Air-Defence Ring Repels C2 Bunker Raid",
                                    "messages": [
                                        "Layered Russian SAM batteries around the command bunker shoot down a British stealth fighter, sending escalation soaring and shaking the home front.",
                                        "High-risk decapitation raid runs into an intact S-400 screen; one F-35B is lost and war tension spikes critically."
                                    ],
                                    "severity": "danger",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.7,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "defence",
                                    "PM"
                                ],
                                "title": "Heavy Air-Defence Ring Repels C2 Bunker Raid",
                                "messages": [
                                    "Layered Russian SAM batteries around the command bunker shoot down a British stealth fighter, sending escalation soaring and shaking the home front.",
                                    "High-risk decapitation raid runs into an intact S-400 screen; one F-35B is lost and war tension spikes critically."
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
                            "PM",
                            "defence",
                            "home"
                        ],
                        "title": "High-Risk Deep Strike Launched Against Russian C2 Bunker",
                        "messages": [
                            "British F-35B stealth fighters armed with bunker-buster munitions penetrate deep into heavily defended airspace targeting Russia's military command headquarters.",
                            "COBRA authorises the high-risk decapitation strike against Russia's theatre command node."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            },
            "isManualAction": true
        },
        {
            "id": "act_eu_coalition",
            "name": "Form European Defence Coalition",
            "description": "Rally European allies like France and Germany to unite their armies and stand firm against Russian aggression.",
            "image": "act_eu_coalition",
            "initiator": [
                "PM",
                "foreign"
            ],
            "conditions": {
                "minScores": {
                    "civilian_stability": 2
                },
                "any": [
                    {
                        "triggeredEvents": [
                            "ev_uk_casualty_leak"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_gps_jamming"
                        ]
                    },
                    {
                        "triggeredEvents": [
                            "ev_maritime_shadowing"
                        ]
                    }
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_eu_success",
                        "effects": {
                            "scores": {
                                "uk_europe": 2,
                                "military_escalation": -1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "foreign",
                                        "PM"
                                    ],
                                    "title": "Paris, Berlin & Warsaw Sign Joint Defence Pact",
                                    "messages": [
                                        "European leaders endorse Britain's coalition proposal, pooling air-defence and naval patrols to stabilise the theatre.",
                                        "Major European powers sign onto the UK-led mutual defence framework, strengthening European cohesion."
                                    ],
                                    "severity": "success",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.7,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "foreign",
                                    "PM"
                                ],
                                "title": "Paris, Berlin & Warsaw Sign Joint Defence Pact",
                                "messages": [
                                    "European leaders endorse Britain's coalition proposal, pooling air-defence and naval patrols to stabilise the theatre.",
                                    "Major European powers sign onto the UK-led mutual defence framework, strengthening European cohesion."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_eu_fail",
                        "effects": {
                            "scores": {
                                "uk_europe": -1
                            },
                            "outcomeMessages": [
                                {
                                    "roles": [
                                        "foreign",
                                        "PM"
                                    ],
                                    "title": "European Capitals Deadlock Over Joint Command Terms",
                                    "messages": [
                                        "Disputes over national parliamentary vetoes stall the Brussels defence summit, weakening European cohesion.",
                                        "Reluctant European governments decline binding troop commitments at the emergency summit."
                                    ],
                                    "severity": "warning",
                                    "aiRandomize": true
                                }
                            ]
                        },
                        "probability": 0.3,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "foreign",
                                    "PM"
                                ],
                                "title": "European Capitals Deadlock Over Joint Command Terms",
                                "messages": [
                                    "Disputes over national parliamentary vetoes stall the Brussels defence summit, weakening European cohesion.",
                                    "Reluctant European governments decline binding troop commitments at the emergency summit."
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
                            "foreign",
                            "PM"
                        ],
                        "title": "Britain Convenes Emergency European Defence Summit",
                        "messages": [
                            "British envoys meet counterparts from France, Germany, and Poland in Brussels to negotiate an integrated European defence coalition.",
                            "Downing Street and the Foreign Office launch an urgent diplomatic push to unite European air and naval commands."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            },
            "isManualAction": true
        },
        {
            "id": "ev_north_sea_pipeline",
            "stage": "stage_2",
            "name": "North Sea Gas Pipeline Pressure Drop",
            "sound": "sonar",
            "repeatable": false,
            "location": [
                57.8,
                1.4
            ],
            "possibleLocations": [
                [
                    57.8,
                    1.4
                ],
                [
                    58.3,
                    0.8
                ],
                [
                    56.9,
                    2.1
                ]
            ],
            "image": "ev_undersea_cables_alt",
            "description": "Operators at St Fergus terminal report a sudden pressure drop on the Langeled gas interconnector. A shadow-fleet trawler with switched-off AIS was spotted loitering directly overhead.",
            "autoEffects": {
                "revealAssets": [
                    "a_rus_spy_trawler"
                ],
                "scores": {
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "home"
                        ],
                        "title": "Shadow Spy Trawler Plotted Over Langeled Gas Pipeline",
                        "messages": [
                            "Type 26 sonar plots the unflagged Russian spy trawler directly over the damaged North Sea gas pipeline as UK wholesale energy prices spike and public anxiety rises.",
                            "St Fergus gas pressure drops sharply while naval sensors reveal a suspect Russian shadow-fleet trawler loitering above the interconnector."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "NORTH SEA GAS PIPELINE PRESSURE DROP — SUSPECT SHIP PLOTTED",
                        "message": "Shadow-fleet trawler revealed near Langeled interconnector; UK gas prices surge.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
            },
            "roleDescriptions": {
                "defence": "Type 26 frigate sonar has plotted the shadow-fleet trawler on our tactical map—she is still inside the North Sea sector.",
                "home": "UK wholesale gas prices spiked 40% in ten minutes; emergency winter reserves are sufficient for 12 days.",
                "foreign": "Norway is requesting an urgent joint naval protection patrol over shared North Sea energy infrastructure."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How do we respond to the suspected pipeline sabotage?",
                    "options": [
                        {
                            "id": "opt_pipe_board",
                            "text": "Send Royal Navy Wildcat & Royal Marines to intercept and inspect the shadow trawler.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_rus_spy_trawler": "detained"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_europe": 1,
                                    "military_escalation": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Royal Marines Detain Shadow Trawler Over Pipeline",
                                        "messages": [
                                            "Wildcat helicopters insert Royal Marines onto the suspect trawler, detaining her crew and uncovering seabed demolition charges, earning Norwegian praise while raising maritime tension.",
                                            "Boarding teams detain the shadow-fleet spy vessel in the North Sea, boosting allied confidence and UK readiness."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL MARINES BOARD & DETAIN NORTH SEA SPY TRAWLER",
                                        "message": "Suspect vessel seized near Langeled gas pipeline after pressure drop.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_pipe_escort",
                            "text": "Establish a joint UK-Norwegian frigate patrol without boarding the vessel.",
                            "effects": {
                                "hideAssets": [
                                    "a_rus_spy_trawler"
                                ],
                                "scores": {
                                    "uk_europe": 1,
                                    "civilian_stability": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign",
                                            "home"
                                        ],
                                        "title": "Joint UK–Norwegian Patrol Secures Pipeline Corridor",
                                        "messages": [
                                            "British and Norwegian frigates establish a protective screen over the Langeled pipeline, calming energy markets and strengthening European cooperation as the unboarded spy trawler slips away into fog.",
                                            "Visible allied pipeline patrols reassure energy markets and households, though the suspect trawler escapes into international waters."
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
            "id": "ev_spy_trawler_anchor",
            "stage": "stage_2",
            "name": "Shadow-Fleet Trawler Drags Anchor Over Sea Cable",
            "sound": "sonar",
            "repeatable": false,
            "location": [
                57.4,
                1.9
            ],
            "possibleLocations": [
                [
                    57.4,
                    1.9
                ],
                [
                    56.5,
                    -1.2
                ],
                [
                    58.1,
                    -2.4
                ]
            ],
            "image": "ev_undersea_cable",
            "description": "Maritime Coastguard radar tracks an unflagged Russian-crewed trawler dragging its anchor across a major North Sea telecoms trunk.",
            "autoEffects": {
                "revealAssets": [
                    "a_rus_spy_trawler"
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "cyber"
                        ],
                        "title": "Coastguard Radar Plots Trawler Dragging Anchor on Cable",
                        "messages": [
                            "Maritime surveillance reveals the shadow-fleet spy trawler dragging a heavy anchor across a North Sea data trunk as European packet loss spikes.",
                            "Tactical plots lock onto the Russian-crewed trawler directly above critical North Sea fibre cables."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            },
            "roleDescriptions": {
                "cyber": "Packet loss to mainland Europe jumped 35%. Rerouting financial traffic via transatlantic links.",
                "defence": "An Astute-class submarine and Type 23 frigate are within 40 nautical miles."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "Authorise forced interdiction of the shadow trawler?",
                    "options": [
                        {
                            "id": "opt_trawler_seize",
                            "text": "Order the Type 23 frigate to fire warning shots and seize the vessel.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_rus_spy_trawler": "detained"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "cyber"
                                        ],
                                        "title": "Warning Shots Stop & Detain Cable-Sabotage Trawler",
                                        "messages": [
                                            "Gunfire across the trawler's bow forces her engines to stop; Royal Navy boarding parties detain the vessel and halt further cable damage, lifting readiness as tension rises.",
                                            "Type 23 boarding teams seize the anchor-dragging spy trawler, protecting remaining North Sea fibre trunks."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_trawler_shadow",
                            "text": "Photograph the hull and pass evidence to maritime insurers and NATO.",
                            "effects": {
                                "hideAssets": [
                                    "a_rus_spy_trawler"
                                ],
                                "scores": {
                                    "uk_europe": 1,
                                    "civilian_stability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "cyber",
                                            "home"
                                        ],
                                        "title": "Evidence Shared With NATO as Trawler Slips Away",
                                        "messages": [
                                            "Photographic proof of the dragged anchor strengthens European sanctions coordination, but the unstopped vessel disappears into shipping lanes after slowing UK internet traffic.",
                                            "NATO partners welcome the forensic dossier even as lingering broadband outages frustrate British businesses."
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
            "id": "ev_heathrow_gps_spoof",
            "stage": "stage_2",
            "name": "GPS Spoofing Disrupts Heathrow & Gatwick",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                51.47,
                -0.45
            ],
            "image": "ev_gps_jamming",
            "description": "Airliners approaching Heathrow and Gatwick report false cockpit terrain warnings and corrupted GPS navigation signals originating from electronic warfare jammers.",
            "roleDescriptions": {
                "cyber": "NCSC confirms high-power GNSS spoofing across south-east England—airlines are diverting to Manchester and Dublin.",
                "media": "Passenger panic is spreading across social media with rumours of an imminent air attack on London."
            },
            "decisions": [
                {
                    "role": "cyber",
                    "text": "Immediate NATS & NCSC response to the London GPS spoofing:",
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt_gps_ground",
                    "options": [
                        {
                            "id": "opt_gps_legacy",
                            "text": "Switch NATS immediately to legacy ground-based ILS/VOR beacons and keep airports open at reduced flow.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "cyber",
                                            "home",
                                            "media"
                                        ],
                                        "title": "Ground Radio Beacons Keep Heathrow & Gatwick Flying",
                                        "messages": [
                                            "NATS controllers shift approaching jets onto legacy ILS and VOR radio beams, keeping London airports safely open and reassuring passengers while freeing RAF EW assets.",
                                            "Seamless fallback to ground-based radar and radio navigation defeats the GPS spoofing without closing UK skies."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_gps_ground",
                            "text": "Impose a temporary UK airspace ground-stop while RAF/NCSC triangulate the spoofers.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "cyber",
                                            "defence",
                                            "media"
                                        ],
                                        "title": "London Airspace Ground-Stop Allows Jammer Triangulation",
                                        "messages": [
                                            "Clearing civilian flights over south-east England lets RAF Rivet Joint and NCSC teams pinpoint the electronic warfare emitters, though stranded passengers pack Heathrow terminals.",
                                            "Halting London departures gives military EW analysts clean spectrum data while images of grounded airliners unsettle the public."
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
            "id": "ev_nhs_ransomware",
            "stage": "stage_2",
            "name": "NHS Trust Ransomware Cascade",
            "sound": "teletype",
            "repeatable": false,
            "location": [
                51.52,
                -0.14
            ],
            "possibleLocations": [
                [
                    51.52,
                    -0.14
                ],
                [
                    53.48,
                    -2.24
                ],
                [
                    52.48,
                    -1.89
                ]
            ],
            "image": "evt_hospital_power_failure",
            "description": "Twelve major NHS hospital trusts have been locked out of patient records and A&E triage systems by wiper malware traced to a compromised UK telecoms core node.",
            "autoEffects": {
                "revealAssets": [
                    "a_compromised_telecom_node"
                ],
                "scores": {
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "cyber",
                            "home"
                        ],
                        "title": "Compromised Telecoms Node Pinpointed Behind NHS Outage",
                        "messages": [
                            "NCSC forensic probes reveal the Compromised UK Telecoms Core Node driving the hospital ransomware cascade as ambulance diversions rattle the public.",
                            "Twelve NHS trusts drop to paper records while NCSC plots the infected fibre exchange on the tactical map."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "CYBER ATTACK HITS 12 NHS HOSPITAL TRUSTS",
                        "message": "Emergency departments divert ambulances as NCSC traces malware to telecoms hub.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
            },
            "roleDescriptions": {
                "cyber": "NCSC has traced the command-and-control beacon to a compromised UK Telecoms Core Node—it is now visible on the map for a manual NCSC Purge!",
                "home": "Ambulances are being diverted across three regions. Public anxiety is surging."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "How do we stabilise emergency hospital operations?",
                    "options": [
                        {
                            "id": "opt_nhs_military",
                            "text": "Activate MACA (Military Aid to Civil Authorities) to deploy Army medics and paper-triage logistics.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "defence"
                                        ],
                                        "title": "Army Medical & Signal Teams Stabilise A&E Triage",
                                        "messages": [
                                            "Royal Army Medical Corps personnel and military field radios keep affected A&E departments functioning safely, reassuring patients while drawing down military medical reserves.",
                                            "MACA deployment restores orderly emergency care at hit NHS hospitals at a modest cost to military readiness."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_nhs_isolate",
                            "text": "Sever regional NHS networks immediately and keep military units on combat standby.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "cyber",
                                            "defence"
                                        ],
                                        "title": "NHS Trusts Cut Off From Spine Network to Contain Malware",
                                        "messages": [
                                            "Hard-disconnecting hospital IT stops the wiper spreading and keeps armed forces focused on combat readiness, though cancelled operations and ambulance queues distress families.",
                                            "Severing regional NHS links preserves military medical readiness while leaving civilian wards struggling offline."
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
            "id": "ev_deepfake_pm",
            "stage": "stage_1",
            "name": "Deepfake PM Emergency Broadcast Goes Viral",
            "sound": "teletype",
            "repeatable": false,
            "location": [
                51.5,
                -0.12
            ],
            "image": "ev_disinfo_campaign",
            "description": "A hyper-realistic AI deepfake video of the Prime Minister announcing immediate military conscription and bank account freezes has racked up 8 million views in 20 minutes.",
            "roleDescriptions": {
                "media": "Queues are already forming outside high-street ATMs. We have seconds to kill this narrative before a bank run starts.",
                "cyber": "Botnets routed through St Petersburg boosted the video across TikTok, X, and WhatsApp simultaneously."
            },
            "decisions": [
                {
                    "role": "media",
                    "text": "How do we counter the viral deepfake broadcast?",
                    "timeLimitMs": 50000,
                    "defaultOptionId": "opt_df_statement",
                    "options": [
                        {
                            "id": "opt_df_live",
                            "text": "Put the Prime Minister live on BBC/Sky from Downing Street within 5 minutes to debunk it.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "PM",
                                            "cyber"
                                        ],
                                        "title": "Instant Live Downing Street Appearance Crushes Deepfake",
                                        "messages": [
                                            "Putting the Prime Minister live outside No. 10 alongside NCSC forensic watermarks exposes the Russian fake within minutes, stopping ATM queues and earning praise from European disinformation monitors.",
                                            "Rapid live broadcast proof debunks the conscription hoax before panic can take hold."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_df_statement",
                            "text": "Issue a written Cabinet Office denial and ask social platforms to take the clip down.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "media",
                                            "home"
                                        ],
                                        "title": "Written Denial Outpaced by Viral Conscription Rumours",
                                        "messages": [
                                            "By the time social platforms remove the fake video, millions have shared screenshots and anxious savers are queuing outside high-street banks.",
                                            "A dry text press release fails to catch up with the viral deepfake, denting public calm."
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
            "id": "ev_mi5_sleeper_cell",
            "stage": "stage_2",
            "name": "EYES ONLY: MI5 Tracks GRU Sabotage Cell",
            "sound": "teletype",
            "repeatable": false,
            "visibleTo": [
                "PM",
                "home",
                "cyber"
            ],
            "location": [
                52.95,
                -1.15
            ],
            "possibleLocations": [
                [
                    52.95,
                    -1.15
                ],
                [
                    53.79,
                    -1.54
                ],
                [
                    51.75,
                    -1.25
                ]
            ],
            "image": "substation_alpha",
            "description": "CLASSIFICATION: UK EYES ONLY. MI5 surveillance has identified a four-person GRU Unit 29155 sabotage cell reconnoitring a major 400kV National Grid substation in the Midlands.",
            "autoEffects": {
                "revealAssets": [
                    "a_gru_sabotage_cell"
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "PM",
                            "home",
                            "cyber"
                        ],
                        "title": "EYES ONLY: GRU Sabotage Cell Pinpointed on Tactical Map",
                        "messages": [
                            "MI5 watcher teams plot the suspected GRU Unit 29155 safe house near the Midlands 400kV substation, unlocking the MI5 raid option.",
                            "Thames House counter-espionage cells fix the coordinates of the covert Russian sabotage team."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            },
            "roleDescriptions": {
                "home": "The GRU cell is now plotted on your map. You can raid them immediately via the MI5 Manual Action, or keep watching to roll up their handlers.",
                "PM": "Remember: Media and Foreign cannot see this alert. Brief COBRA verbally if you want coordinated cover."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "Immediate MI5 posture on the GRU sabotage cell:",
                    "options": [
                        {
                            "id": "opt_mi5_cordon",
                            "text": "Place covert armed police around the substation and prepare an immediate raid.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "home",
                                            "cyber"
                                        ],
                                        "title": "EYES ONLY: Covert Armed Ring Protects Midlands Substation",
                                        "messages": [
                                            "Unmarked counter-terror firearms teams seal off the 400kV transformer perimeter and prime a dawn strike team, safeguarding grid stability and defence power feeds.",
                                            "Discrete armed containment locks down the Midlands substation approaches ahead of an arrest operation."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_mi5_watch",
                            "text": "Keep deep surveillance only to map their full UK network (Risk of sabotage).",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "civilian_stability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "home",
                                            "cyber"
                                        ],
                                        "title": "EYES ONLY: Deep Surveillance Logs GRU Handler Links",
                                        "messages": [
                                            "Holding off arrest allows GCHQ and MI5 to map foreign handler relays shared with US intelligence, though leaving the armed cell at large near the grid carries domestic risk.",
                                            "Signals traces from the unwary GRU operatives yield valuable counter-intelligence for Five Eyes partners while the substation remains at risk."
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
            "id": "ev_gchq_war_cabinet",
            "stage": "stage_3",
            "name": "EYES ONLY: GCHQ Intercepts Kremlin War-Cabinet Split",
            "sound": "teletype",
            "repeatable": false,
            "visibleTo": [
                "PM",
                "foreign",
                "cyber"
            ],
            "location": [
                50.88,
                -4.55
            ],
            "image": "gchq_bude",
            "description": "CLASSIFICATION: TOP SECRET STRAP 1. GCHQ Bude has decrypted high-level Moscow traffic showing Russian Defence Ministry commanders warning the Kremlin that their Northern Fleet is overstretched.",
            "roleDescriptions": {
                "foreign": "This intelligence gives us massive diplomatic leverage—if we share it selectively with Washington and Brussels without burning the intercept source.",
                "PM": "Defence and Media cannot see this alert. Decide whether to exploit it diplomatically or pass targeting leads to Defence."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How should we exploit the GCHQ Kremlin intercept?",
                    "options": [
                        {
                            "id": "opt_gchq_share_allies",
                            "text": "Brief Five Eyes and key NATO capitals privately to harden allied resolve.",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "foreign",
                                            "cyber"
                                        ],
                                        "title": "EYES ONLY: Sanitized GCHQ Decrypt Hardens Allied Spine",
                                        "messages": [
                                            "Sharing sanitized proof of Northern Fleet overstretch stiffens resolve in Washington and key European capitals without compromising GCHQ Bude's collection method.",
                                            "Five Eyes and senior NATO partners rally behind Britain after reviewing the high-grade Kremlin assessment."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_gchq_backchannel",
                            "text": "Use the insight to press Moscow via secret diplomatic backchannels for a pause.",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "military_escalation": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "foreign",
                                            "cyber"
                                        ],
                                        "title": "EYES ONLY: Targeted Backchannel Pressure Cools Naval Tempo",
                                        "messages": [
                                            "Subtly signalling awareness of Northern Fleet logistics limits persuades Russian commanders to dial back risky naval deployments, though Moscow suspects a deep leak.",
                                            "Precision diplomatic leverage derived from the Bude decrypt prompts a quiet reduction in Russian operational tempo."
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
            "id": "ev_giuk_tanker_collision",
            "stage": "stage_3",
            "name": "Allied Tanker Collision in GIUK Gap",
            "sound": "alert",
            "repeatable": false,
            "location": [
                60.2,
                -7.4
            ],
            "possibleLocations": [
                [
                    60.2,
                    -7.4
                ],
                [
                    59.4,
                    -5.8
                ],
                [
                    61.1,
                    -9.2
                ]
            ],
            "image": "rfa_mounts_bay",
            "description": "During aggressive Russian surface-group manoeuvres in heavy North Atlantic fog, an RFA fleet tanker has collided with a shadowed Russian destroyer in the GIUK Gap.",
            "roleDescriptions": {
                "defence": "Both ships are afloat, but Russian warships are boxing in our damaged tanker.",
                "foreign": "Moscow is already claiming the Royal Navy rammed their warship in international waters."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How do we recover the damaged RFA tanker?",
                    "options": [
                        {
                            "id": "opt_giuk_escort",
                            "text": "Dispatch Type 26 frigate and RAF Poseidon top-cover to escort the tanker back to Clyde.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Armed Frigate & P-8A Screen Escorts Damaged RFA Tanker",
                                        "messages": [
                                            "A Type 26 frigate and armed P-8A Poseidon aircraft break through the Russian surface screen to shepherd the damaged RFA tanker safely toward the Clyde, lifting readiness as sea tension rises.",
                                            "Firm Royal Navy escort operations recover the auxiliary tanker intact despite close-quarters Russian harassment."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_giuk_hotline",
                            "text": "Activate the UK-Russia Incidents at Sea maritime hotline to de-conflict recovery.",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_russia": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Incidents-at-Sea Hotline Separates Warships in GIUK Fog",
                                        "messages": [
                                            "Direct admiralty-to-admiralty communication separates the ships and lets salvage tugs assist the damaged RFA tanker, lowering immediate clash risk despite mutual diplomatic protests.",
                                            "Maritime hotline protocols defuse a potential gunfight in the GIUK Gap while Moscow and London trade blame."
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
            "id": "ev_baltic_drone_ambush",
            "stage": "stage_3",
            "name": "Baltic UK Convoy Ambushed by Loitering Munitions",
            "sound": "explosion",
            "repeatable": false,
            "location": [
                58.37,
                26.72
            ],
            "image": "ev_drone_swarm_perimeter",
            "description": "A British Army logistics convoy reinforcing NATO Enhanced Forward Presence in Estonia has come under attack by Lancet-style loitering munitions launched from across the border.",
            "roleDescriptions": {
                "defence": "Two vehicles are burning. Ground commanders request immediate Typhoon close air support and electronic warfare cover.",
                "media": "Helmet-cam footage is already circulating on Telegram."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "Authorise Rules of Engagement for the Baltic ambush:",
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt_baltic_defend",
                    "options": [
                        {
                            "id": "opt_baltic_counterfire",
                            "text": "Authorise counter-battery artillery and RAF EW suppression against launch sites.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "British Artillery & EW Silence Drone Launch Sites",
                                        "messages": [
                                            "AS90 artillery fire and RAF electronic jamming crush the drone control teams, protecting the British battlegroup and reassuring Estonian allies while raising frontline escalation.",
                                            "Decisive counter-battery suppression saves the Baltic convoy and wins strong praise from Eastern European allies."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_baltic_defend",
                            "text": "Restrict forces to point air-defence and rapid casualty evacuation without cross-border fire.",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "civilian_stability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "media",
                                            "home"
                                        ],
                                        "title": "Restrained Convoy Extraction Avoids Cross-Border Duel",
                                        "messages": [
                                            "Holding back cross-border artillery fire prevents a wider border battle, but viral Telegram videos of burning British trucks spark public frustration at home.",
                                            "Chinook medevac teams extract the convoy under short-range air-defence cover while domestic critics question strict rules of engagement."
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
            "id": "ev_commons_no_confidence",
            "stage": "stage_3",
            "name": "Parliamentary No-Confidence Rumours",
            "sound": "teletype",
            "repeatable": false,
            "hiddenFrom": [
                "defence"
            ],
            "location": [
                51.499,
                -0.124
            ],
            "image": "ev_crisis_cabinet",
            "description": "Backbench MPs across Westminster are circulating letters demanding an emergency Commons vote on the government's handling of the crisis and cost-of-living fallout.",
            "roleDescriptions": {
                "PM": "A leadership revolt mid-crisis would signal fatal weakness to Moscow and NATO.",
                "media": "Political editors at Westminster are running wall-to-wall speculation."
            },
            "decisions": [
                {
                    "role": "PM",
                    "text": "How do you steady Parliament?",
                    "options": [
                        {
                            "id": "opt_commons_bipartisan",
                            "text": "Invite opposition leaders into a Privy Council briefing to forge national unity.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "media",
                                            "home",
                                            "foreign"
                                        ],
                                        "title": "Cross-Party Privy Council Briefing Unites Westminster",
                                        "messages": [
                                            "Opposition leaders emerge from Downing Street pledging full national unity during the emergency, quelling backbench rebellion and reassuring European allies.",
                                            "Bipartisan consensus in the House of Commons steadies public confidence and signals British political cohesion abroad."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_commons_whip",
                            "text": "Impose a three-line whip and warn rebels not to undermine British troops in theatre.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "media",
                                            "home"
                                        ],
                                        "title": "Hardline Whip Crushes Revolt Amid Westminster Row",
                                        "messages": [
                                            "Party whips force rebel MPs to withdraw their letters and pass emergency defence funding, though bitter partisan clashes on live TV unsettle the public.",
                                            "Enforcing strict parliamentary discipline secures rapid military budget votes while fueling noisy Westminster drama."
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
            "id": "ev_sub_breaks_contact",
            "stage": "stage_3",
            "name": "Faslane Submarine Slips Sonar Net",
            "sound": "sonar",
            "repeatable": false,
            "location": [
                56,
                -5.5
            ],
            "image": "ev_sub_detection",
            "description": "The Russian Yasen-class submarine off Faslane has exploited deep acoustic layers in the North Channel and vanished from Royal Navy sonar screens.",
            "autoEffects": {
                "hideAssets": [
                    "a_rus_sub_faslane"
                ],
                "scores": {
                    "military_readiness": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "PM"
                        ],
                        "title": "Sonar Contact Lost: Russian Sub Vanishes Near Clyde",
                        "messages": [
                            "The Russian attack submarine slips beneath a deep North Channel thermal layer and disappears from tactical sonar plots, forcing Faslane submarine movements onto defensive hold.",
                            "ASW frigates lose acoustic lock on the Russian boat off HMNB Clyde, lowering naval readiness while she lurks unseen."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            },
            "roleDescriptions": {
                "defence": "Contact lost! Because she was not neutralised or driven off, she remains hidden and operational near the Clyde approaches."
            },
            "decisions": []
        },
        {
            "id": "ev_sub_faslane_reemerges",
            "stage": "stage_4",
            "name": "Elusive Russian Sub Re-Emerges Off Clyde!",
            "sound": "sonar",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                55.7,
                -5.1
            ],
            "possibleLocations": [
                [
                    55.7,
                    -5.1
                ],
                [
                    56.2,
                    -5.8
                ],
                [
                    55.2,
                    -5.4
                ]
            ],
            "image": "ev_sub_surfaces",
            "description": "The Russian Yasen-class submarine that slipped sonar earlier has re-emerged close to the Clyde submarine transit corridor, pinging actively on an outbound Royal Navy escort!",
            "conditions": {
                "assetStates": {
                    "a_rus_sub_faslane": "operational"
                },
                "hiddenAssets": [
                    "a_rus_sub_faslane"
                ],
                "triggeredEvents": [
                    "ev_sub_breaks_contact",
                    "ev_akrotiri_strike"
                ]
            },
            "autoEffects": {
                "revealAssets": [
                    "a_rus_sub_faslane"
                ],
                "scores": {
                    "military_escalation": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "PM"
                        ],
                        "title": "Urgent Sonar Contact: Russian Sub Back in Clyde Channel",
                        "messages": [
                            "Sonobuoys re-acquire the Russian Yasen-class submarine directly across the HMNB Clyde transit lane, pinging outbound Royal Navy units and spiking escalation.",
                            "The elusive Russian attack submarine re-emerges on the tactical map off Faslane in an aggressive close-quarters challenge."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            },
            "roleDescriptions": {
                "defence": "She came back right on our deterrent transit lane! P-8A Poseidon and HMS Ambush have a firing solution."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "Immediate anti-submarine response off the Clyde:",
                    "timeLimitMs": 50000,
                    "defaultOptionId": "opt_sub_re_ping",
                    "options": [
                        {
                            "id": "opt_sub_re_engage",
                            "text": "Drop warning depth charges and force her to surface or leave UK waters immediately.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_rus_sub_faslane": "withdrawing"
                                },
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "Warning Depth Charges Drive Russian Sub From Clyde",
                                        "messages": [
                                            "Signalling depth-charge detonations from Royal Navy ASW units force the Russian submarine to abort her patrol and withdraw into open Atlantic waters, clearing the deterrent lane.",
                                            "Aggressive ASW prosecution compels the intruding submarine to turn away from HMNB Clyde, restoring naval readiness while raising tension."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ROYAL NAVY DRIVES OFF RUSSIAN SUBMARINE NEAR FASLANE",
                                        "message": "Warning depth charges force intruding submarine to withdraw from Clyde approaches.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_sub_re_ping",
                            "text": "Hold active sonar lock and delay the Clyde sail-out until she clears the channel.",
                            "effects": {
                                "scores": {
                                    "military_readiness": -1,
                                    "military_escalation": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "Clyde Submarine Sail-Out Delayed to Avoid Underwater Clash",
                                        "messages": [
                                            "Holding Royal Navy movements inside Gare Loch while tracking the intruder avoids a live firing engagement, though delayed deployments reduce fleet readiness.",
                                            "Cautious sonar containment prevents an undersea torpedo exchange at the cost of temporary operational delay."
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
            "id": "ev_iskander_mobile",
            "stage": "stage_4",
            "name": "Kaliningrad Iskander Battery Goes Mobile",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                54.71,
                20.51
            ],
            "possibleLocations": [
                [
                    54.71,
                    20.51
                ],
                [
                    54.88,
                    20.15
                ],
                [
                    54.52,
                    21.05
                ]
            ],
            "image": "rus_iskander",
            "description": "NATO satellite imagery detects a Russian road-mobile Iskander-M ballistic missile battery dispersing out of Kaliningrad into forested launch sites within range of allied airbases.",
            "autoEffects": {
                "revealAssets": [
                    "a_kaliningrad_iskander"
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "defence",
                            "foreign"
                        ],
                        "title": "Kaliningrad Iskander-M Battery Plotted in Field Position",
                        "messages": [
                            "Allied overhead imagery reveals a mobile Russian Iskander-M ballistic missile battery deployed in forested launch sites inside Kaliningrad.",
                            "Tactical maps update with the coordinates of a road-mobile Iskander missile unit threatening NATO eastern flank airbases."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            },
            "roleDescriptions": {
                "defence": "The Iskander battery is plotted on our map—if we do not track or deter it, it will slip under canopy cover again.",
                "foreign": "Poland and Lithuania are demanding immediate NATO air-defence reinforcement."
            },
            "decisions": [
                {
                    "role": "defence",
                    "text": "How do we respond to the dispersed Kaliningrad Iskander battery?",
                    "options": [
                        {
                            "id": "opt_isk_track",
                            "text": "Keep RC-135W Rivet Joint and NATO AWACS locked on the battery and surge Patriot/Sky Sabre readiness.",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Continuous Rivet Joint Lock & Sky Sabre Shield Reassure Allies",
                                        "messages": [
                                            "RAF Rivet Joint aircraft maintain unbroken electronic lock on the Kaliningrad launchers while Sky Sabre batteries move to instant intercept status, boosting readiness and Polish-Lithuanian confidence.",
                                            "Continuous allied ISR tracking keeps the mobile Iskander battery pinned on the map and strengthens European defence cohesion."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_isk_standoff",
                            "text": "Pull ISR patrols back to reduce provocation risk (Battery disappears into forest cover).",
                            "effects": {
                                "hideAssets": [
                                    "a_kaliningrad_iskander"
                                ],
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_europe": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Iskander Battery Slips Into Forest Cover as Patrols Pull Back",
                                        "messages": [
                                            "Drawing back reconnaissance flights lowers air-defence friction, but the mobile Iskander launchers vanish beneath forest camouflage and frontline European allies protest.",
                                            "Losing radar track on the Kaliningrad missile battery calms immediate airspace tension while rattling Poland and Lithuania."
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
            "id": "ev_channel_tunnel_alert",
            "stage": "stage_4",
            "name": "Channel Tunnel Security & Sabotage Alert",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                51.09,
                1.14
            ],
            "image": "ev_bridge_collapse",
            "description": "French and British counter-terror police have intercepted credible chatter of an explosive sabotage attempt targeting the Folkestone Channel Tunnel freight terminal.",
            "roleDescriptions": {
                "home": "Closing the tunnel halts 25% of UK-EU food and medical freight instantly; keeping it open risks a catastrophic attack."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "Order immediate closure of the Channel Tunnel?",
                    "timeLimitMs": 55000,
                    "defaultOptionId": "opt_tunnel_close",
                    "options": [
                        {
                            "id": "opt_tunnel_close",
                            "text": "Suspend all Eurostar and freight shuttles for a full 12-hour bomb sweep.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "foreign",
                                            "media"
                                        ],
                                        "title": "Eurotunnel Shut for 12-Hour Joint Bomb Sweep",
                                        "messages": [
                                            "Anglo-French EOD teams sweep every Folkestone and Calais rail tunnel while lorry queues back up across Kent, earning Paris's gratitude at a cost to domestic supply calm.",
                                            "Halting Channel Tunnel trains guarantees infrastructure safety and pleases French security chiefs, though M20 freight tailbacks rattle shoppers."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_tunnel_screen",
                            "text": "Deploy armed police and military sniffer teams while keeping vital medical freight rolling.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "military_readiness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "defence"
                                        ],
                                        "title": "Military Search Teams Keep Channel Freight Rolling",
                                        "messages": [
                                            "Royal Engineers search dogs and armed police screen every wagon at Folkestone without stopping medical and food trains, steadying domestic supply chains while tying down specialist military units.",
                                            "Continuous mobile screening keeps vital cross-Channel freight moving and reassures households at a modest cost to military readiness."
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
            "id": "ev_secret_moscow_offer",
            "stage": "stage_5",
            "name": "Secret Moscow Backchannel Pause Offer",
            "sound": "teletype",
            "repeatable": false,
            "hiddenFrom": [
                "media"
            ],
            "location": [
                55.75,
                37.61
            ],
            "image": "ev_russia_deescalate",
            "description": "Through Swiss intermediaries, Moscow signals willingness to halt all naval and cyber operations for 72 hours if Britain quietly freezes Baltic troop reinforcements.",
            "roleDescriptions": {
                "foreign": "Media has been excluded from this alert. Accepting secretly could stop a wider war—but if leaked, European allies will call it betrayal."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How should Britain respond to the Swiss backchannel offer?",
                    "options": [
                        {
                            "id": "opt_moscow_accept",
                            "text": "Engage quietly for a 72-hour tactical pause while consulting Washington.",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_russia": 1,
                                    "uk_europe": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM",
                                            "defence"
                                        ],
                                        "title": "Quiet 72-Hour Tactical Pause Tested via Geneva",
                                        "messages": [
                                            "Slowing Baltic transport flights in exchange for a 72-hour Russian cyber and naval pause lowers immediate war tension, though Eastern European capitals suspect a side-deal.",
                                            "Geneva intermediaries confirm a temporary operational pause, cooling battlefield tempo while straining trust with Baltic allies."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_moscow_reject",
                            "text": "Reject any side-deal that divides NATO and brief European partners openly.",
                            "effects": {
                                "scores": {
                                    "uk_europe": 1,
                                    "military_escalation": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM",
                                            "defence"
                                        ],
                                        "title": "Britain Rejects Kremlin Side-Deal & Briefs NATO Allies",
                                        "messages": [
                                            "Sharing Moscow's divide-and-rule offer openly with European capitals cements alliance solidarity as Baltic reinforcements continue at heightened tension.",
                                            "Refusing to freeze Baltic deployments wins strong European gratitude while keeping military confrontation elevated."
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
            "id": "ev_civil_contingencies_panic",
            "stage": "stage_3",
            "name": "Civil Contingencies Act: Nationwide Fuel & Food Panic",
            "sound": "klaxon",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                51.5,
                -0.12
            ],
            "image": "ev_supermarket_looting",
            "description": "With domestic stability at breaking point, panic buying has emptied petrol stations and supermarkets across Britain, prompting calls to invoke the Civil Contingencies Act.",
            "conditions": {
                "maxScores": {
                    "civilian_stability": 1
                },
                "triggeredEvents": [
                    "ev_kremlin_ultimatum"
                ]
            },
            "roleDescriptions": {
                "home": "Police forces are overwhelmed by forecourt queues and sporadic looting. Emergency powers will restore order at a political cost.",
                "PM": "Diverting Army logistics to fuel tankers will calm the streets but reduce frontline readiness."
            },
            "decisions": [
                {
                    "role": "home",
                    "text": "Invoke emergency rationing and military logistics support?",
                    "timeLimitMs": 60000,
                    "defaultOptionId": "opt_cca_ration",
                    "options": [
                        {
                            "id": "opt_cca_ration",
                            "text": "Invoke Civil Contingencies fuel rationing and deploy Army tanker drivers.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 2,
                                    "military_readiness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "PM",
                                            "media"
                                        ],
                                        "title": "Civil Contingencies Act Restores Fuel & Food Order",
                                        "messages": [
                                            "Emergency rationing orders and Royal Logistic Corps tanker convoys replenish dry forecourts and supermarkets, sharply restoring public order at a cost to military transport readiness.",
                                            "Statutory purchase limits and Army supply escorts halt forecourt scuffles and stabilise the home front."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "CIVIL CONTINGENCIES ACT INVOKED — ARMY RESTORES FUEL SUPPLY",
                                        "message": "Emergency rationing and military tanker convoys stabilise UK supermarkets and forecourts.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_cca_voluntary",
                            "text": "Avoid emergency powers and rely on supermarket voluntary purchase limits.",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "uk_europe": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "home",
                                            "media",
                                            "foreign"
                                        ],
                                        "title": "Voluntary Limits Fail to Stop Forecourt Queues",
                                        "messages": [
                                            "Holding off statutory emergency powers projects calm to European markets, but retail hoarding and empty shelves continue to erode domestic stability.",
                                            "Supermarket rationing requests prove too weak to stop panic buying across British towns."
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
            "id": "ev_nato_rapid_response",
            "stage": "stage_4",
            "name": "NATO Article 4/5 Rapid Response Activation",
            "sound": "klaxon",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                50.87,
                4.42
            ],
            "image": "nato_air_base",
            "description": "With military escalation at maximum level, SACEUR has placed the NATO Response Force on 24-hour war footing and asked Britain to commit RAF and Royal Navy assets to joint command.",
            "conditions": {
                "minScores": {
                    "military_escalation": 5
                },
                "triggeredEvents": [
                    "ev_kremlin_ultimatum"
                ]
            },
            "roleDescriptions": {
                "PM": "Placing UK forces under full NATO command strengthens allied deterrence, though Britain loses unilateral control over de-escalation."
            },
            "decisions": [
                {
                    "role": "PM",
                    "text": "Commit UK strike and naval assets to NATO Allied Command Operations?",
                    "options": [
                        {
                            "id": "opt_nato_commit",
                            "text": "Commit fully to NATO joint command—collective deterrence is our strongest shield.",
                            "effects": {
                                "scores": {
                                    "uk_europe": 2,
                                    "uk_us": 1,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "UK Forces Integrated Into SACEUR NATO War Command",
                                        "messages": [
                                            "Placing Royal Navy and RAF strike wings under NATO Allied Command Operations locks in full US and European collective defence and boosts combined combat readiness.",
                                            "SACEUR integrates British air and naval groups into the NATO Response Force shield, surging alliance unity."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "BRITAIN COMMITS ARMED FORCES TO NATO JOINT WAR COMMAND",
                                        "message": "RAF and Royal Navy units integrate with SACEUR Rapid Response Force.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_nato_national",
                            "text": "Coordinate closely with NATO while keeping UK forces under strict national command.",
                            "effects": {
                                "scores": {
                                    "uk_europe": -1,
                                    "military_escalation": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "PM",
                                            "defence",
                                            "foreign"
                                        ],
                                        "title": "Sovereign UK Command Retained Over British Forces",
                                        "messages": [
                                            "Keeping RAF and Royal Navy tasking under exclusive Whitehall control preserves de-escalation flexibility, though Brussels complains of fragmented command.",
                                            "Retaining strict national command authority lowers hair-trigger alliance escalation at the cost of friction with European allies."
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
            "id": "ev_five_eyes_throttled",
            "stage": "stage_4",
            "name": "Five Eyes Intelligence Sharing Throttled",
            "sound": "teletype",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                50.88,
                -4.55
            ],
            "image": "ev_us_neutrality",
            "description": "Due to severe strain in the UK-US relationship, Washington has temporarily restricted real-time US satellite targeting feeds to GCHQ and MoD.",
            "conditions": {
                "maxScores": {
                    "uk_us": 1
                },
                "triggeredEvents": [
                    "ev_kremlin_ultimatum"
                ]
            },
            "autoEffects": {
                "hideAssets": [
                    "a_kaliningrad_iskander"
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "foreign",
                            "cyber",
                            "defence"
                        ],
                        "title": "US Satellite Feeds Throttled — Kaliningrad Track Lost",
                        "messages": [
                            "Washington restricts live NRO satellite downlinks to GCHQ, causing the mobile Kaliningrad Iskander battery to drop off the tactical map.",
                            "Strained UK–US relations trigger a freeze on real-time American overhead targeting feeds, blinding live track on Kaliningrad launchers."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            },
            "roleDescriptions": {
                "foreign": "Without US overhead imagery, we have lost live tracking on mobile Russian missile batteries in Kaliningrad until relations are repaired."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How do we restore intelligence coverage?",
                    "options": [
                        {
                            "id": "opt_fvey_call_dc",
                            "text": "Have the Prime Minister call the White House immediately to offer security assurances.",
                            "effects": {
                                "scores": {
                                    "uk_us": 2,
                                    "uk_europe": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM",
                                            "cyber"
                                        ],
                                        "title": "Direct PM–President Call Restores Five Eyes Downlinks",
                                        "messages": [
                                            "Personal assurances from Downing Street persuade the White House to reopen Five Eyes satellite feeds, repairing UK–US ties while European partners feel sidelined.",
                                            "Emergency Oval Office diplomacy restores full NSA and NRO intelligence sharing with GCHQ."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_fvey_eu_sat",
                            "text": "Pivot to French Helios/CSO satellite imagery and UK sovereign ISR aircraft.",
                            "effects": {
                                "scores": {
                                    "uk_europe": 1,
                                    "military_readiness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "cyber",
                                            "defence"
                                        ],
                                        "title": "French CSO Satellites & RAF ISR Fill Intelligence Gap",
                                        "messages": [
                                            "Switching to French military reconnaissance satellites and extra RAF Rivet Joint sorties deepens European cooperation, though slower pass times trim targeting readiness.",
                                            "Anglo-French satellite sharing restores baseline imagery coverage without conceding to Washington."
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
            "id": "ev_gru_raid_success",
            "stage": "stage_3",
            "name": "MI5 & Armed Police Capture GRU Sabotage Cell",
            "sound": "alert",
            "repeatable": false,
            "location": [
                52.95,
                -1.15
            ],
            "image": "generic_police",
            "description": "Counter-Terrorism Police and MI5 raided the safe house before dawn, arresting four GRU operatives and seizing industrial explosives destined for the National Grid.",
            "autoEffects": {
                "assetStateChanges": {
                    "a_gru_sabotage_cell": "neutralised"
                },
                "scores": {
                    "civilian_stability": 1,
                    "military_readiness": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "home",
                            "PM",
                            "cyber"
                        ],
                        "title": "GRU Unit 29155 Sabotage Cell Neutralised in Dawn Raid",
                        "messages": [
                            "Counter-Terrorism firearms officers arrest all four GRU operatives and seize thermite charges aimed at the Midlands 400kV grid, securing domestic stability and defence power supplies.",
                            "MI5 and armed police roll up the Russian sabotage cell intact, neutralising the threat to the National Grid."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    }
                ]
            },
            "decisions": []
        },
        {
            "id": "ev_gru_raid_escaped",
            "stage": "stage_3",
            "name": "GRU Sabotage Cell Evades Raid",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                52.95,
                -1.15
            ],
            "image": "substation_alpha",
            "description": "The safe house was vacated minutes before armed police breached the door. The GRU sabotage team has gone dark elsewhere in the UK.",
            "autoEffects": {
                "hideAssets": [
                    "a_gru_sabotage_cell"
                ],
                "scores": {
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "home",
                            "PM",
                            "cyber"
                        ],
                        "title": "GRU Sabotage Cell Slips Police Cordon & Goes Dark",
                        "messages": [
                            "Breaching teams find burned laptops and an empty safe house; the GRU operatives vanish from the tactical map, heightening domestic security fears.",
                            "The Russian sabotage cell evades capture minutes before the raid and goes underground across the Midlands."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    }
                ]
            },
            "decisions": []
        },
        {
            "id": "ev_telecom_purged",
            "stage": "stage_3",
            "name": "NCSC Purges Compromised Telecoms Core Node",
            "sound": "teletype",
            "repeatable": false,
            "location": [
                51.52,
                -0.14
            ],
            "image": "ev_cyber_success",
            "description": "NCSC engineers cleanly isolated and rebuilt the compromised UK fibre exchange, stopping the NHS ransomware cascade and closing Moscow's backdoor.",
            "autoEffects": {
                "assetStateChanges": {
                    "a_compromised_telecom_node": "secured"
                },
                "scores": {
                    "civilian_stability": 1,
                    "military_readiness": 1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "cyber",
                            "home",
                            "defence"
                        ],
                        "title": "UK Telecoms Core Node Secured — NHS Backdoor Closed",
                        "messages": [
                            "NCSC engineers cleanly flash clean firmware across the core fibre exchange, marking the node secured, restoring NHS links, and hardening defence communications.",
                            "Live firmware remediation purges Russian malware from the UK telecoms backbone without dropping national traffic."
                        ],
                        "severity": "success",
                        "aiRandomize": true
                    }
                ]
            },
            "decisions": []
        },
        {
            "id": "ev_telecom_blackout_blip",
            "stage": "stage_3",
            "name": "Telecoms Purge Triggers 90-Minute Mobile Outage",
            "sound": "alert",
            "repeatable": false,
            "location": [
                51.52,
                -0.14
            ],
            "image": "ev_cyber_fail",
            "description": "The emergency NCSC purge removed the malware, but tripped fallback routing—knocking out mobile networks and contactless payments across southern England for 90 minutes.",
            "autoEffects": {
                "assetStateChanges": {
                    "a_compromised_telecom_node": "secured"
                },
                "scores": {
                    "civilian_stability": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "cyber",
                            "home",
                            "media"
                        ],
                        "title": "Telecoms Node Secured After 90-Minute Mobile Blackout",
                        "messages": [
                            "The emergency firmware purge eliminates the Russian implant and secures the node, but a 90-minute mobile and card-payment outage across southern England rattles shoppers.",
                            "BGP routing resets during the NCSC purge briefly knock out southern mobile coverage before the secured core node stabilises."
                        ],
                        "severity": "warning",
                        "aiRandomize": true
                    }
                ]
            },
            "decisions": []
        },
        {
            "id": "act_mi5_raid_cell",
            "isManualAction": true,
            "name": "Authorise MI5 & Armed Police Raid on GRU Cell",
            "description": "Launch an immediate counter-terrorism raid to arrest the pinpointed GRU sabotage cell before they strike the National Grid.",
            "image": "generic_police",
            "initiator": [
                "home",
                "PM"
            ],
            "requiresApprovalFrom": [
                "PM"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_mi5_sleeper_cell"
                ],
                "visibleAssets": [
                    "a_gru_sabotage_cell"
                ],
                "assetStates": {
                    "a_gru_sabotage_cell": "operational"
                },
                "notTriggeredEvents": [
                    "ev_gru_raid_success"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_gru_raid_success",
                        "delayMs": 25000,
                        "probability": 0.7,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "home",
                                    "PM",
                                    "cyber"
                                ],
                                "title": "CTSFO Strike Teams Breach Safe House With Suspects Inside",
                                "messages": [
                                    "Tactical radio reports all four GRU suspects pinned inside the Midlands safe house as armed officers move in.",
                                    "MI5 surveillance confirms the targets remained inside as police entry charges detonate."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_gru_raid_escaped",
                        "delayMs": 25000,
                        "probability": 0.3,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "home",
                                    "PM",
                                    "cyber"
                                ],
                                "title": "Lookout Alert: Suspects Fleeing Safe House Perimeter",
                                "messages": [
                                    "MI5 watchers report counter-surveillance tripwires triggered at the safe house moments before the tactical team arrives.",
                                    "Entry teams report the rear exit blown and suspects scattering into dense urban traffic."
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
                            "home",
                            "PM",
                            "cyber"
                        ],
                        "title": "MI5 & Counter-Terror Firearms Teams Launch Raid",
                        "messages": [
                            "With Prime Ministerial warrant signed, Counter-Terrorism Specialist Firearms Officers move to breach the pinpointed GRU safe house in the Midlands.",
                            "Unmarked armed police vehicles converge on the GRU cell's location to execute an immediate arrest warrant."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "act_ncsc_purge_telecom",
            "isManualAction": true,
            "name": "NCSC Emergency Telecoms Core Purge",
            "description": "Execute a live firmware purge on the compromised UK telecoms core node to stop ransomware cascades (Small risk of temporary mobile outage).",
            "image": "act_cyber_offensive",
            "initiator": [
                "cyber"
            ],
            "requiresApprovalFrom": [
                "home"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_nhs_ransomware"
                ],
                "visibleAssets": [
                    "a_compromised_telecom_node"
                ],
                "assetStates": {
                    "a_compromised_telecom_node": "operational"
                },
                "notTriggeredEvents": [
                    "ev_telecom_purged",
                    "ev_telecom_blackout_blip"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_telecom_purged",
                        "delayMs": 25000,
                        "probability": 0.75,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "cyber",
                                    "home"
                                ],
                                "title": "Core Routers Accepting Clean Firmware Image",
                                "messages": [
                                    "NCSC telemetry shows redundant fibre switches failing over smoothly as the Russian command beacon is severed.",
                                    "Live router rebuild progresses cleanly with zero packet drop on emergency services channels."
                                ],
                                "severity": "success",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_telecom_blackout_blip",
                        "delayMs": 25000,
                        "probability": 0.25,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "cyber",
                                    "home"
                                ],
                                "title": "Fallback BGP Tables Flapping During Core Purge",
                                "messages": [
                                    "NCSC engineers report secondary mobile routing tables oscillating as the infected core node reboots.",
                                    "Emergency purge triggers a temporary regional mobile switchover glitch across southern exchanges."
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
                            "cyber",
                            "home"
                        ],
                        "title": "NCSC Initiates Live Firmware Purge on Telecoms Core",
                        "messages": [
                            "NCSC incident response engineers isolate the compromised national fibre exchange and begin flashing clean routing firmware.",
                            "With Home Office clearance, cyber defenders execute an emergency purge on the infected UK telecoms backbone node."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            }
        },
        {
            "id": "ev_us_withdraws_support",
            "stage": "stage_2",
            "name": "White House Statement: US Declines to Back UK Intervention",
            "sound": "teletype",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                52.41,
                0.56
            ],
            "image": "ev_us_neutrality",
            "description": "Citing strained UK–US relations and competing Indo-Pacific priorities, the White House announces that American forces will NOT back British or European escalation over Ukraine. USAF 48th Fighter Wing aircraft at RAF Lakenheath are ordered to stand down from NATO tasking, and the US 6th Fleet Carrier Group departs the North Atlantic.",
            "conditions": {
                "maxScores": {
                    "uk_us": 2
                },
                "triggeredEvents": [
                    "ev_kremlin_ultimatum"
                ]
            },
            "autoEffects": {
                "assetStateChanges": {
                    "a_usaf_lakenheath": "withdrawn",
                    "a_usn_carrier_group": "withdrawn"
                },
                "hideAssets": [
                    "a_usaf_lakenheath",
                    "a_usn_carrier_group"
                ],
                "scores": {
                    "military_readiness": -1,
                    "uk_europe": -1
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "PM",
                            "foreign",
                            "defence"
                        ],
                        "title": "USAF Lakenheath & US 6th Fleet Withdrawn From Theatre",
                        "messages": [
                            "The White House stands down USAF 48th Fighter Wing at Lakenheath and orders the US 6th Fleet Carrier Group out of the North Atlantic, removing both assets from the tactical map and cutting allied readiness.",
                            "American air and naval assets withdraw from UK and North Atlantic tasking amid strained UK–US relations, shaking European confidence."
                        ],
                        "severity": "danger",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "WHITE HOUSE STANDS DOWN US FORCES FROM UK SUPPORT",
                        "message": "USAF Lakenheath stood down and US Carrier Group departs North Atlantic.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
            },
            "roleDescriptions": {
                "PM": "US assets have been pulled from our tactical map. Until Washington reverses course, Britain cannot call in US military transport or USAF air cover.",
                "foreign": "The Special Relationship is in deep freeze. We must decide whether to make urgent diplomatic concessions to Washington or pivot fully to European defence partners.",
                "defence": "Without USAF Lakenheath and the US Carrier Group in the North Atlantic, RAF and Royal Navy units must cover the GIUK Gap and UK airspace alone."
            },
            "decisions": [
                {
                    "role": "foreign",
                    "text": "How should Britain respond to the White House withdrawing US assets?",
                    "options": [
                        {
                            "id": "opt_usw_repair",
                            "text": "Open emergency Prime Minister–President crisis talks to restore US backing (Slows EU alignment).",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_europe": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "PM"
                                        ],
                                        "title": "Emergency Transatlantic Talks Begin to Repair US Rift",
                                        "messages": [
                                            "Direct Prime Minister–President crisis talks begin rebuilding bridges with Washington, though European capitals lament Britain's hesitation to commit to an EU-led shield.",
                                            "Urgent diplomatic concessions warm the White House channel slightly while slowing European defence integration."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_usw_eu_pivot",
                            "text": "Accept Washington's pullback and rally France, Germany, and Nordic allies into a European shield.",
                            "effects": {
                                "scores": {
                                    "uk_europe": 2,
                                    "military_readiness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "foreign",
                                            "defence",
                                            "PM"
                                        ],
                                        "title": "UK Forges Northern & European Air-Sea Shield",
                                        "messages": [
                                            "Pivoting decisively to France, Germany, and Joint Expeditionary Force Nordic allies locks in shared air-defence and GIUK naval patrols, boosting European cohesion and readiness.",
                                            "European and Nordic air and naval units surge into the North Sea and GIUK Gap alongside British forces to replace withdrawn US assets."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "BRITAIN RALLIES EUROPEAN & NORDIC DEFENCE SHIELD",
                                        "message": "UK, French, German, and Nordic forces combine air and naval patrols after US pullback.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
