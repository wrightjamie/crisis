module.exports = {
    id: "eastern_front_breach",
    name: "Eastern Front Breach",
    description: "A fast-paced, highly kinetic tactical scenario. A sudden adversary offensive has breached the defensive line.",
    mapConfig: {
        center: [48.4647, 35.0461], // Dnipro, Ukraine coordinates as a stand-in
        zoom: 9
    },
    roles: ["commander", "logistics", "drone_ops", "artillery"],
    roleNames: {
        "commander": "Commander in Chief",
        "logistics": "Logistics & Supply",
        "drone_ops": "Drone Operations",
        "artillery": "Artillery Command"
    },
    minUsers: 2,
    mandatoryRoles: ["commander"],
    roleFallbacks: {
        "commander": ["artillery"],
        "logistics": ["commander"],
        "drone_ops": ["artillery"],
        "artillery": ["commander"]
    },
    initialScores: {
        "territorial_control": 3,
        "ammo_reserves": 4,
        "troop_morale": 3,
        "enemy_attrition": 1
    },
    assets: [
        {
            id: "brigade_alpha",
            name: "72nd Mechanized Brigade",
            image: "/images/assets/brigade_alpha.jpg",
            location: [48.6, 35.2],
            state: "operational",
            tags: ["military", "frontline"],
            briefing: "Holding the northern flank. Currently under heavy artillery fire."
        },
        {
            id: "supply_depot",
            name: "Central Supply Hub",
            location: [48.4, 34.8],
            state: "operational",
            tags: ["logistics"],
            briefing: "Main ammunition and fuel depot. Critical for sustaining the defense."
        },
        {
            id: "drone_squad",
            name: "Aerorozvidka Unit",
            location: [48.5, 35.0],
            state: "operational",
            tags: ["drone", "recon"],
            image: '/scenarios/eastern_front_breach/images/drone_squad.jpg',
            briefing: "Providing vital ISR (Intelligence, Surveillance, Reconnaissance)."
        }
    ],
    briefings: {
        _general: "At 04:00, enemy forces launched a massive combined-arms offensive. They have broken through the primary defensive line. You must stabilize the front, manage dwindling supplies, and inflict maximum attrition.",
        "commander": "You must make the hard calls on whether to hold ground or conduct a tactical retreat to save lives.",
        "logistics": "Ammunition is critically low. Route supplies carefully to where they are needed most.",
        "drone_ops": "Identify targets for artillery and monitor enemy troop movements.",
        "artillery": "Provide fire support. Conserve shells, but do not let the enemy advance uncontested."
    },
    variantAxes: [
        {
            id: "weather_conditions",
            name: "Weather Conditions",
            options: [
                {
                    id: "clear",
                    name: "Clear Skies",
                    briefingText: "Clear weather. Drones and aviation can operate freely.",
                    roleBriefings: {
                        "drone_ops": "Optimal flying conditions. Maximize reconnaissance."
                    },
                    scoreModifiers: { "ammo_reserves": 0 },
                    assetModifiers: []
                },
                {
                    id: "mud",
                    name: "Rasputitsa (Mud)",
                    briefingText: "Heavy rain has turned the ground to mud. Movement is severely restricted.",
                    roleBriefings: {
                        "logistics": "Supply lines will be slow and vulnerable.",
                        "commander": "The enemy advance will be bogged down, but so will our retreats."
                    },
                    scoreModifiers: { "territorial_control": -1, "ammo_reserves": 1 },
                    assetModifiers: []
                }
            ]
        }
    ],
    stages: [
        { id: "breach", name: "The Breach" },
        { id: "counter", name: "Counter-Battery" },
        { id: "stabilization", name: "Stabilization" }
    ],
    eventTemplates: [
        {
            id: "evt_armor_push",
            name: "Enemy Armored Push",
            image: "/images/events/evt_armor_push.jpg",
            stage: "breach",
            description: "A column of enemy tanks is pushing rapidly through the gap in the line, heading towards the supply depot.",
            location: [48.45, 35.1],
            repeatable: false,
            roleDescriptions: {
                "drone_ops": "Visual confirmation: 15+ main battle tanks.",
                "artillery": "Targets are within range of Battery Bravo."
            },
            decisions: [
                {
                    role: "commander",
                    text: "How do we halt the armored column?",
                    options: [
                        {
                            id: "mass_artillery",
                            text: "Mass Artillery Barrage",
                            effects: {
                                scores: { "ammo_reserves": 2, "enemy_attrition": 2, "territorial_control": -1 }
                            }
                        },
                        {
                            id: "fpv_drones",
                            text: "Swarm with FPV Drones",
                            conditions: {
                                assets: { "drone_squad": "operational" }
                            },
                            effects: {
                                scores: { "enemy_attrition": 1, "territorial_control": 1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_encirclement_threat",
            name: "Brigade Alpha Encirclement Threat",
            image: "/images/events/evt_encirclement_threat.jpg",
            stage: "breach",
            description: "Enemy forces are flanking Brigade Alpha. They risk being entirely cut off in the next hour.",
            location: [48.6, 35.2],
            repeatable: false,
            decisions: [
                {
                    role: "commander",
                    text: "Brigade Alpha is about to be encircled. Orders?",
                    options: [
                        {
                            id: "hold_fast",
                            text: "Hold position at all costs.",
                            effects: {
                                scores: { "territorial_control": -2, "troop_morale": 2, "enemy_attrition": 1 }
                            }
                        },
                        {
                            id: "tactical_retreat",
                            text: "Execute a tactical retreat to secondary lines.",
                            effects: {
                                scores: { "territorial_control": 2, "troop_morale": -1 }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "evt_depot_strike",
            name: "Missile Strike on Supply Depot",
            image: "/images/events/evt_depot_strike.jpg",
            stage: "counter",
            description: "Incoming ballistic missile detected heading for the Central Supply Hub.",
            location: [48.4, 34.8],
            repeatable: false,
            decisions: [
                {
                    role: "logistics",
                    text: "Missile inbound! We cannot intercept it.",
                    options: [
                        {
                            id: "evac_personnel",
                            text: "Evacuate personnel (Lose the ammo, save the team)",
                            effects: {
                                scores: { "ammo_reserves": 3, "troop_morale": -1 }
                            }
                        },
                        {
                            id: "scatter_trucks",
                            text: "Try to scatter loaded trucks (High risk to personnel)",
                            effects: {
                                scores: { "ammo_reserves": 1, "troop_morale": 2 }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    manualActions: [
        {
            id: "act_request_resupply",
            name: "Request Emergency Resupply",
            description: "Request an emergency airdrop of artillery shells.",
            initiator: ["logistics", "artillery"],
            requiresApprovalFrom: ["commander"],
            conditions: {
                minScores: { "ammo_reserves": 4 }
            },
            effects: {
                scores: { "ammo_reserves": -2, "territorial_control": 1 } // Drawing resources away from elsewhere
            }
        }
    ],
    aiConfig: {
        systemPrompt: "You are an AI assistant providing tactical summaries of the Eastern Front Breach scenario.",
        scoreLabels: {
            1: "Optimal",
            2: "Stable",
            3: "Strained",
            4: "Critical",
            5: "Failing"
        },
        roleContexts: {
            "commander": "Focuses on strategic overview, troop morale, and holding key territory.",
            "logistics": "Focuses on supply lines, ammunition stocks, and equipment.",
            "drone_ops": "Focuses on intelligence gathering and targeted strikes.",
            "artillery": "Focuses on fire support and enemy attrition."
        },
        scores: {
            territorial_control: { label: "Territorial Control", subject: "territorial control", isPlural: false, roles: ["commander"] },
            ammo_reserves: { label: "Ammo Reserves", subject: "ammo reserves", isPlural: true, roles: ["commander", "logistics", "artillery"] },
            troop_morale: { label: "Troop Morale", subject: "troop morale", isPlural: false, roles: ["commander"] },
            enemy_attrition: { label: "Enemy Attrition", subject: "enemy attrition", isPlural: false, roles: ["commander", "drone_ops", "artillery"] }
        }
    }
};
