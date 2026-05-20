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
            { id: 'a3', name: 'National Grid Control', location: [51.41, -0.99], state: 'operational', tags: ['civilian', 'infrastructure'] },
            { id: 'a_typhoon', name: 'Eurofighter Typhoon', location: [53.09, -0.16], state: 'operational', tags: ['military', 'air'], image: '/images/assets/typhoon_aircraft.png', briefing: 'The Eurofighter Typhoon is the RAF\'s primary multi-role combat aircraft. Coningsby squadrons are on Quick Reaction Alert (QRA), fully armed and fueled for interception of hostile incursions.' },
            { id: 'a_f35', name: 'F-35B Lightning II', location: [52.64, 0.54], state: 'operational', tags: ['military', 'air'], image: '/images/assets/f35_aircraft.png', briefing: 'The F-35B Lightning II provides advanced stealth strike capabilities. Currently exercising with US assets to ensure NATO interoperability in contested airspace.' },
            { id: 'a_voyager', name: 'Voyager Tanker', location: [51.75, -1.58], state: 'operational', tags: ['military', 'air', 'support'], image: '/images/assets/voyager_refueler.png', briefing: 'The Voyager fleet is crucial for extending the combat radius of RAF fighters. One aircraft is permanently on standby to support QRA operations.' },
            { id: 'a_a400m', name: 'A400M Atlas', location: [51.74, -1.59], state: 'operational', tags: ['military', 'air', 'logistics'], image: '/images/assets/a400m_transport.png', briefing: 'The A400M Atlas provides tactical airlift capabilities. Heavy transport readiness is at 80%, critical for rapid deployment of personnel and equipment.' },
            { id: 'a_type45', name: 'Type 45 Destroyer', location: [50.80, -1.11], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/type_45_destroyer.png', briefing: 'Type 45 Daring-class destroyers form the backbone of the Royal Navy\'s air defense. HMS Defender is currently at sea providing a protective umbrella over carrier groups.' },
            { id: 'a_type23', name: 'Type 23 Frigate', location: [50.38, -4.18], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/type_23_frigate.png', briefing: 'The Type 23 Duke-class frigates are the core anti-submarine warfare (ASW) vessels. Two are currently tracking suspected Russian Akula-class submarines in the GIUK gap.' },
            { id: 'a_type26', name: 'Type 26 Frigate', location: [55.88, -4.38], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/type_26_frigate.png', briefing: 'The advanced Type 26 City-class frigate provides next-generation ASW capabilities. Initial sea trials are being expedited due to rising tensions.' },
            { id: 'a_qe', name: 'HMS Queen Elizabeth', location: [50.81, -1.09], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/qe_class_carrier.png', briefing: 'HMS Queen Elizabeth is the fleet flagship. Currently alongside in Portsmouth loading munitions and provisions for an extended North Atlantic deployment.' },
            { id: 'a_astute', name: 'Astute Class Submarine', location: [56.07, -4.81], state: 'operational', tags: ['military', 'naval', 'sub'], image: '/images/assets/astute_class_submarine.png', briefing: 'Astute-class nuclear attack submarines are actively deployed. Their exact locations are classified, but they are tasked with shadowing hostile ballistic missile submarines.' },
            { id: 'a_vanguard', name: 'Vanguard Class Submarine', location: [56.06, -4.82], state: 'operational', tags: ['military', 'naval', 'sub', 'strategic'], image: '/images/assets/vanguard_class_sub.png', briefing: 'The Vanguard-class carries the UK\'s Trident nuclear deterrent. At least one boat is always on Continuous At-Sea Deterrence (CASD) patrol. Communications are secure.' }
        ],
        eventTemplates: [
            {
                id: 'ev_cyber_london',
                name: 'Major Cyber Attack on London Financial District',
                prerequisites: ['ev_logistics_failure'],
                repeatable: true,
                location: [51.51, -0.09],
                image: '/images/events/ev_cyber_london.png',
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
                image: '/images/events/ev_protest_manchester.png',
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
            },
            {
                id: 'ev_logistics_failure',
                name: 'Coordinated Logistics Failure',
                repeatable: false,
                location: [51.5, -0.1], // General UK
                image: '/images/events/ev_logistics_failure.png',
                description: 'Multiple UK regions have experienced rolling outages affecting ports, rail hubs, and fuel distribution networks. Initial technical assessments indicate a coordinated cyber incident.',
                roleDescriptions: {
                    home: 'Fuel shortages are emerging in parts of the South East. Supermarkets are reporting delivery delays.',
                    cyber: 'Disruption is heavily focused on logistics and distribution systems. Attribution remains unclear.',
                    foreign: 'Russian state media has claimed the disruption is a consequence of UK cyber activity against Russian infrastructure.'
                },
                decisions: [
                    {
                        role: 'home',
                        text: 'How should we manage the emerging shortages and public panic?',
                        options: [
                            { id: 'opt_log_1', text: 'Deploy Military Aid to Civil Authorities (MACA)', effects: { scores: { civilian_stability: -2, military_readiness: +1, military_escalation: +1 } } },
                            { id: 'opt_log_2', text: 'Civilian-Led Response (No MACA Deployment)', effects: { scores: { civilian_stability: +1, uk_europe: -1 } } }
                        ]
                    },
                    {
                        role: 'foreign',
                        text: 'How do we address the Russian media claims?',
                        options: [
                            { id: 'opt_log_3', text: 'Publicly Attribute Disruption to Russia', effects: { scores: { uk_russia: +1, military_escalation: +1 } } },
                            { id: 'opt_log_4', text: 'Avoid Attribution / Call for International Investigation', effects: { scores: { uk_russia: +1, uk_europe: +1, civilian_stability: +1 } } }
                        ]
                    },
                    {
                        role: 'cyber',
                        text: 'Shall we authorise a covert cyber response?',
                        options: [
                            { id: 'opt_log_5', text: 'Authorise Limited Covert Cyber Response', effects: { scores: { uk_russia: +1, military_escalation: +2, uk_us: -1 } } },
                            { id: 'opt_log_6', text: 'Maintain Defensive Posture', effects: { scores: { military_escalation: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_cyber_exposure',
                name: 'Allied Intelligence Leak: Cyber Operations Exposed',
                prerequisites: ['ev_cyber_london'],
                repeatable: false,
                location: [51.5, -0.1], // General UK
                image: '/images/events/ev_cyber_exposure.png',
                description: 'UK involvement in cyber operations against Russian logistics has been exposed publicly. The US has issued a formal statement condemning escalation beyond agreed defensive thresholds.',
                roleDescriptions: {
                    foreign: 'The US administration stated that such actions risk widening the conflict. Other NATO partners have expressed concern over escalation control.',
                    media: 'International media is heavily reporting the leaked details. Russia is amplifying this as evidence of Western aggression.',
                    cyber: 'Intelligence sharing channels confirm the UK played a direct operational role.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'What is our diplomatic response to the leak?',
                        options: [
                            { id: 'opt_exp_1', text: 'Acknowledge and Justify Operation Publicly', effects: { scores: { uk_us: -2, uk_europe: -1, military_escalation: +1, uk_russia: +1, civilian_stability: +1 } } },
                            { id: 'opt_exp_2', text: 'Deny Direct UK Involvement', effects: { scores: { uk_us: +1, uk_russia: +1 } } },
                            { id: 'opt_exp_3', text: 'Seek Emergency NATO Consultation', effects: { scores: { uk_us: +1, uk_europe: +1, military_escalation: -1 } } }
                        ]
                    },
                    {
                        role: 'cyber',
                        text: 'What should we do regarding ongoing operations?',
                        options: [
                            { id: 'opt_exp_4', text: 'De-escalate and Freeze Cyber Operations', effects: { scores: { military_escalation: -1, uk_us: +1, uk_europe: +1, uk_russia: -1 } } },
                            { id: 'opt_exp_5', text: 'Double Down on Covert Activity', effects: { scores: { military_escalation: +2, uk_us: -2, uk_europe: -1, uk_russia: +2 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_airspace_intercept',
                name: 'Airspace Intercept Incident',
                prerequisites: ['ev_logistics_failure'],
                repeatable: true,
                location: [60.0, -10.0], // North Atlantic
                image: '/images/events/ev_airspace_intercept.png',
                description: 'RAF jets were scrambled to intercept Russian aircraft, leading to a near-miss with a civilian transatlantic flight. Aviation authorities have raised severe safety concerns.',
                roleDescriptions: {
                    defence: 'RAF quick reaction aircraft intercepted Russian reconnaissance flights operating closer to UK air corridors than assessed.',
                    media: 'Russian state media has claimed that UK aircraft behaved aggressively and endangered civilian aviation.',
                    foreign: 'The MoD maintains that all intercepts were conducted professionally.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'How should the RAF posture following this incident?',
                        options: [
                            { id: 'opt_air_1', text: 'Military Posture Increase (Visible Deterrence)', effects: { scores: { military_escalation: +2, uk_russia: +1, uk_us: +1, civilian_stability: -1 } } },
                            { id: 'opt_air_2', text: 'Maintain Standard QRA Patterns', effects: { scores: { military_escalation: 0 } } }
                        ]
                    },
                    {
                        role: 'foreign',
                        text: 'What is our diplomatic stance on the Russian claims?',
                        options: [
                            { id: 'opt_air_3', text: 'De-escalation / Diplomatic Containment', effects: { scores: { uk_russia: -1, uk_us: +1, uk_europe: +1 } } },
                            { id: 'opt_air_4', text: 'Firm Attribution / Public Warning', effects: { scores: { uk_russia: +1, military_escalation: +1, uk_us: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_maritime_shadowing',
                name: 'Maritime Shadowing & Infrastructure Tension',
                prerequisites: ['ev_logistics_failure'],
                repeatable: true,
                location: [57.0, -15.0], // Atlantic near GIUK gap
                image: '/images/events/ev_maritime_shadowing.png',
                description: 'A Royal Navy task group has been shadowing a Russian naval formation near subsea communications corridors. A temporary degradation in transatlantic data traffic has been reported.',
                roleDescriptions: {
                    defence: 'Close proximity operations with Russian warships have increased significantly.',
                    cyber: 'Unusual activity has caused a degradation in transatlantic data traffic, affecting financial and government communications.',
                    foreign: 'Russian officials accused the UK of militarising civilian infrastructure zones.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'How do we manage the naval confrontation?',
                        options: [
                            { id: 'opt_sea_1', text: 'Maintain Shadowing (Controlled Monitoring)', effects: { scores: { civilian_stability: -1 } } },
                            { id: 'opt_sea_2', text: 'Reinforce Naval Presence', effects: { scores: { military_escalation: +1, uk_russia: +1, uk_us: +1, uk_europe: -1 } } }
                        ]
                    },
                    {
                        role: 'foreign',
                        text: 'How should we address the subsea data disruptions?',
                        options: [
                            { id: 'opt_sea_3', text: 'Internationalise Incident with NATO', effects: { scores: { uk_europe: +1, uk_us: +1, military_escalation: -1, uk_russia: +1 } } },
                            { id: 'opt_sea_4', text: 'Downplay / Avoid Attribution', effects: { scores: { uk_russia: -1, uk_europe: -1, civilian_stability: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_russia_hub_explosion',
                name: 'Russian Logistics Hub Explosion',
                prerequisites: ['ev_cyber_exposure'],
                conditions: { minScores: { military_escalation: 2 } },
                repeatable: false,
                location: [55.75, 37.61], // Moscow area / Western Russia
                image: '/images/events/ev_russia_hub_explosion.png',
                description: 'A massive explosion has occurred at a transport logistics hub in western Russia. Russia has formally accused the United Kingdom of directing the attack.',
                roleDescriptions: {
                    foreign: 'Russian officials stated: "We have credible evidence that external actors, supported and directed by British intelligence structures, were involved in this atrocity."',
                    media: 'The incident is dominating international media. Russia is signalling it is reviewing appropriate responses.',
                    home: 'No supporting evidence has been released, but the accusation has rapidly escalated domestic and diplomatic tensions.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'How do we respond to the direct Russian accusation?',
                        options: [
                            { id: 'opt_hub_1', text: 'Strong Denial + Demand Evidence', effects: { scores: { uk_russia: +1, uk_us: +1, uk_europe: +1 } } },
                            { id: 'opt_hub_2', text: 'Call for Independent International Investigation', effects: { scores: { uk_russia: +1, uk_europe: +1, uk_us: +1, military_escalation: -1 } } },
                            { id: 'opt_hub_3', text: 'Reject Attribution Publicly (Hard Line)', effects: { scores: { uk_russia: +2, military_escalation: +1, uk_europe: -1 } } },
                            { id: 'opt_hub_4', text: 'Private De-escalation Channels', effects: { scores: { uk_russia: -1, military_escalation: -1 } } }
                        ]
                    },
                    {
                        role: 'defence',
                        text: 'Should we alter our defensive posture?',
                        options: [
                            { id: 'opt_hub_5', text: 'Heightened Military Posture (Deterrence Signal)', effects: { scores: { military_escalation: +2, uk_russia: +1, uk_us: +1, civilian_stability: -1 } } },
                            { id: 'opt_hub_6', text: 'Limited Cyber Defensive Measures', effects: { scores: { military_escalation: +1, uk_us: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_kinetic_strike',
                name: 'Kinetic Incident Against UK Military Asset',
                prerequisites: ['ev_maritime_shadowing'],
                conditions: { minScores: { military_escalation: 3 } },
                repeatable: false,
                location: [34.5, 33.0], // Cyprus / Akrotiri overseas base approx
                image: '/images/events/ev_kinetic_strike.png',
                description: 'An explosion has caused significant damage at a UK military logistics facility supporting overseas operations. Russian officials have implied justification without formally claiming responsibility.',
                roleDescriptions: {
                    defence: 'The incident has disrupted supply flows and prompted an immediate review of force protection measures. It appears to be a targeted attack.',
                    foreign: 'The Russian Ministry of Defence claimed: "The UK should reconsider its aggressive posture. Continued provocation will inevitably lead to consequences."',
                    home: 'The UK faces a severe disadvantage in an all-out conventional war without full allied support. The public is terrified of nuclear escalation.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'This is a direct kinetic strike. How does the UK respond geopolitically?',
                        options: [
                            { id: 'opt_kin_1', text: 'Invoke NATO Article 4 Consultations (Seek allied backing)', effects: { scores: { uk_europe: +1, uk_us: +1, military_escalation: +1 } } },
                            { id: 'opt_kin_2', text: 'Pursue Immediate Backchannel Negotiation (Freeze conflict)', effects: { scores: { uk_russia: -1, military_escalation: -1, uk_us: -1 } } }
                        ]
                    },
                    {
                        role: 'defence',
                        text: 'What is our military response?',
                        options: [
                            { id: 'opt_kin_3', text: 'Authorise Like-for-Like Kinetic Strike (Retaliation)', effects: { scores: { military_escalation: +2, uk_russia: +2 } } },
                            { id: 'opt_kin_4', text: 'Signal Nuclear Deterrence Posture (Vanguard Readiness)', effects: { scores: { military_escalation: +2, civilian_stability: -2 } } },
                            { id: 'opt_kin_5', text: 'Reinforce Defences Only (No immediate strike)', effects: { scores: { military_escalation: 0 } } }
                        ]
                    }
                ]
            }
        ]
};
