// Curated Quick-Add Assets and Scenario Presets for the Crisis Scenario Editor
const { getImage } = require('./image-library');

const ASSET_PRESETS = [
    // Civil & Infrastructure
    {
        presetId: 'water_treatment',
        category: 'Infrastructure',
        name: 'Water Treatment Plant',
        image: 'evt_water_plant',
        state: 'operational',
        tags: ['infrastructure', 'civilian'],
        briefing: 'Primary municipal water treatment facility. Critical for public health and sanitation.'
    },
    {
        presetId: 'power_substation',
        category: 'Infrastructure',
        name: 'Power Substation Alpha',
        image: 'substation_alpha',
        state: 'operational',
        tags: ['infrastructure', 'grid'],
        briefing: 'High-voltage power routing hub supplying the metropolitan sector.'
    },
    {
        presetId: 'national_grid',
        category: 'Infrastructure',
        name: 'National Grid Control',
        image: 'national_grid',
        state: 'operational',
        tags: ['civilian', 'infrastructure'],
        briefing: 'Central transmission control centre balancing regional electricity and gas supply.'
    },
    {
        presetId: 'regional_airport',
        category: 'Infrastructure',
        name: 'International Airport',
        image: 'bvi_airport',
        state: 'operational',
        tags: ['infrastructure', 'transport'],
        briefing: 'Primary regional aviation hub for civilian evacuation and relief airlifts.'
    },
    {
        presetId: 'gov_hq',
        category: 'Infrastructure',
        name: 'Government House',
        image: 'bvi_gov_house',
        state: 'operational',
        tags: ['civilian', 'government'],
        briefing: 'Seat of executive administration and emergency coordination.'
    },

    // Emergency & Medical
    {
        presetId: 'main_hospital',
        category: 'Emergency',
        name: 'Metro General Hospital',
        image: 'evt_hospital_power_failure',
        state: 'operational',
        tags: ['infrastructure', 'ems', 'medical'],
        briefing: 'Regional Level-1 trauma center and emergency triage hub.'
    },
    {
        presetId: 'police_precinct',
        category: 'Emergency',
        name: 'Central Police Precinct',
        image: 'evt_precinct_vulnerable',
        state: 'operational',
        tags: ['security', 'emergency'],
        briefing: 'Command headquarters for rapid response and civil order units.'
    },
    {
        presetId: 'rescue_heli',
        category: 'Emergency',
        name: 'Search & Rescue Helicopter',
        image: 'rescue_heli',
        state: 'operational',
        tags: ['emergency', 'air'],
        briefing: 'Rotary-wing SAR unit ready for rapid deployment and medevac.'
    },

    // Military & Air
    {
        presetId: 'nato_airbase',
        category: 'Military',
        name: 'Main Operating Airbase',
        image: 'nato_air_base',
        state: 'operational',
        tags: ['military', 'airbase'],
        briefing: 'Hardened airbase with early-warning radar arrays and Quick Reaction Alert (QRA) hangars.'
    },
    {
        presetId: 'typhoon_flight',
        category: 'Military',
        name: 'Eurofighter Typhoon Detachment',
        image: 'typhoon_aircraft',
        state: 'operational',
        tags: ['military', 'air', 'combat'],
        briefing: 'Multi-role fourth-generation combat aircraft on Quick Reaction Alert for airspace interception.'
    },
    {
        presetId: 'air_mobility_hub',
        category: 'Military',
        name: 'Strategic Air Transport Hub',
        image: 'raf_brize_norton',
        state: 'operational',
        tags: ['military', 'hub', 'mobility'],
        briefing: 'Main Operating Base for strategic airlift (C-17, A400M) and air-to-air refueling tankers.'
    },
    {
        presetId: 'mech_brigade',
        category: 'Military',
        name: '72nd Mechanized Brigade',
        image: 'brigade_alpha',
        state: 'operational',
        tags: ['military', 'frontline'],
        briefing: 'Armored and mechanized infantry formation holding the primary defensive sector.'
    },
    {
        presetId: 'supply_depot',
        category: 'Military',
        name: 'Forward Logistics & Supply Hub',
        image: 'us_v_corps',
        state: 'operational',
        tags: ['military', 'logistics'],
        briefing: 'Central ammunition, fuel, and medical sustainment depot.'
    },

    // Naval & Maritime
    {
        presetId: 'naval_base',
        category: 'Naval',
        name: 'Strategic Naval Base',
        image: 'hmnb_clyde',
        state: 'operational',
        tags: ['military', 'naval'],
        briefing: 'Deep-water naval operating base supporting submarine and surface fleet deployments.'
    },
    {
        presetId: 'carrier_group',
        category: 'Naval',
        name: 'Carrier Strike Task Force',
        image: 'as_truman',
        state: 'operational',
        tags: ['military', 'naval'],
        briefing: 'Forward-deployed naval task force providing maritime interdiction and air projection.'
    },
    {
        presetId: 'amphibious_ship',
        category: 'Naval',
        name: 'Amphibious Support Vessel',
        image: 'rfa_mounts_bay',
        state: 'operational',
        tags: ['naval', 'logistics'],
        briefing: 'Landing ship dock capable of offloading heavy engineering equipment and disaster relief supplies.'
    },

    // Intelligence & Recon
    {
        presetId: 'sigint_station',
        category: 'Intelligence',
        name: 'GCHQ / SIGINT Ground Station',
        image: 'gchq_bude',
        state: 'operational',
        tags: ['intel', 'cyber'],
        briefing: 'Satellite ground station and cyber telemetry interception facility.'
    },
    {
        presetId: 'isr_wing',
        category: 'Intelligence',
        name: 'ISR Reconnaissance Wing',
        image: 'raf_waddington',
        state: 'operational',
        tags: ['intel', 'isr', 'air'],
        briefing: 'Intelligence, Surveillance, and Reconnaissance wing operating SIGINT and remotely piloted aircraft.'
    },
    {
        presetId: 'drone_recon',
        category: 'Intelligence',
        name: 'Tactical Drone Reconnaissance Unit',
        image: 'drone_squad',
        state: 'operational',
        tags: ['drone', 'recon'],
        briefing: 'Unmanned aerial tactical reconnaissance squad providing real-time battlefield overwatch.'
    }
];

