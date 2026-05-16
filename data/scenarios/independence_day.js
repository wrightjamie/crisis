module.exports = {
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
                image: '/images/events/ev_mothership.png',
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
                image: '/images/events/ev_alien_reinforcement.png',
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
                location: [0, 0],
                image: '/images/events/ev_city_destruction.png',
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
                image: '/images/events/ev_secret_weapon.png',
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
};
