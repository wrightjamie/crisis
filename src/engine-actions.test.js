const assert = require('assert');
const GameEngine = require('./engine');
const scenarios = require('../data/scenarios');

// Simple test suite for manual actions authorization flows
console.log("Running engine manual actions tests...");

const engine = new GameEngine();

// Mock scenario for testing
const testScenario = {
    id: 'test_scenario',
    name: 'Test Scenario',
    roles: ['home', 'defence', 'foreign'],
    initialScores: { uk_us: 3, military_readiness: 3 },
    assets: [],
    eventTemplates: [
        {
            id: 'test_immediate_action',
            isManualAction: true,
            name: 'Immediate Action',
            initiator: ['home'],
            effects: { scores: { uk_us: 1 } }
        },
        {
            id: 'test_approval_action',
            isManualAction: true,
            name: 'Approval Action',
            initiator: ['foreign'],
            requiresApprovalFrom: 'home',
            effects: { scores: { uk_us: -1 } }
        },
        {
            id: 'test_array_approval_action',
            isManualAction: true,
            name: 'Array Approval Action',
            initiator: ['defence', 'foreign'],
            requiresApprovalFrom: ['defence', 'foreign'],
            effects: { scores: { military_readiness: 1 } }
        },
        {
            id: 'test_active_roles_action',
            isManualAction: true,
            name: 'Active Roles Action',
            initiator: ['home'],
            conditions: { activeRoles: ['defence'] },
            effects: { scores: { uk_us: 1 } }
        },
        {
            id: 'test_any_active_roles_action',
            isManualAction: true,
            name: 'Any Active Roles Action',
            initiator: ['home'],
            conditions: { anyActiveRoles: ['defence', 'foreign'] },
            effects: { scores: { uk_us: 1 } }
        }
    ],
    scoreConfigs: {
        budget: { min: 0, max: 1000, unit: 'm', initial: 100 }
    }
};

// Temporarily inject our test scenario
scenarios.push(testScenario);

function resetEngine() {
    engine.gameState = {
        status: 'active',
        scenarioId: 'test_scenario',
        scenarioConfig: testScenario,
        roles: ['home', 'defence', 'foreign'],
        scores: { uk_us: 3, military_readiness: 3, budget: 100 },
        assets: [{ id: 'test_asset', name: 'Test Asset', location: [0,0], state: 'operational', tags: [] }],
        events: [],
        decisionTasks: [],
        unlockedEvents: [],
        scheduledEvents: []
    };
}

// Test 1: Immediate Execution (No approval required)
resetEngine();
let result = engine.triggerManualAction('test_immediate_action', 'home');
assert.strictEqual(result, true, "Immediate action should return true");
assert.strictEqual(engine.gameState.scores.uk_us, 4, "Immediate action effects should be applied immediately");
assert.strictEqual(engine.gameState.decisionTasks.length, 0, "No decision tasks should be created");
console.log("✅ Immediate execution test passed.");

// Test 2: Approval Required (Wait for approver)
resetEngine();
result = engine.triggerManualAction('test_approval_action', 'foreign');
assert.strictEqual(result, true, "Approval action should return true when initiated");
assert.strictEqual(engine.gameState.scores.uk_us, 3, "Effects should NOT be applied immediately");
assert.strictEqual(engine.gameState.decisionTasks.length, 1, "A decision task should be created");
assert.strictEqual(engine.gameState.decisionTasks[0].role, 'home', "Task should be assigned to the approver (home)");

// Resolve the task (Approve)
const taskId = engine.gameState.decisionTasks[0].id;
engine.resolveTask(taskId, 'approve');
assert.strictEqual(engine.gameState.scores.uk_us, 2, "Effects should be applied after approval");
console.log("✅ Single approver flow test passed.");

