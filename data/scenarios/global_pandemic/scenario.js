module.exports = {
    id: 'global_pandemic',
    name: 'The Pathogen Protocol',
    description: 'A highly lethal pathogen has emerged. Players must balance national survival against the need for global cooperation to find a cure. Will you hoard resources or work together?',
    mapConfig: { center: [20, 0], zoom: 2 },
    roles: ['who', 'usa', 'china', 'eu', 'global_south'],
    roleNames: {
        'who': 'World Health Organization (Director)',
        'usa': 'United States (President)',
        'china': 'China (Premier)',
        'eu': 'European Union (Commission President)',
        'global_south': 'Global South Coalition (Chair)'
    },
    minUsers: 2,
    mandatoryRoles: ['who', 'usa', 'china'],
    roleFallbacks: {
        eu: ['who', 'usa'],
        global_south: ['who', 'china']
    },
    initialScores: {
        global_infection: 1, // 1 = Contained, 5 = Global Crisis
        global_research: 1,  // 1 = No Data, 5 = Cure Ready
        usa_economy: 5, usa_order: 5,
        china_economy: 5, china_order: 5,
        eu_economy: 5, eu_order: 5,
        gs_economy: 4, gs_order: 4
    },
    briefings: {
        _general: 'A novel, highly contagious pathogen (Strain Omega) has been detected simultaneously in several global transit hubs. Initial reports suggest high lethality. The world looks to you for leadership. You must balance the economic and social stability of your regions against the urgent need for a coordinated global response.',
        who: 'You must coordinate the global response. You have no direct power, but you control the flow of information. Persuade nations to share data and resources.',
        usa: 'Protect your citizens and your economy. Your advanced research labs are critical, but sharing data might give rivals an edge.',
        china: 'Maintain strict internal order and protect your manufacturing base. You have massive mobilization capabilities, but isolation might hinder global research.',
        eu: 'Balance the open borders of the Schengen area with the need for quarantine. Your research network is vast but requires consensus.',
        global_south: 'You represent vulnerable populations with limited medical infrastructure. Demand aid and vaccine equity, or threaten to withhold vital supply chains.'
    },
    aiConfig: {
        systemPrompt: 'You are an objective WHO situation AI. Summarize the global state based on the scores. Focus on the tension between national isolationism and global cooperation. Keep it to one concise paragraph.',
        scoreLabels: { 1: "Stable/Low", 2: "Rising/Concern", 3: "Moderate Risk", 4: "Severe/Critical", 5: "Catastrophic/Cured" },
        roleContexts: {
            who: "Focus on global infection rates and research progress.",
            usa: "Focus on domestic economic impact and public order.",
            china: "Focus on industrial output and strict internal containment.",
            eu: "Focus on coalition stability and border control.",
            global_south: "Focus on aid distribution and basic infrastructure survival."
        },
        scores: {
            global_infection: { label: "Global Infection Level", subject: "global pandemic spread", isPlural: false, roles: ["who", "usa", "china", "eu", "global_south"] },
            global_research: { label: "Global Cure Progress", subject: "international vaccine research", isPlural: false, roles: ["who", "usa", "china", "eu", "global_south"] },
            usa_economy: { label: "USA Economy", subject: "US financial markets", isPlural: true, roles: ["usa"] },
            usa_order: { label: "USA Public Order", subject: "US civil stability", isPlural: false, roles: ["usa"] },
            china_economy: { label: "China Economy", subject: "Chinese industrial output", isPlural: false, roles: ["china"] },
            china_order: { label: "China Public Order", subject: "Chinese civil obedience", isPlural: false, roles: ["china"] },
            eu_economy: { label: "EU Economy", subject: "European single market", isPlural: false, roles: ["eu"] },
            eu_order: { label: "EU Public Order", subject: "European civil unrest", isPlural: false, roles: ["eu"] },
            gs_economy: { label: "Global South Economy", subject: "developing economies", isPlural: true, roles: ["global_south"] },
            gs_order: { label: "Global South Stability", subject: "regional stability", isPlural: false, roles: ["global_south"] }
        }
    },
    variantAxes: [],
    assets: [
        { id: 'lab_atlanta', name: 'CDC Headquarters', location: [33.7490, -84.3880], state: 'operational', tags: ['research', 'usa'] },
        { id: 'lab_wuhan', name: 'Wuhan Institute of Virology', location: [30.5928, 114.3055], state: 'operational', tags: ['research', 'china'] },
        { id: 'lab_oxford', name: 'Oxford Vaccine Group', location: [51.7520, -1.2577], state: 'operational', tags: ['research', 'eu'] },
        { id: 'hub_mumbai', name: 'Mumbai Transit Hub', location: [19.0760, 72.8777], state: 'operational', tags: ['population', 'global_south'] }
    ],
    eventTemplates: [
        {
            id: 'ev_outbreak_start',
            name: 'Patient Zero Identified',
            description: 'The WHO has officially declared Strain Omega a Public Health Emergency of International Concern. Global travel is accelerating the spread.',
            location: [46.2044, 6.1432], // Geneva (WHO)
            decisions: [
                {
                    role: 'who',
                    text: 'Initial Directive?',
                    options: [
                        { id: 'urge_coop', text: 'Urge Open Borders & Data Sharing', effects: { scores: { global_research: +1, global_infection: +1 } } },
                        { id: 'urge_lockdown', text: 'Recommend Immediate Global Lockdown', effects: { scores: { global_infection: -1, usa_economy: -1, china_economy: -1, eu_economy: -1, gs_economy: -1 } } }
                    ]
                },
                {
                    role: 'usa',
                    text: 'Border Policy?',
                    options: [
                        { id: 'close', text: 'Close US Borders', effects: { scores: { usa_economy: -1, global_infection: -1, usa_order: +1 } } },
                        { id: 'open', text: 'Keep Borders Open', effects: { scores: { usa_economy: +1, global_infection: +1 } } }
                    ]
                },
                {
                    role: 'china',
                    text: 'Domestic Response?',
                    options: [
                        { id: 'zero_covid', text: 'Zero-Tolerance Lockdowns', effects: { scores: { china_economy: -2, china_order: -1, global_infection: -1 } } },
                        { id: 'mitigate', text: 'Targeted Mitigation', effects: { scores: { global_infection: +1, china_order: +1 } } }
                    ]
                }
            ],
            triggerEvents: [
                { id: 'ev_research_breakthrough', delayMs: 120000 },
                { id: 'ev_supply_chain_collapse', delayMs: 240000 },
                { id: 'ev_vaccine_hoarding', delayMs: 360000 },
                { id: 'ev_endgame_eval', delayMs: 600000 }
            ]
        },
        {
            id: 'ev_research_breakthrough',
            name: 'Early Sequencing Data',
            description: 'Researchers have mapped the genome, but the data is held by competing national labs.',
            location: [51.7520, -1.2577], // Oxford
            decisions: [
                {
                    role: 'eu',
                    text: 'Oxford Data Policy?',
                    options: [
                        { id: 'open_source', text: 'Publish Open Source', effects: { scores: { global_research: +2, eu_economy: -1 } } },
                        { id: 'patent', text: 'Patent & Sell to USA/China', effects: { scores: { eu_economy: +2, global_research: -1 } } }
                    ]
                },
                {
                    role: 'china',
                    hiddenFrom: ['usa', 'eu', 'who', 'global_south'], // Secret decision! Prisoner's dilemma.
                    text: 'Cyber Espionage?',
                    options: [
                        { id: 'hack', text: 'Steal EU/US Data (Covert)', effects: { scores: { global_research: +1, china_economy: +1, eu_order: -1, usa_order: -1 } } },
                        { id: 'cooperate', text: 'Wait for official sharing', effects: { scores: {} } }
                    ]
                },
                {
                    role: 'usa',
                    hiddenFrom: ['china', 'eu', 'who', 'global_south'], // Secret decision! Prisoner's dilemma.
                    text: 'Operation Warp Speed?',
                    options: [
                        { id: 'fund_private', text: 'Fund Private US Pharma (Hoard Data)', effects: { scores: { global_research: -1, usa_economy: +2 } } },
                        { id: 'fund_who', text: 'Fund WHO Initiatives', effects: { scores: { global_research: +2, usa_economy: -1 } } }
                    ]
                }
            ]
        },
        {
            id: 'ev_supply_chain_collapse',
            name: 'Global Supply Chain Critical',
            description: 'Lockdowns are disrupting the flow of PPE and basic medical supplies.',
            location: [19.0760, 72.8777], // Mumbai
            decisions: [
                {
                    role: 'global_south',
                    text: 'Export Policy?',
                    options: [
                        { id: 'embargo', text: 'Embargo PPE Exports (Protect own citizens)', effects: { scores: { gs_order: +2, gs_economy: -1, usa_order: -1, eu_order: -1 } } },
                        { id: 'export', text: 'Continue Exports (Maintain Economy)', effects: { scores: { gs_economy: +2, gs_order: -2 } } }
                    ]
                },
                {
                    role: 'usa',
                    text: 'Defense Production Act?',
                    options: [
                        { id: 'seize', text: 'Seize shipments bound for EU/Global South', effects: { scores: { usa_order: +1, eu_order: -1, gs_order: -1 } } },
                        { id: 'share', text: 'Coordinate equitable distribution', effects: { scores: { usa_order: -1, eu_order: +1, gs_order: +1 } } }
                    ]
                }
            ]
        },
        {
            id: 'ev_vaccine_hoarding',
            name: 'Vaccine Nationalism',
            description: 'The first viable vaccines are entering production, but demand vastly outstrips supply.',
            location: [33.7490, -84.3880], // Atlanta
            decisions: [
                {
                    role: 'who',
                    text: 'COVAX Initiative Allocation?',
                    options: [
                        { id: 'prioritize_vulnerable', text: 'Send to Global South', effects: { scores: { gs_order: +2, global_infection: -1, usa_order: -1, eu_order: -1 } } },
                        { id: 'prioritize_hubs', text: 'Send to Global Transit Hubs', effects: { scores: { global_infection: -2 } } }
                    ]
                },
                {
                    role: 'eu',
                    text: 'Export Bans?',
                    options: [
                        { id: 'ban', text: 'Block Vaccine Exports', effects: { scores: { eu_order: +2, eu_economy: -1, global_infection: +1 } } },
                        { id: 'allow', text: 'Honor International Contracts', effects: { scores: { eu_order: -1, eu_economy: +1, global_infection: -1 } } }
                    ]
                }
            ]
        },
        {
            id: 'ev_endgame_eval',
            name: 'The Aftermath',
            description: 'The initial acute phase of the pandemic is over. Evaluating global survival...',
            triggerEvents: [
                { id: 'ev_end_collapse', delayMs: 1000 },
                { id: 'ev_end_cooperation', delayMs: 1000 },
                { id: 'ev_end_fractured', delayMs: 1000 }
            ]
        },
        {
            id: 'ev_end_collapse',
            name: 'Global Collapse',
            description: 'Selfishness and lack of coordination doomed humanity. The virus mutated faster than research could keep up. Economies are in ruins, and public order has disintegrated worldwide.',
            isEndGame: true,
            conditions: { minScores: { global_infection: 5 }, maxScores: { global_research: 3 } }
        },
        {
            id: 'ev_end_cooperation',
            name: 'A Triumph of Humanity',
            description: 'Despite immense pressure, nations worked together. Data was shared, supply chains were maintained, and a cure was found and distributed equitably. The world survived together.',
            isEndGame: true,
            conditions: { maxScores: { global_infection: 2 }, minScores: { global_research: 4 } }
        },
        {
            id: 'ev_end_fractured',
            name: 'A Fractured World',
            description: 'The virus was contained, but the cost was profound. Vaccine hoarding and economic warfare have created deep global divides. The cure exists, but only for those who could afford to take it by force.',
            isEndGame: true,
            // Fallback ending if neither collapse nor cooperation conditions are fully met
        }
    ]
};
