module.exports = {
    id: "metropolis_blackout",
    name: "Metropolis Blackout",
    description: "A major city experiences a sudden, coordinated cyber-attack that knocks out power, traffic control, and emergency dispatch.",
    mapConfig: {
        center: [40.7128, -74.0060], // NYC as a stand-in for a major metropolis
        zoom: 14 // High zoom for city level
    },
    roles: ["mayor", "police", "ems", "media"],
    roleNames: {
        "mayor": "Mayor's Office",
        "police": "Police Commissioner",
        "ems": "Emergency Services Director",
        "media": "Public Relations Director"
    },
    minUsers: 2,
    mandatoryRoles: ["mayor", "police"],
    roleFallbacks: {
        "mayor": ["media"],
        "police": ["mayor"],
        "ems": ["police", "mayor"],
        "media": ["mayor"]
    },
    initialScores: {
        "public_panic": 3,
        "grid_status": 5,
        "city_budget": 2,
        "emergency_capacity": 3
    },
    assets: [
        {
            id: "main_hospital",
            name: "Metro General Hospital",
            location: [40.7150, -74.0010],
            state: "operational",
            tags: ["infrastructure", "ems"],
            briefing: "The city's largest trauma center. Backup generators are currently running."
        },
        {
            id: "central_precinct",
            name: "Central Police Precinct",
            location: [40.7110, -74.0100],
            state: "operational",
            tags: ["security"],
            briefing: "Command center for deployment of rapid response units."
        },
        {
            id: "substation_alpha",
            name: "Power Substation Alpha",
            image: "/images/assets/substation_alpha.jpg",
            location: [40.7200, -73.9950],
            state: "destroyed",
            tags: ["infrastructure", "grid"],
            briefing: "Critical power routing hub. Currently offline due to suspected cyber sabotage."
        }
    ],
    briefings: {
        _general: "At 17:00 local time, a massive blackout hit the city core. Traffic lights are down, emergency dispatch lines are overloaded, and citizens are trapped in subways. You must stabilize the city over the next 12 hours.",
        "mayor": "You oversee the entire crisis. Balancing the budget against emergency needs while keeping the public calm is your primary concern.",
        "police": "Maintain order. Looting and riots are likely as darkness falls.",
        "ems": "Coordinate fire and medical. Hospitals are running on limited backup power.",
        "media": "Control the narrative. Misinformation is spreading rapidly online about the cause of the blackout."
    },
    variantAxes: [
        {
            id: "temperature_conditions",
            name: "Weather Conditions",
            options: [
                {
                    id: "heatwave",
                    name: "Summer Heatwave",
                    briefingText: "It is 95°F (35°C). The heat is exacerbating the crisis as AC units fail.",
                    roleBriefings: {
                        "ems": "Expect heatstroke casualties to rise sharply."
                    },
                    scoreModifiers: { "public_panic": 1, "emergency_capacity": 1 },
                    assetModifiers: []
                },
                {
                    id: "winter",
                    name: "Winter Freeze",
                    briefingText: "Temperatures are below freezing. Without heating, vulnerable populations are at immediate risk.",
                    roleBriefings: {
                        "ems": "Hypothermia cases will quickly overwhelm shelters."
                    },
                    scoreModifiers: { "public_panic": 1, "grid_status": 1 },
                    assetModifiers: []
                }
            ]
        }
    ],
    stages: [
        { id: "dusk", name: "Dusk: Confusion" },
        { id: "night", name: "Nightfall: Chaos" },
        { id: "dawn", name: "Dawn: Resolution" }
    ],
    eventTemplates: [
        {
            id: "evt_hospital_power_failure",
            name: "Hospital Generator Failure",
            image: "/images/events/evt_hospital_power_failure.jpg",
            stage: "dusk",
            description: "Metro General Hospital's backup generators have failed. Critical care patients are at immediate risk.",
            location: [40.7150, -74.0010],
            repeatable: false,
            roleDescriptions: {
                "ems": "We have 15 minutes before ventilators fail completely."
            },
            decisions: [
                {
                    role: "ems",
                    text: "How do we prioritize the power restoration?",
                    options: [
                        {
                            id: "divert_police_gens",
                            text: "Requisition generators from Central Precinct",
                            effects: {
                                scores: { "emergency_capacity": -1, "public_panic": -1 },
                                triggerEvents: [
                                    { id: "evt_precinct_vulnerable", delayMs: 15000, probability: 1.0 }
                                ]
                            }
                        },
                        {
                            id: "evacuate_critical",
                            text: "Attempt to evacuate critical patients to suburbs",
                            effects: {
                                scores: { "public_panic": 1, "city_budget": 1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_precinct_vulnerable",
            name: "Central Precinct Vulnerable",
            image: "/images/events/evt_precinct_vulnerable.jpg",
            stage: "dusk",
            description: "Without backup power, the Central Precinct's communications are severely degraded.",
            location: [40.7110, -74.0100],
            repeatable: false,
            requiresUnlock: true,
            decisions: [
                {
                    role: "police",
                    text: "Communications are down. What is our posture?",
                    options: [
                        {
                            id: "fall_back",
                            text: "Consolidate forces at the precinct to defend the armory.",
                            effects: {
                                scores: { "public_panic": 2, "emergency_capacity": -1 }
                            }
                        },
                        {
                            id: "blind_patrols",
                            text: "Send out blind patrols to maintain presence.",
                            effects: {
                                scores: { "public_panic": -1, "emergency_capacity": 1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_supermarket_riot",
            name: "Supermarket Riot",
            image: "/images/events/evt_supermarket_riot.jpg",
            stage: "night",
            description: "A large crowd has gathered at a major supermarket. People are desperate for water and food.",
            location: [40.7180, -73.9980],
            repeatable: false,
            decisions: [
                {
                    role: "police",
                    text: "How do we handle the gathering crowd?",
                    options: [
                        {
                            id: "riot_gear",
                            text: "Deploy riot police to secure the building.",
                            effects: {
                                scores: { "public_panic": 1, "emergency_capacity": 1 }
                            }
                        },
                        {
                            id: "distribute_supplies",
                            text: "Work with the store owner to distribute supplies calmly.",
                            effects: {
                                scores: { "public_panic": -2, "city_budget": 1 }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    manualActions: [
        {
            id: "act_emergency_funds",
            name: "Release Emergency Funds",
            description: "Authorize immediate release of city budget to hire private contractors for grid repair.",
            initiator: ["mayor"],
            conditions: {
                minScores: { "grid_status": 4 }
            },
            effects: {
                scores: { "grid_status": -2, "city_budget": 3 }
            }
        }
    ],
    aiConfig: {
        systemPrompt: "You are an AI assistant providing summaries of the Metropolis Blackout scenario.",
        scoreLabels: {
            1: "Stable",
            2: "Strained",
            3: "Critical",
            4: "Failing",
            5: "Collapsed"
        },
        roleContexts: {
            "mayor": "Focuses on budget, overall stability, and political fallout.",
            "police": "Focuses on maintaining order, preventing riots, and security.",
            "ems": "Focuses on saving lives, managing hospital capacity, and fire response.",
            "media": "Focuses on public messaging and countering misinformation."
        },
        scores: {
            public_panic: { label: "Public Panic", subject: "public panic", isPlural: false, roles: ["mayor", "police", "media"] },
            grid_status: { label: "Grid Status", subject: "grid status", isPlural: false, roles: ["mayor", "ems"] },
            city_budget: { label: "City Budget", subject: "city budget", isPlural: false, roles: ["mayor"] },
            emergency_capacity: { label: "Emergency Capacity", subject: "emergency capacity", isPlural: false, roles: ["ems", "police"] }
        }
    }
};
