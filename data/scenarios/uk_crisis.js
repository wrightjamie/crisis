module.exports = {
        id: 'uk_crisis',
        name: 'UK Crisis: Russian Tensions',
        description: 'Manage domestic and international fallout during escalating tensions in Europe.',
        mapConfig: { center: [54.5, -2.5], zoom: 6 },
        roles: ['PM', 'home', 'defence', 'foreign', 'media', 'cyber', 'display'],
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
                            { id: 'a_pow', name: 'HMS Prince of Wales', location: [-33.86, 151.20], state: 'deployed', tags: ['military', 'naval'], image: '/images/assets/hms_prince_of_wales.png', briefing: 'The second of the Royal Navy\'s Queen Elizabeth-class aircraft carriers, currently deployed to the Indo-Pacific for exercises.' }
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
                            { id: 'a_pow', name: 'HMS Prince of Wales', location: [50.5, -1.0], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/hms_prince_of_wales.png', briefing: 'The second of the Royal Navy\'s Queen Elizabeth-class aircraft carriers, currently operating in home waters.' }
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
            },
            {
                id: 'us_administration',
                name: 'US Administration Stance',
                options: [
                    {
                        id: 'us_staunch',
                        name: 'Staunch Ally',
                        briefingText: 'The current US administration is firmly committed to NATO and the special relationship.',
                        scoreModifiers: { uk_us: +1 }
                    },
                    {
                        id: 'us_isolationist',
                        name: 'Isolationist Shift',
                        briefingText: 'The US administration is facing domestic pressure to pull back from European conflicts, focusing heavily on the Indo-Pacific instead.',
                        roleBriefings: {
                            foreign: 'Washington is reluctant to commit resources. You will need to rely more heavily on European partners.',
                            defence: 'US logistical support is not guaranteed. Conserve your assets.'
                        },
                        scoreModifiers: { uk_us: -2, uk_europe: +1 }
                    }
                ]
            },
            {
                id: 'domestic_climate',
                name: 'Domestic Climate',
                options: [
                    {
                        id: 'dom_stable',
                        name: 'Stable Economy',
                        briefingText: 'The UK economy is relatively stable and public trust in institutions is holding.',
                        scoreModifiers: { civilian_stability: +1 }
                    },
                    {
                        id: 'dom_winter',
                        name: 'Winter of Discontent',
                        briefingText: 'The crisis hits during a period of intense domestic strife, with ongoing strikes in public sectors and high inflation.',
                        roleBriefings: {
                            home: 'Public order is already fragile. Any disruption to supply chains will lead to immediate panic buying and unrest.',
                            media: 'The press is highly critical of government competence. Selling a war narrative will be extremely difficult.'
                        },
                        scoreModifiers: { civilian_stability: -2 }
                    }
                ]
            }
        ],
        assets: [
            { id: 'a1', name: 'GCHQ Bude', location: [50.88, -4.55], state: 'operational', tags: ['intel', 'cyber'], image: '/images/assets/gchq_bude.png', briefing: 'GCHQ Bude is a satellite ground station and eavesdropping centre located on the north coast of Cornwall, England.' },
            { id: 'a2', name: 'HMNB Clyde', location: [56.06, -4.81], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/hmnb_clyde.png', briefing: 'Her Majesty\'s Naval Base Clyde is one of three operating bases in the United Kingdom for the Royal Navy and is the base for the UK\'s continuous at-sea nuclear deterrent.' },
            { id: 'a3', name: 'National Grid Control', location: [51.41, -0.99], state: 'operational', tags: ['civilian', 'infrastructure'], image: '/images/assets/national_grid.png', briefing: 'The National Grid Control Centre oversees the electricity and gas transmission system in Great Britain, balancing supply and demand.' },
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
            },
            {
                id: 'ev_sub_surfaces',
                name: 'Russian Submarine Surfaces in the Channel',
                prerequisites: [],
                conditions: { maxScores: { civilian_stability: 4 } },
                repeatable: false,
                location: [51.0, 1.5],
                description: 'A Russian ballistic missile submarine has intentionally surfaced in the English Channel near Dover, in plain view of civilian ferries. Massive public panic is unfolding on social media.',
                roleDescriptions: {
                    home: 'Emergency services are inundated with panicked calls. Social media is spreading rumors of an imminent nuclear strike.',
                    defence: 'The submarine is currently stationary on the surface. It is a clear demonstration of capability and intent, not an immediate attack vector.',
                    media: 'Images of the submarine are broadcasting globally. We need to control the narrative before panic causes widespread disruption.'
                },
                decisions: [
                    {
                        role: 'media',
                        text: 'How do we address the public panic?',
                        options: [
                            { id: 'opt_sub_1', text: 'Issue Immediate Assurances of Safety', effects: { scores: { civilian_stability: +1 } } },
                            { id: 'opt_sub_2', text: 'Condemn the Provocation Aggressively', effects: { scores: { uk_russia: +1, military_escalation: +1, civilian_stability: -1 } } }
                        ]
                    },
                    {
                        role: 'defence',
                        text: 'Military response in the Channel?',
                        options: [
                            { id: 'opt_sub_3', text: 'Deploy Naval Escorts to Shadow', effects: { scores: { military_escalation: +1 } } },
                            { id: 'opt_sub_4', text: 'Scramble Armed Jets (Aggressive Posture)', effects: { scores: { military_escalation: +2, uk_russia: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_undersea_cables',
                name: 'Severing of Undersea Internet Cables',
                prerequisites: [],
                conditions: { minScores: { uk_russia: 3 } },
                repeatable: false,
                location: [50.0, -10.0],
                description: 'Critical transatlantic internet and communication cables have been simultaneously severed. UK financial markets have paused trading, and widespread communication blackouts are reported.',
                roleDescriptions: {
                    cyber: 'Telemetry suggests coordinated physical tampering at multiple deep-sea nodes. Highly sophisticated, deniable operation.',
                    foreign: 'No state has claimed responsibility. Allies are scrambling to reroute secure communications.',
                    home: 'Public confusion is high. Retail payment systems are failing intermittently.'
                },
                decisions: [
                    {
                        role: 'cyber',
                        text: 'How should NCSC respond?',
                        options: [
                            { id: 'opt_cables_1', text: 'Reroute to Backup Military Satellites', effects: { scores: { military_readiness: -1, civilian_stability: +1 } } },
                            { id: 'opt_cables_2', text: 'Publicly Blame Russian Sabotage', effects: { scores: { uk_russia: +2, military_escalation: +1, civilian_stability: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_uk_casualty_leak',
                name: 'UK Forces Casualty Leaks to Press',
                prerequisites: [],
                repeatable: false,
                location: [51.5, -0.1],
                description: 'The upset parents of a UK soldier killed in a covert training operation in Ukraine have spoken to the press. Russia has seized the narrative, loudly condemning the UK: "Why are UK forces operating there?"',
                roleDescriptions: {
                    media: 'The story is front-page news. The parents are demanding answers on live television.',
                    foreign: 'Russian diplomats at the UN are weaponizing this to paint the UK as the aggressor.',
                    defence: 'The operational security of our remaining training teams in Ukraine is now compromised. We need to brace for domestic impact.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'Diplomatic response to Russian condemnation?',
                        options: [
                            { id: 'opt_cas_1', text: 'Defend Support for Ukraine Unapologetically', effects: { scores: { uk_russia: +1, uk_europe: +1, uk_us: +1 } } },
                            { id: 'opt_cas_2', text: 'Refuse to Comment on Covert Operations', effects: { scores: { civilian_stability: -1, uk_europe: -1 } } }
                        ]
                    },
                    {
                        role: 'home',
                        text: 'Domestic handling of the family?',
                        options: [
                            { id: 'opt_cas_3', text: 'Private PM Meeting and Condolences', effects: { scores: { civilian_stability: +1 } } },
                            { id: 'opt_cas_4', text: 'Issue D-Notice to Suppress Further Coverage', effects: { scores: { civilian_stability: -2 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_chemical_attempt',
                name: 'Attempted Chemical Attack on UK Soil',
                prerequisites: [],
                conditions: { minScores: { uk_russia: 3, military_escalation: 2 } },
                repeatable: false,
                location: [51.53, -0.12],
                description: 'A thwarted nerve agent release attempt occurred at King\'s Cross station. Two suspects are dead. Unclear attribution initially, but GRU involvement is heavily suspected.',
                roleDescriptions: {
                    home: 'Counter-terror police intercepted the device just in time. The station is locked down, but the public is terrified of further attacks.',
                    cyber: 'Intercepted communications strongly link the suspects to Russian intelligence.',
                    foreign: 'If we attribute this to Russia, it crosses a massive red line for state-sponsored terrorism on UK soil.'
                },
                decisions: [
                    {
                        role: 'home',
                        text: 'Public security response?',
                        options: [
                            { id: 'opt_chem_1', text: 'Raise National Terror Threat to CRITICAL', effects: { scores: { civilian_stability: -2, military_readiness: -1 } } },
                            { id: 'opt_chem_2', text: 'Maintain Current Threat Level, Increase Armed Patrols', effects: { scores: { civilian_stability: -1 } } }
                        ]
                    },
                    {
                        role: 'foreign',
                        text: 'Do we formally accuse Russia?',
                        options: [
                            { id: 'opt_chem_3', text: 'Formal Accusation and Expel Diplomats', effects: { scores: { uk_russia: +2, military_escalation: +1, uk_europe: +1 } } },
                            { id: 'opt_chem_4', text: 'Wait for Conclusive Allied Intelligence', effects: { scores: { uk_russia: 0, civilian_stability: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_us_neutrality',
                name: 'US Declares European Neutrality',
                prerequisites: [],
                conditions: { maxScores: { uk_us: 2 } },
                repeatable: false,
                location: [38.89, -77.03],
                description: 'A shocking shift in US policy: The White House has announced it will not intervene militarily in "European territorial disputes", effectively fracturing NATO and leaving the UK isolated.',
                roleDescriptions: {
                    foreign: 'This is a diplomatic disaster. The US is pulling back its umbrella. Eastern European allies are panicking.',
                    defence: 'Without US logistical and intelligence support, our ability to sustain prolonged high-intensity operations is severely degraded.',
                    home: 'The public realizes we are essentially alone. Morale is plummeting.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'How do we pivot our diplomatic strategy?',
                        options: [
                            { id: 'opt_us_1', text: 'Double Down on European Leadership (JEF/NATO)', effects: { scores: { uk_europe: +2, uk_us: -1 } } },
                            { id: 'opt_us_2', text: 'Attempt Emergency Bilateral Negotiations with US', effects: { scores: { uk_us: +1, uk_europe: -1 } } }
                        ]
                    },
                    {
                        role: 'defence',
                        text: 'Military posture adjustment?',
                        options: [
                            { id: 'opt_us_3', text: 'Assume Maximum Defensive Posture', effects: { scores: { military_escalation: +1, military_readiness: +1 } } },
                            { id: 'opt_us_4', text: 'Conserve Assets / Recall Forward Deployments', effects: { scores: { military_readiness: +1, uk_europe: -2 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_akrotiri_strike',
                name: 'Hypersonic Strike on RAF Akrotiri',
                prerequisites: ['ev_uk_casualty_leak'],
                conditions: { minScores: { military_escalation: 3 } },
                repeatable: false,
                location: [34.58, 32.94],
                description: 'Russia has struck the UK sovereign base in Cyprus with hypersonic missiles, claiming it is "justified retaliation" for UK actions in Ukraine. Significant damage to the runway and aircraft.',
                roleDescriptions: {
                    defence: 'We have taken casualties. Our primary staging post for the Eastern Mediterranean is offline.',
                    foreign: 'Spain and other Mediterranean EU nations are furious that the conflict has been brought to their doorstep.',
                    media: 'Russia is broadcasting that this was a "precision warning" and they do not wish to strike the UK mainland.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'How do we manage the EU fallout?',
                        options: [
                            { id: 'opt_ak_1', text: 'Demand EU Solidarity', effects: { scores: { uk_europe: -1, uk_russia: +1 } } },
                            { id: 'opt_ak_2', text: 'Apologize for Regional Disruption, Focus on Russian Aggression', effects: { scores: { uk_europe: +1, civilian_stability: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_article5_ambiguity',
                name: 'NATO Article 5 Ambiguity',
                prerequisites: ['ev_akrotiri_strike'],
                repeatable: false,
                location: [50.84, 4.39],
                description: 'Following the strike on Akrotiri, the UK attempted to invoke Article 5. However, several European nations have hesitated to commit forces, fearing wider war.',
                roleDescriptions: {
                    foreign: 'The alliance is fracturing. Germany and France are urging "de-escalation" rather than a unified military response.',
                    defence: 'We cannot rely on NATO reinforcements. We are effectively fighting a bilateral conflict with Russia.',
                    home: 'The realization that NATO won\'t save us is causing widespread panic.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'What is our stance on the NATO hesitation?',
                        options: [
                            { id: 'opt_a5_1', text: 'Publicly Shame Hesitant Allies', effects: { scores: { uk_europe: -2, civilian_stability: -1 } } },
                            { id: 'opt_a5_2', text: 'Forge Ahead with willing Coalition of the Willing (JEF)', effects: { scores: { uk_europe: -1, military_readiness: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_raf_bases_strike',
                name: 'Coordinated Strikes on RAF Bases',
                prerequisites: ['ev_akrotiri_strike'],
                conditions: { minScores: { military_escalation: 4 } },
                repeatable: false,
                location: [53.09, -0.16],
                description: 'Simultaneous cruise missile strikes have hit RAF Coningsby, Marham, and Lossiemouth. Russia claims retaliation and is attempting to cripple UK air defence capabilities.',
                roleDescriptions: {
                    defence: 'Multiple Typhoons and F-35s destroyed on the ground. QRA capabilities are severely degraded.',
                    home: 'Missiles impacting the UK mainland has shattered any remaining sense of security.',
                    cyber: 'Early warning systems were partially blinded by localized jamming prior to impact.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'How do we protect remaining air assets?',
                        options: [
                            { id: 'opt_raf_1', text: 'Disperse Aircraft to Civilian Airports', effects: { scores: { civilian_stability: -2, military_readiness: +1 } } },
                            { id: 'opt_raf_2', text: 'Launch Immediate Retaliatory Sorties', effects: { scores: { military_escalation: +2, uk_russia: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_portsmouth_strike',
                name: 'Strike on HMNB Portsmouth',
                prerequisites: ['ev_raf_bases_strike'],
                repeatable: false,
                location: [50.81, -1.10],
                description: 'A heavy missile strike has targeted naval assets docked at HMNB Portsmouth. Substantial damage to infrastructure and significant military casualties.',
                roleDescriptions: {
                    defence: 'The naval base is ablaze. We risk losing surface fleet readiness if we don\'t move vessels out immediately.',
                    home: 'Portsmouth city is experiencing collateral damage. Civilian casualties reported.',
                    media: 'The visual of Portsmouth burning is catastrophic for national morale.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'Order for the remaining fleet?',
                        options: [
                            { id: 'opt_ports_1', text: 'Emergency Sortie All Available Vessels', effects: { scores: { military_readiness: +1, civilian_stability: +1 } } },
                            { id: 'opt_ports_2', text: 'Prioritize Base Firefighting and Rescue', effects: { scores: { military_readiness: -1, civilian_stability: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_faslane_strike_1',
                name: 'First Strike on HMNB Clyde (Faslane)',
                prerequisites: ['ev_raf_bases_strike'],
                repeatable: false,
                location: [56.06, -4.81],
                description: 'A conventional cruise missile strike has hit the outer perimeter of HMNB Clyde (Faslane), the home of the UK\'s nuclear deterrent. Russia claims this is retaliation for UK involvement in Ukraine.',
                roleDescriptions: {
                    defence: 'The nuclear submarines are safe, but the base is locked down. Russia is demonstrating they can hit our ultimate deterrent.',
                    home: 'Anti-nuclear protestors and panicked locals are fleeing the area, clogging supply routes.',
                    foreign: 'This is nuclear brinkmanship. Russia is daring us to escalate.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'Do we issue a nuclear ultimatum?',
                        options: [
                            { id: 'opt_fas1_1', text: 'Declare any further strikes on Faslane will cross the nuclear threshold', effects: { scores: { military_escalation: +2, uk_russia: +1 } } },
                            { id: 'opt_fas1_2', text: 'Condemn attack, maintain strategic ambiguity', effects: { scores: { uk_russia: +1, civilian_stability: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_faslane_strike_2',
                name: 'Second Strike on HMNB Clyde',
                prerequisites: ['ev_faslane_strike_1'],
                conditions: { minScores: { military_escalation: 4 } },
                repeatable: false,
                location: [56.06, -4.81],
                description: 'A severe escalation: A targeted missile strike has penetrated the defences at Faslane and damaged a moored nuclear submarine. Radiation leak fears are unconfirmed but widespread.',
                roleDescriptions: {
                    defence: 'A Vanguard-class sub has taken damage. The Continuous At-Sea Deterrence (CASD) is relying entirely on the single boat currently at sea.',
                    home: 'Total panic in Scotland. Widespread demands for immediate surrender to prevent a nuclear holocaust.',
                    cyber: 'Communications with the base are intermittent due to secondary explosions.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'Orders for the Vanguard submarine currently on patrol?',
                        options: [
                            { id: 'opt_fas2_1', text: 'Move to Firing Depth (Maximum Readiness)', effects: { scores: { military_escalation: +2, civilian_stability: -2 } } },
                            { id: 'opt_fas2_2', text: 'Maintain Deep Patrol (Preserve Asset)', effects: { scores: { military_readiness: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_power_grid_strike',
                name: 'Targeted Strike on UK Power Grid',
                prerequisites: ['ev_raf_bases_strike'],
                conditions: { minScores: { military_escalation: 4 } },
                repeatable: false,
                location: [53.79, -0.98],
                description: 'A massive escalation beyond military targets. A coordinated cyber-physical attack, culminating in a cruise missile strike on a major UK power plant, has plunged millions into darkness.',
                roleDescriptions: {
                    home: 'Without power, law and order is rapidly breaking down. Hospitals are running on backup generators.',
                    cyber: 'The cyber component prevented the grid from load-balancing, maximizing the physical damage of the strike.',
                    media: 'The nation is going dark. We can only broadcast via emergency radio frequencies in affected regions.'
                },
                decisions: [
                    {
                        role: 'home',
                        text: 'Domestic security response?',
                        options: [
                            { id: 'opt_grid_1', text: 'Declare Martial Law in Affected Regions', effects: { scores: { civilian_stability: -3, military_readiness: -1 } } },
                            { id: 'opt_grid_2', text: 'Rely on Local Police and Community Support', effects: { scores: { civilian_stability: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_airspace_incursion',
                name: 'Total Airspace Incursion',
                prerequisites: [],
                conditions: { minScores: { military_escalation: 5 }, maxScores: { uk_us: 2, uk_europe: 3 } },
                repeatable: false,
                location: [55.0, 0.0],
                description: 'Dozens of Russian strategic bombers have entered UK airspace from multiple vectors. They are not dropping bombs, but are actively probing and establishing air superiority over a depleted RAF.',
                roleDescriptions: {
                    defence: 'We do not have the airframes to intercept them all. They have functional air superiority over the UK mainland.',
                    home: 'Air raid sirens are sounding continuously across the country. The population is paralyzed.',
                    foreign: 'This is a demonstration of absolute dominance. They are waiting for our surrender.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'Do we authorize SAM batteries to fire freely?',
                        options: [
                            { id: 'opt_air2_1', text: 'Weapons Free (Engage all targets)', effects: { scores: { military_escalation: +1, civilian_stability: +1 } } },
                            { id: 'opt_air2_2', text: 'Hold Fire (Do not provoke kinetic bombardment)', effects: { scores: { civilian_stability: -2, military_readiness: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_nuclear_readiness',
                name: 'Imminent Nuclear Readiness Detected',
                prerequisites: ['ev_airspace_incursion'],
                conditions: { minScores: { military_escalation: 5 } },
                repeatable: false,
                location: [54.7, 20.5],
                description: 'Intelligence confirms that Russian tactical nuclear weapons in Kaliningrad and Belarus have been mated to delivery systems and are actively fueling for launch.',
                roleDescriptions: {
                    cyber: 'Signals intelligence intercepts confirm authorization codes have been distributed to Russian frontline commanders.',
                    defence: 'We are minutes away from a potential decapitation strike on London and remaining military bases.',
                    foreign: 'All diplomatic channels with Moscow have gone dark.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'Final diplomatic plea?',
                        options: [
                            { id: 'opt_nuke_1', text: 'Broadcast Unconditional Offer for Ceasefire', effects: { scores: { uk_russia: -2, civilian_stability: -2 } } },
                            { id: 'opt_nuke_2', text: 'Stand Firm', effects: { scores: { military_escalation: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_final_authorization',
                name: 'The Final Authorization (Trident Decision)',
                prerequisites: ['ev_nuclear_readiness'],
                conditions: { minScores: { military_escalation: 5 } },
                repeatable: false,
                name: 'CABINET DECISION: Final Authorization',
                description: 'The Prime Minister has convened COBRA. With existential threats imminent, the cabinet must decide whether to authorize the final, unthinkable option.',
                location: [51.5033, -0.1276], // Downing Street
                isEndGame: true,
                conditions: { minScores: { military_escalation: 5 } },
                prerequisites: ['ev_airspace_incursion', 'ev_nuclear_readiness'],
                roleDescriptions: {
                    home: 'This is the end of everything. Are we truly prepared to give the order?',
                    defence: 'The chain of command is intact. The Vanguard is awaiting the flash message.'
                },
                decisions: [
                    {
                        role: 'home',
                        text: 'Prime Minister, we await your final authorization.',
                        options: [
                            { id: 'authorize', text: 'AUTHORIZE TRIDENT LAUNCH', effects: { scores: { military_escalation: 5 } } },
                            { id: 'stand_down', text: 'Stand Down and Surrender', effects: { scores: { military_escalation: -5, uk_russia: -5 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_us_support_success',
                name: 'US Authorizes Logistics Support',
                description: 'The US administration has approved the immediate redirection of heavy airlift and logistics support to the UK.',
                location: [51.5, -0.1],
                roleDescriptions: {
                    defence: 'Additional C-17s are arriving. Our logistics constraints are easing.',
                    foreign: 'A diplomatic victory that reassures our European partners of US commitment.'
                },
                decisions: []
            },
            {
                id: 'ev_us_support_fail',
                name: 'US Declines Immediate Logistics Support',
                description: 'The US administration has politely declined to redirect strategic airlift to the UK at this time, citing other global commitments.',
                location: [38.89, -77.03],
                roleDescriptions: {
                    foreign: 'This is a diplomatic snub. We look desperate to our European allies.',
                    defence: 'We will have to make do with our organic airlift capacity.'
                },
                decisions: []
            },
            {
                id: 'ev_russia_deescalate',
                name: 'Backchannel Success: Russia Agrees to Pause',
                description: 'Following a tense emergency backchannel communication, Russian leadership has agreed to a temporary tactical pause, conditional on a reduction in UK military posture.',
                location: [55.75, 37.61],
                roleDescriptions: {
                    foreign: 'A breakthrough. We bought some time.',
                    defence: 'We are ordered to stand down some forward elements to meet their conditions.'
                },
                decisions: []
            },
            {
                id: 'ev_russia_leak',
                name: 'Backchannel Failure: Russia Leaks Call',
                description: 'Russia has leaked edited transcripts of our emergency backchannel communication, portraying the UK as begging for a ceasefire.',
                location: [55.75, 37.61],
                roleDescriptions: {
                    foreign: 'Our allies are furious we attempted to negotiate bilaterally without consulting them.',
                    media: 'The press is having a field day with the "begging" narrative. Public confidence is shaken.'
                },
                decisions: []
            },
            {
                id: 'ev_cyber_success',
                name: 'Covert Cyber Offensive Successful',
                description: 'A major covert cyber offensive against Russian logistics networks has been highly successful, degrading their command and control without immediate attribution.',
                location: [55.75, 37.61],
                roleDescriptions: {
                    cyber: 'Payload delivered successfully. Significant degradation of target networks confirmed.'
                },
                decisions: []
            },
            {
                id: 'ev_cyber_fail',
                name: 'Covert Cyber Offensive Thwarted',
                description: 'Our covert cyber offensive was detected and neutralized by Russian defenses. They are now publicly attributing the attack to the UK.',
                location: [55.75, 37.61],
                roleDescriptions: {
                    cyber: 'They were waiting for us. We lost several zero-day capabilities.',
                    foreign: 'We are now completely isolated on the international stage regarding this escalation.'
                },
                decisions: []
            },
            {
                id: 'ev_sf_success',
                name: 'Special Forces Operation Success',
                description: 'A highly classified Special Forces operation has successfully secured critical intelligence on Russian deployments without detection.',
                location: [50.0, 30.0],
                roleDescriptions: {
                    defence: 'The operators are safely back. The intelligence gathered is game-changing.'
                },
                decisions: []
            },
            {
                id: 'ev_sf_fail',
                name: 'Special Forces Operation Compromised',
                description: 'A classified Special Forces operation has been compromised. Several operators have been captured and are being paraded on Russian state media.',
                location: [50.0, 30.0],
                roleDescriptions: {
                    defence: 'Total operational failure. We have operators in hostile custody.',
                    media: 'The images are devastating to public morale.'
                },
                decisions: []
            },
            {
                id: 'ev_f35_success',
                name: 'Deep Strike Success',
                description: 'Our F-35s successfully bypassed Russian air defenses and destroyed a key strategic asset without losses. Russian leadership appears stunned and is signaling a desire to de-escalate.',
                location: [55.75, 37.61],
                roleDescriptions: {
                    defence: 'A flawless execution of the strike package. The enemy is reeling.',
                    foreign: 'They are calling on the diplomatic backchannel. The shock-and-awe worked.'
                },
                decisions: []
            },
            {
                id: 'ev_f35_fail',
                name: 'Deep Strike Failure',
                description: 'Our F-35 strike package was intercepted. We have lost multiple advanced airframes and pilots. Russia considers this an act of total war.',
                location: [55.75, 37.61],
                roleDescriptions: {
                    defence: 'Catastrophic losses. The airframes are gone.',
                    media: 'Downed British pilots are being broadcast live from Moscow.'
                },
                decisions: []
            },
            {
                id: 'ev_eu_success',
                name: 'European Coalition Formed',
                description: 'A historic European Defense Coalition has been cemented, uniting the continent behind the UK. Russia realizes it cannot divide and conquer.',
                location: [50.8503, 4.3517], // Brussels
                roleDescriptions: {
                    foreign: 'A triumph of diplomacy. We are no longer standing alone.'
                },
                decisions: []
            },
            {
                id: 'ev_eu_fail',
                name: 'European Coalition Fails',
                description: 'Our attempts to forge a unified European defense bloc have failed spectacularly amid internal bickering. We look weak and divided.',
                location: [50.8503, 4.3517],
                roleDescriptions: {
                    foreign: 'We overplayed our hand. Key allies have balked at the commitment.'
                },
                decisions: []
            },
            {
                id: 'ev_endgame_diplomatic',
                name: 'END GAME: Diplomatic Breakthrough',
                description: 'A neutral third party has successfully brokered a ceasefire. Russian forces hold in place. The immediate existential threat to the UK is lifted, though a new Cold War begins.',
                location: [46.2044, 6.1432], // Geneva
                isEndGame: true,
                conditions: { maxScores: { military_escalation: 2 }, minScores: { uk_russia: 4 } },
                roleDescriptions: {
                    PM: 'We have brought our nation back from the brink of the abyss. But the world will never be the same.',
                    foreign: 'The treaty holds. We bought peace, for now.'
                },
                decisions: []
            },
            {
                id: 'ev_endgame_domestic',
                name: 'END GAME: Domestic Collapse',
                description: 'Before nuclear war can even begin, the UK government collapses due to riots, power grid failures, and complete loss of public confidence. The military is forced to step in to maintain order, withdrawing from the international conflict entirely.',
                location: [51.5072, -0.1276],
                isEndGame: true,
                conditions: { maxScores: { civilian_stability: 1 } },
                roleDescriptions: {
                    PM: 'We have lost the country. The military is taking over Westminster.',
                    media: 'Total blackout. The nation has fallen into anarchy.'
                },
                decisions: []
            },
            {
                id: 'ev_endgame_eu_defense',
                name: 'END GAME: European Defence Pact',
                description: 'European allies and the UK launch a massive, coordinated conventional defense. Faced with an unwinnable correlation of forces, Russia withdraws. A costly but decisive conventional victory.',
                location: [50.8503, 4.3517],
                isEndGame: true,
                conditions: { minScores: { uk_europe: 5, military_escalation: 4 } },
                roleDescriptions: {
                    PM: 'We stood together and broke their advance. Europe is secure.',
                    defence: 'The combined forces achieved total air supremacy.'
                },
                decisions: []
            }
        ],
        manualActions: [
            {
                id: 'act_nuke',
                name: 'Authorise Nuclear Strike',
                description: 'Order the launch of Trident D5 missiles from the Vanguard-class submarine against Russian targets. Massive escalation.',
                initiator: ['home', 'defence'],
                requiresApprovalFrom: ['home', 'defence'],
                conditions: { assets: { 'a_vanguard': 'operational' } },
                effects: {
                    scores: { military_escalation: +5, civilian_stability: -5 }
                },
                image: '/images/events/ev_nuclear_alert.png'
            },
            {
                id: 'act_backchannel_russia',
                name: 'Emergency Backchannel with Russia',
                description: 'Attempt to de-escalate the crisis directly with Russian leadership. High risk of political fallout if leaked.',
                initiator: ['foreign'],
                conditions: { minScores: { military_escalation: 3 } },
                effects: {
                    randomEvents: [
                        { id: 'ev_russia_deescalate', weight: 50 },
                        { id: 'ev_russia_leak', weight: 50 }
                    ],
                    scores: { uk_russia: -1 }
                },
                image: '/images/events/act_backchannel_russia.png'
            },
            {
                id: 'act_us_support',
                name: 'Request US Logistics Support',
                description: 'Formally request the US to redirect strategic airlift to support UK operations.',
                initiator: ['foreign', 'defence'],
                conditions: { minScores: { uk_us: 2 } },
                effects: {
                    randomEvents: [
                        { id: 'ev_us_support_success', weight: 60, effects: { scores: { military_readiness: +1 } } },
                        { id: 'ev_us_support_fail', weight: 40, effects: { scores: { uk_europe: -1 } } }
                    ]
                },
                image: '/images/events/act_us_support.png'
            },
            {
                id: 'act_cyber_offensive',
                name: 'Launch Covert Cyber Offensive',
                description: 'Authorize an unacknowledged cyber strike against Russian command and control networks.',
                initiator: ['cyber'],
                requiresApprovalFrom: 'home',
                conditions: { minScores: { military_readiness: 2 } },
                effects: {
                    scores: { military_escalation: +1 },
                    randomEvents: [
                        { id: 'ev_cyber_success', weight: 50, effects: { scores: { military_readiness: +1 } } },
                        { id: 'ev_cyber_fail', weight: 50, effects: { scores: { uk_europe: -1, civilian_stability: -1 } } }
                    ]
                },
                image: '/images/events/act_cyber_offensive.png'
            },
            {
                id: 'act_national_address',
                name: 'National Address to the Public',
                description: 'Broadcast a formal address to the nation to reassure the public and restore confidence.',
                initiator: ['media'],
                requiresApprovalFrom: 'home',
                conditions: { maxScores: { civilian_stability: 3 } },
                effects: {
                    scores: { civilian_stability: +1, uk_europe: -1 }
                },
                image: '/images/events/act_national_address.png'
            },
            {
                id: 'act_special_forces',
                name: 'Deploy Special Forces (Covert)',
                description: 'Deploy elite units to gather critical intelligence behind enemy lines.',
                initiator: ['defence'],
                conditions: { minScores: { military_readiness: 2 } },
                effects: {
                    randomEvents: [
                        { id: 'ev_sf_success', weight: 50, effects: { scores: { military_readiness: +1, uk_us: +1 } } },
                        { id: 'ev_sf_fail', weight: 50, effects: { scores: { civilian_stability: -1, military_escalation: +1 } } }
                    ]
                },
                image: '/images/events/act_special_forces.png'
            },
            {
                id: 'act_f35_strike',
                name: 'Deep F-35 Strike',
                description: 'Launch a high-risk, deep penetration strike using F-35s to destroy a critical Russian strategic asset to force de-escalation.',
                initiator: ['PM', 'defence'],
                requiresApprovalFrom: ['PM', 'home'],
                conditions: { minScores: { military_readiness: 3 } },
                effects: {
                    randomEvents: [
                        { id: 'ev_f35_success', weight: 40, effects: { scores: { military_escalation: -2, uk_russia: +1 } } },
                        { id: 'ev_f35_fail', weight: 60, effects: { scores: { military_escalation: +2, civilian_stability: -1 } } }
                    ]
                }
            },
            {
                id: 'act_eu_coalition',
                name: 'European Coalition Building',
                description: 'Push aggressively for a unified European Defense Coalition to stand against Russian aggression.',
                initiator: ['PM', 'foreign'],
                conditions: { minScores: { civilian_stability: 2 } },
                effects: {
                    randomEvents: [
                        { id: 'ev_eu_success', weight: 70, effects: { scores: { uk_europe: +2, military_escalation: -1 } } },
                        { id: 'ev_eu_fail', weight: 30, effects: { scores: { uk_europe: -1 } } }
                    ]
                }
            }
        ]
};
