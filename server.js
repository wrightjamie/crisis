const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route to ensure server is running
app.get('/ping', (req, res) => {
    res.send('pong');
});

const scenarios = require('./scenarios');

const roleFallbacks = {
    cyber: ['home', 'defence'],
    media: ['foreign', 'home'],
    home: ['defence', 'foreign'],
    defence: ['foreign', 'home'],
    foreign: ['defence', 'home']
};

let gameState = {
    status: 'holding',
    scenarioId: null,
    scores: {},
    events: [],
    decisionTasks: [],
    assets: [],
    players: [],
    unlockedEvents: [],
    scheduledEvents: [] // { uuid, templateId, triggerTimeMs, paused, timeRemainingMs }
};

// Internal server tracking for setTimeout/setInterval
let scheduleLoopInterval = null;

// Connected clients tracking: socket.id -> role
let connectedClients = {};

function getActiveRoles() {
    return [...new Set(Object.values(connectedClients))];
}

function loadScenario(scenarioId, selectedVariants) {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    // Start with base scores and assets
    const scores = { ...scenario.initialScores };
    const assets = JSON.parse(JSON.stringify(scenario.assets || []));
    const variantBriefings = []; // { briefingText, roleBriefings }
    const selectedVariantNames = [];

    // Apply variant selections
    if (selectedVariants && scenario.variantAxes) {
        for (const axis of scenario.variantAxes) {
            const selectedOptionId = selectedVariants[axis.id];
            if (!selectedOptionId) continue;

            const option = axis.options.find(o => o.id === selectedOptionId);
            if (!option) continue;

            selectedVariantNames.push(`${axis.name}: ${option.name}`);

            // Additive score modifiers
            if (option.scoreModifiers) {
                for (const [key, delta] of Object.entries(option.scoreModifiers)) {
                    if (scores[key] !== undefined) {
                        scores[key] = Math.max(1, Math.min(5, scores[key] + delta));
                    }
                }
            }

            // Merge assets by ID
            if (option.assetModifiers) {
                option.assetModifiers.forEach(modAsset => {
                    const existingIdx = assets.findIndex(a => a.id === modAsset.id);
                    if (existingIdx !== -1) {
                        assets[existingIdx] = JSON.parse(JSON.stringify(modAsset));
                    } else {
                        assets.push(JSON.parse(JSON.stringify(modAsset)));
                    }
                });
            }

            // Collect briefing texts
            variantBriefings.push({
                axisName: axis.name,
                optionName: option.name,
                briefingText: option.briefingText || '',
                roleBriefings: option.roleBriefings || {}
            });
        }
    }

    gameState = {
        status: 'active',
        scenarioId: scenario.id,
        scenarioConfig: {
            id: scenario.id,
            name: scenario.name,
            description: scenario.description,
            mapConfig: scenario.mapConfig,
            roles: scenario.roles,
            briefings: scenario.briefings || {},
            variantBriefings: variantBriefings,
            selectedVariantNames: selectedVariantNames,
            aiConfig: scenario.aiConfig
        },
        scores: scores,
        events: [],
        decisionTasks: [],
        assets: assets,
        players: [],
        unlockedEvents: [],
        scheduledEvents: [],
        aiBriefings: {},
        aiScenarioSummaries: {}
    };

    // Clear all currently claimed roles since it's a new scenario
    connectedClients = {};

    startSchedulerLoop();
}

function stopSchedulerLoop() {
    if (scheduleLoopInterval) {
        clearInterval(scheduleLoopInterval);
        scheduleLoopInterval = null;
    }
}

function startSchedulerLoop() {
    stopSchedulerLoop();
    scheduleLoopInterval = setInterval(() => {
        if (gameState.status !== 'active') return;

        let stateChanged = false;
        const now = Date.now();

        // Loop backwards to allow removal
        for (let i = gameState.scheduledEvents.length - 1; i >= 0; i--) {
            const se = gameState.scheduledEvents[i];
            if (!se.paused && now >= se.triggerTimeMs) {
                // Time to trigger!
                gameState.scheduledEvents.splice(i, 1);
                triggerScenarioEvent(se.templateId);
                stateChanged = true;
            }
        }

        // Always emit state update to tick the countdown on the client side,
        // or just rely on client to tick itself? Client can tick itself, but
        // for simplicity let's emit if a scheduled event actually triggered.
        if (stateChanged) {
            io.emit('state_update', gameState);
        }
    }, 1000);
}

function checkConditions(obj, scores, assets) {
    if (!obj.conditions) return true;
    if (obj.conditions.minScores) {
        for (const [key, val] of Object.entries(obj.conditions.minScores)) {
            if ((scores[key] || 0) < val) return false;
        }
    }
    if (obj.conditions.maxScores) {
        for (const [key, val] of Object.entries(obj.conditions.maxScores)) {
            if ((scores[key] || 0) > val) return false;
        }
    }
    if (obj.conditions.assets) {
        for (const [assetId, requiredState] of Object.entries(obj.conditions.assets)) {
            const asset = (assets || []).find(a => a.id === assetId);
            if (!asset || asset.state !== requiredState) return false;
        }
    }
    return true;
}