// Test 3: Array Approval Required (Foreign initiates, Defence must approve)
resetEngine();
result = engine.triggerManualAction('test_array_approval_action', 'foreign');
assert.strictEqual(result, true, "Array approval action should return true when initiated");
assert.strictEqual(engine.gameState.decisionTasks.length, 1, "A decision task should be created");
assert.strictEqual(engine.gameState.decisionTasks[0].role, 'defence', "Task should be assigned to the NON-initiator (defence)");

// Resolve the task (Veto)
const arrayTaskId = engine.gameState.decisionTasks[0].id;
engine.resolveTask(arrayTaskId, 'veto');
assert.strictEqual(engine.gameState.scores.military_readiness, 3, "Effects should NOT be applied after veto");
console.log("✅ Array approver flow test passed.");

// --- New Tests for Engine.js Complex Functions ---

console.log("Testing validateScenarioStart...");
resetEngine();
engine.connectedClients = { 'socket1': 'home', 'socket2': 'defence' }; // Active roles: home, defence

// Modify scenario temporarily
const s = scenarios.find(x => x.id === 'test_scenario');
s.minUsers = 3;
s.mandatoryRoles = ['home'];

let vResult = engine.validateScenarioStart('test_scenario');
assert.strictEqual(vResult.valid, false, "Should fail if not enough users");

s.minUsers = 2;
s.mandatoryRoles = ['foreign'];
vResult = engine.validateScenarioStart('test_scenario');
assert.strictEqual(vResult.valid, false, "Should fail if mandatory role missing");

s.mandatoryRoles = ['home'];
vResult = engine.validateScenarioStart('test_scenario');
assert.strictEqual(vResult.valid, true, "Should succeed with enough users and mandatory roles");
console.log("✅ validateScenarioStart tests passed.");

console.log("Testing setStage...");
resetEngine();
engine.gameState.scenarioConfig = { stages: [{name: "Stage 1"}, {name: "Stage 2"}] };
let stageResult = engine.setStage(1);
assert.strictEqual(stageResult, true, "Should be able to set valid stage");
assert.strictEqual(engine.gameState.currentStageIndex, 1, "Stage index should be updated");

stageResult = engine.setStage(5);
assert.strictEqual(stageResult, true, "Setting out of bounds stage should cap it");
assert.strictEqual(engine.gameState.currentStageIndex, 1, "Stage index should be capped to max");

engine.gameState.status = 'ended';
stageResult = engine.setStage(0);
assert.strictEqual(stageResult, false, "Should fail if not in active or lobby state");
console.log("✅ setStage tests passed.");

// --- New Tests for Asset States and Custom Scores ---
console.log("Testing new asset state and score features...");
resetEngine();
engine.applyEffects({
    assetStateChanges: { 'test_asset': 'damaged' },
    scores: { uk_us: 10, budget: 1500 }
});
assert.strictEqual(engine.gameState.assets[0].state, 'damaged', "Asset state should change to 'damaged'");
assert.strictEqual(engine.gameState.scores.uk_us, 5, "Legacy score without config should clamp to 5");
assert.strictEqual(engine.gameState.scores.budget, 1000, "Custom score should clamp to max from config");

engine.applyEffects({
    scores: { uk_us: -10, budget: -1500 }
});
assert.strictEqual(engine.gameState.scores.uk_us, 1, "Legacy score should clamp to 1");
assert.strictEqual(engine.gameState.scores.budget, 0, "Custom score should clamp to min from config");
console.log("✅ Asset state and custom score tests passed.");

// --- New Tests for Hidden / Revealed Assets ---
console.log("Testing hidden and revealed asset effects...");
resetEngine();
engine.gameState.assets.push({
    id: 'hidden_test_asset',
    name: 'Hidden Test Asset',
    location: [50, 0],
    state: 'operational',
    hidden: true,
    tags: []
});
assert.strictEqual(engine.gameState.assets[1].hidden, true, "Asset should initially be hidden");

