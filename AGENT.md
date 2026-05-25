# UK Crisis Wargame – Agent Reference

## Core Concept

A real-time, locally hosted, multi-user crisis simulation with:

* Role-based players
* Shared map
* Events → decision tasks → effects
* Persistent assets (state only)

---

## Tech Stack

* Node.js + Express
* Socket.IO (real-time)
* Vanilla JS frontend
* Leaflet (map)
* In-memory state (no DB)

---

## Routes

* `/facilitator`
* `/display`
* `/?role=home|defence|foreign|media|cyber`

---

## Game State

```js
gameState = {
  scores: {
    uk_russia: 3,
    military_escalation: 2,
    civilian_stability: 3,
    uk_us: 2,
    uk_europe: 2,
    military_readiness: 2
  },
  events: [],
  decisionTasks: [],
  assets: [],
  players: []
}
```

---

## Events (Static)

* Have:

  * location
  * role-specific descriptions
  * decisionTemplates
  * optional triggerConditions (assets)

---

## Decision Tasks (Runtime)

Created from events.

Fields:

* id
* eventId
* role (`home`, `defence`, etc or `shared`)
* type (`role` or `shared`)
* text
* options[]
* status (`pending`, `submitted`, `escalated`, `resolved`)

---

## Assets (Persistent)

* Static location
* Simple state: `operational | reduced | destroyed`
* Used for conditions + effects only

```js
{
  id,
  name,
  location,
  state,
  tags: []
}
```

---

## Rules

### 1. Events create decision tasks

Never hardcode decisions outside events.

### 2. Decisions apply immediately

No voting system in MVP.

### 3. Assets are state only

No movement or tasking logic.

### 4. All logic is data-driven

Use:

* `triggerConditions`
* `requires`
* `effects`

---

## Real-Time Behaviour

Using Socket.IO:

* Event triggered → broadcast to all
* Role-specific data → filtered per client
* Decision tasks → sent per role
* Updates → broadcast globally

---

## Map

* Leaflet on ALL clients
* Show:

  * Events (temporary markers)
  * Assets (persistent markers)

---

## UI (All non-facilitator clients)

Layout:

* Top: score/status bar
* Left: map
* Right: info panel (event/asset details)

---

## Display Screen

* Same layout
* Shows:

  * Scores (as labels)
  * Event feed
  * Shared/escalated decisions

---

## Facilitator

* Trigger events
* Adjust scores
* View all state
* Resolve shared decisions

---

## Score Labels

1 = Stable
2 = Managed
3 = Strained
4 = Crisis
5 = Critical

---

## MVP Constraints

Do NOT implement:

* Auth
* Database
* Complex UI
* Asset behaviour
* Voting systems

---

## Goal

A playable system where:

* Events appear on map
* Roles receive different info
* Decisions can be made
* Scores update live

---

## Agent Git Workflow Rules

When making changes to this codebase, the AI Agent must follow this Git workflow:
1. **Use Branches:** Always create a new branch to segregate changes for any new feature, fix, or task (e.g., `feature/description` or `fix/description`). Do not work directly on the main branch.
2. **Commit Frequently:** Commit changes immediately after completing a logical step, file modification, or minor task. Provide clear, descriptive commit messages.
3. **Merge Upon Completion:** Once a feature or task has been fully implemented, verified, and completed, merge the feature branch back into the main branch.
4. **Maintain TODO.md:** Always review and update `TODO.md` when tasks are completed, reprioritized, or skipped to ensure the project roadmap is accurate.
