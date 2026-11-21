const assert = require('assert');
const FlowGraph = require('../public/js/flow-graph.js');

console.log('Running FlowGraph unit tests...');

// 1. Helper extraction tests
assert.deepStrictEqual(
    FlowGraph.getHelperTriggers({ triggerEvents: ['ev_2'] }),
    ['ev_2'],
    'Should read direct triggerEvents'
);
assert.deepStrictEqual(
    FlowGraph.getHelperTriggers({ effects: { triggerEvents: [{ id: 'ev_3', delayMs: 5000 }] } }),
    [{ id: 'ev_3', delayMs: 5000 }],
    'Should read nested effects.triggerEvents'
);
assert.deepStrictEqual(
    FlowGraph.getEventPrerequisites({ prerequisites: ['ev_1'], conditions: { prerequisites: ['ev_1', 'ev_2'] } }),
    ['ev_1', 'ev_2'],
    'Should deduplicate prerequisites across top-level and conditions'
);
assert.deepStrictEqual(
    FlowGraph.getActionPredecessorEvents({ conditions: { triggeredEvents: ['ev_1'], unlockedEvents: ['ev_2'] } }),
    ['ev_1', 'ev_2'],
    'Should collect manual action predecessor events'
);
assert.deepStrictEqual(
    FlowGraph.getActionTriggeredEvents({ effects: { triggerEvents: ['ev_3', { id: 'ev_5', delayMs: 5000, probability: 1.0 }], randomEvents: [{ event: 'ev_4' }, { id: 'ev_6', probability: 0.5 }] } }),
    ['ev_3', 'ev_5', 'ev_4', 'ev_6'],
    'Should collect manual action triggered events (both strings and objects)'
);

// 2. Layout computation test (left-to-right column progression & no overlaps)
const sampleEvents = [
    {
        id: 'ev_start',
        name: 'Opening Crisis',
        triggerEvents: [{ id: 'ev_branch_a', delayMs: 10000 }],
        decisions: [{
            role: 'home',
            text: 'Choose response',
            options: [
                { id: 'opt_1', text: 'Option 1', effects: { triggerEvents: ['ev_branch_b'] } },
                { id: 'opt_2', text: 'Option 2', effects: { triggerEvents: ['ev_end'] } }
            ]
        }]
    },
    { id: 'ev_branch_a', name: 'Branch A', prerequisites: ['ev_start'] },
    { id: 'ev_branch_b', name: 'Branch B' },
    { id: 'ev_end', name: 'End Game', isEndGame: true, prerequisites: ['ev_branch_a'] }
];

const sampleActions = [
    {
        id: 'act_recon',
        name: 'Recon Flight',
        conditions: { triggeredEvents: ['ev_start'] },
        effects: { triggerEvents: ['ev_end'] }
    }
];

const posMap = FlowGraph.computeLayout(sampleEvents, sampleActions, { forceRecalculate: true });
assert.strictEqual(posMap.size, 5, 'Should compute positions for all 4 events + 1 action');
assert(posMap.get('ev_start').x < posMap.get('ev_branch_a').x, 'Downstream branch A should be to the right of ev_start');
assert(posMap.get('ev_branch_a').x < posMap.get('ev_end').x, 'End game should be to the right of ev_branch_a');
assert(posMap.get('ev_start').x < posMap.get('act_recon').x, 'Manual action should be to the right of its predecessor');

// Verify saved positions are preserved when forceRecalculate is false
const savedPositions = {
    ev_start: { x: 100, y: 200 },
    ev_branch_a: { x: 500, y: 150 },
    ev_branch_b: { x: 500, y: 350 },
    ev_end: { x: 900, y: 250 },
    act_recon: { x: 500, y: 550 }
};
const preservedMap = FlowGraph.computeLayout(sampleEvents, sampleActions, { savedPositions, forceRecalculate: false });
assert.deepStrictEqual(preservedMap.get('ev_start'), { x: 100, y: 200 }, 'Should preserve saved node positions');
assert.deepStrictEqual(preservedMap.get('ev_end'), { x: 900, y: 250 }, 'Should preserve saved end-game position');

