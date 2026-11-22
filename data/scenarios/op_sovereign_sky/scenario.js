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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "jfac",
                                            "joint"
                                        ],
                                        "title": "Unified JFAC Campaign Plan Issued",
                                        "message": "UK JFAC has issued an Operational campaign directive uniting all four roles of Air Power with Joint Action and coalition objectives while delegating Tactical execution.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "isr",
                                            "mobility"
                                        ],
                                        "title": "Mission Command Authority Granted to Frontline Cells",
                                        "message": "Squadron and cell commanders have full Tactical authority to adjust flight profiles, tanker orbits, and sensor tasking dynamically under 11 Group's Air Tasking Order.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "UK JFAC ACTIVATED — MISSION COMMAND IN EFFECT",
                                        "message": "Operational campaign plan issued across all four Air Power roles; Tactical authority delegated to squadrons.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint"
                                        ],
                                        "title": "Whitehall Oversight Reassures Coalition Capitals",
                                        "message": "Direct ministerial sign-off on every Tactical flight route has reassured cautious political leaders in London and allied capitals against unintended escalation.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Centralised Flight Approvals Cripple Tactical Agility",
                                        "message": "Waiting on London to clear individual Tactical flight paths has stalled the Air Tasking cycle, blunting Air Power's Speed and Agility across the theatre.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "C2 WARNING — TACTICAL FLIGHT APPROVALS CENTRALISED",
                                        "message": "Political sign-off in London required per sortie; air tasking cycle slowed.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "Typhoon QRA Deterrence Patrols Establish Air Presence",
                                        "messages": [
                                            "Typhoon FGR4 flights are airborne along international airways in visible Deterrence patrols, seizing early Control of the Air readiness.",
                                            "Armed Typhoon patrols are flying high-visibility circuits off the coast, ready to transition immediately to Active DCA if attacked."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Deployment with Consent Bolsters Preventative Diplomacy",
                                        "messages": [
                                            "Visible NATO-style Air Policing patrols under host-nation Deployment with Consent have reassured regional allies and reinforced Defence Diplomacy.",
                                            "Credible airborne Deterrence has united coalition capitals behind UK JFAC's Preventative Diplomacy posture."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "DETERRENCE PATROLS AIRBORNE — DEPLOYMENT WITH CONSENT",
                                        "message": "Visible UK and coalition patrols active to deter Crimson State aggression.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_start_covert_posture",
                            "text": "Keep British aircraft hidden and unannounced to gain surprise if war starts (Gives up diplomatic Deterrence)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "coalition_support": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Radio-Silent Posture Preserves Tactical Surprise",
                                        "message": "Keeping Typhoon and F-35B detachments unannounced under emissions control has denied Crimson State radar operators early warning of our fighter disposition.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Absence of Visible Deterrence Worries Regional Allies",
                                        "message": "Forfeiting visible Deterrence patrols left regional partners uncertain of UK commitment, weakening Preventative Diplomacy before hostilities began.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_start_preempt_strike",
                            "text": "Launch surprise bombing raids before diplomacy has been tried (Destroys international coalition support)",
                            "effects": {
                                "scores": {
                                    "coalition_support": -2,
                                    "situational_awareness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike",
                                            "isr"
                                        ],
                                        "title": "Unvetted Strikes Launched Without Completed ISR Picture",
                                        "message": "Rushing strike packages airborne before No 1 ISR Wing finished baseline target collection resulted in blind bomb runs against unverified coastal coordinates.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Pre-Emptive Bombing Shatters Coalition Legitimacy",
                                        "message": "Launching unilateral bombing raids before Preventative Diplomacy was attempted sparked immediate condemnation across NATO and UN capitals.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "DIPLOMATIC RUPTURE — PRE-EMPTIVE STRIKE CONDEMNED",
                                        "message": "Unilateral strikes launched ahead of diplomacy; allied support sharply degraded.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Combat Wing Secured in Hardened Akrotiri Shelters",
                                        "messages": [
                                            "All Typhoon and F-35B detachments are berthed inside bomb-proof Hardened Aircraft Shelters at RAF Akrotiri, keeping fragile jets safe from enemy artillery.",
                                            "Consolidating fighters at RAF Akrotiri maximises Base Force Protection beyond coastal rocket range."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "150-Mile Transit Increases Voyager Tanker Fuel Burn",
                                        "messages": [
                                            "Operating every combat jet from Cyprus requires continuous Voyager Air-to-Air Refuelling across the 150-mile overwater transit, increasing daily Avtur consumption.",
                                            "Bridging the longer Reach from RAF Akrotiri places heavier sustained tanker demand on Voyager KC2/KC3 crews."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "STOVL Split Basing Combines Agility With Base Protection",
                                        "messages": [
                                            "F-35B Lightnings are using STOVL flexibility for brief forward turns at Strip Alpha while Typhoons stay protected inside RAF Akrotiri's shelters, boosting Control of the Air.",
                                            "Split STOVL basing delivers fast F-35B response times near the coast without leaving the main fighter wing exposed on the ground."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Dual-Site Fuel & Arming Teams Stretched",
                                        "messages": [
                                            "Supporting forward STOVL turnarounds at Strip Alpha alongside main-base operations at RAF Akrotiri has increased fuel and re-arming logistics workload.",
                                            "Splitting ground support crews between Cyprus and Forward Strip Alpha draws down theatre sustainment reserves."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "Forward Strip Alpha Delivers 5-Minute Combat Turnarounds",
                                        "messages": [
                                            "Basing Typhoons and F-35Bs just 40 miles from the front line has cut transit time to minutes, surging immediate fighter presence over the coast.",
                                            "Short-range scrambles from Forward Strip Alpha have accelerated tactical intercept times across the front."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Fragile Jets Packed Wing-to-Wing Within Artillery Range",
                                        "messages": [
                                            "Massing the entire combat wing on Alpha's unhardened apron without shelters leaves fragile aircraft critically exposed to enemy rocket and artillery bombardment.",
                                            "Ground crews warn that parked Typhoons and F-35Bs at Forward Strip Alpha have zero concrete shelter protection just 40 miles from hostile guns."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "BASE ALERT — COMBAT WING EXPOSED AT FORWARD STRIP ALPHA",
                                        "message": "Typhoons and F-35Bs massed 40 miles from hostile lines without hardened shelters.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Voyager AAR Towlines & Forward Helicopter Fuel Points Live",
                                        "messages": [
                                            "Voyager KC2/KC3 tankers have established continuous offshore refuelling orbits alongside forward helicopter fuel points, sustaining theatre airlift and tanker flow.",
                                            "Mobility has locked in staggered Voyager tanker towlines and rotary forward arming and refuelling points."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Air-to-Air Refuelling Extends Fighter Reach & On-Station Loiter",
                                        "messages": [
                                            "Offshore Voyager hose-and-drogue refuelling has doubled Typhoon and F-35B loiter time over the coastal battle zone, overcoming Air Power's Impermanence.",
                                            "Guaranteed airborne tanker plugs allow combat patrols from RAF Akrotiri to remain on station far longer."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a1_short_sorties",
                            "text": "Keep Voyager tankers back to save wear and tear and fly shorter unrefuelled patrols (Cuts time over the battlefield)",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "air_control": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Voyager Tanker Hours & Avtur Stocks Preserved",
                                        "messages": [
                                            "Holding Voyager KC2/KC3 tankers on ground standby at RAF Akrotiri has conserved tanker airframe hours and bulk aviation fuel reserves.",
                                            "Reducing offshore AAR orbits has eased maintenance pressure on the Voyager tanker detachment."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Unrefuelled Fighters Forced Off Station After Brief Patrols",
                                        "messages": [
                                            "Without offshore Voyager refuelling, Typhoons flying 150 miles from Akrotiri must turn home after only minutes on station, leaving gaps in Control of the Air.",
                                            "Impermanence bites hard: unrefuelled combat jets cannot maintain continuous CAP coverage over the contested coast."
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "control",
                            "strike"
                        ],
                        "title": "Typhoon FGR4 Detachment Damaged on Open Apron",
                        "message": "Enemy artillery rockets bracketed Forward Strip Alpha's unhardened apron, riddling two parked Typhoon FGR4s with shrapnel and degrading frontline fighter availability.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "jfac",
                            "mobility"
                        ],
                        "title": "Ground Fragility Exposed at Forward Operating Strip",
                        "message": "The rocket barrage on Forward Strip Alpha proved Air Power's limitation of Vulnerability on the ground when aircraft operate without Hardened Aircraft Shelters.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "ROCKET STRIKE AT ALPHA — TYPHOON DETACHMENT DAMAGED",
                        "message": "Artillery hits parked jets on Forward Strip Alpha; two Typhoon FGR4s damaged.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Surviving Combat Wing Scrambles Safely to RAF Akrotiri",
                                        "messages": [
                                            "Undamaged Typhoons and F-35Bs launched between rocket salvos and recovered safely into concrete Hardened Aircraft Shelters at RAF Akrotiri.",
                                            "Emergency rebase to RAF Akrotiri saved the remainder of the fighter wing from further artillery attrition."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Emergency Rebase Disrupts Maintenance & Fuel Schedules",
                                        "messages": [
                                            "Abandoning ground support gear at Alpha under fire and recovering damaged airframes to Akrotiri has strained engineering crews and spare parts.",
                                            "Emergency recovery to Cyprus consumed reserve fuel and disrupted planned aircraft maintenance cycles."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Ongoing Shelling Grounds Sorties at Forward Strip Alpha",
                                        "message": "Second-wave rocket impacts scattered debris across Alpha's runway during repairs, pinning combat jets on the ground and degrading Control of the Air.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Ground Crews & Parked Airframes Suffer Heavy Attrition",
                                        "message": "Keeping repair teams and unhardened aircraft on Forward Strip Alpha under observed artillery fire caused severe Force Protection losses.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ALPHA STRIP INOPERABLE — HEAVY AIRFIELD LOSSES",
                                        "message": "Runway repairs disrupted by artillery; forward air operations degraded.",
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
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "control"
                                                ],
                                                "title": "Unidentified Civil Squawk in QRA Intercept Lane",
                                                "messages": [
                                                    "QRA Typhoon radar locks onto a slow-moving contact squawking a commercial transponder code directly inside the active missile engagement zone.",
                                                    "Fighter controllers warn of an unverified airliner track crossing the BVR firing corridor ahead of incoming hostile raiders."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            },
                                            {
                                                "roles": [
                                                    "isr",
                                                    "jfac"
                                                ],
                                                "title": "IFF Desynchronisation Flagged on Civil Airway",
                                                "messages": [
                                                    "E-3D Sentry and civil ATC correlation indicates a commercial flight has strayed off-airway into our Active DCA sector; positive VID is essential.",
                                                    "Watch officers warn that engaging the unidentified radar contact without Visual Identification risks a catastrophic ROE breach."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_fastjet_ambush",
                                        "delayMs": 35000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "control"
                                                ],
                                                "title": "Pop-Up Fast-Jet Contacts Closing on Enabler Orbit",
                                                "messages": [
                                                    "Coastal radar warns of two fast-moving contacts skimming low off the sea behind terrain toward offshore tanker and ISR orbits.",
                                                    "Fighter controllers detect sea-skimming Crimson State interceptors racing toward the high-value support track."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            },
                                            {
                                                "roles": [
                                                    "isr",
                                                    "mobility"
                                                ],
                                                "title": "Hostile Fire-Control RadarSweeps on Rivet Joint & Voyager",
                                                "messages": [
                                                    "Rivet Joint RWR receivers alert that low-altitude hostile fighters are attempting to flank the offshore tanker and ISR orbit.",
                                                    "Defensive warning systems onboard Voyager and Rivet Joint flag hostile fighter radar emissions emerging from coastal terrain masking."
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
                                            "control",
                                            "joint"
                                        ],
                                        "title": "Layered Active DCA Destroys Inbound Missile Salvo",
                                        "messages": [
                                            "Typhoon FGR4 QRA fighters and HMS Duncan's Sea Viper SAMs executed textbook Detection, Interception, and Engagement to splash the incoming cruise missiles offshore.",
                                            "Coordinated RAF QRA fighters and Royal Navy Type 45 air-defence missiles defeated the air raid before it reached RAF Akrotiri."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Full-Salvo Intercept Draws Down Munitions & Avtur",
                                        "messages": [
                                            "RAF Akrotiri escaped damage, though full-afterburner QRA scrambles and multi-missile engagements consumed heavy fuel and air-to-air missile stocks.",
                                            "Defeating the saturation raid preserved base infrastructure at a noticeable cost to air-defence magazine depth and tanker reserves."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ACTIVE DCA ENGAGEMENT — INBOUND RAID INTERCEPTED",
                                        "message": "QRA Typhoons and HMS Duncan Sea Viper batteries defeat main missile salvo.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "control"
                                                ],
                                                "title": "Enemy Fast Jets Exploit Unmanned CAP Sector",
                                                "messages": [
                                                    "With QRA fighters held on the ground, coastal radar detects two hostile fighters popping up at low level toward offshore support aircraft.",
                                                    "Hostile fast jets have exploited the absence of airborne Typhoon CAP to dash toward our offshore orbits."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            },
                                            {
                                                "roles": [
                                                    "isr",
                                                    "mobility"
                                                ],
                                                "title": "Unescorted Tanker & ISR Orbits Under Fast-Jet Threat",
                                                "messages": [
                                                    "Warning sensors pick up sea-skimming Crimson State jets racing unopposed toward the Voyager and Rivet Joint orbit.",
                                                    "Offshore support crews report hostile interceptors closing fast without friendly fighter cover overhead."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_neutral_airliner",
                                        "delayMs": 35000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "control"
                                                ],
                                                "title": "Commercial Track Enters Active Sea Viper SAM Arc",
                                                "messages": [
                                                    "An off-course civil airliner transponder has appeared inside HMS Duncan's Sea Viper radar sector alongside trailing hostile tracks.",
                                                    "Air-defence controllers flag an unidentified commercial radar return crossing directly into the active SAM engagement zone."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            },
                                            {
                                                "roles": [
                                                    "joint",
                                                    "isr"
                                                ],
                                                "title": "Urgent Deconfliction Needed on Civil Airway",
                                                "messages": [
                                                    "Civil air-traffic control reports a commercial jet off-course near HMS Duncan's missile engagement envelope.",
                                                    "ISR watch warns that positive identification is required before engaging tracks along the commercial airway."
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
                                            "mobility"
                                        ],
                                        "title": "Typhoon Avtur & Air-to-Air Missile Stocks Conserved",
                                        "messages": [
                                            "Holding Typhoon QRA flights on the ground preserved fast-jet fuel and air-to-air missile stocks at RAF Akrotiri.",
                                            "Relying on naval SAM defence avoided an expensive fighter scramble and saved aviation fuel reserves."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Low-Level Missile Leakers Penetrate Single-Layer SAM Screen",
                                        "messages": [
                                            "Fighting without airborne Typhoon look-down radar, HMS Duncan's Sea Viper batteries could not catch every terrain-hugging cruise missile, allowing leakers to damage outer base facilities.",
                                            "Skipping fighter interception left a low-altitude radar gap that several hostile cruise missiles exploited."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Late QRA Scramble — Typhoon Detachment Damaged on Apron",
                                        "message": "Delayed scramble orders left QRA fighters taxiing as cruise missiles struck RAF Akrotiri's parking apron, damaging the Typhoon FGR4 detachment.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Active DCA Breakdown Inflicts Severe Base Damage",
                                        "message": "Failing to intercept the inbound raid in time allowed enemy cruise missiles to impact RAF Akrotiri, severely degrading Force Protection and Air Control.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "AIR RAID IMPACT — TYPHOON DETACHMENT DAMAGED AT AKROTIRI",
                                        "message": "Delayed QRA launch allows cruise missile strike on parking apron.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Dispersal, HAS & Decoy CCD Completed Across Akrotiri",
                                        "messages": [
                                            "Ground crews dispersed C-17 and Voyager transports across remote pans, sealed fighters inside Hardened Aircraft Shelters, and erected inflatable CCD decoys.",
                                            "Full Passive DCA—Hardening, Dispersal, and Camouflage, Concealment & Deception—is in place across the airfield."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Air Wing Ground Vulnerability Sharply Reduced",
                                        "messages": [
                                            "Passive DCA measures ensure no single missile hit can knock out multiple combat aircraft on the ground at RAF Akrotiri.",
                                            "Enemy targeting imagery is now confused by dummy decoys while real fighters sit safely inside hardened concrete shelters."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a2_fast_turnaround",
                            "text": "Keep aircraft lined up together on the main tarmac for faster refuelling and quicker flights (One bomb could hit several planes)",
                            "effects": {
                                "scores": {
                                    "sustainability": 1,
                                    "force_protection": -2
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Flight-Line Clustering Speeds Refuelling Turnarounds",
                                        "messages": [
                                            "Parking aircraft nose-to-tail along the main hydrant line cut bowser driving distances and accelerated ground refuelling turnarounds.",
                                            "Centralised apron servicing boosted short-term sortie generation efficiency at RAF Akrotiri."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Abandoned Passive DCA Leaves Wing Vulnerable on Tarmac",
                                        "messages": [
                                            "Skipping Hardened Aircraft Shelters and Dispersal left fragile jets packed together in the open where a single warhead could destroy multiple aircraft.",
                                            "Ignoring Passive DCA principles has critically exposed RAF Akrotiri's parked fleet to shrapnel and blast damage."
                                        ],
                                        "severity": "danger",
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "isr",
                            "control"
                        ],
                        "title": "Counter-UAS Radar Pinpoints Militia Drone Launch Cell",
                        "message": "Low-level radar and electro-optical sensors have located an Insurgent Drone & Mortar Cell launching 15 explosive quadcopters from hills outside RAF Akrotiri.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "jfac",
                            "mobility"
                        ],
                        "title": "Asymmetric Drone Swarm Threatens Bulk Avtur Fuel Farm",
                        "message": "Fifteen low-flying explosive drones are inbound toward RAF Akrotiri's bulk aviation fuel tanks—unlocking the RAF Regiment Perimeter Sweep action.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "ASYMMETRIC THREAT — DRONE CELL DETECTED NEAR AKROTIRI",
                        "message": "Fifteen explosive commercial drones inbound toward aviation fuel tanks; launch site located.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "jfac",
                                            "control"
                                        ],
                                        "title": "RAF Regiment Secures Exterior Footprint",
                                        "messages": [
                                            "Armed RAF Regiment Force Protection teams pushed outside the perimeter wire with counter-UAS jamming rifles, defeating the asymmetric drone swarm.",
                                            "RAF Regiment patrols dominated the ground approaches around RAF Akrotiri, fulfilling the Protect enabler."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Akrotiri Bulk Avtur Fuel Farm Shielded From Impact",
                                        "messages": [
                                            "With RAF Regiment counter-drone teams screening the perimeter, all bulk aviation fuel tanks and bowser yards remained intact and operational.",
                                            "Close-in perimeter defence stopped every explosive quadcopter short of the fuel farm."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint"
                                        ],
                                        "title": "Host-Nation Jurisdiction Respected Outside Base Wire",
                                        "message": "Keeping armed British personnel inside the perimeter fence avoided jurisdiction friction with local civilian authorities.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "mobility",
                                            "control"
                                        ],
                                        "title": "Delayed Police Response Allows Drone Hits on Fuel Pipes",
                                        "message": "While local police patrol cars drove toward the hills, several militia drones slipped across the fence and damaged outer Avtur transfer pipes, slowing ground refuelling.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "mobility"
                                        ],
                                        "title": "Fast-Jet Cannon Passes Miss Low-Flying Quadcopters",
                                        "message": "Supersonic Typhoon 27mm Mauser cannon passes proved completely unsuitable against tiny plastic quadcopters, leaving the fuel farm exposed to drone impacts.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Hillside Strafing Near Homes Sparks Diplomatic Outrage",
                                        "message": "Firing fast-jet cannons near civilian hillside homes outside RAF Akrotiri triggered fierce host-nation and coalition condemnation.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "CIVILIAN RISK ALERT — FAST-JET STRAFE OUTSIDE AKROTIRI",
                                        "message": "Typhoon cannon fire near local homes draws coalition backlash; drone threat unresolved.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Crashed Drones Exploited for Technical Intelligence (TECHINT)",
                                        "messages": [
                                            "ISR technicians recovered intact circuit boards and encrypted radio receivers from the downed drones, yielding valuable TECHINT on militia weapon suppliers.",
                                            "Forensic TECHINT analysis of the crashed quadcopters revealed the exact radio frequencies and GPS modules used by the insurgents."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "control",
                                            "mobility"
                                        ],
                                        "title": "Immediate Electronic Warfare Jamming Downs Swarm",
                                        "messages": [
                                            "Broadband RF jamming severed the drones' command links instantly, dropping the swarm harmlessly outside the fuel compound fence.",
                                            "Electronic Warfare countermeasures neutralised the incoming drones before any warheads reached base infrastructure."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a3_trace_first",
                            "text": "Wait briefly before jamming so we can trace the operators' exact radio network (Better intel, lets a few drones hit outer buildings)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 2,
                                    "force_protection": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Passive Direction-Finding Maps Militia Command Network",
                                        "messages": [
                                            "Monitoring the live uplink before jamming allowed SIGINT teams to triangulate the militia's relay transmitters and hill command nodes.",
                                            "Delayed jamming gave electronic warfare analysts enough signal time to map the entire insurgent drone control network."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Lead Drones Strike Outer Perimeter Structures During Trace",
                                        "messages": [
                                            "Holding back EW jamming for signal tracing allowed three lead drones to impact outer storage sheds before their links were cut.",
                                            "Base workshops suffered light blast damage while defenders waited for ISR to finish direction-finding."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "joint"
                                        ],
                                        "title": "Operation Orchard Cyber Payload Spoofs Enemy IADS",
                                        "messages": [
                                            "An Operation Orchard-style Offensive Air-Cyber intrusion injected false clean-sky telemetry into Crimson State's integrated air-defence network.",
                                            "Offensive Air-Cyber operators seized control of hostile radar repeaters, blinding enemy SAM operators at the critical moment of ingress."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Blind Radar Corridor Opens for OCA Strike Package",
                                        "messages": [
                                            "Hostile fire-control radars remained dark on cockpit RWR displays as UK fighters crossed the coast unchallenged.",
                                            "Air-Cyber suppression silenced coastal tracking radars, allowing OCA strike jets to penetrate the A2AD ring safely."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "OFFENSIVE AIR-CYBER ACTIVE — ENEMY RADARS SPOOFED",
                                        "message": "Operation Orchard-style cyber intrusion blinds Crimson State air-defence picture.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a4_hold_cyber",
                            "text": "Keep our secret cyber access hidden for spying later and rely on jet stealth alone (Higher risk to our pilots)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "force_protection": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Covert Cyber Implant Preserved Inside Enemy C2",
                                        "messages": [
                                            "Keeping our cyber access passive prevented enemy administrators from discovering and patching the implant, sustaining long-term intelligence collection.",
                                            "ISR preserved covert network persistence inside Crimson State's air-defence servers for future eavesdropping."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Strike Package Faces Unsuppressed SAM Radars",
                                        "messages": [
                                            "Without Offensive Air-Cyber blinding, OCA aircrews had to penetrate an active, unjammed SAM radar picture, increasing threat exposure.",
                                            "Cockpit RWR alarms lit up across the ingress route as hostile SAM radars tracked the strike wave without cyber suppression."
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "F-35B & Storm Shadow OCA Shatters Coastal A2AD Shield",
                                        "message": "F-35B Lightnings slipped through radar cover to destroy the pinpointed SA-17 SAM battery while Typhoons cratered the enemy runway with Storm Shadow missiles.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac",
                                            "joint"
                                        ],
                                        "title": "Cross-Track ISR-to-OCA Synergy Achieves Decisive Effect",
                                        "message": "Track B's ISR targeting coordinates enabled Track A's precision stealth OCA strike, demonstrating Network Enabled Capability and cross-domain Joint Action.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "OCA VICTORY — SA-17 BATTERY DESTROYED & RUNWAY CRATERED",
                                        "message": "Cross-track ISR targeting enables F-35B and Typhoon precision strike; A2AD shield broken.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "isr"
                                                ],
                                                "title": "SA-17 Radar Emissions Drop — Relocation Suspected",
                                                "messages": [
                                                    "Rivet Joint reports the damaged SA-17 fire-control radar went abruptly silent alongside vehicle movement signatures near the coastal site.",
                                                    "Post-strike overhead imagery shows heavy dust trails leaving the SA-17 firing position as surviving launchers prepare to displace."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            },
                                            {
                                                "roles": [
                                                    "control",
                                                    "strike"
                                                ],
                                                "title": "Damaged SAM Battery Preparing to Shift Position",
                                                "messages": [
                                                    "Strike BDA confirms the SA-17 battery was damaged rather than destroyed and its surviving launcher vehicles are packing up to relocate.",
                                                    "Aircrews warn that the mobile SA-17 battery is displacing into fresh cover before follow-up strikes arrive."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_fastjet_ambush",
                                        "delayMs": 35000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "control"
                                                ],
                                                "title": "Hostile Interceptors Scrambling Low Behind Ridges",
                                                "messages": [
                                                    "Early warning detects two Crimson State fast jets skimming low beneath radar horizon toward offshore ISR and tanker support tracks.",
                                                    "Flash radar warning: hostile fighters launched from a secondary strip are sneaking sea-skimming toward UK support aircraft."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            },
                                            {
                                                "roles": [
                                                    "isr",
                                                    "mobility"
                                                ],
                                                "title": "Offshore Tanker & Rivet Joint Orbits Threatened",
                                                "messages": [
                                                    "High-value tanker and SIGINT aircraft report hostile fast-jet radar spikes closing rapidly from the coastline.",
                                                    "Crimson State fighters are attempting a low-level ambush against our offshore enabler orbits."
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
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Typhoon OCA Sweep Craters Runway & Damages SA-17",
                                        "messages": [
                                            "Typhoon Storm Shadow and Brimstone attacks cratered enemy runway sections and damaged the SA-17 battery after drawing its radar fire.",
                                            "Conventional OCA sweeps degraded enemy airbase operations and damaged the coastal SAM battery."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac"
                                        ],
                                        "title": "Unpinpointed OCA Sweep Exposes Crews to SAM Fire",
                                        "messages": [
                                            "Attacking before Track B ISR pinpointed the SA-17 forced Typhoons to bait live SAM launches to reveal the site, exposing aircrews to defensive fire.",
                                            "Flying into the A2AD zone without prior ISR targeting coordinates increased airframe risk and left the damaged SAM battery able to relocate."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "OCA SWEEP COMPLETE — SA-17 LOCATED & DAMAGED",
                                        "message": "Typhoon strike degrades coastal SAM threat; aircraft faced contested air defence.",
                                        "severity": "warning",
                                        "aiRandomize": false
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
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "isr",
                                                    "control"
                                                ],
                                                "title": "Untouched Mobile SAM Battery Shifting Position",
                                                "messages": [
                                                    "Sensors detect vehicle convoy noise and brief radar flashes as Crimson State's untouched SA-17 battery prepares to shift firing positions.",
                                                    "Because the coastal SAM ring went unchallenged, ISR notes mobile launcher crews breaking down equipment to relocate."
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
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Stand-Off Launch Keeps Aircrews Clear of SAM Envelope",
                                        "messages": [
                                            "Releasing Storm Shadow cruise missiles from stand-off range kept UK aircraft completely outside the SA-17 engagement zone with zero crew risk.",
                                            "Stand-off missile profiles preserved Force Protection by avoiding entry into defended airspace."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "isr"
                                        ],
                                        "title": "Runway Cratered — Mobile Coastal SAMs Remain Untouched",
                                        "messages": [
                                            "Cruise missiles cratered the main airbase runway, but leaving the mobile SA-17 battery unengaged allows Crimson State's A2AD shield to stay operational.",
                                            "Enemy mobile SAM launchers remain active along the coast because stand-off strikes targeted only fixed runway coordinates."
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike",
                                            "control"
                                        ],
                                        "title": "Brimstone BAI Obliterates Replacement SAM Convoy",
                                        "messages": [
                                            "Typhoons armed with Brimstone and Reaper MQ-9B drones destroyed the replacement SAM launchers on the highway before they could deploy, cementing Control of the Air.",
                                            "Anti-Surface Battlefield Air Interdiction eliminated Crimson State's mobile SAM reinforcements on the move."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Coastal Air Corridor Cleared for Joint Operations",
                                        "messages": [
                                            "Preventing fresh SAMs from reaching the coast has opened safe air corridors for upcoming amphibious landings and Joint Helicopter Command lift.",
                                            "BAI destruction of the SAM resupply column has directly enabled Stage 3 Joint Action along the littoral."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "BAI STRIKE SUCCESSFUL — SAM CONVOY DESTROYED",
                                        "message": "Typhoons and Reaper RPAS eliminate replacement A2AD launchers before deployment.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Convoy Tracking Reveals Inland Logistics Depot",
                                        "messages": [
                                            "Shadowing the resupply trucks with Reaper sensors mapped Crimson State's inland weapons depot and highway dispersal points.",
                                            "ISR successfully logged the enemy's hidden supply route and staging warehouse."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Unattacked Mobile SAMs Disperse Into Coastal Cover",
                                        "messages": [
                                            "Withholding an immediate BAI strike allowed several replacement SAM launchers to peel off the highway and set up concealed firing positions along the coast.",
                                            "New mobile SAM threats are now active in the littoral sector because the resupply convoy was tailed rather than destroyed."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Air Supremacy Achieved Across Theatre",
                                        "message": "With hostile air and SAM forces incapable of effective interference, UK JFAC has attained the highest Degree of Control of the Air: Air Supremacy.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "joint"
                                        ],
                                        "title": "Heavy Air Transports & JHC Helicopters Cleared for Unrestricted Lift",
                                        "message": "Air Supremacy allows A400M, C-17, and Chinook aircraft to fly direct, unescorted routes across the theatre, boosting airlift throughput and sustainability.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "AIR SUPREMACY DECLARED — UNRESTRICTED AIR MOBILITY",
                                        "message": "Enemy unable to mount effective air interference; transport and rotary lift cleared.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a5_superiority",
                            "text": "Declare Air Superiority: Our forces can operate in the area, while keeping fighter escorts with valuable transport planes",
                            "effects": {
                                "scores": {
                                    "force_protection": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Air Superiority Declared Over Operations Area",
                                        "message": "UK JFAC has declared Air Superiority, enabling operations at our chosen time and place without prohibitive enemy air interference.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "joint"
                                        ],
                                        "title": "Escorted Transport Corridors Protect High-Value Lift",
                                        "message": "Retaining Typhoon fighter escorts alongside C-17, A400M, and Voyager sorties ensures strong Force Protection against residual pop-up threats.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_a5_favourable",
                            "text": "Stay at Favourable Air Situation: Expect enemy interference and hold back slow transport planes and helicopters (Slows our ground advance)",
                            "effects": {
                                "scores": {
                                    "sustainability": -1,
                                    "joint_effect": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "Cautious Favourable Air Situation Posture Maintained",
                                        "message": "Keeping the theatre classification at a local Favourable Air Situation restricts non-stealth aircraft from entering contested coastal sectors.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Held-Back Transports & Helicopters Slow Joint Advance",
                                        "message": "Restricting slow A400M transports and JHC Chinooks due to lingering air-threat warnings has bottlenecked forward resupply and slowed land manoeuvre.",
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
                                        "probability": 0.6,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "isr",
                                                    "jfac"
                                                ],
                                                "title": "SIGINT Intercept on Port Highway",
                                                "messages": [
                                                    "Rivet Joint has picked up unencrypted radio bursts from a fast-moving military truck column leaving the coastal port district.",
                                                    "Electronic eavesdropping flags suspicious VHF convoy traffic heading toward the coastal SAM belt."
                                                ],
                                                "severity": "info",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_osint_fake_video",
                                        "delayMs": 35000,
                                        "probability": 0.25,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "joint",
                                                    "isr"
                                                ],
                                                "title": "Hostile Social Media Bot Surge",
                                                "messages": [
                                                    "Open-source monitoring detects coordinated militia accounts pushing suspicious video clips across regional news feeds.",
                                                    "OSINT analysts warn that adversary disinformation channels are amplifying doctored air-strike claims online."
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
                                            "isr"
                                        ],
                                        "title": "OSINT, FININT & HUMINT Fusion Uncovers Smuggling Ring",
                                        "messages": [
                                            "Cross-checking OSINT port videos, FININT bank transfer trails, and HUMINT dock informants exposed the entire non-state missile-smuggling network.",
                                            "All-source intelligence fusion identified the exact shipping containers and front companies moving SAM components ashore."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac",
                                            "strike"
                                        ],
                                        "title": "Actionable Non-State Target Dossiers Delivered to JFAC",
                                        "messages": [
                                            "No 1 ISR Wing's multi-INT breakthrough has provided verified targeting and financial leads across the coastal insurgency.",
                                            "Command and Strike cells now hold high-confidence intelligence on militia logistics routes and coastal staging hubs."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "joint",
                                                    "isr"
                                                ],
                                                "title": "Adversary Disinformation Activity Spikes",
                                                "messages": [
                                                    "Without human or open-source context on the ground, hostile media channels are circulating unverified claims about coalition air activity.",
                                                    "OSINT monitors flag a sudden wave of coordinated propaganda posts targeting coalition public opinion."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_sigint_convoy",
                                        "delayMs": 35000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "isr",
                                                    "jfac"
                                                ],
                                                "title": "Unidentified Radio Traffic Inland",
                                                "messages": [
                                                    "Airborne SIGINT sensors log brief encrypted-to-clear radio handoffs along the inland road network leaving the port.",
                                                    "Rivet Joint detects logistics convoy chatter moving away from the harbour warehouses toward coastal firing sites."
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
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Stand-Off Satellite Collection Reassures Local Partners",
                                        "messages": [
                                            "Avoiding risky dockside agent operations protected local informants and pleased host-nation and coalition authorities.",
                                            "Non-intrusive satellite GEOINT collection maintained strong diplomatic goodwill across the port city."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Overhead GEOINT Alone Misses Covered Containers & Finance",
                                        "messages": [
                                            "Satellite photos tracked truck convoys leaving the docks, but without HUMINT or FININT analysts cannot see inside covered containers or trace militia bank accounts.",
                                            "Relying on overhead imagery alone left blind spots on which shipping crates hold smuggled SAM components."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Pre-Launch Intelligence Trail Lost at Civilian Port",
                                        "message": "Skipping early OSINT, HUMINT, and FININT collection allowed the smuggled missile parts to disappear inland before sensors began tracking.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Unwarned Aircrews Face Pop-Up Missile Ambush Risk",
                                        "message": "Forfeiting early warning means friendly aircraft will only discover the smuggled SAMs when hostile targeting radars lock onto them in flight.",
                                        "severity": "danger",
                                        "aiRandomize": false
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Allied Treasury Freeze Cripples Militia Smuggling Funds",
                                        "messages": [
                                            "Coordinated Economic and Diplomatic action with coalition finance ministries froze the militia's front-company bank accounts under the Full Spectrum Approach.",
                                            "International sanctions teams used UK intelligence leads to shut down insurgent weapons-procurement accounts."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "FININT Sharing Unlocks Reciprocal Coalition Intelligence",
                                        "messages": [
                                            "Sharing financial tracking leads with allied intelligence services prompted partners to open their own regional shipping databases to No 1 ISR Wing.",
                                            "Allied FININT analysts corroborated our port smuggling map and disrupted follow-on arms shipments."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b1_uk_eyes_only",
                            "text": "Keep FININT strictly UK-only to protect our secret tracking methods (Keeps intel secure, reduces allied action)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1,
                                    "coalition_support": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Covert FININT Access Preserved for UK Analysts",
                                        "message": "Keeping financial intelligence UK-Eyes-Only prevented leaks and allowed analysts to keep monitoring clandestine militia bank transfers.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Allied Partners Frustrated by Withheld Financial Leads",
                                        "message": "Refusing to share FININT left European and regional banking regulators unable to freeze overseas militia accounts, straining coalition goodwill.",
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
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "isr"
                                                ],
                                                "title": "Interference on Reaper Ku-Band Satlink",
                                                "messages": [
                                                    "Ground control at RAF Waddington reports high-power spoofing packets hitting the Reaper MQ-9B satellite command uplink.",
                                                    "Telemetry warning: hostile cyber-EW jamming is attempting to inject unauthorized commands into the Reaper RPAS control link."
                                                ],
                                                "severity": "danger",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_sigint_convoy",
                                        "delayMs": 35000,
                                        "probability": 0.3,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "isr",
                                                    "jfac"
                                                ],
                                                "title": "Rivet Joint Flags Resupply Radio Net",
                                                "messages": [
                                                    "While scanning for SAM radar bursts, RC-135W operators intercepted clear-voice traffic from an inland missile reload convoy.",
                                                    "SIGINT receivers picked up logistics dispatch calls directing a munitions truck column toward the coastal SAM sector."
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
                                            "isr",
                                            "jfac"
                                        ],
                                        "title": "9-Step ISR Cycle Pinpoints SA-17 Battery & Command Villa",
                                        "message": "RC-135W Rivet Joint wide-area Surveillance (SIGINT/MASINT) cued Reaper MQ-9B and Shadow R1 Reconnaissance (GEOINT) to unmask both the Hostile SA-17 SAM Battery and the Enemy Radar Code & Command Villa.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "mobility"
                                        ],
                                        "title": "Precision Stealth OCA & Special Forces Raid Targets Unlocked",
                                        "message": "Live coordinates from No 1 ISR Wing have unlocked Precision Stealth OCA against the SA-17 battery and Special Forces Air Insertion against the coastal command villa.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ISR BREAKTHROUGH — SA-17 SAM & COMMAND VILLA LOCATED",
                                        "message": "No 1 ISR Wing cross-cues Rivet Joint, Reaper, and Shadow R1; Precision OCA unlocked.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                        "probability": 0.65,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "isr"
                                                ],
                                                "title": "Solo Reaper Targeted by Uplink Jammer",
                                                "messages": [
                                                    "Flying deep without Rivet Joint electronic support, the Reaper MQ-9B's satellite command link is being hammered by hostile spoofing signals.",
                                                    "RAF Waddington alerts that adversary cyber-EW teams have locked onto the unescorted Reaper RPAS satellite uplink."
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
                                            "control",
                                            "strike"
                                        ],
                                        "title": "SA-17 SAM Battery Located for OCA Targeting",
                                        "messages": [
                                            "Reaper MQ-9B optical cameras eventually located the Hostile SA-17 SAM Battery on the coast, unlocking Precision Stealth OCA.",
                                            "Visual reconnaissance confirmed the SA-17 firing site coordinates for Track A strike planners."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Solo Visual Search Misses Command Villa & Exposes RPAS",
                                        "messages": [
                                            "Searching by camera alone without Rivet Joint SIGINT cues missed the hidden Enemy Command Villa and drew anti-aircraft fire against the low-flying Reaper.",
                                            "Skipping wide-area electronic Surveillance left the enemy radar code compound undiscovered and placed the unescorted drone at risk."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac"
                                        ],
                                        "title": "Link-16 NEC Disseminates Sensor Tracks in Real Time",
                                        "messages": [
                                            "No 1 ISR Wing feeds are streaming across Link-16 Network Enabled Capability—delivering the right information to the right place at the right time.",
                                            "Automated Link-16 dissemination linked RAF Waddington analysts directly with theatre command nodes."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "joint"
                                        ],
                                        "title": "Live Target Symbols Populate Fighter Cockpits & HMS Duncan",
                                        "messages": [
                                            "Typhoon and F-35B multifunction displays and HMS Duncan's operations room now share a live targeting picture for immediate engagement.",
                                            "Shooters across air and maritime domains received instant sensor-to-shooter cueing via Link-16."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b2_manual_vetting",
                            "text": "Send reports back to UK HQ for slow manual checking before briefing pilots (Reduces mistakes, but mobile SAMs can drive away)",
                            "effects": {
                                "scores": {
                                    "coalition_support": 1,
                                    "joint_effect": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Manual Legal & HQ Vetting Reassures Coalition Observers",
                                        "message": "Double-checking every ISR target folder through headquarters legal review satisfied cautious coalition oversight committees.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "strike",
                                            "control"
                                        ],
                                        "title": "Slow Manual Dissemination Delays Sensor-to-Shooter Loop",
                                        "message": "Holding back live Link-16 tracks for manual paperwork broke Network Enabled Capability speed, leaving pilots waiting while mobile targets shifted.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "joint",
                                            "control"
                                        ],
                                        "title": "90 Signals Unit Isolates Breach & Re-Keys Link-16",
                                        "messages": [
                                            "90 Signals Unit and National Cyber Force specialists severed the compromised weather server and rolled Link-16 onto clean crypto keys, protecting the Connect enabler.",
                                            "Defensive Air-Cyber lockdown stopped the malware before false tracks could corrupt cockpit radar screens."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Offline Flight-Planning Terminals Slow Sortie Turnarounds",
                                        "messages": [
                                            "Taking weather and Air Tasking terminals offline for re-keying forced ground crews onto manual flight-plan sheets, slowing aircraft turnarounds.",
                                            "Cryptographic rollover across RAF Akrotiri briefly delayed transport and tanker dispatch paperwork."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Cyber Honeypot Traces Adversary Hackers to Command Node",
                                        "messages": [
                                            "Monitoring the hackers inside a sandboxed honeypot allowed cyber analysts to map Crimson State's offensive cyber unit and server infrastructure.",
                                            "Defensive Air-Cyber deception harvested high-value cyber intelligence on adversary attack tools."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Live Honeypot Connection Risks Link-16 Spoofing",
                                        "messages": [
                                            "Keeping the compromised terminal connected for counter-tracing exposed RAF Akrotiri's tactical data network to potential false radar track injection.",
                                            "Air defence controllers warn that leaving the intruder session active carries a high risk of Link-16 corruption."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac"
                                        ],
                                        "title": "AWACS Encrypted Voice Procedures Prevent Blue-on-Blue",
                                        "messages": [
                                            "Switching to encrypted UHF/VHF voice radio control from E-3D Sentry AWACS kept pilots safe while 90 Signals Unit purged fake Link-16 tracks.",
                                            "Manual voice deconfliction protected airborne patrols from chasing spoofed digital ghost contacts."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Voice-Only Intercept Vectors Slow Fighter Reaction Speed",
                                        "messages": [
                                            "Operating without digital Link-16 datalink displays slowed fighter intercept cueing and reduced Control of the Air responsiveness.",
                                            "Manual radio bearings took far longer than automated Link-16 target sharing across the CAP sector."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b3b_ground_pause",
                            "text": "Pause attack flights for 20 minutes to perform a clean full-network cyber reset (Zero friendly-fire risk, slows our advance)",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "sustainability": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "isr"
                                        ],
                                        "title": "20-Minute Cyber Reset Restores Clean Link-16 Picture",
                                        "message": "Holding offensive flights for twenty minutes allowed 90 Signals Unit to scrub every spoofed contact from Link-16 with zero friendly-fire risk.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Airborne Holding Orbits Burn Extra Voyager Tanker Fuel",
                                        "message": "Stacking airborne strike packages in holding patterns during the 20-minute network reset drained extra Voyager Air-to-Air Refuelling fuel.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Zephyr at 70,000ft Overcomes ISR Impermanence",
                                        "messages": [
                                            "Orbiting in the stratosphere at 70,000ft, the solar-powered Zephyr uses Height and Perspective to peer straight into deep mountain gorges while Shadow R1 aircraft verify targets.",
                                            "Zephyr high-altitude endurance paired with Shadow R1 reconnaissance has eliminated mountain blind spots for weeks without fuel burn."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "jfac"
                                        ],
                                        "title": "Deep Valley Mobile Launchers Exposed for Targeting",
                                        "messages": [
                                            "High-altitude look-down imagery from 70,000ft has unmasked Crimson State mobile launchers and helicopters hiding behind mountain ridges.",
                                            "Stratospheric ISR sensors are feeding live valley target tracks into UK JFAC's targeting cell."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Shadow R1 & Reaper Relays Maintain Valley Surveillance",
                                        "messages": [
                                            "Back-to-back Shadow R1 and Reaper MQ-9B shifts kept electro-optical cameras trained on the mountain valleys.",
                                            "Continuous manned and RPAS handovers preserved visual coverage across the inland ridges."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Impermanence Strains Akrotiri Fuel & Engineering Shifts",
                                        "messages": [
                                            "Because conventional aircraft cannot stay aloft indefinitely, non-stop relief flights burned extra fuel and maintenance hours at RAF Akrotiri.",
                                            "Cycling manned Shadow R1 turboprops around the clock increased flight-line engineering strain."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "E-3D Sentry AEW1 Directs Low-Altitude Fighter Intercepts",
                                        "messages": [
                                            "Using Height and Perspective from high altitude, E-3D Sentry AEW1 look-down radar detected hostile helicopters skimming behind cliffs and vectored CAP fighters onto them.",
                                            "AWACS airborne battle managers have closed the low-level radar gaps along the coast."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "joint"
                                        ],
                                        "title": "Over-the-Ridge Radar Picture Shared With HMS Duncan",
                                        "messages": [
                                            "E-3D Sentry's elevated radar horizon now feeds valley air tracks over the mountains straight to HMS Duncan and No 1 ISR Wing.",
                                            "Airborne Early Warning radar has overcome sea-level terrain masking across the littoral mountains."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_b4_ship_radar",
                            "text": "Rely only on HMS Duncan's ship radar at sea level to save flying hours (Blocked by the coastal mountains)",
                            "effects": {
                                "scores": {
                                    "air_control": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "joint"
                                        ],
                                        "title": "Sea-Level Radar Blocked by Coastal Ridges",
                                        "message": "Relying on HMS Duncan's surface radar alone left deep terrain shadows behind the coastal cliffs, allowing low-flying hostile aircraft to slip through unseen.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "C-17 & A400M Inter-Theatre Airbridge Established",
                                        "messages": [
                                            "C-17 Globemasters (4,500nm) and A400M Atlases (4,100nm) are running a non-stop 2,000-mile Hub & Spoke airbridge from RAF Brize Norton to RAF Akrotiri.",
                                            "Outsized cargo, rotary-wing airframes, and munitions pallets are flowing steadily into the Cyprus Spoke."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "jfac"
                                        ],
                                        "title": "Voyager Fleet Dedicated to Combat Air-to-Air Refuelling",
                                        "messages": [
                                            "Using C-17 and A400M transports for heavy cargo freed the Voyager KC2/KC3 fleet to focus exclusively on offshore Air-to-Air Refuelling for combat jets.",
                                            "Frontline fighter squadrons enjoy full Voyager tanker support thanks to disciplined Hub & Spoke fleet allocation."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "HUB & SPOKE AIRBRIDGE ACTIVE — BRIZE NORTON TO AKROTIRI",
                                        "message": "C-17 Globemaster and A400M Atlas Inter-Theatre lift running at full capacity.",
                                        "severity": "info",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "mobility"
                                        ],
                                        "title": "Voyager Trooping Flights Accelerate Joint Deployment",
                                        "messages": [
                                            "Re-roling Voyager aircraft as long-range passenger transports delivered joint headquarters and support troops into RAF Akrotiri ahead of schedule.",
                                            "Rapid passenger airlift from RAF Brize Norton rushed joint personnel into theatre."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Diverted Voyagers Leave Fighter Patrols Short of Tanker Fuel",
                                        "messages": [
                                            "Pulling Voyager KC2/KC3 aircraft off offshore refuelling towlines for passenger flights cut fighter loiter time and weakened Control of the Air.",
                                            "Combat squadrons face severe Air-to-Air Refuelling shortages while Voyager tankers haul cargo and passengers."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "RAF Regiment & Air Logistics Harden Akrotiri Spoke",
                                        "messages": [
                                            "Lead C-17 chalks delivered RAF Regiment Force Protection squadrons (Protect) and Air Logistics teams (Sustain), securing the forward Spoke base.",
                                            "Prioritising the Four Enablers established robust perimeter defence and supply handling at RAF Akrotiri."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "control"
                                        ],
                                        "title": "90 Signals Unit Establishes High-Bandwidth Connect Node",
                                        "messages": [
                                            "Early arrival of 90 Signals Unit engineers (Connect) brought encrypted Link-16 and satellite communications online across the theatre.",
                                            "RAF Signals specialists have hardened Akrotiri's C2 and ISR data links from the outset."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c1_munitions_first",
                            "text": "Pack Storm Shadow cruise missiles first and delay base guards and signals teams until later flights (More weapons early, leaves base unguarded)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -2
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Deep Storm Shadow & Meteor Magazines Stocked Early",
                                        "message": "Packing lead C-17 flights with Storm Shadow and air-to-air missiles gave Typhoon and F-35B squadrons deep offensive weapon stocks from day one.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Delayed RAF Regiment & 90 SU Leave Akrotiri Exposed",
                                        "message": "Bump-listing RAF Regiment guards (Protect) and 90 Signals Unit teams (Connect) to later chalks left RAF Akrotiri's perimeter and comms dangerously vulnerable.",
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "strike",
                            "isr"
                        ],
                        "title": "Sonobuoy Barrier Pinpoints Submerged Kilo Submarine",
                        "message": "Acoustic sonobuoys and maritime radar have unmasked a Hostile Kilo-Class Submarine and three fast missile gunboats approaching HMS Duncan.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac",
                            "mobility"
                        ],
                        "title": "Sea Lanes & HMS Duncan Threatened by Naval Ambush",
                        "message": "Crimson State subsurface and surface raiders are attempting to sever our Eastern Mediterranean sea supply lines; urgent Air-Maritime Integration is required.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "MARITIME THREAT — HOSTILE KILO SUBMARINE & GUNBOATS DETECTED",
                        "message": "Sonar contact confirmed near HMS Duncan patrol sector; Counter-Sea ASW/ASuW required.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
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
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "strike",
                                                    "joint"
                                                ],
                                                "title": "Secondary Acoustic Echo Below Thermal Layer",
                                                "messages": [
                                                    "Poseidon sonobuoys report a sharp temperature gradient masking underwater acoustics along the edge of the engagement box.",
                                                    "Active sonar operators flag a deep thermal inversion layer where a surviving submarine contact may be attempting to slip away."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_voyager_ew_jam",
                                        "delayMs": 35000,
                                        "probability": 0.45,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "mobility",
                                                    "control"
                                                ],
                                                "title": "Naval EW Interference Near Offshore Tanker Track",
                                                "messages": [
                                                    "Voyager crew reports heavy broadband noise from coastal maritime emitters interfering with TACAN refuelling beacons.",
                                                    "Electronic jamming from the seaward sector has begun disrupting navigation signals along the offshore Air-to-Air Refuelling towline."
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
                                            "strike"
                                        ],
                                        "title": "P-8A Poseidon ASW & RN Wildcat ASuW Destroy Raiders",
                                        "message": "RAF P-8A Poseidon MRA1 dropped active sonobuoys and Sting Ray torpedoes to sink the Hostile Kilo-Class Submarine (ASW) while RN Wildcat helicopters crippled the fast missile gunboats (ASuW).",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Air-Maritime Integration Secures HMS Duncan & Sea Lanes",
                                        "message": "Seamless Counter-Sea teamwork between RAF Lossiemouth's Poseidon and the Royal Navy protected HMS Duncan and kept our Eastern Mediterranean maritime supply corridor open.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "COUNTER-SEA VICTORY — KILO SUBMARINE & GUNBOATS NEUTRALISED",
                                        "message": "P-8A Poseidon ASW and RN Wildcat ASuW clear Eastern Mediterranean sea lane.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                        "probability": 0.7,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "strike",
                                                    "joint"
                                                ],
                                                "title": "Submarine Contact Fading Beneath Thermal Layer",
                                                "messages": [
                                                    "Without airborne sonobuoy barriers from P-8A Poseidon, HMS Duncan reports the Kilo-class submarine diving deep beneath a thermal layer.",
                                                    "Hull sonar contact is breaking up as the unengaged hostile submarine slips deeper below the Eastern Mediterranean thermocline."
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
                                            "strike",
                                            "joint"
                                        ],
                                        "title": "Surface Gunboats Driven Off — Unprosecuted Kilo Sub Escapes",
                                        "messages": [
                                            "Fast jets disabled the surface missile boats, but without P-8A Poseidon airborne sonobuoys HMS Duncan could not pin down the submerged Kilo-class submarine.",
                                            "Anti-Surface strikes succeeded, yet skipping airborne ASW left the hostile submarine free to threaten our sea lanes."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Pulling Typhoons Off CAP Weakens Air Defence Umbrella",
                                        "messages": [
                                            "Diverting Typhoon FGR4 flights from high-altitude CAP to attack surface gunboats left a gap in Control of the Air patrols.",
                                            "Re-tasking air-defence fighters to maritime surface patrol degraded theatre CAP coverage and Force Protection."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Air-Maritime Integration Links Type 45 & Maritime Patrol Air",
                                        "messages": [
                                            "HMS Duncan's operations room and RAF P-8A Poseidon are fighting off one shared Link-16 surface and subsurface picture.",
                                            "Real-time Air-Maritime Integration (AMI) has united Royal Navy and RAF sensors across the Eastern Mediterranean."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "isr"
                                        ],
                                        "title": "Poseidon Sonobuoy Telemetry Feeds Naval Fire Control",
                                        "messages": [
                                            "Live acoustic sonobuoy tracks from the P-8A Poseidon are streaming directly via Link-16 to cue RN Wildcat and shipboard weapons.",
                                            "Fused air-sea sensor data eliminated blind spots around the naval task group."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c2_separate_boxes",
                            "text": "Give the RAF plane and the Royal Navy warship separate search zones without live data sharing (Leaves radar gaps)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1,
                                    "force_protection": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Siloed RAF & Royal Navy Boxes Break Air-Maritime Integration",
                                        "message": "Operating P-8A Poseidon and HMS Duncan in isolated patrol boxes without live Link-16 sharing undermined Air-Maritime Integration.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "isr"
                                        ],
                                        "title": "Unshared Sonar Seams Leave Warship Exposed to Torpedo Ambush",
                                        "message": "Because sonar and radar contacts were not cross-linked between plane and ship, hostile maritime raiders slipped along the boundary between search zones.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
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
                                        "probability": 0.5,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "mobility",
                                                    "joint"
                                                ],
                                                "title": "Diplomatic Query on Transport Overflight",
                                                "messages": [
                                                    "Regional air traffic control has issued a sudden query delaying clearance for heavy C-17 flights transiting from RAF Brize Norton.",
                                                    "Foreign ministry channels report a neighbouring state reviewing military overflight permissions along our Hub & Spoke route."
                                                ],
                                                "severity": "warning",
                                                "aiRandomize": true
                                            }
                                        ]
                                    },
                                    {
                                        "id": "ev_wc_voyager_ew_jam",
                                        "delayMs": 32000,
                                        "probability": 0.35,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "mobility",
                                                    "control"
                                                ],
                                                "title": "Jamming Spikes Near Backup Voyager Track",
                                                "messages": [
                                                    "The newly scrambled Voyager tanker reports strong coastal electronic interference on its refuelling rendezvous frequency.",
                                                    "EW receivers warn of hostile jamming beams sweeping across the offshore Air-to-Air Refuelling towline."
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
                                            "mobility"
                                        ],
                                        "title": "Standby Voyager KC3 Scrambled on Emergency AAR Relay",
                                        "messages": [
                                            "Mobility launched the standby Voyager tanker in an Operation Black Buck-style relay, restoring full offshore Air-to-Air Refuelling capacity.",
                                            "Emergency tanker launch procedures at RAF Akrotiri placed a fresh Voyager on the towline in record time."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "jfac"
                                        ],
                                        "title": "Priority Tanker Plugs Keep CAP & Strike Packages Airborne",
                                        "messages": [
                                            "Low-fuel Typhoons and returning F-35Bs plugged into the relief Voyager's drogues, overcoming Impermanence and maintaining uninterrupted air patrols.",
                                            "Combat squadrons topped up fuel tanks offshore without breaking Control of the Air coverage."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                        "probability": 0.55,
                                        "outcomeMessages": [
                                            {
                                                "roles": [
                                                    "mobility",
                                                    "joint"
                                                ],
                                                "title": "Airway Clearance Hold on UK Transports",
                                                "messages": [
                                                    "A regional partner's civil aviation authority has flagged potential airspace restrictions along the Brize Norton transport corridor.",
                                                    "Diplomatic cables warn of an impending overflight dispute affecting heavy transport flights bound for Akrotiri."
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
                                            "mobility",
                                            "control"
                                        ],
                                        "title": "Early Recall Recovers All Combat Jets on Reserve Fuel",
                                        "messages": [
                                            "Recalling airborne fighters immediately ensured every Typhoon and F-35B landed at RAF Akrotiri with safe fuel reserves.",
                                            "Conservative fuel management prevented any in-flight fuel emergencies while engineers repaired the Voyager."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Aborted Strike Wave Hands Tactical Breathing Room to Enemy",
                                        "messages": [
                                            "Pulling strike jets off target due to Impermanence and lack of AAR left ground and maritime forces without scheduled air support.",
                                            "Pausing offensive air attacks allowed Crimson State units along the coast to regroup unchallenged."
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
                    "role": "jfac",
                    "text": "What flying orders do you give our airborne Typhoons while the backup tanker climbs to height?",
                    "options": [
                        {
                            "id": "opt_c3_econ_cruise",
                            "text": "Slow to fuel-saving cruise speed at high altitude and take turns patrolling",
                            "effects": {
                                "scores": {
                                    "sustainability": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "jfac",
                                            "control",
                                            "mobility"
                                        ],
                                        "title": "High-Altitude Economy Cruise Stretches Fighter Endurance",
                                        "messages": [
                                            "Ordering Typhoons to high-altitude economy cruise and staggered patrol turns stretched onboard fuel endurance until the backup Voyager reached station.",
                                            "Fuel-saving flight profiles at altitude cut jet fuel burn significantly, buying vital time for tanker rendezvous."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_c3_afterburner_show",
                            "text": "Keep fighters flying low on full afterburner to intimidate the enemy (Burns fuel rapidly, drains reserves)",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "sustainability": -2
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "Low-Level Supersonic Passes Intimidate Hostile Aircrews",
                                        "message": "Aggressive low-level afterburner patrols deterred enemy pilots from challenging our coastal CAP sector.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Full-Reheat Fuel Burn Critically Depletes Tanker Reserves",
                                        "message": "Flying low on full afterburner burned through Avtur at four times normal cruise rate, draining emergency Voyager tanker reserves.",
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "mobility"
                        ],
                        "title": "A400M Humanitarian Air-Drop Tasking Unlocked",
                        "message": "Advance scouts have identified the drop-zone coordinates for 4,000 cut-off civilians on the coast; A400M Atlas crews at RAF Akrotiri can now execute the Humanitarian Aid Air-Drop action.",
                        "severity": "info",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac"
                        ],
                        "title": "4,000 Displaced Civilians Appeal for Humanitarian Relief",
                        "message": "UN and coalition monitors report 4,000 civilians cut off from road links in a coastal town, creating a high-visibility Humanitarian Operations opportunity.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "HUMANITARIAN ALERT — 4,000 CIVILIANS CUT OFF ON COAST",
                        "message": "Refugee town identified on tactical map; A400M Humanitarian Aid Air-Drop available.",
                        "severity": "info",
                        "aiRandomize": false
                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Textbook Air-Drop to Air-Land Sequence Opens Objective Talon",
                                        "message": "A400M and C-130J crews Air-Dropped paratroopers and Royal Engineers to repair the craters before transitioning to heavy fixed-wing Air-Land deliveries.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "JHC Chinooks & Pumas Deliver Artillery Into Mountain Pass",
                                        "message": "Operating from Objective Talon, Joint Helicopter Command Chinooks carried underslung 105mm Light Guns and Puma HC2s lifted troops onto the commanding mountain ridge.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "OBJECTIVE TALON SECURED — AIR-DROP TO AIR-LAND & JHC LIFT",
                                        "message": "Paratroopers repair desert strip; Chinooks and Pumas lift artillery into mountain pass.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Parachute Drop Risk Avoided at Objective Talon",
                                        "messages": [
                                            "Bypassing the contested desert strip avoided exposing paratroopers and fixed-wing transports to landing-zone hazards.",
                                            "Helicopter transit kept airborne forces away from the mined airstrip perimeter."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Long-Range Rotary Hauls Exhaust JHC Chinook & Puma Fleet",
                                        "messages": [
                                            "Using Intra-Theatre Chinook and Puma helicopters for long-haul supply runs without a forward Air-Land runway severely overtaxed rotor-blade hours and fuel.",
                                            "Skipping fixed-wing Air-Land staging overloaded Joint Helicopter Command maintenance crews."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "C-17 Globemaster Suffers Undercarriage Damage on Cratered Strip",
                                        "message": "Attempting an immediate Air-Land onto an unrepaired runway blew main-gear tyres and damaged a C-17 Globemaster, fouling Objective Talon.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Blocked Forward Runway Stalls Mountain Artillery Deployment",
                                        "message": "With the disabled C-17 blocking Objective Talon, forward logistics and Force Protection teams are stranded in the open desert.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "AIR-LAND MISHAP — C-17 DAMAGED ON CRATERED RUNWAY",
                                        "message": "Heavy transport attempted landing before Air-Drop engineer repair; strip blocked.",
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility",
                                            "control"
                                        ],
                                        "title": "Exercise Volfa Combat Recovery Package Extracts Downed Pilot",
                                        "message": "An armed JHC Chinook carrying RAF Regiment Force Protection teams and escorted by Typhoons extracted the downed pilot safely from hostile territory.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "3-Tier Aeromedical Evacuation Chain Moves All Six Casualties",
                                        "message": "Forward MERT Puma/Chinook helicopters, Tactical A400M transport, and Strategic C-17 flights back to the UK delivered golden-hour care, uplifting coalition morale.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "COMBAT RECOVERY & 3-TIER MEDEVAC COMPLETE",
                                        "message": "Downed pilot extracted under fighter escort; wounded moved via Forward, Tactical, and Strategic Medevac.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Unescorted Helicopter Launches Under Peacetime SAR Rules",
                                        "messages": [
                                            "Launching a lone rescue helicopter without waiting for ground suppression teams shaved ten minutes off transit time, but ignored Combat Recovery doctrine.",
                                            "The unescorted helicopter crew is descending into the hostile valley without armed protection."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Unprotected SAR Flight Enters Active MANPADS Ambush Zone",
                                        "messages": [
                                            "Flying into enemy-held hills without Typhoon fighter escort or RESCORT suppression has exposed the rescue helicopter to severe MANPADS threat.",
                                            "Air defence controllers warn of hostile infantry with shoulder-fired missiles converging on the unescorted pickup beacon."
                                        ],
                                        "severity": "danger",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Night CSAR & Forward MERT Held Until First Light",
                                        "message": "Standing orders held JHC helicopters back until dawn, leaving the downed pilot evading capture overnight and delaying Forward Medevac pickup.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Delayed Casualty Evacuation Erodes Frontline & Allied Morale",
                                        "message": "Coalition ground commanders protested the overnight delay in evacuating wounded troops from the ridge aid post.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility",
                                            "strike",
                                            "joint"
                                        ],
                                        "title": "Emergency Typhoon CAS Suppresses Ambush — Pilot Extracted",
                                        "messages": [
                                            "Low-level Typhoon strafing and flare dumps pinned down the MANPADS team, allowing the rescue helicopter to hoist the downed pilot to safety.",
                                            "Emergency Close Air Support saved both the rescue helicopter and the downed aircrew."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Emergency CAP Diversion Leaves High-Altitude Airway Uncovered",
                                        "messages": [
                                            "Pulling Typhoons off their high-altitude Combat Air Patrol station for emergency valley CAS temporarily thinned theatre Control of the Air.",
                                            "Diverting CAP fighters into the valley rescued the crew at the cost of outer air-defence patrol coverage."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_csar_abort",
                            "text": "Order the helicopter to abort to save its crew, leaving the downed pilot behind enemy lines",
                            "effects": {
                                "scores": {
                                    "force_protection": -2,
                                    "coalition_support": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility",
                                            "control"
                                        ],
                                        "title": "Rescue Helicopter Aborts Pickup Under Heavy MANPADS Fire",
                                        "message": "Popping flares and jinking low through the gorge, the unescorted rescue helicopter broke off the hover to avoid being shot down, leaving the downed pilot behind.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "joint"
                                        ],
                                        "title": "Failed Personnel Recovery Deals Blow to Aircrew & Allied Confidence",
                                        "message": "Leaving a downed pilot isolated behind enemy lines after a flawed Peacetime SAR attempt shook squadron morale and coalition confidence.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "CSAR ABORTED UNDER FIRE — DOWNED PILOT ISOLATED",
                                        "message": "Unescorted helicopter driven off by MANPADS ambush; recovery failed.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Multi-Role Typhoons Dash 100 Miles at Mach 1.6 to Strike Pad",
                                        "message": "Switching in flight from air-defence swing-role to precision Brimstone attack, the Typhoons covered 100 miles in six minutes and disabled the command helicopter before liftoff.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "isr",
                                            "joint"
                                        ],
                                        "title": "Link-16 Dynamic Re-Tasking Proves Speed, Reach & Agility",
                                        "message": "Fusing Track B Zephyr/Reaper ISR with instant Link-16 C2 neutralised Crimson State's coastal commander—proving Air Power's unmatched Speed, Reach, Agility, and Flexibility.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "DYNAMIC RE-TASK SUCCESS — COMMAND HELICOPTER STOPPED",
                                        "message": "Multi-role Typhoons cover 100 miles in under 8 minutes to strike time-critical target.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "Typhoon CAP Remains Unbroken on Coastal Barrier",
                                        "messages": [
                                            "Keeping both multi-role Typhoons on their assigned air-defence orbit preserved continuous CAP coverage along the coast.",
                                            "Refusing to divert the fast jets kept defensive counter-air patrols intact."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "strike",
                                            "isr"
                                        ],
                                        "title": "Turboprop Reaper Arrives Too Late — Enemy Commander Escapes",
                                        "messages": [
                                            "At 200 knots, the Reaper MQ-9B could not cover 100 miles inside the 8-minute window; Crimson State's coastal commander lifted off and escaped inland.",
                                            "Failing to exploit fast-jet Speed and multi-role Flexibility allowed the high-value target to slip away."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Fleeting 8-Minute Target Track Lost Inland",
                                        "message": "Zephyr and Reaper sensors watched the armoured helicopter lift off and disappear into low valley cloud before strike authority arrived.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "strike",
                                            "joint"
                                        ],
                                        "title": "Command Indecision Forfeits Time-Critical Strike Window",
                                        "message": "Slow C2 decision-making squandered the 8-minute window, allowing Crimson State's commander to escape and continue directing coastal defences.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike",
                                            "control"
                                        ],
                                        "title": "CAS & Deep Air Interdiction/SCAR Strike Packages Succeed",
                                        "messages": [
                                            "Front-line Close Air Support (CAS) smashed enemy tanks at 400m while deep Air Interdiction (AI) and SCAR flights derailed the artillery supply trains 40 miles inland.",
                                            "Counter-Land strike flights dominated both the immediate battle line and the deep enemy railhead."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Counter-Land Force Multipliers Enable Allied Ground Advance",
                                        "messages": [
                                            "Combining immediate CAS protection with deep AI interdiction multiplied Army combat power and allowed landing forces to break out from the beachhead.",
                                            "Joint ground commanders report enemy armour broken in front and follow-on artillery cut off in the rear."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Heavy CAS Screen Shields Beachhead Infantry",
                                        "messages": [
                                            "Dedicating 100% of strike sorties to Close Air Support halted the immediate tank counter-attack 400m from allied trenches.",
                                            "Friendly ground troops on the beach took minimal casualties under continuous overhead CAS cover."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "isr"
                                        ],
                                        "title": "Uninterdicted Artillery Trains Unload 40 Miles Inland",
                                        "messages": [
                                            "Because zero aircraft were allocated to deep Air Interdiction (AI) or SCAR, Crimson State's supply trains unloaded fresh heavy artillery batteries in the rear.",
                                            "ISR imagery shows enemy rocket and gun batteries setting up unopposed 40 miles behind the front."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "JTAC Air-Land Integration Protects Allied Troops at 400m",
                                        "messages": [
                                            "Forward Joint Terminal Attack Controllers (JTACs) deconflicted every bomb run 400m from friendly trenches, earning high praise from coalition army commanders.",
                                            "Disciplined Air-Land Integration (ALI) prevented blue-on-blue incidents across the crowded beachhead."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike"
                                        ],
                                        "title": "9-Line JTAC Briefs Guide Precision Danger-Close Hits",
                                        "messages": [
                                            "Clear JTAC laser designation and 9-line terminal briefs allowed Typhoon and F-35B pilots to place Paveway IV and Brimstone munitions straight onto enemy armour.",
                                            "Ground-to-air terminal guidance gave strike pilots pin-point target confirmation in close combat."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_land_weapons_free",
                            "text": "Let pilots fire freely in the zone ahead of the beach without ground JTAC clearance (Faster, extreme friendly-fire danger)",
                            "effects": {
                                "scores": {
                                    "joint_effect": -1,
                                    "coalition_support": -2
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike"
                                        ],
                                        "title": "Uncontrolled Weapons-Free Releases Fragment Near Allied Lines",
                                        "message": "Firing into the 400m contact zone without ground JTAC clearance resulted in danger-close fragmentation near advancing friendly platoons.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Air-Land Integration Breakdown Sparks Coalition Protests",
                                        "message": "Allied ground commanders halted their advance and lodged formal protests after uncoordinated air strikes endangered coalition soldiers.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ALI BREAKDOWN — UNCONTROLLED CAS ENDANGERS FRIENDLY TROOPS",
                                        "message": "Strikes released without JTAC clearance; coalition partners protest blue-on-blue hazard.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike"
                                        ],
                                        "title": "All-Weather Radar/GPS Brimstone Defeats Sandstorm",
                                        "messages": [
                                            "Switching from laser guidance to millimetric-wave radar and GPS-guided Brimstone missiles allowed the Typhoons to destroy the enemy command tank through zero-visibility dust.",
                                            "All-weather precision weapons overcame both Poor Weather and Limited Payload with the flight's final two missiles."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "isr"
                                        ],
                                        "title": "Enemy Armoured Spearhead Halted in Dust Storm",
                                        "messages": [
                                            "Ground JTACs and radar telemetry confirm the lead enemy command tank was knocked out, halting Crimson State's counter-attack in the storm.",
                                            "Cross-domain targeting cues enabled uninterrupted Close Air Support despite blinding desert weather."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility",
                                            "strike"
                                        ],
                                        "title": "Scarce Precision Missiles Retained on Wing Pylons",
                                        "message": "Holding fire in zero visibility preserved the Typhoons' remaining precision munitions for clear-weather sorties.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Ground Troops Left Pinned Down Without Air Cover in Storm",
                                        "message": "With air support suspended during the sandstorm, enemy tanks advanced under the dust cover and pinned down allied infantry.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike"
                                        ],
                                        "title": "Sandstorm Scatters Laser Beam — Final Bombs Miss Armour",
                                        "message": "Airborne dust diffused the targeting laser, causing the Typhoons' final laser-guided bombs to lose lock and miss the enemy tank column completely.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Stray Munitions Near Civilian Farms Spark Allied Criticism",
                                        "message": "Wayward laser-guided bombs impacted near coastal farmsteads without helping our pinned troops, eroding coalition confidence.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Hot-Pit Refuelling & Re-Arming Pit Operational at Akrotiri",
                                        "messages": [
                                            "Air Logistics and weapons technicians established rapid 'hot-pit' refuelling and re-arming lanes at RAF Akrotiri, turning jets around with engines running.",
                                            "Dedicated ground crews restored the Typhoon detachment to full operational status."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "control"
                                        ],
                                        "title": "Typhoon Detachment Restored & Reloaded for Immediate Sorties",
                                        "messages": [
                                            "Fast hot-pit weapons loading overcame Air Power's Limited Payload, putting fully armed Typhoon FGR4s back overhead within minutes.",
                                            "The Typhoon FGR4 detachment is back at full operational readiness with fresh Brimstone and Paveway IV loads."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Rushed Turnarounds Surge Immediate Fighter Sorties",
                                        "message": "Waiving post-flight inspections got two extra Typhoon pairs airborne quickly to reinforce the coastal patrol line.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Skipped Engineering Checks Trigger In-Flight Fault Warnings",
                                        "message": "Cutting safety checks caused hydraulic and avionics warning captions in flight, increasing flight-safety risk and long-term maintenance strain.",
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike",
                                            "isr"
                                        ],
                                        "title": "Non-Kinetic EW Jamming & PsyOps Silence Hospital HQ",
                                        "message": "Applying the 4th Category of Air Attack (Information Activities), airborne Electronic Warfare jammed militia command frequencies while PsyOps broadcasts overrode their propaganda transmitter.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Zero Civilian Harm Wins Strong Coalition & UN Praise",
                                        "message": "Neutralising the hospital transmitter through non-kinetic Disruption without firing a single explosive round upheld the Law of Armed Conflict and surged coalition support.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "NON-KINETIC AIR ATTACK — HOSPITAL HQ SILENCED BY EW & PSYOPS",
                                        "message": "Electronic Warfare jamming and PsyOps disrupt militia command without civilian casualties.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike"
                                        ],
                                        "title": "Low-Yield Precision Munition Destroys Rooftop Antenna",
                                        "message": "A precision-guided low-yield warhead sheared the radio mast off the hospital roof, cutting militia command broadcasts immediately.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Hospital Blast Damage Sparks International Condemnation",
                                        "message": "Even with a small warhead, kinetic impact on an occupied hospital shattered ward windows and triggered fierce criticism across coalition capitals.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike",
                                            "control"
                                        ],
                                        "title": "Disproportionate 2,000lb Kinetic Strike Destroys Hospital",
                                        "message": "Heavy 2,000lb bombs demolished the hospital complex along with the transmitter, causing catastrophic civilian casualties in breach of targeting rules.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Global Outrage & Allied Walkout Over Hospital Bombing",
                                        "message": "International partners froze cooperation and condemned the strike as a grave breach of the Law of Armed Conflict, crippling both Coalition Support and Joint Action.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "HUMANITARIAN DISASTER — HOSPITAL STRUCK BY HEAVY MUNITIONS",
                                        "message": "Severe civilian casualties reported; coalition allies condemn disproportionate kinetic strike.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Persistent Reaper Orbits Maintain City Overwatch",
                                        "messages": [
                                            "Visible Reaper MQ-9B drones kept continuous daytime and infrared watch over militia checkpoints across the coastal city.",
                                            "Overhead RPAS sensors tracked insurgent dispersal while projecting constant airborne presence."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Thunderous Fast-Jet Shows of Force Break Militia Morale",
                                        "messages": [
                                            "Low, high-speed Typhoon 'Shows of Force' rattled militia strongpoints and coerced fighters into abandoning street barricades without dropping a bomb.",
                                            "Non-kinetic fast-jet psychological overflights demonstrated undisputed Control of the Air."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_info_covert_high",
                            "text": "Keep drones hidden high above the clouds for secret tracking (Good intel, puts no psychological pressure on militia fighters)",
                            "effects": {
                                "scores": {
                                    "situational_awareness": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "strike"
                                        ],
                                        "title": "High-Altitude Covert Orbits Maintain Secret Watch",
                                        "message": "Keeping Reaper drones concealed above cloud level gathered steady covert intelligence on militia movements, though invisible patrols placed no psychological pressure on fighters below.",
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "isr",
                            "joint"
                        ],
                        "title": "Rivet Joint & Space Command Locate High-Power GPS Jammer",
                        "message": "ELINT receivers have pinpointed a truck-mounted High-Power GPS/SATCOM Jammer blasting interference across theatre satellite links.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "control",
                            "strike",
                            "mobility",
                            "jfac"
                        ],
                        "title": "Theatre-Wide GPS/PNT & Beyond-Line-of-Sight SATCOM Degraded",
                        "message": "Crimson State's space-denial jammer is disrupting aircraft GPS navigation, precision weapon guidance, and long-range satellite communications.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "AIR-SPACE DENIAL ALERT — HIGH-POWER GPS & SATCOM JAMMER DETECTED",
                        "message": "Hostile EW emitter disrupting theatre PNT and satellite communications; emitter located.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "strike",
                                            "control"
                                        ],
                                        "title": "Rivet Joint & Typhoons Destroy High-Power GPS Jammer",
                                        "message": "RC-135W Rivet Joint triangulated the jammer's emissions and vectored Typhoons to destroy the emitter vehicle, restoring clean GPS/PNT weapon guidance.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "UK Space Command Restores Theatre SATCOM & PNT Links",
                                        "message": "Coordinated Air-Space Integration switched theatre forces onto hardened military SATCOM beams and restored full space-enabled navigation and C2.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "AIR-SPACE INTEGRATION RESTORED — GPS JAMMER DESTROYED",
                                        "message": "Rivet Joint and Typhoons eliminate EW jammer; theatre GPS/PNT and SATCOM clear.",
                                        "severity": "success",
                                        "aiRandomize": false
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "mobility"
                                        ],
                                        "title": "Inertial Navigation Keeps Airframes Out of Local SAM Ring",
                                        "messages": [
                                            "Relying on onboard laser-ring gyro inertial navigation allowed aircrews to stay clear of the defended jammer site.",
                                            "Avoiding a low-level strike on the EW compound preserved aircraft Force Protection."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "isr",
                                            "strike",
                                            "jfac"
                                        ],
                                        "title": "Unchallenged Jammer Degrades Precision GPS Weapons & SATCOM",
                                        "messages": [
                                            "Leaving Crimson State's GPS/SATCOM jammer operational degraded space-based PNT weapon accuracy and disrupted beyond-line-of-sight C2 links.",
                                            "Ongoing space denial continues to hamper satellite-guided munitions and RPAS links across the theatre."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike",
                                            "control"
                                        ],
                                        "title": "F-35B & Storm Shadow Strategic Attack Neutralises Command Bunker",
                                        "message": "Stealth F-35B Lightnings and Typhoon Storm Shadow penetrating warheads severed Crimson State's deep command bunker, paralysing the regime's ability to wage war.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "joint"
                                        ],
                                        "title": "Conventional Precision & Strategic Deterrence Prevent WMD Escalation",
                                        "message": "Separating battlefield Conventional precision from silent Strategic Deterrence neutralised the WMD blackmail threat while preserving full coalition legitimacy.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "STRATEGIC ATTACK SUCCESS — COMMAND BUNKER NEUTRALISED",
                                        "message": "Precision conventional Storm Shadow strike paralyses adversary leadership; WMD threat deterred.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike",
                                            "control"
                                        ],
                                        "title": "Wide Coercion Raids Black Out National Power & Bridge Network",
                                        "message": "Heavy bombing knocked out Crimson State's national power grid and major river bridges, paralysing military and civil movement alike.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Civilian Infrastructure Destruction Alienates Allies & Stalls Stabilisation",
                                        "message": "Destroying dual-use power plants and bridges left civilian hospitals without electricity, fractured coalition backing, and obstructed our own ground stabilisation advance.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint"
                                        ],
                                        "title": "Unilateral Bombing Halt Welcomed by Diplomatic Observers",
                                        "message": "Suspending Strategic Attack sorties in favour of economic sanctions eased escalation fears among cautious diplomatic observers.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "control",
                                            "jfac"
                                        ],
                                        "title": "Unstruck Command Bunker Directs Renewed Militia Counter-Attacks",
                                        "message": "Leaving Crimson State's strategic bunker untouched allowed regime leaders to reorganize surviving SAM and militia units against our forces.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "jfac",
                                            "joint"
                                        ],
                                        "title": "Full Spectrum Joint Operations Transition to Peace Building",
                                        "message": "Applying Air Power's golden rule—aircraft cannot hold ground alone—UK JFAC united Army town security, Royal Navy port protection, and Diplomatic/Economic reconstruction.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "isr",
                                            "mobility"
                                        ],
                                        "title": "Air Wing Transitions to Peacekeeping Overwatch & Relief Lift",
                                        "message": "RAF squadrons have shifted seamlessly from Peace Enforcement combat to Peace Support Operations, providing protective air policing, ISR overwatch, and humanitarian airlift.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "FULL SPECTRUM TRANSITION — JOINT PEACE SUPPORT OPERATIONS LAUNCHED",
                                        "message": "Land, Maritime, Air, Diplomatic, and Economic teams unite for Post-Conflict Peace Building.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
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
                                ],
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "isr",
                                            "strike"
                                        ],
                                        "title": "Overhead Patrols Watch Helplessly as Militias Re-Take Streets",
                                        "message": "Because aircraft suffer Impermanence and cannot hold ground, orbiting jets and drones could not stop armed militias from slipping back into coastal towns below.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "joint",
                                            "mobility"
                                        ],
                                        "title": "Abandoning Joint Operations Collapses Post-Conflict Stability",
                                        "message": "Pulling land forces out early violated Air Power's core doctrine that victory requires Joint Action and a Full Spectrum Approach, collapsing coalition trust.",
                                        "severity": "danger",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "DOCTRINE WARNING — AIR POWER ALONE CANNOT OCCUPY LAND",
                                        "message": "Early ground withdrawal leaves coastal towns unsecured; militia activity resumes beneath patrols.",
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "control",
                            "jfac"
                        ],
                        "title": "24/7 Fighter Air Shield Locks Down Eastern Med",
                        "message": "Round-the-clock Typhoon FGR4 Combat Air Patrols have established an unbroken 24/7 Active DCA shield across the Eastern Mediterranean, keeping enemy raiders grounded.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "mobility"
                        ],
                        "title": "Continuous CAP Orbits Increase Voyager Avtur Draw",
                        "message": "Supporting 24/7 fighter persistence has increased daily Voyager Air-to-Air Refuelling fuel transfers and maintenance turnarounds.",
                        "severity": "info",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "control"
                        ],
                        "title": "24/7 CAP Surge Deters Hostile Air Incursions",
                        "message": "Continuous Typhoon Combat Air Patrol presence kept Crimson State strike jets away from our airspace.",
                        "severity": "info",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "mobility",
                            "jfac"
                        ],
                        "title": "Impermanence & Crew Fatigue Drain Akrotiri Reserves",
                        "message": "Non-stop 24/7 CAP flying pushed pilot duty hours, fast-jet maintenance, and Voyager Avtur reserves past planned sustainment limits.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "jfac",
                            "control",
                            "mobility"
                        ],
                        "title": "RAF Regiment Neutralises Perimeter Drone & Mortar Cell",
                        "message": "RAF Regiment Force Protection patrols cleared the hills outside RAF Akrotiri, neutralising the Insurgent Drone & Mortar Cell and securing the flight line.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "isr"
                        ],
                        "title": "Captured Militia Drone Vans Yield Valuable TECHINT",
                        "message": "No 1 ISR Wing specialists exploited captured drone transmitters and guidance boards recovered by the RAF Regiment patrol for Technical Intelligence.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "isr",
                            "jfac"
                        ],
                        "title": "90 Signals Unit Restores Encrypted Link-16 Backbone",
                        "message": "90 Signals Unit cyber specialists completed a clean cryptographic re-key of Link-16, restoring Network Enabled Capability across all command nodes.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "joint",
                            "control",
                            "strike"
                        ],
                        "title": "RAF Fighters, HMS Duncan & Army JTACs Re-Synced on Shared Map",
                        "message": "Air, maritime, and land units are back on one live, cyber-hardened Link-16 tactical picture.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "mobility",
                            "joint"
                        ],
                        "title": "JHC Chinooks Execute Flawless Night Special Forces Raid",
                        "message": "Night-vision JHC Chinooks inserted and extracted UK Special Forces cleanly at the Enemy Radar Code & Command Villa before dawn.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "isr",
                            "control",
                            "jfac"
                        ],
                        "title": "Captured SAM Cryptographic Hardware Unlocks TECHINT Breakthrough",
                        "message": "Live SAM radar codebooks and IADS hardware seized from the villa have given No 1 ISR Wing and Control of the Air complete TECHINT insight into enemy air defences.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SF AIR OPS SUCCESS — ENEMY RADAR CODES CAPTURED",
                        "message": "Chinook night raid and Shadow R1 overwatch secure high-value SAM TECHINT.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "isr"
                        ],
                        "title": "Partial SAM Code Drives Recovered From Coastal Villa",
                        "message": "Special Forces grabbed partial encrypted radar hard drives from the command villa before breaking contact, providing useful TECHINT.",
                        "severity": "info",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "mobility",
                            "jfac"
                        ],
                        "title": "Chinook Suffers Small-Arms Shrapnel During Hot Extraction",
                        "message": "Alerted villa guards opened fire on the landing zone; JHC Chinook pilots pulled off an emergency extraction under fire with light airframe damage.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "joint",
                            "jfac"
                        ],
                        "title": "Humanitarian Relief Drop Wins Widespread Coalition Acclaim",
                        "message": "Delivering 40 tonnes of food, clean water, and medicine to 4,000 cut-off civilians demonstrated UK Humanitarian Operations and surged coalition backing.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "mobility"
                        ],
                        "title": "A400M Atlas Relief Sorties Draw Down Airlift Hours & Pallets",
                        "message": "RAF A400M Atlas crews completed the precision low-level parachute relief drop on target, drawing on theatre airlift capacity and rigging stocks.",
                        "severity": "info",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "HUMANITARIAN AIR-DROP COMPLETE — COASTAL TOWN ASSISTED",
                        "message": "A400M Atlas delivers 40 tonnes of emergency food, water, and medical supplies.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "strike",
                            "isr"
                        ],
                        "title": "Op Shader-Style Leaflets & Airborne Radio Disrupt Militia Cohesion",
                        "message": "Non-kinetic Information Activities—100,000 safe-passage leaflets and FM surrender broadcasts—broke militia morale across two coastal sectors.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac"
                        ],
                        "title": "Bloodless Militia Surrenders Aid Ground Advance & Coalition Support",
                        "message": "Two militia units laid down their arms to advancing ground forces without kinetic bombing, validating non-kinetic Air Attack under the Full Spectrum Approach.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                        "probability": 0.75,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "control",
                                    "mobility"
                                ],
                                "title": "24/7 CAP Relief Wave On Station",
                                "messages": [
                                    "Fresh Typhoon FGR4 pairs have locked onto the offshore Voyager towline, locking in continuous 24/7 Combat Air Patrol coverage.",
                                    "Tanker rendezvous complete: relief Typhoons are on station across the Eastern Mediterranean barrier."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_cap_fatigue_incident",
                        "delayMs": 2000,
                        "probability": 0.25,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "control",
                                    "mobility"
                                ],
                                "title": "High Fuel Burn Reported on CAP Surge",
                                "messages": [
                                    "Flight-line engineering and Voyager crews report heavy Avtur draw and rising aircrew fatigue from the non-stop 24/7 CAP rotation.",
                                    "Logistics watch warns that continuous Combat Air Patrol extensions are burning fuel faster than scheduled."
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
                            "control",
                            "jfac"
                        ],
                        "title": "Extra Typhoon FGR4 Pairs Scrambled for 24/7 Air Shield",
                        "messages": [
                            "Control of the Air has launched continuous Typhoon FGR4 Combat Air Patrol rotations to maintain a 24/7 Active DCA barrier.",
                            "Additional Typhoon QRA and CAP flights are climbing out of RAF Akrotiri to lock down Eastern Mediterranean airspace."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "mobility"
                        ],
                        "title": "Dedicated Voyager Tanker Towlines Assigned to CAP Surge",
                        "messages": [
                            "Mobility has committed continuous Voyager KC2/KC3 tanker orbits to keep the 24/7 Typhoon CAP rotations refuelled offshore.",
                            "Air-to-Air Refuelling crews are on station to sustain the round-the-clock fighter surge."
                        ],
                        "severity": "info",
                        "aiRandomize": true
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "jfac",
                            "control",
                            "mobility"
                        ],
                        "title": "RAF Regiment Field Squadron Deployed Outside Wire",
                        "messages": [
                            "Armed RAF Regiment Force Protection teams have pushed into the hills outside RAF Akrotiri to neutralise the Insurgent Drone & Mortar Cell.",
                            "RAF Regiment patrols are sweeping the perimeter ridge with counter-UAS jammers to clear the hostile drone launch site."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "isr"
                        ],
                        "title": "TECHINT Exploitation Team Attached to RAF Regiment Patrol",
                        "messages": [
                            "No 1 ISR Wing technical intelligence specialists are accompanying the RAF Regiment sweep to recover captured militia drone electronics.",
                            "ISR exploitation teams are moving forward with Force Protection patrols to inspect the drone launch vehicles."
                        ],
                        "severity": "info",
                        "aiRandomize": true
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "isr"
                        ],
                        "title": "90 Signals Unit Initiates Cryptographic Link-16 Rollover",
                        "messages": [
                            "90 Signals Unit cyber engineers are rolling out fresh Link-16 crypto keys across RAF Waddington and RAF Akrotiri C2 terminals.",
                            "Defensive Air-Cyber teams have begun re-indexing and hardening theatre datalink feeds."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac",
                            "control"
                        ],
                        "title": "Tri-Service Air, Maritime & Land Nodes Re-Joining Shared NEC Map",
                        "messages": [
                            "RAF fighter squadrons, HMS Duncan, and Army JTACs are reconnecting onto one synchronised Network Enabled Capability battle picture.",
                            "Joint tactical data links are syncing across air, sea, and land headquarters."
                        ],
                        "severity": "info",
                        "aiRandomize": true
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
                        "probability": 0.75,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "mobility",
                                    "isr"
                                ],
                                "title": "Chinooks Touch Down Unseen at Coastal Villa",
                                "messages": [
                                    "Shadow R1 overwatch confirms the night-vision Chinook flight landed undetected inside the valley objective.",
                                    "Special Forces teams have breached the radar code villa silently under Shadow R1 infrared watch."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_sf_raid_compromised",
                        "delayMs": 2000,
                        "probability": 0.25,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "mobility",
                                    "isr"
                                ],
                                "title": "Small-Arms Fire Flashes at Villa Landing Zone",
                                "messages": [
                                    "Shadow R1 infrared camera detects sentry gunfire flaring near the Chinook landing zone as the assault team extracts.",
                                    "Hostile perimeter guards have alerted to rotor noise near the coastal villa; extraction under fire underway."
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
                            "mobility"
                        ],
                        "title": "Night-Vision JHC Chinooks Launch Low-Level SF Insertion",
                        "messages": [
                            "JHC Chinook crews on night-vision goggles have launched contour-flying through coastal valleys to insert UK Special Forces at the command villa.",
                            "Rotary-wing Special Forces Air Operations package is inbound to the coastal landing zone."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "isr",
                            "jfac"
                        ],
                        "title": "Shadow R1 Overwatch & TECHINT Team Direct Villa Raid",
                        "messages": [
                            "An overhead Shadow R1 is providing real-time infrared overwatch and radio relay as Special Forces move to seize enemy SAM radar code equipment.",
                            "No 1 ISR Wing and JFAC are monitoring the night TECHINT raid via secure satellite datalink."
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "mobility"
                        ],
                        "title": "A400M Atlas Launches With 40 Tonnes of Relief Pallets",
                        "messages": [
                            "An RAF A400M Atlas rigged with 40 tonnes of parachute relief pallets has departed RAF Akrotiri for the Cut-Off Coastal Refugee Town.",
                            "Air Mobility loadmasters have completed pallet rigging and launched the humanitarian air-drop sortie."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac"
                        ],
                        "title": "UN & Coalition Relief Agencies Notified of Humanitarian Drop",
                        "messages": [
                            "Joint and diplomatic teams have coordinated safe drop-zone timings with local relief workers on the ground.",
                            "UK JFAC has announced the humanitarian airlift corridor under the Full Spectrum Approach."
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
                ],
                "outcomeMessages": [
                    {
                        "roles": [
                            "strike",
                            "isr"
                        ],
                        "title": "Information Activities Aircraft Inbound on Leaflet & Broadcast Run",
                        "messages": [
                            "RAF aircraft are on station over militia lines dispersing 100,000 safe-passage leaflets and transmitting airborne FM surrender appeals.",
                            "Non-kinetic Psychological Operations and EW broadcast payloads are active over the coastal sector."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac"
                        ],
                        "title": "Safe-Passage Corridors Coordinated With Ground Forces",
                        "messages": [
                            "Joint ground commanders have opened reception checkpoints to process militia fighters surrendering in response to the Op Shader-style broadcasts.",
                            "Full Spectrum psychological outreach is synchronized with allied ground reception lines."
                        ],
                        "severity": "info",
                        "aiRandomize": true
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "QRA Typhoons Complete Visual Identification & Escort",
                                        "messages": [
                                            "Typhoon FGR4 pilots held Beyond-Visual-Range fire, closed for positive Visual Identification (VID), and escorted the stray civil airliner safely out of the engagement zone.",
                                            "Disciplined Active DCA intercept procedures positively identified the airliner while maintaining control of the airway."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Civilian Airliner Escort Praised by International Authorities",
                                        "messages": [
                                            "Preventing a tragic misidentification on the civil airway reinforced coalition confidence in UK JFAC's Rules of Engagement.",
                                            "Civil aviation authorities commended UK air defence controllers for protecting commercial traffic in contested skies."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_airliner_clear_sky",
                            "text": "Broadcast emergency guard-channel diversion orders while locking radar on trailing hostiles.",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control"
                                        ],
                                        "title": "Guard-Channel Diversion Clears BVR Firing Line",
                                        "message": "Emergency UHF/VHF guard broadcasts forced the commercial jet to bank away while Typhoons locked onto the trailing hostile fighters.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "joint"
                                        ],
                                        "title": "Close Proximity Between Civil Jet & Hostiles Raises Safety Risk",
                                        "message": "Deconflicting the stray airliner by radio alone while locking radar on trailing bandits left minimal safety margin against hostile missile fire.",
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "joint"
                                        ],
                                        "title": "Meteor BVR & Type 45 Radar Defeat Pop-Up Ambush",
                                        "messages": [
                                            "Cued by HMS Duncan's radar, F-35B and Typhoon CAP flights engaged with Meteor Beyond-Visual-Range missiles and drove off the sea-skimming attackers.",
                                            "Joint Air-Maritime radar cueing and Meteor BVR shots defeated Crimson State's low-level fighter ambush."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "mobility"
                                        ],
                                        "title": "Offshore Rivet Joint & Voyager Orbits Remain Unbroken",
                                        "messages": [
                                            "With CAP fighters splashing the pop-up threat, RC-135W Rivet Joint and Voyager tankers stayed safely on their offshore stations.",
                                            "High-value ISR and Air-to-Air Refuelling enablers continued operations without interruption."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_ambush_evade",
                            "text": "Pull Voyager and Rivet Joint back west immediately and hold defensive CAP.",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "situational_awareness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "mobility"
                                        ],
                                        "title": "High-Value Voyager & Rivet Joint Retrograde Safely West",
                                        "message": "Pulling Voyager and RC-135W Rivet Joint west behind defensive CAP shielded both high-value aircraft from the fast-jet ambush.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac"
                                        ],
                                        "title": "Retrograde Orbit Creates Temporary Coastal SIGINT Gap",
                                        "message": "Backing RC-135W Rivet Joint away from the coast reduced electronic surveillance reach over Crimson State's littoral network.",
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "isr"
                        ],
                        "title": "SA-17 SAM Battery Vanishes Under Camouflage Netting",
                        "message": "Surviving SA-17 'Grizzly' launcher crews shut down their radar and displaced into concealed cover, dropping off the Link-16 tactical picture.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "control",
                            "strike"
                        ],
                        "title": "Unlocated Mobile SAM Renews Coastal A2AD Threat",
                        "message": "Until ISR re-acquires the displaced SA-17 battery, Precision OCA is locked and coastal airspace remains contested.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "control",
                                            "strike"
                                        ],
                                        "title": "ISR Cross-Cue Re-Acquires Displaced SA-17 Battery",
                                        "messages": [
                                            "RC-135W Rivet Joint SIGINT and Reaper MQ-9B GEOINT uncovered the relocated SA-17 battery under camouflage netting, restoring its track on the map.",
                                            "Rapid ISR re-tasking pinpointed the displaced SA-17 launcher and re-enabled Precision OCA targeting."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Emergency ISR Re-Tasking Draws Extra Sortie Fuel",
                                        "messages": [
                                            "Extending Rivet Joint and Reaper patrol endurance to hunt the mobile SAM drew down extra aviation fuel and crew hours.",
                                            "Unscheduled ISR orbit extensions increased fuel and maintenance demand at RAF Akrotiri."
                                        ],
                                        "severity": "info",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_sam_skip",
                            "text": "Keep ISR on current maritime tasks and warn aircraft to stay above 25,000ft.",
                            "effects": {
                                "scores": {
                                    "air_control": -1,
                                    "force_protection": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "ISR Assets Retained on Scheduled Maritime Watch",
                                        "message": "Keeping Rivet Joint and Reaper on their existing patrol tracks left the displaced SA-17 battery unlocated on the coast.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "mobility",
                                            "strike"
                                        ],
                                        "title": "Unlocated SA-17 Forces 25,000ft Altitude Floor",
                                        "message": "With the mobile SAM battery hiding along the shore, UK aircraft must stay above 25,000ft, restricting low-level helicopter and strike freedom.",
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac"
                                        ],
                                        "title": "Link-16 NEC Disseminates UK-Eyes-Only SIGINT Track",
                                        "messages": [
                                            "No 1 ISR Wing pushed the intercepted convoy coordinates across Link-16 NEC—delivering the right information to the right place at the right time.",
                                            "Rapid SIGINT dissemination turned an Eyes-Only radio intercept into an immediate targeting solution."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "strike",
                                            "control"
                                        ],
                                        "title": "Typhoon Air Interdiction Destroys SA-17 Reload Convoy",
                                        "messages": [
                                            "Cued by ISR's Link-16 track, airborne Typhoons struck the enemy munitions convoy and destroyed the SA-17 reload missiles on the highway.",
                                            "Strike fighters interdicted the SAM resupply trucks before they could reach the coastal batteries."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr",
                                            "jfac"
                                        ],
                                        "title": "Reaper Shadows Convoy to Unmask Coastal Command Villa",
                                        "message": "Covertly tracking the resupply trucks with Reaper MQ-9B led analysts straight to Crimson State's hidden Enemy Radar Code & Command Villa.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "joint"
                                        ],
                                        "title": "Special Forces Air Raid Target Revealed on Coast",
                                        "message": "Pinpointing the Enemy Radar Code & Command Villa has unlocked the night Chinook Special Forces Air Insertion action.",
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "False-Flag Claim Debunked Across Coalition Capitals",
                                        "messages": [
                                            "Publishing verified flight logs and timestamped imagery proved no RAF aircraft operated near the school, crushing the adversary disinformation narrative.",
                                            "Transparent Full Spectrum information response restored allied confidence immediately."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Timestamped Reaper GEOINT Feed Validates Air Picture",
                                        "messages": [
                                            "No 1 ISR Wing's archived Reaper MQ-9B GEOINT video provided irrefutable proof exposing the doctored OSINT clip.",
                                            "Cross-checking OSINT claims against verified GEOINT metadata exposed the adversary's fake video."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_osint_ignore",
                            "text": "Refuse to release classified sensor imagery to protect collection methods.",
                            "effects": {
                                "scores": {
                                    "coalition_support": -1,
                                    "force_protection": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Classified Optical Sensor Specifications Protected",
                                        "message": "Refusing to publish raw Reaper MQ-9B sensor video prevented adversary analysts from studying UK electro-optical resolution limits.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Unanswered False-Flag Video Erodes Coalition Public Support",
                                        "message": "Without public evidence to refute the viral school-strike claim, media pressure grew across allied capitals.",
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "isr"
                                        ],
                                        "title": "Defensive Air-Cyber Frequency Hop Defeats Uplink Hijack",
                                        "messages": [
                                            "RAF Waddington crews switched the Reaper MQ-9B onto hardened military SATCOM frequencies, locking out the hostile spoofing signal and keeping the RPAS on station.",
                                            "Rapid Air-Cyber and Air-Space frequency agility defeated the satellite command hijack attempt."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Hardened Military SATCOM Preserves Unbroken Overwatch",
                                        "messages": [
                                            "Seamless Air-Space Integration kept the Reaper drone safely under UK control without losing a single minute of theatre surveillance.",
                                            "Protected satellite command links ensured continuous overwatch for joint forces."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_rpas_rtb",
                            "text": "Command autonomous return-to-base immediately to prevent capture (Temporary ISR gap).",
                            "effects": {
                                "scores": {
                                    "force_protection": 1,
                                    "situational_awareness": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Autonomous RTB Prevents RPAS Capture or Loss",
                                        "message": "Commanding autonomous GPS/inertial return-to-base brought the Reaper MQ-9B safely home before hackers could sever the link.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "isr",
                                            "strike"
                                        ],
                                        "title": "Early RPAS Withdrawal Opens Temporary Coastal ISR Gap",
                                        "message": "Pulling the Reaper off station left a temporary blind spot in full-motion video coverage over the coastal target area.",
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility",
                                            "joint"
                                        ],
                                        "title": "Voyager Towline Shifted West Under HMS Duncan Shield",
                                        "messages": [
                                            "Repositioning the Voyager KC2 orbit 40 miles west behind HMS Duncan masked the hostile EW jammer and allowed visual hose-and-drogue refuelling.",
                                            "Mobility and Royal Navy coordination kept the offshore Air-to-Air Refuelling towline open despite electronic jamming."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Track A Fighters Complete Visual Tanker Plug & Stay On Station",
                                        "messages": [
                                            "Low-fuel Typhoon FGR4 patrols completed emission-silent visual rendezvous with the Voyager tanker, overcoming Impermanence.",
                                            "Uninterrupted aerial refuelling kept combat patrols airborne across the coastal sector."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Voyager Tanker Scrubs Orbit & Recovers Safely to Akrotiri",
                                        "message": "Breaking off the jammed refuelling track protected the high-value Voyager airframe, though the tanker is temporarily degraded pending EW retuning.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "jfac"
                                        ],
                                        "title": "Aborted AAR Forces Low-Fuel Fighters Home Early",
                                        "message": "With the Voyager towline aborted, Air Power's Impermanence forced Track A Typhoon patrols to scrub their mission and return to base on low fuel.",
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "strike",
                            "isr"
                        ],
                        "title": "Acoustic Contact Lost Below Mediterranean Thermocline",
                        "message": "The Hostile Kilo-Class Submarine dived beneath a sharp deep-water thermal layer, masking her acoustic signature and vanishing from the tactical map.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac",
                            "mobility"
                        ],
                        "title": "Unlocated Submarine Threatens Eastern Med Sea Supply Lane",
                        "message": "With the hostile diesel-electric submarine still operational and hidden at depth, Royal Navy escorts and sea supply routes face renewed ambush risk.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "strike",
                            "isr"
                        ],
                        "title": "Periscope Radar Feather & Sonar Transient Detected",
                        "message": "P-8A Poseidon radar and sonobuoys have re-acquired the Hostile Kilo-Class Submarine rising to periscope depth for a torpedo shot.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "joint",
                            "jfac",
                            "mobility"
                        ],
                        "title": "HMS Duncan & Maritime Lift Corridor Under Torpedo Threat",
                        "message": "The escaped Kilo submarine has ambushed our maritime corridor at close range, threatening naval Force Protection.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SUBMARINE AMBUSH ALERT — KILO CONTACT AT PERISCOPE DEPTH",
                        "message": "Hostile submarine re-detected along maritime lift lane; urgent ASW prosecution required.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "strike"
                                        ],
                                        "title": "Poseidon & Wildcat Sting Ray Torpedoes Sink Kilo Submarine",
                                        "message": "RAF P-8A Poseidon MRA1 and HMS Duncan's RN Wildcat bracketed the periscope datum with Sting Ray lightweight torpedoes, destroying the Hostile Kilo-Class Submarine.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Subsurface Threat Eliminated Across Maritime Lift Corridor",
                                        "message": "Decisive Air-Maritime Integration permanently cleared the Eastern Mediterranean sea lane for HMS Duncan and coalition supply shipping.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "ASW PROSECUTION COMPLETE — HOSTILE SUBMARINE DESTROYED",
                                        "message": "P-8A Poseidon and RN Wildcat eliminate Kilo-class submarine threat.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "strike"
                                        ],
                                        "title": "Towed Acoustic Decoys Spoof Submarine Torpedo Solution",
                                        "message": "HMS Duncan deployed acoustic countermeasures and turned away, preventing a torpedo hit while the unengaged Kilo submarine dived out of contact again.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Evasive Convoy Detour Delays Sea-Lane Resupply",
                                        "message": "Diverting supply vessels around the submarine danger box added transit hours and reduced theatre sustainment throughput.",
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "Full Spectrum Diplomacy Reopens Direct Overflight Corridor",
                                        "messages": [
                                            "Coordinated Diplomatic and Economic outreach with NATO partners persuaded the neighbouring government to restore UK military overflight clearances.",
                                            "Full Spectrum diplomatic engagement resolved the airspace dispute and strengthened regional coalition ties."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Direct Brize Norton to Akrotiri Great-Circle Route Restored",
                                        "messages": [
                                            "C-17 Globemasters and A400M Atlases are back on the direct 2,000-mile Inter-Theatre airway into RAF Akrotiri, saving hours of fuel burn.",
                                            "Hub & Spoke transport schedules returned to full efficiency with direct overflight access."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_overflight_detour",
                            "text": "Reroute C-17s over international waters and absorb the extra Voyager fuel burn.",
                            "effects": {
                                "scores": {
                                    "sustainability": -1,
                                    "coalition_support": 1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint"
                                        ],
                                        "title": "Respecting National Airspace Avoids Diplomatic Friction",
                                        "message": "Routing military transports strictly through international airspace respected the neighbour's sovereignty and preserved diplomatic goodwill.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Long Maritime Detour Increases C-17 & Voyager Fuel Burn",
                                        "message": "Flying the dog-leg route over international waters added two hours to every Brize Norton transport chalk and increased tanker fuel consumption.",
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "mobility",
                            "jfac"
                        ],
                        "title": "Critical Avtur & Munitions Shortage Degrades Voyager Fleet",
                        "message": "Sustained high-tempo flying has drained RAF Akrotiri's bulk Avtur and precision munitions stocks, degrading Voyager tanker readiness until an Emergency Hub & Spoke Air-Bridge Surge is launched.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "control",
                            "strike"
                        ],
                        "title": "Offshore Tanker Allocation & Precision Weapon Loads Rationed",
                        "message": "With Voyager KC2/KC3 tankers degraded by fuel shortages, combat squadrons face strict fuel and precision-munition rationing.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "SUSTAINABILITY SHOCK — AVTUR RATIONING & VOYAGER AAR DEGRADED",
                        "message": "Fuel and precision munitions critically low at RAF Akrotiri; Air-Bridge surge needed.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Fuel Rationing Stabilises Essential QRA & Medevac Stocks",
                                        "message": "Ring-fencing Avtur reserves for Quick Reaction Alert and Aeromedical Evacuation prevented a total base fuel dry-out while awaiting C-17 resupply.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Reduced Sortie Allocations Trim Offensive Patrol Hours",
                                        "message": "Fuel rationing forced a temporary reduction in non-essential CAP and strike loiter times over the coast.",
                                        "severity": "warning",
                                        "aiRandomize": false
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_ration_surge",
                            "text": "Burn war-reserve stocks to keep all strike sorties flying (High risk of running dry).",
                            "effects": {
                                "scores": {
                                    "air_control": 1,
                                    "force_protection": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "War-Reserve Release Keeps Full Combat Wave Airborne",
                                        "message": "Unsealing emergency war-reserve fuel and munitions kept every scheduled Typhoon and F-35B patrol in the sky.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "mobility",
                                            "jfac"
                                        ],
                                        "title": "Depleted Emergency Base Reserves Leave Akrotiri Exposed",
                                        "message": "Burning through RAF Akrotiri's final emergency fuel and missile buffer left zero reserve margin for unexpected defensive scrambles.",
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "jfac",
                            "mobility"
                        ],
                        "title": "Ballistic Missile Salvo Craters RAF Akrotiri Main Runway",
                        "message": "Exploiting low Force Protection, a hostile ballistic missile strike damaged RAF Akrotiri's main runway—demonstrating Air Power's vulnerability on the ground.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "control",
                            "strike"
                        ],
                        "title": "Airborne Fighters Hold Offshore Awaiting Runway Clearance or Divert",
                        "message": "With RAF Akrotiri's runway cratered, airborne combat jets must hold on tanker fuel or divert until emergency repairs or carrier recovery are ordered.",
                        "severity": "danger",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "BASE EMERGENCY — RAF AKROTIRI RUNWAY CRATERED BY MISSILE STRIKE",
                        "message": "Forward Spoke runway damaged; emergency runway repair or carrier diversion required.",
                        "severity": "danger",
                        "aiRandomize": false
                    }
                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike",
                                            "joint"
                                        ],
                                        "title": "STOVL F-35Bs Divert to HMS Queen Elizabeth Deck",
                                        "message": "F-35B Lightnings recovered vertically onto HMS Queen Elizabeth, proving the agility of Carrier Enabled Power Projection when land bases are struck.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Royal Engineers Restore RAF Akrotiri to Operational Status",
                                        "message": "With carrier air cover overhead, Rapid Runway Repair teams patched the craters and reopened RAF Akrotiri for fixed-wing operations.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "display"
                                        ],
                                        "title": "CARRIER ENABLED POWER PROJECTION — F-35Bs OPERATE FROM HMS QUEEN ELIZABETH",
                                        "message": "Carrier deck sustains fighter operations while engineers restore RAF Akrotiri runway.",
                                        "severity": "success",
                                        "aiRandomize": false
                                    }
                                ]
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "jfac",
                                            "control"
                                        ],
                                        "title": "AM-2 Matting Reopens Emergency Strip at RAF Akrotiri",
                                        "messages": [
                                            "Under RAF Regiment perimeter protection, Royal Engineers laid AM-2 aluminium matting over the craters to restore RAF Akrotiri to operational status.",
                                            "Orbiting fighters landed safely as Rapid Runway Repair crews reopened a minimum operating strip."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "mobility"
                                        ],
                                        "title": "Emergency Runway Repair Consumes Heavy Engineering Stocks",
                                        "messages": [
                                            "Rebuilding the cratered runway surface consumed bulk quick-set concrete, matting stocks, and engineering plant hours.",
                                            "Airfield repair teams restored runway availability at a noticeable cost to base engineering reserves."
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
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac"
                                        ],
                                        "title": "NATO Liaison Integration Restores Allied Basing & Support",
                                        "messages": [
                                            "Embedding NATO liaison officers inside UK JFAC 11 Group HQ and tightening collateral-damage ROE reopened allied tanker basing and diplomatic backing.",
                                            "Full Spectrum diplomatic assurances restored coalition trust and overflight permissions."
                                        ],
                                        "severity": "success",
                                        "aiRandomize": true
                                    },
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "Stricter Coalition ROE Adds Target Verification Steps",
                                        "messages": [
                                            "Additional coalition legal sign-off on dynamic targets has slightly slowed offensive fast-jet engagement tempo.",
                                            "Tightened Rules of Engagement require extra positive-identification passes before weapons release."
                                        ],
                                        "severity": "warning",
                                        "aiRandomize": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "opt_coalition_solo",
                            "text": "Continue UK-only operations from sovereign bases without allied concessions.",
                            "effects": {
                                "scores": {
                                    "sustainability": -1,
                                    "joint_effect": -1
                                },
                                "outcomeMessages": [
                                    {
                                        "roles": [
                                            "control",
                                            "strike"
                                        ],
                                        "title": "National Command Retains Unrestricted UK Targeting Rules",
                                        "message": "Operating under UK-only national ROE preserved fast targeting cycles from sovereign facilities at RAF Akrotiri.",
                                        "severity": "info",
                                        "aiRandomize": false
                                    },
                                    {
                                        "roles": [
                                            "joint",
                                            "jfac",
                                            "mobility"
                                        ],
                                        "title": "Loss of Allied Basing & Tanker Sharing Strains UK Sustainment",
                                        "message": "Proceeding without allied tanker sharing or regional staging bases increased the logistical burden on UK-only assets and weakened multi-national Joint Action.",
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "control",
                            "strike"
                        ],
                        "title": "F-35B & Storm Shadow OCA Obliterates SA-17 SAM Battery",
                        "message": "Stealth F-35B Lightnings and Typhoon Storm Shadow cruise missiles destroyed the Hostile SA-17 SAM Battery, shattering Crimson State's coastal A2AD ring.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "jfac",
                            "joint",
                            "mobility"
                        ],
                        "title": "Coastal Skies Opened for Unrestricted Joint & Rotary Operations",
                        "message": "Eliminating the SA-17 battery has cleared the littoral corridor for Track C helicopters, transports, and amphibious forces.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "OCA STRIKE SUCCESS — HOSTILE SA-17 SAM BATTERY DESTROYED",
                        "message": "F-35B Lightning and Typhoon Storm Shadow strike eliminates coastal A2AD SAM battery.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "control",
                            "strike",
                            "isr"
                        ],
                        "title": "Decoy Van Struck — Real SA-17 Launcher Displaces Under Smoke",
                        "message": "Storm Shadow missiles obliterated an inflatable radar decoy while the real mobile SA-17 launcher displaced under smoke and vanished from the tactical map.",
                        "severity": "warning",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "mobility",
                            "jfac"
                        ],
                        "title": "Scarce Storm Shadow Cruise Missiles Expended on Decoy",
                        "message": "Firing long-range cruise missiles against a displaced target drew down RAF Akrotiri's high-value precision munitions inventory without neutralising the battery.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "mobility",
                            "jfac"
                        ],
                        "title": "Brize Norton Hub & Spoke Surge Restores Akrotiri & Voyager",
                        "message": "A continuous wave of C-17 Globemasters and A400M Atlases from RAF Brize Norton replenished bulk Avtur and spares, restoring both RAF Akrotiri and the Voyager tanker detachment to full operational status.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "control",
                            "strike",
                            "joint"
                        ],
                        "title": "Precision Munitions & Offshore Tanker Orbits Fully Replenished",
                        "message": "Fresh Storm Shadow, Brimstone, and Meteor stocks have been delivered to the flight line alongside restored Voyager Air-to-Air Refuelling towlines.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "display"
                        ],
                        "title": "HUB & SPOKE SURGE COMPLETE — AKROTIRI & VOYAGER FULLY OPERATIONAL",
                        "message": "C-17 and A400M airbridge replenishes theatre fuel, munitions, and tanker readiness.",
                        "severity": "success",
                        "aiRandomize": false
                    }
                ]
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
                },
                "outcomeMessages": [
                    {
                        "roles": [
                            "mobility"
                        ],
                        "title": "Lead A400M Chalks Restore Voyager Tanker Readiness",
                        "message": "Despite severe Mediterranean crosswinds, lead A400M Atlas flights landed enough spare parts and fuel at Akrotiri to return the Voyager tanker fleet to operational status.",
                        "severity": "success",
                        "aiRandomize": false
                    },
                    {
                        "roles": [
                            "jfac",
                            "strike"
                        ],
                        "title": "Weather Diversion Delays Second Half of C-17 Munitions Wave",
                        "message": "Storm crosswinds forced trailing C-17 Globemasters to hold en route, delivering only partial replenishment to theatre weapon stocks.",
                        "severity": "warning",
                        "aiRandomize": false
                    }
                ]
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
                        "probability": 0.75,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "strike",
                                    "control",
                                    "isr"
                                ],
                                "title": "F-35B Sensor Lock Confirmed on SA-17 Fire-Control Radar",
                                "messages": [
                                    "Stealth F-35B Lightnings report clean electro-optical lock on the active SA-17 radar vehicle as Storm Shadow missiles enter terminal dive.",
                                    "Operation Orchard-style cyber spoofing is holding the SA-17 battery stationary as precision munitions close on target."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_oca_sam_relocated",
                        "delayMs": 25000,
                        "probability": 0.25,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "strike",
                                    "control",
                                    "isr"
                                ],
                                "title": "Thermal Smoke Plumes Obscure SA-17 Firing Site",
                                "messages": [
                                    "In-flight weapon telemetry shows heavy smoke generators igniting around the SA-17 site as mobile launcher vehicles attempt emergency dispersal.",
                                    "Rivet Joint warns that the SA-17 battery switched to a decoy emitter moments before missile time-on-target."
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
                            "strike",
                            "control"
                        ],
                        "title": "F-35B Stealth & Typhoon Storm Shadow OCA Package Airborne",
                        "messages": [
                            "Stealth F-35B Lightnings and Storm Shadow-armed Typhoon FGR4s have launched an Offensive Counter-Air raid against the pinpointed Hostile SA-17 SAM Battery.",
                            "OCA strike flights are crossing the coast to eliminate Crimson State's SA-17 battery."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "isr",
                            "jfac"
                        ],
                        "title": "Op Orchard Cyber Blinding & Link-16 Targeting Support OCA Raid",
                        "messages": [
                            "No 1 ISR Wing and JFAC are feeding live Link-16 updates and cyber radar spoofing to cover the inbound OCA strike package.",
                            "Electronic and cyber suppression nodes are active to blind enemy SAM operators during the strike ingress."
                        ],
                        "severity": "info",
                        "aiRandomize": true
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
                        "probability": 0.8,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "mobility",
                                    "jfac"
                                ],
                                "title": "Heavy C-17 Wave Approaching Cyprus Approach Corridor",
                                "messages": [
                                    "Lead C-17 Globemaster and A400M Atlas chalks from RAF Brize Norton report clear skies on final approach into RAF Akrotiri.",
                                    "Air Logistics teams at Akrotiri are standing by on the apron as the main Inter-Theatre resupply wave enters Eastern Mediterranean airspace."
                                ],
                                "severity": "info",
                                "aiRandomize": true
                            }
                        ]
                    },
                    {
                        "id": "ev_airbridge_delayed",
                        "delayMs": 25000,
                        "probability": 0.2,
                        "outcomeMessages": [
                            {
                                "roles": [
                                    "mobility",
                                    "jfac"
                                ],
                                "title": "Mediterranean Frontal Weather Slowing Trailing C-17 Chalks",
                                "messages": [
                                    "Met Office flight watch reports strong headwinds and turbulence over the central Mediterranean delaying the second half of the Brize Norton transport wave.",
                                    "Air Traffic Control at Akrotiri reports severe crosswind gusts forcing trailing C-17 transports into holding patterns."
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
                            "mobility"
                        ],
                        "title": "Brize Norton C-17 & A400M Surge Wave Airborne for Cyprus",
                        "messages": [
                            "C-17 Globemasters and A400M Atlases have launched in an emergency Inter-Theatre Hub & Spoke surge from RAF Brize Norton to RAF Akrotiri.",
                            "Air Mobility crews are hauling priority Voyager spares, bulk fuel equipment, and munitions pallets across the 2,000-mile airbridge."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    },
                    {
                        "roles": [
                            "jfac",
                            "control",
                            "strike"
                        ],
                        "title": "Theatre Sustainment & Tanker Recovery Inbound to Akrotiri",
                        "messages": [
                            "UK JFAC has prioritised reception slots at RAF Akrotiri for the inbound Brize Norton resupply wave to restore Voyager tanker and fighter sortie rates.",
                            "Frontline combat cells have been notified that emergency fuel and munitions replenishment is en route from the UK Hub."
                        ],
                        "severity": "info",
                        "aiRandomize": true
                    }
                ]
            }
        }
    ]
};
