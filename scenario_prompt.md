**Prompt for Generating an In-Depth Wargame Scenario**

I need you to generate a highly detailed JSON scenario file for a real-time crisis wargame engine. The scenario is **[SCENARIO TITLE, e.g., The Cuban Missile Crisis]**.

The engine uses a specific schema to manage roles, scores, map assets, and events. I need you to create a massive, replayable scenario file featuring **Fog of War**, **3 distinct narrative threads**, and **time-based branching logic**.

**Core Requirements:**
1.  **Roles:** Create **[NUMBER]** roles divided into two competing factions: **[FACTION A]** and **[FACTION B]**. Include a "display" role for each faction that has no decisions but allows them to monitor the map (e.g., `faction_a_display`, `faction_b_display`).
2.  **Scoring:** Create 5 shared scoring metrics (1-5 scale) that act as a tug-of-war between the factions (e.g., `global_tension`, `faction_a_momentum`).
3.  **Fog of War:** Heavily utilize the `hiddenFrom: ["role_1", "role_2"]` attribute on events and decisions so that neither faction can see the other faction's intelligence or decisions until direct contact is made on the map.
4.  **Variant Axes:** Include 2 `variantAxes` that alter starting conditions (e.g., Weather, Intel Readiness) and apply `scoreModifiers`.
5.  **Manual Actions:** Provide 2-3 proactive manual actions inside `eventTemplates[]` marked with `isManualAction: true` and `initiator: [...]` that factions can trigger (e.g., "Request Reinforcements"). Include an `effects.randomEvents` array in one of them to simulate risk/reward. (Do **not** create a separate top-level `manualActions` array.)

**Event Structure (Crucial - Must Follow Exactly):**
1.  **Master Start Event:** Create a single event (`id: 'ev_start'`, `isOpeningEvent: true`) that triggers 3 distinct narrative thread events using `triggerEvents`. Space these threads out significantly (e.g., Thread 1 at `delayMs: 90000`, Thread 2 at `delayMs: 270000`, Thread 3 at `delayMs: 450000`). Every other event and manual action must trace back to this opening event (or use `autoTriggerOnConditions: true` with score/asset `conditions`).
2.  **Thread Depth:** For each of the 3 narrative threads, create a branching chain of 5-7 events (with cross-links forming an interconnected network).
    *   Every single `delayMs` in the `triggerEvents` array must be a minimum of **90000** (90 seconds) to give players time to discuss.
    *   Use the `probability` field (e.g., `probability: 0.7`) to ensure branches don't play out exactly the same way twice.
    *   Where appropriate, gate decision options on scores or asset status (`conditions: { minScores, maxScores, assetStates }`) and allow decision options to feed into multiple downstream events via `effects.triggerEvents`.
3.  **Facilitator Injects:** Create 4 specific events intended only for the Facilitator to balance the game if one team is winning. These must have `requiresUnlock: true` so they don't trigger automatically. Two should favor Faction A, and two should favor Faction B.
4.  **Endgame:** The final event must trigger 3 potential outcomes (`isEndGame: true`) based on conditions (e.g., Faction A Victory, Faction B Victory, Stalemate).

Ensure the output strictly adheres to a valid Javascript object format (no markdown formatting around the code block) so it can be directly saved as `scenario.js`.
