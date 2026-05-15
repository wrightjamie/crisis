const scenarios = [
    {
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
    },
    {
        id: 'independence_day',
        name: 'Independence Day: Global Invasion',
        description: 'Earth faces an unprecedented extraterrestrial threat. Coordinate global defense and survival.',
        mapConfig: { center: [20, 0], zoom: 2 },
        roles: ['usa', 'uk', 'china', 'russia', 'un_command', 'display'],
        initialScores: {
            global_panic: 4,
            alien_threat: 5,
            human_resistance: 1,
            un_cohesion: 2
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
                usa: "Focus area: US military survival, civilian evacuation, and maintaining the chain of command.",
                uk: "Focus area: European defense coordination, intelligence gathering, and public order.",
                china: "Focus area: Eastern hemisphere defense, reverse engineering, and maintaining industrial capacity.",
                russia: "Focus area: Strategic deterrence, vast territorial defense, and counter-strikes.",
                un_command: "Focus area: Global coordination, unified resistance, and species survival."
            },
            scores: {
                global_panic: { label: "Global Panic", subject: "worldwide civilian panic levels", isPlural: true, roles: ["un_command", "uk", "usa", "china", "russia"] },
                alien_threat: { label: "Alien Threat", subject: "the severity of the alien attacks", isPlural: false, roles: ["un_command", "usa", "uk", "china", "russia"] },
                human_resistance: { label: "Human Resistance", subject: "organized military resistance capability", isPlural: false, roles: ["un_command", "usa", "russia", "china"] },
                un_cohesion: { label: "UN Cohesion", subject: "global political unity", isPlural: false, roles: ["un_command", "uk"] }
            }
        },
        assets: [
            { id: 'area51', name: 'Area 51', location: [37.23, -115.81], state: 'operational', tags: ['military', 'research', 'usa'] },
            { id: 'gchq', name: 'GCHQ', location: [51.89, -2.07], state: 'operational', tags: ['intel', 'cyber', 'uk'] },
            { id: 'vostochny', name: 'Vostochny Cosmodrome', location: [51.88, 128.33], state: 'operational', tags: ['space', 'military', 'russia'] },
            { id: 'jiuquan', name: 'Jiuquan Satellite Launch Center', location: [40.96, 100.28], state: 'operational', tags: ['space', 'military', 'china'] }
        ],
        eventTemplates: [
            {
                id: 'ev_mothership',
                name: 'Mothership Enters Orbit',
                repeatable: false,
                location: [0, 0], // Equator
                description: 'A massive alien vessel, approximately 550km in diameter, has taken geosynchronous orbit above the Earth.',
                facilitatorNotes: 'This is the opening event. It introduces the main threat and forces UN/USA to posture. The USA decision to scramble fighters will automatically schedule the "Alien Reinforcements" event in 10 seconds.',
                roleDescriptions: {
                    usa: 'NORAD confirms the vessel is not of human origin. We are tracking smaller deployment ships detaching.',
                    un_command: 'All nations report severe communications jamming. The Secretary-General is calling for an emergency session.',
                    china: 'Our lunar observatory was destroyed shortly before the vessel arrived in Earth orbit.',
                    russia: 'Strategic rocket forces are on high alert. Requesting UN guidance on preemptive strike.'
                },
                decisions: [
                    {
                        role: 'un_command',
                        text: 'What is the immediate global directive?',
                        options: [
                            { id: 'opt_un1', text: 'Attempt peaceful communication (High risk of panic)', effects: { scores: { global_panic: +1, un_cohesion: -1 } } },
                            { id: 'opt_un2', text: 'Declare DEFCON 1 globally and prepare for hostilities', effects: { 
                                scores: { human_resistance: +1, alien_threat: +1, un_cohesion: +1 },
                                unlockEvents: ['ev_secret_weapon']
                            } }
                        ]
                    },
                    {
                        role: 'usa',
                        text: 'How should US forces posture?',
                        options: [
                            { id: 'opt_us1', text: 'Scramble all fighter wings to intercept descending craft', effects: { 
                                scores: { global_panic: -1, human_resistance: +1 },
                                triggerEvents: [
                                    { id: 'ev_alien_reinforcements', delayMs: 10000, probability: 1.0 }
                                ]
                            } },
                            { id: 'opt_us2', text: 'Evacuate major population centers immediately', effects: { scores: { global_panic: +2, alien_threat: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_alien_reinforcements',
                name: 'Alien Reinforcements Arrive',
                repeatable: false,
                requiresUnlock: true, // Only unlocked via triggerEvents from Scramble fighters
                location: [38.89, -77.03],
                description: 'Several massive landing craft have descended over major military installations, neutralizing human defenses.',
                facilitatorNotes: 'This is automatically triggered 10 seconds after the USA scrambles fighters. It has no decisions attached, it is purely narrative escalation.',
                roleDescriptions: {
                    usa: 'They anticipated our fighter scramble. We are taking heavy losses.'
                },
                decisions: []
            },
            {
                id: 'ev_city_destruction',
                name: 'Major City Annihilated',
                repeatable: true,
                conditions: {
                    minScores: { alien_threat: 5 }
                },
                possibleLocations: [
                    [40.71, -74.00], // New York
                    [51.50, -0.12],  // London
                    [35.67, 139.65], // Tokyo
                    [55.75, 37.61],  // Moscow
                    [39.90, 116.40]  // Beijing
                ],
                description: 'A targeted energy weapon from an alien destroyer has completely obliterated a major metropolitan area.',
                facilitatorNotes: 'Requires Alien Threat >= 5. This forces the UK to decide whether to unilaterally launch nukes, which drastically increases panic and resistance, or hold fire for UN cohesion.',
                roleDescriptions: {
                    uk: 'Seismic shocks felt globally. Dust cloud is disrupting satellite imaging.',
                    russia: 'Casualty estimates are in the millions. This is an extinction-level hostility.',
                    china: 'We must accelerate the reverse-engineering of the crashed scout ship from 1947.'
                },
                decisions: [
                    {
                        role: 'uk',
                        text: 'Should we launch our nuclear arsenal at the destroyers?',
                        options: [
                            { id: 'opt_uk1', text: 'Launch full strike (Extremely High Risk)', effects: { scores: { human_resistance: +2, global_panic: +2, alien_threat: +1 } } },
                            { id: 'opt_uk2', text: 'Hold fire, wait for UN coordinated counter-attack', effects: { scores: { human_resistance: -1, un_cohesion: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_secret_weapon',
                name: 'Deploy Reverse-Engineered Virus',
                repeatable: false,
                requiresUnlock: true,
                location: [37.23, -115.81],
                description: 'A computer virus, reverse-engineered from the 1947 crash, is ready to be uploaded to the mothership.',
                facilitatorNotes: 'This is the winning move. It is only unlocked if the UN declares DEFCON 1 early on. Triggers the final mission choice for the USA.',
                roleDescriptions: {
                    usa: 'We need a pilot to fly a captured scout ship into the mothership to upload it.',
                    china: 'Our scientists confirm the code will disable their shields.'
                },
                decisions: [
                    {
                        role: 'usa',
                        text: 'Who will fly the mission?',
                        options: [
                            { id: 'opt_virus1', text: 'Send our best combat pilot', effects: { scores: { human_resistance: +2, alien_threat: -2 } } },
                            { id: 'opt_virus2', text: 'Wait for automated drone integration', effects: { scores: { global_panic: +1, alien_threat: +1 } } }
                        ]
                    }
                ]
            }
        ]
    }
];

module.exports = scenarios;
