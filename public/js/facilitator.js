const socket = io();
let gameId = new URLSearchParams(window.location.search).get('game');

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
    // Dashboard Logic
    const dashboardView = document.getElementById('dashboard-view');
    const facilitatorView = document.getElementById('facilitator-view');

    if (gameId) {
        dashboardView.style.display = 'none';
        facilitatorView.style.display = 'block';
        document.getElementById('fac-game-id-display').textContent = gameId;
        socket.emit('join_game', gameId);

        socket.emit('register_role', 'facilitator');
    } else {
        dashboardView.style.display = 'block';
        facilitatorView.style.display = 'none';
        socket.emit('request_dashboard_data');
    }

    const btnCreateGame = document.getElementById('btn-create-game');
    const operationAdjectives = ['Silent', 'Crimson', 'Iron', 'Swift', 'Phantom', 'Cobalt', 'Fallen', 'Hidden', 'Midnight', 'Shattered', 'Silver', 'Golden', 'Radiant', 'Black', 'White'];
    const operationNouns = ['Smoke', 'Shield', 'Vanguard', 'Strike', 'Eagle', 'Serpent', 'Dawn', 'Storm', 'Horizon', 'Thunder', 'Shadow', 'Arrow', 'Spear', 'Crown', 'Sword'];

    function getRandomOperationName() {
        const adj = operationAdjectives[Math.floor(Math.random() * operationAdjectives.length)];
        const noun = operationNouns[Math.floor(Math.random() * operationNouns.length)];
        return `Operation ${adj} ${noun}`;
    }

    const nameInput = document.getElementById('new-game-name');
    const btnRandomName = document.getElementById('btn-random-name');

    if (nameInput) {
        nameInput.value = getRandomOperationName();
    }

    if (btnRandomName && nameInput) {
        btnRandomName.addEventListener('click', () => {
            nameInput.value = getRandomOperationName();
        });
    }

    if (btnCreateGame) {
        btnCreateGame.addEventListener('click', () => {
            const name = document.getElementById('new-game-name').value.trim();
            if (name.length > 0) {
                document.getElementById('create-error').style.display = 'none';
                socket.emit('create_game', { name });
            } else {
                document.getElementById('create-error').textContent = 'Please enter a Game Name';
                document.getElementById('create-error').style.display = 'block';
            }
        });
    }

    socket.on('game_created', (newId) => {
        window.location.href = `?game=${newId}`;
    });

    socket.on('dashboard_error', (msg) => {
        if (document.getElementById('create-error')) {
            document.getElementById('create-error').textContent = msg;
            document.getElementById('create-error').style.display = 'block';
        }
    });

    socket.on('dashboard_data', (games) => {
        if (gameId) return; // Ignore if in a game

        const activeList = document.getElementById('games-list');
        const deadList = document.getElementById('dead-games-list');
        if (!activeList || !deadList) return;

        activeList.innerHTML = '';
        deadList.innerHTML = '';

        const now = Date.now();
        const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

        games.forEach(g => {
            const isDead = (now - g.lastActivity) > ONE_WEEK_MS;
            const card = document.createElement('div');
            card.className = 'admin-card';

            const stateText = g.status === 'holding' ? 'Lobby/Holding' : 'Active Scenario';
            const facBadge = g.hasFacilitator ? '<span class="role-badge" style="background-color: var(--status-1); color: var(--text-primary); font-size: 0.8em; padding: 2px 6px;">Facilitator Online</span>' : '<span class="role-badge" style="background-color: var(--accent-orange); color: var(--text-primary); font-size: 0.8em; padding: 2px 6px;">Facilitator Offline</span>';
            const dateStr = new Date(g.lastActivity).toLocaleDateString();

            card.innerHTML = `
                <h3 class="card-title" style="color: var(--text-primary);"></h3>
                <p class="text-sm text-secondary mb-1">Status: ${stateText}<br>Last Active: ${dateStr}</p>
                <div class="mb-1">${facBadge}</div>
                <div class="flex-column gap-05">
                    <button class="btn btn-primary w-100 join-btn">Join Game</button>
                    ${isDead ? `<button class="btn btn-secondary w-100 text-red delete-btn">Delete Game</button>` : ''}
                </div>
            `;
            card.querySelector('.card-title').textContent = `${g.name} (ID: ${g.id.toUpperCase()})`;
            card.querySelector('.join-btn').addEventListener('click', () => { window.location.href = `?game=${g.id}`; });
            if (isDead) {
                card.querySelector('.delete-btn').addEventListener('click', () => { deleteGame(g.id); });
            }

            if (isDead) {
                deadList.appendChild(card);
            } else {
                activeList.appendChild(card);
            }
        });

        if (activeList.children.length === 0) activeList.innerHTML = '<p class="text-muted p-1">No active games.</p>';
        if (deadList.children.length === 0) deadList.innerHTML = '<p class="text-muted p-1">No dead games.</p>';
    });

    window.deleteGame = function(id) {
        if (confirm(`Are you sure you want to permanently delete game ${id}?`)) {
            socket.emit('delete_game', id);
        }
    };

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
            
            const result = await window.AICore.generateBrief(config, task.role, currentScores, baseline, task.context, currentState.scenarioConfig?.scoreConfigs || {});
            
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

