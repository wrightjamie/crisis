module.exports = {
    id: 'project_icarus',
    name: 'Project Icarus: Climate Collapse',
    description: 'A cascading global climate failure threatens civilization. The only hope is the experimental Project Icarus geo-engineering network. Will nations sacrifice their own economies to save the planet, or hoard resources as the world burns?',
    mapConfig: { center: [20, 0], zoom: 2 },
    roles: ['un_science', 'north_america', 'eu', 'pan_asia', 'global_south'],
    roleNames: {
        'un_science': 'UN Science Directorate',
        'north_america': 'North American Alliance',
        'eu': 'European Union',
        'pan_asia': 'Pan-Asian Coalition',
        'global_south': 'Global South'
    },
    minUsers: 2,
    mandatoryRoles: ['un_science', 'north_america', 'pan_asia'],
    roleFallbacks: {
        eu: ['un_science', 'north_america'],
        global_south: ['un_science', 'pan_asia']
    },
    initialScores: {
        climate_instability: 1, // 1 = Stable, 5 = Extinction Event
        icarus_progress: 1,     // 1 = Blueprint, 5 = Operational
        na_economy: 5, na_stability: 5,
        eu_economy: 5, eu_stability: 5,
        asia_economy: 5, asia_stability: 5,
        gs_economy: 4, gs_stability: 4
    },
    briefings: {
        _general: 'Global climate systems are collapsing faster than models predicted. A chain reaction of extreme weather events is destabilizing the planet. Our only hope is "Project Icarus", a massive, unproven atmospheric geo-engineering network. Building it requires unprecedented global cooperation and immense economic sacrifice. If we fail, the planet becomes uninhabitable.',
        un_science: 'You are the architects of Project Icarus. You must convince the world blocs to fund and build the network nodes, even when they are suffering from localized climate disasters.',
        north_america: 'Your economy is strong, but your coastal infrastructure is highly vulnerable. Funding Icarus means diverting funds from domestic disaster relief.',
        eu: 'You lead the global green initiative, but political fractures are widening under the strain of climate refugees and energy shortages. You must maintain unity to fund Icarus.',
        pan_asia: 'Your industrial output is essential to building the Icarus network, but severe weather is crippling your agricultural sectors. Balancing production and survival is key.',
        global_south: 'You are bearing the brunt of the climate collapse with the least resources. Demand climate reparations and funding for local Icarus nodes, or threaten to withhold vital natural resources.'
    },
    aiConfig: {
        systemPrompt: 'You are an objective UN Climate AI. Summarize the global state based on the scores. Focus on the tension between regional survival and the global progress of Project Icarus. Keep it to one concise paragraph.',
        scoreLabels: { 1: "Stable/Low", 2: "Rising/Concern", 3: "Moderate Risk", 4: "Severe/Critical", 5: "Catastrophic/Operational" },
        roleContexts: {
            un_science: "Focus on global climate instability and Icarus network progress.",
            north_america: "Focus on economic resilience and coastal infrastructure stability.",
            eu: "Focus on political unity and energy grid stability.",
            pan_asia: "Focus on industrial output and agricultural survival.",
            global_south: "Focus on climate refugees and basic resource scarcity."
        },
        scores: {
            climate_instability: { label: "Climate Instability", subject: "global climate instability", isPlural: false, roles: ["un_science", "north_america", "eu", "pan_asia", "global_south"] },
            icarus_progress: { label: "Project Icarus Progress", subject: "Project Icarus development", isPlural: false, roles: ["un_science", "north_america", "eu", "pan_asia", "global_south"] },
            na_economy: { label: "NA Economy", subject: "North American financial markets", isPlural: true, roles: ["north_america"] },
            na_stability: { label: "NA Stability", subject: "North American infrastructure", isPlural: false, roles: ["north_america"] },
            eu_economy: { label: "EU Economy", subject: "European single market", isPlural: false, roles: ["eu"] },
            eu_stability: { label: "EU Stability", subject: "European political unity", isPlural: false, roles: ["eu"] },
            asia_economy: { label: "Pan-Asia Economy", subject: "Asian industrial output", isPlural: false, roles: ["pan_asia"] },
            asia_stability: { label: "Pan-Asia Stability", subject: "Asian food security", isPlural: false, roles: ["pan_asia"] },
            gs_economy: { label: "Global South Economy", subject: "developing economies", isPlural: true, roles: ["global_south"] },
            gs_stability: { label: "Global South Stability", subject: "regional resilience", isPlural: false, roles: ["global_south"] }
        }
    },
    variantAxes: [],
    assets: [
        { id: 'node_na', name: 'Icarus Node: NA', location: [40.7128, -74.0060], state: 'under_construction', tags: ['icarus', 'north_america'] },
        { id: 'node_eu', name: 'Icarus Node: EU', location: [48.8566, 2.3522], state: 'under_construction', tags: ['icarus', 'eu'] },
        { id: 'node_asia', name: 'Icarus Node: Asia', location: [31.2304, 121.4737], state: 'under_construction', tags: ['icarus', 'pan_asia'] },
        { id: 'city_miami', name: 'Miami (Vulnerable Coastal)', location: [25.7617, -80.1918], state: 'operational', tags: ['infrastructure', 'north_america'] },
        { id: 'agri_mekong', name: 'Mekong Delta (Agriculture)', location: [10.0333, 105.7833], state: 'operational', tags: ['infrastructure', 'pan_asia'] }
    ],
    eventTemplates: [
        {
            id: 'ev_climate_start',
            name: 'The Tipping Point',
            description: 'Massive ice shelf collapse detected in Antarctica. Sea levels are projected to rise catastrophically within hours. Project Icarus is our only option, but requires massive initial funding.',
            location: [-75.2509, -100.2263], // Antarctica
            decisions: [
                {
                    role: 'un_science',
                    text: 'Funding Directive?',
                    options: [
                        { id: 'demand_all', text: 'Demand Immediate Global Funding (Lowers all economies)', effects: { scores: { icarus_progress: +1, na_economy: -1, eu_economy: -1, asia_economy: -1, gs_economy: -1 } } },
                        { id: 'delay_funding', text: 'Delay Funding (Risk Climate Spikes)', effects: { scores: { climate_instability: +1 } } }
                    ]
                },
                {
                    role: 'north_america',
                    text: 'Domestic vs. Global?',
                    options: [
                        { id: 'fund_icarus', text: 'Fund Icarus Node', effects: { scores: { icarus_progress: +1, na_economy: -1 } } },
                        { id: 'build_seawalls', text: 'Build Seawalls (Protect NA)', effects: { scores: { na_stability: +1, icarus_progress: -1, climate_instability: +1 } } }
                    ]
                },
                {
                    role: 'eu',
                    text: 'Energy Grid Pivot?',
                    options: [
                        { id: 'power_icarus', text: 'Divert Power to Icarus (Causes EU Blackouts)', effects: { scores: { icarus_progress: +1, eu_stability: -1 } } },
                        { id: 'maintain_grid', text: 'Maintain EU Grid', effects: { scores: { eu_stability: +1, climate_instability: +1 } } }
                    ]
                }
            ],
            triggerEvents: [
                { id: 'ev_hurricane_miami', delayMs: 120000 },
                { id: 'ev_drought_mekong', delayMs: 240000 },
                { id: 'ev_climate_refugees', delayMs: 360000 },
                { id: 'ev_endgame_eval', delayMs: 600000 }
            ]
        },
        {
            id: 'ev_hurricane_miami',
            name: 'Category 6 Hurricane',
            description: 'An unprecedented super-storm is bearing down on the North American east coast.',
            location: [25.7617, -80.1918], // Miami
            decisions: [
                {
                    role: 'north_america',
                    text: 'Emergency Response?',
                    options: [
                        { id: 'save_city', text: 'Divert Icarus Funds to Evacuation', effects: { scores: { na_stability: +1, na_economy: -1, icarus_progress: -1 } } },
                        { id: 'sacrifice_city', text: 'Maintain Icarus Funding (Sacrifice Miami)', effects: { scores: { na_stability: -2, icarus_progress: +1 } } }
                    ]
                },
                {
                    role: 'eu',
                    hiddenFrom: ['north_america', 'pan_asia', 'global_south', 'un_science'], // Secret decision
                    text: 'Disaster Capitalism?',
                    options: [
                        { id: 'short_market', text: 'Short NA Markets (Covert)', effects: { scores: { eu_economy: +1, na_economy: -1 } } },
                        { id: 'send_aid', text: 'Send Relief Aid', effects: { scores: { eu_economy: -1, na_stability: +1 } } }
                    ]
                }
            ]
        },
        {
            id: 'ev_drought_mekong',
            name: 'Agricultural Collapse',
            description: 'Severe drought is devastating the Mekong Delta, a critical global food source.',
            location: [10.0333, 105.7833], // Mekong Delta
            decisions: [
                {
                    role: 'pan_asia',
                    text: 'Food Security?',
                    options: [
                        { id: 'hoard_food', text: 'Ban Food Exports', effects: { scores: { asia_stability: +1, gs_stability: -2, eu_stability: -1 } } },
                        { id: 'export_food', text: 'Maintain Exports (Risk Famine at Home)', effects: { scores: { asia_stability: -2, gs_stability: +1, eu_stability: +1 } } }
                    ]
                },
                {
                    role: 'north_america',
                    hiddenFrom: ['pan_asia', 'eu', 'global_south', 'un_science'], // Secret decision
                    text: 'Industrial Sabotage?',
                    options: [
                        { id: 'poach_engineers', text: 'Poach Icarus Engineers from Asia (Covert)', effects: { scores: { icarus_progress: -1, na_economy: +1, asia_economy: -1 } } },
                        { id: 'share_tech', text: 'Share Agricultural Tech', effects: { scores: { na_economy: -1, asia_stability: +1 } } }
                    ]
                }
            ]
        },
        {
            id: 'ev_climate_refugees',
            name: 'Mass Migration Crisis',
            description: 'Millions are fleeing uninhabitable zones in the Global South, moving towards Europe and Asia.',
            location: [35.0000, 15.0000], // Mediterranean/North Africa
            decisions: [
                {
                    role: 'global_south',
                    text: 'Refugee Policy?',
                    options: [
                        { id: 'demand_borders_open', text: 'Demand Open Borders & Aid', effects: { scores: { gs_stability: +1, eu_stability: -1, asia_stability: -1 } } },
                        { id: 'containment_camps', text: 'Establish Containment Camps (Humanitarian Crisis)', effects: { scores: { gs_stability: -2, climate_instability: +1 } } }
                    ]
                },
                {
                    role: 'eu',
                    text: 'Border Control?',
                    options: [
                        { id: 'close_borders', text: 'Militarize Borders', effects: { scores: { eu_stability: +1, gs_stability: -2, eu_economy: -1 } } },
                        { id: 'open_borders', text: 'Accept Refugees', effects: { scores: { eu_stability: -2, gs_stability: +1 } } }
                    ]
                }
            ]
        },
        {
            id: 'ev_endgame_eval',
            name: 'The Final Tipping Point',
            description: 'Global temperatures are spiking. The time for preparation is over. Is Project Icarus ready?',
            triggerEvents: [
                { id: 'ev_end_extinction', delayMs: 1000 },
                { id: 'ev_end_salvation', delayMs: 1000 },
                { id: 'ev_end_wasteland', delayMs: 1000 }
            ]
        },
        {
            id: 'ev_end_extinction',
            name: 'Runaway Greenhouse Effect',
            description: 'Project Icarus was not completed in time. The climate has tipped past the point of no return. The atmosphere is becoming toxic. Humanity is facing extinction. Selfishness has doomed us all.',
            isEndGame: true,
            conditions: { minScores: { climate_instability: 5 }, maxScores: { icarus_progress: 3 } }
        },
        {
            id: 'ev_end_salvation',
            name: 'A New Dawn',
            description: 'Against all odds, the nations of the world united. Project Icarus is fully operational and has successfully stabilized the global climate. The cost was high, but humanity has survived to see another century.',
            isEndGame: true,
            conditions: { maxScores: { climate_instability: 3 }, minScores: { icarus_progress: 5 } }
        },
        {
            id: 'ev_end_wasteland',
            name: 'The Ruined Earth',
            description: 'Project Icarus was partially deployed, preventing total extinction, but the climate remains highly unstable. Resource wars have fractured the global order. Humanity survives, but in a harsh, unforgiving wasteland.',
            isEndGame: true,
            // Fallback ending if neither extinction nor salvation conditions are fully met
        }
    ]
};
