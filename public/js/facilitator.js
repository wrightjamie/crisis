const socket = io();

const scoreAdjustContainer = document.getElementById('score-adjust-container');
const eventsList = document.getElementById('facilitator-events-list');
const tasksList = document.getElementById('facilitator-tasks-list');
const usedEventsContainer = document.getElementById('used-events');

let currentState = null;
let currentInputs = {};
let allTemplates = [];
let availableScenarios = [];
let scenarioRoles = [];
let previousAvailableEventIds = new Set();

// AI Engine tracking
let aiBaselineScores = {};
let prevFacilitatorScores = null;
let aiQueue = [];
let isGeneratingAi = false;

document.addEventListener('DOMContentLoaded', () => {
    const aiStatusDot = document.getElementById('ai-status-dot');
    const aiStatusText = document.getElementById('ai-status-text');

    if (!aiStatusDot || !aiStatusText) return;

    const checkAICore = setInterval(() => {
        if (window.AICore) {
            clearInterval(checkAICore);
            aiStatusText.textContent = "Loading AI...";
            aiStatusDot.style.background = "var(--accent-orange)";
            
            window.AICore.init((report) => {
                aiStatusText.textContent = `Loading AI (${Math.round(report.progress * 100)}%)`;
            }).then(() => {
                aiStatusText.textContent = "AI Ready";
                aiStatusDot.style.background = "var(--status-1)";
                processAiQueue(); // Process any queued events that arrived before engine was ready
            }).catch(e => {
                aiStatusText.textContent = "AI Error";
                aiStatusDot.style.background = "var(--accent-red)";
                console.error(e);
            });
        }
    }, 100);
});

socket.on('generate_ai_briefing', (data) => {
    if (!currentState || !currentState.scenarioConfig || !currentState.scenarioConfig.aiConfig) return;
    if (data.role === 'display' || data.role === 'facilitator') return;
    
    if (data.includeSummary) {
        const r = data.role;
        const config = currentState.scenarioConfig;
        const general = config.briefings._general || '';
        const roleSpecific = config.briefings[r] || '';
        const variants = (config.variantBriefings || []).map(vb => {
            const genVar = vb.briefingText || '';
            const roleVar = (vb.roleBriefings && vb.roleBriefings[r]) ? vb.roleBriefings[r] : '';
            return `${genVar}\n${roleVar}`;
        }).join('\n');
        const combinedText = `${general}\n${variants}\n${roleSpecific}`;
        aiQueue.push({ type: 'summary', role: r, combinedText });
    }

    queueAiGeneration(data.role, data.mode === 'initial');
});

socket.on('generate_ai_briefing_all', (data) => {
    if (!currentState || !currentState.scenarioConfig || !currentState.scenarioConfig.aiConfig) return;
    
    const context = data ? data.context : null;
    currentActiveRoles
        .filter(r => r !== 'display' && r !== 'facilitator')
        .forEach(r => queueAiGeneration(r, false, context));
});

function queueAiGeneration(role, forceInitial, context = null) {
    if (role === 'display' || role === 'facilitator') return;
    aiQueue.push({ type: 'briefing', role, forceInitial, context });
    processAiQueue();
}

async function processAiQueue() {
    if (isGeneratingAi || aiQueue.length === 0 || !window.AICore || !window.AICore.isReady) return;
    
    isGeneratingAi = true;
    const task = aiQueue.shift();
    const aiStatusText = document.getElementById('ai-status-text');
    const aiStatusDot = document.getElementById('ai-status-dot');
    
    if (aiStatusText) aiStatusText.textContent = `AI Generating (${task.role})...`;
    if (aiStatusDot) {
        aiStatusDot.style.background = "var(--accent-blue)";
        aiStatusDot.classList.add('ai-active-dot');
    }

    try {
        const config = currentState.scenarioConfig.aiConfig;
        
        if (task.type === 'summary') {
            const result = await window.AICore.generateScenarioSummary(config, task.role, task.combinedText);
            socket.emit('submit_scenario_summary', {
                role: task.role,
                text: result.text,
                prompt: result.prompt,
                timestamp: Date.now()
            });
        } else {
            const currentScores = currentState.scores;
            let baseline = task.forceInitial ? null : (aiBaselineScores[task.role] || null);
            
            const result = await window.AICore.generateBrief(config, task.role, currentScores, baseline, task.context);
            
            if (result.generated) {
                aiBaselineScores[task.role] = JSON.parse(JSON.stringify(currentScores));
            }

            socket.emit('submit_ai_briefing', {
                role: task.role,
                text: result.text,
                seeds: result.seeds,
                timestamp: Date.now()
            });
        }
    } catch (e) {
        console.error("AI Generation failed for role:", task.role, e);
    }

    if (aiStatusText) aiStatusText.textContent = "AI Ready";
    if (aiStatusDot) {
        aiStatusDot.style.background = "var(--status-1)";
        aiStatusDot.classList.remove('ai-active-dot');
    }
    isGeneratingAi = false;
    processAiQueue();
}

