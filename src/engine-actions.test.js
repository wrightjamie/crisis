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
    eventTemplates: [],
    manualActions: [
        {
            id: 'test_immediate_action',
            name: 'Immediate Action',
            initiator: ['home'],
            effects: { scores: { uk_us: 1 } }
        },
        {
            id: 'test_approval_action',
            name: 'Approval Action',
            initiator: ['foreign'],
            requiresApprovalFrom: 'home',
            effects: { scores: { uk_us: -1 } }
        },
        {
            id: 'test_array_approval_action',
            name: 'Array Approval Action',
            initiator: ['defence', 'foreign'],
            requiresApprovalFrom: ['defence', 'foreign'],
            effects: { scores: { military_readiness: 1 } }
        }
    ]
};

// Temporarily inject our test scenario
scenarios.push(testScenario);

function resetEngine() {
    engine.gameState = {
        status: 'active',
        scenarioId: 'test_scenario',
        roles: ['home', 'defence', 'foreign'],
        scores: { uk_us: 3, military_readiness: 3 },
        assets: [],
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

// Cleanup
scenarios.pop();
console.log("All manual action tests passed.");
process.exit(0);
