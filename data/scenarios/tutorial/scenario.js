module.exports = {
    id: "tutorial",
    name: "Tutorial Scenario",
    description: "A simple scenario to learn the mechanics of the game. Manage a local flash flood in a small town.",
    mapConfig: {
        center: [51.5074, -0.1278], // London for testing, but can be anywhere
        zoom: 12
    },
    roles: ["mayor", "emergency", "media"],
    roleNames: {
        "mayor": "Mayor's Office",
        "emergency": "Emergency Services",
        "media": "Local Media Coordinator"
    },
    minUsers: 1,
    mandatoryRoles: ["mayor"],
    roleFallbacks: {
        "mayor": ["emergency"],
        "emergency": ["mayor"],
        "media": ["mayor"]
    },
    initialScores: {
        "public_panic": 1,
        "infrastructure_damage": 1,
        "emergency_capacity": 5
    },
    assets: [
        {
            id: "water_treatment",
            name: "Main Water Treatment Plant",
            location: [51.51, -0.11],
            state: "operational",
            tags: ["infrastructure"],
            briefing: "The main water plant. Keep this operational at all costs."
        },
        {
            id: "rescue_heli",
            name: "Rescue Helicopter",
            location: [51.50, -0.14],
            state: "operational",
            tags: ["emergency"],
            briefing: "Ready for deployment for airborne rescues."
        }
    ],
    briefings: {
        _general: "Welcome to the Tutorial Scenario. A severe storm has just hit the area. Flash flooding is imminent. Your goal is to keep public panic and infrastructure damage low, while maintaining emergency capacity. *(Tutorial: Pay attention to your AI Intelligence Briefing in the top right—it will analyze your decisions and summarize the situation based on your specific role!)*",
        "mayor": "As Mayor, you have the final say on major decisions and public announcements. Keep the town calm.",
        "emergency": "You are directing the EMS, Police, and Fire departments. Watch your capacity and deploy assets wisely.",
        "media": "Your job is to manage the flow of information to the public. Be careful not to cause panic."
    },
    variantAxes: [
        {
            id: "initial_storm_intensity",
            name: "Initial Storm Intensity",
            options: [
                {
                    id: "mild",
                    name: "Mild Storm",
                    briefingText: "The storm appears mild for now, but water levels are rising.",
                    roleBriefings: {},
                    scoreModifiers: { "public_panic": 0 },
                    assetModifiers: []
                },
                {
                    id: "severe",
                    name: "Severe Storm",
                    briefingText: "A severe squall line has already dumped inches of rain.",
                    roleBriefings: {
                        "emergency": "Expect immediate strain on your resources."
                    },
                    scoreModifiers: { "public_panic": 1, "emergency_capacity": -1 },
                    assetModifiers: []
                }
            ]
        }
    ],
    stages: [
        {
            id: "stage_1",
            name: "Rising Waters"
        },
        {
            id: "stage_2",
            name: "Critical Point"
        }
    ],
    eventTemplates: [
        {
            id: "evt_flood_warning",
            name: "Flash Flood Warning Issued",
            stage: "stage_1",
            description: "The national weather service has issued a severe flash flood warning for the downtown area. Immediate action is required.\n\n*(Tutorial: Your decisions here directly impact the game's scores. A Standard Alert might raise Public Panic slightly, but a Mandatory Evacuation could drastically lower Infrastructure Damage at the cost of high panic and secondary consequences.)*",
            location: [51.5074, -0.1278],
            repeatable: false,
            facilitatorNotes: "This is the opening event. Let players read the briefing before triggering.",
            roleDescriptions: {
                "emergency": "River gauges upstream are already exceeding flood stage."
            },
            decisions: [
                {
                    role: "mayor",
                    text: "How should we alert the public?",
                    options: [
                        {
                            id: "alert_standard",
                            text: "Standard Alert (Sirens and TV)",
                            effects: {
                                scores: { "public_panic": 1 }
                            }
                        },
                        {
                            id: "alert_evac",
                            text: "Mandatory Evacuation Order",
                            effects: {
                                scores: { "public_panic": 2, "infrastructure_damage": -1 },
                                triggerEvents: [
                                    {
                                        id: "evt_evac_jam",
                                        delayMs: 10000,
                                        probability: 1.0
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_evac_jam",
            name: "Traffic Jam During Evacuation",
            stage: "stage_1",
            description: "Evacuation routes are jammed. People are trapped in their cars as water rises.\n\n*(Tutorial: This event only triggered because you chose to evacuate earlier! Notice how the 'Deploy Rescue Heli' option below requires the Rescue Helicopter asset to be operational. If that asset was destroyed, this option would be locked!)*",
            location: [51.515, -0.13],
            repeatable: false,
            requiresUnlock: false,
            facilitatorNotes: "Triggered automatically if Mandatory Evac was chosen.",
            decisions: [
                {
                    role: "emergency",
                    text: "How do we handle the traffic jam?",
                    options: [
                        {
                            id: "deploy_heli",
                            text: "Deploy Rescue Heli",
                            conditions: {
                                assets: { "rescue_heli": "operational" }
                            },
                            effects: {
                                scores: { "public_panic": -1, "emergency_capacity": -1 }
                            }
                        },
                        {
                            id: "deploy_ground",
                            text: "Send ground teams",
                            effects: {
                                scores: { "public_panic": 1, "emergency_capacity": -1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_water_plant",
            name: "Water Plant Threat",
            stage: "stage_2",
            description: "Floodwaters are threatening the main water treatment plant. If it goes offline, the town will lose clean water.\n\n*(Tutorial: Keep a close eye on your scores. If a critical score reaches 'Failing', the simulation could end in failure. You must balance the risk to infrastructure against public panic.)*",
            location: [51.51, -0.11],
            repeatable: false,
            decisions: [
                {
                    role: "mayor",
                    text: "Should we shut down the plant proactively to prevent permanent damage?",
                    options: [
                        {
                            id: "plant_shutdown",
                            text: "Shut it down (Lose water, save equipment)",
                            effects: {
                                scores: { "public_panic": 1, "infrastructure_damage": -1 }
                            }
                        },
                        {
                            id: "plant_risk",
                            text: "Keep it running (Risk destruction)",
                            effects: {
                                scores: { "infrastructure_damage": 2 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_media_rumor",
            name: "Social Media Rumors",
            stage: "stage_1",
            description: "False reports of an upstream dam failing are spreading rapidly online, causing panic.\n\n*(Tutorial: This event highlights how the Media role can independently control the 'Public Panic' score.)*",
            location: [51.52, -0.10],
            repeatable: false,
            decisions: [
                {
                    role: "media",
                    text: "How to respond to the rumors?",
                    options: [
                        {
                            id: "rumor_denial",
                            text: "Issue Official Denial",
                            effects: {
                                scores: { "public_panic": -1 }
                            }
                        },
                        {
                            id: "rumor_ignore",
                            text: "Ignore it (Focus elsewhere)",
                            effects: {
                                scores: { "public_panic": 1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_hospital_flooding",
            name: "Hospital Basement Flooding",
            stage: "stage_2",
            description: "The local hospital's backup generators are in the basement and water is rising fast.\n\n*(Tutorial: Sometimes you won't have enough 'Emergency Capacity' to save everything. Prioritization is key.)*",
            location: [51.525, -0.135],
            repeatable: false,
            decisions: [
                {
                    role: "emergency",
                    text: "Divert emergency pumps to the hospital?",
                    options: [
                        {
                            id: "hospital_divert",
                            text: "Divert Pumps (Cost capacity, save infra)",
                            effects: {
                                scores: { "emergency_capacity": 1, "infrastructure_damage": -1 }
                            }
                        },
                        {
                            id: "hospital_reserve",
                            text: "Reserve Pumps (Save capacity, lose infra)",
                            effects: {
                                scores: { "infrastructure_damage": 1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_aftermath",
            name: "Storm Receding",
            stage: "stage_2",
            description: "The rain has finally stopped and waters are slowly receding. The immediate crisis is over.\n\n*(Tutorial: The game is ending! Your final choices and scores will determine the AI-generated After Action Report.)*",
            location: [51.50, -0.12],
            repeatable: false,
            decisions: [
                {
                    role: "mayor",
                    text: "Announce the initial recovery focus?",
                    options: [
                        {
                            id: "recovery_rebuild",
                            text: "Focus on Rebuilding",
                            effects: {
                                scores: { "infrastructure_damage": -1 }
                            }
                        },
                        {
                            id: "recovery_support",
                            text: "Focus on Community Support",
                            effects: {
                                scores: { "public_panic": -1 }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    manualActions: [
        {
            id: "act_press_conference",
            name: "Hold Press Conference",
            description: "Hold a press conference to reassure the public.\n\n*(Tutorial: This is a Manual Action. It requires the 'media' or 'mayor' to initiate, and the 'mayor' must approve it. It also requires Public Panic to be 'Strained' (3) or worse before you can even attempt it!)*",
            initiator: ["media", "mayor"],
            requiresApprovalFrom: ["mayor"],
            conditions: {
                minScores: { "public_panic": 3 }
            },
            effects: {
                scores: { "public_panic": -1, "emergency_capacity": -1 }
            }
        }
    ],
    aiConfig: {
        systemPrompt: "You are an AI assistant providing summaries of the tutorial emergency scenario. Keep it clear and instructional.",
        scoreLabels: {
            1: "Optimal",
            2: "Stable",
            3: "Strained",
            4: "Critical",
            5: "Failing"
        },
        roleContexts: {
            "mayor": "Focus on overall stability and public perception.",
            "emergency": "Focus on resource allocation and saving lives.",
            "media": "Focus on information flow and managing panic."
        },
        scores: {
            public_panic: { label: "Public Panic", subject: "public panic", isPlural: false, roles: ["mayor", "media"] },
            infrastructure_damage: { label: "Infrastructure Damage", subject: "infrastructure damage", isPlural: false, roles: ["mayor", "emergency"] },
            emergency_capacity: { label: "Emergency Capacity", subject: "emergency capacity", isPlural: false, roles: ["emergency"] }
        }
    }
};