const dashboardEl = document.getElementById('facilitator-dashboard');
const holdingEl = document.getElementById('facilitator-holding-screen');
const scenariosListEl = document.getElementById('scenarios-list');

socket.on('connect', () => {
    socket.emit('register_role', 'facilitator');
});

socket.on('scenario_error', (msg) => {
    alert(msg);
});

function createStationBadgeHtml(role, isOnline, mode, isMandatory = false) {
    const badgeModeClass = mode === 'dropdown' ? 'dropdown-mode' : 'lobby-mode';
    const statusClass = isOnline ? 'online' : 'offline';
    const mandatoryHtml = (mode === 'lobby' && isMandatory) ? ' <span style="color: var(--accent-orange); font-size: 0.8em; margin-left: 4px;">*</span>' : '';
    
    return `
        <div class="station-badge ${badgeModeClass} ${statusClass}">
            <div class="station-indicator ${badgeModeClass} ${statusClass}"></div>
            ${role.toUpperCase()}${mandatoryHtml}
        </div>
    `;
}

let currentActiveRoles = [];
socket.on('active_roles', (roles) => {
    currentActiveRoles = roles;
    const container = document.getElementById('active-roles-display');
    const config = currentState && currentState.scenarioConfig ? currentState.scenarioConfig : {};
    const mandatoryRoles = config.mandatoryRoles || [];
    const minUsers = config.minUsers || 1;
    if (container) {
        container.innerHTML = '<div class="text-xs text-muted" style="margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">STATIONS:</div>';
        
        const expectedRoles = scenarioRoles.length > 0 ? scenarioRoles : ['home', 'defence', 'foreign', 'media', 'cyber', 'display'];
        container.innerHTML += expectedRoles.map(r => createStationBadgeHtml(r, roles.includes(r), 'dropdown', mandatoryRoles.includes(r))).join('');
    }

    // Also update lobby screen if active
    const lobbyRoles = document.getElementById('lobby-active-roles');
    if (lobbyRoles && currentState && currentState.status === 'lobby') {
        lobbyRoles.innerHTML = '';
        const expectedRoles = scenarioRoles.length > 0 ? scenarioRoles : ['home', 'defence', 'foreign', 'media', 'cyber', 'display'];
        lobbyRoles.innerHTML = expectedRoles
            .filter(r => r !== 'facilitator')
            .map(r => createStationBadgeHtml(r, roles.includes(r), 'lobby', mandatoryRoles.includes(r)))
            .join('');
            
        let minUsersEl = document.getElementById('lobby-min-users-text');
        if (!minUsersEl) {
            minUsersEl = document.createElement('div');
            minUsersEl.id = 'lobby-min-users-text';
            minUsersEl.className = 'text-sm text-muted mt-1 w-100 text-center';
            lobbyRoles.parentNode.insertBefore(minUsersEl, lobbyRoles.nextSibling);
        }
        
        const activePlayerCount = roles.filter(r => r !== 'display' && r !== 'facilitator').length;
        if (activePlayerCount < minUsers) {
            minUsersEl.innerHTML = `<span style="color: var(--accent-orange);">Waiting for more players... (${activePlayerCount}/${minUsers} minimum required)</span>`;
        } else {
            minUsersEl.innerHTML = `<span style="color: var(--status-1);">Ready to start! Minimum players met (${activePlayerCount}/${minUsers})</span>`;
        }
    }
});

socket.on('templates', (templates) => {
    allTemplates = templates;
    if (currentState && currentState.status === 'active') renderEventButtons();
});

socket.on('initial_state', (state) => {
    handleState(state);
});

