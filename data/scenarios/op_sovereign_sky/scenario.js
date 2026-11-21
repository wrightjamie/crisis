module.exports = {
    "id": "op_sovereign_sky",
    "name": "Op Sovereign Sky: Air Power Doctrine",
    "description": "Command the UK Joint Force Air Component (11 Group) across three parallel tracks in an Eastern Mediterranean crisis. Use all 4 fundamental roles of Air Power, work with land, sea, space, and cyber teams, and win the campaign.",
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
        "_general": "Welcome to the UK Joint Force Air Component (UK JFAC / 11 Group) Operations Centre. A hostile state ('Crimson State') and armed non-state militias have seized coastal territory in the Eastern Mediterranean behind an Anti-Access/Area Denial (A2AD) missile barrier. Three parallel missions—Control of the Air, ISR & Cyber, and Air Mobility & Maritime—will happen at the same time. Talk to the other teams: intelligence found in one track unlocks precision strike choices and time-limited actions in others!",
        "jfac": "As UK JFAC Commander, you lead Operational Command and Control (C2), turning the UK Government's Strategic goals into clear plans for our air forces. Remember Air Power's golden rule: aircraft cannot hold ground on their own—winning requires Joint Action and a Full Spectrum Approach.",
        "control": "You lead the Control of the Air Cell. Without Control of the Air, friendly ships, troops, and transport planes are easy targets. Manage Active and Passive Defensive Counter-Air (DCA), launch Offensive Counter-Air (OCA) against enemy SAMs, and move from a Favourable Air Situation to Air Superiority and Air Supremacy.",
        "strike": "You lead the Air Attack & Strike Cell. Use precision weapons and non-kinetic Information Activities (Electronic Warfare & Psychological Operations) to Deter, Disrupt, and Destroy enemy forces across Strategic Attack, Counter-Land (CAS, AI, SCAR), and Counter-Sea (ASW, ASuW) missions.",
        "isr": "You lead the Intelligence & Cyber Cell (No 1 ISR Wing). Combine all 7 intelligence methods (SIGINT, MASINT, GEOINT, OSINT, TECHINT, HUMINT, FININT), follow the 9-step ISR process, protect our Link-16 Network Enabled Capability (Defensive Air-Cyber), and support Operation Orchard-style Offensive Air-Cyber strikes.",
        "mobility": "You lead the Air Mobility & Logistics Cell. Manage all 6 divisions of Air Mobility: Hub & Spoke (RAF Brize Norton to RAF Akrotiri), Airborne Operations (Air-Drop vs Air-Land), Air-to-Air Refuelling (overcoming Impermanence), Joint Helicopter Command, 3-tier Aeromedical Evacuation, Personnel Recovery, and Special Forces Air Ops.",
        "joint": "You lead the Joint Action & All-Domain Cell. Combine Air Power with Land (ALI), Maritime (AMI), Space (PNT/SATCOM), and Cyber forces, protect the 4 Enablers (Base, Sustain, Connect, Protect), and use Diplomatic and Economic tools under the Full Spectrum Approach."
    },
    "aiConfig": {
        "systemPrompt": "You are an automated RAF Joint Force Air Component (JFAC) operational summary system.\nCRITICAL RULES:\n- Describe the objective operational situation using official RAF Air Power syllabus terminology (e.g., Control of the Air, ISR, Air Mobility, Air Attack, Enablers, Joint Action).\n- NEVER refer to the player, \"you\", \"your\", or their role name.\n- Write exactly ONE short paragraph (1-2 sentences). Do NOT output bullet points.\n- Start directly with the operational impact. Do not use greetings.\n- Do not use markdown formatting.\n- Stick to the provided facts.\n- Use clear, accessible English suitable for Air Cadets aged 14-16 while accurately reinforcing textbook Air Power terms.",
        "scoreLabels": {
            "1": "Critical / Denied",
            "2": "Contested / Degraded",
            "3": "Favourable / Adequate",
            "4": "Superior / Strong",
            "5": "Supremacy / Optimal"
        },
        "roleContexts": {
            "jfac": "Focus area: operational command and control, strategic objectives, and keeping all parallel tracks working together.",
            "control": "Focus area: degrees of control of the air, offensive counter-air (OCA), and active/passive defensive counter-air (DCA).",
            "strike": "Focus area: strategic attack, counter-land (CAS, AI, SCAR), counter-sea (ASW/ASuW), and non-kinetic information activities.",
            "isr": "Focus area: 7 intelligence methods (SIGINT, MASINT, GEOINT, OSINT, TECHINT, HUMINT, FININT), 9-step ISR process, NEC, and defensive/offensive cyber integration.",
            "mobility": "Focus area: 6 divisions of air mobility—hub and spoke logistics, AAR, airborne ops, 3-tier medevac, combat recovery, and SF air ops.",
            "joint": "Focus area: joint action, air-land/maritime/space integration, 4 enablers, and the full spectrum approach."
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
            "name": "Basing & Carrier Posture (Aircraft Carriers vs Overseas Base)",
            "options": [
                {
                    "id": "carrier_deployed",
                    "name": "Aircraft Carrier On-Station (Carrier Enabled Power Projection)",
                    "briefingText": "HMS Queen Elizabeth is on station in the Eastern Med carrying F-35B Lightnings, cutting flight distances and reducing our need for Air-to-Air Refuelling.",
                    "roleBriefings": {
                        "control": "Carrier Enabled Power Projection shortens flying times and lets F-35Bs stay over the battle longer, though we are limited to the aircraft and weapons the ship can carry.",
                        "mobility": "Having a carrier close to the action cuts tanker demand, leaving Voyager tankers free to support the Hub & Spoke airbridge."
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
                            "briefing": "Queen Elizabeth-class aircraft carrier providing Carrier Enabled Power Projection with 5th-generation STOVL F-35B Lightning stealth fighters."
                        }
                    ]
                },
                {
                    "id": "akrotiri_only",
                    "name": "Overland Hub & Spoke Only (No Carrier)",
                    "briefingText": "HMS Queen Elizabeth is in refit at Rosyth. All Air Power must fly from RAF Akrotiri (Spoke) and UK bases (Hubs), requiring heavy Voyager Air-to-Air Refuelling support.",
                    "roleBriefings": {
                        "mobility": "Without a carrier nearby, our fighters depend on RAF Akrotiri and Voyager Air-to-Air Refuelling to achieve Reach and overcome Impermanence.",
                        "control": "Keeping all our jets at one overseas airfield makes that base a bigger target for missile or drone attacks."
                    },
                    "scoreModifiers": {
                        "sustainability": 1,
                        "force_protection": -1
                    },
                    "assetModifiers": [
                        {
                            "id": "a_qec",
                            "name": "HMS Queen Elizabeth (Refit)",
                            "location": [
                                56.02,
                                -3.44
                            ],
                            "state": "maintenance",
                            "tags": [
                                "maritime"
                            ],
                            "image": "qe_class_carrier",
                            "briefing": "In dock for maintenance at Rosyth and unavailable for Carrier Enabled Power Projection in this crisis."
                        }
                    ]
                }
            ]
        },
        {
            "id": "conflict_type",
            "name": "Adversary Profile (State vs Non-State / Types of Conflict)",
            "options": [
                {
                    "id": "symmetrical_state",
                    "name": "State Actor (Symmetrical Limited Conflict)",
                    "briefingText": "Crimson State is a regular State Actor with integrated Surface-to-Air Missiles (A2AD), fighter jets, and naval warships.",
                    "roleBriefings": {
                        "control": "Expect heavily defended skies. Moving from a Favourable Air Situation to Air Superiority will require planned Offensive Counter-Air (OCA) strikes.",
                        "isr": "Heavy enemy radar and jamming threat. Use RC-135W Rivet Joint SIGINT and MASINT to map enemy missile radars."
                    },
                    "scoreModifiers": {
                        "air_control": -1,
                        "coalition_support": 1
                    }
                },
                {
                    "id": "asymmetrical_insurgency",
                    "name": "Non-State Actor (Asymmetrical Insurgency)",
                    "briefingText": "Armed non-state militias hide inside coastal towns, using explosive commercial drones, shoulder-fired missiles (MANPADS), and hidden smuggling routes.",
                    "roleBriefings": {
                        "isr": "Targets appear briefly and mix with civilians. Use long-endurance surveillance (Reaper MQ-9B, Shadow R1) alongside OSINT, HUMINT, and FININT.",
                        "control": "High-altitude airspace is safer for our jets, but low-flying aircraft and airfields face constant asymmetric attacks."
                    },
                    "scoreModifiers": {
                        "situational_awareness": -1,
                        "force_protection": -1
                    }
                }
            ]
        },
        {
            "id": "coalition_posture",
            "name": "Alliance & Command Mandate (Coalition Capability & NATO C2)",
            "options": [
                {
                    "id": "nato_full_mandate",
                    "name": "UN & NATO Joint Mandate",
                    "briefingText": "UK JFAC operates under a UN Peace Enforcement mandate working closely with NATO Air Command & Control (similar to NATO Icelandic Air Policing).",
                    "roleBriefings": {
                        "joint": "Strong backing from international allies gives extra Diplomatic and Economic power for the Full Spectrum Approach, though strict Rules of Engagement apply.",
                        "jfac": "Shared radio and data systems with allies are strong—avoid civilian harm to keep allied bases and support open."
                    },
                    "scoreModifiers": {
                        "coalition_support": 1,
                        "joint_effect": 1
                    }
                },
                {
                    "id": "uk_national_lead",
                    "name": "UK-Led Rapid Response",
                    "briefingText": "The UK leads a fast-moving national mission under UK-only command with quicker decision chains, but less international backing.",
                    "roleBriefings": {
                        "jfac": "UK-only command lets you re-task aircraft and strike faster, but international allies will judge every mistake harshly.",
                        "joint": "Other nations are watching closely—use careful targeting and Humanitarian Operations to win Coalition Support."
                    },
                    "scoreModifiers": {
                        "coalition_support": -1,
                        "air_control": 1
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
            "briefing": "Main UK Hub for Inter-Theatre Air Mobility: C-17 Globemaster (4,500nm), A400M Atlas C.1 (4,100nm), C-130J Hercules (2,650nm), and Voyager tankers (8,000nm)."
        },
        {
            "id": "a_waddington",
            "name": "RAF Waddington (No 1 ISR Wing Hub)",
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
            "briefing": "Home of No 1 ISR Wing: E-3D Sentry AEW1 (AWACS), RC-135W Rivet Joint (SIGINT), Shadow R1, and remotely piloted Reaper MQ-9B RPAS."
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
            "briefing": "Forward operating base (Spoke) in Cyprus giving Reach and Agility into the battle zone. Guarded by the RAF Regiment (Protect) and linked by 90 Signals Unit (Connect)."
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
            "briefing": "4th-generation multi-role combat aircraft from RAF Coningsby and RAF Lossiemouth for Quick Reaction Alert (QRA), Active DCA, Close Air Support, and Storm Shadow strikes."
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
            "briefing": "5th-generation stealth STOVL multi-role fighter from RAF Marham (and QE-class aircraft carriers), built to slip through heavy A2AD radar defences."
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
            "briefing": "Air-to-Air Refuelling (AAR) tanker and long-range transport aircraft (8,000nm range), vital for overcoming Air Power's limitation of Impermanence."
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
            "briefing": "Multi-role maritime patrol aircraft from RAF Lossiemouth with high-resolution radar, underwater listening sonobuoys, and torpedoes for Counter-Sea (ASW and ASuW)."
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
            "briefing": "Dedicated electronic surveillance aircraft that scans radio and radar signals across the electromagnetic spectrum for SIGINT and MASINT."
        },
        {
            "id": "a_chinook",
            "name": "Chinook & Puma HC2 (JHC)",
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
            "briefing": "Joint Helicopter Command support helicopters for Intra-Theatre troop and cargo lift, underslung artillery, Combat Recovery, Special Forces Air Ops, and Forward Medevac (Puma carries up to 6 stretchers)."
        },
        {
            "id": "a_type45",
            "name": "HMS Duncan (Type 45) & RN Wildcat",
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
            "briefing": "Royal Navy Type 45 Air Defence Destroyer (armed with Sea Viper anti-air missiles) carrying a Royal Navy Wildcat helicopter for Air-Maritime Integration (AMI) and Counter-Sea ops."
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
            "briefing": "Hidden mobile SA-17 'Grizzly' Surface-to-Air Missile battery forming Crimson State's coastal A2AD missile shield. ISR must pinpoint it before a Precision Stealth OCA strike."
        },
        {
            "id": "a_insurgent_drone_cell",
            "name": "Insurgent Drone & Mortar Cell",
            "location": [
                34.64,
                32.92
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "asymmetric",
                "uas"
            ],
            "image": "ev_drone_swarm_perimeter",
            "briefing": "Non-state militia team launching explosive commercial drones and mortars from hills just outside the RAF Akrotiri fence."
        },
        {
            "id": "a_hostile_sub",
            "name": "Hostile Kilo-Class Submarine",
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
            "briefing": "Enemy diesel-electric attack submarine hiding deep under the Eastern Mediterranean to ambush Royal Navy ships and supply vessels."
        },
        {
            "id": "a_sf_intel_compound",
            "name": "Enemy Radar Code & Command Villa",
            "location": [
                35.48,
                36.05
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "intel",
                "sf_target"
            ],
            "image": "ukr_kyiv_command",
            "briefing": "Guarded coastal villa holding Crimson State's secret SAM radar codes and equipment manuals—a high-value target for a night Special Forces Air Operation and TECHINT capture."
        },
        {
            "id": "a_displaced_civilians",
            "name": "Cut-Off Coastal Refugee Town",
            "location": [
                35.25,
                36.3
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "civilian",
                "humanitarian"
            ],
            "image": "generic_un",
            "briefing": "Over 4,000 civilians cut off from road links by the fighting, urgently needing short-term Humanitarian Operations food, clean water, and medicine."
        },
        {
            "id": "a_gps_jammer",
            "name": "High-Power GPS/SATCOM Jammer",
            "location": [
                35.5,
                35.5
            ],
            "state": "operational",
            "hidden": true,
            "tags": [
                "hostile",
                "space",
                "ew"
            ],
            "image": "ev_gps_jamming",
            "briefing": "Truck-mounted electronic warfare jammer blasting radio noise to block space-based GPS Positioning, Navigation & Timing (PNT) and military satellite communications (SATCOM)."
        }
    ],
    "stages": [
        {
            "id": "stage_1",
            "name": "Stage 1: Deterrence, Deployment & Multi-Track Launch"
        },
        {
            "id": "stage_2",
            "name": "Stage 2: Parallel Tracks — Air Control, ISR/Cyber & Maritime Lift"
        },
        {
            "id": "stage_3",
            "name": "Stage 3: Cross-Domain Air Attack & Time-Critical Ops"
        },
        {
            "id": "stage_4",
            "name": "Stage 4: Expeditionary Mobility, Airborne & Combat Recovery"
        },
        {
            "id": "stage_5",
            "name": "Stage 5: Air-Space Climax, Strategic Attack & Full Spectrum Peace"
        }
    ],
    "eventTemplates": [
        {
            "id": "ev_start",
            "isOpeningEvent": true,
            "stage": "stage_1",
            "name": "0.1 UK JFAC Orders: National Security & Multi-Track Launch",
            "repeatable": false,
            "sound": "teletype",
            "location": [
                35.1,
                33.9
            ],
            "image": "ev_crisis_cabinet",
            "description": "Crisis alert in the Eastern Mediterranean! Crimson State troops and armed non-state militias are gathering along the coast. The UK Government issues a Strategic order under the National Security Strategy (Protect, Project, Promote) to deter an invasion and deploy the UK Joint Force Air Component (UK JFAC / 11 Group). Three parallel tracks will soon begin at the same time: Control of the Air, ISR & Cyber, and Air Mobility & Maritime.",
            "facilitatorNotes": "MASTER START EVENT — Launches 3 staggered parallel tracks automatically (Track A at 20s, Track B at 55s, Track C at 90s; facilitator can also force-trigger early or pause). Covers LO1 P1 (Air Power definition, Air Capability, Course of Events), LO1 P2 (Tasks 5, 6, 8, 9: Protect/Project/Promote, Strategic/Operational/Tactical levels of warfare, Preventative Diplomacy, Defence Diplomacy, Deterrence, Deployment with Consent), and LO3 P9 (UK JFAC / 11 Group / RAF High Wycombe / RAF Spadeadam / NATO Air C2 / Icelandic Air Policing).",
            "roleDescriptions": {
                "jfac": "Remember the 3 Levels of Warfare: the Government sets the big Strategic goal; UK JFAC (11 Group) plans the Operational theatre campaign; squadrons fly the Tactical missions. Letting local leaders handle Tactical details keeps our air force fast and flexible.",
                "joint": "Deterrence means showing credible military strength to stop an enemy from attacking in the first place (unlike Coercion, which uses force or threats to make them change behaviour after they act). Joint patrols like NATO Icelandic Air Policing mix Defence Diplomacy with real readiness.",
                "control": "Launching Typhoon FGR4 Quick Reaction Alert (QRA) patrols immediately demonstrates Air Power's Speed and Reach."
            },
            "triggerEvents": [
                {
                    "id": "ev_t1_basing_dilemma",
                    "delayMs": 20000,
                    "probability": 1
                },
                {
                    "id": "ev_t2_intel_fusion",
                    "delayMs": 55000,
                    "probability": 1
                },
                {
                    "id": "ev_t3_hub_and_spoke",
                    "delayMs": 90000,
                    "probability": 1
                }
            ],
            "decisions": [
                {
                    "role": "jfac",
                    "text": "How will UK JFAC turn the Government's Strategic orders into Operational and Tactical action?",
                    "options": [
                        {
                            "id": "opt_start_mission_cmd",
                            "text": "Issue an Operational campaign plan uniting all 4 roles of Air Power, while letting squadron leaders run Tactical flight details",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "coalition_support": 1
                                }
                            }
                        },
                        {
                            "id": "opt_start_centralise",
                            "text": "Make Government ministers in London approve every single Tactical flight path to reduce political risk (Causes dangerous delays)",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "air_control": -1,
                                    "joint_effect": -1
                                }
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How should we use our aircraft before fighting breaks out to support Conflict Prevention and Preventative Diplomacy?",
                    "options": [
                        {
                            "id": "opt_start_deterrence",
                            "text": "Fly visible coalition Deterrence patrols under Deployment with Consent (like NATO Icelandic Air Policing) to discourage an invasion",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_start_covert_posture",
                            "text": "Keep British aircraft hidden and unannounced to gain surprise if war starts (Gives up diplomatic Deterrence)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "coalition_support": -1
                                }
                            }
                        },
                        {
                            "id": "opt_start_preempt_strike",
                            "text": "Launch surprise bombing raids before diplomacy has been tried (Destroys international coalition support)",
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
            "id": "ev_t1_basing_dilemma",
            "stage": "stage_1",
            "name": "Track A1: Basing Dilemma — Close Dirt Strip vs Safe RAF Akrotiri",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                34.58,
                32.98
            ],
            "image": "nato_air_base",
            "description": "TRACK A (CONTROL OF THE AIR): Fighting breaks out along the coast! An ally offers 'Forward Strip Alpha'—a basic runway just 40 miles from enemy guns, giving super-fast flying times. Or we can fly from our established base (Spoke) at RAF Akrotiri, 150 miles away across the sea with bomb-proof concrete shelters, meaning longer flights and more aerial refuelling.",
            "facilitatorNotes": "TRACK A1 — Covers LO1 P1 (Task 4: Limitation of Vulnerability/Fragility on the ground) and LO1 P3 (Tasks 10 & 12: Airfields, Basing Considerations, Reach vs Speed of Response, F-35B STOVL flexibility). Notice Option C triggers a unique branching penalty event (ev_t1_forward_artillery_hit) before continuing Track A!",
            "roleDescriptions": {
                "control": "Aircraft are very fragile when parked on the ground. Basing at RAF Akrotiri keeps jets out of enemy artillery range, though pilots must fly further (Reach). Split basing uses the F-35B Lightning's STOVL ability to operate briefly from rough forward strips while keeping Typhoons safe at Akrotiri.",
                "mobility": "Forward Strip Alpha has no concrete bomb shelters, very little fuel storage, and risky supply roads—crowding all our aircraft there is very dangerous."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "Where should we base our combat aircraft?",
                    "options": [
                        {
                            "id": "opt_a1_akrotiri",
                            "text": "Base every jet safely at RAF Akrotiri (Strong Base protection and bomb shelters; longer flying distance and more AAR fuel needed)",
                            "effects": {
                                "scores": {
                                    "force_protection": 2,
                                    "sustainability": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_dca_akrotiri",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a1_split_stovl",
                            "text": "Split Basing: Use stealth STOVL F-35Bs for short pop-up stops at Alpha while keeping Typhoons & support planes safely at RAF Akrotiri",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": 1,
                                    "sustainability": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_dca_akrotiri",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a1_forward_all",
                            "text": "Pack all Typhoons and F-35Bs onto Forward Strip Alpha for the fastest flights (Leaves fragile aircraft exposed to enemy artillery)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_forward_artillery_hit",
                                        "delayMs": 25000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "mobility",
                    "text": "How will Mobility help our jets cover the longer distance (Reach) from RAF Akrotiri to the battle?",
                    "options": [
                        {
                            "id": "opt_a1_aar_towlines",
                            "text": "Set up continuous Voyager Air-to-Air Refuelling orbits offshore plus forward refuelling points for helicopters",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_a1_short_sorties",
                            "text": "Keep Voyager tankers back to save wear and tear and fly shorter unrefuelled patrols (Cuts time over the battlefield)",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "air_control": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t1_forward_artillery_hit",
            "stage": "stage_2",
            "name": "Track A1-Branch: Rocket Attack on Forward Strip Alpha!",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "explosion",
            "location": [
                35.15,
                35.45
            ],
            "image": "ev_kinetic_strike",
            "description": "CONSEQUENCE BRANCH: Enemy rockets slam into the crowded, unprotected tarmac at Forward Strip Alpha! Shrapnel rips through two parked Typhoon FGR4s—proving how Fragile and Vulnerable aircraft are on the ground.",
            "facilitatorNotes": "BRANCHING CONSEQUENCE EVENT (triggered only if Control packed the wing onto Forward Strip Alpha). Debrief LO1 P1/P3: Fragility and ease of destruction on the ground vs Basing Considerations.",
            "autoEffects": {
                "assetStateChanges": {
                    "a_typhoon": "damaged"
                }
            },
            "roleDescriptions": {
                "jfac": "Emergency action needed: pull our remaining aircraft back to RAF Akrotiri's concrete shelters right away or risk losing the whole squadron."
            },
            "decisions": [
                {
                    "role": "jfac",
                    "text": "Forward Strip Alpha is under heavy rocket fire. Give emergency orders:",
                    "options": [
                        {
                            "id": "opt_a1b_evac_akrotiri",
                            "text": "Scramble immediately and fly all undamaged jets back to hardened shelters at RAF Akrotiri",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "sustainability": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_dca_akrotiri",
                                        "delayMs": 35000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a1b_hold_strip",
                            "text": "Try to patch the runway under fire and keep flying from Alpha (Risks losing more jets)",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "air_control": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_dca_akrotiri",
                                        "delayMs": 35000,
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
            "id": "ev_t1_dca_akrotiri",
            "stage": "stage_2",
            "name": "Track A2: Air Raid! Active & Passive Defensive Counter-Air",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "klaxon",
            "location": [
                34.58,
                32.98
            ],
            "image": "ev_akrotiri_strike",
            "description": "TRACK A (AIR RAID ALERT): Enemy strike jets and low-flying cruise missiles are racing straight for RAF Akrotiri and HMS Duncan! Active Defensive Counter-Air (DCA) must detect, intercept, and shoot them down in the air, while Passive DCA protects aircraft parked on the ground. (Unlocks the 'Surge 24/7 Combat Air Patrols' Action for Control!)",
            "facilitatorNotes": "TRACK A2 — TIMED DECISION (120s on Control)! Covers LO2 P5 (Task 21: Defensive Counter-Air — Active Measures: Detection, Interception, Engagement vs Passive Measures: Hardening, Dispersal, Camouflage/Concealment/Deception, Early Warning) and LO1 P1 (Speed: QRA). Also UNLOCKS Manual Action 'act_dca_surge'!",
            "roleDescriptions": {
                "control": "TIMED SCRAMBLE (2 mins)! Active DCA combines Typhoon FGR4 Quick Reaction Alert (QRA) fighters with HMS Duncan's Sea Viper anti-air missiles. Once this raid hits, check your Actions menu—'Surge 24/7 Combat Air Patrols' is now unlocked (needs Mobility's approval for tanker fuel)!",
                "mobility": "Passive DCA stops a single missile from wiping out multiple parked planes: use Hardened Aircraft Shelters (HAS), spread aircraft out (Dispersal), and set up dummy decoys (Camouflage, Concealment & Deception), even if it slows refuelling down slightly."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "INBOUND CRUISE MISSILES (TIME CRITICAL): Launch Active Defensive Counter-Air!",
                    "timeLimitMs": 120000,
                    "defaultOptionId": "opt_a2_timeout",
                    "options": [
                        {
                            "id": "opt_a2_full_active",
                            "text": "Scramble Typhoon FGR4 QRA fighters and link up with HMS Duncan's Sea Viper anti-air missiles (Full Active DCA — uses more missiles & fuel)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": 1,
                                    "sustainability": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_asymmetric_swarm",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_neutral_airliner",
                                        "delayMs": 32000,
                                        "probability": 0.5
                                    },
                                    {
                                        "id": "ev_wc_fastjet_ambush",
                                        "delayMs": 35000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a2_sam_only",
                            "text": "Rely on HMS Duncan's Sea Viper missiles alone to save Typhoon fuel and missiles (Some cruise missiles get through)",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "air_control": -1,
                                    "force_protection": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_asymmetric_swarm",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_fastjet_ambush",
                                        "delayMs": 30000,
                                        "probability": 0.55
                                    },
                                    {
                                        "id": "ev_wc_neutral_airliner",
                                        "delayMs": 35000,
                                        "probability": 0.3
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a2_timeout",
                            "text": "Time Expired (Standing Orders): QRA fighters launch too late and missiles hit the aircraft parking area",
                            "effects": {
                                "scores": {
                                    "air_control": -2,
                                    "force_protection": -2
                                },
                                "assetStateChanges": {
                                    "a_typhoon": "damaged"
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_asymmetric_swarm",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "mobility",
                    "text": "Put Passive Defensive Counter-Air measures in place on the ground at RAF Akrotiri:",
                    "options": [
                        {
                            "id": "opt_a2_passive_full",
                            "text": "Move fighters into concrete Hardened Aircraft Shelters, spread transports far apart (Dispersal), and put out dummy decoys (CCD)",
                            "effects": {
                                "scores": {
                                    "force_protection": 2
                                }
                            }
                        },
                        {
                            "id": "opt_a2_fast_turnaround",
                            "text": "Keep aircraft lined up together on the main tarmac for faster refuelling and quicker flights (One bomb could hit several planes)",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "force_protection": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t1_asymmetric_swarm",
            "stage": "stage_2",
            "name": "Track A3: Asymmetric Drone Swarm & TECHINT Recovery",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "explosion",
            "location": [
                34.62,
                32.95
            ],
            "image": "ev_drone_swarm_perimeter",
            "description": "TRACK A (ASYMMETRIC THREAT): Moments after the missile raid, non-state militia fighters hiding in hills outside RAF Akrotiri launch 15 explosive commercial drones toward our aviation fuel tanks! Radar spots their launch site on the map. (Unlocks the 'RAF Regiment Perimeter Sweep' Action!)",
            "facilitatorNotes": "TRACK A3 — Reveals hidden asset 'a_insurgent_drone_cell' and UNLOCKS Manual Action 'act_regt_patrol'! Covers LO1 P1/P2 (Task 2, 4, 7: Asymmetrical Warfare, Non-State Actors, Vulnerability, Protect Enabler — RAF Regiment), LO2 P7 (Task 25: TECHINT — Technical Intelligence from captured enemy hardware), and Electronic Warfare.",
            "autoEffects": {
                "revealAssets": [
                    "a_insurgent_drone_cell"
                ]
            },
            "roleDescriptions": {
                "jfac": "This is Asymmetrical Warfare: cheap commercial drones attack fragile fuel tanks instead of fighting our jets in the air. Protecting the area around the airfield is the RAF Regiment's job—also check your Actions menu for 'RAF Regiment Perimeter Sweep'!",
                "isr": "Jamming the drones' radio signals knocks them out of the sky immediately—and inspecting the crashed drones gives us valuable TECHINT (Technical Intelligence) on enemy electronics and weapons!"
            },
            "decisions": [
                {
                    "role": "jfac",
                    "text": "How will you defend RAF Akrotiri's fuel tanks from the low-flying drone swarm?",
                    "options": [
                        {
                            "id": "opt_a3_regiment",
                            "text": "Send out armed RAF Regiment Force Protection patrols with anti-drone jamming rifles and close-range defences around the perimeter",
                            "effects": {
                                "scores": {
                                    "force_protection": 2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_oca_cyber",
                                        "delayMs": 60000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a3_host_police",
                            "text": "Keep British personnel inside the fence and wait for local civilian police to search the hills (Avoids local friction, slower response)",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "force_protection": -1,
                                    "sustainability": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_oca_cyber",
                                        "delayMs": 60000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a3_strafe",
                            "text": "Order supersonic Typhoons to fire cannons at the houses in the hills outside the fence (High civilian danger and useless against tiny drones)",
                            "effects": {
                                "scores": {
                                    "coalition_support": -2,
                                    "force_protection": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_oca_cyber",
                                        "delayMs": 60000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "isr",
                    "text": "How should ISR & Electronic Warfare respond to the drone swarm?",
                    "options": [
                        {
                            "id": "opt_a3_jam_techint",
                            "text": "Jam the drones' radio links right away and collect crashed drones for TECHINT analysis of their guidance chips and parts",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "force_protection": 1
                                }
                            }
                        },
                        {
                            "id": "opt_a3_trace_first",
                            "text": "Wait briefly before jamming so we can trace the operators' exact radio network (Better intel, lets a few drones hit outer buildings)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ],
            "possibleLocations": [
                [
                    34.64,
                    32.92
                ],
                [
                    34.55,
                    33.04
                ],
                [
                    34.68,
                    32.88
                ]
            ]
        },
        {
            "id": "ev_t1_oca_cyber",
            "stage": "stage_2",
            "name": "Track A4: Offensive Counter-Air & Operation Orchard Cyber Strike",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "explosion",
            "location": [
                35.45,
                35.95
            ],
            "image": "ev_f35_success",
            "description": "TRACK A (OFFENSIVE COUNTER-AIR): Defending alone won't win Control of the Air. UK JFAC orders a proactive Offensive Counter-Air (OCA) raid to destroy Crimson State's coastal airbase and missile shield right at their source—just like Operation Black Buck (1982), Operation Granby (1991), and Operation Orchard (2007).",
            "facilitatorNotes": "TRACK A4 — CROSS-TRACK SYNERGY! If Track B2 (ev_t2_isr_cycle) has already revealed 'a_crimson_sam_battery', Control unlocks the Precision Stealth F-35B + Storm Shadow OCA option! Otherwise Control must use riskier reactive SAM hunting or limited stand-off cratering. Covers LO2 P5 (OCA, Op Black Buck / Op Granby / Op Corporate) and LO3 P10 (Offensive Air-Cyber Integration — Operation Orchard, 6 Sept 2007).",
            "roleDescriptions": {
                "control": "Offensive Counter-Air (OCA) destroys enemy air threats at their source (runways, hangars, and SAM sites). ASK THE ISR TEAM: if Track B's Rivet Joint and Reaper flights have revealed the SA-17 SAM Battery on the map, you unlock a Precision Stealth F-35B + Storm Shadow OCA strike!",
                "isr": "Offensive Air-Cyber Integration (famously used in Operation Orchard, 2007) hacks and blinds enemy air-defence radar screens so our strike jets can fly in safely without losses."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "How will Cyber support the Offensive Counter-Air strike?",
                    "options": [
                        {
                            "id": "opt_a4_orchard_cyber",
                            "text": "Launch an Operation Orchard-style Offensive Air-Cyber attack to blind enemy SAM radar screens as our jets fly in",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "air_control": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_a4_hold_cyber",
                            "text": "Keep our secret cyber access hidden for spying later and rely on jet stealth alone (Higher risk to our pilots)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                },
                {
                    "role": "control",
                    "text": "Choose the Offensive Counter-Air (OCA) strike plan against the enemy airbase and A2AD missile shield:",
                    "options": [
                        {
                            "id": "opt_a4_precision_stealth_oca",
                            "text": "[ISR TARGET LOCATED] Precision Stealth OCA: F-35B Lightnings destroy the pinpointed SA-17 SAM Battery while Typhoons crater the runway with Storm Shadow missiles",
                            "conditions": {
                                "visibleAssets": [
                                    "a_crimson_sam_battery"
                                ]
                            },
                            "effects": {
                                "scores": {
                                    "air_control": 2,
                                    "joint_effect": 1
                                },
                                "assetStateChanges": {
                                    "a_crimson_sam_battery": "destroyed"
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_bai_supremacy",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a4_wild_weasel",
                            "text": "Launch conventional Typhoon Storm Shadow & Brimstone OCA sweep without waiting for ISR pinpointing (Higher risk to jets)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -1
                                },
                                "revealAssets": [
                                    "a_crimson_sam_battery"
                                ],
                                "assetStateChanges": {
                                    "a_crimson_sam_battery": "damaged"
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_bai_supremacy",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_sam_relocates",
                                        "delayMs": 32000,
                                        "probability": 0.45
                                    },
                                    {
                                        "id": "ev_wc_fastjet_ambush",
                                        "delayMs": 35000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a4_standoff_only",
                            "text": "Long-Range Strike Only: Fire Storm Shadow cruise missiles at the runway from far away without entering the SAM zone (Safer, but enemy SAMs stay active)",
                            "effects": {
                                "scores": {
                                    "force_protection": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t1_bai_supremacy",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_sam_relocates",
                                        "delayMs": 30000,
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
            "id": "ev_t1_bai_supremacy",
            "stage": "stage_2",
            "name": "Track A5: Battlefield Air Interdiction & 3 Degrees of Air Control",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                35.5,
                36.15
            ],
            "image": "rus_iskander",
            "description": "TRACK A (WINNING THE SKIES): Our OCA strike wrecked the enemy airbase, but a convoy carrying replacement mobile SAM launchers is racing toward the coast. Knocking out ground threats to our planes helps us climb the 3 Degrees of Control of the Air: Favourable Air Situation -> Air Superiority -> Air Supremacy.",
            "facilitatorNotes": "TRACK A5 — Covers LO2 P5 (Tasks 20 & 21: 3 Degrees of Control of the Air & Anti-Surface Operations/BAI to gain Control of the Air). Notice Control's 'Declare Air Supremacy' option is score-gated (requires air_control >= 4)! Feeds into Counter-Land convergence (ev_c1_counter_land).",
            "roleDescriptions": {
                "strike": "Anti-Surface Operations—especially Battlefield Air Interdiction (BAI)—help secure Control of the Air by destroying enemy SAM trucks and supply convoys on the ground before they set up.",
                "control": "Check the 3 Degrees of Control of the Air: (1) Favourable Air Situation = some enemy interference still expected; (2) Air Superiority = enough dominance to run operations without major interference; (3) Air Supremacy = enemy air force is incapable of effective interference. You can only declare Air Supremacy if Air Control is 4 or higher!"
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How will you deal with the enemy's replacement mobile SAM convoy?",
                    "options": [
                        {
                            "id": "opt_a5_bai_strike",
                            "text": "Launch Battlefield Air Interdiction (BAI) with Typhoon Brimstone missiles and armed Reaper MQ-9B drones to destroy the convoy",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_counter_land",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a5_tail_convoy",
                            "text": "Follow the convoy with ISR to find their hidden supply depot first (Gives more intel, but lets some SAMs hide along the coast)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "air_control": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_counter_land",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "control",
                    "text": "Which Degree of Control of the Air should we declare to Mobility and Army commanders?",
                    "options": [
                        {
                            "id": "opt_a5_supremacy",
                            "text": "[AIR CONTROL 4+] Declare Air Supremacy: The enemy is incapable of effective interference—clear heavy transports and helicopters to fly freely",
                            "conditions": {
                                "minScores": {
                                    "air_control": 4
                                }
                            },
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "sustainability": 1
                                }
                            }
                        },
                        {
                            "id": "opt_a5_superiority",
                            "text": "Declare Air Superiority: Our forces can operate in the area, while keeping fighter escorts with valuable transport planes",
                            "effects": {
                                "scores": {
                                    "force_protection": 1
                                }
                            }
                        },
                        {
                            "id": "opt_a5_favourable",
                            "text": "Stay at Favourable Air Situation: Expect enemy interference and hold back slow transport planes and helicopters (Slows our ground advance)",
                            "effects": {
                                "scores": {
                                    "sustainability": -1,
                                    "joint_effect": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t2_intel_fusion",
            "stage": "stage_1",
            "name": "Track B1: Smuggled Missiles — Intelligence Methods & Non-State Actors",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "teletype",
            "location": [
                35.4,
                35.9
            ],
            "image": "ev_disinfo_campaign",
            "description": "TRACK B (ISR & CYBER): Alongside Crimson State's regular army, armed non-state militias are smuggling anti-aircraft missile parts through a busy civilian port. Social media videos show covered trucks leaving the docks, while suspicious money transfers move through fake company bank accounts.",
            "facilitatorNotes": "TRACK B1 — Covers LO1 P1 (Task 1: State vs Non-State Actors), LO1 P2 (Task 7: Insurgency, Terrorism, Civil War, Asymmetrical vs Symmetrical Warfare), LO2 P7 (Task 25: OSINT, FININT, HUMINT, GEOINT), and LO3 P9 (Full Spectrum Economic/Diplomatic approach).",
            "roleDescriptions": {
                "isr": "Combine multiple intelligence methods: OSINT (open-source social media and shipping records), FININT (tracking bank transfers), HUMINT (human sources at the docks), and GEOINT (satellite mapping and photos).",
                "joint": "A Full Spectrum Approach uses Diplomatic and Economic actions alongside Military force to stop non-state actors."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Which intelligence methods will you combine to track the smuggled missile parts?",
                    "options": [
                        {
                            "id": "opt_b1_multi_int",
                            "text": "Combine OSINT (social media videos), FININT (bank transfer records), and HUMINT (local port informants) to uncover the whole network",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t2_isr_cycle",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_sigint_convoy",
                                        "delayMs": 30000,
                                        "probability": 0.6
                                    },
                                    {
                                        "id": "ev_wc_osint_fake_video",
                                        "delayMs": 35000,
                                        "probability": 0.25
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b1_geoint_only",
                            "text": "Use overhead GEOINT satellite photos alone so we don't put local HUMINT informants at risk (Safer, but misses hidden containers and funding)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "coalition_support": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t2_isr_cycle",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_osint_fake_video",
                                        "delayMs": 30000,
                                        "probability": 0.55
                                    },
                                    {
                                        "id": "ev_wc_sigint_convoy",
                                        "delayMs": 35000,
                                        "probability": 0.3
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b1_wait_radar",
                            "text": "Wait until the missiles are built and switch on their radars before gathering intelligence (Gives up early warning)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -1,
                                    "force_protection": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t2_isr_cycle",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How should we use our financial intelligence (FININT) to cut off militia funding?",
                    "options": [
                        {
                            "id": "opt_b1_full_spectrum_econ",
                            "text": "Share FININT with UK financial teams and international allies to freeze militia bank accounts (Economic & Diplomatic Full Spectrum Approach)",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_b1_uk_eyes_only",
                            "text": "Keep FININT strictly UK-only to protect our secret tracking methods (Keeps intel secure, reduces allied action)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "coalition_support": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t2_isr_cycle",
            "stage": "stage_2",
            "name": "Track B2: The 9-Step ISR Process, No 1 ISR Wing & NEC",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "teletype",
            "location": [
                35.3,
                35.8
            ],
            "image": "drone_squad",
            "description": "TRACK B (LOCATING THE THREAT): Crimson State's coastal SA-17 SAM battery is switching its targeting radar on and off to stay hidden! Control of the Air (Track A) cannot launch a Precision Stealth OCA strike until No 1 ISR Wing pinpoints its exact position using the 9-Step ISR Process and Network Enabled Capability (NEC). (Also uncovers a hidden Enemy Command Villa—unlocking the 'Special Forces Air Insertion' Action once Air Control reaches 3+!)",
            "facilitatorNotes": "TRACK B2 — CROSS-TRACK ENABLER! Reveals 'a_crimson_sam_battery' (unlocking Precision Stealth OCA in Track A4!) AND 'a_sf_intel_compound' (gating Manual Action 'act_sf_air_ops'!). Covers LO2 P4 & P7 (Tasks 16, 24, 25, 26, 27, 29: Surveillance vs Reconnaissance, 9-Step ISR Cycle, 4 Factors for ISR Success, SIGINT/MASINT/GEOINT, No 1 ISR Wing — Rivet Joint, Reaper MQ-9B, Shadow R1, Op Ellamy context, NEC / Link-16).",
            "roleDescriptions": {
                "isr": "Surveillance = constantly watching a wide area; Reconnaissance = checking a specific place for specific details. Follow the 9-Step ISR Process (Request for Information -> Plan -> Task/Re-task -> Collect -> Analyse -> Disseminate -> Evaluate -> Apply -> Requirement Satisfied). Pinpointing the SAM unlocks Precision Stealth OCA for Control!",
                "jfac": "Network Enabled Capability (NEC) connects sensors, commanders, and weapons via Link-16 to get 'the right information to the right place at the right time.'"
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Task No 1 ISR Wing (RAF Waddington) through the 9-Step ISR Process to pinpoint the coastal A2AD missile battery:",
                    "options": [
                        {
                            "id": "opt_b2_full_isr_cycle",
                            "text": "Use RC-135W Rivet Joint for wide-area Surveillance (SIGINT/MASINT), guiding Reaper MQ-9B & Shadow R1 for close Reconnaissance (GEOINT)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2,
                                    "air_control": 1
                                },
                                "revealAssets": [
                                    "a_crimson_sam_battery",
                                    "a_sf_intel_compound"
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_t2_defensive_cyber",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_rpas_satlink_hijack",
                                        "delayMs": 32000,
                                        "probability": 0.5
                                    },
                                    {
                                        "id": "ev_wc_sigint_convoy",
                                        "delayMs": 35000,
                                        "probability": 0.3
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b2_rpas_solo",
                            "text": "Skip electronic Rivet Joint searching and send a Reaper MQ-9B to look by camera alone (Slower, misses the hidden command villa, risks the drone)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "force_protection": -1
                                },
                                "revealAssets": [
                                    "a_crimson_sam_battery"
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_t2_defensive_cyber",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_rpas_satlink_hijack",
                                        "delayMs": 28000,
                                        "probability": 0.65
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "jfac",
                    "text": "How will you disseminate (pass on) target locations to strike pilots and Royal Navy ships?",
                    "options": [
                        {
                            "id": "opt_b2_nec_link16",
                            "text": "Send live radar tracks straight into fighter cockpits and HMS Duncan via Link-16 Network Enabled Capability (NEC)",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "situational_awareness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_b2_manual_vetting",
                            "text": "Send reports back to UK HQ for slow manual checking before briefing pilots (Reduces mistakes, but mobile SAMs can drive away)",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "joint_effect": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t2_defensive_cyber",
            "stage": "stage_2",
            "name": "Track B3: Defensive Air-Cyber — Cyber Attack on Link-16 & Air Tasking!",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "teletype",
            "location": [
                34.58,
                32.98
            ],
            "image": "generic_cyber",
            "description": "TRACK B (DEFENSIVE AIR-CYBER): Enemy hackers break into a weather computer linked to RAF Akrotiri's Air Tasking Order (ATO) system and try to feed fake radar contacts onto our Link-16 network! Protecting the 'Connect' enabler is vital. (Unlocks the 'Rebuild & Sync Tri-Service Link-16 NEC' Action!)",
            "facilitatorNotes": "TRACK B3 — Covers LO3 P10 (Task 35: Defensive Air-Cyber Operations — protecting the systems Air Power relies upon against exponential adversary cyber threats) and LO1 P1 (Connect Enabler — RAF Signals / 90 SU). Notice Option B is a high-risk/high-reward cyber trap (honeypot) with a 40% probability of triggering 'ev_t2_cyber_blackout_branch'! Also UNLOCKS Manual Action 'act_nec_sync'!",
            "roleDescriptions": {
                "isr": "Air-Cyber Integration has TWO sides: Offensive Air-Cyber (disabling enemy SAMs like Op Orchard) and Defensive Air-Cyber (protecting our own Link-16, planning computers, and base networks). Check your Actions menu—'Rebuild & Sync Tri-Service Link-16 NEC' has unlocked!",
                "joint": "RAF Signals units (90 SU) deliver the 'Connect' enabler—without secure communications, Network Enabled Capability breaks down."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Enemy malware is probing RAF Akrotiri's flight-planning and Link-16 computers. Run Defensive Air-Cyber:",
                    "options": [
                        {
                            "id": "opt_b3_isolate_harden",
                            "text": "Disconnect infected servers immediately with 90 Signals Unit & National Cyber Force and switch to fresh Link-16 security codes (Brief delay, keeps network safe)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "force_protection": 1,
                                    "sustainability": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t2_height_perspective",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b3_honeypot",
                            "text": "Leave a cyber trap (honeypot) open to trace the hackers back to their HQ (Big intel reward, 40% risk of fake contacts hitting our screens!)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2,
                                    "force_protection": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t2_cyber_blackout_branch",
                                        "delayMs": 22000,
                                        "probability": 0.4
                                    },
                                    {
                                        "id": "ev_t2_height_perspective",
                                        "delayMs": 60000,
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
            "id": "ev_t2_cyber_blackout_branch",
            "stage": "stage_2",
            "name": "Track B3-Branch: Link-16 Hacked — Fake Aircraft on Cockpit Screens!",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "klaxon",
            "location": [
                35,
                34.2
            ],
            "image": "ev_cyber_fail",
            "description": "CONSEQUENCE BRANCH: Enemy hackers spotted our cyber trap and flooded our Link-16 tactical data network with fake enemy jets! Typhoon pilots in the air cannot tell real threats from digital ghosts.",
            "facilitatorNotes": "PROBABILISTIC CONSEQUENCE BRANCH (40% chance if ISR ran a cyber honeypot). Reinforces LO3 P10 (why Defensive Air-Cyber is vital to modern Air Power) and LO2 P7 (NEC vulnerability).",
            "roleDescriptions": {
                "control": "Our digital Link-16 map cannot be trusted right now. Switch to voice radio guidance from AWACS, or pause attack flights for 20 minutes while 90 Signals Unit cleans the network."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "How will you control our airborne jets while cyber teams clean the corrupted Link-16 feed?",
                    "options": [
                        {
                            "id": "opt_b3b_voice_backup",
                            "text": "Switch straight to encrypted voice radio instructions from E-3D Sentry AWACS and HMS Duncan (Slower, keeps patrols flying)",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "air_control": -1
                                }
                            }
                        },
                        {
                            "id": "opt_b3b_ground_pause",
                            "text": "Pause attack flights for 20 minutes to perform a clean full-network cyber reset (Zero friendly-fire risk, slows our advance)",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "sustainability": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t2_height_perspective",
            "stage": "stage_3",
            "name": "Track B4: Mountain Blind Spots — Height, Perspective, Ubiquity & AEW",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                35.25,
                35.2
            ],
            "image": "nato_awacs",
            "description": "TRACK B (USING HEIGHT & PERSPECTIVE): Enemy mobile launchers and low-flying helicopters are hiding inside deep mountain valleys, blocking Royal Navy ship radars at sea level. We need continuous high-altitude eyes in the sky to see over the ridges and beat ISR Impermanence.",
            "facilitatorNotes": "TRACK B4 — Covers LO1 P1 & P3 (Tasks 3 & 10: Strengths of Height, Perspective — wider horizon/field-of-view from altitude, Ubiquity; Impermanence in ISR) and LO2 P4 & P7 (Task 16: Zephyr HAPS, E-3D Sentry AEW1 / AWACS, Shadow R1). Triggers the time-critical 'ev_c1_dynamic_retask' flash!",
            "roleDescriptions": {
                "isr": "Height gives Air Power 'Perspective'—a wider field of view looking down into valleys where ground and ship radars are blocked. The solar-powered Zephyr flies at 70,000ft for weeks at a time, helping solve Impermanence in ISR.",
                "control": "The E-3D Sentry AEW1 (Airborne Early Warning & Control / AWACS) carries high-altitude radar and acts as a flying command post to spot aircraft hiding behind mountains."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "How will you watch the mountain valleys non-stop without wearing out crews and fuel?",
                    "options": [
                        {
                            "id": "opt_b4_zephyr",
                            "text": "Deploy the solar-powered Zephyr at 70,000ft (weeks of endurance + Height & Perspective) backed up by Shadow R1 reconnaissance flights",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_dynamic_retask",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b4_manned_rotation",
                            "text": "Fly back-to-back Shadow R1 & Reaper shifts from Akrotiri (Great cameras, burns heavy fuel and maintenance due to Impermanence)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "sustainability": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_dynamic_retask",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "control",
                    "text": "How will you spot low-flying enemy aircraft sneaking behind the coastal cliffs?",
                    "options": [
                        {
                            "id": "opt_b4_aew_sentry",
                            "text": "Fly an E-3D Sentry AEW1 (AWACS) high overhead to use Height and Perspective to look down into the valleys",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "situational_awareness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_b4_ship_radar",
                            "text": "Rely only on HMS Duncan's ship radar at sea level to save flying hours (Blocked by the coastal mountains)",
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
            "id": "ev_t3_hub_and_spoke",
            "stage": "stage_1",
            "name": "Track C1: Hub & Spoke Airbridge — The 4 Enablers of Air Power",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                51.75,
                -1.58
            ],
            "image": "ev_us_support_success",
            "description": "TRACK C (AIR MOBILITY & MARITIME): Keeping jets flying 2,000 miles from Britain requires a steady Inter-Theatre 'Air Bridge' from RAF Brize Norton (UK Hub) to RAF Akrotiri (Forward Spoke). Thousands of tonnes of weapons, spare parts, radios, and base guards must arrive fast.",
            "facilitatorNotes": "TRACK C1 — Covers LO1 P1 (Task 2: 4 Enablers — Base, Sustain, Connect, Protect) and LO2 P4 & P6 (Tasks 17, 22, 23: Hub & Spoke Operations, Inter-Theatre vs Intra-Theatre mobility; RAF Fleet — C-17 Globemaster 4,500nm, A400M Atlas 4,100nm, C-130J Hercules 2,650nm, Voyager 8,000nm).",
            "roleDescriptions": {
                "mobility": "Hub = main base in the UK (RAF Brize Norton); Spoke = forward base closer to the action (RAF Akrotiri). Inter-Theatre flights move heavy loads between countries (C-17 Globemaster, A400M Atlas); Intra-Theatre moves troops and gear inside the battle zone (C-130J, Chinook, Puma).",
                "joint": "Air Power depends on 4 Enablers: Base (airfield/carrier), Sustain (Air Logistics), Connect (RAF Signals), and Protect (RAF Regiment)."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "Organise the RAF Brize Norton transport fleet for the 2,000-mile Inter-Theatre Hub & Spoke airbridge:",
                    "options": [
                        {
                            "id": "opt_c1_strategic_bridge",
                            "text": "Fly heavy C-17 Globemasters (outsized cargo) & A400M Atlas (troops, vehicles, Chinooks) for Inter-Theatre lift, keeping Voyagers ready for Air-to-Air Refuelling",
                            "effects": {
                                "scores": {
                                    "sustainability": 2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_counter_sea",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c1_divert_voyagers",
                            "text": "Switch Voyager tankers into pure passenger/cargo flights to get troops there twice as fast (Leaves fighters short of aerial refuelling)",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "air_control": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_counter_sea",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "Decide what loads go onto the very first transport flights landing at RAF Akrotiri:",
                    "options": [
                        {
                            "id": "opt_c1_four_enablers",
                            "text": "Send RAF Regiment base guards (Protect), 90 Signals Unit comms teams (Connect), and Air Logistics crews (Sustain) ahead of extra bombs",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "situational_awareness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_c1_munitions_first",
                            "text": "Pack Storm Shadow cruise missiles first and delay base guards and signals teams until later flights (More weapons early, leaves base unguarded)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t3_counter_sea",
            "stage": "stage_3",
            "name": "Track C2: Counter-Sea & Air-Maritime Integration — Sub & Gunboat Ambush",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "sonar",
            "location": [
                34.3,
                33.9
            ],
            "image": "ev_sub_detection",
            "description": "TRACK C (MARITIME BATTLE): Trying to cut off our sea supply routes and attack HMS Duncan, Crimson State sends a submerged Kilo-class submarine and three fast missile gunboats! Underwater sonar pings appear on the map.",
            "facilitatorNotes": "TRACK C2 — Reveals hidden asset 'a_hostile_sub'! Covers LO2 P4 & P8 (Tasks 16, 28, 30: Counter-Sea Operations — Anti-Submarine Warfare [ASW] & Anti-Surface Warfare [ASuW]; P-8A Poseidon MRA1 from RAF Lossiemouth & Royal Navy Wildcat) and LO3 P10 (Task 35: Air-Maritime Integration — AMI against A2AD, Type 45 Destroyers).",
            "autoEffects": {
                "revealAssets": [
                    "a_hostile_sub"
                ]
            },
            "roleDescriptions": {
                "strike": "Counter-Sea Operations have two parts: Anti-Submarine Warfare (ASW: P-8A Poseidon dropping listening sonobuoys and torpedoes) and Anti-Surface Warfare (ASuW: Royal Navy Wildcat helicopters and jets firing anti-ship missiles).",
                "joint": "Air-Maritime Integration (AMI) links RAF maritime patrol aircraft with Royal Navy Type 45 Destroyers and Fleet Air Arm helicopters to beat sea-based A2AD threats."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "Pick the Counter-Sea air team to stop both the submerged submarine (ASW) and the missile gunboats (ASuW):",
                    "options": [
                        {
                            "id": "opt_c2_poseidon_wildcat",
                            "text": "Pair RAF P-8A Poseidon MRA1 (sonobuoys & Sting Ray torpedoes for ASW) with Royal Navy Wildcat helicopters (anti-ship missiles for ASuW)",
                            "effects": {
                                "scores": {
                                    "joint_effect": 2,
                                    "force_protection": 1
                                },
                                "assetStateChanges": {
                                    "a_hostile_sub": "destroyed"
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_tanker_crisis",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_sub_dives",
                                        "delayMs": 32000,
                                        "probability": 0.35
                                    },
                                    {
                                        "id": "ev_wc_voyager_ew_jam",
                                        "delayMs": 35000,
                                        "probability": 0.45
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c2_typhoon_ship_only",
                            "text": "Pull Typhoons off patrol to hit the gunboats while leaving HMS Duncan to hunt the submarine without air ASW support (Sub escapes)",
                            "effects": {
                                "scores": {
                                    "air_control": -1,
                                    "joint_effect": 1,
                                    "force_protection": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_tanker_crisis",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_sub_dives",
                                        "delayMs": 30000,
                                        "probability": 0.7
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How should the RAF P-8A Poseidon and HMS Duncan work together under Air-Maritime Integration (AMI)?",
                    "options": [
                        {
                            "id": "opt_c2_ami_fusion",
                            "text": "Link the Poseidon's sonar and radar picture straight into HMS Duncan's operations room via Link-16",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_c2_separate_boxes",
                            "text": "Give the RAF plane and the Royal Navy warship separate search zones without live data sharing (Leaves radar gaps)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ],
            "possibleLocations": [
                [
                    34.3,
                    33.9
                ],
                [
                    34.7,
                    34.4
                ],
                [
                    33.95,
                    33.4
                ]
            ]
        },
        {
            "id": "ev_t3_tanker_crisis",
            "stage": "stage_4",
            "name": "Track C3: Impermanence Crisis — Voyager Failure & Op Black Buck Lesson",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                34.85,
                34.4
            ],
            "image": "voyager_refueler",
            "description": "TRACK C (AIR-TO-AIR REFUELLING): Emergency at RAF Akrotiri! A Voyager tanker suffers a hydraulic fault on takeoff, cutting our in-flight fuel supply in half. Airborne Typhoons on Combat Air Patrol and F-35Bs returning from strikes are both running dangerously low on fuel.",
            "facilitatorNotes": "TRACK C3 — Covers LO1 P1 (Task 4: Limitation of Impermanence) and LO2 P6 (Tasks 11 & 22: Air-to-Air Refuelling — Voyager, and the Operation Black Buck 1982 Victor K2 tanker chain lesson).",
            "roleDescriptions": {
                "mobility": "Impermanence means aircraft cannot stay in the sky forever. Air-to-Air Refuelling (AAR)—famously proven by 11 Victor K2 tankers refuelling a Vulcan during Operation Black Buck (1982)—extends Reach and flying time.",
                "jfac": "When tanker fuel is tight, Operational command must give fuel priority to critical fighter patrols and order pilots to fly fuel-saving profiles."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "How will you solve the Voyager tanker shortage before airborne fighters run dry?",
                    "options": [
                        {
                            "id": "opt_c3_standby_voyager",
                            "text": "Scramble our backup Voyager tanker from Akrotiri/Brize Norton and give fuel priority to active Combat Air Patrol and Strike jets",
                            "effects": {
                                "scores": {
                                    "sustainability": 2,
                                    "air_control": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_airborne_ops",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_overflight_refusal",
                                        "delayMs": 30000,
                                        "probability": 0.5
                                    },
                                    {
                                        "id": "ev_wc_voyager_ew_jam",
                                        "delayMs": 32000,
                                        "probability": 0.35
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c3_recall_wave",
                            "text": "Call all strike jets home early on reserve fuel and pause attacks until the tanker is fixed (Safe, hands the advantage back to the enemy)",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "joint_effect": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_airborne_ops",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ],
                                "randomEvents": [
                                    {
                                        "id": "ev_wc_overflight_refusal",
                                        "delayMs": 30000,
                                        "probability": 0.55
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "jfac",
                    "text": "What flying orders do you give our airborne Typhoons while the backup tanker climbs to height?",
                    "options": [
                        {
                            "id": "opt_c3_econ_cruise",
                            "text": "Slow to fuel-saving cruise speed at high altitude and take turns patrolling",
                            "effects": {
                                "scores": {
                                    "sustainability": 1
                                }
                            }
                        },
                        {
                            "id": "opt_c3_afterburner_show",
                            "text": "Keep fighters flying low on full afterburner to intimidate the enemy (Burns fuel rapidly, drains reserves)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "sustainability": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_t3_airborne_ops",
            "stage": "stage_4",
            "name": "Track C4: Airborne Ops (Air-Drop vs Air-Land) & Joint Helicopter Command",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                35.6,
                36.4
            ],
            "image": "ev_airborne_paratroop_drop",
            "description": "TRACK C (AIRBORNE & HELICOPTER LIFT): To trap Crimson State's coastal forces, we must capture a cratered desert airstrip ('Objective Talon') and carry artillery guns and ammo up into a rocky mountain pass. Meanwhile, advance scouts find 4,000 cut-off civilians in a coastal town—showing them on the map and unlocking the 'Humanitarian Aid Air-Drop' Action!",
            "facilitatorNotes": "TRACK C4 — Reveals hidden asset 'a_displaced_civilians' and UNLOCKS Manual Action 'act_humanitarian_aid'! Covers LO1 P1 (Task 3: Agility of Chinook), LO2 P4 & P6 (Tasks 18, 22, 23: Airborne Operations — Air-Drop by parachute vs Air-Land on runway; Intra-Theatre Mobility; Joint Helicopter Command — Chinook HC6 & Puma HC2).",
            "autoEffects": {
                "revealAssets": [
                    "a_displaced_civilians"
                ]
            },
            "roleDescriptions": {
                "mobility": "Remember the 2 Airborne Operations methods: Air-Drop uses parachutes from planes in flight when a runway is damaged; Air-Land lands on the runway once it's cleared. Then use Intra-Theatre Joint Helicopter Command (Chinook heavy lift + Puma HC2) for the mountains! Also check your Actions menu—'Humanitarian Aid Air-Drop' has unlocked!",
                "joint": "Civilians trapped in the revealed coastal town urgently need Humanitarian Operations aid—work with Mobility to launch the A400M relief Air-Drop!"
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "Plan how to capture cratered Objective Talon and supply troops up in the mountains:",
                    "options": [
                        {
                            "id": "opt_c4_drop_land_jhc",
                            "text": "Step 1: Air-Drop paratroopers & engineers from A400M/C-130J to fix the runway -> Step 2: Air-Land heavy gear -> JHC Chinook (underslung guns) & Puma HC2 into the mountains",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "joint_effect": 2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_csar_medevac",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c4_heli_only",
                            "text": "Leave the desert airstrip unfixed and haul every single supply pallet by Chinook & Puma helicopters (Avoids parachute drop, overloads helicopters)",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "sustainability": -2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_csar_medevac",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c4_premature_airland",
                            "text": "Try an immediate Air-Land with a heavy C-17 Globemaster straight onto the cratered, blocked strip (Extreme crash risk)",
                            "effects": {
                                "scores": {
                                    "sustainability": -2,
                                    "force_protection": -2
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_t3_csar_medevac",
                                        "delayMs": 55000,
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
            "id": "ev_t3_csar_medevac",
            "stage": "stage_4",
            "name": "Track C5: Downed Pilot & Wounded Troops — Combat Recovery & 3-Tier Medevac",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "klaxon",
            "location": [
                35.45,
                36.28
            ],
            "image": "ev_combat_recovery_medevac",
            "description": "TRACK C (URGENT RESCUE): A British pilot has ejected into enemy-held hills, and mortar fire has wounded six soldiers on the ridge! Mobility must run time-critical Personnel Recovery AND organise all 3 tiers of Aeromedical Evacuation.",
            "facilitatorNotes": "TRACK C5 — TIMED DECISION (150s)! Covers LO2 P6 (Tasks 22 & 23: Personnel Recovery — Peacetime Recovery vs Combat Recovery under hostile threat, Case Study: Exercise Volfa; Aeromedical Evacuation — Forward MERT helicopters, Tactical A400M/C-130J, Strategic C-17 to UK; Puma HC2 6-stretcher capacity & Griffin HAR2 peacetime SAR contrast). Option B triggers branching ambush 'ev_csar_ambush_branch'! Completes Track C toward Stage 5 convergence ('ev_s5_space_jamming').",
            "roleDescriptions": {
                "mobility": "TIMED (2.5 mins)! Know the difference: Peacetime Recovery has no enemy threat (like an unarmed Griffin HAR2 SAR helicopter); Combat Recovery expects enemy fire (practised on Exercise Volfa—needs armed Chinook + fighter escort). And link all 3 Medevac tiers: Forward (Chinook/Puma MERT) -> Tactical (A400M in theatre) -> Strategic (C-17 home to the UK)!"
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "TIME CRITICAL: Rescue the downed pilot and organise 3-Tier Aeromedical Evacuation for the wounded!",
                    "timeLimitMs": 150000,
                    "defaultOptionId": "opt_c5_timeout",
                    "options": [
                        {
                            "id": "opt_c5_combat_recovery_3tier",
                            "text": "Launch armed Combat Recovery (Chinook + RAF Regt/SF + Typhoon fighter escort, like Exercise Volfa) AND 3-Tier Medevac (Forward Puma/Chinook MERT -> Tactical A400M -> Strategic C-17 to UK)",
                            "effects": {
                                "scores": {
                                    "force_protection": 2,
                                    "joint_effect": 1,
                                    "coalition_support": 1
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ],
                                "assetStateChanges": {
                                    "a_chinook": "tasked_csar"
                                }
                            }
                        },
                        {
                            "id": "opt_c5_peacetime_sar",
                            "text": "Send an unarmed peacetime SAR helicopter straight in without fighter escort to save 10 minutes (High ambush danger!)",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "air_control": -1
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ],
                                "triggerEvents": [
                                    {
                                        "id": "ev_csar_ambush_branch",
                                        "delayMs": 22000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c5_timeout",
                            "text": "Time Expired (Standing Orders): Rescue waits until dawn—the pilot hides overnight and wounded troops wait at the ridge aid post",
                            "effects": {
                                "scores": {
                                    "force_protection": -1,
                                    "coalition_support": -1
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ]
                            }
                        }
                    ]
                }
            ],
            "possibleLocations": [
                [
                    35.38,
                    35.95
                ],
                [
                    35.15,
                    36.12
                ],
                [
                    35.62,
                    35.78
                ]
            ]
        },
        {
            "id": "ev_csar_ambush_branch",
            "stage": "stage_4",
            "name": "Track C5-Branch: Unarmed Rescue Helicopter Ambushed by MANPADS!",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "explosion",
            "location": [
                35.47,
                36.31
            ],
            "image": "ev_f35_fail",
            "description": "CONSEQUENCE BRANCH: Enemy fighters with shoulder-fired MANPADS missiles ambush the unescorted rescue helicopter as it hovers! This shows why Combat Recovery—where enemy fire is expected—can never use Peacetime Recovery rules.",
            "facilitatorNotes": "BRANCHING CONSEQUENCE EVENT (triggered only if Mobility sent an unarmed peacetime SAR helicopter into combat territory). Debrief LO2 P6 (Peacetime vs Combat Recovery).",
            "roleDescriptions": {
                "control": "The rescue helicopter is trapped under fire! Divert Typhoons immediately for emergency Close Air Support to cover the rescue, or order the crew to pull out."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "The rescue helicopter is under fire in the valley! Give emergency orders:",
                    "options": [
                        {
                            "id": "opt_csar_emergency_cas",
                            "text": "Pull Typhoons off Combat Air Patrol for emergency low-level Close Air Support to cover the helicopter lifting the pilot out",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "air_control": -1
                                }
                            }
                        },
                        {
                            "id": "opt_csar_abort",
                            "text": "Order the helicopter to abort to save its crew, leaving the downed pilot behind enemy lines",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "coalition_support": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_c1_dynamic_retask",
            "stage": "stage_3",
            "name": "Joint Flash: Time-Critical Target — Speed, Reach, Agility & Re-Tasking",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                35.35,
                36.3
            ],
            "image": "typhoon_aircraft",
            "description": "FLASH PRIORITY (FROM TRACK B): Zephyr and Reaper sensors spot Crimson State's coastal commander boarding an armoured helicopter 100 miles inland—he takes off in 8 minutes! Two multi-role Typhoon FGR4s are already flying nearby on air patrol.",
            "facilitatorNotes": "CONVERGENCE FLASH — TIMED DECISION (120s)! Covers LO1 P1 & P3 (Tasks 3 & 10: Strengths of Speed, Reach, Agility, Flexibility & Versatility; Re-tasking multi-role aircraft in flight). Triggers 'ev_c1_urban_info_ops'!",
            "roleDescriptions": {
                "jfac": "TIMED (2 mins)! No ship or army unit can cover 100 miles in 8 minutes. Re-tasking airborne jets mid-flight proves Air Power's Speed, Reach, Agility, Flexibility, and Versatility.",
                "control": "Our airborne Typhoons carry both air-to-air missiles and precision Brimstone weapons, so they can switch from patrol to ground strike via Link-16 in seconds."
            },
            "decisions": [
                {
                    "role": "jfac",
                    "text": "TIME CRITICAL (8-MINUTE WINDOW): How will you react to the fleeing enemy commander 100 miles away?",
                    "timeLimitMs": 120000,
                    "defaultOptionId": "opt_retask_timeout",
                    "options": [
                        {
                            "id": "opt_retask_typhoons",
                            "text": "Re-task the airborne multi-role Typhoons mid-flight via Link-16 to dash supersonic (Mach 1.6) and stop the helicopter before takeoff",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": 1,
                                    "situational_awareness": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_urban_info_ops",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_retask_rpas_slow",
                            "text": "Keep Typhoons on their planned air patrol and send a slower Reaper drone instead (Keeps patrol intact, but the commander escapes)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_urban_info_ops",
                                        "delayMs": 55000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_retask_timeout",
                            "text": "Time Expired (Standing Orders): Extra approvals take too long and the helicopter escapes inland",
                            "effects": {
                                "scores": {
                                    "situational_awareness": -1,
                                    "joint_effect": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_urban_info_ops",
                                        "delayMs": 55000,
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
            "id": "ev_c1_counter_land",
            "stage": "stage_3",
            "name": "Joint Assault: Counter-Land Force Multipliers (CAS, AI, SCAR) & ALI",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "explosion",
            "location": [
                35.15,
                36.1
            ],
            "image": "evt_armor_push",
            "description": "JOINT LAND BATTLE (FROM TRACK A): British and allied troops have landed on the coast! Enemy tanks are attacking friendly infantry just 400 metres away, while 40 miles behind the front line, enemy artillery is loading onto supply trains.",
            "facilitatorNotes": "CONVERGENCE EVENT — Covers LO2 P8 (Task 30: Counter-Land Operations as Force Multipliers — Close Air Support [CAS], Air Interdiction [AI], and Strike, Coordination & Reconnaissance [SCAR]) and LO3 P10 (Task 35: Air-Land Integration — ALI, JTACs, Iraq/Afghanistan & Air Battlespace Training Centre). Triggers 'ev_c1_weather_payload'!",
            "roleDescriptions": {
                "strike": "Counter-Land operations act as force multipliers for the Army: Close Air Support (CAS) hits enemy forces right next to friendly troops (400m) under JTAC guidance; Air Interdiction (AI) hits reinforcements far behind enemy lines (40 miles); SCAR combines finding, coordinating, and attacking targets.",
                "joint": "Air-Land Integration (ALI) coordinates and separates air and ground forces through ground Joint Terminal Attack Controllers (JTACs) so we never hit our own troops."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "Assign our Counter-Land attack aircraft across the front line and the deep supply railhead:",
                    "options": [
                        {
                            "id": "opt_land_cas_ai_scar",
                            "text": "Split Force Multipliers: Deliver Close Air Support (CAS) for troops fighting at 400m while sending Air Interdiction (AI) & SCAR against the deep artillery trains",
                            "effects": {
                                "scores": {
                                    "joint_effect": 2,
                                    "air_control": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_weather_payload",
                                        "delayMs": 50000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_land_cas_only",
                            "text": "Send 100% of jets to immediate CAS on the beach and ignore the artillery trains for now (Helps troops right now, heavier shelling later)",
                            "effects": {
                                "scores": {
                                    "force_protection": 1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_c1_weather_payload",
                                        "delayMs": 50000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "joint",
                    "text": "How will Air-Land Integration (ALI) keep friendly soldiers safe just 400m from enemy tanks?",
                    "options": [
                        {
                            "id": "opt_land_jtac",
                            "text": "Guide every Close Air Support strike through trained ground JTACs who confirm exact friendly and enemy positions",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "coalition_support": 1
                                }
                            }
                        },
                        {
                            "id": "opt_land_weapons_free",
                            "text": "Let pilots fire freely in the zone ahead of the beach without ground JTAC clearance (Faster, extreme friendly-fire danger)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1,
                                    "coalition_support": -2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_c1_weather_payload",
            "stage": "stage_3",
            "name": "Limitations Under Fire: Sandstorm & Limited Payload",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                35.22,
                36.2
            ],
            "image": "ev_sandstorm_payload",
            "description": "LIMITATIONS OF AIR ATTACK: A blinding desert sandstorm and thick low cloud roll over the front line, blocking cameras and laser-guided bombs. Overhead, two Typhoons are down to their last two missiles each—testing Limited Payload and poor Weather.",
            "facilitatorNotes": "TRACK A/CONVERGENCE FINISHER — Covers LO1 P1 (Task 4: Limitation of Limited Payload) and LO2 P8 (Task 28: Three factors determining the success of an air attack — Penetration, Number of weapons/Payload, and Poor Weather). Completes Track A toward Stage 5 convergence ('ev_s5_space_jamming')!",
            "roleDescriptions": {
                "strike": "Three factors decide whether an Air Attack succeeds: Penetration (getting past enemy defences), Payload (how many weapons a jet carries), and Weather. All-weather radar/GPS weapons (Brimstone, Paveway IV) can cut through dust storms that blind laser bombs.",
                "mobility": "Because aircraft carry far fewer weapons than ships or artillery, fast 'hot-pit' refuelling and re-arming teams at RAF Akrotiri get jets back into the fight quickly."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How should the Typhoons use their final two missiles in zero-visibility dust?",
                    "options": [
                        {
                            "id": "opt_weather_allweather",
                            "text": "Switch to all-weather radar/GPS-guided Brimstone missiles to take out the lead enemy command tank through the dust",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "situational_awareness": 1
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ]
                            }
                        },
                        {
                            "id": "opt_weather_hold",
                            "text": "Hold fire until the storm clears so zero precision missiles are wasted (Saves weapons, leaves ground troops pinned down)",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "joint_effect": -1
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ]
                            }
                        },
                        {
                            "id": "opt_weather_laser_blind",
                            "text": "Drop laser-guided bombs blindly into the dust cloud (Dust scatters lasers and risks hitting civilians)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1,
                                    "coalition_support": -1
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "mobility",
                    "text": "How will RAF Akrotiri overcome the Limited Payload of our combat jets?",
                    "options": [
                        {
                            "id": "opt_weather_hotpit",
                            "text": "Set up rapid 'hot-pit' refuelling and re-arming crews so jets can safely land, reload, and fly again within minutes",
                            "effects": {
                                "scores": {
                                    "sustainability": 1
                                },
                                "assetStateChanges": {
                                    "a_typhoon": "operational"
                                }
                            }
                        },
                        {
                            "id": "opt_weather_skip_checks",
                            "text": "Skip routine safety checks to push jets back into the sky faster (More short-term flights, risks dangerous mechanical faults)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -1,
                                    "sustainability": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_c1_urban_info_ops",
            "stage": "stage_3",
            "name": "Information Activities: Non-Kinetic Attack (EW & PsyOps — Op Shader)",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                35.48,
                35.85
            ],
            "image": "ev_urban_hospital_roe",
            "description": "4TH CATEGORY OF AIR ATTACK (FROM TRACK B): Militia leaders have placed their radio HQ and broadcast transmitter inside a crowded civilian hospital, hoping we will either bomb innocent people or let them keep broadcasting! (Unlocks the 'Op Shader Leaflet Drop & Radio Broadcast' Action!)",
            "facilitatorNotes": "TRACK B/CONVERGENCE FINISHER — UNLOCKS Manual Action 'act_info_psyops'! Covers LO2 P8 (Tasks 28 & 30: The 4th Category of Air Attack — Information Activities: Electronic Warfare [EW] & Psychological Operations [PsyOps]; Kinetic vs Non-Kinetic effects; Operation SHADER leaflet/broadcast case study; 3 Objectives of Air Attack: Deter, Disrupt, Destroy). Completes Track B toward Stage 5 convergence ('ev_s5_space_jamming')!",
            "roleDescriptions": {
                "strike": "Air Attack isn't only about dropping bombs! Information Activities (Electronic Warfare jamming & Psychological Operations) are the 4th official category of Air Attack—creating non-kinetic Disruption without harming civilians. Also check your Actions menu—'Op Shader Leaflet Drop & Radio Broadcast' is now unlocked!",
                "isr": "Psychological Operations also include keeping drones visibly orbiting overhead and flying loud, high-speed fast-jet 'Shows of Force' to break enemy morale."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "How will you silence the militia radio HQ inside the civilian hospital?",
                    "options": [
                        {
                            "id": "opt_info_nonkinetic",
                            "text": "Non-Kinetic Information Activities: Jam all militia radio channels with Electronic Warfare (EW) and broadcast PsyOps surrender messages",
                            "effects": {
                                "scores": {
                                    "coalition_support": 2,
                                    "joint_effect": 1
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ]
                            }
                        },
                        {
                            "id": "opt_info_roof_kinetic",
                            "text": "Drop a small precision kinetic bomb onto the hospital roof mast only (Knocks out mast fast, causes blast panic and allied criticism)",
                            "effects": {
                                "scores": {
                                    "joint_effect": 1,
                                    "coalition_support": -2
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ]
                            }
                        },
                        {
                            "id": "opt_info_heavy_bomb",
                            "text": "Drop heavy 2,000lb bombs directly onto the hospital building (Severe civilian casualties and global outrage)",
                            "effects": {
                                "scores": {
                                    "coalition_support": -3,
                                    "joint_effect": -2
                                },
                                "unlockEvents": [
                                    "ev_s5_space_jamming"
                                ]
                            }
                        }
                    ]
                },
                {
                    "role": "isr",
                    "text": "Support Psychological Operations over the contested coastal city:",
                    "options": [
                        {
                            "id": "opt_info_rpas_show",
                            "text": "Keep Reaper MQ-9B drones visibly circling overhead and fly loud, low fast-jet 'Shows of Force'",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_info_covert_high",
                            "text": "Keep drones hidden high above the clouds for secret tracking (Good intel, puts no psychological pressure on militia fighters)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_s5_space_jamming",
            "stage": "stage_5",
            "name": "5.1 Stage 5 Convergence — Air-Space Integration: GPS/PNT & SATCOM Denial",
            "prerequisites": [
                "ev_c1_weather_payload",
                "ev_c1_urban_info_ops",
                "ev_t3_csar_medevac"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "klaxon",
            "location": [
                35.5,
                35.5
            ],
            "image": "ev_gps_jamming",
            "description": "ALL TRACKS CONVERGE (STAGE 5 CLIMAX): Pushed back on every front, Crimson State switches on a powerful jammer blocking space-based Positioning, Navigation & Timing (PNT / GPS) and satellite communications (SATCOM) across the whole region! Its signal appears on the map.",
            "facilitatorNotes": "STAGE 5 CONVERGENCE GATE — Becomes AVAILABLE once all 3 parallel tracks finish (Facilitator can also Force Trigger earlier to keep class within 45–60 mins!). Reveals hidden asset 'a_gps_jammer'. Covers LO3 P10 (Task 35: Air-Space Integration — Space enables PNT for aircraft/weapons and voice/data communications), LO1 P3 (Ubiquity of Space), and LO1 P2 (Task 9: Denial & Disruption). Triggers 'ev_s5_strategic_attack'!",
            "autoEffects": {
                "revealAssets": [
                    "a_gps_jammer"
                ]
            },
            "roleDescriptions": {
                "joint": "Air-Space Integration is vital to modern Air Power: satellites provide Positioning, Navigation & Timing (PNT / GPS) for aircraft and precision weapons, plus long-range voice and data SATCOM.",
                "isr": "Jamming GPS is an act of Denial and Disruption—Rivet Joint SIGINT/MASINT and UK Space Command can pinpoint the jammer so our jets can destroy it."
            },
            "decisions": [
                {
                    "role": "joint",
                    "text": "How will you protect Air-Space Integration so our aircraft can still navigate, talk, and guide precision weapons?",
                    "options": [
                        {
                            "id": "opt_s5_space_counter",
                            "text": "Work with UK Space Command to switch to anti-jam military SATCOM and backup onboard navigation while Rivet Joint + Typhoons destroy the GPS jammer",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2,
                                    "joint_effect": 1
                                },
                                "assetStateChanges": {
                                    "a_gps_jammer": "destroyed"
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_s5_strategic_attack",
                                        "delayMs": 35000,
                                        "probability": 1
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_s5_inertial_only",
                            "text": "Rely only on backup cockpit navigation and avoid attacking the defended jammer site (Keeps jets safer, lowers GPS weapon accuracy)",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "situational_awareness": -1,
                                    "joint_effect": -1
                                },
                                "triggerEvents": [
                                    {
                                        "id": "ev_s5_strategic_attack",
                                        "delayMs": 35000,
                                        "probability": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            "possibleLocations": [
                [
                    35.5,
                    35.5
                ],
                [
                    35.22,
                    35.85
                ],
                [
                    35.75,
                    35.62
                ]
            ]
        },
        {
            "id": "ev_s5_strategic_attack",
            "stage": "stage_5",
            "name": "5.2 Final Decision: Strategic Attack, Deterrence & Full Spectrum Peace",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "explosion",
            "location": [
                35.52,
                35.78
            ],
            "image": "evt_depot_strike",
            "description": "FINAL CAMPAIGN DECISION: Crimson State's front line has collapsed, but its leaders are hiding inside a reinforced command bunker and threatening chemical or nuclear weapons unless we stop. Your choices on Strategic Attack (Conventional vs Nuclear Deterrence) and moving from Peace Enforcement to Post-Conflict Peace Building will decide the outcome. (Mid-campaign tactical Actions now close.)",
            "facilitatorNotes": "FINAL DECISION NODE — Covers LO2 P8 (Task 28 & 30: Strategic Attack — targeting adversary structures/organisations affecting ability to wage war; WW2 Bomber Command context), LO2 P5 (Task 21: Strategic Offensive Operations — Conventional vs Nuclear Weapons & Deterrence/Cold War V-Bomber ethical dilemma), LO1 P2 (Task 9: Coercion, Destruction, Peace Enforcement vs Peacekeeping, Peace Support Operations, Post-Conflict Peace Building), and LO3 P9 (Tasks 33 & 34: Joint Action [fires, outreach, info activities, manoeuvre], Joint Operations ['aircraft cannot occupy land'], Full Spectrum Approach [Military, Diplomatic, Economic]). Unlocks the 3 mutually exclusive Endgames!",
            "roleDescriptions": {
                "strike": "Strategic Attack targets an enemy's main leadership and war-making structures to break their ability to fight. Strategic Offensive Operations separate precision Conventional weapons (used in battle) from Nuclear weapons (held strictly for Deterrence, never routine combat).",
                "jfac": "THE GOLDEN RULE OF AIR POWER: Aircraft CANNOT occupy land! Moving from Peace Enforcement (forcing peace without consent) to Peacekeeping, Peace Support Operations, and Post-Conflict Peace Building needs Joint Operations (Army + Royal Navy + RAF) and the Full Spectrum Approach (Military, Diplomatic, Economic)."
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "Choose our Strategic Offensive response to the regime's command bunker and WMD threat:",
                    "options": [
                        {
                            "id": "opt_s5_conv_precision_deter",
                            "text": "Launch a precision Conventional Strategic Attack (F-35B + Storm Shadow bunker-busters) backed by silent UK nuclear Deterrence to stop WMD use",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": 1,
                                    "coalition_support": 1
                                }
                            }
                        },
                        {
                            "id": "opt_s5_broad_infra",
                            "text": "Launch wide Coercion raids on national power stations and civilian bridges to force a faster surrender (Harms civilians and post-war rebuilding)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "coalition_support": -2,
                                    "joint_effect": -1
                                }
                            }
                        },
                        {
                            "id": "opt_s5_halt_strikes",
                            "text": "Stop all air strikes immediately and rely on economic sanctions alone (Gives regime leaders time to rebuild militia forces)",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "air_control": -1,
                                    "joint_effect": -1
                                }
                            }
                        }
                    ]
                },
                {
                    "role": "jfac",
                    "text": "How will UK JFAC move from Peace Enforcement combat to lasting Post-Conflict Peace Building?",
                    "options": [
                        {
                            "id": "opt_s5_full_spectrum_joint",
                            "text": "Use Joint Operations & the Full Spectrum Approach: Army secures towns, Royal Navy guards ports, and diplomats & aid teams lead Peace Support Operations and rebuilding",
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
                            "id": "opt_s5_air_only_policing",
                            "text": "Pull ground troops out early and try to keep peace using only fighter jets and drones overhead (Tries to win by Air Power alone)",
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
            "name": "VICTORY: Decisive Full-Spectrum Joint Campaign Success",
            "prerequisites": [
                "ev_s5_strategic_attack"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "isEndGame": true,
            "conditions": {
                "minScores": {
                    "air_control": 4,
                    "joint_effect": 4
                }
            },
            "location": [
                35.52,
                35.78
            ],
            "image": "ev_eu_success",
            "description": "CAMPAIGN VICTORY! Across three parallel tracks, your UK JFAC team mastered all 4 fundamental roles of Air Power (Control of the Air, ISR, Air Attack, and Air Mobility), protected the 4 Enablers, worked across Land, Maritime, Space, and Cyber domains, and applied the Full Spectrum Approach to win lasting peace.",
            "facilitatorNotes": "ENDGAME A (Air Control >= 4 AND Joint Action >= 4). Mutually exclusive with Endgames B and C! Congratulate the cadets on mastering the Senior & Master Air Cadet Air Power syllabus!",
            "roleDescriptions": {
                "jfac": "Brilliant operational leadership across all three tracks—you showed how UK JFAC brings Joint Action together.",
                "control": "You defended RAF Akrotiri, broke enemy A2AD, and won Control of the Air.",
                "mobility": "Your Hub & Spoke airbridge, Voyager tankers, JHC helicopters, and Combat Recovery kept the whole force fighting."
            },
            "decisions": []
        },
        {
            "id": "ev_endgame_culmination",
            "stage": "stage_5",
            "name": "STALEMATE: Supply Strain & Trying to Win by Air Alone",
            "prerequisites": [
                "ev_s5_strategic_attack"
            ],
            "requiresUnlock": true,
            "repeatable": false,
            "isEndGame": true,
            "conditions": {
                "minScores": {
                    "air_control": 4
                },
                "maxScores": {
                    "joint_effect": 3
                }
            },
            "location": [
                34.58,
                32.98
            ],
            "image": "ev_endgame_culmination",
            "description": "OPERATIONAL STALEMATE: Although RAF pilots won major battles in the sky, weak Joint Action, stretched supplies, or trying to police towns from the air alone allowed enemy militias to slip back in. As RAF doctrine teaches: aircraft cannot occupy land.",
            "facilitatorNotes": "ENDGAME B (Air Control >= 4 AND Joint Action <= 3). Mutually exclusive! Debrief LO1 P1 (Impermanence & Limitations of Air Power) and LO3 P9 (why independent air operations lack the potency of Joint Operations & the Full Spectrum Approach).",
            "roleDescriptions": {
                "jfac": "Key Air Power lesson: winning in the sky is essential, but you cannot secure peace without land troops, naval forces, diplomacy, and rebuilding.",
                "mobility": "Without steady supplies and joint teamwork, even Air Superiority runs out of steam before final victory."
            },
            "decisions": []
        },
        {
            "id": "ev_endgame_denial",
            "stage": "stage_5",
            "name": "DEFEAT: A2AD Denial & Loss of Control of the Air",
            "prerequisites": [
                "ev_s5_strategic_attack"
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
            "description": "CAMPAIGN DEFEAT: Our force failed to knock out Crimson State's A2AD missile shield or protect our forward airfields. Without Control of the Air, our transport planes, helicopters, warships, and ground troops came under heavy attack and had to pull back.",
            "facilitatorNotes": "ENDGAME C (Air Control <= 3). Mutually exclusive! Debrief LO2 P5: why Control of the Air is the essential prerequisite enabling Air Mobility, ISR, Land, and Maritime operations.",
            "roleDescriptions": {
                "control": "Without winning at least Air Superiority through Active/Passive DCA and Offensive Counter-Air, every other force is left exposed.",
                "isr": "Close teamwork between ISR, Cyber, and Control of the Air is essential to break modern A2AD missile shields."
            },
            "decisions": []
        },
        {
            "id": "ev_combat_air_patrol_surge",
            "stage": "stage_2",
            "name": "Action Outcome: 24/7 Fighter Air Shield Established",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.9,
                33.5
            ],
            "image": "ev_airspace_intercept",
            "description": "Extra Typhoon FGR4 patrols backed by Voyager aerial refuelling have built a 24/7 air shield across the Eastern Mediterranean, forcing enemy jets to stay on the ground.",
            "autoEffects": {
                "scores": {
                    "air_control": 1,
                    "force_protection": 1,
                    "sustainability": -1
                }
            },
            "roleDescriptions": {
                "control": "Non-stop Active DCA patrols stopped enemy air raids, though tanker fuel use went up."
            },
            "decisions": []
        },
        {
            "id": "ev_cap_fatigue_incident",
            "stage": "stage_2",
            "name": "Action Outcome: CAP Surge — Impermanence & Crew Fatigue Strain",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.72,
                33.25
            ],
            "image": "ev_logistics_failure",
            "description": "The 24/7 fighter surge kept enemy raiders away, but non-stop flying pushed crews, jets, and Voyager fuel reserves past planned limits—showing Air Power's limitation of Impermanence and heavy Sustain needs.",
            "autoEffects": {
                "scores": {
                    "air_control": 1,
                    "sustainability": -2
                }
            },
            "roleDescriptions": {
                "mobility": "Aircraft cannot stay in the air forever without huge amounts of fuel and maintenance!"
            },
            "decisions": []
        },
        {
            "id": "ev_raf_regt_sweep",
            "stage": "stage_2",
            "name": "Action Outcome: RAF Regiment Perimeter Sweep Clears Drone Cell",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                34.64,
                32.92
            ],
            "image": "generic_deployment",
            "description": "Armed RAF Regiment ground patrols swept the hills outside RAF Akrotiri, capturing the militia drone vans and mortars—making the perimeter safe and bringing back enemy parts for TECHINT analysis.",
            "autoEffects": {
                "scores": {
                    "force_protection": 1,
                    "situational_awareness": 1
                },
                "assetStateChanges": {
                    "a_insurgent_drone_cell": "neutralised"
                }
            },
            "roleDescriptions": {
                "jfac": "The RAF Regiment guarding outside the fence shows why the 'Protect' enabler keeps airfields safe."
            },
            "decisions": []
        },
        {
            "id": "ev_link16_sync",
            "stage": "stage_2",
            "name": "Action Outcome: Tri-Service Link-16 NEC Rebuilt & Synced",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35,
                34
            ],
            "image": "ev_cyber_success",
            "description": "90 Signals Unit and cyber teams secured and reconnected RAF jets, HMS Duncan, and Army JTACs onto one encrypted Link-16 Network Enabled Capability map—getting the right information to the right place at the right time.",
            "autoEffects": {
                "scores": {
                    "joint_effect": 1,
                    "situational_awareness": 1
                }
            },
            "roleDescriptions": {
                "isr": "Sensors, commanders, and weapons are back on one shared, cyber-protected live battle map."
            },
            "decisions": []
        },
        {
            "id": "ev_sf_raid_success",
            "stage": "stage_3",
            "name": "Action Outcome: Special Forces Air Raid Captures SAM Codes & TECHINT",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "alert",
            "location": [
                35.48,
                36.05
            ],
            "image": "ev_sf_success",
            "description": "Flying ultra-low through the valleys on night-vision goggles, RAF Chinooks supported by a Shadow R1 overhead dropped UK Special Forces onto the enemy command villa. The team captured live SAM radar code equipment (TECHINT) and flew out safely before sunrise!",
            "autoEffects": {
                "scores": {
                    "situational_awareness": 2,
                    "joint_effect": 1,
                    "air_control": 1
                },
                "assetStateChanges": {
                    "a_sf_intel_compound": "raided"
                }
            },
            "roleDescriptions": {
                "mobility": "Textbook Special Forces Air Operations—secret insertion, support, and extraction in darkness.",
                "isr": "Captured SAM code equipment gives us vital Technical Intelligence (TECHINT) to crack enemy air defences!"
            },
            "decisions": []
        },
        {
            "id": "ev_sf_raid_compromised",
            "stage": "stage_3",
            "name": "Action Outcome: Special Forces Raid Spotted — Escape Under Fire!",
            "requiresUnlock": true,
            "repeatable": false,
            "sound": "explosion",
            "location": [
                35.48,
                36.05
            ],
            "image": "ev_sf_fail",
            "description": "Enemy guards spotted the night Chinook landing zone! Special Forces grabbed part of the encrypted gear before fighting their way back to the helicopter under heavy fire—showing the high risks of deep Special Forces Air Operations (like Operation Mikado).",
            "autoEffects": {
                "scores": {
                    "situational_awareness": 1,
                    "force_protection": -1
                },
                "assetStateChanges": {
                    "a_sf_intel_compound": "raided"
                }
            },
            "roleDescriptions": {
                "mobility": "Chinook pilots pulled off a daring extraction under fire, escaping with partial intel and battle damage."
            },
            "decisions": []
        },
        {
            "id": "ev_humanitarian_drop",
            "stage": "stage_4",
            "name": "Action Outcome: Humanitarian Operations A400M Relief Drop Complete",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.25,
                36.3
            ],
            "image": "a400m_transport",
            "description": "RAF A400M Atlas transport planes parachute-dropped 40 tonnes of food, clean water kits, and emergency medicine to the cut-off coastal town—showing Air Power's Humanitarian Operations role and boosting international support.",
            "autoEffects": {
                "scores": {
                    "coalition_support": 2,
                    "sustainability": -1
                },
                "assetStateChanges": {
                    "a_displaced_civilians": "assisted"
                }
            },
            "roleDescriptions": {
                "joint": "Short-term material and logistical Humanitarian Operations save lives and strengthen the Full Spectrum Approach."
            },
            "decisions": []
        },
        {
            "id": "ev_psyops_broadcast",
            "stage": "stage_3",
            "name": "Action Outcome: Op Shader-Style Leaflet Drop & Radio Broadcast Success",
            "requiresUnlock": true,
            "repeatable": false,
            "location": [
                35.4,
                36
            ],
            "image": "ev_psyops_leaflet_drop",
            "description": "RAF aircraft dropped 100,000 safe-passage leaflets and broadcast radio messages over militia lines—modeled on RAF Operation SHADER Information Activities. Two militia groups surrendered without a single bomb dropped.",
            "autoEffects": {
                "scores": {
                    "coalition_support": 1,
                    "joint_effect": 1
                }
            },
            "roleDescriptions": {
                "strike": "Non-kinetic Psychological Operations broke the enemy's will to fight while keeping civilians safe."
            },
            "decisions": []
        },
        {
            "id": "act_dca_surge",
            "name": "Surge 24/7 Combat Air Patrols",
            "description": "Unlocked by the Akrotiri Air Raid: Launch extra Typhoon FGR4 patrols backed by Voyager tankers for a round-the-clock air shield. Boosts Control of the Air, with a 25% risk of Impermanence and fuel strain.",
            "initiator": [
                "control"
            ],
            "requiresApprovalFrom": [
                "mobility"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_t1_dca_akrotiri"
                ],
                "notTriggeredEvents": [
                    "ev_combat_air_patrol_surge",
                    "ev_cap_fatigue_incident",
                    "ev_s5_strategic_attack"
                ],
                "minScores": {
                    "sustainability": 2
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_combat_air_patrol_surge",
                        "delayMs": 2000,
                        "probability": 0.75
                    },
                    {
                        "id": "ev_cap_fatigue_incident",
                        "delayMs": 2000,
                        "probability": 0.25
                    }
                ]
            },
            "image": "ev_airspace_intercept",
            "isManualAction": true
        },
        {
            "id": "act_regt_patrol",
            "name": "RAF Regiment Perimeter Sweep",
            "description": "Unlocked by the Asymmetric Drone Swarm: Send armed RAF Regiment ground patrols to clear the spotted militia drone & mortar cell outside RAF Akrotiri.",
            "initiator": [
                "jfac",
                "control"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_t1_asymmetric_swarm"
                ],
                "visibleAssets": [
                    "a_insurgent_drone_cell"
                ],
                "assets": {
                    "a_insurgent_drone_cell": "operational"
                },
                "notTriggeredEvents": [
                    "ev_raf_regt_sweep",
                    "ev_s5_strategic_attack"
                ]
            },
            "effects": {
                "assetStateChanges": {
                    "a_insurgent_drone_cell": "neutralised"
                },
                "triggerEvents": [
                    {
                        "id": "ev_raf_regt_sweep",
                        "delayMs": 2000,
                        "probability": 1
                    }
                ]
            },
            "image": "generic_deployment",
            "isManualAction": true
        },
        {
            "id": "act_nec_sync",
            "name": "Rebuild & Sync Tri-Service Link-16 NEC",
            "description": "Unlocked by the Air-Cyber Breach: Task 90 Signals Unit to cyber-protect and reconnect RAF, Royal Navy, and Army units onto one live Link-16 Network Enabled Capability battle map.",
            "initiator": [
                "isr",
                "joint"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_t2_defensive_cyber"
                ],
                "notTriggeredEvents": [
                    "ev_link16_sync",
                    "ev_s5_strategic_attack"
                ],
                "minScores": {
                    "situational_awareness": 2
                }
            },
            "effects": {
                "triggerEvents": [
                    {
                        "id": "ev_link16_sync",
                        "delayMs": 2000,
                        "probability": 1
                    }
                ]
            },
            "image": "act_cyber_offensive",
            "isManualAction": true
        },
        {
            "id": "act_sf_air_ops",
            "name": "Special Forces Air Insertion (TECHINT Raid)",
            "description": "Unlocked once ISR locates the Enemy Command Villa & Air Control reaches 3+: Fly night Chinooks + Shadow R1 to drop UK Special Forces and capture SAM code equipment (75% clean capture / 25% escape under fire).",
            "initiator": [
                "mobility",
                "isr"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_t2_isr_cycle"
                ],
                "visibleAssets": [
                    "a_sf_intel_compound"
                ],
                "assets": {
                    "a_sf_intel_compound": "operational"
                },
                "minScores": {
                    "air_control": 3
                },
                "notTriggeredEvents": [
                    "ev_sf_raid_success",
                    "ev_sf_raid_compromised",
                    "ev_s5_strategic_attack"
                ]
            },
            "effects": {
                "assetStateChanges": {
                    "a_sf_intel_compound": "raided"
                },
                "randomEvents": [
                    {
                        "id": "ev_sf_raid_success",
                        "delayMs": 2000,
                        "probability": 0.75
                    },
                    {
                        "id": "ev_sf_raid_compromised",
                        "delayMs": 2000,
                        "probability": 0.25
                    }
                ]
            },
            "image": "act_special_forces",
            "isManualAction": true
        },
        {
            "id": "act_humanitarian_aid",
            "name": "Humanitarian Operations: A400M Relief Air-Drop",
            "description": "Unlocked when Airborne Ops scouts spot the Cut-Off Refugee Town: Fly an RAF A400M Atlas to parachute-drop 40 tonnes of food, clean water, and medicine to trapped civilians.",
            "initiator": [
                "mobility",
                "joint"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_t3_airborne_ops"
                ],
                "visibleAssets": [
                    "a_displaced_civilians"
                ],
                "assets": {
                    "a_displaced_civilians": "operational"
                },
                "minScores": {
                    "sustainability": 2
                },
                "notTriggeredEvents": [
                    "ev_humanitarian_drop",
                    "ev_s5_strategic_attack"
                ]
            },
            "effects": {
                "assetStateChanges": {
                    "a_displaced_civilians": "assisted"
                },
                "triggerEvents": [
                    {
                        "id": "ev_humanitarian_drop",
                        "delayMs": 2000,
                        "probability": 1
                    }
                ]
            },
            "image": "act_us_support",
            "isManualAction": true
        },
        {
            "id": "act_info_psyops",
            "name": "Op Shader Leaflet Drop & Radio Broadcast",
            "description": "Unlocked by the Urban Hospital Information Activities event (needs Air Control 3+): Drop safe-passage leaflets and broadcast surrender messages over militia lines without bombing.",
            "initiator": [
                "strike",
                "joint"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_c1_urban_info_ops"
                ],
                "minScores": {
                    "air_control": 3
                },
                "notTriggeredEvents": [
                    "ev_psyops_broadcast",
                    "ev_s5_strategic_attack"
                ]
            },
            "effects": {
                "triggerEvents": [
                    {
                        "id": "ev_psyops_broadcast",
                        "delayMs": 2000,
                        "probability": 1
                    }
                ]
            },
            "image": "ev_psyops_leaflet_drop",
            "isManualAction": true
        },
        {
            "id": "ev_wc_neutral_airliner",
            "stage": "stage_2",
            "name": "Track A Wildcard: Neutral Airliner Enters Engagement Zone",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                35.05,
                34.45
            ],
            "possibleLocations": [
                [
                    35.05,
                    34.45
                ],
                [
                    34.82,
                    33.9
                ],
                [
                    35.3,
                    34.1
                ]
            ],
            "image": "ev_airspace_intercept",
            "description": "A civilian commercial airliner has strayed off its Eastern Mediterranean airway directly into the path of incoming hostile radar contacts. QRA Typhoons have seconds to visually identify (VID) before weapons release.",
            "roleDescriptions": {
                "control": "Active DCA demands positive identification. Firing blindly risks a catastrophic civilian disaster; closing for VID puts Typhoons closer to hostile missiles."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "Rules of Engagement for the unidentified contact:",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_airliner_vid",
                    "options": [
                        {
                            "id": "opt_airliner_vid",
                            "text": "Hold BVR fire and vector Typhoons for close visual identification & escort out of danger.",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_airliner_clear_sky",
                            "text": "Broadcast emergency guard-channel diversion orders while locking radar on trailing hostiles.",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_fastjet_ambush",
            "stage": "stage_2",
            "name": "Track A Wildcard: Crimson Fast-Jet Pop-Up Ambush",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                35.25,
                35.1
            ],
            "possibleLocations": [
                [
                    35.25,
                    35.1
                ],
                [
                    34.9,
                    34.8
                ],
                [
                    35.6,
                    34.7
                ]
            ],
            "image": "rus_su57",
            "description": "Two Crimson State fighters have popped up from sea-skimming altitude behind coastal terrain to ambush our offshore ISR and tanker orbit!",
            "roleDescriptions": {
                "control": "This is a classic threat to Air Power's enablers. Scramble Typhoon QRA immediately to preserve a Favourable Air Situation."
            },
            "decisions": [
                {
                    "role": "control",
                    "text": "Counter the pop-up fast-jet ambush:",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_ambush_evade",
                    "options": [
                        {
                            "id": "opt_ambush_meteor",
                            "text": "Vector F-35B & Typhoon CAP to engage with Meteor BVR missiles while HMS Duncan paints targets.",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_ambush_evade",
                            "text": "Pull Voyager and Rivet Joint back west immediately and hold defensive CAP.",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "situational_awareness": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_sam_relocates",
            "stage": "stage_2",
            "name": "Track A Wildcard: SA-17 SAM Battery Relocates Under Camouflage",
            "sound": "alert",
            "repeatable": false,
            "location": [
                35.42,
                35.92
            ],
            "possibleLocations": [
                [
                    35.42,
                    35.92
                ],
                [
                    35.28,
                    35.75
                ],
                [
                    35.55,
                    36.02
                ]
            ],
            "image": "ukr_air_defense",
            "description": "Because the hostile SA-17 battery was not destroyed immediately, its crew packed up and displaced under camouflage netting—vanishing from our tactical map!",
            "autoEffects": {
                "hideAssets": [
                    "a_crimson_sam_battery"
                ],
                "scores": {
                    "air_control": -1
                }
            },
            "roleDescriptions": {
                "isr": "Target lost! Task RC-135W Rivet Joint or Reaper MQ-9B to re-acquire the mobile launcher before it ambushes Track C's helicopters."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Re-task ISR Wing to hunt the displaced SA-17 battery?",
                    "options": [
                        {
                            "id": "opt_sam_reacquire",
                            "text": "Re-task Rivet Joint SIGINT & Reaper GEOINT to re-locate the battery immediately.",
                            "effects": {
                                "revealAssets": [
                                    "a_crimson_sam_battery"
                                ],
                                "scores": {
                                    "situational_awareness": 1,
                                    "sustainability": -1
                                }
                            }
                        },
                        {
                            "id": "opt_sam_skip",
                            "text": "Keep ISR on current maritime tasks and warn aircraft to stay above 25,000ft.",
                            "effects": {
                                "scores": {
                                    "air_control": -1,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_sigint_convoy",
            "stage": "stage_2",
            "name": "EYES ONLY (Track B): SIGINT Flash — Enemy Munitions Convoy",
            "sound": "teletype",
            "repeatable": false,
            "visibleTo": [
                "isr",
                "jfac"
            ],
            "location": [
                35.45,
                36.18
            ],
            "possibleLocations": [
                [
                    35.45,
                    36.18
                ],
                [
                    35.18,
                    36.05
                ],
                [
                    35.68,
                    35.95
                ]
            ],
            "image": "rc135_rivet_joint",
            "description": "CLASSIFICATION: UK EYES ONLY (ISR & JFAC). RC-135W Rivet Joint intercepted unencrypted radio orders revealing a resupply convoy carrying fresh SA-17 reload missiles heading for the coast.",
            "roleDescriptions": {
                "isr": "Strike and Control CANNOT see this alert! Verbally coordinate with them across the room—this is Network Enabled Capability (Right information, right place, right time) in action.",
                "jfac": "Decide whether to disseminate immediately to Strike for an Air Interdiction hit or track it to its hidden depot."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Follow the ISR Process (Disseminate & Apply) on the munitions convoy:",
                    "options": [
                        {
                            "id": "opt_sigint_disseminate",
                            "text": "Disseminate coordinates immediately via Link-16 NEC for a Typhoon Air Interdiction strike.",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_sigint_shadow",
                            "text": "Shadow the convoy with Reaper RPAS to reveal their coastal command villa first.",
                            "effects": {
                                "revealAssets": [
                                    "a_sf_intel_compound"
                                ],
                                "scores": {
                                    "situational_awareness": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_osint_fake_video",
            "stage": "stage_2",
            "name": "Track B Wildcard: False-Flag OSINT Video Goes Viral",
            "sound": "teletype",
            "repeatable": false,
            "location": [
                35.2,
                35.9
            ],
            "image": "ev_disinfo_campaign",
            "description": "Adversary information warfare accounts have released doctored OSINT footage claiming an RAF jet struck a coastal school, sparking urgent calls from coalition capitals.",
            "roleDescriptions": {
                "joint": "Under the Full Spectrum Approach, diplomatic and information resilience matter just as much as kinetic precision."
            },
            "decisions": [
                {
                    "role": "joint",
                    "text": "Counter the adversary disinformation campaign:",
                    "options": [
                        {
                            "id": "opt_osint_debunk",
                            "text": "Declassify timestamped Reaper GEOINT gun-camera footage to prove no UK aircraft was in the sector.",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "situational_awareness": 1
                                }
                            }
                        },
                        {
                            "id": "opt_osint_ignore",
                            "text": "Refuse to release classified sensor imagery to protect collection methods.",
                            "effects": {
                                "scores": {
                                    "coalition_support": -1,
                                    "force_protection": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_rpas_satlink_hijack",
            "stage": "stage_3",
            "name": "Track B Wildcard: Reaper MQ-9B Satlink Hijack Attempt",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                35.35,
                34.9
            ],
            "image": "generic_cyber",
            "description": "Adversary cyber-EW operators are attempting to hijack the satellite command uplink of our orbiting Reaper MQ-9B RPAS—threatening Air-Space and Air-Cyber integration!",
            "roleDescriptions": {
                "isr": "Defensive Air-Cyber teams at RAF Waddington have 45 seconds to switch to encrypted backup SATCOM or trigger autonomous return-to-base."
            },
            "decisions": [
                {
                    "role": "isr",
                    "text": "Protect the Reaper RPAS satellite link:",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_rpas_rtb",
                    "options": [
                        {
                            "id": "opt_rpas_encrypt",
                            "text": "Execute Defensive Air-Cyber frequency hop onto hardened military SATCOM and stay on station.",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "force_protection": 1
                                }
                            }
                        },
                        {
                            "id": "opt_rpas_rtb",
                            "text": "Command autonomous return-to-base immediately to prevent capture (Temporary ISR gap).",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "situational_awareness": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_voyager_ew_jam",
            "stage": "stage_3",
            "name": "Track C Wildcard: Voyager Tanker EW Jamming During AAR",
            "sound": "alert",
            "repeatable": false,
            "location": [
                34.7,
                33.6
            ],
            "possibleLocations": [
                [
                    34.7,
                    33.6
                ],
                [
                    34.4,
                    33.2
                ],
                [
                    35,
                    33.3
                ]
            ],
            "image": "voyager_refueler",
            "description": "Hostile naval electronic warfare jamming is disrupting navigation and rendezvous beacons on our offshore Voyager KC2 Air-to-Air Refuelling orbit—threatening Track A fighters running low on fuel!",
            "roleDescriptions": {
                "mobility": "Cross-track impact: If Voyager breaks orbit without refuelling Track A's Typhoons, Air Power's limitation of Impermanence will force them home early."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "Maintain Air-to-Air Refuelling under EW jamming:",
                    "options": [
                        {
                            "id": "opt_aar_reposition",
                            "text": "Shift the Voyager towline 40 miles west under HMS Duncan's shield and complete visual refuelling.",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "air_control": 1
                                }
                            }
                        },
                        {
                            "id": "opt_aar_abort",
                            "text": "Abort the AAR orbit immediately to protect the high-value tanker (Degrades Track A sorties).",
                            "effects": {
                                "assetStateChanges": {
                                    "a_voyager": "degraded"
                                },
                                "scores": {
                                    "force_protection": 1,
                                    "air_control": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_sub_dives",
            "stage": "stage_3",
            "name": "Track C Wildcard: Hostile Kilo Sub Slips Below Thermal Layer",
            "sound": "sonar",
            "repeatable": false,
            "location": [
                34.3,
                33.9
            ],
            "image": "ev_sub_detection",
            "description": "The hostile Kilo-class submarine has dived beneath an Eastern Mediterranean thermal layer and broken sonar contact—she remains hidden and operational!",
            "autoEffects": {
                "hideAssets": [
                    "a_hostile_sub"
                ],
                "scores": {
                    "joint_effect": -1
                }
            },
            "roleDescriptions": {
                "strike": "Without P-8A Poseidon sonobuoys and RN Wildcat dipping sonar re-acquiring her, she could ambush HMS Duncan or our amphibious lift later."
            },
            "decisions": []
        },
        {
            "id": "ev_wc_sub_reemerges_ambush",
            "stage": "stage_4",
            "name": "Elusive Kilo Sub Re-Emerges on Maritime Lift Corridor!",
            "sound": "sonar",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                34.15,
                33.75
            ],
            "possibleLocations": [
                [
                    34.15,
                    33.75
                ],
                [
                    34.45,
                    34.05
                ],
                [
                    33.9,
                    33.55
                ]
            ],
            "image": "ev_sub_surfaces",
            "description": "Because the hostile Kilo-class submarine escaped earlier, she has resurfaced to periscope depth along HMS Duncan's patrol box—threatening our Air-Maritime Integration corridor!",
            "conditions": {
                "assetStates": {
                    "a_hostile_sub": "operational"
                },
                "hiddenAssets": [
                    "a_hostile_sub"
                ],
                "triggeredEvents": [
                    "ev_wc_sub_dives",
                    "ev_t3_airborne_ops"
                ]
            },
            "autoEffects": {
                "revealAssets": [
                    "a_hostile_sub"
                ],
                "scores": {
                    "force_protection": -1
                }
            },
            "roleDescriptions": {
                "strike": "P-8A Poseidon and HMS Duncan's RN Wildcat have a brief Anti-Submarine Warfare (ASW) firing window before she dives again!"
            },
            "decisions": [
                {
                    "role": "strike",
                    "text": "Execute Counter-Sea ASW prosecution:",
                    "timeLimitMs": 45000,
                    "defaultOptionId": "opt_sub_re_screen",
                    "options": [
                        {
                            "id": "opt_sub_re_prosecute",
                            "text": "Vector P-8A Poseidon & RN Wildcat to drop Sting Ray torpedoes and neutralise the sub.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_hostile_sub": "destroyed"
                                },
                                "scores": {
                                    "joint_effect": 1,
                                    "force_protection": 1
                                }
                            }
                        },
                        {
                            "id": "opt_sub_re_screen",
                            "text": "Have HMS Duncan launch acoustic decoys and steer clear.",
                            "effects": {
                                "hideAssets": [
                                    "a_hostile_sub"
                                ],
                                "scores": {
                                    "sustainability": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_wc_overflight_refusal",
            "stage": "stage_4",
            "name": "Track C Wildcard: Regional Partner Restricts Overflight Corridor",
            "sound": "teletype",
            "repeatable": false,
            "hiddenFrom": [
                "strike"
            ],
            "location": [
                35.9,
                31.2
            ],
            "image": "generic_un",
            "description": "A neighbouring state has abruptly closed its airspace to UK military transport flights, forcing C-17 Globemasters and A400Ms from RAF Brize Norton onto a longer maritime detour.",
            "roleDescriptions": {
                "joint": "This directly tests Air Power's Reach, Sustainability, and Diplomatic Full Spectrum engagement."
            },
            "decisions": [
                {
                    "role": "joint",
                    "text": "Resolve the Hub & Spoke overflight restriction:",
                    "options": [
                        {
                            "id": "opt_overflight_diplo",
                            "text": "Use Diplomatic & Economic Full Spectrum outreach with NATO allies to reopen the corridor.",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "sustainability": 1
                                }
                            }
                        },
                        {
                            "id": "opt_overflight_detour",
                            "text": "Reroute C-17s over international waters and absorb the extra Voyager fuel burn.",
                            "effects": {
                                "scores": {
                                    "sustainability": -1,
                                    "coalition_support": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_shock_fuel_rationing",
            "stage": "stage_3",
            "name": "Threshold Shock: Aviation Fuel & Precision Munitions Rationing",
            "sound": "alert",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                34.58,
                32.98
            ],
            "image": "ev_logistics_failure",
            "description": "Sustained high-tempo flying has drained RAF Akrotiri's Avtur and precision-guided munitions reserves to critical levels. Voyager AAR sorties are degraded until a Hub & Spoke surge arrives!",
            "conditions": {
                "maxScores": {
                    "sustainability": 1
                },
                "triggeredEvents": [
                    "ev_t3_hub_and_spoke"
                ]
            },
            "autoEffects": {
                "assetStateChanges": {
                    "a_voyager": "degraded"
                }
            },
            "roleDescriptions": {
                "mobility": "Sustain is one of the 4 Enablers of Air Power! Trigger the Emergency Hub & Spoke Air-Bridge Surge manual action from RAF Brize Norton to restore Voyager and full sortie rates."
            },
            "decisions": [
                {
                    "role": "mobility",
                    "text": "Immediate rationing posture at RAF Akrotiri:",
                    "options": [
                        {
                            "id": "opt_ration_prioritise",
                            "text": "Prioritise QRA Control of the Air and Medevac while awaiting C-17 resupply from Brize Norton.",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "air_control": -1
                                }
                            }
                        },
                        {
                            "id": "opt_ration_surge",
                            "text": "Burn war-reserve stocks to keep all strike sorties flying (High risk of running dry).",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_shock_akrotiri_cratered",
            "stage": "stage_3",
            "name": "Threshold Shock: Runway Cratering at RAF Akrotiri!",
            "sound": "explosion",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                34.58,
                32.98
            ],
            "image": "ev_akrotiri_strike",
            "description": "With Base Force Protection critically low, a ballistic missile salvo has cratered the main runway at RAF Akrotiri—highlighting Air Power's limitation of Vulnerability on the ground!",
            "conditions": {
                "maxScores": {
                    "force_protection": 1
                },
                "triggeredEvents": [
                    "ev_t1_basing_dilemma"
                ]
            },
            "autoEffects": {
                "assetStateChanges": {
                    "a_akrotiri": "damaged"
                }
            },
            "roleDescriptions": {
                "jfac": "If HMS Queen Elizabeth is on station (Carrier Enabled Power Projection), STOVL F-35Bs can divert immediately to the carrier deck while RAF Engineers repair Akrotiri!"
            },
            "decisions": [
                {
                    "role": "jfac",
                    "text": "Respond to the cratered runway at RAF Akrotiri:",
                    "timeLimitMs": 50000,
                    "defaultOptionId": "opt_crater_repair",
                    "options": [
                        {
                            "id": "opt_crater_carrier_divert",
                            "text": "Divert F-35Bs to HMS Queen Elizabeth (Carrier Enabled Power Projection) while Engineers patch Akrotiri!",
                            "conditions": {
                                "assetStates": {
                                    "a_qec": "operational"
                                }
                            },
                            "effects": {
                                "assetStateChanges": {
                                    "a_akrotiri": "operational"
                                },
                                "scores": {
                                    "force_protection": 2,
                                    "joint_effect": 1
                                }
                            }
                        },
                        {
                            "id": "opt_crater_repair",
                            "text": "Deploy RAF Rapid Runway Repair teams under RAF Regiment guard to reopen an emergency strip.",
                            "effects": {
                                "assetStateChanges": {
                                    "a_akrotiri": "operational"
                                },
                                "scores": {
                                    "force_protection": 1,
                                    "sustainability": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_shock_coalition_freeze",
            "stage": "stage_4",
            "name": "Threshold Shock: Allied Overflight & Basing Restrictions",
            "sound": "teletype",
            "repeatable": false,
            "autoTriggerOnConditions": true,
            "location": [
                35,
                33.5
            ],
            "image": "generic_un",
            "description": "With Coalition Support critically eroded, NATO partners have suspended shared tanker basing and diplomatic cover pending UK assurances on proportional Rules of Engagement.",
            "conditions": {
                "maxScores": {
                    "coalition_support": 1
                },
                "triggeredEvents": [
                    "ev_start"
                ]
            },
            "roleDescriptions": {
                "joint": "Air Power cannot succeed in isolation—restore Coalition Capability and Full Spectrum diplomatic backing."
            },
            "decisions": [
                {
                    "role": "joint",
                    "text": "Repair coalition trust:",
                    "options": [
                        {
                            "id": "opt_coalition_roe",
                            "text": "Tighten collateral-damage ROE and invite NATO liaison officers into UK JFAC 11 Group HQ.",
                            "effects": {
                                "scores": {
                                    "coalition_support": 2,
                                    "air_control": -1
                                }
                            }
                        },
                        {
                            "id": "opt_coalition_solo",
                            "text": "Continue UK-only operations from sovereign bases without allied concessions.",
                            "effects": {
                                "scores": {
                                    "sustainability": -1,
                                    "joint_effect": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ev_oca_sam_destroyed",
            "stage": "stage_3",
            "name": "Action Outcome: F-35B & Storm Shadow OCA Destroys SA-17 Battery",
            "sound": "explosion",
            "repeatable": false,
            "location": [
                35.35,
                35.85
            ],
            "image": "ev_f35_success",
            "description": "Combining Offensive Air-Cyber blinding with stealth F-35B and Typhoon Storm Shadow precision strikes, UK JFAC has obliterated Crimson State's coastal SA-17 SAM battery—opening the skies toward Air Supremacy!",
            "autoEffects": {
                "assetStateChanges": {
                    "a_crimson_sam_battery": "destroyed"
                },
                "scores": {
                    "air_control": 2,
                    "joint_effect": 1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_oca_sam_relocated",
            "stage": "stage_3",
            "name": "Action Outcome: SA-17 Battery Disperses Before Impact",
            "sound": "klaxon",
            "repeatable": false,
            "location": [
                35.35,
                35.85
            ],
            "image": "ev_f35_fail",
            "description": "Storm Shadow missiles struck the decoy radar van, while the real mobile SA-17 launcher displaced under smoke and vanished from our tactical picture!",
            "autoEffects": {
                "hideAssets": [
                    "a_crimson_sam_battery"
                ],
                "scores": {
                    "sustainability": -1
                }
            },
            "decisions": []
        },
        {
            "id": "ev_airbridge_restored",
            "stage": "stage_3",
            "name": "Action Outcome: Brize Norton Hub & Spoke Surge Restores Sustainment",
            "sound": "alert",
            "repeatable": false,
            "location": [
                34.58,
                32.98
            ],
            "image": "raf_brize_norton",
            "description": "A continuous wave of C-17 Globemasters and A400M Atlases from RAF Brize Norton (Hub) into RAF Akrotiri (Spoke) has replenished precision munitions, Avtur fuel, and Voyager AAR readiness!",
            "autoEffects": {
                "assetStateChanges": {
                    "a_voyager": "operational",
                    "a_akrotiri": "operational"
                },
                "scores": {
                    "sustainability": 2
                }
            },
            "decisions": []
        },
        {
            "id": "ev_airbridge_delayed",
            "stage": "stage_3",
            "name": "Action Outcome: Air-Bridge Surge Delayed by Mediterranean Storm",
            "sound": "alert",
            "repeatable": false,
            "location": [
                34.58,
                32.98
            ],
            "image": "ev_weather_warning",
            "description": "Severe crosswinds delayed half the C-17 wave from RAF Brize Norton, delivering partial relief to Akrotiri's fuel and munitions dumps.",
            "autoEffects": {
                "assetStateChanges": {
                    "a_voyager": "operational"
                },
                "scores": {
                    "sustainability": 1
                }
            },
            "decisions": []
        },
        {
            "id": "act_uk_stealth_oca",
            "isManualAction": true,
            "name": "F-35B Stealth & Storm Shadow OCA Strike (Op Orchard Style)",
            "description": "Launch a UK-authentic stealth F-35B and Typhoon Storm Shadow Offensive Counter-Air strike against the pinpointed SA-17 SAM battery to achieve Air Supremacy and protect Track C helicopters.",
            "image": "f35_aircraft",
            "initiator": [
                "strike",
                "control"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_t2_isr_cycle"
                ],
                "visibleAssets": [
                    "a_crimson_sam_battery"
                ],
                "assetStates": {
                    "a_crimson_sam_battery": "operational"
                },
                "notTriggeredEvents": [
                    "ev_oca_sam_destroyed"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_oca_sam_destroyed",
                        "delayMs": 25000,
                        "probability": 0.75
                    },
                    {
                        "id": "ev_oca_sam_relocated",
                        "delayMs": 25000,
                        "probability": 0.25
                    }
                ]
            }
        },
        {
            "id": "act_hub_spoke_surge",
            "isManualAction": true,
            "name": "Emergency Hub & Spoke Air-Bridge Surge (RAF Brize Norton)",
            "description": "Surge C-17 Globemasters and A400M Atlases from RAF Brize Norton (Hub) to RAF Akrotiri (Spoke) to restore degraded Voyager AAR tankers, runway repairs, and munitions sustainability.",
            "image": "raf_brize_norton",
            "initiator": [
                "mobility"
            ],
            "requiresApprovalFrom": [
                "jfac"
            ],
            "conditions": {
                "triggeredEvents": [
                    "ev_t3_hub_and_spoke"
                ],
                "any": [
                    {
                        "maxScores": {
                            "sustainability": 2
                        }
                    },
                    {
                        "assetStates": {
                            "a_voyager": "degraded"
                        }
                    },
                    {
                        "assetStates": {
                            "a_akrotiri": "damaged"
                        }
                    }
                ],
                "notTriggeredEvents": [
                    "ev_airbridge_restored"
                ]
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_airbridge_restored",
                        "delayMs": 25000,
                        "probability": 0.8
                    },
                    {
                        "id": "ev_airbridge_delayed",
                        "delayMs": 25000,
                        "probability": 0.2
                    }
                ]
            }
        }
    ]
};