// Reveal asset via revealAssets
engine.applyEffects({ revealAssets: ['hidden_test_asset'] });
assert.strictEqual(engine.gameState.assets[1].hidden, false, "Asset should now be revealed (hidden === false)");

// Hide asset via hideAssets
engine.applyEffects({ hideAssets: ['hidden_test_asset'] });
assert.strictEqual(engine.gameState.assets[1].hidden, true, "Asset should be hidden again (hidden === true)");

// Toggle visibility via assetVisibilityChanges
engine.applyEffects({ assetVisibilityChanges: { 'hidden_test_asset': true, 'test_asset': false } });
assert.strictEqual(engine.gameState.assets[1].hidden, false, "Asset should be visible via assetVisibilityChanges");
assert.strictEqual(engine.gameState.assets[0].hidden, true, "Test asset should be hidden via assetVisibilityChanges");

// Test conditions with visibleAssets and hiddenAssets
const { checkConditions: testCheckConditions } = require('../public/js/shared.js');
assert.strictEqual(testCheckConditions({ conditions: { visibleAssets: ['hidden_test_asset'] } }, engine.gameState.scores, engine.gameState.assets), true);
assert.strictEqual(testCheckConditions({ conditions: { visibleAssets: ['test_asset'] } }, engine.gameState.scores, engine.gameState.assets), false);
assert.strictEqual(testCheckConditions({ conditions: { hiddenAssets: ['test_asset'] } }, engine.gameState.scores, engine.gameState.assets), true);
assert.strictEqual(testCheckConditions({ conditions: { hiddenAssets: ['hidden_test_asset'] } }, engine.gameState.scores, engine.gameState.assets), false);
assert.strictEqual(testCheckConditions({ conditions: { assetVisibility: { 'hidden_test_asset': true, 'test_asset': false } } }, engine.gameState.scores, engine.gameState.assets), true);
assert.strictEqual(testCheckConditions({ conditions: { assetVisibility: { 'hidden_test_asset': false } } }, engine.gameState.scores, engine.gameState.assets), false);

// Test event-window conditions (triggeredEvents + notTriggeredEvents)
assert.strictEqual(
    testCheckConditions({ conditions: { triggeredEvents: ['ev_open'], notTriggeredEvents: ['ev_close'] } }, engine.gameState.scores, engine.gameState.assets, [], []),
    false,
    "Action should be locked before triggering event fires"
);
assert.strictEqual(
    testCheckConditions({ conditions: { triggeredEvents: ['ev_open'], notTriggeredEvents: ['ev_close'] } }, engine.gameState.scores, engine.gameState.assets, [], ['ev_open']),
    true,
    "Action should unlock once triggering event fires and closing event has not fired"
);
assert.strictEqual(
    testCheckConditions({ conditions: { triggeredEvents: ['ev_open'], notTriggeredEvents: ['ev_close'] } }, engine.gameState.scores, engine.gameState.assets, [], ['ev_open', 'ev_close']),
    false,
    "Action should close again once closing/outcome event fires"
);

console.log("✅ Hidden and revealed asset tests passed.");

// --- New Tests for Timed Decisions ---
console.log("Testing timed decisions...");
resetEngine();
const decTask = {
    role: 'home',
    text: 'Decide quickly',
    timeLimitMs: 500, // 500ms
    defaultOptionId: 'opt2',
    options: [
        { id: 'opt1', text: 'Option 1' },
        { id: 'opt2', text: 'Default Option', effects: { scores: { uk_us: 1 } } }
    ]
};

// Mock the trigger to inject the task
const mockEvent = { id: 'evt_1', templateId: 't1' };
engine.gameState.events.push(mockEvent);
const task = {
    id: `task_timed_1`,
    eventId: mockEvent.id,
    role: decTask.role,
    text: decTask.text,
    options: decTask.options,
    status: 'pending',
    timeLimitMs: decTask.timeLimitMs,
    defaultOptionId: decTask.defaultOptionId,
    startTime: Date.now() - 600 // Simulate time expired
};
engine.gameState.decisionTasks.push(task);