socket.on('state_update', (state) => {
    handleState(state);
});

function handleState(state) {
    const lobbyEl = document.getElementById('facilitator-lobby-screen');

    if (state.status === 'holding') {
        dashboardEl.style.display = 'none';
        lobbyEl.style.display = 'none';
        holdingEl.style.display = 'block';
        availableScenarios = state.availableScenarios;
        aiBaselineScores = {}; // Reset AI tracking
        prevFacilitatorScores = null;
        renderHoldingScreen();
    } else if (state.status === 'lobby') {
        dashboardEl.style.display = 'none';
        holdingEl.style.display = 'none';
        lobbyEl.style.display = 'block';
        currentState = state;
        if (state.scenarioConfig && state.scenarioConfig.roles) {
            scenarioRoles = state.scenarioConfig.roles;
        }
        renderLobbyScreen();
    } else {
        if (!currentState || currentState.scenarioId !== state.scenarioId) {
            aiBaselineScores = {}; // Reset on new scenario
            prevFacilitatorScores = null;
            aiQueue = [];
        }
        lobbyEl.style.display = 'none';
        dashboardEl.style.display = 'block';
        holdingEl.style.display = 'none';
        currentState = state;
        if (state.scenarioConfig && state.scenarioConfig.roles) {
            scenarioRoles = state.scenarioConfig.roles;
        }
        renderEventButtons();
        renderScheduledEvents();
        renderScoreAdjust();
        renderGlobalView();
    }
}

function renderLobbyScreen() {
    if (!currentState || !currentState.scenarioConfig) return;
    const config = currentState.scenarioConfig;
    document.getElementById('lobby-scenario-title').innerHTML = window.parseAcronyms ? window.parseAcronyms(config.name) : config.name;
    document.getElementById('lobby-scenario-desc').innerHTML = window.parseAcronyms ? window.parseAcronyms(config.description) : config.description;
    document.getElementById('lobby-error-msg').textContent = '';
}

let variantSelections = {}; // { scenarioId: { axisId: optionId } }

function renderHoldingScreen() {
    scenariosListEl.innerHTML = '';
    availableScenarios.forEach(s => {
        variantSelections[s.id] = {};

        const div = document.createElement('div');
        div.className = 'admin-card';
        div.style.textAlign = 'left';

        let axesHtml = '';
        if (s.variantAxes && s.variantAxes.length > 0) {
            axesHtml += '<div class="mt-2 pt-1 border-top">';
            axesHtml += '<h3 class="text-sm text-muted uppercase mb-1">Opening Conditions</h3>';
            
            s.variantAxes.forEach(axis => {
                axesHtml += `<div class="btn wiki-back-btn">`;
                axesHtml += `<label class="text-base text-bold text-secondary mb-1 d-block">${axis.name}</label>`;
                axesHtml += `<div class="flex-center gap-1 flex-wrap" id="axis-${s.id}-${axis.id}">`;
                axis.options.forEach((opt, idx) => {
                    axesHtml += `<button class="btn variant-opt ${idx === 0 ? 'variant-selected' : ''} text-sm p-1" data-scenario="${s.id}" data-axis="${axis.id}" data-option="${opt.id}" onclick="selectVariant('${s.id}', '${axis.id}', '${opt.id}', this)">${opt.name}</button>`;
                });
                axesHtml += '</div></div>';
                // Default to first option
                variantSelections[s.id][axis.id] = axis.options[0].id;
            });

            axesHtml += `<button class="btn text-sm p-1 text-muted border-muted mt-1 bg-none" onclick="randomiseVariants('${s.id}')">🎲 Randomise All</button>`;
            axesHtml += '</div>';
        }

        const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;
        let validationHtml = '';
        if (s.isValid === false) {
            validationHtml = `<div class="mb-1 p-1 border-red bg-red-faded text-red text-sm radius-sm">
                <strong>⚠️ Scenario configuration invalid:</strong>
                <ul class="mt-1 ml-2 p-0">
                    ${s.validationErrors.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>`;
        }
        
        div.innerHTML = `
            <h2>${p(s.name)}</h2>
            <p class="text-secondary mb-1">${p(s.description)}</p>
            ${validationHtml}
            ${axesHtml}
            <button class="btn btn-primary w-100 mt-1" onclick="openLobby('${s.id}')" ${s.isValid === false ? 'disabled' : ''}>Open Lobby</button>
        `;
        scenariosListEl.appendChild(div);
    });
}

