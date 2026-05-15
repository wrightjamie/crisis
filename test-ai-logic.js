const fs = require('fs');

// Read ai-core.js
let code = fs.readFileSync('public/js/ai-core.js', 'utf8');

// Strip the import
code = code.replace(/import .* from .*;/g, '');

// Setup fake window
global.window = {};

// Eval the code
eval(code);

const aiConfig = {
    systemPrompt: "You are an AI.",
    scoreLabels: { 1: "Critical", 2: "Poor", 3: "Adequate", 4: "Strong", 5: "Secure" },
    roleContexts: { "home": "Home Context" },
    scores: {
        civilian_stability: { label: "Civilian Stability", subject: "domestic order", isPlural: false, roles: ["home"] },
        military_escalation: { label: "Military Escalation", subject: "threat level", isPlural: false, roles: ["home"] }
    }
};

async function runTests() {
    console.log("Running tests...");
    
    // Mock the engine
    let lastSystemContent = "";
    let lastUserContent = "";
    
    window.AICore.engine = {
        chat: {
            completions: {
                create: async (req) => {
                    lastSystemContent = req.messages[0].content;
                    lastUserContent = req.messages[1].content;
                    return { choices: [{ message: { content: "MOCK RESPONSE" } }] };
                }
            }
        }
    };
    window.AICore.isReady = true;

    // Test 1: Initial brief
    console.log("Test 1: Initial brief");
    let currentScores = { civilian_stability: 3, military_escalation: 2 };
    let result = await window.AICore.generateBrief(aiConfig, 'home', currentScores, null);
    
    if (result.seeds.length !== 2) throw new Error("Expected 2 seeds");
    if (!lastUserContent.includes("Domestic order is currently adequate")) throw new Error("Missing initial seed 1");
    if (!lastUserContent.includes("describes the overall operational picture")) throw new Error("Missing initial prompt instructions");
    console.log("Test 1 Passed");

    // Test 2: Update brief with changes
    console.log("Test 2: Update brief with changes");
    let baselineScores = { civilian_stability: 3, military_escalation: 2 };
    currentScores = { civilian_stability: 4, military_escalation: 2 }; // Only one change
    let actionContext = "The following action was taken: Addressed nation, urged calm.";
    result = await window.AICore.generateBrief(aiConfig, 'home', currentScores, baselineScores, actionContext);
    
    if (result.seeds.length !== 1) throw new Error("Expected 1 seed");
    if (!lastUserContent.includes("Domestic order has improved from adequate to strong")) throw new Error("Missing update seed");
    if (lastUserContent.includes("threat level")) throw new Error("Should not include unchanged score");
    if (!lastUserContent.includes("focuses on highlighting the recent changes")) throw new Error("Missing update prompt instructions");
    if (!lastUserContent.includes(actionContext)) throw new Error("Missing action context in prompt");
    console.log("Test 2 Passed");

    // Test 3: Update brief with NO changes
    console.log("Test 3: Update brief with NO changes");
    baselineScores = { civilian_stability: 4, military_escalation: 2 };
    result = await window.AICore.generateBrief(aiConfig, 'home', currentScores, baselineScores);
    
    if (result.generated !== false) throw new Error("Expected no generation");
    if (!result.text.includes("No operational changes")) throw new Error("Expected default no-change message");
    console.log("Test 3 Passed");

    console.log("ALL TESTS PASSED.");
}

runTests().catch(e => {
    console.error("TEST FAILED:", e);
    process.exit(1);
});