let stateUpdated = false;
engine.startSchedulerLoop(() => { stateUpdated = true; });

// Wait a bit for scheduler to run (it runs every 1000ms, but we can manually force it here for sync testing)
engine.stopSchedulerLoop(); // stop it right away so we don't hang
const now = Date.now();
for (const t of engine.gameState.decisionTasks) {
    if (t.status === 'pending' && t.timeLimitMs !== undefined) {
        if (now >= t.startTime + t.timeLimitMs) {
            engine.resolveTask(t.id, t.defaultOptionId);
        }
    }
}

assert.strictEqual(task.status, 'resolved', "Timed task should be resolved");
assert.strictEqual(task.selectedOption, 'opt2', "Timed task should use default option");
assert.strictEqual(engine.gameState.scores.uk_us, 4, "Default option effects should be applied");
console.log("✅ Timed decisions tests passed.");

// --- New Tests for activeRoles and anyActiveRoles ---
console.log("Testing activeRoles conditions...");
resetEngine();
engine.connectedClients = { 'socket1': 'home' }; // Only home is connected
result = engine.triggerManualAction('test_active_roles_action', 'home');
assert.strictEqual(result, false, "Should fail because defence is not active");

engine.connectedClients = { 'socket1': 'home', 'socket2': 'defence' };
result = engine.triggerManualAction('test_active_roles_action', 'home');
assert.strictEqual(result, true, "Should succeed because defence is active");
assert.strictEqual(engine.gameState.scores.uk_us, 4, "Effect should be applied");

resetEngine();
engine.connectedClients = { 'socket1': 'home' }; // Only home is connected
result = engine.triggerManualAction('test_any_active_roles_action', 'home');
assert.strictEqual(result, false, "Should fail because neither defence nor foreign are active");

engine.connectedClients = { 'socket1': 'home', 'socket2': 'foreign' };
result = engine.triggerManualAction('test_any_active_roles_action', 'home');
assert.strictEqual(result, true, "Should succeed because foreign is active");
console.log("✅ activeRoles conditions tests passed.");

