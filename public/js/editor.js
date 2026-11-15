// Crisis Wargame - Scenario Editor Master Controller
(function() {
    'use strict';

    const { apiFetch, escapeHtml, showToast, logout, checkAuth, renderIcon } = window.common;

    let scenario = null;
    let isNewScenario = false;
    let hasPersistedToDb = false;

    const DEFAULT_PRESETS = {
        assets: [
            { presetId: 'water_treatment', category: 'Infrastructure', name: 'Water Treatment Plant', imageId: 'evt_water_plant', imageUrl: '/images/library/evt_water_plant.jpg', state: 'operational', tags: ['infrastructure', 'civilian'], briefing: 'Primary municipal water treatment facility. Critical for public health and sanitation.' },
            { presetId: 'power_substation', category: 'Infrastructure', name: 'Power Substation Alpha', imageId: 'substation_alpha', imageUrl: '/images/library/substation_alpha.jpg', state: 'operational', tags: ['infrastructure', 'grid'], briefing: 'High-voltage power routing hub supplying the metropolitan sector.' },
            { presetId: 'national_grid', category: 'Infrastructure', name: 'National Grid Control', imageId: 'national_grid', imageUrl: '/images/library/national_grid.png', state: 'operational', tags: ['civilian', 'infrastructure'], briefing: 'Central transmission control centre balancing regional electricity and gas supply.' },
            { presetId: 'regional_airport', category: 'Infrastructure', name: 'International Airport', imageId: 'bvi_airport', imageUrl: '/images/library/bvi_airport.jpg', state: 'operational', tags: ['infrastructure', 'transport'], briefing: 'Primary regional aviation hub for civilian evacuation and relief airlifts.' },
            { presetId: 'gov_hq', category: 'Infrastructure', name: 'Government House', imageId: 'bvi_gov_house', imageUrl: '/images/library/bvi_gov_house.jpg', state: 'operational', tags: ['civilian', 'government'], briefing: 'Seat of executive administration and emergency coordination.' },
            { presetId: 'main_hospital', category: 'Emergency', name: 'Metro General Hospital', imageId: 'evt_hospital_power_failure', imageUrl: '/images/library/evt_hospital_power_failure.jpg', state: 'operational', tags: ['infrastructure', 'ems', 'medical'], briefing: 'Regional Level-1 trauma center and emergency triage hub.' },
            { presetId: 'police_precinct', category: 'Emergency', name: 'Central Police Precinct', imageId: 'evt_precinct_vulnerable', imageUrl: '/images/library/evt_precinct_vulnerable.jpg', state: 'operational', tags: ['security', 'emergency'], briefing: 'Command headquarters for rapid response and civil order units.' },
            { presetId: 'rescue_heli', category: 'Emergency', name: 'Search & Rescue Helicopter', imageId: 'rescue_heli', imageUrl: '/images/library/rescue_heli.jpg', state: 'operational', tags: ['emergency', 'air'], briefing: 'Rotary-wing SAR unit ready for rapid deployment and medevac.' },
            { presetId: 'nato_airbase', category: 'Military', name: 'Main Operating Airbase', imageId: 'nato_air_base', imageUrl: '/images/library/nato_air_base.png', state: 'operational', tags: ['military', 'airbase'], briefing: 'Hardened airbase with early-warning radar arrays and Quick Reaction Alert (QRA) hangars.' },
            { presetId: 'typhoon_flight', category: 'Military', name: 'Eurofighter Typhoon Detachment', imageId: 'typhoon_aircraft', imageUrl: '/images/library/typhoon_aircraft.png', state: 'operational', tags: ['military', 'air', 'combat'], briefing: 'Multi-role fourth-generation combat aircraft on Quick Reaction Alert for airspace interception.' },
            { presetId: 'air_mobility_hub', category: 'Military', name: 'Strategic Air Transport Hub', imageId: 'raf_brize_norton', imageUrl: '/images/library/raf_brize_norton.jpg', state: 'operational', tags: ['military', 'hub', 'mobility'], briefing: 'Main Operating Base for strategic airlift (C-17, A400M) and air-to-air refueling tankers.' },
            { presetId: 'mech_brigade', category: 'Military', name: '72nd Mechanized Brigade', imageId: 'brigade_alpha', imageUrl: '/images/library/brigade_alpha.jpg', state: 'operational', tags: ['military', 'frontline'], briefing: 'Armored and mechanized infantry formation holding the primary defensive sector.' },
            { presetId: 'supply_depot', category: 'Military', name: 'Forward Logistics & Supply Hub', imageId: 'us_v_corps', imageUrl: '/images/library/us_v_corps.png', state: 'operational', tags: ['military', 'logistics'], briefing: 'Central ammunition, fuel, and medical sustainment depot.' },
            { presetId: 'naval_base', category: 'Naval', name: 'Strategic Naval Base', imageId: 'hmnb_clyde', imageUrl: '/images/library/hmnb_clyde.png', state: 'operational', tags: ['military', 'naval'], briefing: 'Deep-water naval operating base supporting submarine and surface fleet deployments.' },
            { presetId: 'carrier_group', category: 'Naval', name: 'Carrier Strike Task Force', imageId: 'as_truman', imageUrl: '/images/library/as_truman.png', state: 'operational', tags: ['military', 'naval'], briefing: 'Forward-deployed naval task force providing maritime interdiction and air projection.' },
            { presetId: 'amphibious_ship', category: 'Naval', name: 'Amphibious Support Vessel', imageId: 'rfa_mounts_bay', imageUrl: '/images/library/rfa_mounts_bay.jpg', state: 'operational', tags: ['naval', 'logistics'], briefing: 'Landing ship dock capable of offloading heavy engineering equipment and disaster relief supplies.' },
            { presetId: 'sigint_station', category: 'Intelligence', name: 'GCHQ / SIGINT Ground Station', imageId: 'gchq_bude', imageUrl: '/images/library/gchq_bude.png', state: 'operational', tags: ['intel', 'cyber'], briefing: 'Satellite ground station and cyber telemetry interception facility.' },
            { presetId: 'isr_wing', category: 'Intelligence', name: 'ISR Reconnaissance Wing', imageId: 'raf_waddington', imageUrl: '/images/library/raf_waddington.jpg', state: 'operational', tags: ['intel', 'isr', 'air'], briefing: 'Intelligence, Surveillance, and Reconnaissance wing operating SIGINT and remotely piloted aircraft.' },
            { presetId: 'drone_recon', category: 'Intelligence', name: 'Tactical Drone Reconnaissance Unit', imageId: 'drone_squad', imageUrl: '/images/library/drone_squad.jpg', state: 'operational', tags: ['drone', 'recon'], briefing: 'Unmanned aerial tactical reconnaissance squad providing real-time battlefield overwatch.' }
        ],
        roles: {
            bundles: [
                {
                    id: 'uk_cobr_cabinet',
                    name: 'UK COBR Cabinet',
                    description: 'National government crisis response team (Prime Minister, Defence, Home Office, Intelligence).',
                    roles: [
                        { id: 'pm', name: 'Prime Minister', briefing: 'You chair the COBR emergency committee. Balance national security, public confidence, and economic stability.' },
                        { id: 'defence', name: 'Defence Secretary', briefing: 'You command military readiness, force posture, and rules of engagement across operational theatres.' },
                        { id: 'home', name: 'Home Secretary', briefing: 'You oversee domestic security, policing, counter-terrorism, and civil resilience across the homeland.' },
                        { id: 'foreign', name: 'Foreign Secretary', briefing: 'You manage diplomatic backchannels, alliance coordination, and international de-escalation.' },
                        { id: 'intel', name: 'Joint Intelligence Chair', briefing: 'You synthesize GCHQ, MI5, MI6, and Defence Intelligence assessments to warn of adversary intent.' }
                    ]
                },
                {
                    id: 'municipal_gold_command',
                    name: 'Municipal Gold Command',
                    description: 'Civil emergency & infrastructure response team (Mayor, Emergency Services, Utilities, Public Health, PR).',
                    roles: [
                        { id: 'mayor', name: 'City Mayor', briefing: 'You lead the municipal administration. Protect residents, maintain public order, and coordinate funding.' },
                        { id: 'emergency', name: 'Emergency Services Chief', briefing: 'You direct police, fire, search-and-rescue, and emergency logistics across the city.' },
                        { id: 'utility', name: 'Utilities & Infrastructure Director', briefing: 'You manage critical water, power, and transport networks and direct engineering repair crews.' },
                        { id: 'health', name: 'Chief Medical Officer', briefing: 'You oversee hospital surge capacity, epidemiological testing, and public health advisories.' },
                        { id: 'pr', name: 'Director of Communications', briefing: 'You manage press briefings, counter misinformation, and issue emergency public broadcasts.' }
                    ]
                },
                {
                    id: 'joint_military_cyber',
                    name: 'Joint Military & Cyber Taskforce',
                    description: 'Operational theatre and cyber defence command (Taskforce Commander, Cyber, Naval, Energy, Diplomacy).',
                    roles: [
                        { id: 'commander', name: 'Joint Force Commander', briefing: 'You hold operational command of deployed air, land, and maritime assets in the theatre.' },
                        { id: 'cyber', name: 'National Cyber Director', briefing: 'You lead defensive cyber operations, network isolation, and critical infrastructure remediation.' },
                        { id: 'naval', name: 'Fleet Operations Officer', briefing: 'You coordinate maritime patrols, convoy escorts, and rules of engagement at sea.' },
                        { id: 'energy', name: 'Energy & Supply Chain Minister', briefing: 'You monitor strategic reserves, grid stability, and commercial shipping continuity.' },
                        { id: 'diplomat', name: 'Special Envoy', briefing: 'You conduct high-stakes crisis negotiations with coalition partners and regional states.' }
                    ]
                }
            ],
            commonRoles: [
                { id: 'pm', name: 'Prime Minister' },
                { id: 'defence', name: 'Defence Secretary' },
                { id: 'home', name: 'Home Secretary' },
                { id: 'foreign', name: 'Foreign Secretary' },
                { id: 'chancellor', name: 'Chancellor of the Exchequer' },
                { id: 'intel', name: 'Joint Intelligence Chair' },
                { id: 'cyber', name: 'National Cyber Director' },
                { id: 'mayor', name: 'City Mayor' },
                { id: 'emergency', name: 'Emergency Services Chief' },
                { id: 'health', name: 'Chief Medical Officer' },
                { id: 'utility', name: 'Utilities & Infrastructure Director' },
                { id: 'pr', name: 'Director of Communications' },
                { id: 'commander', name: 'Joint Force Commander' },
                { id: 'naval', name: 'Fleet Operations Officer' },
                { id: 'energy', name: 'Energy & Supply Chain Minister' },
                { id: 'diplomat', name: 'Special Envoy' }
            ]
        },
        scores: [
            {
                id: 'civil_emergency',
                name: 'Civil Emergency & Public Trust',
                description: 'Tracks public panic, infrastructure damage, and emergency response capacity (1-5 scale).',
                scores: {
                    public_panic: { initial: 1, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                    infrastructure_damage: { initial: 2, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                    emergency_capacity: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true }
                }
            },
            {
                id: 'geopolitical_escalation',
                name: 'Geopolitical & Military Escalation',
                description: 'Tracks military tension, alliance cohesion, and economic disruption (1-5 scale).',
                scores: {
                    escalation_level: { initial: 2, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                    alliance_cohesion: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                    economic_disruption: { initial: 2, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true }
                }
            },
            {
                id: 'cyber_resilience',
                name: 'Cyber & Grid Resilience',
                description: 'Tracks system compromise, service availability, and public confidence (1-5 scale).',
                scores: {
                    system_compromise: { initial: 2, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                    grid_stability: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                    public_confidence: { initial: 4, min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true }
                }
            }
        ],
        maps: [
            { id: 'uk_national', name: 'United Kingdom (National)', center: [54.0, -2.5], zoom: 6 },
            { id: 'london_metro', name: 'London & Thames Estuary', center: [51.5074, -0.1278], zoom: 11 },
            { id: 'north_sea', name: 'North Sea & GIUK Gap', center: [57.5, 1.5], zoom: 6 },
            { id: 'baltic_eastern_europe', name: 'Baltic Sea & Eastern Flank', center: [56.5, 19.5], zoom: 6 },
            { id: 'strait_of_hormuz', name: 'Persian Gulf & Strait of Hormuz', center: [26.56, 56.25], zoom: 8 },
            { id: 'indo_pacific', name: 'South China Sea & Taiwan Strait', center: [21.5, 118.5], zoom: 6 },
            { id: 'global_view', name: 'Global Strategic View', center: [25.0, 10.0], zoom: 3 }
        ]
    };

    let presets = JSON.parse(JSON.stringify(DEFAULT_PRESETS));
    let selectedAssetIdx = -1;
    let autoSaveTimer = null;

    // Leaflet Map instances
    let overviewMap = null;
    let centerMarker = null;
    let assetsMap = null;
    let assetMarkers = [];

    function createBlankScenario() {
        const slug = `scenario_${Date.now().toString(36).slice(-4)}`;
        return {
            id: slug,
            name: 'New Crisis Scenario',
            description: 'Manage an unfolding multi-agency crisis situation.',
            version: '1.0.0',
            minUsers: 1,
            mapConfig: {
                center: [51.5074, -0.1278],
                zoom: 10
            },
            roles: ['pm', 'defence', 'emergency'],
            roleNames: {
                pm: 'Prime Minister',
                defence: 'Defence Secretary',
                emergency: 'Emergency Services'
            },
            mandatoryRoles: [],
            roleFallbacks: {},
            initialScores: {
                public_panic: 1,
                infrastructure_damage: 1,
                emergency_capacity: 5
            },
            scoreConfigs: {
                public_panic: { min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                infrastructure_damage: { min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true },
                emergency_capacity: { min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true }
            },
            briefings: {
                _general: 'A critical situation is developing. Coordinate across agencies to contain the crisis.',
                pm: 'Chair the emergency committee and balance national priorities.',
                defence: 'Direct armed forces readiness and military aid to civil authorities.',
                emergency: 'Command frontline emergency response units.'
            },
            assets: [],
            eventTemplates: [
                {
                    id: 'ev_start',
                    name: 'Initial Crisis Alert',
                    title: 'Initial Crisis Alert',
                    description: 'First emergency reports have reached the command centre.',
                    triggerEvents: [],
                    decisions: []
                }
            ],
            manualActions: [],
            variantAxes: [],
            aiConfig: {
                systemPrompt: 'Provide concise, operational intelligence briefings based on current metrics.',
                scoreLabels: { 1: 'Minimal', 2: 'Low', 3: 'Moderate', 4: 'High', 5: 'Critical' },
                roleContexts: {},
                scores: {}
            },
            _guideHtml: '',
            _meta: {
                isBuiltin: false,
                hasDraft: true,
                status: 'draft'
            }
        };
    }

    function slugifyId(text, fallbackPrefix = 'scenario') {
        const base = String(text || '').trim().toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
        return base || `${fallbackPrefix}_${Date.now().toString(36).slice(-4)}`;
    }

    function formatMetricDisplayTitle(key) {
        return String(key || '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
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
        if (key.includes('foreign') || key.includes('diplomat') || key.includes('ambassador') || key.includes('envoy')) {
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
        if (key.includes('cyber') || key.includes('grid') || key.includes('energy') || key.includes('power') || key.includes('utility')) {
            return 'You protect critical computer networks, utilities, and the power grid. You investigate cyber incidents or outages, isolate affected systems, and lead technical restoration.';
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
        if (key.includes('media') || key.includes('comms') || key.includes('communication') || key.includes('press') || key.includes('public info') || key.includes('pr')) {
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
    window.describeRolePlainly = describeRolePlainly;

    // AI Briefing Generator Helper (BR-20, BR-29)
    function buildLocalBriefingFallback({ fieldType, scenarioName, scenarioDescription, targetName, targetId, targetState }) {
        const sName = (scenarioName || 'Current Crisis Operation').trim();
        const sDesc = (scenarioDescription || 'an evolving multi-agency security and infrastructure emergency').trim();
        const tName = (targetName || targetId || 'Team Member').trim();

        switch (fieldType) {
            case 'scenario_description':
                return `${sName}: Coordinate inter-agency decisions as escalating disruptions test civil resilience, critical infrastructure, and strategic stability.`;
            case 'general_briefing':
                return `${sName}\n\n${sDesc.charAt(0).toUpperCase() + sDesc.slice(1).replace(/\.$/, '')}. Your team must assess incoming reports, coordinate across departments, and balance immediate emergency actions against wider risks.`;
            case 'role_briefing':
                return describeRolePlainly(targetName, targetId);
            case 'asset_briefing':
                return `${tName} (${targetState || 'operational'}): Key operational asset in the ${sName} theatre. Loss or disruption of this asset will reduce local response capacity.`;
            case 'event_description':
                return `${tName}: New reports indicate escalating activity affecting ${tName.toLowerCase()} during ${sName}. Review the available options and decide how to respond.`;
            case 'action_description':
                return `Deploy ${tName.toLowerCase()} resources to stabilize priority sectors and contain further escalation.`;
            case 'ai_system_prompt':
                return `You are the Crisis Intelligence Briefing System for "${sName}". Provide clear, concise situation updates based on current scenario metrics, asset states, and recent player decisions.`;
            default:
                return `Operational briefing note for ${tName} in ${sName}.`;
        }
    }

    async function requestEditorAiBriefing(options = {}) {
        const payload = {
            fieldType: options.fieldType || 'general_briefing',
            scenarioName: scenario?.name || '',
            scenarioDescription: scenario?.description || '',
            targetName: options.targetName || '',
            targetId: options.targetId || '',
            targetState: options.targetState || ''
        };
        try {
            const res = await apiFetch('/api/ai/generate-briefing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.text) {
                    showToast('AI briefing drafted', 'success');
                    return data.text;
                }
            }
        } catch {}
        const fallback = buildLocalBriefingFallback(payload);
        showToast('AI briefing drafted', 'success');
        return fallback;
    }
    window.requestEditorAiBriefing = requestEditorAiBriefing;

    // 1. Load Presets & Scenario
    async function bootstrap() {
        // Populate preset controls immediately from embedded DEFAULT_PRESETS so UI is never empty
        populatePresetControls();

        const user = await checkAuth('admin');
        if (!user) return;
        const userDisplay = document.getElementById('username-display');
        if (userDisplay) userDisplay.textContent = user.username;

        if (window.EditorImagePicker) {
            await window.EditorImagePicker.ensureLoaded();
        }

        try {
            const presetRes = await apiFetch('/api/editor/presets');
            if (presetRes.ok) {
                const loadedPresets = await presetRes.json();
                if (loadedPresets && Array.isArray(loadedPresets.maps) && loadedPresets.maps.length > 0) {
                    presets = loadedPresets;
                }
            }
            populatePresetControls();
        } catch (err) {
            console.warn('Using built-in editor presets fallback:', err);
            populatePresetControls();
        }

        const params = new URLSearchParams(window.location.search);
        const scenarioId = params.get('id');
        const wantNew = params.get('new') === 'true' || !scenarioId;

        if (!wantNew && scenarioId) {
            try {
                const res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenarioId)}?draft=true`);
                if (res.ok) {
                    scenario = await res.json();
                    scenario._idLocked = true;
                    hasPersistedToDb = true;
                    isNewScenario = false;

                    // BR-34: Ensure Facilitator Guide HTML is populated if missing from draft payload
                    if ((!scenario._guideHtml || !scenario._guideHtml.trim()) && (scenario.guideUrl || scenario.id)) {
                        try {
                            const guideUrl = scenario.guideUrl || `/scenarios/${encodeURIComponent(scenario.id)}/guide.html`;
                            const gRes = await fetch(guideUrl, { credentials: 'same-origin' });
                            if (gRes.ok) {
                                const gHtml = await gRes.text();
                                if (gHtml && gHtml.trim().length > 0 && !gHtml.includes('<title>Crisis Wargame - Admin')) {
                                    scenario._guideHtml = gHtml;
                                }
                            }
                        } catch {}
                    }
                }
            } catch (err) {
                showToast('Failed to load scenario: ' + err.message, 'error');
            }
        }

        if (!scenario) {
            scenario = createBlankScenario();
            isNewScenario = true;
            hasPersistedToDb = false;
        }

        initMaps();
        syncAllViewsFromScenario();

        if (window.EditorCanvas) {
            window.EditorCanvas.init(scenario, scheduleAutoSave);
        }
        if (window.EditorWizard) {
            window.EditorWizard.init(scenario, presets, () => {
                syncAllViewsFromScenario();
                if (window.EditorCanvas) window.EditorCanvas.render();
                scheduleAutoSave();
            });
            if (isNewScenario) {
                window.EditorWizard.open();
            }
        }
    }

    function populatePresetControls() {
        // Theatre preset dropdown (BR-17)
        const mapSel = document.getElementById('sel-map-preset');
        if (mapSel && Array.isArray(presets.maps)) {
            mapSel.innerHTML = '<option value="">-- Jump to Theatre --</option>' +
                presets.maps.map(m => `<option value="${escapeHtml(m.id)}">${escapeHtml(m.name)}</option>`).join('');
        }

        // Role bundle dropdown & common roles datalist
        const roleBundleSel = document.getElementById('sel-role-bundle');
        if (roleBundleSel && presets.roles?.bundles) {
            roleBundleSel.innerHTML = '<option value="">-- Choose Role Bundle --</option>' +
                presets.roles.bundles.map(b => `<option value="${escapeHtml(b.id)}">${escapeHtml(b.name)}</option>`).join('');
        }

        const roleDatalist = document.getElementById('common-roles-datalist');
        if (roleDatalist && presets.roles?.commonRoles) {
            roleDatalist.innerHTML = presets.roles.commonRoles.map(r => `<option value="${escapeHtml(r.name)}" data-id="${escapeHtml(r.id)}"></option>`).join('');
        }

        // Score presets dropdown
        const scoreSel = document.getElementById('sel-score-preset');
        if (scoreSel && Array.isArray(presets.scores)) {
            scoreSel.innerHTML = '<option value="">-- Choose Metric Preset --</option>' +
                presets.scores.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.name)}</option>`).join('');
        }

        // Pre-defined asset dropdown & Quick-add assets palette (BR-21)
        const preAssetSel = document.getElementById('sel-predefined-asset');
        if (preAssetSel && Array.isArray(presets.assets)) {
            const byCategory = {};
            presets.assets.forEach(a => {
                const cat = a.category || 'General';
                if (!byCategory[cat]) byCategory[cat] = [];
                byCategory[cat].push(a);
            });
            preAssetSel.innerHTML = '<option value="">-- Choose Pre-Defined Asset --</option>' +
                Object.entries(byCategory).map(([cat, items]) =>
                    `<optgroup label="${escapeHtml(cat)}">` +
                    items.map(item => `<option value="${escapeHtml(item.presetId)}">${escapeHtml(item.name)} (${escapeHtml(item.state || 'operational')})</option>`).join('') +
                    `</optgroup>`
                ).join('');
        }

        renderQuickAssetsPalette();
    }

    // 2. Interactive Leaflet Maps (BR-16: Use Esri World Dark Gray Base matching live game client.js)
    const ESRI_DARK_GRAY_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';

    function initMaps() {
        if (typeof L === 'undefined') return;
        const center = scenario.mapConfig?.center || [51.5074, -0.1278];
        const zoom = scenario.mapConfig?.zoom || 10;

        // Overview Map
        const ovEl = document.getElementById('overview-leaflet-map');
        if (ovEl && !overviewMap) {
            overviewMap = L.map(ovEl).setView(center, zoom);
            L.tileLayer(ESRI_DARK_GRAY_TILES, {
                attribution: 'Tiles &copy; Esri',
                maxZoom: 16
            }).addTo(overviewMap);

            centerMarker = L.marker(center, { draggable: true }).addTo(overviewMap);
            centerMarker.bindTooltip('Scenario Center', { permanent: false });

            centerMarker.on('dragend', () => {
                const pos = centerMarker.getLatLng();
                updateMapConfigCoords(pos.lat, pos.lng, overviewMap.getZoom());
            });

            overviewMap.on('click', (e) => {
                centerMarker.setLatLng(e.latlng);
                updateMapConfigCoords(e.latlng.lat, e.latlng.lng, overviewMap.getZoom());
            });
        }

        // Assets Map
        const asEl = document.getElementById('assets-leaflet-map');
        if (asEl && !assetsMap) {
            assetsMap = L.map(asEl).setView(center, zoom);
            L.tileLayer(ESRI_DARK_GRAY_TILES, {
                attribution: 'Tiles &copy; Esri',
                maxZoom: 16
            }).addTo(assetsMap);

            assetsMap.on('click', (e) => {
                if (selectedAssetIdx >= 0 && scenario.assets && scenario.assets[selectedAssetIdx]) {
                    scenario.assets[selectedAssetIdx].location = [
                        +e.latlng.lat.toFixed(4),
                        +e.latlng.lng.toFixed(4)
                    ];
                    renderAssetsTab();
                    scheduleAutoSave();
                }
            });
        }
    }

    function updateMapConfigCoords(lat, lng, zoom) {
        if (!scenario.mapConfig) scenario.mapConfig = { center: [51.5074, -0.1278], zoom: 10 };
        scenario.mapConfig.center = [+Number(lat).toFixed(4), +Number(lng).toFixed(4)];
        scenario.mapConfig.zoom = Number(zoom || 10);

        document.getElementById('inp-map-lat').value = scenario.mapConfig.center[0];
        document.getElementById('inp-map-lng').value = scenario.mapConfig.center[1];
        document.getElementById('inp-map-zoom').value = scenario.mapConfig.zoom;
        scheduleAutoSave();
    }

    // 3. Synchronize UI from Scenario Object
    function syncAllViewsFromScenario() {
        if (!scenario) return;

        // Header & Status
        document.getElementById('header-scenario-name').textContent = scenario.name || 'Untitled Scenario';
        document.getElementById('header-scenario-id').textContent = scenario.id || 'new';

        const statusPill = document.getElementById('header-status-pill');
        const discardBtn = document.getElementById('btn-discard-draft');
        const resetBuiltinBtn = document.getElementById('btn-reset-builtin');
        const meta = scenario._meta || { status: 'draft', hasDraft: true, isBuiltin: false };

        if (statusPill) {
            if (meta.status === 'draft') {
                statusPill.className = 'status-pill draft';
                statusPill.textContent = 'Unpublished Draft';
            } else if (meta.hasDraft) {
                statusPill.className = 'status-pill draft-pending';
                statusPill.textContent = 'Draft Changes Pending';
            } else {
                statusPill.className = 'status-pill published';
                statusPill.textContent = 'Published';
            }
        }

        if (discardBtn) {
            discardBtn.style.display = (meta.status === 'published' && meta.hasDraft) ? 'inline-flex' : 'none';
        }
        if (resetBuiltinBtn) {
            resetBuiltinBtn.style.display = meta.isBuiltin ? 'inline-flex' : 'none';
        }

        // Overview Fields
        document.getElementById('inp-scenario-name').value = scenario.name || '';
        document.getElementById('inp-scenario-id').value = scenario.id || '';
        document.getElementById('inp-scenario-desc').value = scenario.description || '';
        document.getElementById('inp-scenario-version').value = scenario.version || '1.0.0';
        document.getElementById('inp-min-users').value = scenario.minUsers !== undefined ? scenario.minUsers : 1;
        document.getElementById('inp-general-briefing').value = (scenario.briefings && scenario.briefings._general) || '';

        const center = scenario.mapConfig?.center || [51.5074, -0.1278];
        const zoom = scenario.mapConfig?.zoom || 10;
        document.getElementById('inp-map-lat').value = center[0];
        document.getElementById('inp-map-lng').value = center[1];
        document.getElementById('inp-map-zoom').value = zoom;

        if (overviewMap && centerMarker) {
            overviewMap.setView(center, zoom);
            centerMarker.setLatLng(center);
        }

        renderRolesTab();
        renderScoresTab();
        renderAssetsTab();
        renderAdvancedTab();
    }

    // 4. Tab 2: Roles & Briefings (BR-15: Role Reordering, BR-20: AI Briefing Button, BR-30: Top Presets + Bottom Blank Card)
    function renderRolesTab() {
        const roles = scenario.roles || [];
        const roleNames = scenario.roleNames || {};
        const briefings = scenario.briefings || {};
        const mandatory = scenario.mandatoryRoles || [];

        const countEl = document.getElementById('tab-count-roles');
        if (countEl) countEl.textContent = roles.length;

        const container = document.getElementById('roles-list-container');
        if (!container) return;

        let cardsHtml = roles.map((roleId, idx) => {
            const title = roleNames[roleId] || roleId;
            const brief = briefings[roleId] || '';
            const isMand = mandatory.includes(roleId);
            return `
                <div class="editor-item-card" data-role-id="${escapeHtml(roleId)}">
                    <div class="flex-between items-center mb-1">
                        <div class="inline-flex items-center gap-sm">
                            <div class="reorder-btn-group" role="group" aria-label="Reorder role ${escapeHtml(title)}">
                                <button type="button" class="btn btn-secondary text-xs btn-reorder btn-move-role-up" data-idx="${idx}" title="Move role up" aria-label="Move ${escapeHtml(title)} up" ${idx === 0 ? 'disabled' : ''}>${renderIcon('chevron-up', 13)}</button>
                                <button type="button" class="btn btn-secondary text-xs btn-reorder btn-move-role-down" data-idx="${idx}" title="Move role down" aria-label="Move ${escapeHtml(title)} down" ${idx === roles.length - 1 ? 'disabled' : ''}>${renderIcon('chevron-down', 13)}</button>
                            </div>
                            <strong>${escapeHtml(title)}</strong>
                        </div>
                        <div class="inline-flex items-center gap-sm">
                            <label class="inline-flex items-center gap-xs text-xs cursor-pointer">
                                <input type="checkbox" class="role-mandatory-cb" data-role="${escapeHtml(roleId)}" ${isMand ? 'checked' : ''}>
                                <span>Mandatory</span>
                            </label>
                            <button type="button" class="btn btn-danger text-xs btn-del-role" data-idx="${idx}" aria-label="Remove role ${escapeHtml(title)}">${renderIcon('trash', 12)}</button>
                        </div>
                    </div>
                    <div class="field-row" style="margin-bottom: 0.5rem;">
                        <div class="field-group" style="margin-bottom: 0;">
                            <label>Display Name</label>
                            <input type="text" class="form-control text-xs role-name-inp" data-role="${escapeHtml(roleId)}" value="${escapeHtml(title)}">
                        </div>
                    </div>
                    <div class="field-group" style="margin-bottom: 0;">
                        <div class="label-with-ai">
                            <label>Role Intelligence Briefing</label>
                            <button type="button" class="btn-ai-brief btn-ai-role-brief" data-role="${escapeHtml(roleId)}" title="Draft role briefing with AI">
                                ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                            </button>
                        </div>
                        <textarea class="form-control text-xs role-brief-inp" data-role="${escapeHtml(roleId)}" rows="2" placeholder="Role-specific instructions and goals...">${escapeHtml(brief)}</textarea>
                    </div>
                </div>
            `;
        }).join('');

        // Bottom Blank Card (BR-30)
        const blankCardHtml = `
            <div class="editor-item-card editor-blank-card" id="card-blank-role">
                <div class="flex-between items-center mb-1">
                    <span class="editor-blank-card-badge">+ Add New Role</span>
                    <span class="text-xs text-muted">Fill details below and click Add Role</span>
                </div>
                <div class="field-row" style="margin-bottom: 0.5rem;">
                    <div class="field-group" style="margin-bottom: 0;">
                        <label for="inp-new-role-name">Role Title</label>
                        <input type="text" id="inp-new-role-name" list="common-roles-datalist" class="form-control text-xs" placeholder="e.g. Chief Medical Officer or Police Chief">
                    </div>
                </div>
                <div class="field-group" style="margin-bottom: 0.5rem;">
                    <div class="label-with-ai">
                        <label for="inp-new-role-briefing">Role Briefing (Optional)</label>
                        <button type="button" id="btn-ai-new-role-briefing" class="btn-ai-brief" title="Draft role briefing with AI">
                            ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                        </button>
                    </div>
                    <textarea id="inp-new-role-briefing" class="form-control text-xs" rows="2" placeholder="Role-specific briefing instructions..."></textarea>
                </div>
                <div class="flex-end" style="justify-content: flex-end; display: flex;">
                    <button type="button" id="btn-add-role" class="btn btn-primary text-xs inline-flex items-center gap-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        <span>Add Role</span>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = cardsHtml + blankCardHtml;

        // Attach listeners for blank card
        const btnAddRole = container.querySelector('#btn-add-role');
        const inpNewRoleName = container.querySelector('#inp-new-role-name');
        const inpNewRoleBrief = container.querySelector('#inp-new-role-briefing');
        const btnAiNewBrief = container.querySelector('#btn-ai-new-role-briefing');

        if (btnAiNewBrief) {
            btnAiNewBrief.addEventListener('click', async () => {
                const name = inpNewRoleName?.value.trim() || 'Command Officer';
                const text = await requestEditorAiBriefing({
                    fieldType: 'role_briefing',
                    targetName: name,
                    targetId: slugifyId(name, 'role')
                });
                if (text && inpNewRoleBrief) inpNewRoleBrief.value = text;
            });
        }

        const handleAddRoleAction = () => {
            const rName = (inpNewRoleName?.value || '').trim();
            if (!rName) {
                showToast('Please enter a Role Title', 'warning');
                inpNewRoleName?.focus();
                return;
            }
            const rId = slugifyId(rName, 'role');
            if (!Array.isArray(scenario.roles)) scenario.roles = [];
            if (!scenario.roleNames) scenario.roleNames = {};
            if (!scenario.briefings) scenario.briefings = { _general: '' };

            if (!scenario.roles.includes(rId)) scenario.roles.push(rId);
            scenario.roleNames[rId] = rName;
            scenario.briefings[rId] = inpNewRoleBrief?.value.trim() || describeRolePlainly(rName, rId);

            renderRolesTab();
            scheduleAutoSave();
            showToast(`Added role: ${rName}`, 'success');
        };

        if (btnAddRole) btnAddRole.addEventListener('click', handleAddRoleAction);
        if (inpNewRoleName) {
            inpNewRoleName.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddRoleAction();
                }
            });
        }

        container.querySelectorAll('.btn-move-role-up').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.getAttribute('data-idx'));
                if (idx <= 0 || !Array.isArray(scenario.roles)) return;
                const tmp = scenario.roles[idx - 1];
                scenario.roles[idx - 1] = scenario.roles[idx];
                scenario.roles[idx] = tmp;
                renderRolesTab();
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.btn-move-role-down').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.getAttribute('data-idx'));
                if (!Array.isArray(scenario.roles) || idx >= scenario.roles.length - 1) return;
                const tmp = scenario.roles[idx + 1];
                scenario.roles[idx + 1] = scenario.roles[idx];
                scenario.roles[idx] = tmp;
                renderRolesTab();
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.btn-ai-role-brief').forEach(btn => {
            btn.addEventListener('click', async () => {
                const r = btn.getAttribute('data-role');
                const title = (scenario.roleNames && scenario.roleNames[r]) || r;
                const text = await requestEditorAiBriefing({
                    fieldType: 'role_briefing',
                    targetName: title,
                    targetId: r
                });
                if (text) {
                    if (!scenario.briefings) scenario.briefings = { _general: '' };
                    scenario.briefings[r] = text;
                    const ta = container.querySelector(`.role-brief-inp[data-role="${CSS.escape(r)}"]`);
                    if (ta) ta.value = text;
                    scheduleAutoSave();
                }
            });
        });

        container.querySelectorAll('.role-name-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                const r = inp.getAttribute('data-role');
                if (!scenario.roleNames) scenario.roleNames = {};
                scenario.roleNames[r] = inp.value;
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.role-brief-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                const r = inp.getAttribute('data-role');
                if (!scenario.briefings) scenario.briefings = { _general: '' };
                scenario.briefings[r] = inp.value;
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.role-mandatory-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const r = cb.getAttribute('data-role');
                if (!Array.isArray(scenario.mandatoryRoles)) scenario.mandatoryRoles = [];
                if (cb.checked && !scenario.mandatoryRoles.includes(r)) {
                    scenario.mandatoryRoles.push(r);
                } else if (!cb.checked) {
                    scenario.mandatoryRoles = scenario.mandatoryRoles.filter(x => x !== r);
                }
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.btn-del-role').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.getAttribute('data-idx'));
                const rId = scenario.roles[idx];
                scenario.roles.splice(idx, 1);
                if (scenario.roleNames) delete scenario.roleNames[rId];
                if (scenario.briefings) delete scenario.briefings[rId];
                if (Array.isArray(scenario.mandatoryRoles)) {
                    scenario.mandatoryRoles = scenario.mandatoryRoles.filter(x => x !== rId);
                }
                renderRolesTab();
                scheduleAutoSave();
            });
        });
    }

    // 5. Tab 3: Scores & Metrics (BR-18: Clear Unit Semantics, BR-19: Score Reordering, BR-30: Top Presets + Bottom Blank Card)
    function reorderScoreKey(idx, direction) {
        const scores = scenario.initialScores || {};
        const configs = scenario.scoreConfigs || {};
        const keys = Object.keys(scores);
        const targetIdx = idx + direction;
        if (targetIdx < 0 || targetIdx >= keys.length) return;

        const tmp = keys[targetIdx];
        keys[targetIdx] = keys[idx];
        keys[idx] = tmp;

        const nextScores = {};
        const nextConfigs = {};
        keys.forEach(k => {
            nextScores[k] = scores[k];
            if (configs[k]) nextConfigs[k] = configs[k];
        });
        scenario.initialScores = nextScores;
        scenario.scoreConfigs = nextConfigs;
        renderScoresTab();
        scheduleAutoSave();
    }

    function renderScoresTab() {
        const scores = scenario.initialScores || {};
        const configs = scenario.scoreConfigs || {};
        const keys = Object.keys(scores);

        const countEl = document.getElementById('tab-count-scores');
        if (countEl) countEl.textContent = keys.length;

        const container = document.getElementById('scores-list-container');
        if (!container) return;

        let cardsHtml = keys.map((key, idx) => {
            const val = scores[key];
            const cfg = configs[key] || { min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true };
            const displayUnit = cfg.unit === '/5' ? '' : (cfg.unit || '');
            const title = formatMetricDisplayTitle(key);
            return `
                <div class="editor-item-card" data-score-key="${escapeHtml(key)}">
                    <div class="flex-between items-center mb-1">
                        <div class="inline-flex items-center gap-sm">
                            <div class="reorder-btn-group" role="group" aria-label="Reorder metric ${escapeHtml(title)}">
                                <button type="button" class="btn btn-secondary text-xs btn-reorder btn-move-score-up" data-idx="${idx}" title="Move metric up" aria-label="Move ${escapeHtml(title)} up" ${idx === 0 ? 'disabled' : ''}>${renderIcon('chevron-up', 13)}</button>
                                <button type="button" class="btn btn-secondary text-xs btn-reorder btn-move-score-down" data-idx="${idx}" title="Move metric down" aria-label="Move ${escapeHtml(title)} down" ${idx === keys.length - 1 ? 'disabled' : ''}>${renderIcon('chevron-down', 13)}</button>
                            </div>
                            <strong>${escapeHtml(title)}</strong>
                        </div>
                        <button type="button" class="btn btn-danger text-xs btn-del-score" data-key="${escapeHtml(key)}" aria-label="Delete metric ${escapeHtml(title)}">${renderIcon('trash', 12)}</button>
                    </div>
                    <div class="field-row">
                        <div class="field-group" style="margin-bottom: 0;">
                            <label>Initial Value</label>
                            <input type="number" class="form-control text-xs score-init-inp" data-key="${escapeHtml(key)}" value="${val}">
                        </div>
                        <div class="field-group" style="margin-bottom: 0;">
                            <label>Min</label>
                            <input type="number" class="form-control text-xs score-min-inp" data-key="${escapeHtml(key)}" value="${cfg.min !== undefined ? cfg.min : 1}">
                        </div>
                        <div class="field-group" style="margin-bottom: 0;">
                            <label>Max</label>
                            <input type="number" class="form-control text-xs score-max-inp" data-key="${escapeHtml(key)}" value="${cfg.max !== undefined ? cfg.max : 5}">
                        </div>
                        <div class="field-group" style="margin-bottom: 0;">
                            <label title="Leave blank for standard 1–5 severity scales">Custom Unit (Optional)</label>
                            <input type="text" class="form-control text-xs score-unit-inp" data-key="${escapeHtml(key)}" value="${escapeHtml(displayUnit)}" placeholder="Blank = 1–5 scale">
                        </div>
                    </div>
                    <div class="flex-center gap-md" style="margin-top: 0.6rem; justify-content: flex-start;">
                        <label class="inline-flex items-center gap-xs text-xs cursor-pointer">
                            <input type="checkbox" class="score-vis-cb" data-key="${escapeHtml(key)}" ${cfg.visibleToPlayers !== false ? 'checked' : ''}>
                            <span>Visible to Players</span>
                        </label>
                        <label class="inline-flex items-center gap-xs text-xs cursor-pointer">
                            <input type="checkbox" class="score-ai-cb" data-key="${escapeHtml(key)}" ${cfg.promptAI !== false ? 'checked' : ''}>
                            <span>Include in AI Briefings</span>
                        </label>
                    </div>
                </div>
            `;
        }).join('');

        // Bottom Blank Metric Card (BR-30)
        const blankCardHtml = `
            <div class="editor-item-card editor-blank-card" id="card-blank-score">
                <div class="flex-between items-center mb-1">
                    <span class="editor-blank-card-badge">+ Add New Scoring Metric</span>
                    <span class="text-xs text-muted">Fill details below and click Add Metric</span>
                </div>
                <div class="field-row" style="margin-bottom: 0.5rem;">
                    <div class="field-group" style="margin-bottom: 0;">
                        <label for="inp-new-score-name">Metric Name</label>
                        <input type="text" id="inp-new-score-name" class="form-control text-xs" placeholder="e.g. Public Trust or Alliance Tension">
                    </div>
                    <div class="field-group" style="margin-bottom: 0;">
                        <label for="inp-new-score-val">Initial Value</label>
                        <input type="number" id="inp-new-score-val" class="form-control text-xs" value="2">
                    </div>
                    <div class="field-group" style="margin-bottom: 0;">
                        <label for="inp-new-score-min">Min</label>
                        <input type="number" id="inp-new-score-min" class="form-control text-xs" value="1">
                    </div>
                    <div class="field-group" style="margin-bottom: 0;">
                        <label for="inp-new-score-max">Max</label>
                        <input type="number" id="inp-new-score-max" class="form-control text-xs" value="5">
                    </div>
                    <div class="field-group" style="margin-bottom: 0;">
                        <label for="inp-new-score-unit">Unit (Optional)</label>
                        <input type="text" id="inp-new-score-unit" class="form-control text-xs" placeholder="e.g. % or blank">
                    </div>
                </div>
                <div class="flex-end" style="justify-content: flex-end; display: flex;">
                    <button type="button" id="btn-add-score" class="btn btn-primary text-xs inline-flex items-center gap-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        <span>Add Metric</span>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = cardsHtml + blankCardHtml;

        const btnAddScore = container.querySelector('#btn-add-score');
        const inpNewScoreName = container.querySelector('#inp-new-score-name');
        const inpNewScoreVal = container.querySelector('#inp-new-score-val');
        const inpNewScoreMin = container.querySelector('#inp-new-score-min');
        const inpNewScoreMax = container.querySelector('#inp-new-score-max');
        const inpNewScoreUnit = container.querySelector('#inp-new-score-unit');

        const handleAddScoreAction = () => {
            const name = (inpNewScoreName?.value || '').trim();
            if (!name) {
                showToast('Please enter a Metric Name (e.g. Public Trust)', 'warning');
                inpNewScoreName?.focus();
                return;
            }
            const key = slugifyId(name, 'metric');
            const val = Number(inpNewScoreVal?.value || 2);
            const min = Number(inpNewScoreMin?.value || 1);
            const max = Number(inpNewScoreMax?.value || 5);
            const unit = (inpNewScoreUnit?.value || '').trim();

            if (!scenario.initialScores) scenario.initialScores = {};
            if (!scenario.scoreConfigs) scenario.scoreConfigs = {};
            scenario.initialScores[key] = val;
            scenario.scoreConfigs[key] = { min, max, unit, visibleToPlayers: true, promptAI: true };

            renderScoresTab();
            scheduleAutoSave();
            showToast(`Added metric: ${formatMetricDisplayTitle(key)}`, 'success');
        };

        if (btnAddScore) btnAddScore.addEventListener('click', handleAddScoreAction);
        if (inpNewScoreName) {
            inpNewScoreName.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddScoreAction();
                }
            });
        }

        const ensureCfg = (k) => {
            if (!scenario.scoreConfigs) scenario.scoreConfigs = {};
            if (!scenario.scoreConfigs[k]) scenario.scoreConfigs[k] = { min: 1, max: 5, unit: '', visibleToPlayers: true, promptAI: true };
            return scenario.scoreConfigs[k];
        };

        container.querySelectorAll('.btn-move-score-up').forEach(btn => {
            btn.addEventListener('click', () => {
                reorderScoreKey(Number(btn.getAttribute('data-idx')), -1);
            });
        });

        container.querySelectorAll('.btn-move-score-down').forEach(btn => {
            btn.addEventListener('click', () => {
                reorderScoreKey(Number(btn.getAttribute('data-idx')), 1);
            });
        });

        container.querySelectorAll('.score-init-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                scenario.initialScores[inp.getAttribute('data-key')] = Number(inp.value || 0);
                scheduleAutoSave();
            });
        });
        container.querySelectorAll('.score-min-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                ensureCfg(inp.getAttribute('data-key')).min = Number(inp.value || 0);
                scheduleAutoSave();
            });
        });
        container.querySelectorAll('.score-max-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                ensureCfg(inp.getAttribute('data-key')).max = Number(inp.value || 5);
                scheduleAutoSave();
            });
        });
        container.querySelectorAll('.score-unit-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                ensureCfg(inp.getAttribute('data-key')).unit = inp.value;
                scheduleAutoSave();
            });
        });
        container.querySelectorAll('.score-vis-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                ensureCfg(cb.getAttribute('data-key')).visibleToPlayers = cb.checked;
                scheduleAutoSave();
            });
        });
        container.querySelectorAll('.score-ai-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                ensureCfg(cb.getAttribute('data-key')).promptAI = cb.checked;
                scheduleAutoSave();
            });
        });
        container.querySelectorAll('.btn-del-score').forEach(btn => {
            btn.addEventListener('click', () => {
                const k = btn.getAttribute('data-key');
                delete scenario.initialScores[k];
                if (scenario.scoreConfigs) delete scenario.scoreConfigs[k];
                renderScoresTab();
                scheduleAutoSave();
            });
        });
    }

    // 6. Tab 4: Map Assets & Pre-Defined Asset Library (BR-21, BR-31, BR-32, BR-33)
    let allAssetsCollapsed = false;

    function addAssetFromPreset(preset) {
        if (!preset || !scenario) return;
        if (!Array.isArray(scenario.assets)) scenario.assets = [];
        const mapCenter = assetsMap ? [assetsMap.getCenter().lat, assetsMap.getCenter().lng] : (scenario.mapConfig?.center || [51.5074, -0.1278]);
        const jitterLat = (Math.random() - 0.5) * 0.025;
        const jitterLng = (Math.random() - 0.5) * 0.025;

        const imgKey = preset.imageId || preset.image || '';
        const newAsset = {
            id: `${preset.presetId.toLowerCase()}_${scenario.assets.length + 1}`,
            name: preset.name,
            image: imgKey,
            imageId: imgKey,
            location: [+(mapCenter[0] + jitterLat).toFixed(4), +(mapCenter[1] + jitterLng).toFixed(4)],
            state: preset.state || 'operational',
            tags: [...(preset.tags || [])],
            briefing: preset.briefing || '',
            _expanded: true
        };

        scenario.assets.push(newAsset);
        selectedAssetIdx = scenario.assets.length - 1;
        renderAssetsTab();
        scheduleAutoSave();
        showToast(`Added "${preset.name}"`, 'success');

        // Close popover if open (BR-31)
        const popoverEl = document.getElementById('quick-assets-popover');
        if (popoverEl && typeof popoverEl.hidePopover === 'function') {
            try { popoverEl.hidePopover(); } catch {}
        }

        // Scroll to card (BR-33)
        setTimeout(() => {
            const listEl = document.getElementById('assets-list-container');
            const newCard = listEl?.querySelector(`.asset-card-collapsible[data-asset-idx="${selectedAssetIdx}"]`);
            if (newCard) {
                newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                newCard.classList.add('asset-card-scroll-highlight');
                setTimeout(() => newCard.classList.remove('asset-card-scroll-highlight'), 1200);
            }
        }, 50);
    }

    function renderQuickAssetsPalette() {
        const palette = document.getElementById('quick-assets-palette');
        if (!palette || !Array.isArray(presets.assets)) return;

        palette.innerHTML = presets.assets.map(p => {
            const rawUrl = p.imageUrl || (window.EditorImagePicker ? window.EditorImagePicker.resolveImageUrl(p.imageId || p.image) : '') || '/images/favicon.png';
            return `
            <button type="button" class="quick-asset-card" data-preset-id="${escapeHtml(p.presetId)}" title="Click to add ${escapeHtml(p.name)}">
                <img src="${escapeHtml(rawUrl)}" alt="" class="quick-asset-thumb" width="36" height="36" loading="lazy" onerror="this.onerror=null;this.src='/images/favicon.png';">
                <div class="quick-asset-meta">
                    <div class="quick-asset-name">${escapeHtml(p.name)}</div>
                    <div class="quick-asset-cat">${escapeHtml(p.category || 'Asset')}</div>
                </div>
            </button>
        `;
        }).join('');

        palette.querySelectorAll('.quick-asset-card').forEach(btn => {
            btn.addEventListener('click', () => {
                const pid = btn.getAttribute('data-preset-id');
                const preset = presets.assets.find(x => x.presetId === pid);
                addAssetFromPreset(preset);
            });
        });
    }

    function renderAssetsTab() {
        const assets = scenario.assets || [];
        const countEl = document.getElementById('tab-count-assets');
        if (countEl) countEl.textContent = assets.length;

        // Refresh Leaflet asset markers
        if (assetsMap) {
            assetMarkers.forEach(m => assetsMap.removeLayer(m));
            assetMarkers = [];

            assets.forEach((asset, idx) => {
                if (!Array.isArray(asset.location) || asset.location.length !== 2) return;
                const marker = L.marker(asset.location, { draggable: true }).addTo(assetsMap);
                marker.bindTooltip(`${asset.name || asset.id} (${asset.state || 'operational'})`);

                // BR-33: Clicking on map marker expands card and scrolls to it
                marker.on('click', () => {
                    selectedAssetIdx = idx;
                    asset._expanded = true;
                    renderAssetsTab();
                    setTimeout(() => {
                        const container = document.getElementById('assets-list-container');
                        const card = container?.querySelector(`.asset-card-collapsible[data-asset-idx="${idx}"]`);
                        if (card) {
                            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            card.classList.add('asset-card-scroll-highlight');
                            setTimeout(() => card.classList.remove('asset-card-scroll-highlight'), 1200);
                        }
                    }, 40);
                });

                marker.on('dragend', () => {
                    const pos = marker.getLatLng();
                    asset.location = [+pos.lat.toFixed(4), +pos.lng.toFixed(4)];
                    selectedAssetIdx = idx;
                    asset._expanded = true;
                    renderAssetsTab();
                    scheduleAutoSave();
                });

                assetMarkers.push(marker);
            });
        }

        const container = document.getElementById('assets-list-container');
        if (!container) return;

        if (assets.length === 0) {
            container.innerHTML = `<div class="text-muted text-sm" style="padding: 2rem; text-align: center;">No map assets placed yet. Click <strong>Quick-Add Preset Asset ▾</strong> above or add a blank asset to place one.</div>`;
            return;
        }

        // BR-32: Render collapsible asset cards using <details> & <summary>
        container.innerHTML = assets.map((asset, idx) => {
            const imgId = asset.imageId || asset.image || '';
            const imgUrl = window.EditorImagePicker ? window.EditorImagePicker.resolveImageUrl(imgId) : '/images/favicon.png';
            const loc = Array.isArray(asset.location) ? asset.location : [51.5, -0.1];
            const isSel = idx === selectedAssetIdx;
            const isOpen = (asset._expanded !== false && !allAssetsCollapsed) || isSel;

            return `
                <details class="asset-card-collapsible ${isSel ? 'selected' : ''}" data-asset-idx="${idx}" ${isOpen ? 'open' : ''}>
                    <summary class="asset-card-summary">
                        <div class="asset-card-summary-left">
                            <span class="collapsible-caret">${renderIcon('chevron-right', 13)}</span>
                            <img src="${escapeHtml(imgUrl)}" alt="" class="asset-card-summary-thumb" width="32" height="32" loading="lazy">
                            <div>
                                <div class="asset-card-summary-title">${escapeHtml(asset.name || 'Unnamed Asset')}</div>
                                <span class="asset-card-summary-coords">${loc[0].toFixed(2)}, ${loc[1].toFixed(2)} • ${escapeHtml(asset.state || 'operational')}</span>
                            </div>
                        </div>
                        <div class="inline-flex items-center gap-xs">
                            <button type="button" class="btn btn-danger text-xs btn-del-asset" data-idx="${idx}" aria-label="Delete asset ${escapeHtml(asset.name)}">${renderIcon('trash', 12)}</button>
                        </div>
                    </summary>
                    <div class="asset-card-body">
                        <div class="flex-between items-center mb-1">
                            <button type="button" class="image-slot-btn btn-pick-asset-img" data-idx="${idx}" title="Change Asset Image">
                                <img src="${escapeHtml(imgUrl)}" alt="" class="image-slot-thumb" width="38" height="38">
                                <span>Change Image</span>
                            </button>
                        </div>
                        <div class="field-row">
                            <div class="field-group" style="margin-bottom: 0.4rem;">
                                <label>Asset Name</label>
                                <input type="text" class="form-control text-xs asset-name-inp" data-idx="${idx}" value="${escapeHtml(asset.name || '')}">
                            </div>
                            <div class="field-group" style="margin-bottom: 0.4rem;">
                                <label>Initial State</label>
                                <select class="form-control text-xs asset-state-sel" data-idx="${idx}">
                                    ${['operational', 'damaged', 'deployed', 'destroyed', 'offline'].map(st => `<option value="${st}" ${(asset.state || 'operational') === st ? 'selected' : ''}>${st}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-group" style="margin-bottom: 0.4rem;">
                                <label>Latitude</label>
                                <input type="number" step="0.0001" class="form-control text-xs asset-lat-inp" data-idx="${idx}" value="${loc[0]}">
                            </div>
                            <div class="field-group" style="margin-bottom: 0.4rem;">
                                <label>Longitude</label>
                                <input type="number" step="0.0001" class="form-control text-xs asset-lng-inp" data-idx="${idx}" value="${loc[1]}">
                            </div>
                            <div class="field-group" style="margin-bottom: 0.4rem;">
                                <label>Tags (Comma-separated)</label>
                                <input type="text" class="form-control text-xs asset-tags-inp" data-idx="${idx}" value="${escapeHtml((asset.tags || []).join(', '))}">
                            </div>
                        </div>
                        <div class="field-group" style="margin-bottom: 0;">
                            <div class="label-with-ai">
                                <label>Asset Briefing</label>
                                <button type="button" class="btn-ai-brief btn-ai-asset-brief" data-idx="${idx}" title="Draft asset briefing with AI">
                                    ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                                </button>
                            </div>
                            <textarea rows="2" class="form-control text-xs asset-brief-inp" data-idx="${idx}" placeholder="Operational context and role of this asset...">${escapeHtml(asset.briefing || '')}</textarea>
                        </div>
                    </div>
                </details>
            `;
        }).join('');

        container.querySelectorAll('details.asset-card-collapsible').forEach(detailsEl => {
            const idx = Number(detailsEl.getAttribute('data-asset-idx'));
            detailsEl.addEventListener('toggle', () => {
                if (scenario.assets && scenario.assets[idx]) {
                    scenario.assets[idx]._expanded = detailsEl.open;
                }
            });

            const summaryEl = detailsEl.querySelector('.asset-card-summary');
            summaryEl?.addEventListener('click', (e) => {
                if (e.target.closest('button, input, select, textarea')) return;
                selectedAssetIdx = idx;
                container.querySelectorAll('details.asset-card-collapsible').forEach(c => c.classList.remove('selected'));
                detailsEl.classList.add('selected');
                const a = scenario.assets[idx];
                if (a && Array.isArray(a.location) && assetsMap) {
                    assetsMap.panTo(a.location);
                }
            });
        });

        container.querySelectorAll('.btn-ai-asset-brief').forEach(btn => {
            btn.addEventListener('click', async () => {
                const idx = Number(btn.getAttribute('data-idx'));
                const asset = scenario.assets[idx];
                if (!asset) return;
                const text = await requestEditorAiBriefing({
                    fieldType: 'asset_briefing',
                    targetName: asset.name,
                    targetId: asset.id,
                    targetState: asset.state
                });
                if (text) {
                    asset.briefing = text;
                    const ta = container.querySelector(`.asset-brief-inp[data-idx="${idx}"]`);
                    if (ta) ta.value = text;
                    scheduleAutoSave();
                }
            });
        });

        container.querySelectorAll('.btn-pick-asset-img').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.getAttribute('data-idx'));
                const asset = scenario.assets[idx];
                if (!asset || !window.EditorImagePicker) return;
                window.EditorImagePicker.open(asset.imageId || asset.image, (chosenId) => {
                    asset.image = chosenId;
                    asset.imageId = chosenId;
                    renderAssetsTab();
                    scheduleAutoSave();
                });
            });
        });

        container.querySelectorAll('.asset-name-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                const idx = Number(inp.getAttribute('data-idx'));
                scenario.assets[idx].name = inp.value;
                const titleEl = container.querySelector(`details[data-asset-idx="${idx}"] .asset-card-summary-title`);
                if (titleEl) titleEl.textContent = inp.value || 'Unnamed Asset';
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.asset-state-sel').forEach(sel => {
            sel.addEventListener('change', () => {
                const idx = Number(sel.getAttribute('data-idx'));
                scenario.assets[idx].state = sel.value;
                renderAssetsTab();
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.asset-lat-inp, .asset-lng-inp').forEach(inp => {
            inp.addEventListener('change', () => {
                const idx = Number(inp.getAttribute('data-idx'));
                const latEl = container.querySelector(`.asset-lat-inp[data-idx="${idx}"]`);
                const lngEl = container.querySelector(`.asset-lng-inp[data-idx="${idx}"]`);
                scenario.assets[idx].location = [Number(latEl.value || 0), Number(lngEl.value || 0)];
                renderAssetsTab();
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.asset-tags-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                const idx = Number(inp.getAttribute('data-idx'));
                scenario.assets[idx].tags = inp.value.split(',').map(s => s.trim()).filter(Boolean);
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.asset-brief-inp').forEach(inp => {
            inp.addEventListener('input', () => {
                const idx = Number(inp.getAttribute('data-idx'));
                scenario.assets[idx].briefing = inp.value;
                scheduleAutoSave();
            });
        });

        container.querySelectorAll('.btn-del-asset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = Number(btn.getAttribute('data-idx'));
                scenario.assets.splice(idx, 1);
                if (selectedAssetIdx >= scenario.assets.length) selectedAssetIdx = scenario.assets.length - 1;
                renderAssetsTab();
                scheduleAutoSave();
            });
        });
    }

    // 7. Tab 6: Manual Actions, Variant Axes, AI Config & Guide
    function renderAdvancedTab() {
        const aiPromptEl = document.getElementById('inp-ai-system-prompt');
        const guideEl = document.getElementById('inp-guide-html');
        if (aiPromptEl) aiPromptEl.value = scenario.aiConfig?.systemPrompt || '';
        if (guideEl) guideEl.value = scenario._guideHtml || '';

        // Manual Actions
        const actionsContainer = document.getElementById('manual-actions-container');
        if (actionsContainer) {
            const actions = scenario.manualActions || [];
            actionsContainer.innerHTML = actions.map((act, idx) => `
                <div class="editor-item-card">
                    <div class="flex-between items-center mb-1">
                        <code>${escapeHtml(act.id)}</code>
                        <button type="button" class="btn btn-danger text-xs btn-del-action" data-idx="${idx}">${renderIcon('trash', 12)}</button>
                    </div>
                    <div class="field-row">
                        <div class="field-group" style="margin-bottom: 0.4rem;">
                            <label>Action Name</label>
                            <input type="text" class="form-control text-xs act-name-inp" data-idx="${idx}" value="${escapeHtml(act.name || '')}">
                        </div>
                        <div class="field-group" style="margin-bottom: 0.4rem;">
                            <label>Initiator Roles (Comma-separated)</label>
                            <input type="text" class="form-control text-xs act-init-inp" data-idx="${idx}" value="${escapeHtml((act.initiator || []).join(', '))}">
                        </div>
                    </div>
                    <div class="field-group" style="margin-bottom: 0;">
                        <div class="label-with-ai">
                            <label>Description</label>
                            <button type="button" class="btn-ai-brief btn-ai-act-desc" data-idx="${idx}" title="Draft action description with AI">
                                ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                            </button>
                        </div>
                        <input type="text" class="form-control text-xs act-desc-inp" data-idx="${idx}" value="${escapeHtml(act.description || '')}">
                    </div>
                </div>
            `).join('') || '<div class="text-xs text-muted">No proactive manual actions configured.</div>';

            actionsContainer.querySelectorAll('.btn-ai-act-desc').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const idx = Number(btn.getAttribute('data-idx'));
                    const act = scenario.manualActions[idx];
                    if (!act) return;
                    const text = await requestEditorAiBriefing({
                        fieldType: 'action_description',
                        targetName: act.name,
                        targetId: act.id
                    });
                    if (text) {
                        act.description = text;
                        const inp = actionsContainer.querySelector(`.act-desc-inp[data-idx="${idx}"]`);
                        if (inp) inp.value = text;
                        scheduleAutoSave();
                    }
                });
            });

            actionsContainer.querySelectorAll('.act-name-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    scenario.manualActions[Number(inp.getAttribute('data-idx'))].name = inp.value;
                    scheduleAutoSave();
                });
            });
            actionsContainer.querySelectorAll('.act-init-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    scenario.manualActions[Number(inp.getAttribute('data-idx'))].initiator = inp.value.split(',').map(s => s.trim()).filter(Boolean);
                    scheduleAutoSave();
                });
            });
            actionsContainer.querySelectorAll('.act-desc-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    scenario.manualActions[Number(inp.getAttribute('data-idx'))].description = inp.value;
                    scheduleAutoSave();
                });
            });
            actionsContainer.querySelectorAll('.btn-del-action').forEach(btn => {
                btn.addEventListener('click', () => {
                    scenario.manualActions.splice(Number(btn.getAttribute('data-idx')), 1);
                    renderAdvancedTab();
                    scheduleAutoSave();
                });
            });
        }

        // Variant Axes (BR-37: Interactive Axis & Option Manager)
        const axesContainer = document.getElementById('variant-axes-container');
        if (axesContainer) {
            const axes = scenario.variantAxes || [];
            axesContainer.innerHTML = axes.map((ax, aIdx) => {
                const options = Array.isArray(ax.options) ? ax.options : [];
                return `
                <div class="editor-item-card" data-axis-idx="${aIdx}">
                    <div class="flex-between items-center mb-1">
                        <span class="inline-flex items-center gap-xs">
                            <span class="text-xs text-bold">Axis #${aIdx + 1}:</span>
                            <code>${escapeHtml(ax.id || 'axis_' + (aIdx + 1))}</code>
                        </span>
                        <button type="button" class="btn btn-danger text-xs btn-del-axis" data-aidx="${aIdx}" title="Delete Axis">${renderIcon('trash', 12)} <span>Delete Axis</span></button>
                    </div>

                    <div class="field-row">
                        <div class="field-group" style="margin-bottom: 0.5rem;">
                            <label>Axis Name *</label>
                            <input type="text" class="form-control text-xs axis-name-inp" data-aidx="${aIdx}" value="${escapeHtml(ax.name || '')}" placeholder="e.g. Initial Storm Intensity">
                        </div>
                        <div class="field-group" style="margin-bottom: 0.5rem;">
                            <label>Axis ID *</label>
                            <input type="text" class="form-control text-xs axis-id-inp" data-aidx="${aIdx}" value="${escapeHtml(ax.id || '')}" placeholder="e.g. storm_intensity">
                        </div>
                    </div>

                    <!-- Axis Options -->
                    <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.65rem; margin-top: 0.35rem;">
                        <div class="flex-between items-center mb-xs">
                            <label class="text-xs text-bold">Condition Options (${options.length})</label>
                            <button type="button" class="btn btn-secondary text-xs btn-add-axis-option" data-aidx="${aIdx}">+ Add Option</button>
                        </div>

                        <div class="editor-item-list" style="gap: 0.5rem;">
                            ${options.map((opt, oIdx) => {
                                const scoreSummary = opt.scoreModifiers ? Object.entries(opt.scoreModifiers).map(([k, v]) => `${k}:${v}`).join(', ') : '';
                                return `
                                    <div class="editor-item-card" style="padding: 0.55rem; background: var(--bg-primary);" data-axis-idx="${aIdx}" data-opt-idx="${oIdx}">
                                        <div class="field-row" style="margin-bottom: 0.35rem; align-items: flex-end;">
                                            <div class="field-group" style="margin-bottom: 0;">
                                                <label class="text-xs">Option Name *</label>
                                                <input type="text" class="form-control text-xs opt-name-inp" data-aidx="${aIdx}" data-oidx="${oIdx}" value="${escapeHtml(opt.name || '')}" placeholder="e.g. Severe Storm">
                                            </div>
                                            <div class="field-group" style="margin-bottom: 0;">
                                                <label class="text-xs">Option ID *</label>
                                                <input type="text" class="form-control text-xs opt-id-inp" data-aidx="${aIdx}" data-oidx="${oIdx}" value="${escapeHtml(opt.id || '')}" placeholder="e.g. severe">
                                            </div>
                                            <button type="button" class="btn btn-danger text-xs btn-del-opt" data-aidx="${aIdx}" data-oidx="${oIdx}" title="Remove Option" style="height: 32px; padding: 0 0.5rem;">${renderIcon('trash', 12)}</button>
                                        </div>

                                        <div class="field-group" style="margin-bottom: 0.35rem;">
                                            <label class="text-xs">Player Briefing Text</label>
                                            <textarea class="form-control text-xs opt-briefing-inp" data-aidx="${aIdx}" data-oidx="${oIdx}" rows="2" placeholder="Briefing notes shown to players when this variant condition is active...">${escapeHtml(opt.briefingText || '')}</textarea>
                                        </div>

                                        <div class="field-group" style="margin-bottom: 0;">
                                            <label class="text-xs">Score Modifiers (e.g. public_panic:1, emergency_capacity:-1)</label>
                                            <input type="text" class="form-control text-xs opt-scores-inp" data-aidx="${aIdx}" data-oidx="${oIdx}" value="${escapeHtml(scoreSummary)}" placeholder="metric:delta, metric2:delta">
                                        </div>
                                    </div>
                                `;
                            }).join('') || '<div class="text-xs text-muted">No options configured for this axis.</div>'}
                        </div>
                    </div>
                </div>
            `;
            }).join('') || '<div class="text-xs text-muted">No starting variant axes configured.</div>';

            axesContainer.querySelectorAll('.axis-name-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    const aIdx = Number(inp.getAttribute('data-aidx'));
                    const ax = scenario.variantAxes[aIdx];
                    if (!ax) return;
                    ax.name = inp.value;
                    scheduleAutoSave();
                });
            });

            axesContainer.querySelectorAll('.axis-id-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    const aIdx = Number(inp.getAttribute('data-aidx'));
                    const ax = scenario.variantAxes[aIdx];
                    if (!ax) return;
                    ax.id = slugifyId(inp.value, 'axis');
                    scheduleAutoSave();
                });
            });

            axesContainer.querySelectorAll('.btn-del-axis').forEach(btn => {
                btn.addEventListener('click', () => {
                    const aIdx = Number(btn.getAttribute('data-aidx'));
                    scenario.variantAxes.splice(aIdx, 1);
                    renderAdvancedTab();
                    scheduleAutoSave();
                    showToast('Variant axis removed', 'info');
                });
            });

            axesContainer.querySelectorAll('.btn-add-axis-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    const aIdx = Number(btn.getAttribute('data-aidx'));
                    const ax = scenario.variantAxes[aIdx];
                    if (!ax) return;
                    if (!Array.isArray(ax.options)) ax.options = [];
                    const oNum = ax.options.length + 1;
                    ax.options.push({
                        id: `opt_${oNum}`,
                        name: `Condition Option ${oNum}`,
                        briefingText: '',
                        scoreModifiers: {}
                    });
                    renderAdvancedTab();
                    scheduleAutoSave();
                });
            });

            axesContainer.querySelectorAll('.opt-name-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    const aIdx = Number(inp.getAttribute('data-aidx'));
                    const oIdx = Number(inp.getAttribute('data-oidx'));
                    const opt = scenario.variantAxes[aIdx]?.options?.[oIdx];
                    if (!opt) return;
                    opt.name = inp.value;
                    scheduleAutoSave();
                });
            });

            axesContainer.querySelectorAll('.opt-id-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    const aIdx = Number(inp.getAttribute('data-aidx'));
                    const oIdx = Number(inp.getAttribute('data-oidx'));
                    const opt = scenario.variantAxes[aIdx]?.options?.[oIdx];
                    if (!opt) return;
                    opt.id = slugifyId(inp.value, 'opt');
                    scheduleAutoSave();
                });
            });

            axesContainer.querySelectorAll('.opt-briefing-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    const aIdx = Number(inp.getAttribute('data-aidx'));
                    const oIdx = Number(inp.getAttribute('data-oidx'));
                    const opt = scenario.variantAxes[aIdx]?.options?.[oIdx];
                    if (!opt) return;
                    opt.briefingText = inp.value;
                    scheduleAutoSave();
                });
            });

            axesContainer.querySelectorAll('.opt-scores-inp').forEach(inp => {
                inp.addEventListener('input', () => {
                    const aIdx = Number(inp.getAttribute('data-aidx'));
                    const oIdx = Number(inp.getAttribute('data-oidx'));
                    const opt = scenario.variantAxes[aIdx]?.options?.[oIdx];
                    if (!opt) return;
                    const sc = {};
                    inp.value.split(',').forEach(part => {
                        const [k, v] = part.split(':').map(s => s.trim());
                        if (k && v !== undefined && !isNaN(Number(v))) {
                            sc[k] = Number(v);
                        }
                    });
                    opt.scoreModifiers = sc;
                    scheduleAutoSave();
                });
            });

            axesContainer.querySelectorAll('.btn-del-opt').forEach(btn => {
                btn.addEventListener('click', () => {
                    const aIdx = Number(btn.getAttribute('data-aidx'));
                    const oIdx = Number(btn.getAttribute('data-oidx'));
                    const ax = scenario.variantAxes[aIdx];
                    if (!ax || !ax.options) return;
                    ax.options.splice(oIdx, 1);
                    renderAdvancedTab();
                    scheduleAutoSave();
                });
            });
        }
    }

    // 8. Continuous Debounced Auto-Save (BR-22: Explicit Error Reason & Resilient Draft Upsert)
    function setAutoSaveIndicator(state, message, detailTitle = '') {
        const dot = document.getElementById('autosave-dot');
        const text = document.getElementById('autosave-text');
        const pill = document.getElementById('autosave-indicator');
        if (dot) {
            dot.className = 'autosave-dot' + (state === 'saving' ? ' saving' : (state === 'error' ? ' error' : ''));
        }
        if (text) text.textContent = message;
        if (pill) pill.title = detailTitle || message || '';
    }

    function scheduleAutoSave() {
        setAutoSaveIndicator('saving', 'Unsaved changes...');
        if (autoSaveTimer) clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            performAutoSave();
        }, 700);
    }

    async function extractResponseErrorReason(res) {
        if (!res) return 'No response from server';
        try {
            const rawText = await res.text();
            if (rawText) {
                try {
                    const parsed = JSON.parse(rawText);
                    if (parsed && parsed.error) return parsed.error;
                } catch {
                    if (res.status === 404 && rawText.includes('Cannot ')) {
                        return 'Editor API route not found (HTTP 404 — please restart server)';
                    }
                    const cleanSnippet = rawText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                    if (cleanSnippet) return `${cleanSnippet.slice(0, 80)} (HTTP ${res.status})`;
                }
            }
        } catch {}
        return `HTTP ${res.status} ${res.statusText || 'Error'}`.trim();
    }

    async function performAutoSave() {
        if (!scenario) return;
        if (!scenario.id || !String(scenario.id).trim()) {
            setAutoSaveIndicator('error', 'Auto-save paused: Scenario ID is required');
            return;
        }
        const payload = {
            ...scenario,
            name: (scenario.name && String(scenario.name).trim()) ? scenario.name.trim() : 'Untitled Crisis Scenario'
        };

        setAutoSaveIndicator('saving', 'Saving draft...');
        try {
            let res;
            if (!hasPersistedToDb) {
                res = await apiFetch('/api/scenarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.status === 409 || res.status === 400) {
                    res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenario.id)}/draft`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                }
                if (res.ok) {
                    hasPersistedToDb = true;
                    isNewScenario = false;
                    scenario._idLocked = true;
                    document.getElementById('inp-scenario-id')?.setAttribute('readonly', 'readonly');
                    window.history.replaceState({}, '', `/editor?id=${encodeURIComponent(scenario.id)}`);
                }
            } else {
                res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenario.id)}/draft`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            if (res && res.ok) {
                const saved = await res.json();
                scenario._meta = saved._meta || { status: 'draft', hasDraft: true };
                setAutoSaveIndicator('saved', 'All changes saved to draft');
                syncHeaderBadgesOnly();
            } else {
                const reason = await extractResponseErrorReason(res);
                setAutoSaveIndicator('error', `Auto-save error: ${reason}`, reason);
            }
        } catch (err) {
            const reason = err?.message || 'Network or server connection failed';
            setAutoSaveIndicator('error', `Auto-save error: ${reason}`, reason);
        }
    }

    function syncHeaderBadgesOnly() {
        document.getElementById('header-scenario-name').textContent = scenario.name || 'Untitled';
        document.getElementById('header-scenario-id').textContent = scenario.id || '';
        const statusPill = document.getElementById('header-status-pill');
        const discardBtn = document.getElementById('btn-discard-draft');
        const meta = scenario._meta || {};
        if (statusPill) {
            if (meta.status === 'draft') {
                statusPill.className = 'status-pill draft';
                statusPill.textContent = 'Unpublished Draft';
            } else if (meta.hasDraft) {
                statusPill.className = 'status-pill draft-pending';
                statusPill.textContent = 'Draft Changes Pending';
            } else {
                statusPill.className = 'status-pill published';
                statusPill.textContent = 'Published';
            }
        }
        if (discardBtn) {
            discardBtn.style.display = (meta.status === 'published' && meta.hasDraft) ? 'inline-flex' : 'none';
        }
    }

    // 9. Wire Up DOM Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        bootstrap();

        document.getElementById('btn-logout')?.addEventListener('click', () => logout());

        // Static AI Briefing Helper Buttons (BR-20)
        document.getElementById('btn-ai-scenario-desc')?.addEventListener('click', async () => {
            if (!scenario) return;
            const text = await requestEditorAiBriefing({
                fieldType: 'scenario_description',
                targetName: scenario.name
            });
            if (text) {
                scenario.description = text;
                const el = document.getElementById('inp-scenario-desc');
                if (el) el.value = text;
                scheduleAutoSave();
            }
        });

        document.getElementById('btn-ai-general-briefing')?.addEventListener('click', async () => {
            if (!scenario) return;
            const text = await requestEditorAiBriefing({
                fieldType: 'general_briefing',
                targetName: scenario.name
            });
            if (text) {
                if (!scenario.briefings) scenario.briefings = {};
                scenario.briefings._general = text;
                const el = document.getElementById('inp-general-briefing');
                if (el) el.value = text;
                scheduleAutoSave();
            }
        });

        document.getElementById('btn-ai-new-role-briefing')?.addEventListener('click', async () => {
            const roleName = document.getElementById('inp-new-role-name')?.value.trim() || 'Command Officer';
            const roleId = document.getElementById('inp-new-role-id')?.value.trim() || 'role';
            const text = await requestEditorAiBriefing({
                fieldType: 'role_briefing',
                targetName: roleName,
                targetId: roleId
            });
            if (text) {
                const el = document.getElementById('inp-new-role-briefing');
                if (el) el.value = text;
            }
        });

        document.getElementById('btn-ai-system-prompt')?.addEventListener('click', async () => {
            if (!scenario) return;
            const text = await requestEditorAiBriefing({
                fieldType: 'ai_system_prompt',
                targetName: scenario.name
            });
            if (text) {
                if (!scenario.aiConfig) {
                    scenario.aiConfig = {
                        systemPrompt: '',
                        scoreLabels: { 1: 'Minimal', 2: 'Low', 3: 'Moderate', 4: 'High', 5: 'Critical' },
                        roleContexts: {},
                        scores: {}
                    };
                }
                scenario.aiConfig.systemPrompt = text;
                const el = document.getElementById('inp-ai-system-prompt');
                if (el) el.value = text;
                scheduleAutoSave();
            }
        });

        // Pre-Defined Asset Dropdown Add Button (BR-21)
        document.getElementById('btn-add-predefined-asset')?.addEventListener('click', () => {
            const sel = document.getElementById('sel-predefined-asset');
            const pid = sel?.value;
            if (!pid) {
                showToast('Please select a pre-defined asset from the dropdown first', 'info');
                return;
            }
            const preset = (presets.assets || []).find(x => x.presetId === pid);
            if (preset) {
                addAssetFromPreset(preset);
            }
        });

        // Tab Switching
        const tabBtns = document.querySelectorAll('.editor-tab-btn');
        const tabPanels = ['overview', 'roles', 'scores', 'assets', 'events', 'advanced'];
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.toggle('active', b === btn));
                tabPanels.forEach(p => {
                    const el = document.getElementById(`panel-${p}`);
                    if (el) el.style.display = (p === target) ? (p === 'events' ? 'flex' : 'block') : 'none';
                });
                if (target === 'overview' && overviewMap) {
                    setTimeout(() => overviewMap.invalidateSize(), 60);
                }
                if (target === 'assets' && assetsMap) {
                    setTimeout(() => {
                        assetsMap.invalidateSize();
                        if (scenario?.mapConfig?.center) {
                            assetsMap.setView(scenario.mapConfig.center, scenario.mapConfig.zoom || 10);
                        }
                    }, 60);
                }
                if (target === 'events' && window.EditorCanvas) {
                    window.EditorCanvas.render();
                }
            });
        });

        // Overview bindings
        document.getElementById('inp-scenario-name')?.addEventListener('input', (e) => {
            if (!scenario) return;
            scenario.name = e.target.value;
            if (isNewScenario && !hasPersistedToDb) {
                const slug = slugifyId(e.target.value, 'scenario');
                if (slug) {
                    scenario.id = slug;
                    const idInput = document.getElementById('inp-scenario-id');
                    if (idInput) idInput.value = slug;
                }
            }
            syncHeaderBadgesOnly();
            scheduleAutoSave();
        });

        document.getElementById('inp-scenario-id')?.addEventListener('input', (e) => {
            if (!scenario || hasPersistedToDb) return;
            scenario.id = slugifyId(e.target.value, 'scenario');
            syncHeaderBadgesOnly();
            scheduleAutoSave();
        });

        document.getElementById('inp-scenario-desc')?.addEventListener('input', (e) => {
            if (!scenario) return;
            scenario.description = e.target.value;
            scheduleAutoSave();
        });

        document.getElementById('inp-scenario-version')?.addEventListener('input', (e) => {
            if (!scenario) return;
            scenario.version = e.target.value.trim();
            scheduleAutoSave();
        });

        document.getElementById('inp-min-users')?.addEventListener('input', (e) => {
            if (!scenario) return;
            scenario.minUsers = Math.max(1, Number(e.target.value || 1));
            scheduleAutoSave();
        });

        document.getElementById('inp-general-briefing')?.addEventListener('input', (e) => {
            if (!scenario) return;
            if (!scenario.briefings) scenario.briefings = {};
            scenario.briefings._general = e.target.value;
            scheduleAutoSave();
        });

        document.getElementById('btn-toggle-all-assets')?.addEventListener('click', () => {
            allAssetsCollapsed = !allAssetsCollapsed;
            const btn = document.getElementById('btn-toggle-all-assets');
            if (btn) btn.textContent = allAssetsCollapsed ? 'Expand All' : 'Collapse All';
            if (scenario.assets) {
                scenario.assets.forEach(a => { a._expanded = !allAssetsCollapsed; });
            }
            renderAssetsTab();
        });

        document.getElementById('sel-map-preset')?.addEventListener('change', (e) => {
            const mp = (presets.maps || []).find(m => m.id === e.target.value);
            if (!mp || !scenario) return;
            updateMapConfigCoords(mp.center[0], mp.center[1], mp.zoom);
            if (overviewMap && centerMarker) {
                overviewMap.setView(mp.center, mp.zoom);
                centerMarker.setLatLng(mp.center);
            }
        });

        document.getElementById('btn-use-map-bounds')?.addEventListener('click', () => {
            if (!overviewMap || !centerMarker) return;
            const c = overviewMap.getCenter();
            centerMarker.setLatLng(c);
            updateMapConfigCoords(c.lat, c.lng, overviewMap.getZoom());
            showToast('Captured current map center & zoom', 'success');
        });

        ['inp-map-lat', 'inp-map-lng', 'inp-map-zoom'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                const lat = Number(document.getElementById('inp-map-lat').value || 51.5074);
                const lng = Number(document.getElementById('inp-map-lng').value || -0.1278);
                const zoom = Number(document.getElementById('inp-map-zoom').value || 10);
                updateMapConfigCoords(lat, lng, zoom);
                if (overviewMap && centerMarker) {
                    overviewMap.setView([lat, lng], zoom);
                    centerMarker.setLatLng([lat, lng]);
                }
            });
        });

        // Roles tab actions
        document.getElementById('inp-new-role-name')?.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            const idInput = document.getElementById('inp-new-role-id');
            if (!idInput) return;
            const match = (presets.roles?.commonRoles || []).find(r => r.name.toLowerCase() === val.toLowerCase());
            if (match) {
                idInput.value = match.id;
            } else {
                idInput.value = val.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
            }
        });

        document.getElementById('btn-add-role')?.addEventListener('click', () => {
            const nameEl = document.getElementById('inp-new-role-name');
            const idEl = document.getElementById('inp-new-role-id');
            const briefEl = document.getElementById('inp-new-role-briefing');
            const rName = (nameEl?.value || '').trim();
            const rId = (idEl?.value || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
            if (!rName || !rId) {
                showToast('Please provide a Role Title and ID', 'warning');
                return;
            }
            if (!Array.isArray(scenario.roles)) scenario.roles = [];
            if (!scenario.roleNames) scenario.roleNames = {};
            if (!scenario.briefings) scenario.briefings = { _general: '' };

            if (!scenario.roles.includes(rId)) scenario.roles.push(rId);
            scenario.roleNames[rId] = rName;
            if (briefEl?.value.trim()) scenario.briefings[rId] = briefEl.value.trim();

            nameEl.value = '';
            idEl.value = '';
            if (briefEl) briefEl.value = '';
            renderRolesTab();
            scheduleAutoSave();
            showToast(`Added role: ${rName}`, 'success');
        });

        document.getElementById('btn-apply-role-bundle')?.addEventListener('click', () => {
            const bundleId = document.getElementById('sel-role-bundle')?.value;
            const bundle = (presets.roles?.bundles || []).find(b => b.id === bundleId);
            if (!bundle) return;
            if (!Array.isArray(scenario.roles)) scenario.roles = [];
            if (!scenario.roleNames) scenario.roleNames = {};
            if (!scenario.briefings) scenario.briefings = { _general: '' };

            bundle.roles.forEach(r => {
                if (!scenario.roles.includes(r.id)) scenario.roles.push(r.id);
                scenario.roleNames[r.id] = r.name;
                if (r.briefing) scenario.briefings[r.id] = r.briefing;
            });
            renderRolesTab();
            scheduleAutoSave();
            showToast(`Applied ${bundle.name}`, 'success');
        });

        document.getElementById('btn-suggest-roles-ai')?.addEventListener('click', async () => {
            const box = document.getElementById('ai-role-suggestions-box');
            if (!box || !scenario) return;
            box.innerHTML = `<div class="text-xs text-muted">Analyzing scenario context...</div>`;
            try {
                const res = await apiFetch('/api/ai/suggest-roles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: scenario.name,
                        description: scenario.description,
                        existingRoles: scenario.roles || []
                    })
                });
                const data = await res.json();
                const suggestions = data.suggestions || [];
                if (suggestions.length === 0) {
                    box.innerHTML = `<div class="text-xs text-muted">All recommended roles are already included.</div>`;
                    return;
                }
                box.innerHTML = suggestions.map((s, idx) => `
                    <div class="editor-item-card" style="padding: 0.65rem;">
                        <div class="flex-between items-center mb-1">
                            <strong class="text-xs">${escapeHtml(s.name)}</strong>
                            <button type="button" class="btn btn-primary text-xs btn-accept-ai-role" data-idx="${idx}">+ Add</button>
                        </div>
                        <p class="text-xs text-muted" style="margin: 0;">${escapeHtml(s.reason)}</p>
                    </div>
                `).join('');

                box.querySelectorAll('.btn-accept-ai-role').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const s = suggestions[Number(btn.getAttribute('data-idx'))];
                        if (!s) return;
                        if (!Array.isArray(scenario.roles)) scenario.roles = [];
                        if (!scenario.roleNames) scenario.roleNames = {};
                        if (!scenario.briefings) scenario.briefings = { _general: '' };
                        if (!scenario.roles.includes(s.id)) scenario.roles.push(s.id);
                        scenario.roleNames[s.id] = s.name;
                        scenario.briefings[s.id] = s.briefing;
                        btn.disabled = true;
                        btn.textContent = 'Added';
                        renderRolesTab();
                        scheduleAutoSave();
                    });
                });
            } catch (err) {
                box.innerHTML = `<div class="text-xs" style="color: var(--accent-red);">Failed to fetch suggestions.</div>`;
            }
        });

        // Scores tab actions
        document.getElementById('btn-apply-score-preset')?.addEventListener('click', () => {
            const pid = document.getElementById('sel-score-preset')?.value;
            const preset = (presets.scores || []).find(s => s.id === pid);
            if (!preset) return;
            scenario.initialScores = {};
            scenario.scoreConfigs = {};
            for (const [k, cfg] of Object.entries(preset.scores)) {
                scenario.initialScores[k] = cfg.initial;
                scenario.scoreConfigs[k] = {
                    min: cfg.min,
                    max: cfg.max,
                    unit: cfg.unit,
                    visibleToPlayers: cfg.visibleToPlayers,
                    promptAI: cfg.promptAI
                };
            }
            renderScoresTab();
            scheduleAutoSave();
            showToast(`Applied ${preset.name} metrics`, 'success');
        });

        document.getElementById('btn-add-score')?.addEventListener('click', () => {
            const keyEl = document.getElementById('inp-new-score-key');
            const key = (keyEl?.value || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
            if (!key) {
                showToast('Please enter a metric key (e.g. public_panic)', 'warning');
                return;
            }
            const val = Number(document.getElementById('inp-new-score-val')?.value || 2);
            const min = Number(document.getElementById('inp-new-score-min')?.value || 1);
            const max = Number(document.getElementById('inp-new-score-max')?.value || 5);
            const unit = (document.getElementById('inp-new-score-unit')?.value || '').trim();

            if (!scenario.initialScores) scenario.initialScores = {};
            if (!scenario.scoreConfigs) scenario.scoreConfigs = {};
            scenario.initialScores[key] = val;
            scenario.scoreConfigs[key] = { min, max, unit, visibleToPlayers: true, promptAI: true };
            keyEl.value = '';
            renderScoresTab();
            scheduleAutoSave();
        });

        // Custom blank asset button
        document.getElementById('btn-add-custom-asset')?.addEventListener('click', () => {
            if (!Array.isArray(scenario.assets)) scenario.assets = [];
            const center = scenario.mapConfig?.center || [51.5074, -0.1278];
            scenario.assets.push({
                id: `asset_${scenario.assets.length + 1}`,
                name: 'New Tactical Asset',
                image: 'evt_water_plant',
                imageId: 'evt_water_plant',
                location: [...center],
                state: 'operational',
                tags: ['infrastructure'],
                briefing: 'Strategic operational asset.'
            });
            selectedAssetIdx = scenario.assets.length - 1;
            renderAssetsTab();
            scheduleAutoSave();
        });

        // Advanced Tab Actions
        document.getElementById('btn-add-manual-action')?.addEventListener('click', () => {
            if (!Array.isArray(scenario.manualActions)) scenario.manualActions = [];
            const n = scenario.manualActions.length + 1;
            scenario.manualActions.push({
                id: `action_${n}`,
                name: `Proactive Action ${n}`,
                description: 'Trigger an operational response.',
                initiator: scenario.roles && scenario.roles[0] ? [scenario.roles[0]] : ['pm'],
                effects: { scores: {} }
            });
            renderAdvancedTab();
            scheduleAutoSave();
        });

        document.getElementById('btn-add-variant-axis')?.addEventListener('click', () => {
            if (!Array.isArray(scenario.variantAxes)) scenario.variantAxes = [];
            const n = scenario.variantAxes.length + 1;
            scenario.variantAxes.push({
                id: `axis_${n}`,
                name: `Condition Axis ${n}`,
                options: [
                    { id: 'standard', name: 'Standard Conditions', briefingText: 'Normal operating baseline.' },
                    { id: 'severe', name: 'Severe Conditions', briefingText: 'Elevated threat environment.' }
                ]
            });
            renderAdvancedTab();
            scheduleAutoSave();
        });

        document.getElementById('inp-ai-system-prompt')?.addEventListener('input', (e) => {
            if (!scenario.aiConfig) {
                scenario.aiConfig = {
                    systemPrompt: '',
                    scoreLabels: { 1: 'Low', 3: 'Medium', 5: 'High' },
                    roleContexts: {},
                    scores: {}
                };
            }
            scenario.aiConfig.systemPrompt = e.target.value;
            scheduleAutoSave();
        });

        document.getElementById('inp-guide-html')?.addEventListener('input', (e) => {
            scenario._guideHtml = e.target.value;
            scheduleAutoSave();
        });

        // Top Lifecycle Buttons: Test, Publish, Discard Draft, Reset Builtin, Clone, Export
        document.getElementById('btn-test-scenario')?.addEventListener('click', async () => {
            await performAutoSave();
            try {
                const res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenario.id)}/test-session`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scenario)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to launch test session');
                showToast(`Launched Test Game ${data.gameId}`, 'success');
                window.open(data.redirectUrl, '_blank', 'noopener');
            } catch (err) {
                showToast(err.message, 'error');
            }
        });

        document.getElementById('btn-publish-scenario')?.addEventListener('click', async () => {
            await performAutoSave();
            try {
                const res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenario.id)}/publish`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scenario)
                });
                const data = await res.json();
                if (!res.ok) {
                    const errList = document.getElementById('validation-errors-list');
                    const errDialog = document.getElementById('validation-errors-dialog');
                    if (errList && errDialog) {
                        const errs = data.validationErrors || [data.error || 'Validation failed'];
                        errList.innerHTML = errs.map(e => `<li>${escapeHtml(e)}</li>`).join('');
                        errDialog.showModal();
                    } else {
                        showToast(data.error || 'Validation failed', 'error');
                    }
                    return;
                }
                scenario._meta = data._meta || { status: 'published', hasDraft: false, isBuiltin: scenario._meta?.isBuiltin };
                syncHeaderBadgesOnly();
                showToast('Scenario validated and published live!', 'success');
            } catch (err) {
                showToast('Publish failed: ' + err.message, 'error');
            }
        });

        document.getElementById('btn-close-validation')?.addEventListener('click', () => {
            const d = document.getElementById('validation-errors-dialog');
            if (d && d.open) d.close();
        });

        document.getElementById('btn-discard-draft')?.addEventListener('click', async () => {
            if (!confirm('Discard uncommitted draft changes and revert to the currently published version?')) return;
            try {
                const res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenario.id)}/discard-draft`, { method: 'POST' });
                if (!res.ok) throw new Error('Failed to discard draft');
                scenario = await res.json();
                syncAllViewsFromScenario();
                if (window.EditorCanvas) window.EditorCanvas.init(scenario, scheduleAutoSave);
                showToast('Reverted to published version', 'info');
            } catch (err) {
                showToast(err.message, 'error');
            }
        });

        document.getElementById('btn-reset-builtin')?.addEventListener('click', async () => {
            if (!confirm('Reset this built-in scenario to its original factory defaults on disk?')) return;
            try {
                const res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenario.id)}/reset-builtin`, { method: 'POST' });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Factory reset failed');
                scenario = data;
                syncAllViewsFromScenario();
                if (window.EditorCanvas) window.EditorCanvas.init(scenario, scheduleAutoSave);
                showToast('Restored scenario to factory default', 'success');
            } catch (err) {
                showToast(err.message, 'error');
            }
        });

        // Clone Modal (BR-28: auto-derive clone id)
        const cloneDialog = document.getElementById('clone-scenario-dialog');
        document.getElementById('btn-clone-scenario')?.addEventListener('click', () => {
            if (!scenario || !cloneDialog) return;
            const cloneName = `${scenario.name} (Copy)`;
            document.getElementById('inp-clone-name').value = cloneName;
            document.getElementById('inp-clone-id').value = slugifyId(cloneName, 'scenario');
            cloneDialog.showModal();
        });
        document.getElementById('inp-clone-name')?.addEventListener('input', (e) => {
            const idEl = document.getElementById('inp-clone-id');
            if (idEl) idEl.value = slugifyId(e.target.value, 'scenario');
        });
        document.getElementById('btn-cancel-clone')?.addEventListener('click', () => {
            if (cloneDialog && cloneDialog.open) cloneDialog.close();
        });
        document.getElementById('btn-confirm-clone')?.addEventListener('click', async () => {
            const newName = document.getElementById('inp-clone-name')?.value.trim();
            const newId = slugifyId(document.getElementById('inp-clone-id')?.value || newName, 'scenario');
            if (!newName || !newId) return;
            try {
                await performAutoSave();
                const res = await apiFetch(`/api/scenarios/${encodeURIComponent(scenario.id)}/clone`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newId, newName })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Clone failed');
                if (cloneDialog && cloneDialog.open) cloneDialog.close();
                window.location.href = `/editor?id=${encodeURIComponent(data.id)}`;
            } catch (err) {
                showToast(err.message, 'error');
            }
        });

        // Export ZIP
        document.getElementById('btn-export-scenario')?.addEventListener('click', async () => {
            await performAutoSave();
            window.location.href = `/api/scenarios/${encodeURIComponent(scenario.id)}/export`;
        });
    });
})();
