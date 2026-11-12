# UK Crisis Wargame - Data Schema & Capabilities Guide

This document outlines both the high-level operational capabilities of the Crisis Wargame engine and the detailed JSON schema used to build scenarios, events, decisions, and assets in `data/scenarios/*/scenario.js`.

---

## 1. Overview: What Can Be Achieved With This Engine

The Crisis Wargame engine is a real-time, multi-role strategic crisis and wargaming platform. Built for civil contingency teams, defense colleges, secondary students (14+), and crisis simulation facilitators, it balances accessible mechanics with profound geopolitical, military, and institutional realism.

Unlike traditional linear simulations or static branching games, this engine provides an asynchronous, reactive sandbox driven by eight core gameplay pillars:

### I. Asymmetric Information & Departmental Roleplay
- **Separate Station Consoles**: Participants log in to dedicated stations (e.g., `defence`, `foreign`, `home`, `treasury`, `intelligence`, `media`).
- **Targeted Intelligence (Fog of War)**: Using `roleDescriptions`, `visibleTo`, and `hiddenFrom`, the Defence team can receive tactical military reconnaissance that the Foreign Office or Media cannot see.
- **Role Fallbacks**: When running exercises with smaller groups, `roleFallbacks` ensure tasks assigned to absent roles seamlessly route to an active player.

### II. Dynamic Reconnaissance & The "Sensor-to-Shooter" Loop
- **Hidden Adversary Assets**: Mobile surface-to-air missile batteries, submerged hostile submarines, clandestine sabotage cells, or naval task forces can start concealed (`hidden: true`).
- **Dynamic Discovery**: Players must coordinate intelligence, surveillance, and reconnaissance (ISR) flights or sonar sweeps to detect threats. Decisions and auto-effects use `revealAssets` to drop them onto the live tactical map.
- **Visibility-Gated Decisions**: Decision options or manual actions can require `visibleAssets: ['asset_id']`. Strike wings cannot target enemy missile sites or submarines until ISR teams have verified their coordinates.
- **Camouflage & Submersion**: Assets can disappear again via `hideAssets` or `assetVisibilityChanges` if enemy forces deploy deception or slip away.

### III. Inter-Agency Governance & Institutional Friction
- **Cabinet / COBR Approvals**: Players do not merely react to incoming emergencies; they can launch proactive initiatives from the "Actions" menu (`manualActions`).
- **Multi-Ministerial Sign-Off**: High-stakes initiatives (e.g., cyber counter-offensives, military mobilisations, secret diplomatic backchannels) can require authorization via `requiresApprovalFrom`. If the Foreign Office requests an allied strike, Defence or the Cabinet must approve or veto.
- **Contradictory Pressures**: Every choice carries trade-offs tracked across multi-dimensional metrics (e.g., `military_escalation`, `civilian_stability`, `allied_trust`, `national_budget`).

### IV. Atmospheric Immersion & The Command Wall COP
- **The Display Terminal**: A station logged in as `role: 'display'` functions as the central Command Operations Center wall display, rendering the full operational picture.
- **Sound Alerts**: Web Audio API synthesis produces distinctive acoustic cues without external audio dependencies:
  - `klaxon`: Emergency air-raid sirens and fast-jet intercept scrambles.
  - `explosion`: Deep rumbling explosions for airstrikes, missile impacts, and drone attacks.
  - `sonar`: Submarine active acoustic pings for maritime/underwater incidents.
  - `teletype`: High-tempo mechanical ticker clicks for breaking intelligence flashes and cyber dispatches.
  - `alert`: Dual-tone operational chime for standard event arrivals.
- **Room Management**: Audio plays **only** on the display terminal, keeping player desks quiet, and includes an on-screen mute/unmute toggle.

### V. Timed Injects & Operational Pressure
- **Ticking Clocks**: Decision tasks can carry a `timeLimitMs` countdown.
- **Default Standing Orders**: If the crisis team is paralyzed by debate and the clock runs out, `defaultOptionId` fires automatically (e.g., local commanders follow default rules of engagement), penalizing indecision.