console.log("Testing event deduplication and pause/resume...");
resetEngine();
const tutorialScenario = scenarios.find(s => s.id === 'tutorial');
if (tutorialScenario && tutorialScenario.eventTemplates.length >= 2) {
    engine.gameState.scenarioId = 'tutorial';
    engine.gameState.scenarioConfig = tutorialScenario;
    const e1 = tutorialScenario.eventTemplates[0];
    engine.triggerScenarioEvent(e1.id);
    assert.strictEqual(engine.gameState.events.length, 1, "First trigger should succeed");

    const duplicateTrigger = engine.triggerScenarioEvent(e1.id);
    assert.strictEqual(duplicateTrigger, false, "Duplicate trigger of non-repeatable event should be rejected");
    assert.strictEqual(engine.gameState.events.length, 1, "Event count should still be 1");

    const e2 = tutorialScenario.eventTemplates[1];
    engine.gameState.scheduledEvents.push({
        uuid: 'test_se_1',
        templateId: e2.id,
        triggerTimeMs: Date.now() + 60000,
        paused: false
    });
    assert.strictEqual(engine.gameState.scheduledEvents.length, 1);
    engine.triggerScenarioEvent(e2.id);
    assert.strictEqual(engine.gameState.events.length, 2);
    assert.strictEqual(engine.gameState.scheduledEvents.length, 0, "Scheduled event should be cancelled when event triggers");

    // Pause / Resume test
    engine.pauseGame(true);
    assert.strictEqual(engine.isPaused, true);
    assert.strictEqual(engine.isManualPause, true);
    assert.strictEqual(engine.gameState.isPaused, true);

    engine.resumeGame();
    assert.strictEqual(engine.isPaused, false);
    assert.strictEqual(engine.isManualPause, false);
    assert.strictEqual(engine.gameState.isPaused, false);
    console.log("✅ Event deduplication and pause/resume tests passed.");

    // Testing Variant Axes and Modifiers (BR-37)
    testScenario.variantAxes = [
        {
            id: 'weather_conditions',
            name: 'Weather Conditions',
            options: [
                {
                    id: 'severe_storm',
                    name: 'Severe Storm',
                    briefingText: 'A massive storm front has rolled in.',
                    scoreModifiers: { uk_us: 1, military_readiness: -1 },
                    assetModifiers: [
                        { id: 'test_asset', state: 'damaged', hidden: true },
                        { id: 'new_support_unit', name: 'Support Unit', state: 'deployed' }
                    ]
                }
            ]
        }
    ];

    testScenario.assets = [{ id: 'test_asset', name: 'Test Asset', location: [0,0], state: 'operational', tags: [] }];
    engine.createLobby('test_scenario', { weather_conditions: 'severe_storm' });

    assert.strictEqual(engine.gameState.scores.uk_us, 4, "Variant score modifier (+1) should be applied");
    assert.strictEqual(engine.gameState.scores.military_readiness, 2, "Variant score modifier (-1) should be applied");
    const testAsset = engine.gameState.assets.find(a => a.id === 'test_asset');
    assert.strictEqual(testAsset.state, 'damaged', "Variant asset modifier should change asset state to damaged");
    assert.strictEqual(testAsset.hidden, true, "Variant asset modifier should change asset visibility to hidden");
    const newUnit = engine.gameState.assets.find(a => a.id === 'new_support_unit');
    assert.ok(newUnit, "Variant asset modifier should inject new asset if not existing");
    assert.strictEqual(newUnit.state, 'deployed', "New asset state should match variant modifier");
    assert.strictEqual(engine.gameState.scenarioConfig.selectedVariantNames.length, 1);
    assert.strictEqual(engine.gameState.scenarioConfig.variantBriefings[0].briefingText, 'A massive storm front has rolled in.');
    engine.startGame();
    assert.strictEqual(engine.gameState.status, 'active');
    console.log("✅ Variant axes score and asset modifier tests passed.");
}

// Test 12: Score/Asset auto-triggered events & conditional decision options
{
    testScenario.variants = [];
    testScenario.assets = [{ id: 'test_asset', name: 'Test Asset', location: [0,0], state: 'operational', tags: [] }];
    testScenario.eventTemplates.push(
        {
            id: 'ev_score_auto',
            name: 'High Escalation Trigger',
            description: 'Automatically fires when uk_us hits 5.',
            autoTriggerOnConditions: true,
            conditions: { minScores: { uk_us: 5 } }
        },
        {
            id: 'ev_cond_decision',
            name: 'Conditional Decision Event',
            description: 'Tests score & asset gated options.',
            decisions: [
                {
                    id: 'dec_cond',
                    role: 'defence',
                    text: 'Select action:',
                    options: [
                        { id: 'opt_always', text: 'Always Available' },
                        { id: 'opt_needs_score', text: 'Needs Score 5', conditions: { minScores: { uk_us: 5 } } },
                        { id: 'opt_needs_damaged', text: 'Needs Damaged Asset', conditions: { assetStates: { test_asset: 'damaged' } } }
                    ]
                }
            ]
        }
    );

    engine.createLobby('test_scenario');
    engine.startGame();

    assert.strictEqual(engine.gameState.events.some(e => e.templateId === 'ev_score_auto'), false, "Auto-condition event must not fire before score threshold is met");

    // Trigger decision event while uk_us=3 and test_asset=operational -> only opt_always
    engine.triggerScenarioEvent('ev_cond_decision');
    const task1 = engine.gameState.decisionTasks[engine.gameState.decisionTasks.length - 1];
    assert.deepStrictEqual(task1.options.map(o => o.id), ['opt_always'], "Only unconditional option should be available initially");

    // Apply score +2 (uk_us -> 5) and damage test_asset -> ev_score_auto should auto-trigger!
    engine.applyEffects({ scores: { uk_us: 2 }, assetStateChanges: { test_asset: 'damaged' } });
    assert.strictEqual(engine.gameState.scores.uk_us, 5);
    assert.strictEqual(engine.gameState.events.filter(e => e.templateId === 'ev_score_auto').length, 1, "Score-triggered auto-event should fire automatically once threshold is met");

    // Re-applying effects should not fire non-repeatable ev_score_auto a second time
    engine.applyEffects({ scores: { uk_us: 0 } });
    assert.strictEqual(engine.gameState.events.filter(e => e.templateId === 'ev_score_auto').length, 1, "Non-repeatable auto-condition event must only fire once");

    // Trigger decision event again (make it repeatable for test) -> all 3 options should now be available
    const condEv = testScenario.eventTemplates.find(e => e.id === 'ev_cond_decision');
    condEv.repeatable = true;
    engine.triggerScenarioEvent('ev_cond_decision');
    const task2 = engine.gameState.decisionTasks[engine.gameState.decisionTasks.length - 1];
    assert.deepStrictEqual(task2.options.map(o => o.id), ['opt_always', 'opt_needs_score', 'opt_needs_damaged'], "Score-gated and asset-gated options should now be available");
    console.log("✅ Score/asset auto-triggered event & conditional decision option tests passed.");
}

