module.exports = {
        id: 'uk_crisis',
        name: 'UK Crisis: Russian Tensions',
        description: 'Manage domestic and international fallout during escalating tensions in Europe.',
        mapConfig: { center: [54.5, -2.5], zoom: 6 },
        roles: ['PM', 'home', 'defence', 'foreign', 'media', 'cyber', 'display'],
        roleNames: {
            'PM': 'Prime Minister',
            'home': 'Home Secretary',
            'defence': 'Defence Secretary',
            'foreign': 'Foreign Secretary',
            'media': 'Media & Comms Director',
            'cyber': 'Cyber Security Lead',
            'display': 'Display Screen'
        },
        minUsers: 2,
        mandatoryRoles: ['PM'],
        roleFallbacks: {
            cyber: ['home', 'defence', 'PM'],
            media: ['foreign', 'home', 'PM'],
            home: ['defence', 'foreign', 'PM'],
            defence: ['foreign', 'home', 'PM'],
            foreign: ['defence', 'home', 'PM']
        },
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
                            defence: 'The QEC Prince of Wales is currently deployed to RIMPAC in Australia. Your primary carrier group is on the far side of the world. Air cover for the North Atlantic will be severely limited until she returns.',
                            foreign: 'The QEC Prince of Wales is currently deployed to RIMPAC. Australia is expecting the deployment to continue. Withdrawing early risks damaging the AUKUS relationship.'
                        },
                        scoreModifiers: { military_readiness: -1 },
                        assetModifiers: [
                            { id: 'a_pow', name: 'UK Carrier Strike Group', location: [-33.86, 151.20], state: 'deployed', tags: ['military', 'naval'], image: '/images/assets/hms_prince_of_wales.png', briefing: 'The UK Carrier Strike Group, centered around HMS Prince of Wales and including a Type 45 destroyer and other escorts, currently deployed to the Indo-Pacific.' }
                        ]
                    },
                    {
                        id: 'pow_channel',
                        name: 'Exercising in English Channel',
                        briefingText: 'The QEC Prince of Wales is exercising in the English Channel, approximately 2 hours from Portsmouth.',
                        roleBriefings: {
                            defence: 'The QEC Prince of Wales is exercising in the English Channel. Your carrier is close to home and can be operationally deployed within hours. This gives you significant flexibility.'
                        },
                        scoreModifiers: { military_readiness: +1 },
                        assetModifiers: [
                            { id: 'a_pow', name: 'UK Carrier Strike Group', location: [50.5, -1.0], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/hms_prince_of_wales.png', briefing: 'The UK Carrier Strike Group, centered around HMS Prince of Wales and including a Type 45 destroyer and other escorts, currently operating in home waters.' }
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
                            defence: 'The war in Iran is ongoing. Two brigades are committed to Gulf operations. Redeployment would take weeks and damage coalition credibility.',
                            home: 'The war in Iran is ongoing. Anti-war sentiment is growing domestically. A second front would be politically toxic.',
                            foreign: 'The war in Iran is ongoing. The US expects continued UK commitment. Wavering now would severely damage the special relationship.'
                        },
                        scoreModifiers: { military_readiness: -1, uk_us: +1 }
                    },
                    {
                        id: 'iran_ended',
                        name: 'Iran conflict resolved',
                        briefingText: 'The Iran conflict concluded 6 months ago. Forces are returning but morale is fragile and equipment requires refurbishment.',
                        roleBriefings: {
                            defence: 'The Iran conflict concluded 6 months ago. Returning units are fatigued but available. Equipment serviceability is around 70%.',
                            home: 'The Iran conflict concluded 6 months ago. Public appetite for further military action is extremely low. Veterans\' support is a hot-button issue.'
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
                            foreign: 'The US administration is facing domestic pressure to pivot to the Indo-Pacific. Washington is reluctant to commit resources here. You will need to rely more heavily on European partners.',
                            defence: 'The US administration is pivoting to the Indo-Pacific. US logistical support is not guaranteed. Conserve your assets.'
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
                            home: 'We are in a "Winter of Discontent" with ongoing strikes. Public order is already fragile. Any disruption to supply chains will lead to immediate panic buying and unrest.',
                            media: 'We are in a "Winter of Discontent" with ongoing strikes. The press is highly critical of government competence. Selling a war narrative will be extremely difficult.'
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
            { id: 'a_type26', name: 'Type 26 Frigate', location: [59.00, -10.00], state: 'operational', tags: ['military', 'naval'], image: '/images/assets/type_26_frigate.png', briefing: 'The advanced Type 26 City-class frigate provides next-generation ASW capabilities. Currently patrolling the North Atlantic.' },
            { id: 'a_qe', name: 'HMS Queen Elizabeth', location: [56.02, -3.44], state: 'maintenance', tags: ['military', 'naval'], image: '/images/assets/qe_class_carrier.png', briefing: 'HMS Queen Elizabeth is the fleet flagship. Currently undergoing deep maintenance in Rosyth. Unavailable for immediate deployment.' },
            { id: 'a_astute', name: 'Astute Class Submarine', location: [60.50, -5.00], state: 'operational', tags: ['military', 'naval', 'sub'], image: '/images/assets/astute_class_submarine.png', briefing: 'Astute-class nuclear attack submarines are actively deployed. Their exact locations are classified, but they are tasked with shadowing hostile ballistic missile submarines.' },
            { id: 'a_astute2', name: 'Astute Class Submarine (HMS Ambush)', location: [55.00, -0.50], state: 'operational', tags: ['military', 'naval', 'sub'], image: '/images/assets/astute_class_submarine.png', briefing: 'A second Astute-class submarine currently patrolling the North Sea approaches to the UK.' },
            { id: 'a_vanguard', name: 'Vanguard Class Submarine', location: [62.00, -15.00], state: 'operational', tags: ['military', 'naval', 'sub', 'strategic'], image: '/images/assets/vanguard_class_sub.png', briefing: 'The Vanguard-class carries the UK\'s Trident nuclear deterrent. At least one boat is always on Continuous At-Sea Deterrence (CASD) patrol. Communications are secure.' }
        ],
        
        stages: [
            { id: 'stage_1', name: 'Intelligence & Warnings' },
            { id: 'stage_2', name: 'Tension & Sabotage' },
            { id: 'stage_3', name: 'Initial Skirmishes' },
            { id: 'stage_4', name: 'Open Kinetic Conflict' },
            { id: 'stage_5', name: 'Escalation / Resolution' }
        ],
        eventTemplates: [
            {
                id: 'ev_cyber_london',
                stage: 'stage_2',
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
                stage: 'stage_1',
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
                stage: 'stage_2',
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
                            { id: 'opt_log_5', text: 'Authorise Limited Covert Cyber Response', effects: { scores: { uk_russia: +1, military_escalation: +2, uk_us: -1 }, triggerEvents: [{ id: 'ev_cyber_exposure', probability: 0.5, delayMs: 15000 }] } },
                            { id: 'opt_log_6', text: 'Maintain Defensive Posture', effects: { scores: { military_escalation: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_cyber_exposure',
                stage: 'stage_2',
                name: 'Allied Intelligence Leak: Cyber Operations Exposed',
                requiresUnlock: true,
                prerequisites: [],
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
                stage: 'stage_3',
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
                stage: 'stage_1',
                name: 'Maritime Shadowing & Infrastructure Tension',
                prerequisites: [],
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
                stage: 'stage_2',
                name: 'Russian Logistics Hub Explosion',
                prerequisites: [],
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
                stage: 'stage_4',
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
                stage: 'stage_3',
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
                stage: 'stage_2',
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
                stage: 'stage_1',
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
                stage: 'stage_5',
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
                stage: 'stage_5',
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
                stage: 'stage_3',
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
                stage: 'stage_5',
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
                stage: 'stage_4',
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
                stage: 'stage_4',
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
                stage: 'stage_4',
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
                stage: 'stage_4',
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
                stage: 'stage_4',
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
                stage: 'stage_3',
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
                stage: 'stage_4',
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
                stage: 'stage_5',
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
                stage: 'stage_4',
                name: 'US Authorizes Logistics Support',
                hidden: true,
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
                stage: 'stage_4',
                name: 'US Declines Immediate Logistics Support',
                hidden: true,
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
                stage: 'stage_5',
                name: 'Backchannel Success: Russia Agrees to Pause',
                hidden: true,
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
                stage: 'stage_5',
                name: 'Backchannel Failure: Russia Leaks Call',
                hidden: true,
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
                stage: 'stage_3',
                name: 'Covert Cyber Offensive Successful',
                hidden: true,
                description: 'A major covert cyber offensive against Russian logistics networks has been highly successful, degrading their command and control without immediate attribution.',
                location: [55.75, 37.61],
                roleDescriptions: {
                    cyber: 'Payload delivered successfully. Significant degradation of target networks confirmed.'
                },
                decisions: []
            },
            {
                id: 'ev_cyber_fail',
                stage: 'stage_3',
                name: 'Covert Cyber Offensive Thwarted',
                hidden: true,
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
                stage: 'stage_3',
                name: 'Special Forces Operation Success',
                hidden: true,
                description: 'A highly classified Special Forces operation has successfully secured critical intelligence on Russian deployments without detection.',
                location: [50.0, 30.0],
                roleDescriptions: {
                    defence: 'The operators are safely back. The intelligence gathered is game-changing.'
                },
                decisions: []
            },
            {
                id: 'ev_sf_fail',
                stage: 'stage_3',
                name: 'Special Forces Operation Compromised',
                hidden: true,
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
                stage: 'stage_4',
                name: 'Deep Strike Success',
                hidden: true,
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
                stage: 'stage_4',
                name: 'Deep Strike Failure',
                hidden: true,
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
                stage: 'stage_4',
                name: 'European Coalition Formed',
                hidden: true,
                description: 'A historic European Defense Coalition has been cemented, uniting the continent behind the UK. Russia realizes it cannot divide and conquer.',
                location: [50.8503, 4.3517], // Brussels
                roleDescriptions: {
                    foreign: 'A triumph of diplomacy. We are no longer standing alone.'
                },
                decisions: []
            },
            {
                id: 'ev_eu_fail',
                stage: 'stage_4',
                name: 'European Coalition Fails',
                hidden: true,
                description: 'Our attempts to forge a unified European defense bloc have failed spectacularly amid internal bickering. We look weak and divided.',
                location: [50.8503, 4.3517],
                roleDescriptions: {
                    foreign: 'We overplayed our hand. Key allies have balked at the commitment.'
                },
                decisions: []
            },
            {
                id: 'ev_endgame_diplomatic',
                stage: 'stage_5',
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
                stage: 'stage_5',
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
                stage: 'stage_5',
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
            },
            {
                id: 'ev_strike_options_leak',
                stage: 'stage_4',
                name: 'Strike Planning Leaked',
                hidden: true,
                description: 'Intelligence regarding our requests for deep strike target packages has leaked. Russia is infuriated, and some European allies are questioning our escalation control.',
                location: [51.5033, -0.1276],
                roleDescriptions: {
                    media: 'The press is running with stories about an imminent British preemptive strike.',
                    foreign: 'Diplomatic channels are lighting up. This makes us look like the aggressors.'
                },
                decisions: []
            },
            {
                id: 'ev_strike_options_secured',
                stage: 'stage_4',
                name: 'Strike Planning Secured',
                hidden: true,
                description: 'The CDS has successfully compartmentalized the target package requests. No intelligence has leaked.',
                location: [51.5033, -0.1276],
                roleDescriptions: {
                    defence: 'Operational security maintained. The packages are being formulated.'
                },
                decisions: []
            },
            {
                id: 'ev_strike_options_ready',
                stage: 'stage_4',
                name: 'Strike Options Ready',
                hidden: true,
                description: 'The Chief of Defence Staff has finalized the deep strike target packages. We have viable options against a forward Russian airbase or a critical Command & Control node.',
                location: [51.5033, -0.1276],
                roleDescriptions: {
                    PM: 'The options are ready for your review.',
                    defence: 'Target packages finalized and loaded. Awaiting orders.'
                },
                decisions: []
            },,
            {
                id: 'ev_protest_london',
                stage: 'stage_1',
                name: 'Anti-War Protests (London)',
                repeatable: false,
                location: [51.50, -0.12],
                image: '/images/events/ev_protest_london.png',
                description: 'Large scale protests have erupted outside Downing Street demanding neutrality in the escalating Eastern European situation.',
                roleDescriptions: {
                    home: 'Crowds are swelling. Intelligence suggests foreign provocateurs may be inciting violence among fringe groups.',
                    media: 'Social media is heavily amplifying the protests, trending globally with anti-government hashtags.'
                },
                decisions: [
                    {
                        role: 'home',
                        text: 'How should the police manage the growing crowds?',
                        options: [
                            { id: 'opt_pl1', text: 'Disperse protests to maintain order', effects: { scores: { civilian_stability: -1, uk_russia: +1 }, triggerEvents: [{ id: 'ev_protest_violence', probability: 0.3, delayMs: 10000 }] } },
                            { id: 'opt_pl2', text: 'Allow protests to continue peacefully', effects: { scores: { civilian_stability: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_protest_violence',
                stage: 'stage_1',
                name: 'Protests Turn Violent',
                requiresUnlock: true,
                repeatable: false,
                location: [51.50, -0.12],
                image: '/images/events/ev_protest_london.png',
                description: 'Following the dispersal order, protests have turned violent. Suspected foreign instigators ("little green men") have been spotted clashing with police.',
                roleDescriptions: {
                    home: 'Multiple officers injured. Several arrests of individuals carrying forged documents.',
                    foreign: 'Russian media is broadcasting the clashes, accusing the UK of "brutal crackdowns on democracy".'
                },
                decisions: [
                    {
                        role: 'home',
                        text: 'How to respond to the escalation?',
                        options: [
                            { id: 'opt_pv1', text: 'Deploy public order units and make mass arrests', effects: { scores: { civilian_stability: -2 } } },
                            { id: 'opt_pv2', text: 'Targeted extraction of suspected foreign provocateurs', effects: { scores: { civilian_stability: -1, uk_russia: +1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_dissident_discovery',
                stage: 'stage_1',
                name: 'Attack on Russian Dissident (Discovery)',
                repeatable: false,
                location: [51.06, -1.79], // Salisbury
                image: '/images/events/ev_dissident_discovery.png',
                description: 'A prominent Russian dissident and Putin critic has been found unconscious in a Salisbury park. Emergency services are on the scene.',
                autoEffects: { scores: { civilian_stability: -1 } },
                triggerEvents: [{ id: 'ev_dissident_results', probability: 1.0, delayMs: 120000 }], // 2 minutes
                roleDescriptions: {
                    home: 'Local police have cordoned off the area. Counter-terrorism units have been alerted as a precaution.',
                    foreign: 'The dissident was a high-profile defector under UK protection.'
                },
                decisions: []
            },
            {
                id: 'ev_disinfo_campaign',
                stage: 'stage_1',
                name: 'Disinformation Campaign Surge',
                repeatable: true,
                location: [51.5, -0.1],
                image: '/images/events/ev_disinfo_campaign.png',
                description: 'Intelligence detects a massive surge in bot networks amplifying divisive domestic issues on social media, aiming to fracture public unity.',
                autoEffects: { scores: { civilian_stability: -1, uk_russia: +1 } },
                roleDescriptions: {
                    cyber: 'GCHQ confirms the botnets trace back to known GRU-affiliated troll farms in St. Petersburg.',
                    media: 'Mainstream news is beginning to pick up the fabricated stories, mistaking them for genuine public outrage.'
                },
                decisions: []
            },
            {
                id: 'ev_bomber_intercept',
                stage: 'stage_1',
                name: 'Surge in Bomber Intercepts',
                repeatable: true,
                location: [59.0, 0.0], // North Sea
                image: '/images/events/ev_bomber_intercept.png',
                description: 'RAF Typhoons have been scrambled a record number of times this week to escort Tu-95 Bear bombers skirting UK airspace without transponders.',
                autoEffects: { scores: { military_escalation: +1, uk_russia: +1 } },
                roleDescriptions: {
                    defence: 'This is a significant spike in activity, testing our response times and exhausting QRA crews.',
                    foreign: 'This posturing is designed to send a clear message to NATO regarding their strategic reach.'
                },
                decisions: []
            },
            {
                id: 'ev_gps_jamming',
                stage: 'stage_1',
                name: 'GPS Jamming of VIP Transport',
                repeatable: false,
                location: [55.0, 19.0], // Baltic Sea
                image: '/images/events/ev_gps_jamming.png',
                description: 'An RAF transport carrying the Defence Secretary experienced severe GPS jamming and spoofing while flying over the Baltic Sea near Kaliningrad.',
                roleDescriptions: {
                    defence: 'The aircraft safely navigated using alternative instruments, but the jamming was highly targeted and aggressive.',
                    foreign: 'This is a blatant provocation against a senior cabinet minister.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'How should the UK respond diplomatically?',
                        options: [
                            { id: 'opt_gps1', text: 'Issue a strong, public diplomatic protest (Summon Ambassador)', effects: { scores: { uk_russia: +1, military_escalation: +1 } } },
                            { id: 'opt_gps2', text: 'Downplay the incident publicly to avoid panic', effects: { scores: { civilian_stability: +1, uk_europe: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_black_sea_intercept',
                stage: 'stage_1',
                name: 'Aggressive Interception in Black Sea',
                repeatable: false,
                location: [43.0, 31.0], // Black Sea
                image: '/images/events/ev_black_sea_intercept.png',
                description: 'A UK Rivet Joint intelligence aircraft was aggressively intercepted by Russian Su-27s near Crimea, coming within 15 feet in an unsafe maneuver.',
                roleDescriptions: {
                    defence: 'The Russian pilots fired flares across the flight path. The Rivet Joint had to take evasive action.',
                    foreign: 'Russia claims the aircraft was violating their airspace, which we strongly deny.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'How should we adjust our intelligence patrols?',
                        options: [
                            { id: 'opt_bsi1', text: 'Temporarily suspend flights in the area', effects: { scores: { military_readiness: -1, military_escalation: -1 } } },
                            { id: 'opt_bsi2', text: 'Continue patrols but deploy Typhoon escorts', effects: { scores: { military_readiness: +1, military_escalation: +2 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_dissident_results',
                stage: 'stage_2',
                name: 'Dissident Attack - Investigation Results',
                requiresUnlock: true,
                repeatable: false,
                location: [51.06, -1.79], // Salisbury
                image: '/images/events/ev_dissident_results.png',
                description: 'Toxicology confirms the use of a military-grade nerve agent on the Russian dissident. Intelligence heavily points to GRU operatives who fled the country.',
                roleDescriptions: {
                    foreign: 'Our allies are waiting to see our response. Failing to act strongly will signal weakness.',
                    home: 'Public outrage is significant. Chemical weapons used on British soil demands a severe response.'
                },
                decisions: [
                    {
                        role: 'foreign',
                        text: 'What action should we take against Russia?',
                        options: [
                            { id: 'opt_dr1', text: 'Expel 23 diplomats and publicly assign blame', effects: { scores: { uk_russia: +2, civilian_stability: +1, uk_europe: +1 } } },
                            { id: 'opt_dr2', text: 'Demand a joint OPCW investigation before acting', effects: { scores: { uk_europe: -1, civilian_stability: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_sub_detection',
                stage: 'stage_2',
                name: 'Unidentified Submarine Detection',
                repeatable: false,
                location: [56.0, -5.5], // Near Faslane
                image: '/images/events/ev_sub_detection.png',
                description: 'Sonar contacts near HMNB Clyde suggest a Russian Akula-class attack submarine is probing the defenses of the UK strategic nuclear deterrent base.',
                roleDescriptions: {
                    defence: 'The submarine is lingering just outside territorial waters but testing our response times.',
                    foreign: 'This is a direct challenge to the security of the Vanguard fleet.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'What are the orders for the antisubmarine forces?',
                        options: [
                            { id: 'opt_sub1', text: 'Aggressively prosecute with active sonar and ASW helicopters', effects: { scores: { military_escalation: +2, military_readiness: +1 } } },
                            { id: 'opt_sub2', text: 'Quietly monitor the contact to gather acoustic intelligence', effects: { scores: { military_readiness: +2, military_escalation: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_oligarch_sanctions',
                stage: 'stage_2',
                name: 'Targeted Sanctions on Oligarchs',
                repeatable: false,
                location: [51.5, -0.1], // London
                image: '/images/events/ev_oligarch_sanctions.png',
                description: 'Following rising tensions, pressure mounts in Parliament to aggressively freeze the assets of prominent Russian billionaires operating in "Londongrad".',
                roleDescriptions: {
                    home: 'The public is demanding action against corrupt wealth flowing through the capital.',
                    treasury: 'Immediate freezing will cause capital flight and legal challenges, but targeted monitoring may be seen as weak.'
                },
                decisions: [
                    {
                        role: 'home',
                        text: 'How far do we go with financial sanctions?',
                        options: [
                            { id: 'opt_os1', text: 'Immediately freeze high-profile assets and seize properties', effects: { scores: { uk_russia: +2, civilian_stability: +1 } } },
                            { id: 'opt_os2', text: 'Implement mild financial monitoring and Unexplained Wealth Orders', effects: { scores: { civilian_stability: -1, uk_europe: -1 } } }
                        ]
                    }
                ]
            },
            {
                id: 'ev_undersea_cable',
                stage: 'stage_2',
                name: 'Suspicious Activity near Undersea Cables',
                repeatable: false,
                location: [50.0, -6.5], // Off Cornwall
                image: '/images/events/ev_undersea_cable.png',
                description: 'A Russian oceanographic research vessel (Yantar-class) is loitering and deploying submersibles near critical transatlantic communication cables off the coast of Cornwall.',
                roleDescriptions: {
                    defence: 'This vessel is known to carry deep-sea submersibles capable of tapping or severing communication lines.',
                    cyber: 'If those cables are cut, UK internet traffic and financial data flows to the US will be severely impacted.'
                },
                decisions: [
                    {
                        role: 'defence',
                        text: 'How should the Royal Navy handle the research vessel?',
                        options: [
                            { id: 'opt_uc1', text: 'Deploy a frigate to forcefully escort them away from the cables', effects: { scores: { military_escalation: +1, uk_russia: +1 } } },
                            { id: 'opt_uc2', text: 'Deploy a shadowing vessel to observe but do not engage', effects: { scores: { military_escalation: -1, uk_us: -1 } } }
                        ]
                    }
                ]
            },

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
                id: 'act_request_strike_options',
                name: 'Request Deep Strike Options',
                description: 'Request target packages for a deep strike inside Russia from the Chief of Defence Staff (CDS). Options will become available shortly. Small risk of intelligence leak causing diplomatic damage.',
                initiator: ['PM', 'defence'],
                conditions: { minScores: { military_readiness: 3 } },
                effects: {
                    randomEvents: [
                        { id: 'ev_strike_options_leak', weight: 20, effects: { scores: { military_escalation: +1, uk_europe: -1 } } },
                        { id: 'ev_strike_options_secured', weight: 80 }
                    ],
                    triggerEvents: [
                        { id: 'ev_strike_options_ready', delayMs: 60000 }
                    ]
                }
            },
            {
                id: 'act_strike_airbase',
                name: 'Strike Russian Airbase (F-35)',
                description: 'Launch a deep penetration strike using F-35s against a forward Russian airbase. High chance of tactical success to force de-escalation.',
                initiator: ['PM', 'defence'],
                requiresApprovalFrom: ['PM', 'home'],
                conditions: { minScores: { military_readiness: 3 }, triggeredEvents: ['ev_strike_options_ready'] },
                effects: {
                    randomEvents: [
                        { id: 'ev_f35_success', weight: 60, effects: { scores: { military_escalation: -2, uk_russia: +1 } } },
                        { id: 'ev_f35_fail', weight: 40, effects: { scores: { military_escalation: +2, civilian_stability: -1 } } }
                    ]
                }
            },
            {
                id: 'act_strike_c2',
                name: 'Strike Russian C2 Node (F-35)',
                description: 'Launch a high-risk strike against a critical Russian Command & Control node. Lower chance of success, but massive de-escalation impact if successful.',
                initiator: ['PM', 'defence'],
                requiresApprovalFrom: ['PM', 'home'],
                conditions: { minScores: { military_readiness: 3 }, triggeredEvents: ['ev_strike_options_ready'] },
                effects: {
                    randomEvents: [
                        { id: 'ev_f35_success', weight: 30, effects: { scores: { military_escalation: -3, uk_russia: +2 } } },
                        { id: 'ev_f35_fail', weight: 70, effects: { scores: { military_escalation: +3, civilian_stability: -2 } } }
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