window.selectVariant = function(scenarioId, axisId, optionId, btnEl) {
    variantSelections[scenarioId][axisId] = optionId;
    // Update visual selection
    const container = document.getElementById(`axis-${scenarioId}-${axisId}`);
    if (container) {
        container.querySelectorAll('.variant-opt').forEach(b => b.classList.remove('variant-selected'));
        btnEl.classList.add('variant-selected');
    }
};

window.randomiseVariants = function(scenarioId) {
    const scenario = availableScenarios.find(s => s.id === scenarioId);
    if (!scenario || !scenario.variantAxes) return;
    
    scenario.variantAxes.forEach(axis => {
        const randomOpt = axis.options[Math.floor(Math.random() * axis.options.length)];
        variantSelections[scenarioId][axis.id] = randomOpt.id;
        
        // Update visual
        const container = document.getElementById(`axis-${scenarioId}-${axis.id}`);
        if (container) {
            container.querySelectorAll('.variant-opt').forEach(b => {
                b.classList.toggle('variant-selected', b.getAttribute('data-option') === randomOpt.id);
            });
        }
    });
};

window.openLobby = function(id) {
    const selectedVariants = variantSelections[id] || {};
    socket.emit('open_lobby', { scenarioId: id, selectedVariants });
};

window.startScenario = function() {
    socket.emit('start_scenario');
};

function endScenario() {
    if (confirm("End this scenario and return to the holding screen?")) {
        socket.emit('end_scenario');
        document.getElementById('dropdown-menu').classList.remove('show');
    }
}

function checkConditions(template, scores, assets, unlockedEvents = [], triggeredEvents = []) {
    if (!template.conditions) return true;
    if (template.conditions.minScores) {
        for (const [key, val] of Object.entries(template.conditions.minScores)) {
            if ((scores[key] || 0) < val) return false;
        }
    }
    if (template.conditions.maxScores) {
        for (const [key, val] of Object.entries(template.conditions.maxScores)) {
            if ((scores[key] || 0) > val) return false;
        }
    }
    if (template.conditions.assets) {
        for (const [assetId, requiredState] of Object.entries(template.conditions.assets)) {
            const asset = (assets || []).find(a => a.id === assetId);
            if (!asset || asset.state !== requiredState) return false;
        }
    }
    if (template.conditions.unlockedEvents) {
        for (const evtId of template.conditions.unlockedEvents) {
            if (!unlockedEvents.includes(evtId)) return false;
        }
    }
    if (template.conditions.triggeredEvents) {
        for (const evtId of template.conditions.triggeredEvents) {
            if (!triggeredEvents.includes(evtId)) return false;
        }
    }
    return true;
}