function triggerScenarioEvent(eventId) {
    const scenario = scenarios.find(s => s.id === gameState.scenarioId);
    if (!scenario) return false;

    const template = scenario.eventTemplates.find(e => e.id === eventId);
    if (!template) return false;

    console.log(`Event triggered: ${template.name}`);

    let eventLocation = template.location;
    if (template.possibleLocations && template.possibleLocations.length > 0) {
        eventLocation = template.possibleLocations[Math.floor(Math.random() * template.possibleLocations.length)];
    }

    const newEvent = {
        id: `evt_${Date.now()}`,
        templateId: template.id,
        name: template.name,
        location: eventLocation,
        description: template.description,
        roleDescriptions: template.roleDescriptions,
        timestamp: Date.now()
    };

    gameState.events.push(newEvent);

    // Generate decision tasks from the event
    if (template.decisions) {
        template.decisions.forEach(dec => {
            // Filter out options that fail asset/score conditions
            const availableOptions = (dec.options || []).filter(opt =>
                checkConditions(opt, gameState.scores, gameState.assets)
            );

            // Only create the task if there are options available
            if (availableOptions.length > 0) {
                let assignedRole = dec.role;
                const activeRoles = Object.values(connectedClients);

                // Fallback logic
                if (assignedRole !== 'all' && !activeRoles.includes(assignedRole)) {
                    const fallbacks = roleFallbacks[assignedRole] || [];
                    for (let fb of fallbacks) {
                        if (activeRoles.includes(fb)) {
                            assignedRole = fb;
                            break;
                        }
                    }
                    // If no fallbacks are active, it will stay assigned to the original role and remain pending
                }

                gameState.decisionTasks.push({
                    id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                    eventId: newEvent.id,
                    role: assignedRole,
                    text: dec.text,
                    options: availableOptions,
                    status: 'pending'
                });
            }
        });
    }
    return true;
}

