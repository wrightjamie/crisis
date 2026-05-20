const socket = io();

const scoreAdjustContainer = document.getElementById('score-adjust-container');
const eventsList = document.getElementById('facilitator-events-list');
const tasksList = document.getElementById('facilitator-tasks-list');
const availableEventsContainer = document.getElementById('available-events');
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
    queueAiGeneration(data.role, data.mode === 'initial');
});

socket.on('generate_ai_briefing_all', (data) => {
    if (!currentState || !currentState.scenarioConfig || !currentState.scenarioConfig.aiConfig) return;
    
    if (data && data.isStart) {
        scenarioRoles.forEach(r => {
            if (r === 'display' || r === 'facilitator') return;
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
        });
    }

    const context = data ? data.context : null;
    scenarioRoles.forEach(r => queueAiGeneration(r, false, context));
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

socket.on('active_roles', (roles) => {
    const container = document.getElementById('active-roles-display');
    if (!container) return;
    container.innerHTML = '<span style="font-size:0.75rem; color:var(--text-muted);">STATIONS:</span>';
    
    // Fallback to default if scenarioRoles is empty
    const expectedRoles = scenarioRoles.length > 0 ? scenarioRoles : ['home', 'defence', 'foreign', 'media', 'cyber', 'display'];
    
    expectedRoles.forEach(r => {
        const isOnline = roles.includes(r);
        const badge = document.createElement('span');
        badge.className = 'role-badge';
        
        if (isOnline) {
            badge.style.backgroundColor = 'var(--status-1)';
            badge.style.color = '#fff';
        } else {
            badge.style.backgroundColor = 'var(--bg-tertiary)';
            badge.style.color = 'var(--text-muted)';
        }
        
        badge.style.fontSize = '0.7rem';
        badge.style.padding = '0.1rem 0.4rem';
        badge.textContent = r;
        container.appendChild(badge);
    });
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
    if (state.status === 'holding') {
        dashboardEl.style.display = 'none';
        holdingEl.style.display = 'block';
        availableScenarios = state.availableScenarios;
        aiBaselineScores = {}; // Reset AI tracking
        prevFacilitatorScores = null;
        renderHoldingScreen();
    } else {
        if (!currentState || currentState.scenarioId !== state.scenarioId) {
            aiBaselineScores = {}; // Reset on new scenario
            prevFacilitatorScores = null;
            aiQueue = [];
        }
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
            axesHtml += '<div style="margin: 1rem 0; border-top: 1px solid var(--border-color); padding-top: 1rem;">';
            axesHtml += '<h3 style="color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 1rem;">Opening Conditions</h3>';
            
            s.variantAxes.forEach(axis => {
                axesHtml += `<div style="margin-bottom: 1rem;">`;
                axesHtml += `<label style="display: block; font-size: 0.9rem; font-weight: bold; color: var(--text-secondary); margin-bottom: 0.5rem;">${axis.name}</label>`;
                axesHtml += `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;" id="axis-${s.id}-${axis.id}">`;
                axis.options.forEach((opt, idx) => {
                    axesHtml += `<button class="btn variant-opt ${idx === 0 ? 'variant-selected' : ''}" data-scenario="${s.id}" data-axis="${axis.id}" data-option="${opt.id}" onclick="selectVariant('${s.id}', '${axis.id}', '${opt.id}', this)" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">${opt.name}</button>`;
                });
                axesHtml += '</div></div>';
                // Default to first option
                variantSelections[s.id][axis.id] = axis.options[0].id;
            });

            axesHtml += `<button class="btn" onclick="randomiseVariants('${s.id}')" style="font-size: 0.8rem; padding: 0.3rem 0.8rem; background: none; border: 1px solid var(--text-muted); color: var(--text-muted); margin-top: 0.5rem;">🎲 Randomise All</button>`;
            axesHtml += '</div>';
        }

        const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;
        let validationHtml = '';
        if (s.isValid === false) {
            validationHtml = `<div style="margin-bottom: 1rem; padding: 0.5rem; border: 1px solid var(--accent-red); background: rgba(231,76,60,0.1); color: var(--accent-red); font-size: 0.85rem; border-radius: var(--radius-sm);">
                <strong>⚠️ Scenario configuration invalid:</strong>
                <ul style="margin: 0.5rem 0 0 1.5rem; padding: 0;">
                    ${s.validationErrors.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>`;
        }
        
        div.innerHTML = `
            <h2>${p(s.name)}</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${p(s.description)}</p>
            ${validationHtml}
            ${axesHtml}
            <button class="btn btn-primary" onclick="startScenario('${s.id}')" style="width: 100%; margin-top: 0.5rem;" ${s.isValid === false ? 'disabled' : ''}>Start Scenario</button>
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

function startScenario(id) {
    const selectedVariants = variantSelections[id] || {};
    socket.emit('start_scenario', { scenarioId: id, selectedVariants });
}

function endScenario() {
    if (confirm("End this scenario and return to the holding screen?")) {
        socket.emit('end_scenario');
        document.getElementById('dropdown-menu').classList.remove('show');
    }
}

function checkConditions(template, scores, assets) {
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
    return true;
}

function renderEventButtons() {
    const availableEventsContainer = document.getElementById('available-events');
    const usedEventsContainer = document.getElementById('used-events');
    const pendingConditionsContainer = document.getElementById('pending-conditions-events');
    
    availableEventsContainer.innerHTML = '';
    usedEventsContainer.innerHTML = '';
    if (pendingConditionsContainer) pendingConditionsContainer.innerHTML = '';

    const triggeredTemplateIds = new Set(currentState.events.map(e => e.templateId));
    let currentAvailableEventIds = new Set();

    allTemplates.forEach(template => {
        const requiresUnlockMet = !template.requiresUnlock || currentState.unlockedEvents.includes(template.id);
        const prerequisitesMet = !template.prerequisites || template.prerequisites.every(p => triggeredTemplateIds.has(p));
        const isUnlocked = requiresUnlockMet && prerequisitesMet;
        if (!isUnlocked) return; // Hidden

        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        
        if (!template.repeatable && triggeredTemplateIds.has(template.id)) {
            // Disabled and moved to used
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.style.backgroundColor = 'var(--bg-tertiary)';
            btn.style.color = 'var(--text-muted)';
            btn.textContent = `Used: ${template.name}`;
            usedEventsContainer.appendChild(btn);
        } else {
            // Available (either repeatable or not yet triggered)
            const meetsConditions = checkConditions(template, currentState.scores, currentState.assets);
            
            if (meetsConditions) {
                btn.textContent = template.name;
                btn.onclick = () => openEventDetails(template.id);
                
                // Add glow if newly available
                if (!previousAvailableEventIds.has(template.id)) {
                    btn.classList.add('btn-new-event');
                    // Remove class after animation
                    setTimeout(() => btn.classList.remove('btn-new-event'), 3000);
                }
                currentAvailableEventIds.add(template.id);
                
                availableEventsContainer.appendChild(btn);
            } else {
                // Unlocked but pending score criteria
                btn.textContent = template.name;
                btn.style.backgroundColor = 'var(--bg-tertiary)';
                btn.style.color = 'var(--text-muted)';
                btn.style.border = '1px solid var(--border-color)';
                btn.onclick = () => openEventDetails(template.id);
                if (pendingConditionsContainer) pendingConditionsContainer.appendChild(btn);
            }
        }
    });
    
    previousAvailableEventIds = currentAvailableEventIds;

    if (usedEventsContainer.children.length === 0) {
        usedEventsContainer.innerHTML = '<small>No used events.</small>';
    }
    if (availableEventsContainer.children.length === 0) {
        availableEventsContainer.innerHTML = '<small>No available events.</small>';
    }
    if (pendingConditionsContainer && pendingConditionsContainer.children.length === 0) {
        pendingConditionsContainer.innerHTML = '<small>No events pending conditions.</small>';
    }
}

function formatName(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function renderGlobalView() {
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    // Top bar scores were removed in a previous refactor

    // Events List
    const recentEvents = currentState.events.slice().reverse().slice(0, 5);
    eventsList.innerHTML = recentEvents.length === 0 ? '<p>No active events.</p>' : '';
    recentEvents.forEach(evt => {
        eventsList.innerHTML += `
            <div class="card" style="margin-bottom: 0.5rem; padding: 0.5rem;">
                <strong>${p(evt.name)}</strong><br>
                <small>${new Date(evt.timestamp).toLocaleTimeString()}</small>
            </div>
        `;
    });

    // Tasks/Decisions List
    const pendingTasks = currentState.decisionTasks.filter(t => t.status !== 'resolved');
    const resolvedTasks = currentState.decisionTasks.filter(t => t.status === 'resolved').slice(-5).reverse();
    const displayTasks = [...pendingTasks, ...resolvedTasks];
    
    tasksList.innerHTML = displayTasks.length === 0 ? '<p>No decisions generated.</p>' : '';
    displayTasks.forEach(task => {
        const statusStr = task.status === 'resolved' 
            ? `<span style="color:var(--status-1)">Resolved (${task.selectedOption})</span>` 
            : `<span style="color:var(--accent-orange)">Pending</span>`;
            
        const dismissBtn = task.status === 'pending' 
            ? `<button onclick="dismissDecision('${task.id}')" class="btn" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; background: var(--bg-tertiary);">Dismiss</button>` 
            : '';

        tasksList.innerHTML += `
            <div class="card" style="margin-bottom: 0.5rem; padding: 0.5rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong>[${task.role.toUpperCase()}]</strong>
                    <div style="display:flex; gap:0.5rem; align-items:center;">
                        ${statusStr}
                        ${dismissBtn}
                    </div>
                </div>
                <small style="display:block; margin-top:0.5rem;">${p(task.text)}</small>
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
            row.style.backgroundColor = 'var(--bg-tertiary)';
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
    document.body.classList.add('fac-panel-open');
    refreshFacilitatorInfoPanel();
};

window.closeFacilitatorPanel = function() {
    document.body.classList.remove('fac-panel-open');
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

    const meetsConditions = checkConditions(template, currentState.scores, currentState.assets);
    const triggerBtnText = meetsConditions ? 'TRIGGER EVENT' : 'FORCE TRIGGER';
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;
    
    let html = `
        <div class="card" style="margin-bottom: 1rem;">
    `;
    
    if (template.image) {
        html += `<img src="${template.image}" alt="${template.name}" style="width: 100%; border-radius: var(--radius-sm) var(--radius-sm) 0 0; margin: -1.5rem -1.5rem 1rem -1.5rem; width: calc(100% + 3rem); display: block; border-bottom: 1px solid var(--border-color);">`;
    }

    html += `
            <div class="card-title">${p(template.name)}</div>
            <div class="card-desc">${p(template.description)}</div>
        </div>
    `;

    if (template.facilitatorNotes) {
        html += `
            <div class="card" style="margin-bottom: 1rem; border-color: var(--accent-orange); background-color: rgba(230, 126, 34, 0.1);">
                <div class="card-title" style="color: var(--accent-orange); font-size: 0.9rem; margin-bottom: 0.5rem;">Facilitator Notes</div>
                <div class="card-desc" style="font-size: 0.9rem;">${p(template.facilitatorNotes)}</div>
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
            <div class="card" style="margin-bottom: 1rem; border-color: var(--accent-red); background-color: rgba(231, 76, 60, 0.1);">
                <div class="card-title" style="color: var(--accent-red); font-size: 0.9rem; margin-bottom: 0.5rem;">Warning: Conditions Not Met</div>
                <div class="card-desc" style="font-size: 0.9rem;">${reasonHtml || 'This event requires conditions that have not been reached.'} You may still force trigger it.</div>
            </div>
        `;
    }

    if (template.decisions && template.decisions.length > 0) {
        html += `
            <h3 style="margin: 1.5rem 0 0.5rem; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase;">Generated Tasks</h3>
            <div class="action-list" style="margin-bottom: 1rem;">
        `;
        template.decisions.forEach(dec => {
            html += `
                <div class="card" style="padding: 0.5rem;">
                    <strong>[${dec.role.toUpperCase()}]</strong> ${p(dec.text)}
                </div>
            `;
        });
        html += `</div>`;
    }

    html += `
        <div style="margin-top: 2rem;">
            <button class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; ${meetsConditions ? '' : 'background-color: var(--accent-red); border-color: var(--accent-red);'}" onclick="triggerEventFromPanel('${template.id}')">
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
        
        const statusHtml = se.paused ? '<span style="color:var(--accent-orange)">PAUSED</span>' : `<span class="countdown-timer" style="color:var(--status-1)" data-trigger-time="${se.triggerTimeMs}">${Math.ceil(timeRemaining/1000)}s</span>`;
        
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
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
