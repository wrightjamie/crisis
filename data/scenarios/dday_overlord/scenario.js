module.exports = {
    "id": "dday_overlord",
    "name": "D-Day: Operation Overlord",
    "description": "A massive Team vs. Team historical simulation of the Normandy landings. Features Fog of War and three distinct, randomized story threads (Airborne, Omaha, Carentan).",
    "mapConfig": {
        "center": [
            49.332,
            -0.852
        ],
        "zoom": 9
    },
    "roles": [
        "allied_command",
        "allied_logistics",
        "allied_display",
        "axis_command",
        "axis_panzer",
        "axis_display"
    ],
    "roleNames": {
        "allied_command": "Allied High Command (SHAEF)",
        "allied_logistics": "Allied Logistics & Naval",
        "allied_display": "Allied War Room Display (No Decisions)",
        "axis_command": "Axis OB West (Rundstedt)",
        "axis_panzer": "Axis Panzer Group West (Rommel)",
        "axis_display": "Axis War Room Display (No Decisions)"
    },
    "minUsers": 2,
    "mandatoryRoles": [
        "allied_command",
        "axis_command"
    ],
    "roleFallbacks": {
        "allied_logistics": [
            "allied_command"
        ],
        "axis_panzer": [
            "axis_command"
        ]
    },
    "initialScores": {
        "beach_control": 1,
        "allied_momentum": 3,
        "allied_supply": 4,
        "axis_fortifications": 5,
        "axis_reserves": 4
    },
    "briefings": {
        "_general": "June 6, 1944. Operation Overlord has begun. The fate of Europe hangs in the balance. This is a Team vs. Team simulation with Fog of War.",
        "allied_command": "Secure the beaches, link up the beachheads, and capture Cherbourg and Caen.",
        "allied_logistics": "Manage the massive logistical train. Support the infantry with naval gunfire.",
        "allied_display": "ALLIED WAR ROOM: Monitor the overall strategic situation.",
        "axis_command": "Hold the Atlantic Wall. Determine if this is the main invasion or a diversion for Calais.",
        "axis_panzer": "Manage the mobile armored reserve. Wait for authorization to strike the beaches.",
        "axis_display": "AXIS WAR ROOM: Monitor the defensive lines."
    },
    "aiConfig": {
        "systemPrompt": "You are an objective historical observer summarizing the Normandy invasion. Do not reveal secret intelligence.",
        "scoreLabels": {
            "1": "Critical / Axis Favored",
            "2": "Struggling / Axis Leaning",
            "3": "Contested",
            "4": "Advancing / Allied Leaning",
            "5": "Dominant / Allied Favored"
        },
        "roleContexts": {
            "allied_command": "Focus on beach control and overall momentum.",
            "allied_logistics": "Focus on allied supply levels and momentum.",
            "allied_display": "Focus on overall allied progress.",
            "axis_command": "Focus on beach control and fortifications.",
            "axis_panzer": "Focus on axis reserves and holding the line.",
            "axis_display": "Focus on overall axis defense."
        },
        "scores": {
            "beach_control": {
                "label": "Beachhead Control",
                "subject": "beachhead control",
                "isPlural": false,
                "roles": [
                    "allied_command",
                    "allied_logistics",
                    "allied_display",
                    "axis_command",
                    "axis_panzer",
                    "axis_display"
                ]
            },
            "allied_momentum": {
                "label": "Allied Momentum",
                "subject": "Allied invasion momentum",
                "isPlural": false,
                "roles": [
                    "allied_command",
                    "allied_logistics",
                    "allied_display"
                ]
            },
            "allied_supply": {
                "label": "Allied Supply",
                "subject": "Allied logistics",
                "isPlural": false,
                "roles": [
                    "allied_command",
                    "allied_logistics",
                    "allied_display"
                ]
            },
            "axis_fortifications": {
                "label": "Axis Fortifications",
                "subject": "Atlantic Wall integrity",
                "isPlural": false,
                "roles": [
                    "axis_command",
                    "axis_panzer",
                    "axis_display"
                ]
            },
            "axis_reserves": {
                "label": "Axis Reserves",
                "subject": "Axis mobile reserves",
                "isPlural": true,
                "roles": [
                    "axis_command",
                    "axis_panzer",
                    "axis_display"
                ]
            }
        }
    },
    "variantAxes": [
        {
            "id": "weather",
            "name": "English Channel Weather",
            "options": [
                {
                    "id": "clear",
                    "name": "Clear Skies",
                    "briefingText": "The weather is optimal for the invasion.",
                    "scoreModifiers": {
                        "allied_momentum": 1
                    }
                },
                {
                    "id": "overcast",
                    "name": "Overcast & Choppy",
                    "briefingText": "Marginal weather. Air support may be limited.",
                    "scoreModifiers": {
                        "allied_momentum": 0
                    }
                },
                {
                    "id": "stormy",
                    "name": "Approaching Storm",
                    "briefingText": "A severe storm is threatening the channel, risking logistics.",
                    "scoreModifiers": {
                        "allied_supply": -1,
                        "allied_momentum": -1
                    }
                }
            ]
        },
        {
            "id": "axis_readiness",
            "name": "Axis Command Readiness",
            "options": [
                {
                    "id": "rommel_leave",
                    "name": "Rommel on Leave",
                    "briefingText": "Rommel is in Germany for his wife's birthday. Command is sluggish.",
                    "scoreModifiers": {
                        "axis_reserves": -1
                    }
                },
                {
                    "id": "rommel_present",
                    "name": "Rommel at the Front",
                    "briefingText": "Rommel is actively touring the defenses.",
                    "scoreModifiers": {
                        "axis_fortifications": 1
                    }
                },
                {
                    "id": "high_alert",
                    "name": "Full Alert",
                    "briefingText": "The Axis forces were expecting an imminent attack.",
                    "scoreModifiers": {
                        "axis_reserves": 1,
                        "axis_fortifications": 1
                    }
                }
            ]
        }
    ],
    "assets": [
        {
            "id": "omaha_beach",
            "image": "rfa_mounts_bay",
            "name": "Omaha Beach",
            "location": [
                49.37,
                -0.88
            ],
            "state": "contested",
            "tags": [
                "objective"
            ],
            "briefing": "Omaha Beach was the codename for one of the primary American landing sectors during the Normandy invasion. Heavily defended by entrenched German forces of the 352nd Infantry Division on steep bluffs, the sector witnessed intense fire and high Allied casualties before troops secured the seawall and bluffs."
        },
        {
            "id": "utah_beach",
            "image": "rfa_mounts_bay",
            "name": "Utah Beach",
            "location": [
                49.42,
                -1.17
            ],
            "state": "contested",
            "tags": [
                "objective"
            ],
            "briefing": "Utah Beach was the westernmost Allied landing sector on the Cotentin Peninsula, assaulted by the US 4th Infantry Division supported by airborne drops inland. Troops landed slightly south of their intended zone against lighter resistance, quickly linking up with the 82nd and 101st Airborne Divisions."
        },
        {
            "id": "gold_beach",
            "image": "rfa_mounts_bay",
            "name": "Gold Beach",
            "location": [
                49.34,
                -0.57
            ],
            "state": "contested",
            "tags": [
                "objective"
            ],
            "briefing": "Gold Beach was the centre of the British landing sector, assaulted by the British 50th (Northumbrian) Infantry Division. The objective was to secure a beachhead, capture Arromanches for the Mulberry artificial harbour, and link up with American forces at Omaha and Canadians at Juno."
        },
        {
            "id": "juno_beach",
            "image": "rfa_mounts_bay",
            "name": "Juno Beach",
            "location": [
                49.33,
                -0.45
            ],
            "state": "contested",
            "tags": [
                "objective"
            ],
            "briefing": "Juno Beach was the landing zone assigned to the 3rd Canadian Infantry Division. Facing heavy coastal fortifications and treacherous offshore reefs, Canadian troops broke through German beach defences and advanced further inland on D-Day than any other Allied landing force."
        },
        {
            "id": "sword_beach",
            "image": "rfa_mounts_bay",
            "name": "Sword Beach",
            "location": [
                49.3,
                -0.3
            ],
            "state": "contested",
            "tags": [
                "objective"
            ],
            "briefing": "Sword Beach was the easternmost Allied landing zone, assaulted by the British 3rd Division supported by French Commandos. Located closest to the strategic city of Caen and the vulnerable Allied eastern flank, troops linked up with airborne forces at Pegasus Bridge while repelling early counter-attacks by the 21st Panzer Division."
        },
        {
            "id": "caen",
            "image": "generic_deployment",
            "name": "Caen",
            "location": [
                49.18,
                -0.37
            ],
            "state": "axis_controlled",
            "tags": [
                "city",
                "axis_panzer"
            ],
            "briefing": "Caen was a critical road and rail communications hub in Normandy, and the primary D-Day objective for British and Canadian forces. Heavily fortified and tenaciously defended by elite German Panzer divisions, the protracted Battle for Caen became an intense war of attrition tying down German armoured reserves."
        },
        {
            "id": "cherbourg",
            "image": "ukr_odesa_port",
            "name": "Cherbourg Deep Water Port",
            "location": [
                49.63,
                -1.62
            ],
            "state": "axis_controlled",
            "tags": [
                "logistics"
            ],
            "briefing": "The deep-water port of Cherbourg at the northern tip of the Cotentin Peninsula was vital for sustaining the Allied advance across northwestern Europe. Allied logistics critically depended on capturing its deep berths intact to land heavy armour, fuel, and supplies directly from ocean transports."
        },
        {
            "id": "pointe_du_hoc",
            "image": "generic_deployment",
            "name": "Pointe du Hoc",
            "location": [
                49.39,
                -0.98
            ],
            "state": "axis_controlled",
            "tags": [
                "artillery"
            ],
            "briefing": "Pointe du Hoc is a prominent 100-foot cliff overlooking the English Channel between Utah and Omaha beaches. Believed to host heavy German artillery capable of devastating both American landing sectors, it was assaulted by the US 2nd Ranger Battalion in an iconic cliff assault using ropes and grappling ladders."
        }
    ],
    "manualActions": [
        {
            "id": "act_allied_naval_barrage",
            "image": "ev_naval_strike",
            "name": "Request Naval Barrage",
            "description": "Call in heavy offshore bombardment from battleships. Uses significant supply.",
            "initiator": [
                "allied_command",
                "allied_logistics"
            ],
            "conditions": {
                "minScores": {
                    "allied_supply": 2
                }
            },
            "effects": {
                "scores": {
                    "allied_supply": -1,
                    "axis_fortifications": -1,
                    "allied_momentum": 1
                }
            }
        },
        {
            "id": "act_axis_release_panzers",
            "image": "brigade_alpha",
            "name": "Request Panzer Release (Hitler)",
            "description": "Attempt to wake Hitler and get authorization to release the main Panzer reserves.",
            "initiator": [
                "axis_command"
            ],
            "conditions": {
                "minScores": {
                    "axis_reserves": 2
                }
            },
            "effects": {
                "randomEvents": [
                    {
                        "id": "ev_hitler_wakes",
            "image": "ev_crisis_cabinet",
                        "weight": 30,
                        "effects": {
                            "scores": {
                                "axis_reserves": 2,
                                "beach_control": -1
                            }
                        }
                    },
                    {
                        "id": "ev_hitler_sleeps",
            "image": "ev_crisis_cabinet",
                        "weight": 70,
                        "effects": {
                            "scores": {
                                "axis_reserves": -1
                            }
                        }
                    }
                ]
            }
        }
    ],
    "eventTemplates": [
        {
            "id": "ev_start",
            "image": "ev_airborne_paratroop_drop",
            "name": "Midnight, June 6",
            "description": "Operation Overlord commences. Airborne pathfinders are dropping in.",
            "location": [
                49.31,
                -1.3
            ],
            "triggerEvents": [
                {
                    "id": "th1_airborne_start",
            "image": "ev_airborne_paratroop_drop",
                    "delayMs": 90000,
                    "probability": 1
                },
                {
                    "id": "th2_omaha_start",
            "image": "generic_deployment",
                    "delayMs": 270000,
                    "probability": 1
                },
                {
                    "id": "th3_carentan_start",
            "image": "generic_deployment",
                    "delayMs": 450000,
                    "probability": 1
                },
                {
                    "id": "ev_endgame_eval",
            "image": "ev_crisis_cabinet",
                    "delayMs": 600000,
                    "probability": 1
                },
                {
                    "id": "ev_luftwaffe_appearance",
            "image": "ev_bomber_intercept",
                    "delayMs": 400000,
                    "probability": 0.3
                },
                {
                    "id": "ev_french_sabotage",
            "image": "ev_russia_hub_explosion",
                    "delayMs": 200000,
                    "probability": 0.6
                },
                {
                    "id": "ev_allied_air_superiority",
            "image": "typhoon_aircraft",
                    "delayMs": 600000,
                    "probability": 0.9
                }
            ]
        },
        {
            "id": "th1_airborne_start",
            "image": "ev_airborne_paratroop_drop",
            "name": "Airborne Drops Commenced",
            "description": "Paratroopers are landing behind enemy lines.",
            "location": [
                49.31,
                -1.3
            ],
            "hiddenFrom": [
                "axis_command",
                "axis_panzer",
                "axis_display"
            ],
            "decisions": [
                {
                    "role": "allied_command",
                    "text": "Drop Zone Chaos?",
                    "options": [
                        {
                            "id": "consolidate",
                            "text": "Consolidate scattered units",
                            "effects": {
                                "scores": {
                                    "allied_momentum": -1,
                                    "allied_supply": 1
                                }
                            }
                        },
                        {
                            "id": "push",
                            "text": "Push objectives immediately",
                            "effects": {
                                "scores": {
                                    "allied_momentum": 1,
                                    "allied_supply": -1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th1_pegasus_gliders",
            "image": "ev_airborne_paratroop_drop",
                    "delayMs": 90000,
                    "probability": 1
                },
                {
                    "id": "th1_axis_confusion",
            "image": "generic_deployment",
                    "delayMs": 90000,
                    "probability": 1
                },
                {
                    "id": "th1_merville_battery",
            "image": "act_special_forces",
                    "delayMs": 150000,
                    "probability": 0.8
                }
            ]
        },
        {
            "id": "th1_axis_confusion",
            "image": "generic_deployment",
            "name": "Reports of Paratroopers",
            "description": "Scattered reports of enemy paratroopers in Normandy. Is it a major invasion or a diversion?",
            "location": [
                49.18,
                -0.37
            ],
            "hiddenFrom": [
                "allied_command",
                "allied_logistics",
                "allied_display"
            ],
            "decisions": [
                {
                    "role": "axis_command",
                    "text": "Initial Posture?",
                    "options": [
                        {
                            "id": "alert_normandy",
                            "text": "Sound general alarm in Normandy",
                            "effects": {
                                "scores": {
                                    "axis_fortifications": 1,
                                    "axis_reserves": -1
                                }
                            }
                        },
                        {
                            "id": "hold_firm",
                            "text": "Hold positions, wait for daylight",
                            "effects": {
                                "scores": {
                                    "axis_reserves": 1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th1_21st_panzer",
            "image": "evt_armor_push",
                    "delayMs": 90000,
                    "probability": 0.8
                }
            ]
        },
        {
            "id": "th1_pegasus_gliders",
            "image": "ev_airborne_paratroop_drop",
            "name": "Gliders at Pegasus Bridge",
            "description": "British glider troops have landed directly on the critical bridge over the Caen canal.",
            "location": [
                49.24,
                -0.27
            ],
            "hiddenFrom": [
                "axis_command",
                "axis_panzer",
                "axis_display"
            ],
            "decisions": [
                {
                    "role": "allied_command",
                    "text": "Hold or Advance?",
                    "options": [
                        {
                            "id": "hold",
                            "text": "Hold the bridge",
                            "effects": {
                                "scores": {
                                    "allied_momentum": 1
                                }
                            }
                        },
                        {
                            "id": "advance",
                            "text": "Push out and ambush patrols",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th1_glider_crash",
            "image": "ev_airborne_paratroop_drop",
                    "delayMs": 120000,
                    "probability": 0.3
                }
            ]
        },
        {
            "id": "th1_21st_panzer",
            "image": "evt_armor_push",
            "name": "21st Panzer Reacts",
            "description": "Local Axis commanders are requesting permission to commit the 21st Panzer Division against the British airborne.",
            "location": [
                49.15,
                -0.35
            ],
            "hiddenFrom": [
                "allied_command",
                "allied_logistics",
                "allied_display"
            ],
            "decisions": [
                {
                    "role": "axis_panzer",
                    "text": "Commit Reserves?",
                    "options": [
                        {
                            "id": "commit",
                            "text": "Commit 21st Panzer immediately",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -2,
                                    "allied_momentum": -1
                                }
                            }
                        },
                        {
                            "id": "wait",
                            "text": "Wait for coordinated orders",
                            "effects": {
                                "scores": {
                                    "axis_reserves": 1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th1_airborne_linkup",
            "image": "generic_deployment",
                    "delayMs": 90000,
                    "probability": 0.6
                },
                {
                    "id": "th1_glider_reinforcements",
            "image": "ev_airborne_paratroop_drop",
                    "delayMs": 90000,
                    "probability": 0.7
                },
                {
                    "id": "th1_bayeux_push",
            "image": "generic_deployment",
                    "delayMs": 240000,
                    "probability": 0.7
                }
            ]
        },
        {
            "id": "th1_airborne_linkup",
            "image": "generic_deployment",
            "name": "Airborne Linkup Delayed",
            "description": "Heavy German resistance is delaying the linkup between the beaches and the airborne troops.",
            "location": [
                49.2,
                -0.3
            ],
            "effects": {
                "scores": {
                    "allied_momentum": -1,
                    "beach_control": -1
                }
            }
        },
        {
            "id": "th1_glider_reinforcements",
            "image": "ev_airborne_paratroop_drop",
            "name": "Glider Reinforcements",
            "description": "A second wave of gliders is arriving to reinforce the airborne troops.",
            "location": [
                49.24,
                -0.27
            ],
            "hiddenFrom": [
                "axis_command",
                "axis_panzer",
                "axis_display"
            ],
            "decisions": [
                {
                    "role": "allied_logistics",
                    "text": "Landing Zones?",
                    "options": [
                        {
                            "id": "safe",
                            "text": "Use secure LZs (Slower deployment)",
                            "effects": {
                                "scores": {
                                    "allied_supply": 1
                                }
                            }
                        },
                        {
                            "id": "hot",
                            "text": "Drop right onto the lines (Heavy casualties)",
                            "effects": {
                                "scores": {
                                    "allied_momentum": 1,
                                    "allied_supply": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th2_omaha_start",
            "image": "generic_deployment",
            "name": "Bloody Omaha",
            "description": "The first waves are hitting Omaha Beach. The bombardment missed the bunkers.",
            "location": [
                49.37,
                -0.88
            ],
            "decisions": [
                {
                    "role": "allied_command",
                    "text": "Omaha Crisis?",
                    "options": [
                        {
                            "id": "abandon",
                            "text": "Consider abandoning Omaha",
                            "effects": {
                                "scores": {
                                    "beach_control": -1,
                                    "allied_momentum": -2,
                                    "allied_supply": 1
                                }
                            }
                        },
                        {
                            "id": "press",
                            "text": "Rangers lead the way!",
                            "effects": {
                                "scores": {
                                    "beach_control": 1,
                                    "axis_fortifications": -1,
                                    "allied_momentum": -1
                                }
                            }
                        }
                    ]
                },
                {
                    "role": "axis_command",
                    "text": "Omaha Defense?",
                    "options": [
                        {
                            "id": "pin",
                            "text": "Keep them pinned on the sand",
                            "effects": {
                                "scores": {
                                    "beach_control": -1,
                                    "allied_momentum": -1
                                }
                            }
                        },
                        {
                            "id": "counter",
                            "text": "Local infantry counter-attack",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -1,
                                    "beach_control": -1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th2_pointe_du_hoc",
            "image": "generic_deployment",
                    "delayMs": 90000,
                    "probability": 1
                },
                {
                    "id": "th2_naval_close_support",
            "image": "ev_naval_strike",
                    "delayMs": 90000,
                    "probability": 0.8
                },
                {
                    "id": "th2_wn62_resistance",
            "image": "generic_deployment",
                    "delayMs": 90000,
                    "probability": 0.9
                },
                {
                    "id": "th2_vierville_draw",
            "image": "generic_deployment",
                    "delayMs": 180000,
                    "probability": 0.9
                },
                {
                    "id": "th2_artillery_spotters",
            "image": "drone_squad",
                    "delayMs": 150000,
                    "probability": 0.6
                }
            ]
        },
        {
            "id": "th2_pointe_du_hoc",
            "image": "generic_deployment",
            "name": "Scaling Pointe du Hoc",
            "description": "US Rangers are scaling the cliffs to silence heavy coastal guns.",
            "location": [
                49.39,
                -0.98
            ],
            "decisions": [
                {
                    "role": "allied_logistics",
                    "text": "Naval Support?",
                    "options": [
                        {
                            "id": "cover",
                            "text": "Provide suppressing fire",
                            "effects": {
                                "scores": {
                                    "allied_supply": -1,
                                    "axis_fortifications": -1
                                }
                            }
                        },
                        {
                            "id": "trust",
                            "text": "Let the Rangers work",
                            "effects": {
                                "scores": {}
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th2_naval_close_support",
            "image": "ev_naval_strike",
            "name": "Destroyers Close In",
            "description": "Allied destroyers are scraping the bottom to provide point-blank fire support on Omaha.",
            "location": [
                49.38,
                -0.87
            ],
            "effects": {
                "scores": {
                    "axis_fortifications": -2,
                    "beach_control": 1,
                    "allied_supply": -1
                }
            },
            "triggerEvents": [
                {
                    "id": "th2_dog_green_breakout",
            "image": "generic_deployment",
                    "delayMs": 90000,
                    "probability": 0.7
                },
                {
                    "id": "th2_omaha_ammunition",
            "image": "ev_logistics_failure",
                    "delayMs": 240000,
                    "probability": 0.7
                }
            ]
        },
        {
            "id": "th2_wn62_resistance",
            "image": "generic_deployment",
            "name": "Widerstandsnest 62",
            "description": "A heavily fortified Axis strongpoint is pouring devastating fire onto the beach.",
            "location": [
                49.36,
                -0.85
            ],
            "hiddenFrom": [
                "allied_command",
                "allied_logistics",
                "allied_display"
            ],
            "decisions": [
                {
                    "role": "axis_command",
                    "text": "Reinforce WN62?",
                    "options": [
                        {
                            "id": "send_troops",
                            "text": "Feed troops into the meatgrinder",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -1,
                                    "allied_momentum": -1
                                }
                            }
                        },
                        {
                            "id": "conserve",
                            "text": "Conserve forces for inland defense",
                            "effects": {
                                "scores": {
                                    "axis_fortifications": -1,
                                    "beach_control": 1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th2_ranger_reinforcements",
            "image": "generic_deployment",
                    "delayMs": 180000,
                    "probability": 0.5
                }
            ]
        },
        {
            "id": "th2_dog_green_breakout",
            "image": "generic_deployment",
            "name": "Breakout at Dog Green",
            "description": "Allied infantry have finally crested the bluffs at Omaha and are infiltrating the German trench networks.",
            "location": [
                49.37,
                -0.88
            ],
            "effects": {
                "scores": {
                    "beach_control": 2,
                    "axis_fortifications": -1,
                    "allied_momentum": 1
                }
            }
        },
        {
            "id": "th3_carentan_start",
            "image": "generic_deployment",
            "name": "The Push for Carentan",
            "description": "The Allies must capture Carentan to link Utah and Omaha beaches. The Axis must hold it to keep the beaches divided.",
            "location": [
                49.3,
                -1.24
            ],
            "decisions": [
                {
                    "role": "allied_command",
                    "text": "Commitment?",
                    "options": [
                        {
                            "id": "all_in",
                            "text": "Throw everything at Carentan",
                            "effects": {
                                "scores": {
                                    "beach_control": 1,
                                    "allied_momentum": -1
                                }
                            }
                        }
                    ]
                },
                {
                    "role": "axis_panzer",
                    "text": "Fallschirmjäger Defense?",
                    "options": [
                        {
                            "id": "defend",
                            "text": "Lions of Carentan: Hold the town",
                            "effects": {
                                "scores": {
                                    "axis_fortifications": 1,
                                    "beach_control": -1
                                }
                            }
                        },
                        {
                            "id": "withdraw",
                            "text": "Withdraw and regroup",
                            "effects": {
                                "scores": {
                                    "axis_reserves": 1,
                                    "beach_control": 1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th3_flooded_fields",
            "image": "evt_flood_warning",
                    "delayMs": 90000,
                    "probability": 1
                },
                {
                    "id": "th3_counter_attack_carentan",
            "image": "evt_armor_push",
                    "delayMs": 90000,
                    "probability": 0.6
                },
                {
                    "id": "th3_douve_bridges",
            "image": "ev_bridge_collapse",
                    "delayMs": 150000,
                    "probability": 0.8
                }
            ]
        },
        {
            "id": "th3_flooded_fields",
            "image": "evt_flood_warning",
            "name": "Flooded Bocage",
            "description": "Rommel ordered the fields around Carentan flooded. The Allies are bogged down.",
            "location": [
                49.32,
                -1.22
            ],
            "effects": {
                "scores": {
                    "allied_momentum": -2,
                    "axis_fortifications": 1
                }
            },
            "triggerEvents": [
                {
                    "id": "th3_engineer_assault",
            "image": "generic_deployment",
                    "delayMs": 90000,
                    "probability": 0.8
                }
            ]
        },
        {
            "id": "th3_engineer_assault",
            "image": "generic_deployment",
            "name": "Combat Engineers",
            "description": "Allied engineers are trying to blow the causeways and drain the fields.",
            "location": [
                49.32,
                -1.22
            ],
            "hiddenFrom": [
                "axis_command",
                "axis_panzer",
                "axis_display"
            ],
            "decisions": [
                {
                    "role": "allied_logistics",
                    "text": "Supply Allocation?",
                    "options": [
                        {
                            "id": "explosives",
                            "text": "Prioritize explosives (Hurt infantry supply)",
                            "effects": {
                                "scores": {
                                    "allied_momentum": 2,
                                    "allied_supply": -1
                                }
                            }
                        },
                        {
                            "id": "balanced",
                            "text": "Maintain balanced supply",
                            "effects": {
                                "scores": {
                                    "allied_momentum": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th3_counter_attack_carentan",
            "image": "evt_armor_push",
            "name": "17th SS Counter-Attack",
            "description": "The 17th SS Panzergrenadier Division is launching a fierce counter-attack to retake Carentan.",
            "location": [
                49.28,
                -1.26
            ],
            "hiddenFrom": [
                "allied_command",
                "allied_logistics",
                "allied_display"
            ],
            "decisions": [
                {
                    "role": "axis_panzer",
                    "text": "Attack Intensity?",
                    "options": [
                        {
                            "id": "all_out",
                            "text": "All-out assault",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -2,
                                    "beach_control": -2
                                }
                            }
                        },
                        {
                            "id": "probing",
                            "text": "Probing attacks only",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -1,
                                    "beach_control": -1
                                }
                            }
                        }
                    ]
                }
            ],
            "triggerEvents": [
                {
                    "id": "th3_bloody_gulch",
            "image": "generic_deployment",
                    "delayMs": 180000,
                    "probability": 0.7
                },
                {
                    "id": "th3_friendly_fire",
            "image": "ev_kinetic_strike",
                    "delayMs": 210000,
                    "probability": 0.2
                }
            ]
        },
        {
            "id": "ev_hitler_wakes",
            "image": "ev_crisis_cabinet",
            "name": "Hitler Authorizes Panzers",
            "description": "Hitler has finally woken up and authorized the release of the Panzer reserves.",
            "location": [
                49.18,
                -0.37
            ],
            "triggerEvents": [
                {
                    "id": "ev_panzer_assault",
            "image": "evt_armor_push",
                    "delayMs": 90000
                }
            ]
        },
        {
            "id": "ev_hitler_sleeps",
            "image": "ev_crisis_cabinet",
            "name": "Hitler Sleeps",
            "description": "No one dared wake the Führer. The Panzer reserves remain parked inland.",
            "location": [
                49.18,
                -0.37
            ],
            "hiddenFrom": [
                "allied_command",
                "allied_logistics",
                "allied_display"
            ]
        },
        {
            "id": "ev_panzer_assault",
            "image": "evt_armor_push",
            "name": "Panzer Counter-Attack!",
            "description": "Axis armored divisions are crashing into the Allied lines!",
            "location": [
                49.25,
                -0.6
            ],
            "effects": {
                "scores": {
                    "beach_control": -2,
                    "allied_momentum": -1,
                    "axis_reserves": -2
                }
            }
        },
        {
            "id": "ev_endgame_eval",
            "image": "ev_crisis_cabinet",
            "name": "Nightfall, June 6th",
            "description": "The first day of the invasion comes to a close. Assessing control of the beachhead...",
            "triggerEvents": [
                {
                    "id": "ev_end_allied_victory",
            "image": "ev_eu_success",
                    "delayMs": 1000
                },
                {
                    "id": "ev_end_axis_victory",
            "image": "ev_endgame_domestic",
                    "delayMs": 1000
                },
                {
                    "id": "ev_end_stalemate",
            "image": "ev_endgame_culmination",
                    "delayMs": 1000
                }
            ]
        },
        {
            "id": "ev_end_allied_victory",
            "image": "ev_eu_success",
            "name": "Allied Breakout",
            "description": "The Allies have secured the beaches and are pushing deep into Normandy. The liberation of Europe has begun.",
            "isEndGame": true,
            "conditions": {
                "minScores": {
                    "beach_control": 4
                }
            }
        },
        {
            "id": "ev_end_axis_victory",
            "image": "ev_endgame_domestic",
            "name": "Repelled at the Beaches",
            "description": "The Atlantic Wall held. The Allied forces were thrown back into the sea with heavy losses. Operation Overlord has failed.",
            "isEndGame": true,
            "conditions": {
                "maxScores": {
                    "beach_control": 2
                }
            }
        },
        {
            "id": "ev_end_stalemate",
            "image": "ev_endgame_culmination",
            "name": "A Bloody Stalemate",
            "description": "The Allies have a tenuous foothold, but the Axis defensive line remains intact. A brutal war of attrition in the bocage country awaits.",
            "isEndGame": true
        },
        {
            "id": "th1_merville_battery",
            "image": "act_special_forces",
            "name": "The Merville Battery",
            "description": "British paratroopers must assault heavily fortified gun emplacements threatening Sword Beach.",
            "location": [
                49.27,
                -0.19
            ],
            "hiddenFrom": [
                "axis_command",
                "axis_panzer",
                "axis_display"
            ],
            "decisions": [
                {
                    "role": "allied_command",
                    "text": "Assault Plan?",
                    "options": [
                        {
                            "id": "stealth",
                            "text": "Stealth approach",
                            "effects": {
                                "scores": {
                                    "allied_supply": 1
                                }
                            }
                        },
                        {
                            "id": "brute",
                            "text": "Brute force assault",
                            "effects": {
                                "scores": {
                                    "allied_momentum": 1,
                                    "allied_supply": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th1_bayeux_push",
            "image": "generic_deployment",
            "name": "Advance on Bayeux",
            "description": "Elements of the 50th Infantry Division are making a rapid push towards Bayeux.",
            "location": [
                49.27,
                -0.7
            ],
            "decisions": [
                {
                    "role": "axis_panzer",
                    "text": "Defend Bayeux?",
                    "options": [
                        {
                            "id": "ambush",
                            "text": "Set up Panzer ambushes in the bocage",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -1,
                                    "allied_momentum": -1
                                }
                            }
                        },
                        {
                            "id": "withdraw",
                            "text": "Withdraw to better defensive lines",
                            "effects": {
                                "scores": {
                                    "axis_fortifications": 1,
                                    "allied_momentum": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th1_glider_crash",
            "image": "ev_airborne_paratroop_drop",
            "name": "Glider LZ Compromised",
            "description": "Rommel's Asparagus (anti-glider poles) have decimated a wave of incoming gliders.",
            "location": [
                49.31,
                -1.3
            ],
            "effects": {
                "scores": {
                    "allied_momentum": -1,
                    "allied_supply": -1
                }
            }
        },
        {
            "id": "th2_vierville_draw",
            "image": "generic_deployment",
            "name": "Assault on Vierville Draw",
            "description": "The 29th Infantry is attempting to blast through the heavily defended draw at Vierville-sur-Mer.",
            "location": [
                49.37,
                -0.9
            ],
            "decisions": [
                {
                    "role": "allied_command",
                    "text": "Commit Engineers?",
                    "options": [
                        {
                            "id": "send_engineers",
                            "text": "Send combat engineers to clear obstacles",
                            "effects": {
                                "scores": {
                                    "beach_control": 1,
                                    "allied_supply": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th2_omaha_ammunition",
            "image": "ev_logistics_failure",
            "name": "Ammunition Shortage on Omaha",
            "description": "Troops pinned on the shingle are running critically low on ammunition.",
            "location": [
                49.37,
                -0.88
            ],
            "hiddenFrom": [
                "axis_command",
                "axis_panzer",
                "axis_display"
            ],
            "decisions": [
                {
                    "role": "allied_logistics",
                    "text": "Supply Priorities?",
                    "options": [
                        {
                            "id": "ammo_boats",
                            "text": "Risk landing craft to bring ammo",
                            "effects": {
                                "scores": {
                                    "allied_supply": -1,
                                    "allied_momentum": 1
                                }
                            }
                        },
                        {
                            "id": "scavenge",
                            "text": "Order troops to scavenge",
                            "effects": {
                                "scores": {
                                    "allied_momentum": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th2_artillery_spotters",
            "image": "drone_squad",
            "name": "Axis Artillery Spotters",
            "description": "Hidden German observers are directing devastating artillery fire onto the beaches.",
            "location": [
                49.36,
                -0.85
            ],
            "decisions": [
                {
                    "role": "axis_command",
                    "text": "Artillery Targets?",
                    "options": [
                        {
                            "id": "infantry",
                            "text": "Target clustered infantry",
                            "effects": {
                                "scores": {
                                    "allied_momentum": -1
                                }
                            }
                        },
                        {
                            "id": "landing_craft",
                            "text": "Target landing craft",
                            "effects": {
                                "scores": {
                                    "allied_supply": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th2_ranger_reinforcements",
            "image": "generic_deployment",
            "name": "Rangers Diverted",
            "description": "Ranger battalions meant for Pointe du Hoc are landing on Omaha to reinforce the line.",
            "location": [
                49.37,
                -0.88
            ],
            "effects": {
                "scores": {
                    "beach_control": 1,
                    "allied_momentum": 1
                }
            }
        },
        {
            "id": "th3_douve_bridges",
            "image": "ev_bridge_collapse",
            "name": "The Douve River Bridges",
            "description": "Crucial bridges over the Douve river are wired with explosives. The Allies must capture them intact.",
            "location": [
                49.33,
                -1.27
            ],
            "decisions": [
                {
                    "role": "axis_command",
                    "text": "Blow the bridges?",
                    "options": [
                        {
                            "id": "blow",
                            "text": "Blow them (Delays Allies, limits counter-attacks)",
                            "effects": {
                                "scores": {
                                    "allied_momentum": -2,
                                    "axis_reserves": -1
                                }
                            }
                        },
                        {
                            "id": "hold",
                            "text": "Hold them for Panzer use",
                            "effects": {
                                "scores": {
                                    "axis_reserves": 1,
                                    "allied_momentum": 1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th3_bloody_gulch",
            "image": "generic_deployment",
            "name": "Battle of Bloody Gulch",
            "description": "Elements of the 17th SS are launching a massive armored attack against the 101st Airborne outside Carentan.",
            "location": [
                49.28,
                -1.26
            ],
            "decisions": [
                {
                    "role": "allied_logistics",
                    "text": "Air Support?",
                    "options": [
                        {
                            "id": "call_typhoons",
                            "text": "Call in Rocket-firing Typhoons",
                            "effects": {
                                "scores": {
                                    "axis_reserves": -2,
                                    "allied_supply": -1
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "th3_friendly_fire",
            "image": "ev_kinetic_strike",
            "name": "Friendly Fire Incident",
            "description": "Allied bombers have accidentally struck friendly positions near Carentan.",
            "location": [
                49.3,
                -1.24
            ],
            "effects": {
                "scores": {
                    "allied_momentum": -1,
                    "allied_supply": -1
                }
            }
        },
        {
            "id": "ev_luftwaffe_appearance",
            "image": "ev_bomber_intercept",
            "name": "Luftwaffe Sortie",
            "description": "Two Fw 190s make a strafing run down the beaches. A rare sight today.",
            "location": [
                49.37,
                -0.88
            ],
            "effects": {
                "scores": {
                    "allied_momentum": -1
                }
            }
        },
        {
            "id": "ev_french_sabotage",
            "image": "ev_russia_hub_explosion",
            "name": "Rail Network Sabotaged",
            "description": "The Resistance has blown key rail lines, delaying Axis reinforcements.",
            "location": [
                48.85,
                2.35
            ],
            "effects": {
                "scores": {
                    "axis_reserves": -1
                }
            }
        },
        {
            "id": "ev_allied_air_superiority",
            "image": "typhoon_aircraft",
            "name": "Air Supremacy",
            "description": "Allied fighters are dominating the skies, severely restricting Axis daytime movement.",
            "location": [
                49.3,
                -0.8
            ],
            "effects": {
                "scores": {
                    "axis_reserves": -1,
                    "axis_fortifications": -1
                }
            }
        },
        {
            "id": "fac_allied_intel_coup",
            "image": "ev_strike_options_secured",
            "name": "FACILITATOR: Ultra Intel Coup (Pro-Allied)",
            "description": "Bletchley Park has decrypted vital German deployment orders. This gives the Allies a massive advantage.",
            "requiresUnlock": true,
            "effects": {
                "scores": {
                    "allied_momentum": 2,
                    "axis_fortifications": -1,
                    "axis_reserves": -1
                }
            }
        },
        {
            "id": "fac_axis_strategic_reserve",
            "image": "us_v_corps",
            "name": "FACILITATOR: OKW Releases Reserves (Pro-Axis)",
            "description": "The German High Command has unexpectedly released heavy Panzer and SS reserves directly into the battle.",
            "requiresUnlock": true,
            "effects": {
                "scores": {
                    "axis_reserves": 3,
                    "allied_momentum": -2,
                    "beach_control": -1
                }
            }
        },
        {
            "id": "fac_logistics_disaster",
            "image": "ev_port_damage",
            "name": "FACILITATOR: Mulberry Collapse (Pro-Axis)",
            "description": "A catastrophic structural failure at the artificial harbors has crippled the Allied supply chain.",
            "requiresUnlock": true,
            "effects": {
                "scores": {
                    "allied_supply": -3,
                    "allied_momentum": -1
                }
            }
        },
        {
            "id": "fac_french_uprising",
            "image": "generic_deployment",
            "name": "FACILITATOR: Maquis General Uprising (Pro-Allied)",
            "description": "The French Resistance has launched a coordinated, massive uprising across Normandy, throwing German rear echelons into chaos.",
            "requiresUnlock": true,
            "effects": {
                "scores": {
                    "axis_reserves": -2,
                    "axis_fortifications": -2
                }
            }
        }
    ]
};
