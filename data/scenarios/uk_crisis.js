module.exports = {
        id: 'uk_crisis',
        name: 'UK Crisis: Russian Tensions',
        description: 'Manage domestic and international fallout during escalating tensions in Europe.',
        mapConfig: { center: [54.5, -2.5], zoom: 6 },
        roles: ['home', 'defence', 'foreign', 'media', 'cyber', 'display'],
        initialScores: {
            uk_russia: 3,
            military_escalation: 2,
            civilian_stability: 3,
            uk_us: 2,
            uk_europe: 2,
            military_readiness: 2
        },
        briefings: {
            _general: 'It is early 2025. Relations between NATO and Russia have deteriorated sharply following a series of provocations in the Baltic states. The UK government has convened COBRA to coordinate the national response.',
            home: 'As Home Secretary, your primary concern is domestic stability. Public anxiety is rising, and you must balance civil liberties with national security measures.',
            defence: 'As Secretary of State for Defence, you oversee all military assets and readiness. Your forces are stretched and every deployment decision carries strategic weight.',
            foreign: 'As Foreign Secretary, you are the UK\'s diplomatic face. Allies are watching your every move, and missteps could fracture NATO cohesion.',
            media: 'As Director of Communications, you control the narrative. The press is hungry for information, and social media is a wildfire of rumour and disinformation.',
            cyber: 'As Director of NCSC, you are the front line of digital defence. State-sponsored attacks are escalating and critical infrastructure is vulnerable.'
        },
        aiConfig: {
            systemPrompt: `You are an automated intelligence reporting system.
CRITICAL RULES:
- Describe the objective situation.
- NEVER refer to the player, "you", "your", or their role name.
- Write exactly ONE short paragraph (1-2 sentences). Do NOT output bullet points.
- Start directly with the operational impact. Do not use greetings.
- Do not use markdown formatting.
- Stick to the provided facts.
- Use clear, simple language suitable for 13-18 year olds while maintaining a professional report style.`,
            scoreLabels: {
                1: "Critical",
                2: "Poor",
                3: "Adequate",
                4: "Strong",
                5: "Secure"
            },
            roleContexts: {
                home: "Focus area: domestic public order, police readiness, civilian morale, and internal security.",
                defence: "Focus area: military readiness, troop deployments, and global kinetic threats.",
                foreign: "Focus area: diplomatic relations, international alliances, and geopolitical maneuvering.",
                cyber: "Focus area: critical infrastructure defense, cyber threats, and intelligence.",
                media: "Focus area: public perception, media narrative, and managing civilian panic."
            },
            scores: {
                uk_russia: { label: "UK-Russia Relations", subject: "diplomatic relations with Russia", isPlural: true, roles: ["foreign", "defence"] },
                military_escalation: { label: "Military Escalation", subject: "the global military threat level", isPlural: false, roles: ["home", "defence", "cyber"] },
                civilian_stability: { label: "Civilian Stability", subject: "domestic public order and civilian morale", isPlural: false, roles: ["home", "media"] },
                uk_us: { label: "UK-US Alliance", subject: "the strength of the special relationship with the USA", isPlural: false, roles: ["foreign", "cyber"] },
                uk_europe: { label: "European Cohesion", subject: "cohesion with European allies", isPlural: false, roles: ["foreign", "media"] },
                military_readiness: { label: "Mil. Readiness", subject: "the combat capability and deployment status of armed forces", isPlural: false, roles: ["defence"] }
            }
        },
        variantAxes: [
            {
                id: 'pow_location',
                name: 'HMS Prince of Wales Location',
                options: [
                    {
                        id: 'pow_australia',
                        name: 'Deployed to RIMPAC (Australia)',
                        briefingText: 'The QEC Prince of Wales is currently deployed to RIMPAC exercises near Australia, approximately 3 weeks from home waters.',
                        roleBriefings: {
                            defence: 'Your primary carrier group is on the far side of the world. Air cover for the North Atlantic will be severely limited until she returns.',
                            foreign: 'Australia is expecting the RIMPAC deployment to continue. Withdrawing early risks damaging the AUKUS relationship.'
                        },
                        scoreModifiers: { military_readiness: -1 },
                        assetModifiers: [
                            { id: 'a_pow', name: 'HMS Prince of Wales', location: [-33.86, 151.20], state: 'deployed', tags: ['military', 'naval'] }
                        ]
                    },
                    {
                        id: 'pow_channel',
                        name: 'Exercising in English Channel',
                        briefingText: 'The QEC Prince of Wales is exercising in the English Channel, approximately 2 hours from Portsmouth.',
                        roleBriefings: {
                            defence: 'Your carrier is close to home and can be operationally deployed within hours. This gives you significant flexibility.'
                        },
                        scoreModifiers: { military_readiness: +1 },
                        assetModifiers: [
                            { id: 'a_pow', name: 'HMS Prince of Wales', location: [50.5, -1.0], state: 'operational', tags: ['military', 'naval'] }
                        ]
                    }
                ]
            },
            {
                id: 'iran_conflict',
                name: 'Iran Conflict Status',
                options: [
                    {
                        id: 'iran_ongoing',
                        name: 'War in Iran ongoing',
                        briefingText: 'British forces remain committed to coalition operations in the Persian Gulf. Logistics chains are stretched and reserve units are depleted.',
                        roleBriefings: {
                            defence: 'Two brigades are committed to Gulf operations. Redeployment would take weeks and damage coalition credibility.',
                            home: 'Anti-war sentiment is growing domestically. A second front would be politically toxic.',
                            foreign: 'The US expects continued UK commitment. Wavering now would severely damage the special relationship.'
                        },
                        scoreModifiers: { military_readiness: -1, uk_us: +1 }
                    },
                    {
                        id: 'iran_ended',
                        name: 'Iran conflict resolved',
                        briefingText: 'The Iran conflict concluded 6 months ago. Forces are returning but morale is fragile and equipment requires refurbishment.',
                        roleBriefings: {
                            defence: 'Returning units are fatigued but available. Equipment serviceability is around 70%.',
                            home: 'Public appetite for further military action is extremely low. Veterans\' support is a hot-button issue.'
                        },
                        scoreModifiers: { civilian_stability: +1 }
                    }
                ]
            }
        ],
        assets: [
            { id: 'a1', name: 'GCHQ Bude', location: [50.88, -4.55], state: 'operational', tags: ['intel', 'cyber'] },
            { id: 'a2', name: 'HMNB Clyde', location: [56.06, -4.81], state: 'operational', tags: ['military', 'naval'] },
            { id: 'a3', name: 'National Grid Control', location: [51.41, -0.99], state: 'operational', tags: ['civilian', 'infrastructure'] }
        ],
        eventTemplates: [
            {
                id: 'ev_cyber_london',
                name: 'Major Cyber Attack on London Financial District',
                repeatable: true,
                location: [51.51, -0.09],
                description: 'A coordinated cyber attack has targeted major banking institutions in London, disrupting trading and ATM networks.',
                roleDescriptions: {
                    home: 'Public panic is rising as payment systems fail. Reports of looting in some areas.',
                    cyber: 'Traffic originates from botnets associated with Russian state actors, targeting SWIFT gateways.',
                    defence: 'Military networks remain secure, but civilian infrastructure dependencies are critical.',
                    media: 'Social media is ablaze with rumors of a complete economic collapse. News outlets are demanding statements.'
                },
                decisions: [
                    {
                        role: 'cyber',
                        text: 'How should we respond to the ongoing DDoS on financial targets?',
                        options: [
                            { id: 'opt1', text: 'Reroute traffic through national firewall (Low risk, Moderate impact)', effects: { scores: { civilian_stability: -1 } } },
                            { id: 'opt2', text: 'Launch counter-offensive on C2 servers (High risk, High impact)', effects: { scores: { uk_russia: +1, military_escalation: +1 } } }
                        ]
                    },
                    {
                        role: 'home',
                        text: 'How to handle public unrest?',
                        options: [
                            { id: 'opt3', text: 'Deploy extra police to financial districts', effects: { scores: { civilian_stability: -1 } } },
                            { id: 'opt4', text: 'Address nation, urge calm', effects: { scores: { civilian_stability: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_protest_manchester',
                name: 'Mass Anti-War Protests in Manchester',
                repeatable: false,
                location: [53.48, -2.24],
                description: 'Over 100,000 people have gathered in Manchester city centre protesting potential military involvement in Eastern Europe.',
                roleDescriptions: {
                    home: 'Protests are largely peaceful but stretching police resources. Some radical groups spotted.',
                    media: 'Global coverage is heavy. Framing is mixed between "democratic right" and "national security threat".',
                    foreign: 'European allies are watching closely, concerned about UK resolve.'
                },
                decisions: [
                    {
                        role: 'media',
                        text: 'What is the official government stance for the press?',
                        options: [
                            { id: 'opt5', text: 'Acknowledge concerns, reiterate commitment to peace', effects: { scores: { uk_europe: -1, civilian_stability: -1 } } },
                            { id: 'opt6', text: 'Condemn disruption, emphasize national security', effects: { scores: { civilian_stability: +1, uk_europe: +1 } } }
                        ]
                    }
                ]
            }
        ]
};