// Test 13: Mutually exclusive randomEvents with explicit probability (A || B || nothing)
{
    testScenario.eventTemplates.push(
        { id: 'ev_rand_a', name: 'Random A', description: 'Outcome A', repeatable: true },
        { id: 'ev_rand_b', name: 'Random B', description: 'Outcome B', repeatable: true }
    );
    engine.createLobby('test_scenario');
    engine.startGame();

    const origRandom = Math.random;
    try {
        // Roll 0.1 -> hits ev_rand_a (0.0..0.4)
        Math.random = () => 0.1;
        engine.applyEffects({ randomEvents: [{ id: 'ev_rand_a', probability: 0.4 }, { id: 'ev_rand_b', probability: 0.3 }] });
        assert.strictEqual(engine.gameState.scheduledEvents.filter(e => e.templateId === 'ev_rand_a').length, 1, "Roll 0.1 should schedule ev_rand_a");
        assert.strictEqual(engine.gameState.scheduledEvents.filter(e => e.templateId === 'ev_rand_b').length, 0, "Roll 0.1 must not schedule ev_rand_b");

        // Roll 0.5 -> hits ev_rand_b (0.4..0.7)
        Math.random = () => 0.5;
        engine.applyEffects({ randomEvents: [{ id: 'ev_rand_a', probability: 0.4 }, { id: 'ev_rand_b', probability: 0.3 }] });
        assert.strictEqual(engine.gameState.scheduledEvents.filter(e => e.templateId === 'ev_rand_b').length, 1, "Roll 0.5 should schedule ev_rand_b");

        // Roll 0.85 -> hits remaining 0.3 no-op window (0.7..1.0)
        Math.random = () => 0.85;
        const countBefore = engine.gameState.scheduledEvents.length;
        engine.applyEffects({ randomEvents: [{ id: 'ev_rand_a', probability: 0.4 }, { id: 'ev_rand_b', probability: 0.3 }] });
        assert.strictEqual(engine.gameState.scheduledEvents.length, countBefore, "Roll 0.85 in remaining probability should schedule no event");
    } finally {
        Math.random = origRandom;
    }
    console.log("✅ Mutually exclusive probability randomEvents (A || B || nothing) tests passed.");
}

// Cleanup
scenarios.pop();
console.log("All engine-actions tests passed.");
process.exit(0);