### VI. Multi-Stage Pacing & Facilitator Control
- **Narrative Arc**: Scenarios progress through defined `stages` (e.g., *Stage 1: Tension & Reconnaissance* $\rightarrow$ *Stage 2: Skirmishes & Cyber War* $\rightarrow$ *Stage 3: Kinetic Climax* $\rightarrow$ *Stage 4: Ceasefire & Termination*).
- **Facilitator Oversight**: The Facilitator console displays upcoming events, stage gates, prerequisites, and condition warnings (e.g., alerting why an event is waiting for a score or revealed asset), allowing manual injects or auto-scheduled delivery.

### VII. Infinite Replayability via Variant Axes
- **Shifting Starting Baselines**: Every run can explore different geopolitical realities. `variantAxes` stack initial modifiers to scores, briefings, and asset locations (e.g., US isolationism vs forward posture, stable domestic economy vs cost-of-living crisis, carrier fleet deployed abroad vs in home waters).

### VIII. Generative AI Intelligence Briefings
- **Living SITREPs**: Integrated with Google Gemini models, `aiConfig` analyzes current scores, recent decisions, and role context to generate classified intelligence briefings on demand for each role, summarizing the evolving state of the crisis.

---

## 2. Common Scenario Design Patterns & Recipes

### Pattern 1: The ISR / Recon-to-Strike Chain
1. Define a hostile asset in `scenario.assets` with `hidden: true`:
   ```javascript
   { id: "a_enemy_sam", name: "Mobile SAM Battery", location: [35.2, 35.8], state: "operational", hidden: true }
   ```
2. Present a recon event where players choose to fly an ISR aircraft:
   ```javascript
   // In decision option effects:
   effects: {
       revealAssets: ["a_enemy_sam"],
       scores: { situational_awareness: 2 }
   }
   ```
3. Restrict the airstrike option so it can only be selected once the target has been spotted:
   ```javascript
   // In strike decision option:
   conditions: {
       visibleAssets: ["a_enemy_sam"]
   },
   effects: {
       assetStateChanges: { "a_enemy_sam": "destroyed" },
       scores: { air_control: 2 }
   }
   ```

### Pattern 2: Inter-Agency Authorization Loop
A minister initiates a bold policy, but needs Cabinet sign-off:
```javascript
{
    id: "act_special_forces",
    name: "Deploy Special Forces on Covert Raid",
    initiator: ["defence"],
    requiresApprovalFrom: "foreign", // Foreign Office must weigh diplomatic blowback
    effects: {
        scores: { military_readiness: 2, uk_russia: -2 }
    }
}
```

### Pattern 3: Escalation Threshold Injects
Events trigger automatically or unlock only when regional tensions reach a boiling point:
```javascript
{
    id: "ev_kinetic_strike",
    name: "Cruise Missile Strike on Logistics Hub",
    sound: "explosion",
    conditions: {
        minScores: { military_escalation: 4 },
        visibleAssets: ["a_rus_sub_faslane"]
    }
}
```

---

## 3. Scenario Object Reference
The top-level object representing a fully playable module.