const ROLE_PRESETS = {
    bundles: [
        {
            id: 'uk_cobr',
            name: 'UK COBR / Cabinet Crisis',
            roles: [
                { id: 'pm', name: 'Prime Minister', briefing: 'You chair COBR and hold ultimate political responsibility for national crisis response and public confidence.' },
                { id: 'defence', name: 'Defence Secretary', briefing: 'You direct Armed Forces readiness, military aid to civil authorities (MACA), and rules of engagement.' },
                { id: 'home', name: 'Home Secretary', briefing: 'You oversee domestic security, policing, border control, and counter-terrorism operations.' },
                { id: 'foreign', name: 'Foreign Secretary', briefing: 'You manage diplomatic backchannels, NATO coordination, and international intelligence sharing.' }
            ]
        },
        {
            id: 'civil_emergency',
            name: 'Municipal Disaster Response',
            roles: [
                { id: 'mayor', name: "Mayor's Office", briefing: 'You hold executive authority over city-wide emergency declarations, resource allocation, and public messaging.' },
                { id: 'emergency', name: 'Emergency Services Chief', briefing: 'You command Fire, Search & Rescue, and EMS deployment across the affected zones.' },
                { id: 'police', name: 'Police Commissioner', briefing: 'You maintain civil order, secure critical infrastructure, and coordinate evacuation corridors.' },
                { id: 'media', name: 'Public Information Officer', briefing: 'You manage press briefings, emergency broadcasts, and counter-misinformation efforts.' }
            ]
        },
        {
            id: 'joint_military',
            name: 'Joint Task Force Command',
            roles: [
                { id: 'jfc', name: 'Joint Force Commander', briefing: 'Overall operational commander responsible for theatre strategy and mission accomplishment.' },
                { id: 'air_cmd', name: 'Air Component Commander', briefing: 'Directs defensive counter-air, strike sorties, and strategic airlift operations.' },
                { id: 'naval_cmd', name: 'Maritime Component Commander', briefing: 'Commands surface task groups, submarine patrols, and sea lines of communication.' },
                { id: 'intel_j2', name: 'Director of Intelligence (J2)', briefing: 'Synthesizes satellite, SIGINT, and human intelligence to identify adversary intentions.' }
            ]
        }
    ],
    commonRoles: [
        { id: 'pm', name: 'Prime Minister' },
        { id: 'defence', name: 'Defence Secretary' },
        { id: 'foreign', name: 'Foreign Secretary' },
        { id: 'home', name: 'Home Secretary' },
        { id: 'chancellor', name: 'Chancellor of the Exchequer' },
        { id: 'nsa', name: 'National Security Adviser' },
        { id: 'cds', name: 'Chief of the Defence Staff' },
        { id: 'mayor', name: "Mayor's Office" },
        { id: 'emergency', name: 'Emergency Services' },
        { id: 'police', name: 'Police Chief' },
        { id: 'health', name: 'Public Health Director' },
        { id: 'media', name: 'Media & Communications' },
        { id: 'intel', name: 'Intelligence Director' },
        { id: 'cyber', name: 'National Cyber Security Commander' },
        { id: 'logistics', name: 'Logistics & Supply Commander' },
        { id: 'energy', name: 'Energy & Grid Regulator' }
    ]
};

