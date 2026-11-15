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
* Visibility: `hidden: boolean` (default: false). Can be revealed or hidden via effects (`revealAssets`, `hideAssets`, `assetVisibilityChanges`).
* Used for conditions (`visibleAssets`, `hiddenAssets`, `assetVisibility`, `assets`) + effects only

```js
{
  id,
  name,
  location,
  state,
  hidden: false,
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

## UI Design System & Styling Rules

To prevent style duplication, visual inconsistency, and CSS bloat, all AI agents modifying or generating UI code MUST follow these rules:

1. **Single Source of Truth:**
   - Design tokens: `public/css/tokens.css`
   - Component classes & utilities: `public/css/style.css`
   - Canonical component catalog: `public/elements.html`

2. **No Ad-Hoc CSS or Inline Styles:**
   - NEVER add ad-hoc `<style>` tags or inline `style="..."` attributes to HTML or JS files.
   - NEVER create new CSS classes in `style.css` if an existing component class or utility combination (`.d-flex`, `.flex-col`, `.gap-sm`, `.mt-md`, `.btn-*`, `.form-control`) can achieve the layout.

3. **Color & Status Discipline:**
   - NEVER use hardcoded hex, RGB, or HSL color literals in stylesheets or templates.
   - Always reference CSS custom properties: `var(--bg-primary)`, `var(--text-secondary)`, `var(--accent-blue)`, etc.
   - Always use the 1–5 status tokens (`var(--status-1)` to `var(--status-5)` or `.bg-status-1`) for all status indicators.

4. **Component Reuse:**
   - Before writing any new UI markup, inspect `public/elements.html` and copy the canonical HTML structure for that element type (buttons, cards, forms, dialogs, badges).

5. **Maintaining the Library:**
   - If a genuinely new UI component or utility is approved and added, the agent MUST update `public/elements.html` to document and display the new element.

---

## Pre-Feature Quality Gate (Fallow Review)

To maintain code health and avoid accumulating structural debt, the AI Agent and developers MUST follow this quality review protocol:

1. **Pre-Feature Assessment:**
   - Before planning or building any major new feature, run:
     ```bash
     npm run fallow:check
     ```
     (or `npx fallow dead-code && npx fallow dupes`).
   - Also run the test suite to ensure a clean starting state:
     ```bash
     npm test
     ```
   - Verify that there are **0 dead-code issues** and **0 duplicate clone groups**. If any pre-existing issues or regressions exist, resolve them before layering new code on top.

2. **During & Post-Feature Verification:**
   - Run `npx fallow audit` to review files changed on the branch against `main`. Ensure no new dead code, duplicate code blocks, or unnecessary complexity were introduced.
   - Run `npx fallow` to confirm the full codebase remains clean and maintainability scores stay above 90.

---

## Agent Git Workflow Rules

When making changes to this codebase, the AI Agent must follow this Git workflow strictly:
1. **Pre-Planning Commits:** Before starting any new Implementation Plan or research phase, check `git status` and commit any outstanding changes on the current branch.
2. **Use Branches:** Always create and switch to a new branch (`git checkout -b feature/description`) *before* writing any code for a new feature or task. Do not work directly on `main`.
3. **Post-Execution Commits:** Immediately upon completing the Verification phase of an implementation plan, commit all modified files and merge the feature branch back into `main`.
4. **Maintain TODO.md:** Always review and update `TODO.md` when tasks are completed, reprioritized, or skipped. Include the `TODO.md` updates in the feature commit.
