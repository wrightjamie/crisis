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
        _general: "Welcome to the Tutorial Scenario. A severe storm has just hit the area. Flash flooding is imminent. Your goal is to keep public panic and infrastructure damage low, while maintaining emergency capacity.",
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
            description: "The national weather service has issued a severe flash flood warning for the downtown area. Immediate action is required.",
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
            description: "Evacuation routes are jammed. People are trapped in their cars as water rises.",
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
            description: "Floodwaters are threatening the main water treatment plant. If it goes offline, the town will lose clean water.",
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
        }
    ],
    manualActions: [
        {
            id: "act_press_conference",
            name: "Hold Press Conference",
            description: "Hold a press conference to reassure the public.",
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
        }
    }
};