```javascript
{
    id: "string",             // Unique identifier (e.g., 'uk_crisis')
    name: "string",           // Display name
    description: "string",    // Short summary shown on the Facilitator holding screen
    mapConfig: {
        center: [lat, lng],   // Leaflet map center coordinates [Number, Number]
        zoom: number          // Initial zoom level (1-19)
    },
    roles: ["string"],        // Array of station IDs (e.g., 'home', 'defence', 'display'). 'display' and 'facilitator' are implicitly supported.
    roleNames: {              // Optional friendly names for roles
        "role_id": "string"
    },
    minUsers: number,         // Minimum human players required (e.g., 2)
    mandatoryRoles: ["string"], // Array of role IDs that are essential for this scenario
    roleFallbacks: {          // Fallback array in case a role's specific decision task lacks an active player
        "role_id": ["fallback_role_1", "fallback_role_2"]
    },
    initialScores: {          // Key-value pairs of starting scores (default 1-5, or defined in scoreConfigs)
        "score_id": number
    },
    scoreConfigs: {           // (Optional) Advanced configuration for specific scores
        "score_id": {
            min: number,              // Minimum allowed value
            max: number,              // Maximum allowed value
            unit: "string",           // (Optional) Display unit, e.g., '£m', '%'
            visibleToPlayers: boolean,// If false, hidden from standard players
            promptAI: boolean         // If true, include in AI summaries
        }
    },
    assets: [                 // Array of static map points/resources
        {
            id: "string",
            name: "string",
            location: [lat, lng],
            state: "string",  // Custom state (e.g., 'operational', 'damaged', 'deployed')
            hidden: boolean,  // (Optional, default false) If true, hidden from map and station panels until revealed by an effect/action
            tags: ["string"], // UI badges (e.g., 'military', 'cyber')
            image: "string",  // (Optional) Image ID from data/image-library.json (e.g., 'type_45_destroyer')
            briefing: "string"// (Optional) Intelligence brief for the asset
        }
    ],
    briefings: {              // Opening briefing text shown when a player selects their role
        _general: "string",   // Shown to ALL roles (situation overview)
        "role_id": "string"   // Shown only to that specific role
    },
    variantAxes: [            // Independent axes of variability (see Variant Axis Object)
        // ... See below ...
    ],
    stages: [                 // Array of stages to group events and control pacing
        {
            id: "string",     // e.g., 'stage_1'
            name: "string"    // e.g., 'Tension & Sabotage'
        }
    ],
    eventTemplates: [         // Array of all events (flat structure, no nesting)
        // ... See Event Template Object ...
    ],
    manualActions: [          // Actions players can trigger proactively
        // ... See Manual Action Object ...
    ],
    aiConfig: {               // AI Configuration for scenario summaries and intelligence briefings
        systemPrompt: "string", // System prompt governing AI behavior and writing style
        scoreLabels: {        // Human-readable labels for the 1-5 score scale
            number: "string"  // e.g., 1: "Critical"
        },
        roleContexts: {       // Guidance for the AI on what each role focuses on
            "role_id": "string"
        },
        scores: {             // Required mapping of score IDs to their AI configuration
            "score_id": {
                label: "string",    // Display label for the score (e.g. "Public Panic")
                subject: "string",  // Lowercase subject used in sentences (e.g. "public panic")
                isPlural: boolean,  // True if subject takes plural verbs (e.g. "ammo reserves are")
                roles: ["string"]   // Which roles this score is relevant to
            }
        }
    }
}
```

## 4. Variant Axis Object
Each axis represents an independent opening condition. The facilitator picks one option per axis. All selections stack additively.

```javascript
{
    id: "string",             // Unique identifier (e.g., 'pow_location')
    name: "string",           // Display label (e.g., 'HMS Prince of Wales Location')
    options: [
        {
            id: "string",
            name: "string",           // Button label (e.g., 'Deployed to RIMPAC')
            briefingText: "string",   // General text shown to all roles in the briefing
            roleBriefings: {          // Role-specific briefing text (same pattern as roleDescriptions)
                "role_id": "string"
            },
            scoreModifiers: {         // Additive deltas applied to initialScores (clamped 1-5)
                "score_id": number    // E.g., { "military_readiness": -1 }
            },
            assetModifiers: [         // Assets merged by ID (matching IDs replaced, new IDs appended)
                { id, name, location, state, tags }
            ]
        }
    ]
}
```

## 5. Event Template Object
Events define map incidents and generate decision tasks for players.

