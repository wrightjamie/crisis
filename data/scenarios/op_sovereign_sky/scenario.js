module.exports = {
    id: 'op_sovereign_sky',
    name: 'Op Sovereign Sky: Air Power Doctrine',
    description: 'Command the UK Joint Force Air Component (JFAC) through a comprehensive expeditionary crisis, applying RAFAC Senior and Master Air Cadet Air Power doctrine across all domains.',
    guideUrl: '/scenarios/op_sovereign_sky/guide.html',
    mapConfig: { center: [35.0, 33.5], zoom: 6 },
    roles: ['jfac', 'control', 'strike', 'isr', 'mobility', 'joint', 'display'],
    roleNames: {
        'jfac': 'JFAC Commander (11 Group)',
        'control': 'Control of the Air Cell',
        'strike': 'Air Attack & Strike Cell',
        'isr': 'ISR & Cyber Cell (No 1 ISR Wing)',
        'mobility': 'Air Mobility & Logistics Cell',
        'joint': 'Joint Action & Multi-Domain Cell',
        'display': 'Operations Room Display'
    },
    minUsers: 2,
    mandatoryRoles: ['jfac'],
    roleFallbacks: {
        control: ['strike', 'jfac'],
        strike: ['control', 'jfac'],
        isr: ['joint', 'jfac'],
        mobility: ['joint', 'jfac'],
        joint: ['isr', 'mobility', 'jfac']
    },
    initialScores: {
        air_control: 2,
        situational_awareness: 2,
        sustainability: 3,
        joint_effect: 3,
        force_protection: 3,
        coalition_support: 3
    },
    scoreConfigs: {
        air_control: { min: 1, max: 5, visibleToPlayers: true, promptAI: true },
        situational_awareness: { min: 1, max: 5, visibleToPlayers: true, promptAI: true },
        sustainability: { min: 1, max: 5, visibleToPlayers: true, promptAI: true },
        joint_effect: { min: 1, max: 5, visibleToPlayers: true, promptAI: true },
        force_protection: { min: 1, max: 5, visibleToPlayers: true, promptAI: true },
        coalition_support: { min: 1, max: 5, visibleToPlayers: true, promptAI: true }
    },
    briefings: {
        _general: 'Welcome to the UK Joint Force Air Component (UK JFAC) HQ within 11 Group. A rogue state actor ("Crimson State") and allied non-state paramilitary militias have seized coastal territory in the Eastern Mediterranean and erected an Anti-Access/Area Denial (A2AD) bubble. Your mission is to project Air Power to Protect UK interests, Project global influence, and Promote regional stability using a Full Spectrum Approach.',
        jfac: 'As JFAC Commander, you oversee operational-level Command and Control (C2). Balance the strategic, operational, and tactical levels of warfare, and remember a core tenet of doctrine: aircraft cannot occupy land, and independent air operations lack the potency of Joint Operations.',
        control: 'You lead the Control of the Air Cell. Without Control of the Air, neither air nor surface forces can enjoy freedom of manoeuvre. You must progress from a Favourable Air Situation to Air Superiority, and ultimately Air Supremacy, using Offensive and Defensive Counter-Air (OCA/DCA).',
        strike: 'You lead the Air Attack Cell. You employ kinetic and non-kinetic capabilities to Deter, Disrupt, and Destroy adversary forces across four categories: Strategic Attack, Counter-Land (CAS, AI, SCAR), Counter-Sea (ASW, ASuW), and Information Activities (EW, PsyOps).',
        isr: 'You lead the ISR & Cyber Cell. You manage SIGINT, GEOINT, MASINT, HUMINT, OSINT, TECHINT, and FININT through the 9-step ISR cycle, using Network Enabled Capability (NEC) like Link-16 to deliver the right information to the right place at the right time.',
        mobility: 'You lead the Air Mobility Cell. You manage the 6 divisions of Air Mobility: Hub & Spoke, Airborne Ops (Air-Drop/Air-Land), Air-to-Air Refuelling (AAR), Aeromedical Evacuation (Forward/Tactical/Strategic), Special Forces Air Ops, and Personnel Recovery—overcoming Air Power\'s limitations of impermanence and limited payload.',
        joint: 'You lead the Joint Action & Multi-Domain Cell. You coordinate Air-Land Integration (ALI), Air-Maritime Integration (AMI), Air-Space Integration, and the Full Spectrum Approach (Military, Diplomatic, Economic).'
    },
    aiConfig: {
        systemPrompt: `You are an automated RAF Joint Force Air Component (JFAC) operational summary system.
CRITICAL RULES:
- Describe the objective operational situation using official RAF Air Power doctrine terminology (e.g., Control of the Air, ISR, Air Mobility, Air Attack, Enablers, Joint Action).
- NEVER refer to the player, "you", "your", or their role name.
- Write exactly ONE short paragraph (1-2 sentences). Do NOT output bullet points.
- Start directly with the operational impact. Do not use greetings.
- Do not use markdown formatting.
- Stick to the provided facts.
- Use clear, professional military language suitable for Senior/Master Air Cadets (ages 14-18).`,
        scoreLabels: {
            1: "Critical / Denied",
            2: "Contested / Degraded",
            3: "Favourable / Adequate",
            4: "Superior / Strong",
            5: "Supremacy / Optimal"
        },
        roleContexts: {
            jfac: "Focus area: operational command and control, strategic objectives, and overall campaign coherence.",
            control: "Focus area: degrees of control of the air, offensive counter-air (OCA), and defensive counter-air (DCA).",
            strike: "Focus area: strategic attack, counter-land (CAS, AI, SCAR), counter-sea, and information activities.",
            isr: "Focus area: intelligence gathering (SIGINT, GEOINT, MASINT, OSINT, FININT), Network Enabled Capability (NEC), and cyber integration.",
            mobility: "Focus area: hub and spoke logistics, air-to-air refuelling, airborne operations, medevac, and personnel recovery.",
            joint: "Focus area: joint action, air-land/maritime/space integration, and the full spectrum approach."
        },
        scores: {
            air_control: { label: "Control of the Air", subject: "the degree of control of the air", isPlural: false, roles: ["jfac", "control", "strike"] },
            situational_awareness: { label: "ISR & NEC", subject: "battlespace intelligence and network enabled capability", isPlural: false, roles: ["isr", "jfac", "strike"] },
            sustainability: { label: "Sustain & Mobility", subject: "logistical sustainability and air mobility capacity", isPlural: false, roles: ["mobility", "jfac"] },
            joint_effect: { label: "Joint Action", subject: "cross-domain joint integration", isPlural: false, roles: ["joint", "strike", "jfac"] },
            force_protection: { label: "Base & Protect", subject: "force protection of airbases and assets", isPlural: false, roles: ["control", "mobility", "jfac"] },
            coalition_support: { label: "Coalition & Diplomacy", subject: "coalition capability and full-spectrum diplomatic support", isPlural: false, roles: ["joint", "jfac"] }
        }
    },
    variantAxes: [
        {
            id: 'basing_posture',
            name: 'Basing & Carrier Posture (Task 10, 12 & 13)',
            options: [
                {
                    id: 'carrier_deployed',
                    name: 'CSG On-Station (Carrier Enabled Power Projection)',
                    briefingText: 'HMS Queen Elizabeth is on station in the Eastern Med with embarked F-35B Lightnings, reducing reliance on Air-to-Air Refuelling.',
                    roleBriefings: {
                        control: 'Having the Carrier Strike Group in theatre reduces transit times and increases time-on-station for F-35Bs, though total payload and airframes are limited to what the carrier can hold.',
                        mobility: 'Carrier basing reduces immediate tanker demand, allowing Voyager assets to focus on the strategic airbridge.'
                    },
                    scoreModifiers: { air_control: +1, sustainability: -1 },
                    assetModifiers: [
                        { id: 'a_qec', name: 'HMS Queen Elizabeth & F-35B Wing', location: [34.0, 31.5], state: 'operational', tags: ['maritime', 'air', 'strike'], image: '/images/assets/qe_class_carrier.png', briefing: 'Fifth-generation STOVL stealth multi-role fighters operating from the Queen Elizabeth-class carrier.' }
                    ]
                },
                {
                    id: 'akrotiri_only',
                    name: 'Overland Hub & Spoke Only (No Carrier)',
                    briefingText: 'HMS Queen Elizabeth is in Rosyth. All Air Power must be projected from RAF Akrotiri (Spoke) and UK Main Operating Bases (Hubs), requiring heavy AAR support.',
                    roleBriefings: {
                        mobility: 'Without a carrier in theatre, our fighters rely entirely on RAF Akrotiri and Voyager Air-to-Air Refuelling to achieve Reach and Endurance.',
                        control: 'Consolidating all aircraft at RAF Akrotiri increases our vulnerability to asymmetric or missile attacks on the airfield.'
                    },
                    scoreModifiers: { sustainability: +1, force_protection: -1 },
                    assetModifiers: [
                        { id: 'a_qec', name: 'HMS Queen Elizabeth', location: [56.02, -3.44], state: 'maintenance', tags: ['maritime'], image: '/images/assets/qe_class_carrier.png', briefing: 'Undergoing refit in Rosyth; unavailable for Carrier Enabled Power Projection.' }
                    ]
                }
            ]
        },
        {
            id: 'conflict_type',
            name: 'Adversary Profile (Task 1 & 7: Types of Conflict)',
            options: [
                {
                    id: 'symmetrical_state',
                    name: 'State Actor (Symmetrical Limited Conflict)',
                    briefingText: 'The adversary is a well-equipped State Actor operating integrated Surface-to-Air Missiles (A2AD) and 4th-gen fighters.',
                    roleBriefings: {
                        control: 'Expect heavy contested airspace. Achieving Air Superiority will require coordinated Offensive Counter-Air (OCA).',
                        isr: 'High electronic warfare threat. Prioritize SIGINT and MASINT to map enemy radar emitters.'
                    },
                    scoreModifiers: { air_control: -1, coalition_support: +1 }
                },
                {
                    id: 'asymmetrical_insurgency',
                    name: 'Non-State Actor (Asymmetrical Insurgency)',
                    briefingText: 'The adversary consists of non-state paramilitary insurgents using mobile MANPADS, drones, and civilian human shields.',
                    roleBriefings: {
                        isr: 'Targets are fleeting and blended with civilians. High-persistence surveillance (Reaper/Protector and Shadow R1) and HUMINT are vital.',
                        control: 'We start with a Favourable Air Situation at high altitude, but low-level aircraft face severe asymmetric vulnerability near airfields.'
                    },
                    scoreModifiers: { situational_awareness: -1, force_protection: -1 }
                }
            ]
        }
    ],
    assets: [
        { id: 'a_brize', name: 'RAF Brize Norton (UK Hub)', location: [51.75, -1.58], state: 'operational', tags: ['hub', 'mobility'], briefing: 'Primary UK Main Operating Base (Hub) for Strategic Transport (C-17 Globemaster), Tactical Transport (A400M Atlas), and Tankers (Voyager).' },
        { id: 'a_waddington', name: 'RAF Waddington (ISR Hub)', location: [53.16, -0.52], state: 'operational', tags: ['hub', 'isr'], briefing: 'Home of No 1 ISR Wing: RC-135W Rivet Joint (SIGINT), Shadow R1, and remotely piloted Reaper/Protector RPAS.' },
        { id: 'a_akrotiri', name: 'RAF Akrotiri (Forward Spoke)', location: [34.58, 32.98], state: 'operational', tags: ['spoke', 'airfield'], briefing: 'Forward Mounting Base (Spoke) in Cyprus. Enables Agility and Reach into theatre, protected by the RAF Regiment.' },
        { id: 'a_typhoon', name: 'Typhoon FGR4 Detachment', location: [34.59, 32.99], state: 'operational', tags: ['air', 'combat'], image: '/images/assets/typhoon_aircraft.png', briefing: 'Fourth-generation multi-role combat aircraft detached from RAF Coningsby/Lossiemouth for QRA, DCA, and multi-role strike.' },
        { id: 'a_f35', name: 'F-35B Lightning Detachment', location: [34.57, 32.97], state: 'operational', tags: ['air', 'combat', 'stealth'], image: '/images/assets/f35_aircraft.png', briefing: 'Fifth-generation STOVL multi-role stealth aircraft from RAF Marham, capable of penetrating dense A2AD environments.' },
        { id: 'a_voyager', name: 'Voyager KC2/KC3 Tanker', location: [34.60, 33.01], state: 'operational', tags: ['air', 'mobility', 'aar'], image: '/images/assets/voyager_refueler.png', briefing: 'Air-to-Air Refuelling and strategic transport aircraft, vital for overcoming Air Power\'s limitation of impermanence.' },
        { id: 'a_poseidon', name: 'P-8A Poseidon MRA1', location: [35.20, 32.50], state: 'operational', tags: ['air', 'isr', 'maritime'], briefing: 'Multi-role maritime patrol aircraft from RAF Lossiemouth, equipped with acoustic sensors and high-resolution radar for ASW and ASuW.' },
        { id: 'a_rivetjoint', name: 'RC-135W Rivet Joint', location: [35.50, 34.00], state: 'operational', tags: ['air', 'isr'], briefing: 'Dedicated electronic surveillance aircraft surveying the electromagnetic spectrum for SIGINT and MASINT.' },
        { id: 'a_chinook', name: 'Chinook & Puma JHC Detachment', location: [34.65, 33.10], state: 'operational', tags: ['air', 'mobility', 'rotary'], image: '/images/assets/raf_chinook.jpg', briefing: 'Joint Helicopter Command support helicopters for intra-theatre tactical mobility, CASEVAC, and Combat Recovery.' },
        { id: 'a_type45', name: 'HMS Duncan (Type 45) & Wildcat', location: [34.20, 33.80], state: 'operational', tags: ['maritime', 'air'], image: '/images/assets/type_45_destroyer.png', briefing: 'Royal Navy Air Defence Destroyer with embarked Wildcat helicopter for Air-Maritime Integration (AMI) and Counter-Sea ops.' }
    ],
    stages: [
        { id: 'stage_1', name: 'Stage 1: ISR, Enablers & Deployment (LO1 & LO2)' },
        { id: 'stage_2', name: 'Stage 2: Control of the Air - DCA & OCA (LO2 P5)' },
        { id: 'stage_3', name: 'Stage 3: Air Attack Across Domains (LO2 P8)' },
        { id: 'stage_4', name: 'Stage 4: Air Mobility & Sustainment (LO2 P6)' },
        { id: 'stage_5', name: 'Stage 5: Multi-Domain & Strategic Endgame (LO3)' }
    ],
    eventTemplates: [
        // =========================================================================
        // STAGE 1: ISR, ENABLERS & DEPLOYMENT (5 Linear Events)
        // =========================================================================
        {
            id: 'ev_1_levels_of_war',
            stage: 'stage_1',
            name: '1.1 National Security & Preventative Diplomacy',
            repeatable: false,
            location: [35.10, 33.90],
            image: '/images/events/ev_crisis_cabinet.png',
            description: 'Tensions are escalating rapidly in the Eastern Mediterranean. Before kinetic hostilities break out, the UK Government directs UK JFAC to demonstrate resolve in line with the National Security Strategy (Protect, Project, Promote).',
            facilitatorNotes: 'Covers LO1 P2 (Task 5, 6, 8, 9): National Security Strategy (Protect, Project, Promote), Levels of Warfare (Strategic, Operational, Tactical), and Preventative/Defence Diplomacy vs Deterrence.',
            roleDescriptions: {
                jfac: 'Distinguish the Levels of Warfare: The UK Government sets Strategic aims; JFAC plans how forces in theatre are employed at the Operational level; squadrons fly the specific Tactical sorties.',
                joint: 'Conflict Prevention and Defence Diplomacy use defence resources to establish peace and prevent escalation, whereas Deterrence uses a credible threat of force to prevent an adversary attack.',
                control: 'A visible posture by RAF Typhoon FGR4 aircraft can project power rapidly and decisively.'
            },
            decisions: [
                {
                    role: 'jfac',
                    text: 'Translate the Government\'s Strategic aim into an Operational-level directive for theatre forces:',
                    options: [
                        {
                            id: 'opt_1_op_plan',
                            text: 'Issue a joint Operational campaign plan aligning theatre air assets to Strategic goals, leaving specific flight profiles to Tactical commanders',
                            effects: {
                                scores: { joint_effect: +1, coalition_support: +1 },
                                unlockEvents: ['ev_2_osint_finint']
                            }
                        },
                        {
                            id: 'opt_1_micromanage',
                            text: 'Bypass Operational planning and have Whitehall politicians micro-manage individual Tactical cockpit headings',
                            effects: {
                                scores: { joint_effect: -1, air_control: -1 },
                                unlockEvents: ['ev_2_osint_finint']
                            }
                        }
                    ]
                },
                {
                    role: 'joint',
                    text: 'How should we employ Air Power for Preventative Diplomacy and Deterrence before war begins?',
                    options: [
                        {
                            id: 'opt_1_deter',
                            text: 'Conduct joint coalition flypasts and visible Deterrence patrols with regional allies (Project & Promote)',
                            effects: { scores: { coalition_support: +1, air_control: +1 } }
                        },
                        {
                            id: 'opt_1_preempt',
                            text: 'Launch unannounced kinetic bombing raids prior to diplomatic engagement',
                            effects: { scores: { coalition_support: -2, situational_awareness: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_2_osint_finint',
            stage: 'stage_1',
            name: '1.2 Hybrid Threats: OSINT, FININT & HUMINT',
            prerequisites: ['ev_1_levels_of_war'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.40, 35.90],
            image: '/images/events/ev_disinfo_campaign.png',
            description: 'While state forces mass on the border, non-state paramilitary insurgents are smuggling advanced anti-aircraft weapons into coastal towns. Social media videos show covered trucks arriving at a commercial port.',
            facilitatorNotes: 'Covers LO1 P1 (State vs Non-State Actors) and LO2 P7 (Task 25: OSINT, FININT, HUMINT, TECHINT).',
            roleDescriptions: {
                isr: 'Review Task 25 intelligence types: OSINT (open-source internet/media), FININT (monetary transactions), HUMINT (human sources), and TECHINT (analysis of enemy weapons/equipment).',
                joint: 'We are facing both State Actors (government military) and Non-State Actors (paramilitary/insurgent groups not representing a government).'
            },
            decisions: [
                {
                    role: 'isr',
                    text: 'Which intelligence gathering methods will you combine to track the covert weapons smuggling network?',
                    options: [
                        {
                            id: 'opt_2_osint_finint',
                            text: 'Fuse OSINT (social media geolocation), FININT (tracking illicit bank transfers), and HUMINT (local informants)',
                            effects: {
                                scores: { situational_awareness: +2 },
                                unlockEvents: ['ev_3_basing_dilemma']
                            }
                        },
                        {
                            id: 'opt_2_radar_only',
                            text: 'Rely solely on high-altitude air-to-air radar to read bank accounts and shipping manifests',
                            effects: {
                                scores: { situational_awareness: -1 },
                                unlockEvents: ['ev_3_basing_dilemma']
                            }
                        }
                    ]
                },
                {
                    role: 'joint',
                    text: 'How do we counter the financial supply line of the Non-State Actor insurgents?',
                    options: [
                        {
                            id: 'opt_2_econ',
                            text: 'Share FININT with allied Economic agencies to freeze insurgent funds (Full Spectrum Approach)',
                            effects: { scores: { coalition_support: +1, joint_effect: +1 } }
                        },
                        {
                            id: 'opt_2_ignore_nonstate',
                            text: 'Ignore Non-State Actors completely and focus only on uniformed State forces',
                            effects: { scores: { force_protection: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_3_basing_dilemma',
            stage: 'stage_1',
            name: '1.3 Projecting Air Power: Basing & Fragility Dilemma',
            prerequisites: ['ev_2_osint_finint'],
            requiresUnlock: true,
            repeatable: false,
            location: [34.58, 32.98],
            image: '/images/assets/nato_air_base.png',
            description: 'Hostilities have commenced. An allied nation offers us use of an austere forward airfield ("Forward Strip Alpha") just 40 miles from the enemy border. Alternatively, we can operate from our established overseas base at RAF Akrotiri, 150 miles away across the sea.',
            facilitatorNotes: 'Covers LO1 P3 (Task 10, 12, 13): Basing considerations, Fragility/Vulnerability of aircraft on the ground vs Reach and Sustainability.',
            roleDescriptions: {
                control: 'Review Task 13: Operating from a distant overseas base (Akrotiri) reduces vulnerability to enemy ground attack and increases flexibility, but increases the required Reach and transit time.',
                mobility: 'Operating from the close forward strip cuts flight time, but the runway lacks hardened protection and increases logistics exposure.'
            },
            decisions: [
                {
                    role: 'control',
                    text: 'Where should we base our high-value Typhoon FGR4 and ISTAR aircraft?',
                    options: [
                        {
                            id: 'opt_3_akrotiri',
                            text: 'Base at RAF Akrotiri (Reduces vulnerability to ground attack, accepting longer Reach requirement)',
                            effects: {
                                scores: { force_protection: +2, sustainability: -1 },
                                unlockEvents: ['ev_4_hub_and_spoke']
                            }
                        },
                        {
                            id: 'opt_3_forward_strip',
                            text: 'Pack all aircraft onto the unhardened strip 40 miles from enemy artillery (High vulnerability)',
                            effects: {
                                scores: { force_protection: -2, air_control: +1 },
                                unlockEvents: ['ev_4_hub_and_spoke']
                            }
                        }
                    ]
                },
                {
                    role: 'mobility',
                    text: 'How do we mitigate the disadvantage of RAF Akrotiri being further from the combat theatre?',
                    options: [
                        {
                            id: 'opt_3_aar_plan',
                            text: 'Pre-position Voyager tankers and use Forward Arming and Refuelling Points (FARPs) for helicopters',
                            effects: { scores: { sustainability: +1, air_control: +1 } }
                        },
                        {
                            id: 'opt_3_underfuel',
                            text: 'Launch aircraft with half fuel loads to save weight and hope for the best',
                            effects: { scores: { sustainability: -2 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_4_hub_and_spoke',
            stage: 'stage_1',
            name: '1.4 Enabling Air Power: Hub & Spoke Airbridge',
            prerequisites: ['ev_3_basing_dilemma'],
            requiresUnlock: true,
            repeatable: false,
            location: [51.75, -1.58],
            image: '/images/events/ev_us_support_success.jpg',
            description: 'To sustain operations at RAF Akrotiri (our theatre Spoke), thousands of tonnes of munitions, spares, comms gear, and force protection troops must be transported from our UK Main Operating Base (Hub) at RAF Brize Norton.',
            facilitatorNotes: 'Covers LO1 P1 (Task 2: 4 Enablers - Base, Sustain, Connect, Protect) and LO2 P6 (Task 17, 22, 23: Hub & Spoke, Inter-theatre vs Intra-theatre mobility).',
            roleDescriptions: {
                mobility: 'Hub and Spoke operations link UK Hubs (Brize Norton) to forward Spokes (Akrotiri). Moving between theatres is Inter-Theatre mobility (C-17 Globemaster / A400M Atlas); moving within theatre is Intra-Theatre mobility (Chinook / Puma / Hercules).',
                joint: 'Ensure all four Air Power Enablers are established at the Spoke: Base, Sustain, Connect (RAF Signals), and Protect (RAF Regiment).'
            },
            decisions: [
                {
                    role: 'mobility',
                    text: 'Task the appropriate Air Mobility fleet for the Inter-Theatre Airbridge (UK Hub to Cyprus Spoke):',
                    options: [
                        {
                            id: 'opt_4_c17_atlas',
                            text: 'Task C-17 Globemaster (4500nm Strategic Lift) & A400M Atlas (4100nm) for Inter-Theatre Air-Land',
                            effects: {
                                scores: { sustainability: +2 },
                                unlockEvents: ['ev_5_isr_collection']
                            }
                        },
                        {
                            id: 'opt_4_rotary_uk',
                            text: 'Task Puma HC2 and A109SP helicopters to fly cargo all the way from London to Cyprus',
                            effects: {
                                scores: { sustainability: -2 },
                                unlockEvents: ['ev_5_isr_collection']
                            }
                        }
                    ]
                },
                {
                    role: 'joint',
                    text: 'Which enabling units get priority seating on the first C-17 chalks to secure the Spoke?',
                    options: [
                        {
                            id: 'opt_4_connect_protect',
                            text: 'RAF Regiment (Protect) & 90 Signals Unit (Connect) alongside Air Logistics (Sustain)',
                            effects: { scores: { force_protection: +1, situational_awareness: +1 } }
                        },
                        {
                            id: 'opt_4_no_enablers',
                            text: 'Cancel Signals and RAF Regiment deployments to make room for non-essential office furniture',
                            effects: { scores: { force_protection: -2, situational_awareness: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_5_isr_collection',
            stage: 'stage_1',
            name: '1.5 The 9-Step ISR Cycle & Network Enabled Capability',
            prerequisites: ['ev_4_hub_and_spoke'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.30, 35.80],
            image: '/scenarios/eastern_front_breach/images/drone_squad.jpg',
            description: 'Enemy mobile Surface-to-Air Missile (SAM) batteries have gone active, establishing an A2AD bubble. JFAC has issued Step 1 of the ISR Process (Request for Information). No 1 ISR Wing must now Plan, Task, Collect, Analyse, and Disseminate.',
            facilitatorNotes: 'Covers LO2 P7 (Task 16, 24, 25, 26, 27, 29): Surveillance vs Reconnaissance, 9-Step ISR Process, SIGINT/MASINT/GEOINT, and Network Enabled Capability (NEC / Link-16).',
            roleDescriptions: {
                isr: 'Surveillance is continuous, systematic observation of a wide area; Reconnaissance is specific observation of a specific area/target. Use Rivet Joint (SIGINT/MASINT), Reaper (Persistent MALE ISTAR), and Shadow R1 (Electro-optical/comprehensive ground intel).',
                jfac: 'Network Enabled Capability (NEC) joins sensors, decision-makers, and effectors together via data links (Link-16) to get the right information to the right place at the right time.'
            },
            decisions: [
                {
                    role: 'isr',
                    text: 'Execute Steps 2–5 of the ISR Process (Plan, Task, Collect, Analyse) to map the enemy SAM network:',
                    options: [
                        {
                            id: 'opt_5_isr_wing',
                            text: 'Task RC-135W Rivet Joint (SIGINT/MASINT) for wide-area Surveillance + Reaper & Shadow R1 for targeted GEOINT Reconnaissance',
                            effects: {
                                scores: { situational_awareness: +2, air_control: +1 },
                                unlockEvents: ['ev_6_dca_akrotiri']
                            }
                        },
                        {
                            id: 'opt_5_unplanned',
                            text: 'Skip the Planning and Analysis steps; send unequipped transport aircraft to look out the window',
                            effects: {
                                scores: { situational_awareness: -2, force_protection: -1 },
                                unlockEvents: ['ev_6_dca_akrotiri']
                            }
                        }
                    ]
                },
                {
                    role: 'jfac',
                    text: 'Execute Steps 6–8 (Disseminate, Evaluate, Apply) using Network Enabled Capability (NEC):',
                    options: [
                        {
                            id: 'opt_5_nec',
                            text: 'Transmit threat coordinates in real-time via Link-16 NEC joining sensors, decision-makers, and strike effectors',
                            effects: { scores: { joint_effect: +1, situational_awareness: +1 } }
                        },
                        {
                            id: 'opt_5_postal',
                            text: 'Print the imagery onto paper maps and mail them via surface ship',
                            effects: { scores: { joint_effect: -2 } }
                        }
                    ]
                }
            ]
        },

        // =========================================================================
        // STAGE 2: CONTROL OF THE AIR - DCA & OCA (5 Linear Events)
        // =========================================================================
        {
            id: 'ev_6_dca_akrotiri',
            stage: 'stage_2',
            name: '2.1 Defensive Counter-Air: Active & Passive Measures',
            requiresUnlock: true,
            repeatable: false,
            location: [34.58, 32.98],
            image: '/images/events/ev_akrotiri_strike.jpg',
            description: 'RAID INBOUND: The adversary has launched a wave of strike aircraft and cruise missiles toward RAF Akrotiri and HMS Duncan, aiming to destroy our aircraft on the ground before we can gain Control of the Air.',
            facilitatorNotes: 'Covers LO2 P5 (Task 21): Defensive Counter-Air (Active Measures: Detection, Interception, Engagement vs Passive Measures: Hardening, Dispersal, Camouflage, Concealment, Deception).',
            roleDescriptions: {
                control: 'Active DCA involves Detection, Interception, and Engagement using air-to-air fighters (Typhoon QRA) and surface-to-air missiles (Type 45 Sea Viper / Sky Sabre).',
                mobility: 'Passive DCA reduces vulnerability on the ground through Hardening (shelters), Dispersal across the airfield, Camouflage, Concealment, and Deception (decoys).'
            },
            decisions: [
                {
                    role: 'control',
                    text: 'Deploy Active Defensive Counter-Air (DCA) measures to defeat the incoming raid:',
                    options: [
                        {
                            id: 'opt_6_active_dca',
                            text: 'Scramble QRA Typhoon FGR4s on CAP and integrate HMS Duncan\'s Type 45 Sea Viper SAM umbrella',
                            effects: {
                                scores: { air_control: +1, force_protection: +1 },
                                unlockEvents: ['ev_7_asymmetric_swarm']
                            }
                        },
                        {
                            id: 'opt_6_no_active',
                            text: 'Withhold fighters and SAMs to conserve missiles for later in the war',
                            effects: {
                                scores: { air_control: -2, force_protection: -2 },
                                assetStateChanges: { 'a_typhoon': 'damaged' },
                                unlockEvents: ['ev_7_asymmetric_swarm']
                            }
                        }
                    ]
                },
                {
                    role: 'mobility',
                    text: 'Implement Passive Defensive Counter-Air (DCA) measures on the airfield at RAF Akrotiri:',
                    options: [
                        {
                            id: 'opt_6_passive_dca',
                            text: 'Disperse transport aircraft, place fighters in Hardened Aircraft Shelters (HAS), and deploy visual decoys',
                            effects: { scores: { force_protection: +2 } }
                        },
                        {
                            id: 'opt_6_line_abreast',
                            text: 'Leave all aircraft parked in a neat row on the open apron',
                            effects: { scores: { force_protection: -2, sustainability: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_7_asymmetric_swarm',
            stage: 'stage_2',
            name: '2.2 Asymmetric Warfare: Insurgent Drone Swarm on Perimeter',
            prerequisites: ['ev_6_dca_akrotiri'],
            requiresUnlock: true,
            repeatable: false,
            location: [34.62, 32.95],
            image: '/images/events/ev_drone_swarm_perimeter.jpg',
            description: 'Minutes after the conventional raid, Non-State insurgents hiding in civilian vans outside the RAF Akrotiri perimeter fence launch a swarm of 15 low-flying commercial quadcopters rigged with explosives toward the fuel farm.',
            facilitatorNotes: 'Covers LO1 P1/P2 (Task 2, 4, 7): Asymmetrical Warfare, Vulnerability of Air Bases, Protect Enabler (RAF Regiment), and Electronic Warfare.',
            roleDescriptions: {
                jfac: 'This is Asymmetrical Warfare—a significant difference in military power and tactics where insurgents bypass our high-end fighter jets to hit our fragile support infrastructure.',
                isr: 'Counter-UAS Electronic Warfare can jam the radio control links between the insurgents and their quadcopters.'
            },
            decisions: [
                {
                    role: 'jfac',
                    text: 'How do we defend the airfield perimeter against this low-slow asymmetric attack?',
                    options: [
                        {
                            id: 'opt_7_regiment',
                            text: 'Commit RAF Regiment Force Protection patrols to secure the perimeter footprint and engage drones with C-UAS systems',
                            effects: {
                                scores: { force_protection: +2 },
                                unlockEvents: ['ev_8_height_perspective']
                            }
                        },
                        {
                            id: 'opt_7_typhoon_strafe',
                            text: 'Order supersonic Typhoons to strafe the civilian neighbourhood just outside our own perimeter fence',
                            effects: {
                                scores: { coalition_support: -2, force_protection: -1 },
                                unlockEvents: ['ev_8_height_perspective']
                            }
                        }
                    ]
                },
                {
                    role: 'isr',
                    text: 'How can the ISR & Cyber Cell assist the RAF Regiment in stopping the drone swarm?',
                    options: [
                        {
                            id: 'opt_7_ew_jam',
                            text: 'Use Electronic Warfare to jam the drones\' command frequencies and direction-find the operators\' vans',
                            effects: { scores: { situational_awareness: +1, force_protection: +1 } }
                        },
                        {
                            id: 'opt_7_ignore_drones',
                            text: 'Ignore small drones as beneath our notice',
                            effects: { scores: { sustainability: -2, force_protection: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_8_height_perspective',
            stage: 'stage_2',
            name: '2.3 Exploiting Height, Perspective & Ubiquity',
            prerequisites: ['ev_7_asymmetric_swarm'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.25, 35.20],
            image: '/images/assets/nato_awacs.png',
            description: 'Enemy mobile missile launchers are hiding in deep mountain valleys, masking themselves from ground-based radar. We need continuous overwatch to maintain Ubiquity across the battlespace.',
            facilitatorNotes: 'Covers LO1 P1/P3 (Task 3 & 10): Strengths of Height, Perspective (greater field-of-view and horizon from altitude), and Ubiquity; and LO2 P4/P7 (Zephyr HAPS & Airborne Early Warning).',
            roleDescriptions: {
                isr: 'Height gives Air Power "Perspective"—a vastly increased field-of-view and radar horizon over physical terrain barriers. Combining Height, Speed, and Reach creates "Ubiquity" (appearing to be everywhere at once).',
                control: 'Airborne Early Warning and Control (AEW&C / AWACS) acts as a flying command post, looking down into valleys to detect low-flying threats.'
            },
            decisions: [
                {
                    role: 'isr',
                    text: 'Which platform best exploits ultra-high altitude ("Height" and "Perspective") for weeks of persistent stratospheric surveillance?',
                    options: [
                        {
                            id: 'opt_8_zephyr',
                            text: 'Deploy the solar-powered Zephyr High-Altitude Pseudo-Satellite (HAPS) at 70,000ft alongside Shadow R1',
                            effects: {
                                scores: { situational_awareness: +2 },
                                unlockEvents: ['ev_9_oca_cyber']
                            }
                        },
                        {
                            id: 'opt_8_low_heli',
                            text: 'Hover a Chinook at 50 feet inside the mountain valley to peer over the ridges',
                            effects: {
                                scores: { situational_awareness: -1, force_protection: -1 },
                                unlockEvents: ['ev_9_oca_cyber']
                            }
                        }
                    ]
                },
                {
                    role: 'control',
                    text: 'How do we overcome the radar horizon limitation of surface ships to track low-level enemy jets in the valleys?',
                    options: [
                        {
                            id: 'opt_8_aew',
                            text: 'Position an Airborne Early Warning (AEW&C) aircraft at high altitude to look down into the terrain clutter',
                            effects: { scores: { air_control: +1, situational_awareness: +1 } }
                        },
                        {
                            id: 'opt_8_ground_radar',
                            text: 'Rely strictly on sea-level ship radars blocked by the mountain range',
                            effects: { scores: { air_control: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_9_oca_cyber',
            stage: 'stage_2',
            name: '2.4 Offensive Counter-Air (OCA) & Operation Orchard Cyber Strike',
            prerequisites: ['ev_8_height_perspective'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.45, 35.95],
            image: '/images/events/ev_f35_success.jpg',
            description: 'We currently only have a Favourable Air Situation. To enable freedom of manoeuvre for joint forces, UK JFAC must launch an Offensive Counter-Air (OCA) campaign to destroy the enemy\'s main SAM network and fighter airbase at its source.',
            facilitatorNotes: 'Covers LO2 P5 (Task 20 & 21: 3 Degrees of Control of the Air; Offensive Counter-Air) and LO3 P10 (Task 35: Offensive Air-Cyber Integration, Case Study: Operation Orchard 2007).',
            roleDescriptions: {
                control: 'Offensive Counter-Air (OCA) proactively targets enemy air capabilities and infrastructure as close to their source as possible to achieve Air Superiority.',
                isr: 'Recall the Operation Orchard (2007) case study from LO3: Offensive Air-Cyber operations can infiltrate and disable enemy SAM radar networks in the virtual battlespace so strike aircraft can penetrate with zero losses.'
            },
            decisions: [
                {
                    role: 'isr',
                    text: 'How will you employ Air-Cyber Integration to support the OCA strike package?',
                    options: [
                        {
                            id: 'opt_9_orchard',
                            text: 'Launch an "Operation Orchard"-style Offensive Air-Cyber attack to blind enemy SAM command radars during penetration',
                            effects: { scores: { situational_awareness: +1, air_control: +1, joint_effect: +1 } }
                        },
                        {
                            id: 'opt_9_no_cyber',
                            text: 'Send aircraft straight into active SAM rings without cyber or electronic suppression',
                            effects: { scores: { force_protection: -2, air_control: -1 } }
                        }
                    ]
                },
                {
                    role: 'control',
                    text: 'Select the primary Offensive Counter-Air (OCA) strike force to penetrate the A2AD bubble and crater the enemy runway:',
                    options: [
                        {
                            id: 'opt_9_f35_oca',
                            text: 'Commit F-35B Lightning (Stealth penetration) & Storm Shadow-equipped Typhoon FGR4s against enemy airbases and SAM sites',
                            effects: {
                                scores: { air_control: +2 },
                                unlockEvents: ['ev_10_bai_convoy']
                            }
                        },
                        {
                            id: 'opt_9_transport_oca',
                            text: 'Send unescorted BAe146 VIP transports over the enemy airbase',
                            effects: {
                                scores: { air_control: -2, force_protection: -2 },
                                unlockEvents: ['ev_10_bai_convoy']
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_10_bai_convoy',
            stage: 'stage_2',
            name: '2.5 Cementing Air Superiority: Anti-Surface Counter-Air',
            prerequisites: ['ev_9_oca_cyber'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.50, 36.15],
            image: '/images/assets/rus_iskander.png',
            description: 'Our OCA strike shattered the enemy\'s primary air defences, elevating us from a Favourable Air Situation to Air Superiority! However, an enemy logistics convoy carrying replacement SAM missiles and mobile radar trucks is racing toward the coast to rebuild their A2AD network.',
            facilitatorNotes: 'Covers LO2 P5 (Task 20 & 21): Air Superiority vs Air Supremacy, and using Anti-Surface Operations (Air Interdiction / Battlefield Air Interdiction) to maintain Control of the Air by neutralizing ground threats.',
            roleDescriptions: {
                control: 'We have Air Superiority (we dominate and permit friendly operations, though limited enemy interference is still possible). To reach Air Supremacy (where the enemy is incapable of effective interference), we must stop those replacement SAMs.',
                strike: 'Task 21 notes that anti-surface operations (like Battlefield Air Interdiction) are used to gain and maintain Control of the Air by neutralizing ground forces and resources that threaten our aircraft.'
            },
            decisions: [
                {
                    role: 'strike',
                    text: 'How will you stop the enemy SAM resupply convoy before it reaches the coastal battery sites?',
                    options: [
                        {
                            id: 'opt_10_bai',
                            text: 'Execute Battlefield Air Interdiction (BAI) using Reaper RPAS and Typhoon Brimstone salvos to destroy the SAM convoy',
                            effects: {
                                scores: { air_control: +1, joint_effect: +1 },
                                unlockEvents: ['ev_11_counter_sea']
                            }
                        },
                        {
                            id: 'opt_10_let_pass',
                            text: 'Allow the convoy to set up the new SAM batteries and deal with them later',
                            effects: {
                                scores: { air_control: -2 },
                                unlockEvents: ['ev_11_counter_sea']
                            }
                        }
                    ]
                },
                {
                    role: 'control',
                    text: 'With the SAM convoy destroyed, what degree of Control of the Air have we now established over the coastal sector?',
                    options: [
                        {
                            id: 'opt_10_supremacy',
                            text: 'Declare local Air Supremacy (Enemy air force/defences are incapable of effective interference) and clear heavy transports/helicopters to operate',
                            effects: { scores: { air_control: +1, sustainability: +1 } }
                        },
                        {
                            id: 'opt_10_ground_all',
                            text: 'Assume the enemy still has total dominance and ground all friendly aircraft',
                            effects: { scores: { joint_effect: -2 } }
                        }
                    ]
                }
            ]
        },

        // =========================================================================
        // STAGE 3: AIR ATTACK ACROSS DOMAINS (5 Linear Events)
        // =========================================================================
        {
            id: 'ev_11_counter_sea',
            stage: 'stage_3',
            name: '3.1 Counter-Sea Operations & Air-Maritime Integration (AMI)',
            requiresUnlock: true,
            repeatable: false,
            location: [34.30, 33.90],
            image: '/images/events/ev_sub_detection.png',
            description: 'Desperate to break our maritime blockade, the adversary dispatches an attack submarine and three fast missile boats to ambush Royal Navy shipping in the Eastern Mediterranean.',
            facilitatorNotes: 'Covers LO2 P8 (Task 16, 28, 30: Counter-Sea Operations - Anti-Submarine Warfare & Anti-Surface Warfare; P-8A Poseidon & RN Wildcat) and LO3 P10 (Task 35: Air-Maritime Integration).',
            roleDescriptions: {
                strike: 'Counter-Sea operations comprise Anti-Submarine Warfare (ASW - locating, tracking, and attacking submarines using acoustic sensors/sonobuoys and torpedoes) and Anti-Surface Warfare (ASuW - engaging enemy surface vessels).',
                joint: 'Air-Maritime Integration (AMI) fuses RAF maritime patrol aircraft (P-8A Poseidon) with Royal Navy warships and Fleet Air Arm helicopters (Wildcat HMA2 / Merlin).'
            },
            decisions: [
                {
                    role: 'strike',
                    text: 'Select the Counter-Sea package to neutralize both the submerged submarine (ASW) and fast attack craft (ASuW):',
                    options: [
                        {
                            id: 'opt_11_poseidon_wildcat',
                            text: 'Task RAF P-8A Poseidon MRA1 (Acoustic sensors/torpedoes for ASW) & RN Wildcat (Martlet/Sea Venom missiles for ASuW)',
                            effects: {
                                scores: { joint_effect: +2, force_protection: +1 },
                                unlockEvents: ['ev_12_counter_land']
                            }
                        },
                        {
                            id: 'opt_11_sentinel',
                            text: 'Task a land-radar aircraft with no anti-ship weapons or sonobuoys to fight the submarine',
                            effects: {
                                scores: { joint_effect: -2, force_protection: -1 },
                                unlockEvents: ['ev_12_counter_land']
                            }
                        }
                    ]
                },
                {
                    role: 'joint',
                    text: 'How should the P-8A Poseidon and HMS Duncan coordinate their sensors during this engagement?',
                    options: [
                        {
                            id: 'opt_11_ami_link',
                            text: 'Execute full Air-Maritime Integration (AMI), sharing Poseidon radar/acoustic tracks directly with the ship\'s combat system',
                            effects: { scores: { situational_awareness: +1, joint_effect: +1 } }
                        },
                        {
                            id: 'opt_11_separate',
                            text: 'Operate in separate uncommunicative boxes to avoid talking to the Royal Navy',
                            effects: { scores: { joint_effect: -2 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_12_counter_land',
            stage: 'stage_3',
            name: '3.2 Counter-Land Force Multipliers: CAS, AI & SCAR',
            prerequisites: ['ev_11_counter_sea'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.15, 36.10],
            image: '/images/events/evt_armor_push.jpg',
            description: 'Friendly coalition ground forces have landed on the coast. An enemy tank company is engaging our troops at 400m range, while 60km inland, enemy artillery reinforcements are marshalling at a rail depot.',
            facilitatorNotes: 'Covers LO2 P8 (Task 30): Counter-Land Operations as Force Multipliers (Close Air Support vs Air Interdiction vs Strike, Coordination and Reconnaissance - SCAR) and LO3 P10 (Air-Land Integration).',
            roleDescriptions: {
                strike: 'Know the 3 Counter-Land subtypes: Close Air Support (CAS) occurs in close proximity to friendly ground forces; Air Interdiction (AI) strikes enemy forces/supplies far behind the front line; SCAR is a hybrid where combat aircraft detect, coordinate reconnaissance, and strike targets.',
                joint: 'Air-Land Integration (ALI) plans, coordinates, controls, and de-conflicts air and land activities so CAS hits the enemy without friendly fire (fratricide).'
            },
            decisions: [
                {
                    role: 'strike',
                    text: 'Assign your Counter-Land missions to support the ground offensive:',
                    options: [
                        {
                            id: 'opt_12_cas_ai_scar',
                            text: 'Deliver Close Air Support (CAS) for the troops in contact (400m) + Air Interdiction (AI) & SCAR against the rail depot 60km inland',
                            effects: {
                                scores: { joint_effect: +2, air_control: +1 },
                                unlockEvents: ['ev_13_weather_payload']
                            }
                        },
                        {
                            id: 'opt_12_confuse_cas_ai',
                            text: 'Conduct uncoordinated deep strategic bombing 400m from friendly troops without ground communication',
                            effects: {
                                scores: { joint_effect: -2, coalition_support: -2 },
                                unlockEvents: ['ev_13_weather_payload']
                            }
                        }
                    ]
                },
                {
                    role: 'joint',
                    text: 'How do we ensure safe Air-Land Integration (ALI) for the Close Air Support mission?',
                    options: [
                        {
                            id: 'opt_12_jtac',
                            text: 'Route all CAS strikes through embedded Joint Terminal Attack Controllers (JTACs) on the ground to de-conflict fires',
                            effects: { scores: { joint_effect: +1, coalition_support: +1 } }
                        },
                        {
                            id: 'opt_12_freefire',
                            text: 'Tell pilots to guess which tanks are friendly from 25,000 feet',
                            effects: { scores: { joint_effect: -2, force_protection: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_13_weather_payload',
            stage: 'stage_3',
            name: '3.3 Limitations of Air Attack: Weather & Limited Payload',
            prerequisites: ['ev_12_counter_land'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.22, 36.20],
            description: 'A dense shamal sandstorm and thick low cloud have rolled across the battlefront, reducing visibility to zero. Meanwhile, a pair of Typhoon FGR4s overhead have expended most of their munitions and only have two missiles remaining.',
            facilitatorNotes: 'Covers LO1 P1 (Task 4: Limitations of Air Power - Limited Payload) and LO2 P8 (Task 28: Three factors that determine the success of an air attack - penetration, number of weapons carried/payload, and poor weather).',
            roleDescriptions: {
                strike: 'Review Task 28: Three factors determine the success of an Air Attack: 1) Ability to penetrate defences, 2) Number of weapons an aircraft can carry (Limited Payload), and 3) Poor weather hindering operations.',
                mobility: 'Because aircraft have a much smaller payload than ships or trains, high sortie generation and rapid re-arming at the Spoke are critical.'
            },
            decisions: [
                {
                    role: 'strike',
                    text: 'How will you overcome the thick cloud/sandstorm and the fighters\' limited remaining payload?',
                    options: [
                        {
                            id: 'opt_13_allweather',
                            text: 'Switch from laser-only guidance to millimetric-wave radar/GPS all-weather precision weapons (Brimstone) & prioritize the highest-value target',
                            effects: {
                                scores: { joint_effect: +1, situational_awareness: +1 },
                                unlockEvents: ['ev_14_dynamic_retask']
                            }
                        },
                        {
                            id: 'opt_13_blind_drop',
                            text: 'Drop optical laser-guided bombs blindly through opaque cloud cover at low-priority decoys',
                            effects: {
                                scores: { joint_effect: -1, coalition_support: -1 },
                                unlockEvents: ['ev_14_dynamic_retask']
                            }
                        }
                    ]
                },
                {
                    role: 'mobility',
                    text: 'How do we mitigate the Air Power limitation of "Limited Payload" across the fighter wing?',
                    options: [
                        {
                            id: 'opt_13_turnaround',
                            text: 'Surge weapons loaders and A400M munitions deliveries at Akrotiri for rapid hot-pit re-arming',
                            effects: { scores: { sustainability: +1 } }
                        },
                        {
                            id: 'opt_13_overload',
                            text: 'Bolt extra bombs onto the wings beyond the aircraft\'s maximum takeoff weight',
                            effects: { scores: { sustainability: -2, force_protection: -1 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_14_dynamic_retask',
            stage: 'stage_3',
            name: '3.4 Agility, Speed & Dynamic Re-Tasking',
            prerequisites: ['ev_13_weather_payload'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.35, 36.30],
            image: '/images/assets/typhoon_aircraft.png',
            description: 'TIME CRITICAL: Shadow R1 detects the enemy\'s top theatre commander boarding a helicopter 100 miles away. He will escape in 8 minutes. No ground force or naval vessel can reach him in time, but a pair of multi-role Typhoon FGR4s are airborne 60 miles away on a routine patrol.',
            facilitatorNotes: 'Covers LO1 P1/P3 (Task 3 & 10): Strengths of Speed, Reach, Agility, Flexibility & Versatility; Re-tasking multi-role aircraft in flight.',
            roleDescriptions: {
                jfac: 'This is the ultimate demonstration of Air Power\'s Strengths: Speed (rapid response), Reach (ignoring terrain obstacles), Agility (adapting rapidly to changing situations), and Versatility/Flexibility (multi-role aircraft switching tasks mid-sortie).',
                control: 'The Typhoon FGR4 is a multi-role/swing-role combat aircraft capable of switching seamlessly from Control of the Air to Air Attack during the same mission.'
            },
            decisions: [
                {
                    role: 'jfac',
                    text: 'Can UK JFAC exploit Agility and Speed to intercept the fleeing commander within 8 minutes? (TIME CRITICAL)',
                    timeLimitMs: 120000,
                    defaultOptionId: 'opt_14_hesitate',
                    options: [
                        {
                            id: 'opt_14_retask',
                            text: 'Dynamically Re-Task the airborne multi-role Typhoon FGR4s via Link-16 to sprint at Mach 1.6 and neutralize the target',
                            effects: {
                                scores: { air_control: +1, joint_effect: +1, situational_awareness: +1 },
                                unlockEvents: ['ev_15_urban_roe']
                            }
                        },
                        {
                            id: 'opt_14_army_march',
                            text: 'Ask an Army infantry platoon 100 miles away to walk there on foot',
                            effects: {
                                scores: { joint_effect: -1 },
                                unlockEvents: ['ev_15_urban_roe']
                            }
                        },
                        {
                            id: 'opt_14_hesitate',
                            text: 'Delay decision (Target escapes before re-tasking order is sent)',
                            hiddenFrom: ['jfac', 'control', 'strike', 'isr', 'mobility', 'joint', 'display'],
                            effects: {
                                scores: { situational_awareness: -1, joint_effect: -1 },
                                unlockEvents: ['ev_15_urban_roe']
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_15_urban_roe',
            stage: 'stage_3',
            name: '3.5 Information Activities: Non-Kinetic Attack (EW & PsyOps)',
            prerequisites: ['ev_14_dynamic_retask'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.48, 35.85],
            description: 'An enemy propaganda broadcast tower and insurgent command post has been set up directly inside a functioning civilian hospital complex. Kinetic bombing will cause unacceptable civilian casualties and fracture our international coalition.',
            facilitatorNotes: 'Covers LO2 P8 (Task 28 & 30): The 4th Category of Air Attack—Information Activities (Electronic Warfare and Psychological Operations), and distinguishing Kinetic vs Non-Kinetic effects (Op Shader leaflet/broadcast examples).',
            roleDescriptions: {
                strike: 'Remember Lesson 5 of LO2: Air Attack is not just dropping bombs! The 4th category of Air Attack is "Information Activities", comprising Electronic Warfare (denying the electromagnetic spectrum) and Psychological Operations (influencing behaviour via broadcasts, leaflet drops, or fast-jet shows of force).',
                joint: 'Maintaining coalition legitimacy requires avoiding civilian collateral damage while still disrupting the enemy\'s command and control.'
            },
            decisions: [
                {
                    role: 'strike',
                    text: 'How will the Air Attack Cell neutralize the enemy command and propaganda node inside the hospital without kinetic destruction?',
                    options: [
                        {
                            id: 'opt_15_info_activities',
                            text: 'Execute Non-Kinetic Information Activities: Electronic Warfare jamming of their transmitters + Psychological Operations (leaflets & counter-broadcasts)',
                            effects: {
                                scores: { coalition_support: +2, joint_effect: +1 },
                                unlockEvents: ['ev_16_airborne_ops']
                            }
                        },
                        {
                            id: 'opt_15_kinetic_hospital',
                            text: 'Drop 2,000lb kinetic bombs on the hospital complex',
                            effects: {
                                scores: { coalition_support: -3, joint_effect: -2 },
                                unlockEvents: ['ev_16_airborne_ops']
                            }
                        }
                    ]
                },
                {
                    role: 'isr',
                    text: 'How can our RPAS fleet reinforce Psychological Operations over the insurgent positions?',
                    options: [
                        {
                            id: 'opt_15_rpas_presence',
                            text: 'Maintain continual overhead presence with Reaper RPAS & conduct low-altitude fast-jet "Shows of Force" to compel surrender',
                            effects: { scores: { situational_awareness: +1, air_control: +1 } }
                        },
                        {
                            id: 'opt_15_withdraw_isr',
                            text: 'Withdraw all ISR aircraft from the city',
                            effects: { scores: { situational_awareness: -1 } }
                        }
                    ]
                }
            ]
        },

        // =========================================================================
        // STAGE 4: AIR MOBILITY & SUSTAINMENT (4 Linear Events)
        // =========================================================================
        {
            id: 'ev_16_airborne_ops',
            stage: 'stage_4',
            name: '4.1 Airborne Operations: Air-Drop vs Air-Land',
            requiresUnlock: true,
            repeatable: false,
            location: [35.60, 36.40],
            description: 'To cut off the enemy\'s retreat, Joint Force Command orders the seizure of an inland desert airfield ("Objective Talon"). Currently, the runway is blocked by craters and obstacles, preventing any fixed-wing aircraft from landing until airborne engineers clear it.',
            facilitatorNotes: 'Covers LO2 P6 (Task 22 & 23): Airborne Operations—distinguishing Air-Drop (using parachutes to deliver troops/loads in flight) vs Air-Land (aircraft lands on runway to offload).',
            roleDescriptions: {
                mobility: 'Review Task 23: "Air-Drop" requires a parachute to deliver troops or loads whilst the aircraft is in flight. "Air-Land" is where the aircraft lands on a runway to deliver its load.',
                joint: 'Airborne operations project land power rapidly deep behind enemy lines, demonstrating joint interdependence.'
            },
            decisions: [
                {
                    role: 'mobility',
                    text: 'Sequence the Airborne Operation to seize and open Objective Talon:',
                    options: [
                        {
                            id: 'opt_16_drop_then_land',
                            text: 'Phase 1: Air-Drop 16 Air Assault Brigade paratroopers & engineers via parachute from A400M/Hercules -> Phase 2: Air-Land heavy vehicles once runway is cleared',
                            effects: {
                                scores: { sustainability: +1, joint_effect: +2 },
                                unlockEvents: ['ev_17_tanker_crisis']
                            }
                        },
                        {
                            id: 'opt_16_crash_land',
                            text: 'Attempt an immediate Air-Land with a fully loaded C-17 Globemaster onto the cratered, obstructed runway',
                            effects: {
                                scores: { sustainability: -2, force_protection: -2 },
                                unlockEvents: ['ev_17_tanker_crisis']
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_17_tanker_crisis',
            stage: 'stage_4',
            name: '4.2 Impermanence & Air-to-Air Refuelling (The Black Buck Lesson)',
            prerequisites: ['ev_16_airborne_ops'],
            requiresUnlock: true,
            repeatable: false,
            location: [34.85, 34.40],
            image: '/images/assets/voyager_refueler.png',
            description: 'ENGINEERING EMERGENCY: One of our Voyager KC3 tankers has suffered a hydraulic fault on takeoff, cutting available Air-to-Air Refuelling (AAR) offload capacity by 50%. Currently airborne are a Combat Air Patrol of Typhoons protecting the paratroopers AND a long-range strike package heading deep inland.',
            facilitatorNotes: 'Covers LO1 P1 (Task 4: Limitation of Impermanence) and LO2 P6 (Task 11 & 22: Air-to-Air Refuelling, Voyager, and the Operation Black Buck Victor K2 tanker lesson).',
            roleDescriptions: {
                mobility: 'Impermanence is a primary limitation of Air Power: aircraft cannot stay in the air indefinitely and must land to refuel. As demonstrated by the Victor K2 tankers in Operation Black Buck (1982), Air-to-Air Refuelling is essential to enable Reach, Endurance, and Flexibility.',
                jfac: 'With limited tanker fuel available, you must prioritize and coordinate tanking brackets across the theatre.'
            },
            decisions: [
                {
                    role: 'mobility',
                    text: 'How will you manage the Air-to-Air Refuelling crisis to overcome Impermanence?',
                    options: [
                        {
                            id: 'opt_17_buddy_voyager',
                            text: 'Scramble the standby Voyager from RAF Akrotiri & establish prioritized AAR towlines to keep both packages fuelled in flight',
                            effects: {
                                scores: { sustainability: +2, air_control: +1 },
                                unlockEvents: ['ev_18_littoral_jhc']
                            }
                        },
                        {
                            id: 'opt_17_ignore_fuel',
                            text: 'Tell pilots to ignore fuel gauges and keep flying until their engines flame out',
                            effects: {
                                scores: { sustainability: -2, force_protection: -2, air_control: -1 },
                                unlockEvents: ['ev_18_littoral_jhc']
                            }
                        }
                    ]
                },
                {
                    role: 'jfac',
                    text: 'Until the spare Voyager arrives on towline, how should airborne fighters conserve fuel?',
                    options: [
                        {
                            id: 'opt_17_econ_cruise',
                            text: 'Order fighters to throttle back to optimum endurance altitude/loiter speed and rotate CAP stations',
                            effects: { scores: { sustainability: +1 } }
                        },
                        {
                            id: 'opt_17_afterburner',
                            text: 'Fly in continuous full afterburner at sea level',
                            effects: { scores: { sustainability: -2 } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_18_littoral_jhc',
            stage: 'stage_4',
            name: '4.3 Intra-Theatre Mobility: Joint Helicopter Command (Chinook & Puma)',
            prerequisites: ['ev_17_tanker_crisis'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.42, 36.12],
            image: '/images/events/ev_chinook_underslung_mountain.jpg',
            description: 'The paratroopers at Objective Talon urgently need artillery guns, ammunition pallets, and tactical troop movement across rugged mountain ridges where fixed-wing aircraft cannot land.',
            facilitatorNotes: 'Covers LO1 P1 (Task 3: Agility of Chinook) and LO2 P4/P6 (Task 18, 22, 23: Helicopters—Chinook & Puma HC2, Joint Helicopter Command, Intra-Theatre Air Mobility).',
            roleDescriptions: {
                mobility: 'This is Intra-Theatre mobility (movement within a theatre). The Chinook is an extremely capable and versatile heavy support helicopter (can operate from land or sea bases and carry underslung artillery/vehicles). The Puma HC2 provides tactical troop transport and CASEVAC.'
            },
            decisions: [
                {
                    role: 'mobility',
                    text: 'Task Joint Helicopter Command (JHC) assets for Intra-Theatre vertical lift into the mountain positions:',
                    options: [
                        {
                            id: 'opt_18_chinook_puma',
                            text: 'Task Chinook HC6 (underslung artillery & heavy ammo loads) and Puma HC2 (tactical troop movement into confined clearings)',
                            effects: {
                                scores: { sustainability: +1, joint_effect: +1 },
                                unlockEvents: ['ev_19_csar_medevac']
                            }
                        },
                        {
                            id: 'opt_18_voyager_mountain',
                            text: 'Try to land a strategic Voyager airliner on a rocky mountain goat track',
                            effects: {
                                scores: { sustainability: -2, force_protection: -2 },
                                unlockEvents: ['ev_19_csar_medevac']
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_19_csar_medevac',
            stage: 'stage_4',
            name: '4.4 Personnel Recovery (Combat Recovery) & 3-Tier Medevac',
            prerequisites: ['ev_18_littoral_jhc'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.45, 36.28],
            image: '/images/events/ev_combat_recovery_medevac.jpg',
            description: 'FLASH OVERRIDE: An allied strike jet has suffered mechanical failure and the pilot has ejected into contested territory. Simultaneously, four British soldiers have sustained severe injuries in a mortar attack and require urgent evacuation from the battlefield all the way back to Queen Elizabeth Hospital Birmingham.',
            facilitatorNotes: 'Covers LO2 P6 (Task 22 & 23): Personnel Recovery (Combat Recovery vs Peacetime Recovery; Case Study: Exercise Volfa) and Aeromedical Evacuation (Forward, Tactical, and Strategic Medevac).',
            roleDescriptions: {
                mobility: 'Review Task 23 carefully! Personnel Recovery has two types: Peacetime Recovery (no hostile threat) and Combat Recovery (time-sensitive where hostile interference is expected). Aeromedical Evacuation has three tiers: Forward (battlefield to initial medical facility), Tactical (between medical facilities in/close to theatre), and Strategic (from theatre facility back to the UK).',
                control: 'Combat Recovery (as practised in Exercise Volfa) requires a joint package including fighter escort (RESCORT), ISR overwatch, and suppression of enemy threats.'
            },
            decisions: [
                {
                    role: 'mobility',
                    text: 'Launch the appropriate Personnel Recovery operation to rescue the isolated pilot from contested territory:',
                    options: [
                        {
                            id: 'opt_19_combat_rec',
                            text: 'Execute a time-sensitive Combat Recovery Operation (Chinook + RAF Regiment/JPR team + Typhoon RESCORT, expecting hostile interference)',
                            effects: {
                                scores: { force_protection: +2, coalition_support: +1 },
                                unlockEvents: ['ev_20_space_jamming']
                            }
                        },
                        {
                            id: 'opt_19_peacetime_rec',
                            text: 'Dispatch an unescorted yellow training helicopter under Peacetime Recovery rules',
                            effects: {
                                scores: { force_protection: -2, coalition_support: -1 },
                                unlockEvents: ['ev_20_space_jamming']
                            }
                        }
                    ]
                },
                {
                    role: 'mobility',
                    text: 'Coordinate the 3-tier Aeromedical Evacuation chain for the four wounded soldiers:',
                    options: [
                        {
                            id: 'opt_19_med_3tier',
                            text: '1) Forward Medevac (Puma/Chinook MERT from battlefield) -> 2) Tactical Medevac (A400M to Akrotiri hospital) -> 3) Strategic Medevac (C-17 CCAST to UK)',
                            effects: { scores: { sustainability: +1, force_protection: +1 } }
                        },
                        {
                            id: 'opt_19_med_wrong',
                            text: 'Confuse the tiers: use a C-17 for Forward battlefield pickup and a Puma helicopter to fly from Cyprus to Birmingham',
                            effects: { scores: { sustainability: -2, force_protection: -1 } }
                        }
                    ]
                }
            ]
        },

        // =========================================================================
        // STAGE 5: MULTI-DOMAIN & STRATEGIC ENDGAME (2 Linear + 3 Endgame Events)
        // =========================================================================
        {
            id: 'ev_20_space_jamming',
            stage: 'stage_5',
            name: '5.1 Air-Space Integration: Countering GPS/PNT & SATCOM Denial',
            requiresUnlock: true,
            repeatable: false,
            location: [35.50, 35.50],
            image: '/images/events/ev_gps_jamming.png',
            description: 'In a desperate bid to halt our advance, the adversary activates Russian-supplied ultra-high-power electronic warfare systems that jam space-based Positioning, Navigation, and Timing (PNT / GPS) and satellite communications across the entire operational theatre.',
            facilitatorNotes: 'Covers LO3 P10 (Task 35: Air-Space Integration—Space power is vital for enabling Positioning, Navigation, and Timing for aircraft/weapons, as well as voice/data communications) and LO1 P2 (Task 9: Denial & Disruption).',
            roleDescriptions: {
                joint: 'Review Task 35: Space power is essential to modern Air Power, providing Positioning, Navigation, and Timing (PNT) for aircraft and precision weapons, plus beyond-line-of-sight voice and data communications.',
                isr: 'Rivet Joint SIGINT/MASINT and space domain awareness can pinpoint the high-power ground jammers so they can be destroyed.'
            },
            decisions: [
                {
                    role: 'joint',
                    text: 'How will you maintain Air-Space Integration so our aircraft can navigate, communicate, and employ precision weapons?',
                    options: [
                        {
                            id: 'opt_20_space_int',
                            text: 'Integrate with UK Space Command for anti-jam military SATCOM/inertial backup & task Typhoons to destroy the jammers using laser/radiation-seeking munitions',
                            effects: {
                                scores: { situational_awareness: +2, joint_effect: +1 },
                                unlockEvents: ['ev_21_strategic_attack']
                            }
                        },
                        {
                            id: 'opt_20_ignore_space',
                            text: 'Ignore the space domain; rely on commercial smartphone maps in the cockpit',
                            effects: {
                                scores: { situational_awareness: -2, joint_effect: -2, air_control: -1 },
                                unlockEvents: ['ev_21_strategic_attack']
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'ev_21_strategic_attack',
            stage: 'stage_5',
            name: '5.2 Strategic Attack, Joint Action & The Full Spectrum Approach',
            prerequisites: ['ev_20_space_jamming'],
            requiresUnlock: true,
            repeatable: false,
            location: [35.52, 35.78],
            image: '/images/events/evt_depot_strike.jpg',
            description: 'FINAL OPERATIONAL DECISION: With the enemy\'s field forces shattered and Air Supremacy established, the Crimson State leadership is isolated in its hardened command complex. UK JFAC must execute the culminating action and transition to Post-Conflict Peace Building.',
            facilitatorNotes: 'Covers LO2 P8 (Strategic Attack), LO1 P2 (Task 9: Coercion, Destruction, Post-Conflict Peace Building), and LO3 P9 (Task 33 & 34: Joint Action, Full Spectrum Approach—Military, Diplomatic, Economic; and why independent Air Power cannot occupy land alone). Evaluates scores to trigger the appropriate Endgame.',
            roleDescriptions: {
                strike: 'A Strategic Attack targets the key leadership, command structures, and war-making organisations of an adversary to directly shatter their ability and will to wage war.',
                jfac: 'Remember Task 34: Independent air operations do not have the same potency as Joint Operations because aircraft cannot occupy land. Lasting peace requires a Full Spectrum Approach (Military, Diplomatic, and Economic).'
            },
            decisions: [
                {
                    role: 'strike',
                    text: 'Execute the culminating Strategic Attack to compel regime capitulation (Coercion):',
                    options: [
                        {
                            id: 'opt_21_strategic_strike',
                            text: 'Launch a coordinated F-35B & Typhoon Storm Shadow precision Strategic Attack on the regime\'s C2 and war-production bunkers',
                            effects: { scores: { air_control: +1, joint_effect: +1 } }
                        },
                        {
                            id: 'opt_21_no_strategic',
                            text: 'Halt all air operations and leave the regime\'s command bunkers intact',
                            effects: { scores: { air_control: -1, joint_effect: -1 } }
                        }
                    ]
                },
                {
                    role: 'jfac',
                    text: 'How will you transition from combat to Post-Conflict Peace Building and Peace Support Operations?',
                    options: [
                        {
                            id: 'opt_21_full_spectrum',
                            text: 'Execute Joint Action & a Full Spectrum Approach: Integrate Land/Maritime forces to hold ground alongside Diplomatic & Economic reconstruction',
                            effects: {
                                scores: { joint_effect: +2, coalition_support: +2 },
                                unlockEvents: ['ev_endgame_victory', 'ev_endgame_culmination', 'ev_endgame_denial']
                            }
                        },
                        {
                            id: 'opt_21_air_only',
                            text: 'Withdraw all Land, Maritime, and Diplomatic partners; try to occupy and govern the country using fighter jets alone',
                            effects: {
                                scores: { joint_effect: -3, coalition_support: -2 },
                                unlockEvents: ['ev_endgame_victory', 'ev_endgame_culmination', 'ev_endgame_denial']
                            }
                        }
                    ]
                }
            ]
        },

        // =========================================================================
        // 3 DOCTRINAL ENDGAME OUTCOMES (Unlocked after Event 21 based on Scores)
        // =========================================================================
        {
            id: 'ev_endgame_victory',
            stage: 'stage_5',
            name: 'ENDGAME A: Decisive Joint & Full-Spectrum Victory',
            prerequisites: ['ev_21_strategic_attack'],
            requiresUnlock: true,
            repeatable: false,
            isEndGame: true,
            conditions: { minScores: { air_control: 4, joint_effect: 4, sustainability: 3 } },
            location: [35.52, 35.78],
            image: '/images/events/ev_eu_success.jpg',
            description: 'CAMPAIGN VICTORY: By mastering the 4 Fundamental Roles of Air Power (Control of the Air, ISR, Air Attack, and Air Mobility), securing the 4 Enablers (Base, Sustain, Connect, Protect), and integrating seamlessly across Land, Maritime, Space, and Cyber domains within a Full Spectrum Approach, UK JFAC has compelled a full adversary surrender and established lasting regional stability.',
            facilitatorNotes: 'Trigger this Endgame if the cadets achieved strong scores across Air Control (4+), Joint Effect (4+), and Sustainability (3+). Congratulate them on passing the practical application of the Senior/Master Air Power syllabus!',
            roleDescriptions: {
                jfac: 'Outstanding leadership. You proved how integrated Air Command and Control (UK JFAC) acts as the decisive catalyst for Joint Action.',
                control: 'You progressed systematically from a Favourable Air Situation to Air Superiority and Air Supremacy.',
                mobility: 'Your Hub-and-Spoke airbridge and AAR towlines overcame Air Power\'s limitations of impermanence and payload.'
            },
            decisions: []
        },
        {
            id: 'ev_endgame_culmination',
            stage: 'stage_5',
            name: 'ENDGAME B: Logistical Culmination & Independent Air Fallacy',
            prerequisites: ['ev_21_strategic_attack'],
            requiresUnlock: true,
            repeatable: false,
            isEndGame: true,
            conditions: { maxScores: { joint_effect: 3 } },
            location: [34.58, 32.98],
            description: 'OPERATIONAL STALEMATE: Although RAF combat aircraft won tactical victories in the sky, neglect of Air Mobility/Sustainability or an attempt to rely on independent Air Power without Joint Land/Maritime integration and a Full Spectrum Approach allowed insurgents to re-occupy the cities. As RAF doctrine states: aircraft cannot occupy land alone.',
            facilitatorNotes: 'Trigger this Endgame if the cadets achieved Air Control but let Joint Effect or Sustainability drop to 3 or below. Use this to debrief LO1 P1 (Limitations of Air Power) and LO3 P9 (Why Joint Operations and the Full Spectrum Approach are essential).',
            roleDescriptions: {
                jfac: 'A vital doctrinal lesson: Tactical dominance in the air is wasted if not tied to Joint Action on the ground and a Full Spectrum (Diplomatic, Economic, Military) strategy.',
                mobility: 'Without robust Sustain, Base protection, and Air Mobility, high-tech combat fleets quickly culminate.'
            },
            decisions: []
        },
        {
            id: 'ev_endgame_denial',
            stage: 'stage_5',
            name: 'ENDGAME C: A2AD Denial & Loss of Control of the Air',
            prerequisites: ['ev_21_strategic_attack'],
            requiresUnlock: true,
            repeatable: false,
            isEndGame: true,
            conditions: { maxScores: { air_control: 3 } },
            location: [35.30, 35.80],
            image: '/images/events/ev_raf_bases_strike.jpg',
            description: 'CAMPAIGN DEFEAT: UK JFAC failed to neutralize the adversary\'s Anti-Access/Area Denial (A2AD) network or protect its forward operating bases. Without Control of the Air, our transport aircraft, helicopters, and surface ships suffered prohibitive losses and were forced to withdraw from theatre.',
            facilitatorNotes: 'Trigger this Endgame if Air Control is 3 or below. Use this to debrief LO2 P5: why Control of the Air is the foundational prerequisite for all other military operations.',
            roleDescriptions: {
                control: 'Without Control of the Air, neither air nor surface forces can operate effectively.',
                isr: 'Insufficient ISR and Air-Cyber integration left our strike packages exposed to enemy SAMs.'
            },
            decisions: []
        },

        // =========================================================================
        // HIDDEN EVENTS TRIGGERED BY PROACTIVE MANUAL ACTIONS
        // =========================================================================
        {
            id: 'ev_sf_raid_success',
            stage: 'stage_3',
            name: 'Special Forces Air Operation: Operation Mikado / HUMINT Success',
            hidden: true,
            location: [35.48, 36.05],
            image: '/images/events/ev_sf_success.jpg',
            description: 'Tasked by the Mobility and ISR cells, Joint Helicopter Command Chinooks conducted a low-level night infiltration behind enemy lines under Shadow R1 overwatch. UK Special Forces captured key enemy encryption hardware (TECHINT) and intelligence Officers (HUMINT).',
            roleDescriptions: {
                mobility: 'Special Forces Air Operations (one of the 6 Divisions of Air Mobility) require dedicated aircraft and specialist crews for covert insertion, sustainment, and extraction.',
                isr: 'Captured TECHINT and HUMINT have significantly improved our situational awareness.'
            },
            decisions: []
        },
        {
            id: 'ev_humanitarian_drop',
            stage: 'stage_4',
            name: 'Humanitarian Operation: Relief Air-Drop Completed',
            hidden: true,
            location: [35.25, 36.30],
            image: '/images/assets/a400m_transport.png',
            description: 'RAF A400M Atlas aircraft have delivered 40 tonnes of food, water purification kits, and medical aid to displaced civilians via precision parachute Air-Drop, demonstrating how Air Power supports Humanitarian Operations and promotes international goodwill.',
            roleDescriptions: {
                joint: 'Humanitarian Operations (Task 9) provide short-term material and logistical aid in a crisis, directly supporting the Full Spectrum Approach.'
            },
            decisions: []
        },
        {
            id: 'ev_combat_air_patrol_surge',
            stage: 'stage_2',
            name: '11 Group QRA & DCA Surge Established',
            hidden: true,
            location: [34.90, 33.50],
            image: '/images/events/ev_airspace_intercept.png',
            description: 'Additional Typhoon FGR4 sorties supported by Voyager AAR have established a 24/7 barrier Combat Air Patrol across the Eastern Med, deterring enemy air incursions.',
            roleDescriptions: {
                control: 'Active Defensive Counter-Air (DCA) posture strengthened.'
            },
            decisions: []
        },
        {
            id: 'ev_link16_sync',
            stage: 'stage_2',
            name: 'Network Enabled Capability (NEC) Architecture Synchronized',
            hidden: true,
            location: [35.00, 34.00],
            image: '/images/events/ev_cyber_success.jpg',
            description: 'No 1 ISR Wing and 90 Signals Unit have synchronized Link-16 data links across all RAF, Royal Navy, British Army, and coalition assets in theatre, embodying "Right information, right place, right time."',
            roleDescriptions: {
                isr: 'Network Enabled Capability (Task 29) joins sensors, decision-makers, and effectors into a seamless network.'
            },
            decisions: []
        },
        {
            id: 'ev_raf_regt_sweep',
            stage: 'stage_2',
            name: 'RAF Regiment Base Defence Sweep Complete',
            hidden: true,
            location: [34.58, 32.98],
            image: '/images/events/generic_deployment.png',
            description: 'RAF Regiment gunners have swept the 25km footprint around RAF Akrotiri, neutralizing an insurgent mortar team and securing the "Protect" enabler for the airfield.',
            roleDescriptions: {
                jfac: 'Active force protection mitigates the limitation of aircraft vulnerability on the ground.'
            },
            decisions: []
        },
        {
            id: 'ev_psyops_broadcast',
            stage: 'stage_3',
            name: 'Information Activities: Psychological Operations Broadcast',
            hidden: true,
            location: [35.40, 36.00],
            description: 'RAF aircraft have dropped 100,000 informational leaflets and transmitted radio messages across enemy frequencies (as in Op Shader), convincing two insurgent battalions to lay down their arms without a fight.',
            roleDescriptions: {
                strike: 'Information Activities (Psychological Operations & Electronic Warfare) shape adversary behaviour without kinetic destruction.'
            },
            decisions: []
        }
    ],
    manualActions: [
        {
            id: 'act_sf_air_ops',
            name: 'Launch Special Forces Air Operation (Task 22)',
            description: 'Task JHC Chinooks and Shadow R1 to covertly insert UK Special Forces behind enemy lines for HUMINT and TECHINT collection.',
            initiator: ['mobility', 'isr'],
            requiresApprovalFrom: ['jfac'],
            conditions: { minScores: { air_control: 3 } },
            effects: {
                scores: { situational_awareness: +1, joint_effect: +1 },
                triggerEvents: [{ id: 'ev_sf_raid_success', delayMs: 4000, probability: 1.0 }]
            },
            image: '/images/events/act_special_forces.png'
        },
        {
            id: 'act_humanitarian_aid',
            name: 'Conduct Humanitarian Air-Drop (Task 9)',
            description: 'Use Air Mobility (A400M Atlas) to deliver short-term material and logistical aid to civilians displaced by the conflict.',
            initiator: ['mobility', 'joint'],
            requiresApprovalFrom: ['jfac'],
            conditions: { minScores: { sustainability: 2 } },
            effects: {
                scores: { coalition_support: +2, sustainability: -1 },
                triggerEvents: [{ id: 'ev_humanitarian_drop', delayMs: 4000, probability: 1.0 }]
            },
            image: '/images/events/act_us_support.png'
        },
        {
            id: 'act_dca_surge',
            name: 'Surge Defensive Counter-Air CAP (Task 21)',
            description: 'Commit extra Typhoon FGR4s and Voyager tanker gas to bolster Active Defensive Counter-Air coverage.',
            initiator: ['control'],
            requiresApprovalFrom: ['mobility'],
            conditions: { minScores: { sustainability: 3 } },
            effects: {
                scores: { air_control: +1, force_protection: +1, sustainability: -1 },
                triggerEvents: [{ id: 'ev_combat_air_patrol_surge', delayMs: 4000, probability: 1.0 }]
            },
            image: '/images/events/ev_airspace_intercept.png'
        },
        {
            id: 'act_nec_sync',
            name: 'Synchronize Link-16 NEC Network (Task 29)',
            description: 'Dedicate No 1 ISR Wing and Signals bandwidth to fuse sensor-to-shooter links across Land, Sea, and Air.',
            initiator: ['isr', 'joint'],
            requiresApprovalFrom: ['jfac'],
            conditions: { minScores: { situational_awareness: 2 } },
            effects: {
                scores: { joint_effect: +1, situational_awareness: +1 },
                triggerEvents: [{ id: 'ev_link16_sync', delayMs: 4000, probability: 1.0 }]
            },
            image: '/images/events/act_cyber_offensive.png'
        },
        {
            id: 'act_regt_patrol',
            name: 'Deploy RAF Regiment FP Sweep (Task 2)',
            description: 'Order an aggressive exterior force protection sweep around RAF Akrotiri to counter asymmetric threats.',
            initiator: ['jfac', 'control'],
            conditions: { minScores: { sustainability: 2 } },
            effects: {
                scores: { force_protection: +1 },
                triggerEvents: [{ id: 'ev_raf_regt_sweep', delayMs: 4000, probability: 1.0 }]
            },
            image: '/images/events/act_national_address.png'
        },
        {
            id: 'act_info_psyops',
            name: 'Execute Op Shader-Style PsyOps Drop (Task 30)',
            description: 'Conduct non-kinetic Information Activities (leaflet drops and radio broadcasts) to undermine adversary morale.',
            initiator: ['strike', 'joint'],
            requiresApprovalFrom: ['jfac'],
            conditions: { minScores: { air_control: 3 } },
            effects: {
                scores: { coalition_support: +1, joint_effect: +1 },
                triggerEvents: [{ id: 'ev_psyops_broadcast', delayMs: 4000, probability: 1.0 }]
            },
            image: '/images/events/act_backchannel_russia.png'
        }
    ]
};