// 3. SVG edges & defs test
const defs = FlowGraph.getSvgDefsMarkup('fac-');
assert(defs.includes('id="fac-arrow-trigger"'), 'Defs should support markerPrefix');
assert(defs.includes('id="fac-arrow-action"'), 'Defs should include action marker');

const edgesSvg = FlowGraph.buildEdgesSvg(sampleEvents, sampleActions, posMap, {
    markerPrefix: 'fac-',
    getEdgeClass: (edge) => edge.optionId === 'opt_1' ? 'edge-chosen' : ''
});
assert(edgesSvg.includes('url(#fac-arrow-trigger)'), 'Should emit trigger edge');
assert(edgesSvg.includes('decision-edge edge-chosen'), 'Should apply custom getEdgeClass callback');
assert(edgesSvg.includes('prereq-edge'), 'Should emit prerequisite edge');
assert(edgesSvg.includes('action-unlock-edge'), 'Should emit manual action unlock edge');
assert(edgesSvg.includes('action-edge'), 'Should emit manual action trigger edge');

// 4. Nested condition operators (all / any / not), isOpeningEvent, and unlockEvents tests
const { checkConditions } = require('../public/js/shared.js');

const nestedOrAndObj = {
    conditions: {
        any: [
            { triggeredEvents: ['ev_a'] },
            { all: [{ triggeredEvents: ['ev_b'] }, { minScores: { tension: 4 } }] }
        ]
    }
};
assert.strictEqual(checkConditions(nestedOrAndObj, { tension: 1 }, [], [], ['ev_a']), true, 'A OR (B AND C) passes when A triggered');
assert.strictEqual(checkConditions(nestedOrAndObj, { tension: 3 }, [], [], ['ev_b']), false, 'A OR (B AND C) fails when B triggered but C fails');
assert.strictEqual(checkConditions(nestedOrAndObj, { tension: 4 }, [], [], ['ev_b']), true, 'A OR (B AND C) passes when B AND C pass');

const nestedAndOrObj = {
    conditions: {
        all: [
            { any: [{ triggeredEvents: ['ev_a'] }, { triggeredEvents: ['ev_b'] }] },
            { not: { triggeredEvents: ['ev_blocked'] } }
        ]
    }
};
assert.strictEqual(checkConditions(nestedAndOrObj, {}, [], [], ['ev_b']), true, '(A OR B) AND NOT blocked passes');
assert.strictEqual(checkConditions(nestedAndOrObj, {}, [], [], ['ev_b', 'ev_blocked']), false, '(A OR B) AND NOT blocked fails when blocked');

// FlowGraph extracts nested predecessors and respects isOpeningEvent + unlockEvents
assert.deepStrictEqual(
    FlowGraph.getEventPrerequisites({ id: 'ev_x', conditions: nestedOrAndObj.conditions }),
    ['ev_a', 'ev_b'],
    'FlowGraph should extract predecessors recursively from nested all/any conditions'
);
const openingEvents = [
    {
        id: 'ev_alpha',
        name: 'Opening',
        isOpeningEvent: true,
        decisions: [{ role: 'home', text: 'Go', options: [{ id: 'o1', text: 'Unlock', effects: { unlockEvents: ['ev_beta', 'act_gamma'] } }] }]
    },
    { id: 'ev_beta', name: 'Unlocked Event', requiresUnlock: true }
];
const openingActions = [{ id: 'act_gamma', name: 'Unlocked Action', requiresUnlock: true }];
const openPos = FlowGraph.computeLayout(openingEvents, openingActions, { forceRecalculate: true });
assert.strictEqual(openPos.get('ev_alpha').x, 60, 'isOpeningEvent should be placed in column 0');
assert(openPos.get('ev_beta').x > openPos.get('ev_alpha').x, 'Unlocked event should be downstream of unlocking event');
assert(openPos.get('act_gamma').x > openPos.get('ev_alpha').x, 'Unlocked action should be downstream of unlocking event');

console.log('✅ FlowGraph unit tests passed successfully!');
