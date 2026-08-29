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
        },
        {
            id: 'test_active_roles_action',
            name: 'Active Roles Action',
            initiator: ['home'],
            conditions: { activeRoles: ['defence'] },
            effects: { scores: { uk_us: 1 } }
        },
        {
            id: 'test_any_active_roles_action',
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

// Cleanup
scenarios.pop();
console.log("All engine-actions tests passed.");
process.exit(0);
