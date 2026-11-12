module.exports = {
    "id": "uk_crisis",
    "name": "UK Crisis: Russian Tensions",
    "description": "Lead the British government through a dangerous standoff with Russia. Balance public safety, military readiness, and international diplomacy.",
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
            "briefing": "Her Majesty's Naval Base Clyde is one of three operating bases in the United Kingdom for the Royal Navy and is the base for the UK's continuous at-sea nuclear deterrent."
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
            "id": "ev_cyber_london",
            "stage": "stage_2",
            "name": "Cyber Attack on London Banks",
            "prerequisites": [
                "ev_logistics_failure"
            ],
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
                                }
                            }
                        },
                        {
                            "id": "opt2",
                            "text": "Hack back and strike the Russian command servers (Risks triggering bigger retaliatory cyber attacks)",
                            "effects": {
                                "scores": {
                                    "uk_russia": 1,
                                    "military_escalation": 1
                                }
                            }
                        }
                    ]
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
                                }
                            }
                        },
                        {
                            "id": "opt4",
                            "text": "Broadcast a live speech urging calm and promising banks will reopen",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1
                                }
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
                                }
                            }
                        },
                        {
                            "id": "opt6",
                            "text": "Criticize the street disruption and warn that national security comes first",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": 1
                                }
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
                                }
                            }
                        },
                        {
                            "id": "opt_log_2",
                            "text": "Let civilian companies handle supplies without sending in troops",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": -1
                                }
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
                                }
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
                                }
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
                                ]
                            }
                        },
                        {
                            "id": "opt_log_6",
                            "text": "Focus strictly on strengthening our own firewalls and defences",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_cyber_exposure",
            "stage": "stage_2",
            "name": "Allied Leak: UK Cyber Strike Exposed",
            "requiresUnlock": true,
            "prerequisites": [],
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
                                }
                            }
                        },
                        {
                            "id": "opt_exp_2",
                            "text": "Deny that the British government authorized the attack",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_russia": 1
                                }
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
                                }
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
                                }
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
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_airspace_intercept",
            "stage": "stage_3",
            "name": "Near-Miss Over the Atlantic",
            "prerequisites": [
                "ev_logistics_failure"
            ],
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
                                }
                            }
                        },
                        {
                            "id": "opt_air_2",
                            "text": "Stick to standard escort distances to avoid accidental collisions",
                            "effects": {
                                "scores": {
                                    "military_escalation": 0
                                }
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
                                }
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
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_maritime_shadowing",
            "stage": "stage_1",
            "name": "Russian Warships Over Undersea Cables",
            "prerequisites": [],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_mar_2",
                            "text": "Deploy extra destroyers and cut across their path to force them away",
                            "effects": {}
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
                            "effects": {}
                        },
                        {
                            "id": "opt_mar_4",
                            "text": "Say nothing publicly to avoid causing panic in financial markets",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_russia_hub_explosion",
            "stage": "stage_2",
            "name": "Explosion at Russian Military Rail Hub",
            "prerequisites": [],
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
                                }
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
                                }
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
                                }
                            }
                        },
                        {
                            "id": "opt_hub_4",
                            "text": "Reach out via backchannels to calm Russian leaders and avoid retaliation",
                            "effects": {
                                "scores": {
                                    "uk_russia": -1,
                                    "military_escalation": -1
                                }
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
                                }
                            }
                        },
                        {
                            "id": "opt_hub_6",
                            "text": "Keep current security levels to avoid alarming the public",
                            "effects": {
                                "scores": {
                                    "military_escalation": 1,
                                    "uk_us": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_kinetic_strike",
            "stage": "stage_4",
            "name": "Explosion at UK Military Supply Base",
            "prerequisites": [
                "ev_maritime_shadowing"
            ],
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
                                }
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
                                }
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
                                }
                            }
                        },
                        {
                            "id": "opt_kin_4",
                            "text": "Order Vanguard nuclear submarines to high combat readiness as a warning",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "civilian_stability": -2
                                }
                            }
                        },
                        {
                            "id": "opt_kin_5",
                            "text": "Boost perimeter security at all UK bases without launching a strike",
                            "effects": {
                                "scores": {
                                    "military_escalation": 0
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_sub_surfaces",
            "stage": "stage_3",
            "name": "Russian Nuclear Submarine in the Channel",
            "image": "ev_sub_surfaces",
            "prerequisites": [],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_sub_2",
                            "text": "Monitor the submarine from a distance to avoid an accidental confrontation",
                            "effects": {}
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
                            "effects": {}
                        },
                        {
                            "id": "opt_sub_4",
                            "text": "Release a brief written statement reminding the public that the Channel is an international waterway",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_undersea_cables",
            "stage": "stage_2",
            "name": "Undersea Internet Cables Cut",
            "image": "ev_undersea_cables",
            "prerequisites": [],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_cab_2",
                            "text": "Publicly call out Russia for seabed sabotage and ask allies to inspect the damage",
                            "effects": {}
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
            "prerequisites": [],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_cas_2",
                            "text": "Keep comments brief and avoid giving details while the operation continues",
                            "effects": {}
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
                            "effects": {}
                        },
                        {
                            "id": "opt_cas_4",
                            "text": "Pull back troops to safer positions behind the main border",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_chemical_attempt",
            "stage": "stage_5",
            "name": "Chemical Weapon Threat Foil in Salisbury",
            "image": "ev_chemical_attempt",
            "prerequisites": [],
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
                                }
                            }
                        },
                        {
                            "id": "opt_chem_2",
                            "text": "Quietly step up security at water plants without alarming the public",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1
                                }
                            }
                        }
                    ]
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
                                }
                            }
                        },
                        {
                            "id": "opt_chem_4",
                            "text": "Hold the suspects under arrest and present the chemical evidence to the UN",
                            "effects": {
                                "scores": {
                                    "uk_russia": 0,
                                    "civilian_stability": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_us_neutrality",
            "stage": "stage_5",
            "name": "US Pulls Back: Declares Neutrality",
            "image": "ev_us_neutrality",
            "prerequisites": [],
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
                                }
                            }
                        },
                        {
                            "id": "opt_us_2",
                            "text": "Send our Foreign Secretary to Washington to beg the US President to reconsider",
                            "effects": {
                                "scores": {
                                    "uk_us": 1,
                                    "uk_europe": -1
                                }
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
                                }
                            }
                        },
                        {
                            "id": "opt_us_4",
                            "text": "Double down on our Baltic deployments alongside French and German troops",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "uk_europe": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_akrotiri_strike",
            "stage": "stage_3",
            "name": "Missile Strike on RAF Base in Cyprus",
            "image": "ev_akrotiri_strike",
            "prerequisites": [
                "ev_uk_casualty_leak"
            ],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_akr_2",
                            "text": "Evacuate non-essential personnel and repair the runway behind air defences",
                            "effects": {}
                        },
                        {
                            "id": "opt_akr_3",
                            "text": "Ask NATO to invoke collective defence under Article 5",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_article5_ambiguity",
            "stage": "stage_5",
            "name": "NATO Allies Hesitate on Article 5",
            "image": "ev_article5_ambiguity",
            "prerequisites": [
                "ev_akrotiri_strike"
            ],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_art_2",
                            "text": "Agree to a limited coalition of willing nations (UK, Poland, Baltic States, France)",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_raf_bases_strike",
            "stage": "stage_4",
            "name": "Cruise Missile Strikes on UK Airbases",
            "image": "ev_raf_bases_strike",
            "prerequisites": [
                "ev_akrotiri_strike"
            ],
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
                                }
                            }
                        },
                        {
                            "id": "opt_raf_2",
                            "text": "Scramble all available fighters to hunt down the Russian warships that fired",
                            "effects": {
                                "scores": {
                                    "military_escalation": 2,
                                    "uk_russia": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_portsmouth_strike",
            "stage": "stage_4",
            "name": "Naval Base Portsmouth Struck",
            "image": "ev_portsmouth_strike",
            "prerequisites": [
                "ev_raf_bases_strike"
            ],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_pms_2",
                            "text": "Keep ships in port to provide anti-aircraft missile cover for civilian cities",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_faslane_strike_1",
            "stage": "stage_4",
            "name": "Drone Attack on Faslane Nuclear Base",
            "image": "ev_faslane_strike_1",
            "prerequisites": [
                "ev_raf_bases_strike"
            ],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_fas1_2",
                            "text": "Quietly slip our Vanguard nuclear submarines out to sea where they cannot be found",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_faslane_strike_2",
            "stage": "stage_4",
            "name": "Direct Missile Strike on Faslane",
            "image": "ev_faslane_strike_2",
            "prerequisites": [
                "ev_faslane_strike_1"
            ],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_fas2_2",
                            "text": "Launch conventional air strikes against Russian submarine bases in the Arctic",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_power_grid_strike",
            "stage": "stage_4",
            "name": "National Power Grid Blackout",
            "image": "ev_power_grid_strike",
            "prerequisites": [
                "ev_raf_bases_strike"
            ],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_pow_2",
                            "text": "Ration emergency generators and ask communities to support vulnerable neighbours",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_airspace_incursion",
            "stage": "stage_4",
            "name": "Mass Bomber Fleet Approaches UK Airspace",
            "image": "ev_airspace_incursion",
            "prerequisites": [],
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
                            "id": "opt_inc_1",
                            "text": "Commit all fighters into a mass interception over the North Sea before bombers reach weapons range",
                            "effects": {}
                        },
                        {
                            "id": "opt_inc_2",
                            "text": "Hold back half our jets near London to defend the capital against cruise missiles",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_nuclear_readiness",
            "stage": "stage_4",
            "name": "Russian Nuclear Forces on High Alert",
            "image": "ev_nuclear_readiness",
            "prerequisites": [
                "ev_airspace_incursion"
            ],
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
                            "effects": {}
                        },
                        {
                            "id": "opt_nuc_2",
                            "text": "Order the submarine to stay silent and hidden deep underwater to preserve our deterrent",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_final_authorization",
            "stage": "stage_5",
            "name": "COBRA FINAL VOTE: War or Ceasefire",
            "image": "ev_final_authorization",
            "prerequisites": [
                "ev_airspace_incursion",
                "ev_nuclear_readiness"
            ],
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
            "isEndGame": true,
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
                            "effects": {}
                        },
                        {
                            "id": "opt_fin_2",
                            "text": "Offer an immediate ceasefire and open emergency peace negotiations in Switzerland",
                            "effects": {}
                        },
                        {
                            "id": "opt_fin_3",
                            "text": "Order a limited nuclear warning demonstration shot over uninhabited Arctic waters",
                            "effects": {}
                        }
                    ]
                }
            ]
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
                    "military_escalation": 2
                },
                "minScores": {
                    "uk_russia": 4
                }
            },
            "roleDescriptions": {
                "PM": "Your leadership prevented World War Three while keeping Britain strong, free, and secure.",
                "foreign": "Allies praise British diplomacy for finding an off-ramp while standing firm on national security."
            },
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
            "decisions": []
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
                            "effects": {}
                        },
                        {
                            "id": "opt_prt_2",
                            "text": "Allow the protest to continue peacefully while protecting government gates",
                            "effects": {}
                        }
                    ]
                }
            ]
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
                            "effects": {}
                        },
                        {
                            "id": "opt_prv_2",
                            "text": "Have undercover officers extract foreign provocateurs instigating the clashes",
                            "effects": {}
                        },
                        {
                            "id": "opt_prv_3",
                            "text": "Hesitate while debating orders (Police lines break, rioters smash government windows)",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_dissident_discovery",
            "stage": "stage_1",
            "name": "Russian Defector Found Unconscious",
            "repeatable": false,
            "location": [
                51.06,
                -1.79
            ],
            "image": "ev_dissident_discovery",
            "description": "A prominent Russian defector who criticized Putin has been found slumped on a park bench in Salisbury. Paramedics are treating him.",
            "autoEffects": {
                "scores": {
                    "civilian_stability": -1
                }
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
            "decisions": []
        },
        {
            "id": "ev_disinfo_campaign",
            "stage": "stage_1",
            "name": "Flood of Fake News on Social Media",
            "repeatable": true,
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
                }
            },
            "roleDescriptions": {
                "cyber": "The bot accounts trace straight back to Russian military troll farms in St Petersburg.",
                "media": "Mainstream TV channels are accidentally reporting some of the fake rumours as real news."
            },
            "decisions": []
        },
        {
            "id": "ev_bomber_intercept",
            "stage": "stage_1",
            "name": "Record Scrambles to Intercept Russian Bombers",
            "repeatable": true,
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
                }
            },
            "roleDescriptions": {
                "defence": "Russia is constantly probing our reaction times and exhausting our fighter pilots.",
                "foreign": "This flying intimidation is meant to remind the British public of Russia's long-range bombers."
            },
            "decisions": []
        },
        {
            "id": "ev_gps_jamming",
            "stage": "stage_1",
            "name": "Defence Secretary's Plane GPS Jammed",
            "repeatable": false,
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
                                }
                            }
                        },
                        {
                            "id": "opt_gps2",
                            "text": "Downplay the incident publicly so we don't frighten airline passengers",
                            "effects": {
                                "scores": {
                                    "civilian_stability": 1,
                                    "uk_europe": -1
                                }
                            }
                        }
                    ]
                }
            ]
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
                                }
                            }
                        },
                        {
                            "id": "opt_bsi2",
                            "text": "Continue the flights, but assign armed Typhoon fighters to escort the spy plane",
                            "effects": {
                                "scores": {
                                    "military_readiness": 1,
                                    "military_escalation": 2
                                }
                            }
                        }
                    ]
                }
            ]
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
                                }
                            }
                        },
                        {
                            "id": "opt_dr2",
                            "text": "Demand an international chemical weapons inspection before taking any action",
                            "effects": {
                                "scores": {
                                    "uk_europe": -1,
                                    "civilian_stability": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_sub_detection",
            "stage": "stage_2",
            "name": "Russian Submarine Detected Near Faslane",
            "repeatable": false,
            "location": [
                56,
                -5.5
            ],
            "image": "ev_sub_detection",
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
                                }
                            }
                        },
                        {
                            "id": "opt_sub2",
                            "text": "Quietly track the submarine using passive sonar to record its acoustic engine signature",
                            "effects": {
                                "scores": {
                                    "military_readiness": 2,
                                    "military_escalation": -1
                                }
                            }
                        }
                    ]
                }
            ]
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
                                }
                            }
                        },
                        {
                            "id": "opt_os2",
                            "text": "Introduce stricter financial audits and wealth checks without immediate seizures",
                            "effects": {
                                "scores": {
                                    "civilian_stability": -1,
                                    "uk_europe": -1
                                }
                            }
                        }
                    ]
                }
            ]
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
                                }
                            }
                        },
                        {
                            "id": "opt_uc2",
                            "text": "Shadow the ship quietly from several miles away to photograph their robotic submersibles",
                            "effects": {
                                "scores": {
                                    "military_escalation": -1,
                                    "uk_us": -1
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    "manualActions": [
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
                }
            },
            "effects": {
                "scores": {
                    "military_escalation": 5,
                    "civilian_stability": -5
                }
            },
            "image": "ev_nuclear_alert"
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
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_russia_deescalate",
                        "weight": 50
                    },
                    {
                        "id": "ev_russia_leak",
                        "weight": 50
                    }
                ],
                "scores": {
                    "uk_russia": -1
                }
            },
            "image": "act_backchannel_russia"
        },
        {
            "id": "act_us_support",
            "name": "Request US Military Transport",
            "description": "Ask the US President to send heavy transport planes to fly British supplies and troops.",
            "initiator": [
                "foreign",
                "defence"
            ],
            "conditions": {
                "minScores": {
                    "uk_us": 2
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_us_support_success",
                        "weight": 60,
                        "effects": {
                            "scores": {
                                "military_readiness": 1
                            }
                        }
                    },
                    {
                        "id": "ev_us_support_fail",
                        "weight": 40,
                        "effects": {
                            "scores": {
                                "uk_europe": -1
                            }
                        }
                    }
                ]
            },
            "image": "act_us_support"
        },
        {
            "id": "act_cyber_offensive",
            "name": "Launch Covert Cyber Strike",
            "description": "Order government hackers to secretly disable Russian military command networks and radar.",
            "initiator": [
                "cyber"
            ],
            "requiresApprovalFrom": "home",
            "conditions": {
                "minScores": {
                    "military_readiness": 2
                }
            },
            "effects": {
                "scores": {
                    "military_escalation": 1
                },
                "randomEvents": [
                    {
                        "id": "ev_cyber_success",
                        "weight": 50,
                        "effects": {
                            "scores": {
                                "military_readiness": 1
                            }
                        }
                    },
                    {
                        "id": "ev_cyber_fail",
                        "weight": 50,
                        "effects": {
                            "scores": {
                                "uk_europe": -1,
                                "civilian_stability": -1
                            }
                        }
                    }
                ]
            },
            "image": "act_cyber_offensive"
        },
        {
            "id": "act_national_address",
            "name": "Live Address to the Nation",
            "description": "Broadcast a live speech from Downing Street to reassure the public and stop panic buying.",
            "initiator": [
                "media"
            ],
            "requiresApprovalFrom": "home",
            "conditions": {
                "maxScores": {
                    "civilian_stability": 3
                }
            },
            "effects": {
                "scores": {
                    "civilian_stability": 1,
                    "uk_europe": -1
                }
            },
            "image": "act_national_address"
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
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_sf_success",
                        "weight": 50,
                        "effects": {
                            "scores": {
                                "military_readiness": 1,
                                "uk_us": 1
                            }
                        }
                    },
                    {
                        "id": "ev_sf_fail",
                        "weight": 50,
                        "effects": {
                            "scores": {
                                "civilian_stability": -1,
                                "military_escalation": 1
                            }
                        }
                    }
                ]
            },
            "image": "act_special_forces"
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
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_strike_options_leak",
                        "weight": 20,
                        "effects": {
                            "scores": {
                                "military_escalation": 1,
                                "uk_europe": -1
                            }
                        }
                    },
                    {
                        "id": "ev_strike_options_secured",
                        "weight": 80
                    }
                ],
                "triggerEvents": [
                    {
                        "id": "ev_strike_options_ready",
                        "delayMs": 60000
                    }
                ]
            }
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
                        "weight": 60,
                        "effects": {
                            "scores": {
                                "military_escalation": -2,
                                "uk_russia": 1
                            }
                        }
                    },
                    {
                        "id": "ev_f35_fail",
                        "weight": 40,
                        "effects": {
                            "scores": {
                                "military_escalation": 2,
                                "civilian_stability": -1
                            }
                        }
                    }
                ]
            }
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
                        "weight": 30,
                        "effects": {
                            "scores": {
                                "military_escalation": -3,
                                "uk_russia": 2
                            }
                        }
                    },
                    {
                        "id": "ev_f35_fail",
                        "weight": 70,
                        "effects": {
                            "scores": {
                                "military_escalation": 3,
                                "civilian_stability": -2
                            }
                        }
                    }
                ]
            }
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
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_eu_success",
                        "weight": 70,
                        "effects": {
                            "scores": {
                                "uk_europe": 2,
                                "military_escalation": -1
                            }
                        }
                    },
                    {
                        "id": "ev_eu_fail",
                        "weight": 30,
                        "effects": {
                            "scores": {
                                "uk_europe": -1
                            }
                        }
                    }
                ]
            }
        }
    ]
};