function renderEventButtons() {
    const usedEventsContainer = document.getElementById('used-events');
    const pendingConditionsContainer = document.getElementById('pending-conditions-events');
    const terminalContainer = document.getElementById('terminal-scenarios-list');
    
    usedEventsContainer.innerHTML = '';
    if (pendingConditionsContainer) pendingConditionsContainer.innerHTML = '';
    if (terminalContainer) terminalContainer.innerHTML = '';

    const triggeredTemplateIds = new Set(currentState.events.map(e => e.templateId));
    let currentAvailableEventIds = new Set();

    allTemplates.forEach(template => {
        if (!template.repeatable && triggeredTemplateIds.has(template.id)) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-primary';
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.classList.add("fac-status-offline");
            btn.textContent = `Used: ${template.name}`;
            usedEventsContainer.appendChild(btn);
        } else {
            const meetsConditions = checkConditions(template, currentState.scores, currentState.assets, currentState.unlockedEvents, currentState.events.map(e => e.templateId));
            const isUnlocked = (!template.requiresUnlock || currentState.unlockedEvents.includes(template.id)) && (!template.prerequisites || template.prerequisites.every(p => triggeredTemplateIds.has(p)));

            if (template.isEndGame) {
                if (terminalContainer) {
                    const btn = document.createElement('button');
                    btn.className = meetsConditions ? 'btn text-red w-100 mb-1' : 'btn btn-primary w-100 mb-1 fac-status-offline';
                    if (meetsConditions) {
                        btn.style.backgroundColor = 'var(--bg-tertiary)';
                        btn.style.border = '2px solid var(--accent-red)';
                        btn.style.fontWeight = 'bold';
                        btn.textContent = `🚨 AVAILABLE: ${template.name}`;
                    } else {
                        btn.textContent = `LOCKED: ${template.name}`;
                        btn.style.border = '1px solid var(--border-color)';
                    }
                    btn.onclick = () => openEventDetails(template.id);
                    terminalContainer.appendChild(btn);
                }
            } else if (isUnlocked && !meetsConditions) {
                const btn = document.createElement('button');
                btn.className = 'btn btn-primary w-100 mb-1 fac-status-offline';
                btn.textContent = template.name;
                btn.style.border = '1px solid var(--border-color)';
                btn.onclick = () => openEventDetails(template.id);
                if (pendingConditionsContainer) pendingConditionsContainer.appendChild(btn);
            }
        }
    });

    if (usedEventsContainer.children.length === 0) {
        usedEventsContainer.innerHTML = '<small>No used events.</small>';
    }
    if (pendingConditionsContainer && pendingConditionsContainer.children.length === 0) {
        pendingConditionsContainer.innerHTML = '<small>No events pending conditions.</small>';
    }
    if (terminalContainer && terminalContainer.children.length === 0) {
        terminalContainer.innerHTML = '<small>No terminal scenarios defined.</small>';
    }
    
    // Render the interactive tree which replaces the old Available Events list
    if (window.renderScenarioExplorer) {
        window.renderScenarioExplorer();
    }
}



function renderGlobalView() {
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    // Top bar scores were removed in a previous refactor

    // Events List
    // Filter out player-triggered manual actions (IDs starting with 'evt_action_')
    const recentEvents = currentState.events.filter(e => !e.id.startsWith('evt_action_')).slice().reverse().slice(0, 5);
    eventsList.innerHTML = recentEvents.length === 0 ? '<p>No active events.</p>' : '';
    recentEvents.forEach(evt => {
        eventsList.innerHTML += `
            <div class="card mb-1 p-1">
                <strong>${p(evt.name)}</strong><br>
                <small>${new Date(evt.timestamp).toLocaleTimeString()}</small>
            </div>
        `;
    });

    // Tasks/Decisions List
    // Filter out player-triggered manual action approval tasks (IDs starting with 'task_action_')
    const scenarioTasks = currentState.decisionTasks.filter(t => !t.id.startsWith('task_action_'));
    const pendingTasks = scenarioTasks.filter(t => t.status !== 'resolved');
    const resolvedTasks = scenarioTasks.filter(t => t.status === 'resolved').slice(-5).reverse();
    const displayTasks = [...pendingTasks, ...resolvedTasks];
    
    tasksList.innerHTML = displayTasks.length === 0 ? '<p>No decisions generated.</p>' : '';
    displayTasks.forEach(task => {
        const statusStr = task.status === 'resolved' 
            ? `<span class="text-status-1">Resolved (${task.selectedOption})</span>` 
            : `<span class="text-status-4">Pending</span>`;
            
        const dismissBtn = task.status === 'pending' 
            ? `<button onclick="dismissDecision('${task.id}')" class="btn text-sm p-1 fac-status-offline">Dismiss</button>` 
            : '';

        tasksList.innerHTML += `
            <div class="card mb-1 p-1">
                <div class="flex-between">
                    <strong>[${task.role.toUpperCase()}]</strong>
                    <div class="flex-center gap-1">
                        ${statusStr}
                        ${dismissBtn}
                    </div>
                </div>
                <small class="mt-1 d-block">${p(task.text)}</small>
            </div>
        `;
    });
}

window.dismissDecision = function(id) {
    socket.emit('dismiss_decision', id);
};

