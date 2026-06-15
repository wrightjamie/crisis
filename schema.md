# UK Crisis Wargame - Data Schema

This document outlines the JSON structure for creating Scenarios, Events, and Decisions in `scenarios.js`.

## Scenario Object
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
    initialScores: {          // Key-value pairs of starting scores (1-5)
        "score_id": number
    },
    assets: [                 // Array of static map points/resources
        {
            id: "string",
            name: "string",
            location: [lat, lng],
            state: "string",  // e.g., 'operational', 'destroyed'
            tags: ["string"], // UI badges (e.g., 'military', 'cyber')
            image: "string",  // (Optional) URL path to asset image
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
        }
    }
}
```

## Variant Axis Object
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

## Event Template Object
Events define map incidents and generate decision tasks for players.

```javascript
{
    id: "string",             // Unique identifier referenced by triggers/unlocks
    name: "string",           // Display title
    stage: "string",          // (Optional) ID of the stage this belongs to
    description: "string",    // General description visible to everyone
    image: "string",          // (Optional) URL path to a dramatic, tactical image of the crisis
    location: [lat, lng],     // Where the marker drops on the map
    possibleLocations: [      // (Optional) Array of possible locations. If provided, server picks one randomly.
        [lat, lng], [lat, lng]
    ],
    repeatable: boolean,      // If false, the event moves to "Used" after being triggered once.
    
    // Advanced Logic (Optional)
    requiresUnlock: boolean,  // If true, this event is hidden from the Facilitator until a decision explicitly unlocks it.
    conditions: {             // The event can only be triggered if current scores meet these bounds
        minScores: { "score_id": number }, // E.g. { "global_panic": 4 }
        maxScores: { "score_id": number },
        assets: { "asset_id": "required_state" } // E.g. { "area51": "operational" }
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

## Decision Task Object
Presented to a specific role when an event is triggered.

```javascript
{
    role: "string",           // Which station receives this decision
    text: "string",           // The prompt/question
    options: [                // Array of possible answers
        {
            id: "string",
            text: "string",   // The button text
            conditions: {     // (Optional) If present, this option is hidden from the player when conditions are not met
                assets: { "asset_id": "required_state" },
                minScores: { "score_id": number },
                maxScores: { "score_id": number }
            },
            effects: {        // What happens when this is clicked
                
                // 1. Modify Global Scores
                scores: { "score_id": number }, // E.g., { "global_panic": +1, "human_resistance": -1 }
                
                // 2. Unlock Manual Events
                unlockEvents: ["event_id"], // Event IDs that become visible to the Facilitator
                
                // 3. Schedule Automatic Events
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

## Manual Action Object
Actions that players can trigger proactively from the "Actions" menu, independent of events.

```javascript
{
    id: "string",             // Unique identifier (e.g., 'act_nuke')
    name: "string",           // Display title
    description: "string",    // Description shown to players
    image: "string",          // (Optional) URL path to an image
    initiator: ["string"],    // Array of role IDs that can initiate this action
    requiresApprovalFrom: ["string"], // (Optional) Roles that must approve before it triggers
    conditions: {             // Requirements for this action to be available (or visible)
        minScores: { "score_id": number },
        maxScores: { "score_id": number },
        assets: { "asset_id": "required_state" }
    },
    effects: {                // What happens when this action is fully approved and triggered
        scores: { "score_id": number }, // E.g., { military_escalation: +2 }
        unlockEvents: ["event_id"],
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