```javascript
{
    id: "string",             // Unique identifier referenced by triggers/unlocks
    name: "string",           // Display title
    stage: "string",          // (Optional) ID of the stage this belongs to
    description: "string",    // General description visible to everyone
    image: "string",          // (Optional) Image ID from data/image-library.json (e.g., 'ev_cyber_london')
    location: [lat, lng],     // Where the marker drops on the map
    possibleLocations: [      // (Optional) Array of possible locations. If provided, server picks one randomly.
        [lat, lng], [lat, lng]
    ],
    repeatable: boolean,      // If false, the event moves to "Used" after being triggered once.
    sound: "string",          // (Optional) Sound effect triggered on 'display' role: 'klaxon' | 'explosion' | 'sonar' | 'teletype' | 'alert'
    
    // Advanced Logic (Optional)
    requiresUnlock: boolean,  // If true, this event is hidden from the Facilitator until a decision explicitly unlocks it.
    visibleTo: ["string"],    // (Optional) Array of roles that can see this event. If used, the 'display' role is also hidden from it.
    hiddenFrom: ["string"],   // (Optional) Array of roles that cannot see this event. If used, the 'display' role is also hidden from it.
    conditions: {             // Requirements for this event to be available/triggerable
        minScores: { "score_id": number }, // E.g. { "global_panic": 4 }
        maxScores: { "score_id": number },
        assets: { "asset_id": "required_state" }, // E.g. { "area51": "operational" }
        visibleAssets: ["asset_id"],      // Asset(s) that must currently be visible/revealed
        hiddenAssets: ["asset_id"],       // Asset(s) that must currently be hidden/undetected
        assetVisibility: { "asset_id": boolean }, // Specific visibility: true=visible, false=hidden
        unlockedEvents: ["event_id"],     // Event IDs that must have been unlocked
        triggeredEvents: ["event_id"],    // Event IDs that must have already triggered
        activeRoles: ["role_id"],         // All of these roles must be active players in the session
        anyActiveRoles: ["role_id"]       // At least one of these roles must be active players in the session
    },
    
    autoEffects: {            // (Optional) Immediate effects applied as soon as the event triggers (e.g. revealing an asset upon detection)
        revealAssets: ["asset_id"],       // Reveals previously hidden asset(s) on map and station panels
        hideAssets: ["asset_id"],         // Hides visible asset(s)
        assetVisibilityChanges: { "asset_id": boolean },
        assetStateChanges: { "asset_id": "new_state" },
        scores: { "score_id": number },
        unlockEvents: ["event_id"]
    },
    
    facilitatorNotes: "string", // Secret context only shown in the Facilitator's info panel before triggering
    
    roleDescriptions: {       // Secret intelligence shown only to specific roles
        "role_id": "string"   // E.g., home: "Classified report..."
    },
    decisions: [              // Array of choices presented to roles
        // ... See Decision Task Object ...
    ]
}
```

## 6. Decision Task Object
Presented to a specific role when an event is triggered.

```javascript
{
    role: "string",           // Which station receives this decision
    visibleTo: ["string"],    // (Optional) Array of roles that can see this decision is pending or resolved.
    hiddenFrom: ["string"],   // (Optional) Array of roles that cannot see this decision is pending or resolved.
    text: "string",           // The prompt/question
    timeLimitMs: number,      // (Optional) Auto-resolve the task after this many milliseconds
    defaultOptionId: "string",// (Optional) The ID of the option chosen when time limit expires
    options: [                // Array of possible answers
        {
            id: "string",
            text: "string",   // The button text
            conditions: {     // (Optional) If present, this option is hidden from the player when conditions are not met
                assets: { "asset_id": "required_state" },
                visibleAssets: ["asset_id"],      // Asset(s) that must currently be visible/revealed (e.g. target must be detected before strike option appears)
                hiddenAssets: ["asset_id"],       // Asset(s) that must currently be hidden/undetected
                assetVisibility: { "asset_id": boolean }, // Specific visibility: true=visible, false=hidden
                minScores: { "score_id": number },
                maxScores: { "score_id": number },
                unlockedEvents: ["event_id"],
                triggeredEvents: ["event_id"],
                activeRoles: ["role_id"],
                anyActiveRoles: ["role_id"]
            },
            effects: {        // What happens when this is clicked
                
                // 1. Modify Global Scores
                scores: { "score_id": number }, // E.g., { "global_panic": +1, "human_resistance": -1 }
                
                // 2. Unlock Manual Events
                unlockEvents: ["event_id"], // Event IDs that become visible to the Facilitator
                
                // 3. Reveal or Hide Assets (ISR Recon / Submersion / Camouflage)
                revealAssets: ["asset_id"], // Array of asset IDs to reveal on map and stations
                hideAssets: ["asset_id"],   // Array of asset IDs to hide from map and stations
                assetVisibilityChanges: {
                    "asset_id": boolean    // Explicit visibility toggle: true = visible, false = hidden
                },

                // 4. Update Asset States
                assetStateChanges: {
                    "asset_id": "new_state_string" // E.g., { "power_grid": "offline" }
                },

                // 5. Schedule Automatic Events
                triggerEvents: [ 
                    { 
                        id: "event_id",     // The event to trigger
                        delayMs: number,    // Milliseconds to wait before triggering
                        probability: number // 0.0 to 1.0 chance of this happening
                    } 
                ]
            }
        }
    ]
}
```