document.addEventListener('DOMContentLoaded', () => {
    const lobbyEl = document.getElementById('facilitator-lobby-screen');

    // Setup filter slider
    const sliderEl = document.getElementById('player-filter-slider');
    const labelEl = document.getElementById('player-filter-label');
    if (sliderEl && labelEl) {
        sliderEl.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            labelEl.textContent = val === 0 ? 'Players: Any' : `Players: ${val}`;
            if (availableScenarios && availableScenarios.length > 0) {
                renderHoldingScreen();
            }
        });
    }

    [holdingEl, lobbyEl].forEach(el => {
        if (el) el.addEventListener('cancel', e => e.preventDefault());
    });
});

socket.on('connect', () => {
    socket.emit('register_role', 'facilitator');
});

socket.on('scenario_error', (msg) => {
    alert(msg);
});

function kickPlayer(role) {
    if (confirm(`Are you sure you want to kick the player currently acting as ${role.toUpperCase()}?`)) {
        socket.emit('kick_player', role);
    }
}

function createStationBadgeHtml(role, isOnline, pendingSocketId, mode, isMandatory = false) {
    const badgeModeClass = mode === 'dropdown' ? 'dropdown-mode' : 'lobby-mode';
    const statusClass = pendingSocketId ? 'pending-approval' : (isOnline ? 'online' : 'offline');
    const mandatoryHtml = (mode === 'lobby' && isMandatory) ? ' <span class="text-accent-orange text-sm ml-xs">*</span>' : '';
    
    let actionHtml = '';
    if (pendingSocketId) {
        actionHtml = `
            <div style="display:flex; gap: 8px; margin-left: auto;">
                <button class="btn-icon action-approve" onclick="approvePlayer('${pendingSocketId}')" title="Approve Player">✓</button>
                <button class="btn-icon action-reject" onclick="rejectPlayer('${pendingSocketId}')" title="Reject Player">&times;</button>
            </div>
        `;
    } else if (isOnline) {
        actionHtml = `<button class="btn-icon action-kick ml-auto" onclick="kickPlayer('${role}')" title="Kick Player">&times;</button>`;
    }
    
    return `
        <div class="station-badge ${badgeModeClass} ${statusClass}" style="display: flex; align-items: center;">
            <div class="station-indicator ${badgeModeClass} ${statusClass}"></div>
            <span>${role.toUpperCase()}${mandatoryHtml}</span>
            ${actionHtml}
        </div>
    `;
}

let currentActiveRoles = [];
let pendingPlayers = {};

function approvePlayer(socketId) {
    socket.emit('approve_player', socketId);
}

function rejectPlayer(socketId) {
    socket.emit('reject_player', socketId);
}

