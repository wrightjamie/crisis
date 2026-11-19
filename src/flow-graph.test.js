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
    FlowGraph.getActionTriggeredEvents({ effects: { triggerEvents: ['ev_3'], randomEvents: [{ event: 'ev_4' }] } }),
    ['ev_3', 'ev_4'],
    'Should collect manual action triggered events'
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

console.log('✅ FlowGraph unit tests passed successfully!');