## 7. Manual Action Object
Actions that players can trigger proactively from the "Actions" menu, independent of events.

```javascript
{
    id: "string",             // Unique identifier (e.g., 'act_nuke')
    name: "string",           // Display title
    description: "string",    // Description shown to players
    image: "string",          // (Optional) Image ID from data/image-library.json (e.g., 'act_cyber_offensive')
    initiator: ["string"],    // Array of role IDs that can initiate this action
    requiresApprovalFrom: ["string"], // (Optional) Roles that must approve before it triggers
    conditions: {             // Requirements for this action to be available (or visible)
        minScores: { "score_id": number },
        maxScores: { "score_id": number },
        assets: { "asset_id": "required_state" },
        visibleAssets: ["asset_id"],      // Asset(s) that must currently be visible/revealed
        hiddenAssets: ["asset_id"],       // Asset(s) that must currently be hidden/undetected
        assetVisibility: { "asset_id": boolean }, // Specific visibility: true=visible, false=hidden
        unlockedEvents: ["event_id"],
        triggeredEvents: ["event_id"],
        activeRoles: ["role_id"],
        anyActiveRoles: ["role_id"]
    },
    effects: {                // What happens when this action is fully approved and triggered
        scores: { "score_id": number }, // E.g., { military_escalation: +2 }
        unlockEvents: ["event_id"],
        revealAssets: ["asset_id"],     // Reveals previously hidden asset(s)
        hideAssets: ["asset_id"],       // Hides asset(s)
        assetVisibilityChanges: {
            "asset_id": boolean
        },
        assetStateChanges: {
            "asset_id": "new_state_string"
        },
        triggerEvents: [
            {
                id: "event_id",
                delayMs: number,
                probability: number
            }
        ],
        randomEvents: [       // Selects one event to trigger based on weight
            { id: "event_id", weight: number, effects: { scores: { "score_id": number } } }
        ]
    }
}
```

## 8. Shared Image Library (`data/image-library.json`)
All scenario images live in `public/images/library/` and are cataloged in `data/image-library.json`. Scenarios reference images by their `id` (e.g., `image: "type_45_destroyer"`), which `src/image-library.js` resolves to the serving URL and metadata at load time.

```json
{
    "type_45_destroyer": {
        "id": "type_45_destroyer",
        "file": "/images/library/type_45_destroyer.png",
        "title": "Type 45 Daring-Class Air Defence Destroyer",
        "description": "Royal Navy Type 45 destroyer with SAMPSON radar mast cutting through stormy seas to provide fleet air defence.",
        "tags": ["asset", "military", "naval", "maritime", "air-defence", "destroyer", "uk", "royal-navy"]
    }
}
```
- `tags` is a freeform, non-restrictive array of strings. Any new tags or tag categories added to `data/image-library.json` are dynamically exposed via `GET /api/images/tags` and searchable via `GET /api/images?tag=...&q=...`.