function getHoldingState() {
    return {
        status: 'holding',
        availableScenarios: scenarios.map(s => ({
            id: s.id,
            name: s.name,
            description: s.description,
            variantAxes: (s.variantAxes || []).map(axis => ({
                id: axis.id,
                name: axis.name,
                options: axis.options.map(opt => ({ id: opt.id, name: opt.name }))
            }))
        }))
    };
}


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send initial state upon connection
    const stateToSend = gameState.status === 'holding' ? getHoldingState() : gameState;
    socket.emit('initial_state', stateToSend);

    if (gameState.status === 'active') {
        const scenario = scenarios.find(s => s.id === gameState.scenarioId);
        if (scenario) {
            socket.emit('templates', scenario.eventTemplates);
            socket.emit('active_roles', getActiveRoles());
        }
    }

    // Facilitator starts a scenario
    socket.on('start_scenario', (data) => {
        // Support both old string format and new object format
        const scenarioId = typeof data === 'string' ? data : data.scenarioId;
        const selectedVariants = typeof data === 'object' ? data.selectedVariants : null;

        console.log(`Starting scenario: ${scenarioId}`, selectedVariants ? `with variants: ${JSON.stringify(selectedVariants)}` : '');
        loadScenario(scenarioId, selectedVariants);

        const scenario = scenarios.find(s => s.id === scenarioId);
        io.emit('templates', scenario.eventTemplates);
        io.emit('state_update', gameState);
        io.emit('active_roles', getActiveRoles());
        io.emit('generate_ai_briefing_all', { isStart: true });
    });

    // Facilitator ends a scenario
    socket.on('end_scenario', () => {
        console.log('Scenario ended');
        stopSchedulerLoop();
        gameState = { status: 'holding', scenarioId: null };
        connectedClients = {};
        io.emit('state_update', getHoldingState());
    });

    // Client registers their role
    socket.on('register_role', (role) => {
        // Simple check if role is already taken
        const takenRoles = getActiveRoles();
        if (role !== 'display' && role !== 'facilitator' && takenRoles.includes(role)) {
            socket.emit('role_error', 'Role already taken');
            return;
        }

        connectedClients[socket.id] = role;
        socket.emit('role_registered', role);
        io.emit('active_roles', getActiveRoles());
    });

    // Facilitator triggers an event
    socket.on('trigger_event', (eventId) => {
        if (gameState.status !== 'active') return;
        if (triggerScenarioEvent(eventId)) {
            io.emit('state_update', gameState);
        }
    });

    // Facilitator Scheduled Event Controls
    socket.on('delete_scheduled_event', (uuid) => {
        gameState.scheduledEvents = gameState.scheduledEvents.filter(se => se.uuid !== uuid);
        io.emit('state_update', gameState);
    });

    socket.on('pause_scheduled_event', (uuid) => {
        const se = gameState.scheduledEvents.find(s => s.uuid === uuid);
        if (se && !se.paused) {
            se.paused = true;
            se.timeRemainingMs = se.triggerTimeMs - Date.now();
            io.emit('state_update', gameState);
        }
    });

    socket.on('resume_scheduled_event', (uuid) => {
        const se = gameState.scheduledEvents.find(s => s.uuid === uuid);
        if (se && se.paused) {
            se.paused = false;
            se.triggerTimeMs = Date.now() + se.timeRemainingMs;
            se.timeRemainingMs = null;
            io.emit('state_update', gameState);
        }
    });

    socket.on('force_trigger_scheduled', (uuid) => {
        const idx = gameState.scheduledEvents.findIndex(s => s.uuid === uuid);
        if (idx !== -1) {
            const templateId = gameState.scheduledEvents[idx].templateId;
            gameState.scheduledEvents.splice(idx, 1);
            if (triggerScenarioEvent(templateId)) {
                io.emit('state_update', gameState);
            }
        }
    });

    // Client submits a decision
    socket.on('submit_decision', (data) => {
        // data: { taskId, optionId }
        const task = gameState.decisionTasks.find(t => t.id === data.taskId);
        if (task && task.status === 'pending') {
            console.log(`Decision submitted for task ${task.id}: option ${data.optionId}`);
            task.status = 'resolved';
            task.selectedOption = data.optionId;

            // Apply effects
            const option = task.options.find(o => o.id === data.optionId);
            if (option && option.effects) {
                if (option.effects.scores) {
                    for (const [scoreName, change] of Object.entries(option.effects.scores)) {
                        if (gameState.scores[scoreName] !== undefined) {
                            gameState.scores[scoreName] += change;
                            // Clamp scores between 1 and 5
                            gameState.scores[scoreName] = Math.max(1, Math.min(5, gameState.scores[scoreName]));
                        }
                    }
                }

                // Unlock manual events
                if (option.effects.unlockEvents) {
                    option.effects.unlockEvents.forEach(evtId => {
                        if (!gameState.unlockedEvents.includes(evtId)) {
                            gameState.unlockedEvents.push(evtId);
                        }
                    });
                }

                // Schedule trigger events
                if (option.effects.triggerEvents) {
                    option.effects.triggerEvents.forEach(te => {
                        const roll = Math.random();
                        if (roll <= (te.probability !== undefined ? te.probability : 1.0)) {
                            gameState.scheduledEvents.push({
                                uuid: `se_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                templateId: te.id,
                                triggerTimeMs: Date.now() + (te.delayMs || 0),
                                paused: false,
                                timeRemainingMs: null
                            });
                        }
                    });
                }
            }

            // Broadcast updated state
            io.emit('state_update', gameState);
            if (option && option.effects && option.effects.scores) {
                io.emit('generate_ai_briefing_all', { context: `The following action was taken: ${option.text}` });
            }
        }
    });

    // Facilitator dismisses a pending decision
    socket.on('dismiss_decision', (taskId) => {
        const task = gameState.decisionTasks.find(t => t.id === taskId);
        if (task && task.status === 'pending') {
            task.status = 'resolved';
            task.selectedOption = 'Dismissed';
            io.emit('state_update', gameState);
        }
    });

    // Facilitator submits an AI generated executive summary of the scenario
    socket.on('submit_scenario_summary', (data) => {
        // data: { role, text, prompt, timestamp }
        if (gameState.status === 'active') {
            console.log(`Received AI scenario summary for ${data.role}`);
            gameState.aiScenarioSummaries[data.role] = {
                text: data.text,
                prompt: data.prompt,
                timestamp: data.timestamp || Date.now()
            };
            io.emit('state_update', gameState);
        }
    });

    // Facilitator manually updates scores
    socket.on('update_scores', (newScores) => {
        console.log('Scores manually updated by facilitator');
        gameState.scores = { ...gameState.scores, ...newScores };
        io.emit('state_update', gameState);
        io.emit('generate_ai_briefing_all', { context: "The facilitator manually adjusted the operational scores." });
    });

    // Facilitator resets the game
    socket.on('reset_game', () => {
        if (gameState.status !== 'active') return;
        console.log('Game reset by facilitator');
        loadScenario(gameState.scenarioId);
        io.emit('state_update', gameState);
    });

    socket.on('submit_ai_briefing', (data) => {
        if (gameState.status !== 'active') return;
        if (!gameState.aiBriefings) gameState.aiBriefings = {};
        gameState.aiBriefings[data.role] = data;
        io.emit('state_update', gameState);
    });

    socket.on('request_ai_briefing', (role) => {
        if (gameState.status !== 'active') return;
        io.emit('generate_ai_briefing', { role: role, mode: 'initial' });
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete connectedClients[socket.id];
        io.emit('active_roles', getActiveRoles());
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