function renderScoreAdjust() {
    if (!scoreAdjustContainer) return;
    scoreAdjustContainer.innerHTML = '';
    currentInputs = {};
    for (const [key, value] of Object.entries(currentState.scores)) {
        const row = document.createElement('div');
        row.className = 'score-controls';
        row.style.gridTemplateColumns = '1fr 2fr auto'; // label, slider, value
        
        if (prevFacilitatorScores && prevFacilitatorScores[key] !== value) {
            row.style.animation = 'score-changed 2.5s ease-out';
            row.classList.add("fac-status-offline");
            row.style.borderRadius = 'var(--radius-sm)';
            row.style.padding = '0.2rem';
        }

        const label = document.createElement('span');
        label.textContent = formatName(key);
        
        const input = document.createElement('input');
        input.type = 'range';
        input.min = 1;
        input.max = 5;
        input.value = value;
        input.style.width = '100%';
        input.style.accentColor = 'var(--accent-blue)';
        
        const valueDisplay = document.createElement('span');
        valueDisplay.textContent = value;
        valueDisplay.style.fontWeight = 'bold';
        valueDisplay.style.minWidth = '20px';
        valueDisplay.style.textAlign = 'right';
        
        input.oninput = (e) => {
            valueDisplay.textContent = e.target.value;
        };
        
        currentInputs[key] = input;

        row.appendChild(label);
        row.appendChild(input);
        row.appendChild(valueDisplay);
        scoreAdjustContainer.appendChild(row);
    }
    prevFacilitatorScores = JSON.parse(JSON.stringify(currentState.scores));
}

window.triggerEvent = function(id) {
    socket.emit('trigger_event', id);
};

let currentEventDetailsId = null;

window.openEventDetails = function(templateId) {
    currentEventDetailsId = templateId;
    refreshFacilitatorInfoPanel();
    const dialog = document.getElementById('fac-info-panel');
    if (!dialog.open) dialog.showModal();
};

window.closeFacilitatorPanel = function() {
    const dialog = document.getElementById('fac-info-panel');
    if (dialog.open) dialog.close();
    currentEventDetailsId = null;
};

window.triggerEventFromPanel = function(templateId) {
    triggerEvent(templateId);
    closeFacilitatorPanel();
};

function refreshFacilitatorInfoPanel() {
    if (!currentEventDetailsId || !currentState) return;
    const template = allTemplates.find(t => t.id === currentEventDetailsId);
    if (!template) return;

    const titleEl = document.getElementById('fac-info-title');
    const contentEl = document.getElementById('fac-info-content');

    titleEl.textContent = 'Event Details';

    const meetsConditions = checkConditions(template, currentState.scores, currentState.assets, currentState.unlockedEvents, currentState.events.map(e => e.templateId));
    const triggerBtnText = meetsConditions ? 'TRIGGER EVENT' : 'FORCE TRIGGER';
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;
    
    let html = `
        <div class="card btn wiki-back-btn">
    `;
    
    if (template.image) {
        html += `<img src="${template.image}" alt="${template.name}" class="wiki-img">`;
    }

    html += `
            <div class="card-title">${p(template.name)}</div>
            <div class="card-desc">${p(template.description)}</div>
        </div>
    `;

    if (template.facilitatorNotes) {
        html += `
            <div class="card mb-2 border-orange bg-orange-faded">
                <div class="card-title text-orange text-base mb-1">Facilitator Notes</div>
                <div class="card-desc text-base">${p(template.facilitatorNotes)}</div>
            </div>
        `;
    }

    if (!meetsConditions) {
        let reasonHtml = '';
        if (template.conditions) {
            if (template.conditions.minScores) {
                for (const [key, val] of Object.entries(template.conditions.minScores)) {
                    const current = currentState.scores[key] || 0;
                    if (current < val) reasonHtml += `<div>• ${formatName(key)} must be ≥ ${val} (currently ${current})</div>`;
                }
            }
            if (template.conditions.maxScores) {
                for (const [key, val] of Object.entries(template.conditions.maxScores)) {
                    const current = currentState.scores[key] || 0;
                    if (current > val) reasonHtml += `<div>• ${formatName(key)} must be ≤ ${val} (currently ${current})</div>`;
                }
            }
            if (template.conditions.assets) {
                for (const [assetId, requiredState] of Object.entries(template.conditions.assets)) {
                    const asset = (currentState.assets || []).find(a => a.id === assetId);
                    const currentAssetState = asset ? asset.state : 'missing';
                    if (!asset || asset.state !== requiredState) {
                        reasonHtml += `<div>• Asset "${asset ? asset.name : assetId}" must be ${requiredState} (currently ${currentAssetState})</div>`;
                    }
                }
            }
        }
        html += `
            <div class="card mb-2 border-red bg-red-faded">
                <div class="card-title text-red text-base mb-1">Warning: Conditions Not Met</div>
                <div class="card-desc text-base">${reasonHtml || 'This event requires conditions that have not been reached.'} You may still force trigger it.</div>
            </div>
        `;
    }

    if (template.decisions && template.decisions.length > 0) {
        html += `
            <h3 class="my-3 text-muted text-base uppercase">Generated Tasks</h3>
            <div class="action-list btn wiki-back-btn">
        `;
        template.decisions.forEach(dec => {
            html += `
                <div class="card p-1">
                    <strong>[${dec.role.toUpperCase()}]</strong> ${p(dec.text)}
                </div>
            `;
        });
        html += `</div>`;
    }

    html += `
        <div class="mt-2">
            <button class="btn btn-primary w-100 p-2 text-md ${meetsConditions ? '' : 'btn-danger'}" onclick="triggerEventFromPanel('${template.id}')">
                ${triggerBtnText}
            </button>
        </div>
    `;

    contentEl.innerHTML = html;
}