const SCORE_PRESETS = [
    {
        id: 'civil_crisis',
        name: 'Civilian Emergency & Disaster',
        scores: {
            public_panic: { initial: 1, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
            infrastructure_damage: { initial: 1, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
            emergency_capacity: { initial: 5, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true }
        }
    },
    {
        id: 'geopolitical_clash',
        name: 'Geopolitical & Military Crisis',
        scores: {
            escalation_level: { initial: 2, min: 1, max: 5, unit: 'DEFCON', visibleToPlayers: true, promptAI: true },
            alliance_cohesion: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
            force_readiness: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
            domestic_stability: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true }
        }
    },
    {
        id: 'pandemic_outbreak',
        name: 'Biosecurity & Pandemic',
        scores: {
            containment_index: { initial: 3, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
            healthcare_capacity: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
            public_trust: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
            economic_disruption: { initial: 2, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true }
        }
    }
];

const MAP_PRESETS = [
    { id: 'uk_national', name: 'United Kingdom (National)', center: [54.2, -2.5], zoom: 6 },
    { id: 'london_metro', name: 'London Metropolitan', center: [51.5074, -0.1278], zoom: 12 },
    { id: 'caribbean_bvi', name: 'Caribbean / Virgin Islands', center: [18.42, -64.62], zoom: 11 },
    { id: 'cuba_florida', name: 'Cuba & Florida Straits', center: [22.5, -80.0], zoom: 6 },
    { id: 'eastern_europe', name: 'Eastern Europe / Black Sea', center: [49.0, 31.5], zoom: 6 },
    { id: 'falklands', name: 'South Atlantic / Falkland Islands', center: [-51.7, -59.0], zoom: 7 },
    { id: 'washington_dc', name: 'Washington, D.C.', center: [38.8951, -77.0364], zoom: 12 }
];

function getAssetPresetsWithResolvedImages() {
    return ASSET_PRESETS.map(preset => {
        const imgEntry = getImage(preset.image);
        return {
            ...preset,
            imageId: preset.image,
            imageUrl: imgEntry ? imgEntry.file : '/images/favicon.png'
        };
    });
}

function describeRolePlainly(roleName = '', roleId = '') {
    const label = (roleName || roleId || 'Team Member').trim();
    const key = `${roleId} ${roleName}`.toLowerCase();

    if (key.includes('prime minister') || key === 'pm' || key.startsWith('pm ')) {
        return 'You lead the government and chair the emergency committee. You set the overall strategy, weigh advice from ministers and commanders against public confidence, and make the final call when departments disagree.';
    }
    if (key.includes('mayor') || key.includes('governor') || key.includes('local leader')) {
        return 'You lead the local government for the affected area. You make decisions on evacuations, public shelters, local resources, and keeping residents informed and safe.';
    }
    if (key.includes('defence') || key.includes('defense')) {
        return 'You are the cabinet minister responsible for the Armed Forces. You advise on military options, rules of engagement, and force readiness, and authorize military deployments or support to civil authorities.';
    }
    if (key.includes('foreign') || key.includes('diplomat') || key.includes('ambassador') || key.includes('state dept')) {
        return 'You lead the country\'s diplomacy and international relations. You manage communication with allies and foreign governments, coordinate embassy safety or evacuations, and advise on how actions will be viewed abroad.';
    }
    if (key.includes('home') || key.includes('interior')) {
        return 'You are responsible for domestic security, policing, border control, and civil resilience. You coordinate emergency services at the national level, protect critical infrastructure, and maintain public order.';
    }
    if (key.includes('chancellor') || key.includes('treasury') || key.includes('finance') || key.includes('econom')) {
        return 'You oversee the economy and public finances. You assess the economic impact of crisis options, protect financial stability and supply chains, and authorize emergency funding.';
    }
    if (key.includes('national security') || key.includes('nsa')) {
        return 'You are the senior official advising the Chair on national security. You bring together diplomatic, military, intelligence, and domestic advice so the committee sees the full picture.';
    }
    if (key.includes('air component') || key.includes('air_cmd') || key.includes('jfacc') || key.includes('air force') || key.includes('air marshal')) {
        return 'You command air operations, including fighter intercepts, air transport, and aerial reconnaissance. You advise on airspace control and air strike or airlift options.';
    }
    if (key.includes('maritime') || key.includes('naval') || key.includes('navy') || key.includes('fleet') || key.includes('coast guard')) {
        return 'You command naval forces at sea, including surface warships, submarines, and support vessels. You manage maritime security, sea lanes, and offshore relief or interdiction.';
    }
    if (key.includes('chief of the defence') || key.includes('cds') || key.includes('joint force') || key.includes('jfc') || key.includes('military') || key.includes('general') || key.includes('commander')) {
        return 'You are the operational military commander. You translate political direction into military action, command deployed forces, and advise on what the military can realistically achieve.';
    }
    if (key.includes('intel') || key.includes('j2') || key.includes('gchq') || key.includes('mi5') || key.includes('mi6') || key.includes('cia')) {
        return 'You lead the intelligence effort and brief the team on what is known, what remains uncertain, and what threats are developing. You warn of hidden risks and adversary intentions.';
    }
    if (key.includes('cyber') || key.includes('grid') || key.includes('energy') || key.includes('power') || key.includes('network')) {
        return 'You protect critical computer networks, communications, and the power grid. You investigate cyber incidents or outages, isolate affected systems, and lead technical restoration.';
    }
    if (key.includes('police') || key.includes('law enforcement') || key.includes('constabulary')) {
        return 'You command the police service. You maintain law and order, secure cordons and critical sites, keep evacuation routes open, and support rescue operations.';
    }
    if (key.includes('emergency') || key.includes('fire') || key.includes('rescue') || key.includes('ems') || key.includes('gold')) {
        return 'You command frontline emergency responders—fire, search and rescue, and ambulance crews. You prioritize saving lives, evacuating danger zones, and containing the incident on the ground.';
    }
    if (key.includes('health') || key.includes('medical') || key.includes('hospital') || key.includes('chief medical') || key.includes('cmo')) {
        return 'You lead hospitals, medical triage, and the public health response. You manage casualty care, medical supplies, disease control, and health advice to the public.';
    }
    if (key.includes('media') || key.includes('comms') || key.includes('communication') || key.includes('press') || key.includes('public info') || key.includes('spokes')) {
        return 'You lead public communications and media relations. You draft press statements and emergency alerts, counter rumours or disinformation, and advise on how decisions will affect public trust.';
    }
    if (key.includes('logistic') || key.includes('supply') || key.includes('transport')) {
        return 'You manage transport, fuel, food, and emergency supplies. You keep supply routes open and make sure frontline teams and civilians have the resources they need.';
    }
    if (key.includes('legal') || key.includes('attorney') || key.includes('counsel')) {
        return 'You are the chief legal advisor. You advise the team on whether proposed actions—such as emergency powers, curfews, or use of force—are lawful under domestic and international law.';
    }

    return `You serve as the ${label}. You represent your area of responsibility in the crisis room, advise the chair on practical options and risks in your domain, and coordinate closely with the rest of the team.`;
}

function suggestComplementaryRoles({ title = '', description = '', existingRoles = [] } = {}) {
    const contextText = `${title} ${description} ${existingRoles.join(' ')}`.toLowerCase();
    const existingSet = new Set(existingRoles.map(r => String(r).toLowerCase().trim()));

    const catalog = [
        {
            id: 'pm',
            name: 'Prime Minister',
            keywords: ['uk', 'britain', 'cobr', 'cabinet', 'national', 'government', 'parliament', 'london', 'sovereign'],
            briefing: describeRolePlainly('Prime Minister', 'pm'),
            reason: 'Chairs the national crisis committee and makes final executive decisions.'
        },
        {
            id: 'defence',
            name: 'Defence Secretary',
            keywords: ['military', 'war', 'strike', 'air', 'naval', 'army', 'missile', 'invasion', 'nato', 'troops', 'defence', 'defense', 'pm'],
            briefing: describeRolePlainly('Defence Secretary', 'defence'),
            reason: 'Oversees the Armed Forces, military assets, and rules of engagement.'
        },
        {
            id: 'foreign',
            name: 'Foreign Secretary',
            keywords: ['diplomat', 'international', 'treaty', 'un', 'allies', 'nato', 'border', 'embassy', 'sanctions', 'pm', 'defence'],
            briefing: describeRolePlainly('Foreign Secretary', 'foreign'),
            reason: 'Handles international diplomacy, allies, and foreign governments.'
        },
        {
            id: 'home',
            name: 'Home Secretary',
            keywords: ['domestic', 'police', 'terror', 'border', 'civil', 'riot', 'security', 'uk', 'pm', 'emergency'],
            briefing: describeRolePlainly('Home Secretary', 'home'),
            reason: 'Oversees domestic security, policing, and national emergency response.'
        },
        {
            id: 'intel',
            name: 'Director of Intelligence',
            keywords: ['cyber', 'spy', 'sigint', 'gchq', 'cia', 'mi6', 'recon', 'covert', 'sabotage', 'satellite', 'threat', 'military'],
            briefing: describeRolePlainly('Director of Intelligence', 'intel'),
            reason: 'Assesses intelligence reports, threats, and adversary intentions.'
        },
        {
            id: 'cyber',
            name: 'Cyber & Grid Security Lead',
            keywords: ['blackout', 'grid', 'power', 'cyber', 'hack', 'network', 'substation', 'infrastructure', 'comms', 'digital'],
            briefing: describeRolePlainly('Cyber & Grid Security Lead', 'cyber'),
            reason: 'Manages network defence, power grid stability, and technical recovery.'
        },
        {
            id: 'mayor',
            name: "Mayor's Office",
            keywords: ['city', 'town', 'flood', 'storm', 'metro', 'municipal', 'evacuation', 'local', 'blackout', 'civilian'],
            briefing: describeRolePlainly("Mayor's Office", 'mayor'),
            reason: 'Leads local civilian government, evacuations, and municipal resources.'
        },
        {
            id: 'emergency',
            name: 'Emergency Services Chief',
            keywords: ['rescue', 'fire', 'flood', 'storm', 'ambulance', 'ems', 'hospital', 'casualties', 'disaster', 'mayor', 'hurricane'],
            briefing: describeRolePlainly('Emergency Services Chief', 'emergency'),
            reason: 'Commands frontline fire, search and rescue, and ambulance crews.'
        },
        {
            id: 'health',
            name: 'Public Health Director',
            keywords: ['pandemic', 'virus', 'hospital', 'medical', 'outbreak', 'quarantine', 'vaccine', 'contamination', 'water', 'casualties'],
            briefing: describeRolePlainly('Public Health Director', 'health'),
            reason: 'Leads hospitals, casualty care, and public health protection.'
        },
        {
            id: 'media',
            name: 'Strategic Communications Lead',
            keywords: ['panic', 'press', 'media', 'news', 'public', 'rumor', 'disinformation', 'broadcast', 'mayor', 'pm'],
            briefing: describeRolePlainly('Strategic Communications Lead', 'media'),
            reason: 'Manages public messaging, press briefings, and countering rumours.'
        },
        {
            id: 'logistics',
            name: 'Logistics & Sustainment Commander',
            keywords: ['supply', 'fuel', 'convoy', 'airlift', 'port', 'hub', 'relief', 'island', 'blockade', 'ammunition'],
            briefing: describeRolePlainly('Logistics & Sustainment Commander', 'logistics'),
            reason: 'Manages supply lines, fuel, transport, and relief distribution.'
        },
        {
            id: 'naval_cmd',
            name: 'Maritime Component Commander',
            keywords: ['sea', 'island', 'naval', 'ship', 'blockade', 'fleet', 'carrier', 'submarine', 'coast', 'port', 'atlantic', 'caribbean'],
            briefing: describeRolePlainly('Maritime Component Commander', 'naval_cmd'),
            reason: 'Commands naval vessels, sea lanes, and offshore operations.'
        }
    ];

    const scored = catalog
        .filter(item => {
            if (existingSet.has(item.id.toLowerCase()) || existingSet.has(item.name.toLowerCase())) return false;
            for (const ex of existingSet) {
                if (ex.includes(item.id.toLowerCase()) || item.name.toLowerCase().includes(ex)) return false;
            }
            return true;
        })
        .map(item => {
            let score = 1;
            for (const kw of item.keywords) {
                if (contextText.includes(kw)) score += 3;
            }
            return { ...item, score };
        })
        .sort((a, b) => b.score - a.score);

    return scored.slice(0, 4).map(({ id, name, briefing, reason }) => ({
        id,
        name,
        briefing,
        reason
    }));
}

function generateBriefingSuggestion({
    fieldType = 'general_briefing',
    scenarioName = 'Crisis Operation',
    scenarioDescription = '',
    targetName = '',
    targetId = '',
    targetState = 'operational',
    currentText = ''
} = {}) {
    const cleanTitle = (scenarioName || 'Crisis Operation').trim();
    const cleanDesc = (scenarioDescription || 'An escalating multi-agency emergency requires immediate coordination.').trim();
    const label = (targetName || targetId || 'Team Member').trim();

    if (fieldType === 'general_briefing') {
        return `${cleanTitle}\n\n${cleanDesc}\n\nYour team must assess incoming reports, coordinate across departments, and weigh immediate emergency actions against longer-term risks.`;
    }

    if (fieldType === 'scenario_description') {
        return `Coordinate multi-agency decisions during ${cleanTitle}. Balance operational readiness, critical infrastructure protection, and public confidence as events unfold.`;
    }

    if (fieldType === 'role_briefing') {
        return describeRolePlainly(targetName, targetId);
    }

    if (fieldType === 'asset_briefing') {
        return `${label} (${targetState || 'operational'}) — Key operational asset supporting ${cleanTitle}. Loss or disruption of this asset will reduce local response capacity.`;
    }

    if (fieldType === 'event_description') {
        return `${label || 'Developing Incident'}: New reports indicate escalating activity affecting ${cleanTitle}. Review the available options and decide how to respond.`;
    }

    if (fieldType === 'action_description') {
        return `Deploy ${label || 'response resources'} to stabilize the situation and support the wider response.`;
    }

    if (fieldType === 'ai_system_prompt') {
        return `You are the Crisis Intelligence Briefing System for "${cleanTitle}". Provide clear, concise situation updates based on current metric changes and active roles.`;
    }

    return currentText || `${cleanTitle}: Briefing for ${label}.`;
}

module.exports = {
    ASSET_PRESETS,
    ROLE_PRESETS,
    SCORE_PRESETS,
    MAP_PRESETS,
    getAssetPresetsWithResolvedImages,
    suggestComplementaryRoles,
    generateBriefingSuggestion,
    describeRolePlainly
};
