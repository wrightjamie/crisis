module.exports = {
    "id": "op_sovereign_sky",
    "name": "Op Sovereign Sky: Air Power Doctrine",
    "description": "Lead the UK Air Component in a fast-paced crisis. Use modern RAF aircraft, defend your bases, and work with ground and naval forces to win.",
    "guideUrl": "/scenarios/op_sovereign_sky/guide.html",
    "mapConfig": {
        "center": [
            35,
            33.5
        ],
        "zoom": 6
    },
    "roles": [
        "jfac",
        "control",
        "strike",
        "isr",
        "mobility",
        "joint",
        "display"
    ],
    "roleNames": {
        "jfac": "JFAC Commander (Air HQ)",
        "control": "Control of the Air Cell",
        "strike": "Air Attack & Strike Cell",
        "isr": "Intelligence & Cyber Cell",
        "mobility": "Air Mobility & Logistics Cell",
        "joint": "Joint Action & All-Domain Cell",
        "display": "Operations Room Display"
    },
    "minUsers": 2,
    "mandatoryRoles": [
        "jfac"
    ],
    "roleFallbacks": {
        "control": [
            "strike",
            "jfac"
        ],
        "strike": [
            "control",
            "jfac"
        ],
        "isr": [
            "joint",
            "jfac"
        ],
        "mobility": [
            "joint",
            "jfac"
        ],
        "joint": [
            "isr",
            "mobility",
            "jfac"
        ]
    },
    "initialScores": {
        "air_control": 2,
        "situational_awareness": 2,
        "sustainability": 3,
        "joint_effect": 3,
        "force_protection": 3,
        "coalition_support": 3
    },
    "scoreConfigs": {
        "air_control": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "situational_awareness": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "sustainability": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "joint_effect": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "force_protection": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        },
        "coalition_support": {
            "min": 1,
            "max": 5,
            "visibleToPlayers": true,
            "promptAI": true
        }
    },
    "briefings": {
        "_general": "Welcome to the UK Air Operations Centre. A hostile rogue state, \"Crimson State\", and armed militias have seized coastal territory in the Eastern Mediterranean. They have set up a deadly missile defense bubble to keep us out. Your mission is to use RAF Air Power to protect British interests, defend our allies, and restore peace.",
        "jfac": "As Air Component Commander, you lead the overall air campaign. Remember a key rule of Air Power: aircraft cannot hold ground on their own. Victory requires working hand-in-hand with the Army and Royal Navy.",
        "control": "You lead the Control of the Air Cell. If we don't control the skies, our ground troops and ships are easy targets. You must defend our airbases from attack and destroy enemy fighter jets and missile batteries.",
        "strike": "You lead the Air Attack Cell. Your role is to hit enemy targets on land, at sea, and in cyberspace. You will strike enemy warships, blast supply convoys, and support British troops in combat.",
        "isr": "You lead the Intelligence & Cyber Cell. Without intelligence, our pilots fly blind. You will track enemy radar signals, monitor satellite photos, and break enemy communications to get the right information to the right aircrew at the right time.",
        "mobility": "You lead the Air Mobility Cell. Aircraft cannot fight without fuel, spare parts, and ammunition. You manage transport planes, air-to-air refuelling tankers, and rescue helicopters to keep our forces fighting.",
        "joint": "You lead the Joint Action Cell. Air Power is most effective when combined with the Army, Royal Navy, Space Command, and diplomatic allies. You coordinate joint strikes and coalition teamwork."
    },
    "aiConfig": {
        "systemPrompt": "You are an automated RAF Joint Force Air Component (JFAC) operational summary system.\nCRITICAL RULES:\n- Describe the objective operational situation using official RAF Air Power doctrine terminology (e.g., Control of the Air, ISR, Air Mobility, Air Attack, Enablers, Joint Action).\n- NEVER refer to the player, \"you\", \"your\", or their role name.\n- Write exactly ONE short paragraph (1-2 sentences). Do NOT output bullet points.\n- Start directly with the operational impact. Do not use greetings.\n- Do not use markdown formatting.\n- Stick to the provided facts.\n- Use clear, professional military language suitable for Senior/Master Air Cadets (ages 14-18).",
        "scoreLabels": {
            "1": "Critical / Denied",
            "2": "Contested / Degraded",
            "3": "Favourable / Adequate",
            "4": "Superior / Strong",
            "5": "Supremacy / Optimal"
        },
        "roleContexts": {
            "jfac": "Focus area: operational command and control, strategic objectives, and overall campaign coherence.",
            "control": "Focus area: degrees of control of the air, offensive counter-air (OCA), and defensive counter-air (DCA).",
            "strike": "Focus area: strategic attack, counter-land (CAS, AI, SCAR), counter-sea, and information activities.",
            "isr": "Focus area: intelligence gathering (SIGINT, GEOINT, MASINT, OSINT, FININT), Network Enabled Capability (NEC), and cyber integration.",
            "mobility": "Focus area: hub and spoke logistics, air-to-air refuelling, airborne operations, medevac, and personnel recovery.",
            "joint": "Focus area: joint action, air-land/maritime/space integration, and the full spectrum approach."
        },
        "scores": {
            "air_control": {
                "label": "Control of the Air",
                "subject": "the degree of control of the air",
                "isPlural": false,
                "roles": [
                    "jfac",
                    "control",
                    "strike"
                ]
            },
            "situational_awareness": {
                "label": "ISR & NEC",
                "subject": "battlespace intelligence and network enabled capability",
                "isPlural": false,
                "roles": [
                    "isr",
                    "jfac",
                    "strike"
                ]
            },
            "sustainability": {
                "label": "Sustain & Mobility",
                "subject": "logistical sustainability and air mobility capacity",
                "isPlural": false,
                "roles": [
                    "mobility",
                    "jfac"
                ]
            },
            "joint_effect": {
                "label": "Joint Action",
                "subject": "cross-domain joint integration",
                "isPlural": false,
                "roles": [
                    "joint",
                    "strike",
                    "jfac"
                ]
            },
            "force_protection": {
                "label": "Base & Protect",
                "subject": "force protection of airbases and assets",
                "isPlural": false,
                "roles": [
                    "control",
                    "mobility",
                    "jfac"
                ]
            },
            "coalition_support": {
                "label": "Coalition & Diplomacy",
                "subject": "coalition capability and full-spectrum diplomatic support",
                "isPlural": false,
                "roles": [
                    "joint",
                    "jfac"
                ]
            }
        }
    },
    "variantAxes": [
        {
            "id": "basing_posture",
            "name": "Basing & Carrier Posture (Task 10, 12 & 13)",
            "options": [
                {
                    "id": "carrier_deployed",
                    "name": "CSG On-Station (Carrier Enabled Power Projection)",
                    "briefingText": "HMS Queen Elizabeth is on station in the Eastern Med with embarked F-35B Lightnings, reducing reliance on Air-to-Air Refuelling.",
                    "roleBriefings": {
                        "control": "Having the Carrier Strike Group in theatre reduces transit times and increases time-on-station for F-35Bs, though total payload and airframes are limited to what the carrier can hold.",
                        "mobility": "Carrier basing reduces immediate tanker demand, allowing Voyager assets to focus on the strategic airbridge."
                    },
                    "scoreModifiers": {
                        "air_control": 1,
                        "sustainability": -1
                    },
                    "assetModifiers": [
                        {
                            "id": "a_qec",
                            "name": "HMS Queen Elizabeth & F-35B Wing",
                            "location": [
                                34,
                                31.5
                            ],
                            "state": "operational",
                            "tags": [
                                "maritime",
                                "air",
                                "strike"
                            ],
                            "image": "qe_class_carrier",
                            "briefing": "Fifth-generation STOVL stealth multi-role fighters operating from the Queen Elizabeth-class carrier."
                        }
                    ]
                },
                {
                    "id": "akrotiri_only",
                    "name": "Overland Hub & Spoke Only (No Carrier)",
                    "briefingText": "HMS Queen Elizabeth is in Rosyth. All Air Power must be projected from RAF Akrotiri (Spoke) and UK Main Operating Bases (Hubs), requiring heavy AAR support.",
                    "roleBriefings": {
                        "mobility": "Without a carrier in theatre, our fighters rely entirely on RAF Akrotiri and Voyager Air-to-Air Refuelling to achieve Reach and Endurance.",
                        "control": "Consolidating all aircraft at RAF Akrotiri increases our vulnerability to asymmetric or missile attacks on the airfield."
                    },
                    "scoreModifiers": {
                        "sustainability": 1,
                        "force_protection": -1
                    },
                    "assetModifiers": [
                        {
                            "id": "a_qec",
                            "name": "HMS Queen Elizabeth",
                            "location": [
                                56.02,
                                -3.44
                            ],
                            "state": "maintenance",
                            "tags": [
                                "maritime"
                            ],
                            "image": "qe_class_carrier",
                            "briefing": "Undergoing refit in Rosyth; unavailable for Carrier Enabled Power Projection."
                        }
                    ]
                }
            ]
        },
        {
            "id": "conflict_type",
            "name": "Adversary Profile (Task 1 & 7: Types of Conflict)",
            "options": [
                {
                    "id": "symmetrical_state",
                    "name": "State Actor (Symmetrical Limited Conflict)",
                    "briefingText": "The adversary is a well-equipped State Actor operating integrated Surface-to-Air Missiles (A2AD) and 4th-gen fighters.",
                    "roleBriefings": {
                        "control": "Expect heavy contested airspace. Achieving Air Superiority will require coordinated Offensive Counter-Air (OCA).",
                        "isr": "High electronic warfare threat. Prioritize SIGINT and MASINT to map enemy radar emitters."
                    },
                    "scoreModifiers": {
                        "air_control": -1,
                        "coalition_support": 1
                    }
                },
                {
                    "id": "asymmetrical_insurgency",
                    "name": "Non-State Actor (Asymmetrical Insurgency)",
                    "briefingText": "The adversary consists of non-state paramilitary insurgents using mobile MANPADS, drones, and civilian human shields.",
                    "roleBriefings": {
                        "isr": "Targets are fleeting and blended with civilians. High-persistence surveillance (Reaper/Protector and Shadow R1) and HUMINT are vital.",
                        "control": "We start with a Favourable Air Situation at high altitude, but low-level aircraft face severe asymmetric vulnerability near airfields."
                    },
                    "scoreModifiers": {
                        "situational_awareness": -1,
                        "force_protection": -1
                    }
                }
            ]
        }
    ],
    "assets": [
        {
            "id": "a_brize",
            "name": "RAF Brize Norton (UK Hub)",
            "location": [
                51.75,
                -1.58
            ],
            "state": "operational",
            "tags": [
                "hub",
                "mobility"
            ],
            "image": "raf_brize_norton",
            "briefing": "Primary UK Main Operating Base (Hub) for Strategic Transport (C-17 Globemaster), Tactical Transport (A400M Atlas), and Tankers (Voyager)."
        },
        {
            "id": "a_waddington",
            "name": "RAF Waddington (ISR Hub)",
            "location": [
                53.16,
                -0.52
            ],
            "state": "operational",
            "tags": [
                "hub",
                "isr"
            ],
            "image": "raf_waddington",
            "briefing": "Home of No 1 ISR Wing: RC-135W Rivet Joint (SIGINT), Shadow R1, and remotely piloted Reaper/Protector RPAS."
        },
        {
            "id": "a_akrotiri",
            "name": "RAF Akrotiri (Forward Spoke)",
            "location": [
                34.58,
                32.98
            ],
            "state": "operational",
            "tags": [
                "spoke",
                "airfield"
            ],
            "image": "raf_akrotiri",
            "briefing": "Forward Mounting Base (Spoke) in Cyprus. Enables Agility and Reach into theatre, protected by the RAF Regiment."
        },
        {
            "id": "a_typhoon",
            "name": "Typhoon FGR4 Detachment",
            "location": [
                34.59,
                32.99
            ],
            "state": "operational",
            "tags": [
                "air",
                "combat"
            ],
            "image": "typhoon_aircraft",
            "briefing": "Fourth-generation multi-role combat aircraft detached from RAF Coningsby/Lossiemouth for QRA, DCA, and multi-role strike."
        },
        {
            "id": "a_f35",
            "name": "F-35B Lightning Detachment",
            "location": [
                34.57,
                32.97
            ],
            "state": "operational",
            "tags": [
                "air",
                "combat",
                "stealth"
            ],
            "image": "f35_aircraft",
            "briefing": "Fifth-generation STOVL multi-role stealth aircraft from RAF Marham, capable of penetrating dense A2AD environments."
        },
        {
            "id": "a_voyager",
            "name": "Voyager KC2/KC3 Tanker",
            "location": [
                34.6,
                33.01
            ],
            "state": "operational",
            "tags": [
                "air",
                "mobility",
                "aar"
            ],
            "image": "voyager_refueler",
            "briefing": "Air-to-Air Refuelling and strategic transport aircraft, vital for overcoming Air Power's limitation of impermanence."
        },
        {
            "id": "a_poseidon",
            "name": "P-8A Poseidon MRA1",
            "location": [
                35.2,
                32.5
            ],
            "state": "operational",
            "tags": [
                "air",
                "isr",
                "maritime"
            ],
            "image": "p8_poseidon",
            "briefing": "Multi-role maritime patrol aircraft from RAF Lossiemouth, equipped with acoustic sensors and high-resolution radar for ASW and ASuW."
        },
        {
            "id": "a_rivetjoint",
            "name": "RC-135W Rivet Joint",
            "location": [
                35.5,
                34
            ],
            "state": "operational",
            "tags": [
                "air",
                "isr"
            ],
            "image": "rc135_rivet_joint",
            "briefing": "Dedicated electronic surveillance aircraft surveying the electromagnetic spectrum for SIGINT and MASINT."
        },
        {
            "id": "a_chinook",
            "name": "Chinook & Puma JHC Detachment",
            "location": [
                34.65,
                33.1
            ],
            "state": "operational",
            "tags": [
                "air",
                "mobility",
                "rotary"
            ],
            "image": "raf_chinook",
            "briefing": "Joint Helicopter Command support helicopters for intra-theatre tactical mobility, CASEVAC, and Combat Recovery."
        },
        {
            "id": "a_type45",
            "name": "HMS Duncan (Type 45) & Wildcat",
            "location": [
                34.2,
                33.8
            ],
            "state": "operational",
            "tags": [
                "maritime",
                "air"
            ],
            "image": "type_45_destroyer",
            "briefing": "Royal Navy Air Defence Destroyer with embarked Wildcat helicopter for Air-Maritime Integration (AMI) and Counter-Sea ops."
        },
        {
            "id": "a_crimson_sam_battery",
            "name": "Hostile SA-17 SAM Battery",
            "location": [
                35.35,
                35.85
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "sam",
                "air_defence"
            ],
            "image": "ukr_air_defense",
            "briefing": "Mobile SA-17 'Grizzly' surface-to-air missile system deployed in concealed mountain positions along the coast."
        },
        {
            "id": "a_hostile_sub",
            "name": "Hostile Attack Submarine",
            "location": [
                34.3,
                33.9
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "naval",
                "sub"
            ],
            "image": "astute_class_submarine",
            "briefing": "Hostile Kilo-class diesel-electric submarine operating submerged to threaten Allied shipping lanes."
        }
    ],
    "stages": [
        {
            "id": "stage_1",
            "name": "Stage 1: Intelligence, Base Setup & Deployment"
        },
        {
            "id": "stage_2",
            "name": "Stage 2: Winning Control of the Skies"
        },
        {
            "id": "stage_3",
            "name": "Stage 3: Air Attack on Land and Sea"
        },
        {
            "id": "stage_4",
            "name": "Stage 4: Air Mobility & Resupply"
        },
        {
            "id": "stage_5",
            "name": "Stage 5: Joint Action & Final Victory"
        }
    ],
    "eventTemplates": [
        {
            "id": "ev_1_levels_of_war",
            "stage": "stage_1",
            "name": "1.1 Show of Force & Deterrence",
            "repeatable": false,
            "sound": "teletype",
            "location": [
                35.1,
                33.9
            ],
            "image": "ev_crisis_cabinet",
            "description": "Tensions are flaring in the Eastern Mediterranean. Before shooting starts, the Prime Minister orders our Air Component to show British military strength and deter an enemy invasion.",
            "facilitatorNotes": "Covers LO1 P2 (Task 5, 6, 8, 9): National Security Strategy (Protect, Project, Promote), Levels of Warfare (Strategic, Operational, Tactical), and Preventative/Defence Diplomacy vs Deterrence.",
            "roleDescriptions": {
                "jfac": "Understand your role: The Government sets the political goal (Strategic level). You plan the overall theatre air campaign (Operational level). The pilots fly the actual missions (Tactical level).",
                "joint": "Deterrence means showing enough credible military strength so the enemy decides attacking is too risky.",
                "control": "Flying RAF Typhoon fighter patrols near allied borders quickly demonstrates British readiness."
            },
            "decisions": [
                {
                    "role": "jfac",
                    "text": "How will you translate the Government's political orders into military direction for your forces?",
                    "options": [
                        {
                            "id": "opt_1_op_plan",
                            "text": "Issue a theatre campaign plan aligning all aircraft to the mission, letting squadron pilots decide exact tactical flight maneuvers",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "coalition_support": 1
                                },
                                "unlockEvents": [
                                    "ev_2_osint_finint"
                                ]
                            }
                        },
                        {
                            "id": "opt_1_micromanage",
                            "text": "Let politicians micromanage individual dogfights from London (Bypasses local commanders, causing deadly confusion)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1,
                                    "air_control": -1
                                },
                                "unlockEvents": [
                                    "ev_2_osint_finint"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How should we use our aircraft to prevent a war from breaking out?",
                    "options": [
                        {
                            "id": "opt_1_deter",
                            "text": "Fly visible joint patrols alongside allied air forces to show united strength and deter attack",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_1_preempt",
                            "text": "Launch surprise bombing raids before any diplomacy takes place (Risks starting an avoidable war)",
                            "effects": {
                                "scores": {
                                    "coalition_support": -2,
                                    "situational_awareness": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_2_osint_finint",
            "stage": "stage_1",
            "name": "1.2 Tracking the Threat: Intelligence Gathering",
            "prerequisites": [
                "ev_1_levels_of_war"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.4,
                35.9
            ],
            "image": "ev_disinfo_campaign",
            "description": "Enemy militia fighters are smuggling advanced anti-aircraft missiles into coastal towns. Videos on social media show covered trucks arriving at a commercial port.",
            "facilitatorNotes": "Covers LO1 P1 (State vs Non-State Actors) and LO2 P7 (Task 25: OSINT, FININT, HUMINT, TECHINT).",
            "roleDescriptions": {
                "isr": "Combine multiple intel types: OSINT (open social media videos), FININT (tracking bank payments), and HUMINT (informants on the ground).",
                "joint": "We face regular enemy military forces as well as armed militia groups that do not wear uniforms."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Which intelligence sources will you combine to track down the missile smugglers?",
                    "options": [
                        {
                            "id": "opt_2_osint_finint",
                            "text": "Cross-reference social media videos (OSINT), suspicious bank transfers (FININT), and local human scouts (HUMINT)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2
                                },
                                "unlockEvents": [
                                    "ev_3_basing_dilemma"
                                ]
                            }
                        },
                        {
                            "id": "opt_2_radar_only",
                            "text": "Rely only on high-altitude radar (Cannot see inside shipping containers or track bank accounts)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -1
                                },
                                "unlockEvents": [
                                    "ev_3_basing_dilemma"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How do we choke off funding to the militia groups?",
                    "options": [
                        {
                            "id": "opt_2_econ",
                            "text": "Pass financial intelligence to international allies to freeze militia bank accounts",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_2_ignore_nonstate",
                            "text": "Ignore the militia entirely and only track regular government troops (Leaves our airbases vulnerable)",
                            "effects": {
                                "scores": {
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_3_basing_dilemma",
            "stage": "stage_1",
            "name": "1.3 Basing Choice: Close Strips vs Safe Bases",
            "prerequisites": [
                "ev_2_osint_finint"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.58,
                32.98
            ],
            "image": "nato_air_base",
            "description": "Fighting has broken out! An ally offers us a rough forward dirt runway just 40 miles from enemy artillery. Alternatively, we can fly from our established base at RAF Akrotiri, 150 miles away across the sea.",
            "facilitatorNotes": "Covers LO1 P3 (Task 10, 12, 13): Basing considerations, Fragility/Vulnerability of aircraft on the ground vs Reach and Sustainability.",
            "roleDescriptions": {
                "control": "Operating from RAF Akrotiri keeps our jets safe from artillery, but pilots must fly further to reach the combat zone.",
                "mobility": "The forward strip cuts flight time, but it has no bomb shelters and supply trucks can easily be ambushed."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "Where should we base our high-value Typhoon fighters and spy planes?",
                    "options": [
                        {
                            "id": "opt_3_akrotiri",
                            "text": "Base at RAF Akrotiri (Safer from ground attack, but requires longer flying time and refuelling)",
                            "effects": {
                                "scores": {
                                    "force_protection": 2,
                                    "sustainability": -1
                                },
                                "unlockEvents": [
                                    "ev_4_hub_and_spoke"
                                ]
                            }
                        },
                        {
                            "id": "opt_3_forward_strip",
                            "text": "Crowd all aircraft onto the unprotected dirt strip within enemy artillery range (Extreme risk of loss on the ground)",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "air_control": 1
                                },
                                "unlockEvents": [
                                    "ev_4_hub_and_spoke"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "mobility",
                    "text": "How do we help aircraft reach the battlefield from our distant base in Cyprus?",
                    "options": [
                        {
                            "id": "opt_3_aar_plan",
                            "text": "Deploy Voyager aerial refuelling tankers and set up forward fuel points for helicopters",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_3_underfuel",
                            "text": "Send jets with minimal fuel to save weight and hope they don't run dry in combat (High crash risk)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_4_hub_and_spoke",
            "stage": "stage_1",
            "name": "1.4 Air Supply Bridge: Hub & Spoke",
            "prerequisites": [
                "ev_3_basing_dilemma"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                51.75,
                -1.58
            ],
            "image": "ev_us_support_success",
            "description": "To keep jets flying at RAF Akrotiri (our forward Spoke), thousands of tonnes of spare parts, bombs, fuel, and guards must be flown out from RAF Brize Norton in Oxfordshire (our UK Hub).",
            "facilitatorNotes": "Covers LO1 P1 (Task 2: 4 Enablers - Base, Sustain, Connect, Protect) and LO2 P6 (Task 17, 22, 23: Hub & Spoke, Inter-theatre vs Intra-theatre mobility).",
            "roleDescriptions": {
                "mobility": "Moving cargo between countries requires long-range strategic transport planes like the C-17 Globemaster and A400M Atlas.",
                "joint": "Make sure all four key airbase enablers arrive: Base engineers, Supplies, Communications specialists, and RAF Regiment guards."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "Which aircraft fleet should fly the long-distance supply bridge from the UK to Cyprus?",
                    "options": [
                        {
                            "id": "opt_4_c17_atlas",
                            "text": "Fly heavy C-17 Globemasters and A400M Atlas transport aircraft with intercontinental range",
                            "effects": {
                                "scores": {
                                    "sustainability": 2
                                },
                                "unlockEvents": [
                                    "ev_5_isr_collection"
                                ]
                            }
                        },
                        {
                            "id": "opt_4_rotary_uk",
                            "text": "Try to haul heavy cargo across Europe with short-range helicopters (Too slow, cannot make the distance)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2
                                },
                                "unlockEvents": [
                                    "ev_5_isr_collection"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "Who gets priority seating on the first transport flights to secure the forward airbase?",
                    "options": [
                        {
                            "id": "opt_4_connect_protect",
                            "text": "RAF Regiment base defenders, communication signals engineers, and munitions handlers",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "situational_awareness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_4_no_enablers",
                            "text": "Leave behind base defence and communications teams to squeeze in more spare aircraft parts (Leaves base unprotected)",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "situational_awareness": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_5_isr_collection",
            "stage": "stage_1",
            "name": "1.5 Locating Enemy Air Defences: The Intel Cycle",
            "prerequisites": [
                "ev_4_hub_and_spoke"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.3,
                35.8
            ],
            "image": "drone_squad",
            "description": "Enemy surface-to-air missile batteries have switched on their radars, creating a deadly 'no-fly' threat. Our intelligence team must quickly detect, pinpoint, and track these launchers.",
            "facilitatorNotes": "Covers LO2 P7 (Task 16, 24, 25, 26, 27, 29): Surveillance vs Reconnaissance, 9-Step ISR Process, SIGINT/MASINT/GEOINT, and Network Enabled Capability (NEC / Link-16).",
            "roleDescriptions": {
                "isr": "Surveillance means constantly monitoring a wide area. Reconnaissance means inspecting a specific target. Use Rivet Joint for radio signals and Reaper drones for video.",
                "jfac": "Fast digital data links (Link-16) instantly transmit radar coordinates from spy planes to armed fighters."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "How will you pinpoint and map the enemy missile radars?",
                    "options": [
                        {
                            "id": "opt_5_isr_wing",
                            "text": "Use electronic spy planes (Rivet Joint) to track radar signals and Reaper drones to confirm locations with video",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2,
                                    "air_control": 1
                                },
                                "revealAssets": [
                                    "a_crimson_sam_battery"
                                ],
                                "unlockEvents": [
                                    "ev_6_dca_akrotiri"
                                ]
                            }
                        },
                        {
                            "id": "opt_5_unplanned",
                            "text": "Dispatch unarmed transport planes to search out the windows with binoculars (Cannot detect radar frequencies)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -2,
                                    "force_protection": -1
                                },
                                "unlockEvents": [
                                    "ev_6_dca_akrotiri"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "jfac",
                    "text": "How do you share target coordinates with strike pilots?",
                    "options": [
                        {
                            "id": "opt_5_nec",
                            "text": "Beam target coordinates straight into fighter cockpits in real time over digital data links",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "situational_awareness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_5_postal",
                            "text": "Rely on physical briefing maps and delayed courier flights (Takes hours, allowing mobile missiles to relocate)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_6_dca_akrotiri",
            "stage": "stage_2",
            "name": "2.1 Air Raid Alert: Defending RAF Akrotiri",
            "sound": "klaxon",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.58,
                32.98
            ],
            "image": "ev_akrotiri_strike",
            "description": "AIR RAID WARNING! Enemy bombers and cruise missiles are flying straight toward RAF Akrotiri and HMS Duncan. The enemy wants to wipe out our aircraft on the tarmac before they take off.",
            "facilitatorNotes": "Covers LO2 P5 (Task 21): Defensive Counter-Air (Active Measures: Detection, Interception, Engagement vs Passive Measures: Hardening, Dispersal, Camouflage, Concealment, Deception).",
            "roleDescriptions": {
                "control": "Active Defence means shooting down the attackers in the air using Typhoon fighters and Sea Viper surface-to-air missiles.",
                "mobility": "Passive Defence means protecting assets on the ground using hardened concrete shelters, dispersing planes, and using decoy dummies."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "Deploy Active Defence measures to destroy the incoming raid:",
                    "options": [
                        {
                            "id": "opt_6_active_dca",
                            "text": "Scramble Typhoon alert fighters for combat patrols and link with HMS Duncan's Sea Viper anti-air missiles",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": 1
                                },
                                "unlockEvents": [
                                    "ev_7_asymmetric_swarm"
                                ]
                            }
                        },
                        {
                            "id": "opt_6_no_active",
                            "text": "Hold back fighters to protect our reserves, relying only on base camouflage and bomb-proof shelters (Passive Defence)",
                            "effects": {
                                "scores": {
                                    "air_control": -2,
                                    "force_protection": -2
                                },
                                "assetStateChanges": {
                                    "a_typhoon": "damaged"
                                },
                                "unlockEvents": [
                                    "ev_7_asymmetric_swarm"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "mobility",
                    "text": "Deploy Passive Defence measures across the airfield at RAF Akrotiri:",
                    "options": [
                        {
                            "id": "opt_6_passive_dca",
                            "text": "Spread transport planes across dispersed revetments, hide fighters inside concrete shelters, and set up decoy dummies",
                            "effects": {
                                "scores": {
                                    "force_protection": 2
                                }
                            }
                        },
                        {
                            "id": "opt_6_line_abreast",
                            "text": "Leave aircraft lined up neatly on the open tarmac (A single bomb could destroy several planes)",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "sustainability": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_7_asymmetric_swarm",
            "stage": "stage_2",
            "name": "2.2 Drone Attack on the Base Perimeter",
            "sound": "explosion",
            "prerequisites": [
                "ev_6_dca_akrotiri"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.62,
                32.95
            ],
            "image": "ev_drone_swarm_perimeter",
            "description": "Moments after the air raid, enemy militia in vans outside our fence launch 15 small explosive drones flying low toward our aviation fuel tanks.",
            "facilitatorNotes": "Covers LO1 P1/P2 (Task 2, 4, 7): Asymmetrical Warfare, Vulnerability of Air Bases, Protect Enabler (RAF Regiment), and Electronic Warfare.",
            "roleDescriptions": {
                "jfac": "This is 'asymmetric warfare': the enemy avoids dogfights with our high-tech jets and uses cheap commercial drones against fragile fuel supplies.",
                "isr": "Specialist counter-drone electronic warfare can jam the radio frequencies controlling the drones."
            },
            "decisions": [
                {
                    "role": "jfac",
                    "text": "How do we stop this low-flying drone attack around our perimeter?",
                    "options": [
                        {
                            "id": "opt_7_regiment",
                            "text": "Dispatch RAF Regiment armed ground patrols with anti-drone jamming guns to protect the perimeter",
                            "effects": {
                                "scores": {
                                    "force_protection": 2
                                },
                                "unlockEvents": [
                                    "ev_8_height_perspective"
                                ]
                            }
                        },
                        {
                            "id": "opt_7_typhoon_strafe",
                            "text": "Order supersonic Typhoons to cannon-strafe the civilian houses right outside our fence (Extreme collateral damage risk)",
                            "effects": {
                                "scores": {
                                    "coalition_support": -2,
                                    "force_protection": -1
                                },
                                "unlockEvents": [
                                    "ev_8_height_perspective"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "isr",
                    "text": "How can our electronic warfare team help neutralise the drones?",
                    "options": [
                        {
                            "id": "opt_7_ew_jam",
                            "text": "Jam the radio frequencies controlling the drones and track where the operator signals are coming from",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "force_protection": 1
                                }
                            }
                        },
                        {
                            "id": "opt_7_ignore_drones",
                            "text": "Ignore the commercial drones because they are too small to care about (Fuel tanks will explode)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_8_height_perspective",
            "stage": "stage_2",
            "name": "2.3 High-Altitude Eyes: Overcoming Terrain",
            "prerequisites": [
                "ev_7_asymmetric_swarm"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.25,
                35.2
            ],
            "image": "nato_awacs",
            "description": "Enemy mobile missile launchers are hiding deep in mountain canyons, blocking ship radar. We need continuous high-altitude surveillance to spot them.",
            "facilitatorNotes": "Covers LO1 P1/P3 (Task 3 & 10): Strengths of Height, Perspective (greater field-of-view and horizon from altitude), and Ubiquity; and LO2 P4/P7 (Zephyr HAPS & Airborne Early Warning).",
            "roleDescriptions": {
                "isr": "Flying high gives 'perspective'—looking down over mountain ridges. High speed and long reach allow aircraft to monitor the entire battle area.",
                "control": "Airborne Early Warning planes carry radar thousands of feet in the air, peering down into valleys where surface radar cannot see."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Which system is best suited for weeks of ultra-high-altitude surveillance over the mountains?",
                    "options": [
                        {
                            "id": "opt_8_zephyr",
                            "text": "Deploy the solar-powered Zephyr ultra-high altitude drone at 70,000 feet alongside Shadow surveillance planes",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2
                                },
                                "unlockEvents": [
                                    "ev_9_oca_cyber"
                                ]
                            }
                        },
                        {
                            "id": "opt_8_low_heli",
                            "text": "Hover a low-altitude transport helicopter inside the canyon to peer over the cliffs (High crash and shoot-down risk)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -1,
                                    "force_protection": -1
                                },
                                "unlockEvents": [
                                    "ev_9_oca_cyber"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "control",
                    "text": "How do we track low-flying enemy jets masked behind the mountain ridges?",
                    "options": [
                        {
                            "id": "opt_8_aew",
                            "text": "Orbit an Airborne Early Warning radar aircraft high overhead to look down into the valleys",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "situational_awareness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_8_ground_radar",
                            "text": "Rely only on coastal ship radars that are blocked by the coastal cliffs",
                            "effects": {
                                "scores": {
                                    "air_control": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_9_oca_cyber",
            "stage": "stage_2",
            "name": "2.4 Neutralising Enemy Airbases: Strike & Cyber",
            "sound": "explosion",
            "prerequisites": [
                "ev_8_height_perspective"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.45,
                35.95
            ],
            "image": "ev_f35_success",
            "description": "To give our troops freedom to operate, our Air Component must launch an offensive counter-air strike to crater the enemy's main airfield and destroy their missile radar.",
            "facilitatorNotes": "Covers LO2 P5 (Task 20 & 21: 3 Degrees of Control of the Air; Offensive Counter-Air) and LO3 P10 (Task 35: Offensive Air-Cyber Integration, Case Study: Operation Orchard 2007).",
            "roleDescriptions": {
                "control": "Offensive Counter-Air means attacking enemy airfields, runways, and radar before their jets can take off.",
                "isr": "A coordinated cyber attack can hack and blind enemy radar screens, letting our strike bombers fly in safely."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "How will our cyber team support the strike package?",
                    "options": [
                        {
                            "id": "opt_9_orchard",
                            "text": "Launch a coordinated cyber strike to blind enemy radar screens just as our bombers enter range",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "air_control": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_9_no_cyber",
                            "text": "Send bombers straight into active missile rings without jamming or cyber support (High risk of losing pilots)",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "air_control": -1
                                }
                            }
                        }
                    ]
                },
                {
                    "role": "control",
                    "text": "Select the primary strike force to break through the enemy missile defences and crater the runway:",
                    "options": [
                        {
                            "id": "opt_9_f35_oca",
                            "text": "Lead with stealthy F-35B Lightnings and Storm Shadow bunker-buster cruise missiles fired from Typhoons",
                            "effects": {
                                "scores": {
                                    "air_control": 2
                                },
                                "unlockEvents": [
                                    "ev_10_bai_convoy"
                                ]
                            }
                        },
                        {
                            "id": "opt_9_transport_oca",
                            "text": "Send unescorted propeller transport planes over the airfield (Defenceless against anti-aircraft guns)",
                            "effects": {
                                "scores": {
                                    "air_control": -2,
                                    "force_protection": -2
                                },
                                "unlockEvents": [
                                    "ev_10_bai_convoy"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_10_bai_convoy",
            "stage": "stage_2",
            "name": "2.5 Stopping Enemy Resupply: Air Interdiction",
            "prerequisites": [
                "ev_9_oca_cyber"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.5,
                36.15
            ],
            "image": "rus_iskander",
            "description": "Our strike crippled the enemy airbase! However, an enemy military convoy carrying replacement missile launchers and mobile radar is racing toward the coast to rebuild their defence network.",
            "facilitatorNotes": "Covers LO2 P5 (Task 20 & 21): Air Superiority vs Air Supremacy, and using Anti-Surface Operations (Air Interdiction / Battlefield Air Interdiction) to maintain Control of the Air by neutralizing ground threats.",
            "roleDescriptions": {
                "control": "We have Air Superiority. If we destroy this convoy, we achieve Air Supremacy, meaning the enemy can no longer threaten our planes.",
                "strike": "Air Interdiction means bombing enemy supply lines, ammo trucks, and bridges far behind front-line troops."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How will you destroy the enemy missile convoy before it reaches the coast?",
                    "options": [
                        {
                            "id": "opt_10_bai",
                            "text": "Strike the convoy along the highway using precision Brimstone missiles from Typhoons and armed Reaper drones",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": 1
                                },
                                "unlockEvents": [
                                    "ev_11_counter_sea"
                                ]
                            }
                        },
                        {
                            "id": "opt_10_let_pass",
                            "text": "Let the convoy reach the coast and try to dodge the missiles once they are set up (High danger for all allied flights)",
                            "effects": {
                                "scores": {
                                    "air_control": -2
                                },
                                "unlockEvents": [
                                    "ev_11_counter_sea"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "control",
                    "text": "With the missile convoy destroyed, what status have our forces achieved across the coastal airspace?",
                    "options": [
                        {
                            "id": "opt_10_supremacy",
                            "text": "Declare local Air Supremacy (Enemy air defences are eliminated; transport planes and helicopters can fly safely)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "sustainability": 1
                                }
                            }
                        },
                        {
                            "id": "opt_10_ground_all",
                            "text": "Assume enemy airspace is still impassable and ground all friendly operations",
                            "effects": {
                                "scores": {
                                    "joint_effect": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_11_counter_sea",
            "stage": "stage_3",
            "name": "3.1 Protecting the Fleet: Maritime Air Patrol",
            "sound": "sonar",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.3,
                33.9
            ],
            "image": "ev_sub_detection",
            "description": "Trying to break our sea blockade, the enemy sends an attack submarine and three missile gunboats to ambush Royal Navy vessels in the Mediterranean.",
            "facilitatorNotes": "Covers LO2 P8 (Task 16, 28, 30: Counter-Sea Operations - Anti-Submarine Warfare & Anti-Surface Warfare; P-8A Poseidon & RN Wildcat) and LO3 P10 (Task 35: Air-Maritime Integration).",
            "roleDescriptions": {
                "strike": "Maritime air operations include anti-submarine warfare (hunting submarines with listening sonobuoys) and anti-surface warfare (missile strikes on warships).",
                "joint": "Linking RAF P-8 Poseidon maritime patrol planes with Royal Navy warship radars creates a joint defence network."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "Select the air package to counter both the submerged submarine and the missile boats:",
                    "options": [
                        {
                            "id": "opt_11_poseidon_wildcat",
                            "text": "Deploy an RAF P-8A Poseidon (acoustic sensors and torpedoes) teamed with Royal Navy Wildcat helicopters (anti-ship missiles)",
                            "effects": {
                                "scores": {
                                    "joint_effect": 2,
                                    "force_protection": 1
                                },
                                "revealAssets": [
                                    "a_hostile_sub"
                                ],
                                "unlockEvents": [
                                    "ev_12_counter_land"
                                ]
                            }
                        },
                        {
                            "id": "opt_11_sentinel",
                            "text": "Send a land-surveillance aircraft carrying no anti-ship missiles or underwater sonobuoys (Cannot fight submarines)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -2,
                                    "force_protection": -1
                                },
                                "unlockEvents": [
                                    "ev_12_counter_land"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How should our maritime patrol plane and HMS Duncan coordinate during the engagement?",
                    "options": [
                        {
                            "id": "opt_11_ami_link",
                            "text": "Link the P-8 Poseidon's radar and sonar data directly into HMS Duncan's combat operations room",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_11_separate",
                            "text": "Operate independently without sharing radar tracks (Risks missing targets or duplicate attacks)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_12_counter_land",
            "stage": "stage_3",
            "name": "3.2 Ground Troops Under Fire: Close Air Support",
            "prerequisites": [
                "ev_11_counter_sea"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.15,
                36.1
            ],
            "image": "evt_armor_push",
            "description": "Allied ground troops have landed on the beach. Enemy tanks are attacking them just 400 metres away, while 40 miles behind the front line, enemy artillery is loading onto trains.",
            "facilitatorNotes": "Covers LO2 P8 (Task 30): Counter-Land Operations as Force Multipliers (Close Air Support vs Air Interdiction vs Strike, Coordination and Reconnaissance - SCAR) and LO3 P10 (Air-Land Integration).",
            "roleDescriptions": {
                "strike": "Close Air Support (CAS) requires pinpoint accuracy near friendly troops. Air Interdiction (AI) strikes enemy reinforcements and supply depots far behind the lines.",
                "joint": "Joint Terminal Attack Controllers (JTACs) are ground soldiers who guide pilots onto enemy targets so friendly troops are not accidentally hit."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How do you assign your attack aircraft to support the battle?",
                    "options": [
                        {
                            "id": "opt_12_cas_ai_scar",
                            "text": "Deliver Close Air Support for the troops pinned down at 400m, and hit the artillery train depot far behind enemy lines",
                            "effects": {
                                "scores": {
                                    "joint_effect": 2,
                                    "air_control": 1
                                },
                                "unlockEvents": [
                                    "ev_13_weather_payload"
                                ]
                            }
                        },
                        {
                            "id": "opt_12_confuse_cas_ai",
                            "text": "Drop unguided heavy bombs near friendly lines without radio communication with ground troops (High risk of friendly fire)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -2,
                                    "coalition_support": -2
                                },
                                "unlockEvents": [
                                    "ev_13_weather_payload"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How do we ensure our jets attack the correct tanks and avoid friendly casualties?",
                    "options": [
                        {
                            "id": "opt_12_jtac",
                            "text": "Direct all strikes through forward air controllers on the ground who can see both friendly and enemy positions",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "coalition_support": 1
                                }
                            }
                        },
                        {
                            "id": "opt_12_freefire",
                            "text": "Instruct pilots to guess which tanks belong to our allies from 25,000 feet through cloud cover",
                            "effects": {
                                "scores": {
                                    "joint_effect": -2,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_13_weather_payload",
            "stage": "stage_3",
            "name": "3.3 Fighting in Bad Weather & Low Ammunition",
            "prerequisites": [
                "ev_12_counter_land"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.22,
                36.2
            ],
            "image": "ev_sandstorm_payload",
            "description": "A fierce sandstorm and thick low clouds roll over the front line, reducing visibility to near zero. Overhead, two Typhoon jets have used most of their weapons and have only two missiles left.",
            "facilitatorNotes": "Covers LO1 P1 (Task 4: Limitations of Air Power - Limited Payload) and LO2 P8 (Task 28: Three factors that determine the success of an air attack - penetration, number of weapons carried/payload, and poor weather).",
            "roleDescriptions": {
                "strike": "Bad weather and limited weapons payload are real limitations of Air Power. Jets must use all-weather radar-guided missiles and prioritize high-value targets.",
                "mobility": "Because aircraft carry less payload than ships or trains, our base teams must rapidly refuel and re-arm returning jets."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How will our fighters engage key targets through zero-visibility cloud with only two missiles remaining?",
                    "options": [
                        {
                            "id": "opt_13_allweather",
                            "text": "Switch to all-weather radar-guided Brimstone missiles and strike the lead enemy command vehicle",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "situational_awareness": 1
                                },
                                "unlockEvents": [
                                    "ev_14_dynamic_retask"
                                ]
                            }
                        },
                        {
                            "id": "opt_13_blind_drop",
                            "text": "Drop visual laser-guided bombs blindly through the dust storm at random targets",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1,
                                    "coalition_support": -1
                                },
                                "unlockEvents": [
                                    "ev_14_dynamic_retask"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "mobility",
                    "text": "How do we overcome the limited weapons capacity of our fighter jets?",
                    "options": [
                        {
                            "id": "opt_13_turnaround",
                            "text": "Set up rapid 'hot-pit' refuelling and re-arming crews at the airfield so jets can land, reload, and launch again within minutes",
                            "effects": {
                                "scores": {
                                    "sustainability": 1
                                }
                            }
                        },
                        {
                            "id": "opt_13_overload",
                            "text": "Overload aircraft with weapons past their legal safe takeoff weight (Dangerous, risks crashes on takeoff)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_14_dynamic_retask",
            "stage": "stage_3",
            "name": "3.4 Rapid Reaction: Diverting Jets Mid-Air",
            "prerequisites": [
                "ev_13_weather_payload"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.35,
                36.3
            ],
            "image": "typhoon_aircraft",
            "description": "TIME CRITICAL! A surveillance drone spots the enemy supreme commander boarding a helicopter 100 miles away. He takes off in 8 minutes. Two armed Typhoons are already in the air nearby.",
            "facilitatorNotes": "Covers LO1 P1/P3 (Task 3 & 10): Strengths of Speed, Reach, Agility, Flexibility & Versatility; Re-tasking multi-role aircraft in flight.",
            "roleDescriptions": {
                "jfac": "This tests Speed, Reach, and Flexibility: Air Power can reach distant targets in minutes and redirect missions mid-flight.",
                "control": "The Typhoon is a multi-role fighter capable of switching from air patrol to precision ground strike in seconds."
            },
            "decisions": [
                {
                    "role": "jfac",
                    "text": "Can we use Air Power's speed to intercept the fleeing commander within 8 minutes? (TIME CRITICAL)",
                    "options": [
                        {
                            "id": "opt_14_retask",
                            "text": "Immediately divert the airborne Typhoons via digital radio, flying supersonic at Mach 1.6 to intercept the helicopter",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": 1,
                                    "situational_awareness": 1
                                },
                                "unlockEvents": [
                                    "ev_15_urban_roe"
                                ]
                            }
                        },
                        {
                            "id": "opt_14_army_march",
                            "text": "Order an infantry unit 100 miles away to march to the area on foot (Will take days, target escapes)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1
                                },
                                "unlockEvents": [
                                    "ev_15_urban_roe"
                                ]
                            }
                        },
                        {
                            "id": "opt_14_hesitate",
                            "text": "Delay decision while seeking extra approvals (Target escapes before orders are given)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -1,
                                    "joint_effect": -1
                                },
                                "unlockEvents": [
                                    "ev_15_urban_roe"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_15_urban_roe",
            "stage": "stage_3",
            "name": "3.5 Targets in Civilian Areas: Jamming & PsyOps",
            "prerequisites": [
                "ev_14_dynamic_retask"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.48,
                35.85
            ],
            "image": "ev_urban_hospital_roe",
            "description": "Enemy militia set up a radio transmitter and headquarters inside a busy civilian hospital. Bombing it would cause terrible civilian casualties and outrage allies.",
            "facilitatorNotes": "Covers LO2 P8 (Task 28 & 30): The 4th Category of Air Attack—Information Activities (Electronic Warfare and Psychological Operations), and distinguishing Kinetic vs Non-Kinetic effects (Op Shader leaflet/broadcast examples).",
            "roleDescriptions": {
                "strike": "Air Attack is not just dropping bombs. Non-kinetic options include electronic jamming and psychological operations (leaflets, counter-broadcasts).",
                "joint": "Defeating the enemy while protecting innocent civilians is essential to maintain international trust."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How do we silence the enemy headquarters inside the hospital without bombing the building?",
                    "options": [
                        {
                            "id": "opt_15_info_activities",
                            "text": "Use electronic warfare to jam their radio transmissions and broadcast counter-messages telling militia fighters to disperse",
                            "effects": {
                                "scores": {
                                    "coalition_support": 2,
                                    "joint_effect": 1
                                },
                                "unlockEvents": [
                                    "ev_16_airborne_ops"
                                ]
                            }
                        },
                        {
                            "id": "opt_15_kinetic_hospital",
                            "text": "Drop heavy 2,000lb high-explosive bombs directly on the hospital building (Severe civilian casualties)",
                            "effects": {
                                "scores": {
                                    "coalition_support": -3,
                                    "joint_effect": -2
                                },
                                "unlockEvents": [
                                    "ev_16_airborne_ops"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "isr",
                    "text": "How can our surveillance drones support psychological operations over the city?",
                    "options": [
                        {
                            "id": "opt_15_rpas_presence",
                            "text": "Keep Reaper drones visibly orbiting overhead and have fighters fly low, loud passes to convince enemy fighters to surrender",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_15_withdraw_isr",
                            "text": "Pull all drones back to base, leaving commanders completely unaware of what is happening in the city",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_16_airborne_ops",
            "stage": "stage_4",
            "name": "4.1 Seizing the Airfield: Paratroopers & Air-Land",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.6,
                36.4
            ],
            "image": "ev_airborne_paratroop_drop",
            "description": "To block enemy retreat, we must capture a desert airstrip ('Objective Talon'). The runway has craters and barricades, so heavy transport planes cannot land until engineers make repairs.",
            "facilitatorNotes": "Covers LO2 P6 (Task 22 & 23): Airborne Operations—distinguishing Air-Drop (using parachutes to deliver troops/loads in flight) vs Air-Land (aircraft lands on runway to offload).",
            "roleDescriptions": {
                "mobility": "'Air-Drop' drops troops and equipment by parachute from planes in flight. 'Air-Land' means landing the aircraft on the runway to unload.",
                "joint": "Dropping paratroopers deep behind enemy lines requires close coordination between the Army and RAF."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "How do you coordinate the mission to take and reopen the airfield?",
                    "options": [
                        {
                            "id": "opt_16_drop_then_land",
                            "text": "Step 1: Parachute drop paratroopers and combat engineers to clear the runway -> Step 2: Land heavy transport planes once repairs are complete",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "joint_effect": 2
                                },
                                "unlockEvents": [
                                    "ev_17_tanker_crisis"
                                ]
                            }
                        },
                        {
                            "id": "opt_16_crash_land",
                            "text": "Attempt to land a fully loaded 70-tonne C-17 transport directly onto the cratered, blocked runway (Guaranteed plane crash)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2,
                                    "force_protection": -2
                                },
                                "unlockEvents": [
                                    "ev_17_tanker_crisis"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_17_tanker_crisis",
            "stage": "stage_4",
            "name": "4.2 Fuel Emergency: Aerial Refuelling",
            "prerequisites": [
                "ev_16_airborne_ops"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.85,
                34.4
            ],
            "image": "voyager_refueler",
            "description": "EMERGENCY! A Voyager refuelling tanker suffered a mechanical failure on takeoff, cutting our in-flight fuel supply in half. Typhoons guarding paratroopers and deep-strike bombers are both running low on fuel.",
            "facilitatorNotes": "Covers LO1 P1 (Task 4: Limitation of Impermanence) and LO2 P6 (Task 11 & 22: Air-to-Air Refuelling, Voyager, and the Operation Black Buck Victor K2 tanker lesson).",
            "roleDescriptions": {
                "mobility": "Aircraft cannot stay airborne forever. Air-to-Air Refuelling allows fighters to stay on patrol for hours without having to fly back to base.",
                "jfac": "With limited refuelling tankers available, you must manage tanker orbits and order pilots to conserve fuel."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "How will you handle the aerial refuelling crisis so aircraft don't run out of fuel?",
                    "options": [
                        {
                            "id": "opt_17_buddy_voyager",
                            "text": "Scramble our backup Voyager tanker from Cyprus and prioritize fuel for the fighters actively protecting our troops",
                            "effects": {
                                "scores": {
                                    "sustainability": 2,
                                    "air_control": 1
                                },
                                "unlockEvents": [
                                    "ev_18_littoral_jhc"
                                ]
                            }
                        },
                        {
                            "id": "opt_17_ignore_fuel",
                            "text": "Order pilots to ignore fuel low-level warnings and keep flying until engines run completely dry (Planes will crash)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2,
                                    "force_protection": -2,
                                    "air_control": -1
                                },
                                "unlockEvents": [
                                    "ev_18_littoral_jhc"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "jfac",
                    "text": "How should our airborne fighters conserve fuel until the backup tanker arrives?",
                    "options": [
                        {
                            "id": "opt_17_econ_cruise",
                            "text": "Throttle back to efficient cruising speed at optimal altitude, rotating patrols to save fuel",
                            "effects": {
                                "scores": {
                                    "sustainability": 1
                                }
                            }
                        },
                        {
                            "id": "opt_17_afterburner",
                            "text": "Fly continuously at maximum afterburner at low altitude (Burns fuel ten times faster)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_18_littoral_jhc",
            "stage": "stage_4",
            "name": "4.3 Mountain Resupply: Chinook & Puma Helicopters",
            "prerequisites": [
                "ev_17_tanker_crisis"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.42,
                36.12
            ],
            "image": "ev_chinook_underslung_mountain",
            "description": "Paratroopers holding the mountain pass desperately need heavy artillery guns, ammunition pallets, and fresh water. Rugged cliffs mean planes cannot land.",
            "facilitatorNotes": "Covers LO1 P1 (Task 3: Agility of Chinook) and LO2 P4/P6 (Task 18, 22, 23: Helicopters—Chinook & Puma HC2, Joint Helicopter Command, Intra-Theatre Air Mobility).",
            "roleDescriptions": {
                "mobility": "Helicopters provide vertical airlift where runways don't exist. Heavy-lift Chinooks carry underslung artillery, while agile Pumas move troops into tight clearings."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "How do you fly heavy weapons and supplies to the paratroopers in the mountains?",
                    "options": [
                        {
                            "id": "opt_18_chinook_puma",
                            "text": "Use heavy Chinook helicopters to sling-carry artillery cannons and ammunition, backed by Puma helicopters to carry troops",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "joint_effect": 1
                                },
                                "unlockEvents": [
                                    "ev_19_csar_medevac"
                                ]
                            }
                        },
                        {
                            "id": "opt_18_voyager_mountain",
                            "text": "Try to land a giant commercial airliner on a narrow rocky mountain ridge (Impossible, will crash)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2,
                                    "force_protection": -2
                                },
                                "unlockEvents": [
                                    "ev_19_csar_medevac"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_19_csar_medevac",
            "stage": "stage_4",
            "name": "4.4 Downed Pilot & Wounded Troops: Rescue & Medevac",
            "prerequisites": [
                "ev_18_littoral_jhc"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.45,
                36.28
            ],
            "image": "ev_combat_recovery_medevac",
            "description": "URGENT OVERRIDE: A British pilot has ejected into hostile enemy territory. At the same time, four soldiers wounded by mortars need urgent air evacuation to hospital.",
            "facilitatorNotes": "Covers LO2 P6 (Task 22 & 23): Personnel Recovery (Combat Recovery vs Peacetime Recovery; Case Study: Exercise Volfa) and Aeromedical Evacuation (Forward, Tactical, and Strategic Medevac).",
            "roleDescriptions": {
                "mobility": "Combat Recovery means rescuing isolated personnel under enemy fire. Medical Evacuation carries wounded from the front line to field hospitals and home to the UK."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "How will you manage the rescue of the downed pilot and the emergency medical evacuation?",
                    "options": [
                        {
                            "id": "opt_19_csar_medevac_plan",
                            "text": "Send armed Chinooks with fighter top-cover to rescue the pilot, while flying casualties via medical helicopter to hospital",
                            "effects": {}
                        },
                        {
                            "id": "opt_19_abandon",
                            "text": "Tell the ejected pilot to walk back alone across 80 miles of occupied enemy territory",
                            "effects": {}
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_20_space_jamming",
            "stage": "stage_5",
            "name": "5.1 Air-Space Integration: Countering GPS/PNT & SATCOM Denial",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.5,
                35.5
            ],
            "image": "ev_gps_jamming",
            "description": "In a desperate bid to halt our advance, the adversary activates Russian-supplied ultra-high-power electronic warfare systems that jam space-based Positioning, Navigation, and Timing (PNT / GPS) and satellite communications across the entire operational theatre.",
            "facilitatorNotes": "Covers LO3 P10 (Task 35: Air-Space Integration—Space power is vital for enabling Positioning, Navigation, and Timing for aircraft/weapons, as well as voice/data communications) and LO1 P2 (Task 9: Denial & Disruption).",
            "roleDescriptions": {
                "joint": "Review Task 35: Space power is essential to modern Air Power, providing Positioning, Navigation, and Timing (PNT) for aircraft and precision weapons, plus beyond-line-of-sight voice and data communications.",
                "isr": "Rivet Joint SIGINT/MASINT and space domain awareness can pinpoint the high-power ground jammers so they can be destroyed."
            },
            "decisions": [
                {
                    "role": "joint",
                    "text": "How will you maintain Air-Space Integration so our aircraft can navigate, communicate, and employ precision weapons?",
                    "options": [
                        {
                            "id": "opt_20_space_int",
                            "text": "Integrate with UK Space Command for anti-jam military SATCOM/inertial backup & task Typhoons to destroy the jammers using laser/radiation-seeking munitions",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2,
                                    "joint_effect": 1
                                },
                                "unlockEvents": [
                                    "ev_21_strategic_attack"
                                ]
                            }
                        },
                        {
                            "id": "opt_20_ignore_space",
                            "text": "Ignore the space domain; rely on commercial smartphone maps in the cockpit",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -2,
                                    "joint_effect": -2,
                                    "air_control": -1
                                },
                                "unlockEvents": [
                                    "ev_21_strategic_attack"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_21_strategic_attack",
            "stage": "stage_5",
            "name": "5.2 Final Campaign Decision: Strategic Strike & Peace",
            "prerequisites": [
                "ev_20_space_jamming"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.52,
                35.78
            ],
            "image": "evt_depot_strike",
            "description": "FINAL MISSION: Enemy front-line forces have collapsed, but the rogue regime leadership is hiding inside a reinforced bunker complex, refusing to surrender.",
            "facilitatorNotes": "Covers LO2 P8 (Strategic Attack), LO1 P2 (Task 9: Coercion, Destruction, Post-Conflict Peace Building), and LO3 P9 (Task 33 & 34: Joint Action, Full Spectrum Approach—Military, Diplomatic, Economic; and why independent Air Power cannot occupy land alone). Evaluates scores to trigger the appropriate Endgame.",
            "roleDescriptions": {
                "strike": "A strategic strike targets enemy leadership and military command bunkers to end their ability to wage war.",
                "jfac": "A key lesson of doctrine: planes cannot occupy land or enforce laws. Lasting peace requires combining military, diplomatic, and humanitarian efforts."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How will you strike the regime command bunkers to compel an immediate surrender?",
                    "options": [
                        {
                            "id": "opt_21_strategic_strike",
                            "text": "Launch a precision strike with stealth F-35s and Storm Shadow bunker-buster cruise missiles against the command centre",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_21_no_strategic",
                            "text": "Stop all military operations and leave the enemy leadership bunkers completely untouched (War continues)",
                            "effects": {
                                "scores": {
                                    "air_control": -1,
                                    "joint_effect": -1
                                }
                            }
                        }
                    ]
                },
                {
                    "role": "jfac",
                    "text": "How do you transition from combat operations to securing lasting peace?",
                    "options": [
                        {
                            "id": "opt_21_full_spectrum",
                            "text": "Partner with ground troops, naval patrols, diplomats, and international aid agencies to rebuild and stabilize the region",
                            "effects": {
                                "scores": {
                                    "joint_effect": 2,
                                    "coalition_support": 2
                                },
                                "unlockEvents": [
                                    "ev_endgame_victory",
                                    "ev_endgame_culmination",
                                    "ev_endgame_denial"
                                ]
                            }
                        },
                        {
                            "id": "opt_21_air_only",
                            "text": "Withdraw all ground troops and diplomats, and try to police the cities using only fighter jets overhead",
                            "effects": {
                                "scores": {
                                    "joint_effect": -3,
                                    "coalition_support": -2
                                },
                                "unlockEvents": [
                                    "ev_endgame_victory",
                                    "ev_endgame_culmination",
                                    "ev_endgame_denial"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_endgame_victory",
            "stage": "stage_5",
            "name": "VICTORY: Decisive Joint Campaign Success",
            "prerequisites": [
                "ev_21_strategic_attack"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "isEndGame": true,
            "conditions": {
                "minScores": {
                    "air_control": 4,
                    "joint_effect": 4,
                    "sustainability": 3
                }
            },
            "location": [
                35.52,
                35.78
            ],
            "image": "ev_eu_success",
            "description": "CAMPAIGN VICTORY! By mastering the four core roles of Air Power—Control of the Air, Intelligence, Air Attack, and Air Mobility—and working seamlessly with our ground troops and Navy warships, your team compelled an enemy surrender and restored peace.",
            "facilitatorNotes": "Trigger this Endgame if the cadets achieved strong scores across Air Control (4+), Joint Effect (4+), and Sustainability (3+). Congratulate them on passing the practical application of the Senior/Master Air Power syllabus!",
            "roleDescriptions": {
                "jfac": "Outstanding leadership. You proved how air command and control acts as the catalyst for joint military success.",
                "control": "You systematically defended friendly bases and won control of the airspace.",
                "mobility": "Your airbridges and refuelling tankers kept all aircraft supplied with fuel and ammunition."
            },
            "decisions": []
        },
        {
            "id": "ev_endgame_culmination",
            "stage": "stage_5",
            "name": "STALEMATE: Supply Failure & Ground Loss",
            "prerequisites": [
                "ev_21_strategic_attack"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "isEndGame": true,
            "conditions": {
                "maxScores": {
                    "joint_effect": 3
                }
            },
            "location": [
                34.58,
                32.98
            ],
            "image": "ev_endgame_culmination",
            "description": "OPERATIONAL STALEMATE: While our pilots scored tactical victories in the sky, a lack of supply and an attempt to win the war using air power alone allowed militias to retake key cities. As RAF doctrine teaches: aircraft cannot hold ground.",
            "facilitatorNotes": "Trigger this Endgame if the cadets achieved Air Control but let Joint Effect or Sustainability drop to 3 or below. Use this to debrief LO1 P1 (Limitations of Air Power) and LO3 P9 (Why Joint Operations and the Full Spectrum Approach are essential).",
            "roleDescriptions": {
                "jfac": "A vital lesson: air dominance alone cannot win a war if you do not support ground forces and long-term diplomacy.",
                "mobility": "Without enough fuel, maintenance, and supplies, even the most advanced jets are grounded."
            },
            "decisions": []
        },
        {
            "id": "ev_endgame_denial",
            "stage": "stage_5",
            "name": "DEFEAT: Loss of Air Control",
            "prerequisites": [
                "ev_21_strategic_attack"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "isEndGame": true,
            "conditions": {
                "maxScores": {
                    "air_control": 3
                }
            },
            "location": [
                35.3,
                35.8
            ],
            "image": "ev_raf_bases_strike",
            "description": "CAMPAIGN DEFEAT: Our force failed to take out the enemy's missile defence network or defend our forward airfields. Without control of the skies, our transport planes, helicopters, and Navy ships suffered heavy losses and were forced to withdraw.",
            "facilitatorNotes": "Trigger this Endgame if Air Control is 3 or below. Use this to debrief LO2 P5: why Control of the Air is the foundational prerequisite for all other military operations.",
            "roleDescriptions": {
                "control": "Without control of the skies, neither ground troops nor naval ships can operate safely.",
                "isr": "Incomplete intelligence and cyber support left our strike packages exposed to enemy missile traps."
            },
            "decisions": []
        },
        {
            "id": "ev_sf_raid_success",
            "stage": "stage_3",
            "name": "Special Forces Air Raid Success",
            "hidden": true,
            "location": [
                35.48,
                36.05
            ],
            "image": "ev_sf_success",
            "description": "Flying under cover of darkness, RAF Chinooks dropped UK Special Forces behind enemy lines. The team captured enemy code hardware and top enemy officers before extracting safely.",
            "roleDescriptions": {
                "mobility": "Helicopter pilots flew low through the canyons using night-vision goggles to avoid enemy radar.",
                "isr": "The captured equipment provides vital cryptographic intelligence on the enemy's battle plans."
            },
            "decisions": []
        },
        {
            "id": "ev_humanitarian_drop",
            "stage": "stage_4",
            "name": "Humanitarian Relief Drop Completed",
            "hidden": true,
            "location": [
                35.25,
                36.3
            ],
            "image": "a400m_transport",
            "description": "RAF Atlas transport planes successfully parachute-dropped 40 tonnes of food, water purification kits, and emergency medicine to civilians cut off by the fighting.",
            "roleDescriptions": {
                "joint": "This relief mission proves how Air Power can deliver life-saving aid to remote areas within hours."
            },
            "decisions": []
        },
        {
            "id": "ev_combat_air_patrol_surge",
            "stage": "stage_2",
            "name": "24/7 Fighter Air Shield Established",
            "hidden": true,
            "location": [
                34.9,
                33.5
            ],
            "image": "ev_airspace_intercept",
            "description": "Extra Typhoon fighter flights backed by continuous aerial refuelling have established a round-the-clock air barrier, deterring enemy incursions across the Mediterranean.",
            "roleDescriptions": {
                "control": "Continuous fighter patrols have forced enemy aircraft to stay grounded on their own airfields."
            },
            "decisions": []
        },
        {
            "id": "ev_link16_sync",
            "stage": "stage_2",
            "name": "Real-Time Digital Battle Map Synchronized",
            "hidden": true,
            "location": [
                35,
                34
            ],
            "image": "ev_cyber_success",
            "description": "Intelligence and communications teams have linked all RAF, Royal Navy, and Army units onto a single digital data network, giving all commanders the exact same live battle map.",
            "roleDescriptions": {
                "isr": "Sensors, commanders, and pilots now share radar and drone video in real time."
            },
            "decisions": []
        },
        {
            "id": "ev_raf_regt_sweep",
            "stage": "stage_2",
            "name": "RAF Regiment Base Defence Sweep Complete",
            "hidden": true,
            "location": [
                34.58,
                32.98
            ],
            "image": "generic_deployment",
            "description": "Armed RAF Regiment ground patrols swept the hills around RAF Akrotiri, taking out an insurgent mortar team and securing the airbase perimeter.",
            "roleDescriptions": {
                "jfac": "The airfield perimeter is secure, allowing transport and fighter sorties to launch safely."
            },
            "decisions": []
        },
        {
            "id": "ev_psyops_broadcast",
            "stage": "stage_3",
            "name": "Radio Broadcasts & Leaflet Drop Success",
            "hidden": true,
            "location": [
                35.4,
                36
            ],
            "image": "ev_psyops_leaflet_drop",
            "description": "RAF aircraft dropped 100,000 information leaflets and beamed emergency radio messages into enemy positions, convincing two militia units to surrender without a shot fired.",
            "roleDescriptions": {
                "strike": "Non-kinetic psychological operations successfully weakened the enemy's will to fight."
            },
            "decisions": []
        }
    ],
    "manualActions": [
        {
            "id": "act_sf_air_ops",
            "name": "Special Forces Air Insertion",
            "description": "Fly Chinook helicopters and a Shadow surveillance plane at night to sneak UK Special Forces behind enemy lines to capture enemy intel.",
            "initiator": [
                "mobility",
                "isr"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "minScores": {
                    "air_control": 3
                }
            },
            "effects": {
                "scores": {
                    "situational_awareness": 1,
                    "joint_effect": 1
                },
                "triggerEvents": [
                    {
                        "id": "ev_sf_raid_success",
                        "delayMs": 4000,
                        "probability": 1
                    }
                ]
            },
            "image": "act_special_forces"
        },
        {
            "id": "act_humanitarian_aid",
            "name": "Humanitarian Aid Air-Drop",
            "description": "Fly an RAF Atlas transport plane to drop emergency food, clean water, and medicine to displaced civilians trapped by the fighting.",
            "initiator": [
                "mobility",
                "joint"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "minScores": {
                    "sustainability": 2
                }
            },
            "effects": {
                "scores": {
                    "coalition_support": 2,
                    "sustainability": -1
                },
                "triggerEvents": [
                    {
                        "id": "ev_humanitarian_drop",
                        "delayMs": 4000,
                        "probability": 1
                    }
                ]
            },
            "image": "act_us_support"
        },
        {
            "id": "act_dca_surge",
            "name": "Surge Combat Air Patrols",
            "description": "Launch extra Typhoon fighters supported by a Voyager fuel tanker to patrol the skies 24/7 and block enemy air incursions.",
            "initiator": [
                "control"
            ],
            "requiresApprovalFrom": [
                "mobility"
            ],
            "conditions": {
                "minScores": {
                    "sustainability": 3
                }
            },
            "effects": {
                "scores": {
                    "air_control": 1,
                    "force_protection": 1,
                    "sustainability": -1
                },
                "triggerEvents": [
                    {
                        "id": "ev_combat_air_patrol_surge",
                        "delayMs": 4000,
                        "probability": 1
                    }
                ]
            },
            "image": "ev_airspace_intercept"
        },
        {
            "id": "act_nec_sync",
            "name": "Sync Real-Time Data Links",
            "description": "Connect all RAF jets, Navy warships, and Army units onto the Link-16 digital network so every unit shares the same live battle map.",
            "initiator": [
                "isr",
                "joint"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "minScores": {
                    "situational_awareness": 2
                }
            },
            "effects": {
                "scores": {
                    "joint_effect": 1,
                    "situational_awareness": 1
                },
                "triggerEvents": [
                    {
                        "id": "ev_link16_sync",
                        "delayMs": 4000,
                        "probability": 1
                    }
                ]
            },
            "image": "act_cyber_offensive"
        },
        {
            "id": "act_regt_patrol",
            "name": "RAF Regiment Perimeter Patrol",
            "description": "Send heavily armed RAF Regiment ground patrols outside RAF Akrotiri to hunt down enemy mortar and drone teams.",
            "initiator": [
                "jfac",
                "control"
            ],
            "conditions": {
                "minScores": {
                    "sustainability": 2
                }
            },
            "effects": {
                "scores": {
                    "force_protection": 1
                },
                "triggerEvents": [
                    {
                        "id": "ev_raf_regt_sweep",
                        "delayMs": 4000,
                        "probability": 1
                    }
                ]
            },
            "image": "act_national_address"
        },
        {
            "id": "act_info_psyops",
            "name": "Air Broadcast & Leaflet Drop",
            "description": "Drop informational leaflets and broadcast radio messages over militia lines urging fighters to lay down their weapons.",
            "initiator": [
                "strike",
                "joint"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "minScores": {
                    "air_control": 3
                }
            },
            "effects": {
                "scores": {
                    "coalition_support": 1,
                    "joint_effect": 1
                },
                "triggerEvents": [
                    {
                        "id": "ev_psyops_broadcast",
                        "delayMs": 4000,
                        "probability": 1
                    }
                ]
            },
            "image": "act_backchannel_russia"
        }
    ]
};
