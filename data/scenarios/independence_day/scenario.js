module.exports = {
    id: 'independence_day',
    name: 'Independence Day: Global Supremacy',
    description: 'A 45-minute semi-cooperative geopolitical struggle. Defeat the alien threat, but ensure your nation emerges as the sole superpower.',
    mapConfig: { center: [20, 0], zoom: 2 },
    roles: ['usa', 'china', 'russia', 'eu', 'india', 'uk'],
    roleNames: {
        'usa': 'USA (President)',
        'china': 'China (Premier)',
        'russia': 'Russia (President)',
        'eu': 'European Union (President)',
        'india': 'India (Prime Minister)',
        'uk': 'United Kingdom (PM)'
    },
    minUsers: 2,
    mandatoryRoles: ['usa', 'china'],
    roleFallbacks: { russia: ['china', 'usa'], eu: ['uk', 'usa'], india: ['china', 'russia'], uk: ['eu', 'usa'] },
    initialScores: {
        usa_survival: 5, usa_tech: 0,
        china_survival: 5, china_tech: 0,
        russia_survival: 5, russia_tech: 0,
        eu_survival: 5, eu_tech: 0,
        india_survival: 5, india_tech: 0,
        uk_survival: 5, uk_tech: 0,
        global_tech: 0
    },
    briefings: {
        _general: 'Unidentified objects of massive scale have entered Earth orbit. Global communications are failing. You have 45 minutes to respond. Humanity must unite to survive, but when the dust settles, only one nation will rule the ashes.',
        usa: 'You lead the free world. Maintain your survival and secure alien tech at all costs.',
        china: 'You have vast resources and a hidden military edge. Use them to surpass the West.',
        russia: 'Your conventional forces may be tested, but your asymmetric capabilities are unmatched. Survive and undermine.',
        eu: 'You represent a coalition of powers. Unity is your strength, but you are a prime target.',
        india: 'Your population is vast and vulnerable. Secure tech to protect your borders.',
        uk: 'You are a smaller target but punch above your weight in intelligence and cyber.'
    },
    aiConfig: {
        systemPrompt: `You are a UN Crisis AI. Describe the objective situation. NEVER refer to the player. Write ONE short paragraph. Stick to provided facts.`,
        scoreLabels: { 1: "Critical", 2: "Failing", 3: "Stable", 4: "Strong", 5: "Dominant" },
        roleContexts: {
            usa: "Focus on global leadership and military projection.",
            china: "Focus on domestic security and rapid technological acquisition.",
            russia: "Focus on asymmetric warfare and survival.",
            eu: "Focus on civilian protection and coalition unity.",
            india: "Focus on border security and population survival.",
            uk: "Focus on intelligence and specialized military response."
        },
        scores: {
            usa_survival: { label: "USA Survival", subject: "US infrastructure", isPlural: false, roles: ["usa"] },
            usa_tech: { label: "USA Tech", subject: "US alien tech research", isPlural: false, roles: ["usa"] },
            china_survival: { label: "China Survival", subject: "Chinese infrastructure", isPlural: false, roles: ["china"] },
            china_tech: { label: "China Tech", subject: "Chinese alien tech research", isPlural: false, roles: ["china"] },
            russia_survival: { label: "Russia Survival", subject: "Russian infrastructure", isPlural: false, roles: ["russia"] },
            russia_tech: { label: "Russia Tech", subject: "Russian alien tech research", isPlural: false, roles: ["russia"] },
            eu_survival: { label: "EU Survival", subject: "European infrastructure", isPlural: false, roles: ["eu"] },
            eu_tech: { label: "EU Tech", subject: "European alien tech research", isPlural: false, roles: ["eu"] },
            india_survival: { label: "India Survival", subject: "Indian infrastructure", isPlural: false, roles: ["india"] },
            india_tech: { label: "India Tech", subject: "Indian alien tech research", isPlural: false, roles: ["india"] },
            uk_survival: { label: "UK Survival", subject: "UK infrastructure", isPlural: false, roles: ["uk"] },
            uk_tech: { label: "UK Tech", subject: "UK alien tech research", isPlural: false, roles: ["uk"] },
            global_tech: { label: "Global Defense Grid", subject: "Combined human research", isPlural: false, roles: ["usa", "china", "eu"] }
        }
    },
    variantAxes: [],
    assets: [],
    eventTemplates: [
        // PHASE 1: First Contact (T+0 to T+10)
        {
            id: 'ev_start',
            name: 'Shadows Over Earth',
            description: 'Massive unidentified objects have entered low Earth orbit, positioning themselves over major global capitals. Total global satellite blackout has commenced.',
            decisions: [
                { role: 'usa', text: 'Military Posture?', options: [{ id: 'defcon1', text: 'DEFCON 1 (Prepare Nukes)', effects: { scores: { usa_survival: +1, eu_survival: -1 } } }, { id: 'wait', text: 'Observe', effects: { scores: { usa_tech: +1, global_tech: +1 } } }] },
                { role: 'china', text: 'Public Stance?', options: [{ id: 'lockdown', text: 'Total Martial Law', effects: { scores: { china_survival: +1 } } }, { id: 'evac', text: 'Mass Evacuation', effects: { scores: { china_survival: -1, china_tech: +1, global_tech: +1 } } }] },
                { role: 'russia', text: 'Strategic Response?', options: [{ id: 'bunkers', text: 'Retreat to Bunkers', effects: { scores: { russia_survival: +2 } } }, { id: 'cyber', text: 'Probe Alien Comms', effects: { scores: { russia_tech: +2, global_tech: +2, russia_survival: -1 } } }] },
                { role: 'eu', text: 'Coalition Directive?', options: [{ id: 'unite', text: 'Pool Resources', effects: { scores: { eu_survival: +1, eu_tech: +1, global_tech: +1 } } }] },
                { role: 'india', text: 'Border Control?', options: [{ id: 'close', text: 'Seal Borders', effects: { scores: { india_survival: +1 } } }] },
                { role: 'uk', text: 'Intelligence?', options: [{ id: 'share', text: 'Share with US/EU', effects: { scores: { uk_tech: +1, global_tech: +1 } } }, { id: 'hoard', text: 'Keep Classified', effects: { scores: { uk_tech: +2, global_tech: +2 } } }] }
            ],
            triggerEvents: [
                { id: 'ev_roswell_cache', delayMs: 60000 },
                { id: 'ev_first_strike_prep', delayMs: 180000 },
                { id: 'ev_global_strike', delayMs: 300000 }, // 5 mins
                { id: 'ev_china_hoard', delayMs: 420000 },
                { id: 'ev_russia_false_flag', delayMs: 600000 }, // 10 mins
                { id: 'ev_arms_race_start', delayMs: 900000 }, // 15 mins
                { id: 'ev_mothership', delayMs: 1800000 }, // 30 mins
                { id: 'ev_endgame_trigger', delayMs: 2700000 } // 45 mins
            ]
        },
        {
            id: 'ev_roswell',
            name: 'The Roswell Cache',
            description: 'The US unlocks decades of hidden research.',
            image: '/scenarios/independence_day/images/ev_alien_tech.jpg',
            decisions: [
                { role: 'usa', text: 'Share Roswell Tech?', options: [{ id: 'share_all', text: 'Share Globally', effects: { scores: { global_tech: +3, eu_tech: +1, uk_tech: +1 } } }, { id: 'keep', text: 'Classified (USA Only)', effects: { scores: { usa_tech: +3, global_tech: +3 } } }] }
            ]
        },
        {
            id: 'ev_first_strike_prep',
            name: 'Energy Signatures Detected',
            description: 'The orbital ships are powering up massive energy weapons. They are targeting high-density populations.',
            decisions: [
                { role: 'india', text: 'Redirect Targets?', options: [{ id: 'hack', text: 'Hack beacons (Diverts attack from India to EU)', effects: { scores: { india_survival: +1, eu_survival: -2 } } }, { id: 'brace', text: 'Brace for impact', effects: { scores: { india_survival: -2 } } }] },
                { role: 'eu', text: 'Activate Prototype Shields?', options: [{ id: 'shield', text: 'Yes (Burns Tech)', effects: { scores: { eu_survival: +2, eu_tech: -1, global_tech: -1 } } }, { id: 'save', text: 'Save Research', effects: { scores: { eu_survival: -2 } } }] }
            ]
        },
        // PHASE 2: Global Strike
        {
            id: 'ev_global_strike',
            name: 'The Global Strike',
            description: 'Coordinated energy beams obliterate major landmarks worldwide.',
            image: '/scenarios/independence_day/images/ev_orbital_strike.jpg',
            effects: { scores: { usa_survival: -1, china_survival: -1, russia_survival: -1, eu_survival: -1, india_survival: -1, uk_survival: -1 } }
        },
        {
            id: 'ev_china_hoard',
            name: 'Rare Earth Monopoly',
            description: 'China has secured the remaining global supply of rare-earth materials vital for orbital defense grids.',
            decisions: [
                { role: 'china', text: 'Exploit Resources?', options: [{ id: 'hoard', text: 'Keep for China', effects: { scores: { china_survival: +2, usa_survival: -1, eu_survival: -1 } } }, { id: 'distribute', text: 'Distribute', effects: { scores: { global_tech: +2 } } }] }
            ]
        },
        {
            id: 'ev_russia_false_flag',
            name: 'European Grid Collapse',
            description: 'As the aliens attacked, a secondary terrestrial cyber-attack wiped out the remaining European defense grids.',
            decisions: [
                { role: 'russia', text: 'Launch False Flag?', options: [{ id: 'launch', text: 'Launch Attack on EU', effects: { scores: { eu_survival: -2, russia_survival: +1 } } }, { id: 'help', text: 'Assist EU Instead', effects: { scores: { global_tech: +1, eu_survival: +1 } } }] }
            ]
        },
        // PHASE 3: Arms Race
        {
            id: 'ev_arms_race_start',
            name: 'Fighters Downed',
            description: 'Conventional military forces have managed to down several small alien fighters. The race to reverse-engineer them begins.',
            effects: { scores: { global_tech: +1 } },
            triggerEvents: [{ id: 'ev_espionage_uk', delayMs: 120000 }, { id: 'ev_espionage_china', delayMs: 240000 }]
        },
        {
            id: 'ev_espionage_uk',
            name: 'Intelligence Coup',
            description: 'UK Intelligence has intercepted raw data from downed ships.',
            decisions: [
                { role: 'uk', text: 'Action?', options: [{ id: 'steal_us', text: 'Steal US Research', effects: { scores: { uk_tech: +2, global_tech: +2, usa_tech: -1, global_tech: -1 } } }, { id: 'share', text: 'Open Source', effects: { scores: { global_tech: +2 } } }] }
            ]
        },
        {
            id: 'ev_espionage_china',
            name: 'Cyber Infiltration',
            description: 'Chinese hackers have breached the global research network.',
            decisions: [
                { role: 'china', text: 'Action?', options: [{ id: 'steal_ru', text: 'Steal Russian Research', effects: { scores: { china_tech: +2, global_tech: +2, russia_tech: -1, global_tech: -1 } } }, { id: 'share', text: 'Collaborate', effects: { scores: { global_tech: +2 } } }] }
            ]
        },
        {
            id: 'ev_mothership',
            name: 'The Mothership Descends',
            description: 'The primary alien vessel enters the atmosphere. Global survival depends on our response.',
            image: '/scenarios/independence_day/images/ev_mothership.jpg',
            decisions: [
                { role: 'usa', text: 'Final Push?', options: [{ id: 'nuke', text: 'Launch all remaining Nukes', effects: { scores: { usa_survival: -1, global_tech: +3 } } }] },
                { role: 'russia', text: 'Dead Hand?', options: [{ id: 'activate', text: 'Activate Dead Hand', effects: { scores: { russia_survival: -1, global_tech: +2 } } }] }
            ]
        },
        // Endgame Evaluation
        {
            id: 'ev_endgame_trigger',
            name: '45 Minutes: The Final Stand',
            description: 'The alien weapon is firing. The global defense grid activates...',
            triggerEvents: [
                { id: 'ev_end_extinction', delayMs: 1000 },
                { id: 'ev_end_pyrrhic', delayMs: 1000 },
                { id: 'ev_end_supremacy', delayMs: 1000 }
            ]
        },
        {
            id: 'ev_end_extinction',
            name: 'Total Extinction',
            description: 'The global defense grid failed. Humanity was too fractured and technologically inferior to stop the mothership. The planet has been sterilized. Everyone loses.',
            isEndGame: true,
            conditions: { maxScores: { global_tech: 15 } }
        },
        {
            id: 'ev_end_pyrrhic',
            name: 'Pyrrhic Victory',
            description: 'The aliens were defeated, but the cost was too high. The Earth is a wasteland. Humanity survives, but there are no superpowers left.',
            isEndGame: true,
            conditions: { minScores: { global_tech: 16 }, maxScores: { usa_survival: 1, china_survival: 1, russia_survival: 1, eu_survival: 1, india_survival: 1, uk_survival: 1 } }
        },
        {
            id: 'ev_end_supremacy',
            name: 'Global Supremacy',
            image: '/scenarios/independence_day/images/ev_supremacy_victory.jpg',
            description: (state) => {
                const nations = ['usa', 'china', 'russia', 'eu', 'india', 'uk'];
                const displayNames = { usa: 'The United States', china: 'China', russia: 'Russia', eu: 'The European Union', india: 'India', uk: 'The United Kingdom' };
                let bestNation = '';
                let bestScore = -1;
                for (const n of nations) {
                    // Score logic: Survival is heavily weighted to prevent suiciding for tech
                    const survival = state.scores[`${n}_survival`] || 0;
                    if (survival <= 0) continue; // Dead nations can't win
                    const sum = survival * 2 + (state.scores[`${n}_tech`] || 0);
                    if (sum > bestScore) {
                        bestScore = sum;
                        bestNation = displayNames[n];
                    }
                }
                if (!bestNation) return "The aliens are defeated, but every major nation collapsed. Anarchy rules the ashes.";
                return `The aliens have been defeated! The Global Defense Grid successfully destroyed the mothership. As the dust settles, one nation stands above the rest, having preserved its infrastructure while acquiring vast alien technology. The new, undisputed global superpower is **${bestNation}**!`;
            },
            isEndGame: true,
            conditions: { minScores: { global_tech: 16 } } // If global tech is >= 16 and at least someone survived
        }
    ]
};