function renderActiveRoles() {
    const container = document.getElementById('active-roles-display');
    const config = currentState && currentState.scenarioConfig ? currentState.scenarioConfig : {};
    const mandatoryRoles = config.mandatoryRoles || [];
    const minUsers = config.minUsers || 1;
    if (container) {
        container.innerHTML = '<div class="text-xs text-muted" class="mb-sm border-bottom pb-xs">STATIONS:</div>';
        
        const expectedRoles = scenarioRoles.length > 0 ? scenarioRoles : ['home', 'defence', 'foreign', 'media', 'cyber', 'display'];
        container.innerHTML += expectedRoles.map(r => {
            const isOnline = currentActiveRoles.includes(r);
            // Check if there is a pending socketId for this role
            let pendingSocketId = null;
            for (const [sId, role] of Object.entries(pendingPlayers)) {
                if (role === r) {
                    pendingSocketId = sId;
                    break;
                }
            }
            return createStationBadgeHtml(r, isOnline, pendingSocketId, 'dropdown', mandatoryRoles.includes(r));
        }).join('');
    }
}

socket.on('pending_players', (players) => {
    pendingPlayers = players;
    renderActiveRoles();
});

socket.on('active_roles', (roles) => {
    currentActiveRoles = roles;
    renderActiveRoles();
    // Also update lobby screen if active
    const lobbyRoles = document.getElementById('lobby-active-roles');
    if (lobbyRoles && currentState && currentState.status === 'lobby') {
        lobbyRoles.innerHTML = '';
        const config = currentState.scenarioConfig || {};
        const mandatoryRoles = config.mandatoryRoles || [];
        const minUsers = config.minUsers || 1;
        const expectedRoles = scenarioRoles.length > 0 ? scenarioRoles : ['home', 'defence', 'foreign', 'media', 'cyber', 'display'];
        lobbyRoles.innerHTML = expectedRoles
            .filter(r => r !== 'facilitator')
            .map(r => createStationBadgeHtml(r, roles.includes(r), null, 'lobby', mandatoryRoles.includes(r)))
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
            minUsersEl.innerHTML = `<span class="text-accent-orange">Waiting for more players... (${activePlayerCount}/${minUsers} minimum required)</span>`;
        } else {
            minUsersEl.innerHTML = `<span class="text-status-1">Ready to start! Minimum players met (${activePlayerCount}/${minUsers})</span>`;
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
        if (lobbyEl.open) lobbyEl.close();
        if (!holdingEl.open) holdingEl.showModal();
        availableScenarios = state.availableScenarios;
        aiBaselineScores = {}; // Reset AI tracking
        prevFacilitatorScores = null;
        renderHoldingScreen();
    } else if (state.status === 'lobby') {
        dashboardEl.style.display = 'none';
        if (holdingEl.open) holdingEl.close();
        if (!lobbyEl.open) lobbyEl.showModal();
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
        if (lobbyEl.open) lobbyEl.close();
        dashboardEl.style.display = 'block';
        if (holdingEl.open) holdingEl.close();
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

    const gameIdDisplay = document.getElementById('lobby-game-id-display');
    if (gameIdDisplay) {
        gameIdDisplay.textContent = gameId || 'N/A';
    }
}

let variantSelections = {}; // { scenarioId: { axisId: optionId } }

function renderHoldingScreen() {
    const detailsPanel = document.getElementById('scenario-details-panel');
    const sliderEl = document.getElementById('player-filter-slider');
    const filterValue = sliderEl ? parseInt(sliderEl.value) : 0;

    // First time init
    if (sliderEl && !sliderEl.hasAttribute('data-initialized')) {
        let maxGlobalPlayers = 0;
        availableScenarios.forEach(s => {
            const maxP = s.roles ? s.roles.filter(r => r !== 'display' && r !== 'facilitator').length : 0;
            if (maxP > maxGlobalPlayers) maxGlobalPlayers = maxP;
        });
        sliderEl.max = maxGlobalPlayers > 0 ? maxGlobalPlayers : 10;
        sliderEl.setAttribute('data-initialized', 'true');
    }

    scenariosListEl.innerHTML = '';

    // Reset details panel
    if (detailsPanel) {
        detailsPanel.innerHTML = '<p class="text-secondary text-lg">Select a scenario to view details</p>';
        detailsPanel.style.display = 'flex';
        detailsPanel.style.flexDirection = 'column';
        detailsPanel.style.justifyContent = 'center';
        detailsPanel.style.alignItems = 'center';
        detailsPanel.style.textAlign = 'center';
        detailsPanel.className = 'admin-card';
    }

    let visibleCount = 0;

    availableScenarios.forEach(s => {
        const minP = s.minUsers || 1;
        const maxP = s.roles ? s.roles.filter(r => r !== 'display' && r !== 'facilitator').length : minP;

        if (filterValue > 0) {
            if (filterValue < minP || filterValue > maxP) return;
        }

        visibleCount++;

        // Init default variants regardless of selection so they're ready if needed
        variantSelections[s.id] = {};
        if (s.variantAxes && s.variantAxes.length > 0) {
            s.variantAxes.forEach(axis => {
                variantSelections[s.id][axis.id] = axis.options[0].id;
            });
        }

        const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;
        
        const div = document.createElement('div');
        div.className = 'admin-card scenario-item';

        // One liner description (just take the first sentence or truncate)
        let shortDesc = p(s.description || '');
        const firstSentenceMatch = shortDesc.match(/^.*?[.!?](?:\s|$)/);
        if (firstSentenceMatch) {
            shortDesc = firstSentenceMatch[0].trim();
        } else if (shortDesc.length > 80) {
            shortDesc = shortDesc.substring(0, 80) + '...';
        }

        div.innerHTML = `
            <h3 class="text-primary m-0 mb-xs">${p(s.name)}</h3>
            <p class="text-secondary text-sm m-0">${shortDesc}</p>
            <div class="text-xs text-muted mt-1">${minP}-${maxP} Players</div>
        `;

        div.onclick = () => {
            // Highlight selected
            document.querySelectorAll('#scenarios-list .scenario-item').forEach(card => {
                card.classList.remove('active');
            });
            div.classList.add('active');

            renderScenarioDetails(s.id);
        };

        scenariosListEl.appendChild(div);
    });

    if (visibleCount === 0) {
        scenariosListEl.innerHTML = '<p class="text-secondary text-center p-2">No scenarios match your filter criteria.</p>';
    }
}

function renderScenarioDetails(scenarioId) {
    const detailsPanel = document.getElementById('scenario-details-panel');
    if (!detailsPanel) return;

    const s = availableScenarios.find(x => x.id === scenarioId);
    if (!s) return;

    detailsPanel.style.display = 'block';
    detailsPanel.style.textAlign = 'left';

    let axesHtml = '';
    if (s.variantAxes && s.variantAxes.length > 0) {
        axesHtml += '<div class="mt-2 pt-1 border-top">';
        axesHtml += '<h3 class="text-sm text-muted uppercase mb-1">Opening Conditions</h3>';

        s.variantAxes.forEach(axis => {
            axesHtml += `<div class="mb-lg">`;
            axesHtml += `<label class="text-base text-bold text-secondary mb-md d-block">${axis.name}</label>`;
            axesHtml += `<div class="btn-group inline mb-md" id="axis-${s.id}-${axis.id}">`;
            axis.options.forEach((opt, idx) => {
                const isSelected = variantSelections[s.id][axis.id] === opt.id;
                axesHtml += `<button class="btn variant-opt ${isSelected ? 'btn-primary' : 'btn-secondary'} text-sm" data-scenario="${s.id}" data-axis="${axis.id}" data-option="${opt.id}" onclick="selectVariant('${s.id}', '${axis.id}', '${opt.id}', this)">${opt.name}</button>`;
            });
            axesHtml += '</div></div>';
        });

        axesHtml += `<button class="btn btn-ghost text-sm" onclick="randomiseVariants('${s.id}')">🎲 Randomise All</button>`;
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

    detailsPanel.innerHTML = `
        <h2 style="color: var(--accent-blue); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem;">${p(s.name)}</h2>
        <p class="text-secondary mb-2" style="white-space: pre-wrap;">${p(s.description)}</p>
        ${validationHtml}
        ${axesHtml}
        <div style="margin-top: auto; padding-top: 1rem;">
            <button class="btn btn-primary w-100 mt-1" onclick="openLobby('${s.id}')" ${s.isValid === false ? 'disabled' : ''}>Open Lobby</button>
        </div>
    `;
}

window.selectVariant = function(scenarioId, axisId, optionId, btnEl) {
    variantSelections[scenarioId][axisId] = optionId;
    // Update visual selection
    const container = document.getElementById(`axis-${scenarioId}-${axisId}`);
    if (container) {
        container.querySelectorAll('.variant-opt').forEach(b => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-secondary');
        });
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-primary');
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
                const isSelected = b.getAttribute('data-option') === randomOpt.id;
                if (isSelected) {
                    b.classList.remove('btn-secondary');
                    b.classList.add('btn-primary');
                } else {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-secondary');
                }
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



function renderEventButtons() {
    const usedEventsContainer = document.getElementById('used-events');
    
    usedEventsContainer.innerHTML = '';

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
        }
    });

    if (usedEventsContainer.children.length === 0) {
        usedEventsContainer.innerHTML = '<small>No used events.</small>';
    }
    
    // Render the interactive tree which replaces the old Available Events list
    if (window.renderScenarioExplorer) {
        window.renderScenarioExplorer();
    }
    
    // Update Stage Display
    if (currentState && currentState.scenarioConfig && currentState.scenarioConfig.stages) {
        const stages = currentState.scenarioConfig.stages;
        const currentStageIndex = currentState.currentStageIndex || 0;
        const stageDisplay = document.getElementById('current-stage-display');
        if (stageDisplay && stages[currentStageIndex]) {
            stageDisplay.textContent = `Stage ${currentStageIndex + 1}: ${stages[currentStageIndex].name}`;
        }
    }
}

window.changeStage = function(delta) {
    if (!currentState || !currentState.scenarioConfig || !currentState.scenarioConfig.stages) return;
    const maxStage = currentState.scenarioConfig.stages.length - 1;
    const currentStage = currentState.currentStageIndex || 0;
    const newStage = Math.max(0, Math.min(maxStage, currentStage + delta));
    
    if (newStage !== currentStage) {
        socket.emit('change_stage', newStage);
    }
};



function renderGlobalView() {
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    // Top bar scores were removed in a previous refactor

    // Events List
    // Filter out player-triggered manual actions (IDs starting with 'evt_action_')
    const recentEvents = currentState.events.filter(e => !e.id.startsWith('evt_action_')).slice().reverse().slice(0, 5);
    eventsList.innerHTML = recentEvents.length === 0 ? '<p>No active events.</p>' : '';
    recentEvents.forEach(evt => {
        let secretBadge = '';
        if (evt.visibleTo || evt.hiddenFrom) {
            secretBadge = `<span class="bg-primary p-1 radius-sm border-color text-xs uppercase" style="margin-left: 8px;">Secret</span>`;
        }
        eventsList.innerHTML += `
            <div class="card mb-1 p-1">
                <strong>${p(evt.name)}</strong>${secretBadge}<br>
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
            ? `<button onclick="dismissDecision('${task.id}')" class="btn btn-danger text-sm p-1">Dismiss</button>` 
            : '';

        let secretBadge = '';
        if (task.visibleTo || task.hiddenFrom) {
            secretBadge = `<span class="bg-primary p-1 radius-sm border-color text-xs uppercase" style="margin-right: 8px;">Secret</span>`;
        }

        tasksList.innerHTML += `
            <div class="card mb-1 p-1">
                <div class="flex-between">
                    <strong>[${task.role.toUpperCase()}] ${secretBadge}</strong>
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

        const config = currentState.scenarioConfig?.scoreConfigs?.[key];

        const label = document.createElement('span');
        let labelText = formatName(key);
        if (config && config.visibleToPlayers === false) {
             labelText += ' 🔒';
        }
        label.textContent = labelText;
        
        const input = document.createElement('input');
        input.type = 'range';
        input.min = config && config.min !== undefined ? config.min : 1;
        input.max = config && config.max !== undefined ? config.max : 5;
        input.value = value;
        input.style.width = '100%';
        input.style.accentColor = 'var(--accent-blue)';
        
        const valueDisplay = document.createElement('span');
        valueDisplay.textContent = config && config.unit ? `${value} ${config.unit}` : value;
        valueDisplay.style.fontWeight = 'bold';
        valueDisplay.style.minWidth = '20px';
        valueDisplay.style.textAlign = 'right';
        
        input.oninput = (e) => {
            valueDisplay.textContent = config && config.unit ? `${e.target.value} ${config.unit}` : e.target.value;
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

function _checkMinScoreWarnings(minScores, currentState) {
    let html = '';
    for (const [key, val] of Object.entries(minScores)) {
        const current = currentState.scores[key] || 0;
        if (current < val) html += `<div>• ${formatName(key)} must be ≥ ${val} (currently ${current})</div>`;
    }
    return html;
}

function _checkMaxScoreWarnings(maxScores, currentState) {
    let html = '';
    for (const [key, val] of Object.entries(maxScores)) {
        const current = currentState.scores[key] || 0;
        if (current > val) html += `<div>• ${formatName(key)} must be ≤ ${val} (currently ${current})</div>`;
    }
    return html;
}

function _checkAssetWarnings(assetReqs, currentState) {
    let html = '';
    for (const [assetId, requiredState] of Object.entries(assetReqs)) {
        const asset = (currentState.assets || []).find(a => a.id === assetId);
        const currentAssetState = asset ? asset.state : 'missing';
        if (!asset || asset.state !== requiredState) {
            html += `<div>• Asset "${asset ? asset.name : assetId}" must be ${requiredState} (currently ${currentAssetState})</div>`;
        }
    }
    return html;
}

function buildFacilitatorEventConditionsWarning(template, currentState) {
    let reasonHtml = '';
    if (template.conditions) {
        if (template.conditions.minScores) reasonHtml += _checkMinScoreWarnings(template.conditions.minScores, currentState);
        if (template.conditions.maxScores) reasonHtml += _checkMaxScoreWarnings(template.conditions.maxScores, currentState);
        if (template.conditions.assets) reasonHtml += _checkAssetWarnings(template.conditions.assets, currentState);
    }
    return `
        <div class="card mb-2 border-red bg-red-faded">
            <div class="card-title text-red text-base mb-1">Warning: Conditions Not Met</div>
            <div class="card-desc text-base">${reasonHtml || 'This event requires conditions that have not been reached.'} You may still force trigger it.</div>
        </div>
    `;
}

function buildFacilitatorEventDetailsHtml(template, meetsConditions, currentState, p) {
    const triggerBtnText = meetsConditions ? 'TRIGGER EVENT' : 'FORCE TRIGGER';
    
    let html = `<div class="card btn btn-secondary wiki-back-btn">`;
    if (template.image) html += `<img src="${template.image}" alt="${template.name}" class="wiki-img">`;
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
        html += buildFacilitatorEventConditionsWarning(template, currentState);
    }

    if (template.decisions && template.decisions.length > 0) {
        html += `
            <h3 class="my-3 text-muted text-base uppercase">Generated Tasks</h3>
            <div class="action-list btn btn-secondary wiki-back-btn">
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
    
    return html;
}

function refreshFacilitatorInfoPanel() {
    if (!currentEventDetailsId || !currentState) return;
    const template = allTemplates.find(t => t.id === currentEventDetailsId);
    if (!template) return;

    const titleEl = document.getElementById('fac-info-title');
    const contentEl = document.getElementById('fac-info-content');

    titleEl.textContent = 'Event Details';

    const meetsConditions = checkConditions(template, currentState.scores, currentState.assets, currentState.unlockedEvents, currentState.events.map(e => e.templateId), currentActiveRoles);
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;
    
    contentEl.innerHTML = buildFacilitatorEventDetailsHtml(template, meetsConditions, currentState, p);
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
            <div class="btn-group mt-sm">
                <button class="btn btn-primary text-sm" onclick="socket.emit('force_trigger_scheduled', '${se.uuid}')">Trigger Now</button>
                ${se.paused 
                    ? `<button class="btn btn-secondary text-sm" onclick="socket.emit('resume_scheduled_event', '${se.uuid}')">Resume</button>`
                    : `<button class="btn btn-secondary text-sm" onclick="socket.emit('pause_scheduled_event', '${se.uuid}')">Pause</button>`
                }
                <button class="btn btn-danger text-sm" onclick="socket.emit('delete_scheduled_event', '${se.uuid}')">Delete</button>
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