window.submitScores = function() {
    const newScores = {};
    for (const [key, input] of Object.entries(currentInputs)) {
        newScores[key] = parseInt(input.value);
    }
    socket.emit('update_scores', newScores);
};

window.resetGame = function() {
    if (confirm("Are you sure you want to reset the scenario to its initial state? All progress will be lost.")) {
        socket.emit('reset_game');
        document.getElementById('dropdown-menu').classList.remove('show');
    }
};

window.endScenario = endScenario;

window.toggleMenu = function() {
    document.getElementById('dropdown-menu').classList.toggle('show');
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.hamburger-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function renderScheduledEvents() {
    const container = document.getElementById('scheduled-events-list');
    if (!container) return;
    
    if (!currentState || !currentState.scheduledEvents || currentState.scheduledEvents.length === 0) {
        container.innerHTML = '<small>No scheduled events.</small>';
        return;
    }
    
    container.innerHTML = '';
    currentState.scheduledEvents.forEach(se => {
        const template = allTemplates.find(t => t.id === se.templateId);
        const name = template ? template.name : se.templateId;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.style.marginBottom = '0.5rem';
        card.style.padding = '0.5rem';
        
        let timeRemaining = se.paused ? se.timeRemainingMs : (se.triggerTimeMs - Date.now());
        if (timeRemaining < 0) timeRemaining = 0;
        
        const statusHtml = se.paused ? '<span class="text-status-4">PAUSED</span>' : `<span class="countdown-timer text-status-1" data-trigger-time="${se.triggerTimeMs}">${Math.ceil(timeRemaining/1000)}s</span>`;
        
        card.innerHTML = `
            <div class="flex-between">
                <strong>${name}</strong>
                ${statusHtml}
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                <button class="btn btn-primary" style="padding:0.2rem 0.5rem; font-size:0.8rem;" onclick="socket.emit('force_trigger_scheduled', '${se.uuid}')">Trigger Now</button>
                ${se.paused 
                    ? `<button class="btn" style="padding:0.2rem 0.5rem; font-size:0.8rem;" onclick="socket.emit('resume_scheduled_event', '${se.uuid}')">Resume</button>`
                    : `<button class="btn" style="padding:0.2rem 0.5rem; font-size:0.8rem;" onclick="socket.emit('pause_scheduled_event', '${se.uuid}')">Pause</button>`
                }
                <button class="btn text-danger" style="padding:0.2rem 0.5rem; font-size:0.8rem;" onclick="socket.emit('delete_scheduled_event', '${se.uuid}')">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Local tick for countdowns to prevent needing 10 server broadcasts a second
setInterval(() => {
    document.querySelectorAll('.countdown-timer').forEach(el => {
        const triggerTime = parseInt(el.getAttribute('data-trigger-time'));
        const remaining = Math.max(0, triggerTime - Date.now());
        el.textContent = Math.ceil(remaining/1000) + 's';
    });
}, 500);

window.showWikiPanel = function(category = null, itemId = null) {
    const titleEl = document.getElementById('fac-info-title');
    const contentEl = document.getElementById('fac-info-content');
    titleEl.textContent = 'Knowledge Wiki';
    
    contentEl.innerHTML = window.generateWikiHtml(currentState, category, itemId);
    
    const dialog = document.getElementById('fac-info-panel');
    if (!dialog.open) dialog.showModal();
};
