// Client Logic
const socket = io();

// Global state and view tracking
let role = null;
let activeRolesList = [];
let localState = null;
let previousScores = null;
let previousAiBriefingTimestamp = null;
let currentInfoView = null;
let previousAvailableActions = [];

// DOM Elements
const appEl = document.getElementById('app');
const holdingScreen = document.getElementById('holding-screen');
const roleSelectionScreen = document.getElementById('role-selection-screen');
const pendingApprovalScreen = document.getElementById('pending-approval-screen');
const roleButtonsContainer = document.getElementById('role-buttons');
const briefingScreen = document.getElementById('briefing-screen');
const endgameScreen = document.getElementById('endgame-screen');

[holdingScreen, roleSelectionScreen, pendingApprovalScreen, briefingScreen, endgameScreen].forEach(el => {
    if (el) el.addEventListener('cancel', e => e.preventDefault());
});

const roleDisplay = document.getElementById('role-display');
const mainContent = document.getElementById('main-content');
const infoPanelTitle = document.getElementById('info-panel-title');
const infoContent = document.getElementById('info-content');
const btnCloseInfo = document.getElementById('btn-close-info');
const btnAiBriefing = document.getElementById('btn-ai-briefing');
const btnWiki = document.getElementById('btn-wiki');
const btnActions = document.getElementById('btn-actions');

// Socket events for roles
socket.on('active_roles', (roles) => {
    activeRolesList = roles;
    if (localState && (localState.status === 'active' || localState.status === 'lobby') && !role) {
        switchView('role_selection');
    }
});

function switchView(viewName) {
    // Hide all
    if (roleSelectionScreen.open) roleSelectionScreen.close();
    if (holdingScreen.open) holdingScreen.close();
    if (pendingApprovalScreen && pendingApprovalScreen.open) pendingApprovalScreen.close();
    if (briefingScreen.open) briefingScreen.close();
    if (endgameScreen && endgameScreen.open) endgameScreen.close();
    appEl.style.display = 'none';

    // Show requested
    switch (viewName) {
        case 'role_selection':
            if (!roleSelectionScreen.open) roleSelectionScreen.showModal();
            break;
        case 'lobby':
            if (!holdingScreen.open) holdingScreen.showModal();
            const h1 = holdingScreen.querySelector('h1');
            const p = holdingScreen.querySelector('p');
            const roleNames = localState.scenarioConfig ? (localState.scenarioConfig.roleNames || {}) : {};
            const displayName = roleNames[role] || role.toUpperCase();
            if (h1) h1.textContent = `Welcome ${displayName}`;
            if (p) p.textContent = "The facilitator is preparing to launch the scenario...";
            break;
        case 'pending_approval':
            if (pendingApprovalScreen && !pendingApprovalScreen.open) pendingApprovalScreen.showModal();
            break;
        case 'briefing':
            if (!briefingScreen.open) briefingScreen.showModal();
            break;
        case 'map':
            appEl.style.display = 'grid';
            if (map) setTimeout(() => map.invalidateSize(), 200);
            break;
    }
}

socket.on('role_registered', (registeredRole) => {
    role = registeredRole;
    sessionStorage.setItem('crisis_role', role);
    const roleDisplay = document.getElementById('role-display');
    if (roleDisplay) roleDisplay.textContent = role.toUpperCase();
    updateGlobalLeaveButton();
    if (localState) handleStateUpdate(localState); // Re-render correct view
    if (role === 'display') {
        document.body.classList.add('role-display');
    }

    // Update map view using scenario config
    if (localState.scenarioConfig && localState.scenarioConfig.mapConfig) {
        map.setView(localState.scenarioConfig.mapConfig.center, localState.scenarioConfig.mapConfig.zoom);
    }

    if (localState.status === 'lobby') {
        switchView('lobby');
    } else {
        if (sessionStorage.getItem('crisis_view_state') === 'map') {
            switchView('map');
        } else if (localState.scenarioConfig && localState.scenarioConfig.briefings) {
            showBriefing();
        } else {
            switchView('map');
        }
    }
});

socket.on('role_error', (msg) => {
    alert(msg);
    role = null;
    sessionStorage.removeItem('crisis_role');
    updateGlobalLeaveButton();
    if (localState && localState.status === 'lobby') {
        switchView('role_selection');
        renderRoleSelection();
    }
});

socket.on('role_pending_approval', () => {
    switchView('pending_approval');
});

socket.on('role_rejected', () => {
    alert("Your station request was rejected by the facilitator.");
    role = null;
    sessionStorage.removeItem('crisis_role');
    updateGlobalLeaveButton();
    if (localState && localState.status === 'holding') {
        switchView('holding');
        handleHoldingState();
    } else {
        switchView('role_selection');
        if (localState && localState.status === 'lobby' || localState.status === 'active') {
            renderRoleSelection();
        }
    }
});

socket.on('kicked', () => {
    alert("You have been removed from your station by the facilitator.");
    role = null;
    sessionStorage.removeItem('crisis_role');
    sessionStorage.removeItem('crisis_view_state');
    updateGlobalLeaveButton();
    if (localState && localState.status === 'holding') {
        switchView('holding');
        handleHoldingState();
    } else {
        switchView('role_selection');
        if (localState && localState.status === 'lobby') {
            renderRoleSelection();
        }
    }
});

function updateGlobalLeaveButton() {
    const btnContainer = document.getElementById('global-leave-container');
    if (btnContainer) {
        btnContainer.style.display = role ? 'block' : 'none';
    }
}

const btnGlobalLeave = document.getElementById('btn-global-leave');
if (btnGlobalLeave) {
    btnGlobalLeave.addEventListener('click', () => {
        if (confirm("Are you sure you want to leave your station?")) {
            socket.emit('leave_role');
            role = null;
            sessionStorage.removeItem('crisis_role');
            sessionStorage.removeItem('crisis_view_state');
            updateGlobalLeaveButton();
            if (localState && localState.status === 'holding') {
                switchView('holding');
                handleHoldingState();
            } else {
                switchView('role_selection');
                if (localState && localState.status === 'lobby') {
                    renderRoleSelection();
                }
            }
        }
    });
}

if (btnWiki) {
    btnWiki.addEventListener('click', () => {
        if (window.showWikiPanel) window.showWikiPanel();
    });
}

if (btnActions) {
    btnActions.addEventListener('click', () => {
        const badge = document.getElementById('actions-badge');
        if (badge) badge.style.display = 'none';
        if (window.showActionsPanel) window.showActionsPanel();
    });
}

window.showWikiPanel = function(category = null, itemId = null) {
    currentInfoView = { type: 'wiki', category, itemId };
    openPanel('Knowledge Wiki');
    refreshInfoPanel();
};

window.showActionsPanel = function() {
    currentInfoView = { type: 'actions' };
    openPanel('Manual Actions');
    refreshInfoPanel();
};

if (btnAiBriefing) {
    btnAiBriefing.addEventListener('click', () => {
        const badge = document.getElementById('ai-briefing-badge');
        if (badge) badge.style.display = 'none';
        currentInfoView = { type: 'ai' };
        openPanel('Intelligence Briefing');
        refreshInfoPanel();
    });
}

btnCloseInfo.addEventListener('click', () => {
    currentInfoView = null;
    closePanel();
});

// Briefing continue button
document.getElementById('btn-continue-briefing').addEventListener('click', () => {
    enterMap();
});

function showBriefing() {
    const config = localState.scenarioConfig;
    const briefings = config.briefings || {};
    const variantBriefings = config.variantBriefings || [];
    
    document.getElementById('briefing-subtitle').textContent = config.name || '';
    
    const roleNames = config.roleNames || {};
    const displayName = roleNames[role] || role.toUpperCase();
    document.getElementById('briefing-title').textContent = `${displayName.toUpperCase()} BRIEFING`;
    
    let html = '';
    
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    // General briefing
    if (briefings._general) {
        html += `
            <div class="briefing-section">
                <div class="briefing-section-label">Situation Overview</div>
                ${p(briefings._general)}
            </div>
        `;
    }
    
    // Variant briefings (general text + role-specific)
    variantBriefings.forEach(vb => {
        if (vb.roleBriefings && vb.roleBriefings[role]) {
            html += `
                <div class="briefing-section briefing-role">
                    <div class="briefing-section-label">${vb.axisName} — ${role.toUpperCase()} Intel</div>
                    ${p(vb.roleBriefings[role])}
                </div>
            `;
        } else if (vb.briefingText) {
            html += `
                <div class="briefing-section briefing-variant">
                    <div class="briefing-section-label">${vb.axisName}</div>
                    ${p(vb.briefingText)}
                </div>
            `;
        }
    });
    
    // Role-specific briefing
    if (briefings[role]) {
        html += `
            <div class="briefing-section briefing-role">
                <div class="briefing-section-label">Your Role — ${role.toUpperCase()}</div>
                ${p(briefings[role])}
            </div>
        `;
    }

    html += `
        <div class="briefing-section briefing-ai" class="border-status-1">
            <div class="briefing-section-label">Executive Summary</div>
            <div id="briefing-ai-summary-text" class="pre-wrap"><em>Writing your brief... Please wait.</em></div>
        </div>
    `;
    
    document.getElementById('briefing-body').innerHTML = html;
    switchView('briefing');

    // Timeout if AI generation takes too long
    setTimeout(() => {
        const aiSummaryText = document.getElementById('briefing-ai-summary-text');
        if (aiSummaryText && aiSummaryText.innerHTML.includes('Writing your brief')) {
            const config = localState.scenarioConfig;
            const general = config.briefings._general || '';
            const roleSpecific = config.briefings[role] || '';
            const variants = (config.variantBriefings || []).map(vb => {
                const genVar = vb.briefingText || '';
                const roleVar = (vb.roleBriefings && vb.roleBriefings[role]) ? vb.roleBriefings[role] : '';
                return (genVar + '\n' + roleVar).trim();
            }).filter(t => t).join('\n\n');
            
            const combinedText = [general, variants, roleSpecific].filter(t => t).join('\n\n');
            
            aiSummaryText.innerHTML = `<div class="text-accent-orange mb-1 text-sm"><em>(AI generation timed out. Showing raw briefing data.)</em></div><div class="lh-16">${p(combinedText.replace(/\n/g, '<br>'))}</div>`;
        }
    }, 45000);
}

function enterMap() {
    sessionStorage.setItem('crisis_view_state', 'map');
    switchView('map');
    if (typeof refreshEventFeed === 'function') refreshEventFeed();
}

function openPanel(title) {
    infoPanelTitle.textContent = title;
    mainContent.classList.add('panel-open');
}

function closePanel() {
    mainContent.classList.remove('panel-open');
}

// Global function to be called from inline onclick handlers
window.submitDecision = function (taskId, optionId) {
    socket.emit('submit_decision', { taskId, optionId });
};

window.triggerManualAction = function(actionId) {
    socket.emit('trigger_manual_action', actionId);
    closePanel();
};

// Initialize Map
const map = L.map('map', {
    zoomControl: false // custom placement or styling if needed
}).setView([54.5, -2.5], 6); // Default view, overridden when role registered

// Add dark map tiles (CartoDB Dark Matter is great for this aesthetic)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Keep track of markers to update/remove them
let mapMarkers = {};
let viewedEvents = new Set();
let edgeMarkersContainer = null;

// Edge marker logic
function updateEdgeMarkers() {
    if (!edgeMarkersContainer) {
        edgeMarkersContainer = document.createElement('div');
        edgeMarkersContainer.id = 'edge-markers-container';
        edgeMarkersContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1000; overflow: hidden;';
        document.getElementById('map').appendChild(edgeMarkersContainer);
    }
    
    edgeMarkersContainer.innerHTML = '';
    if (!localState || !localState.events) return;
    
    const bounds = map.getBounds();
    const mapSize = map.getSize();
    
    if (mapSize.x === 0 || mapSize.y === 0) return;
    
    const w = mapSize.x / 2;
    const h = mapSize.y / 2;
    
    localState.events.forEach(evt => {
        const eventTasks = localState.decisionTasks.filter(t => t.eventId === evt.id);
        const hasTasks = eventTasks.length > 0;
        let isResolved = hasTasks ? eventTasks.every(t => t.status === 'resolved') : viewedEvents.has(evt.id);
        
        if (isResolved) return; // Only point to unresolved events
        
        const latLng = L.latLng(evt.location);
        if (bounds.contains(latLng)) return; 
        
        const pt = map.latLngToContainerPoint(latLng);
        const dxRaw = pt.x - w;
        const dyRaw = pt.y - h;
        const angle = Math.atan2(dyRaw, dxRaw);
        
        let dx = Math.cos(angle);
        let dy = Math.sin(angle);
        
        if (Math.abs(dx) < 0.0001) dx = dx > 0 ? 0.0001 : -0.0001;
        if (Math.abs(dy) < 0.0001) dy = dy > 0 ? 0.0001 : -0.0001;
        
        const tX = dx > 0 ? w / dx : -w / dx;
        const tY = dy > 0 ? h / dy : -h / dy;
        const t = Math.min(tX, tY) - 10; // 10px padding from the edge
        
        const edgeX = w + dx * t;
        const edgeY = h + dy * t;
        
        const indicator = document.createElement('div');
        indicator.className = 'map-marker map-marker-edge';
        indicator.style.left = `${edgeX}px`;
        indicator.style.top = `${edgeY}px`;
        
        indicator.onclick = () => {
            map.flyTo(latLng, map.getZoom());
        };
        
        edgeMarkersContainer.appendChild(indicator);
    });
}

map.on('move', updateEdgeMarkers);
map.on('zoom', updateEdgeMarkers);
map.on('resize', updateEdgeMarkers);

socket.on('decision_made', (data) => {
    let roleText = 'Someone';
    if (data.role && data.role !== 'display' && data.role !== 'facilitator') {
        const roleNames = localState?.scenarioConfig?.roleNames || {};
        roleText = roleNames[data.role] || data.role.toUpperCase();
    }
    
    if (data.role !== role) {
        showToast(`<strong>${data.eventName}</strong><br/>${roleText} selected: <em>${data.text}</em>`);
    }
});

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.justifyContent = 'space-between';
    toast.style.gap = '15px';
    
    const content = document.createElement('div');
    content.innerHTML = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'background: none; border: none; color: inherit; font-size: 1.5rem; cursor: pointer; padding: 0; opacity: 0.6; display: flex; line-height: 1;';
    closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseout = () => closeBtn.style.opacity = '0.6';
    closeBtn.onclick = () => {
        if (!toast.classList.contains('fade-out')) {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }
    };
    
    toast.appendChild(content);
    toast.appendChild(closeBtn);
    
    container.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement && !toast.classList.contains('fade-out')) {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }
    }, 10000);
}

// Register role on connect
socket.on('connect', () => {
    const savedRole = sessionStorage.getItem('crisis_role');
    if (savedRole && !role) {
        role = savedRole;
        socket.emit('register_role', role);
    }
    updateGlobalLeaveButton();
});

// Socket events
socket.on('initial_state', (state) => {
    handleStateUpdate(state);
});

socket.on('state_update', (state) => {
    handleStateUpdate(state);
});

function handleHoldingState() {
    role = null;
    sessionStorage.removeItem('crisis_role');
    sessionStorage.removeItem('crisis_view_state');
    updateGlobalLeaveButton();
    if (!holdingScreen.open) holdingScreen.showModal();
    const h1 = holdingScreen.querySelector('h1');
    const p = holdingScreen.querySelector('p');
    if (h1) h1.textContent = "Waiting for Game to Start";
    if (p) p.textContent = "The facilitator is selecting a scenario...";
    
    if (roleSelectionScreen.open) roleSelectionScreen.close();
    if (briefingScreen.open) briefingScreen.close();
    if (endgameScreen && endgameScreen.open) endgameScreen.close();
    appEl.style.display = 'none';

    // Clear markers when returning to hold
    for (let id in mapMarkers) {
        map.removeLayer(mapMarkers[id]);
    }
    mapMarkers = {};
    viewedEvents.clear();
}

function handleLobbyState() {
    appEl.style.display = 'none';
    
    if (!role) {
        switchView('role_selection');
        renderRoleSelection();
    } else {
        switchView('lobby');
    }
}

function handleActiveState() {
    if (holdingScreen.open) holdingScreen.close();

    if (!role) {
        switchView('role_selection');
        renderRoleSelection();
    } else {
        if (appEl.style.display === 'none' && !briefingScreen.open) {
            if (sessionStorage.getItem('crisis_view_state') === 'map') {
                switchView('map');
            } else if (localState.scenarioConfig && localState.scenarioConfig.briefings) {
                showBriefing();
            } else {
                switchView('map');
            }
        }
        updateUI();
    }
}

function _hideAllScreens() {
    appEl.style.display = 'none';
    if (holdingScreen.open) holdingScreen.close();
    if (roleSelectionScreen.open) roleSelectionScreen.close();
}

function _applyEndgameContent(endgameEvent) {
    const titleEl = document.getElementById('endgame-title');
    const descEl = document.getElementById('endgame-desc');
    const roleDescEl = document.getElementById('endgame-role-desc');

    if (titleEl) titleEl.textContent = window.parseAcronyms ? window.parseAcronyms(endgameEvent.name) : endgameEvent.name;
    if (descEl) descEl.textContent = window.parseAcronyms ? window.parseAcronyms(endgameEvent.description) : endgameEvent.description;
    
    if (role && endgameEvent.roleDescriptions && endgameEvent.roleDescriptions[role]) {
        if (roleDescEl) {
            roleDescEl.style.display = 'block';
            roleDescEl.textContent = window.parseAcronyms ? window.parseAcronyms(endgameEvent.roleDescriptions[role]) : endgameEvent.roleDescriptions[role];
        }
    } else if (roleDescEl) {
        roleDescEl.style.display = 'none';
    }
}

function handleEndedState(state) {
    _hideAllScreens();
    
    const endgameScreen = document.getElementById('endgame-screen');
    if (endgameScreen) {
        if (!endgameScreen.open) endgameScreen.showModal();
        
        const endgameEvent = state.events.find(e => e.templateId === state.endGameEventId);
        if (endgameEvent) {
            _applyEndgameContent(endgameEvent);
        }
    }
}

function handleStateUpdate(state) {
    localState = state;

    if (state.status === 'holding') {
        handleHoldingState();
    } else if (state.status === 'lobby') {
        handleLobbyState();
    } else if (state.status === 'active') {
        handleActiveState();
    } else if (state.status === 'ended') {
        handleEndedState(state);
    }
}

function renderRoleSelection() {
    if (!localState || !localState.scenarioConfig) return;

    roleButtonsContainer.innerHTML = '';
    const roles = localState.scenarioConfig.roles;
    const roleNames = localState.scenarioConfig.roleNames || {};

    roleButtonsContainer.innerHTML = roles
        .filter(r => r !== 'facilitator')
        .map(r => {
            const isTaken = activeRolesList.includes(r);
            const displayName = roleNames[r] || r.toUpperCase();
            const btnText = isTaken ? `${displayName} (Taken)` : displayName;
            const btnClass = `btn ${isTaken ? 'client-btn-taken' : 'client-btn-free'}`;
            return `<button class="${btnClass}" ${isTaken ? 'disabled' : `onclick="socket.emit('register_role', '${r}')"`}>${btnText}</button>`;
        }).join('');
}

// Main UI Update Function
function updateUI() {
    if (!localState) return;

    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    if (localState.aiScenarioSummaries && localState.aiScenarioSummaries[role]) {
        const aiSummaryText = document.getElementById('briefing-ai-summary-text');
        if (aiSummaryText && (aiSummaryText.innerHTML.includes('Writing') || aiSummaryText.innerHTML.includes('raw briefing data'))) {
            const summaryData = localState.aiScenarioSummaries[role];
            let html = p(summaryData.text);
            aiSummaryText.innerHTML = html;
        }
    }

    // Check for new AI briefing
    if (localState.aiBriefings && localState.aiBriefings[role]) {
        const currentAiBriefing = localState.aiBriefings[role];
        if (currentAiBriefing.timestamp !== previousAiBriefingTimestamp) {
            previousAiBriefingTimestamp = currentAiBriefing.timestamp;
            if (!currentInfoView || currentInfoView.type !== 'ai') {
                const badge = document.getElementById('ai-briefing-badge');
                if (badge) badge.style.display = 'block';
                if (btnAiBriefing) {
                    btnAiBriefing.classList.remove('btn-score-changed');
                    void btnAiBriefing.offsetWidth;
                    btnAiBriefing.classList.add('btn-score-changed');
                    setTimeout(() => btnAiBriefing.classList.remove('btn-score-changed'), 2500);
                }
            } else {
                refreshInfoPanel(); // Refresh if currently viewing
            }
        }
    }

    // Check for new manual actions
    if (localState.scenarioConfig && localState.scenarioConfig.manualActions) {
        const currentAvailableActions = localState.scenarioConfig.manualActions
            .filter(a => a.initiator.includes(role) && window.checkConditions(a, localState.scores, localState.assets, localState.unlockedEvents, localState.events.map(e => e.templateId)))
            .map(a => a.id);

        if (previousAvailableActions.length > 0) {
            const newActions = currentAvailableActions.filter(id => !previousAvailableActions.includes(id));
            if (newActions.length > 0) {
                if (!currentInfoView || currentInfoView.type !== 'actions') {
                    const badge = document.getElementById('actions-badge');
                    if (badge) badge.style.display = 'block';
                    if (btnActions) {
                        btnActions.classList.remove('btn-score-changed');
                        void btnActions.offsetWidth;
                        btnActions.classList.add('btn-score-changed');
                        setTimeout(() => btnActions.classList.remove('btn-score-changed'), 2500);
                    }
                } else {
                    refreshInfoPanel();
                }
            }
        }
        previousAvailableActions = currentAvailableActions;
    }

    renderMap(localState.events, localState.assets);
    refreshInfoPanel();
}

function renderMap(events, assets) {
    // Clear old markers
    for (let id in mapMarkers) {
        map.removeLayer(mapMarkers[id]);
    }
    mapMarkers = {};

    // Add assets
    assets.forEach(asset => {
        const iconHtml = `<div class="map-marker map-marker-asset"></div>`;
        const icon = L.divIcon({ html: iconHtml, className: '' });
        const marker = L.marker(asset.location, { icon });

        marker.on('click', () => {
            currentInfoView = { type: 'asset', id: asset.id };
            openPanel('Asset Details');
            refreshInfoPanel();
        });

        marker.addTo(map);
        mapMarkers[asset.id] = marker;
    });

    // Add events
    events.forEach(evt => {
        // Determine if this event is "resolved"
        const eventTasks = localState.decisionTasks.filter(t => t.eventId === evt.id);
        const hasTasks = eventTasks.length > 0;
        
        let isResolved = false;
        if (hasTasks) {
            isResolved = eventTasks.every(t => t.status === 'resolved');
        } else {
            isResolved = viewedEvents.has(evt.id);
        }
        
        const markerClass = isResolved ? 'map-marker-event-resolved' : 'map-marker-event';
        
        const iconHtml = `<div class="map-marker ${markerClass}"></div>`;
        const icon = L.divIcon({ html: iconHtml, className: '' });
        const marker = L.marker(evt.location, { icon });

        // Open info panel on click
        marker.on('click', () => {
            viewedEvents.add(evt.id);
            currentInfoView = { type: 'event', id: evt.id };
            openPanel('Event Details');
            refreshInfoPanel();
            renderMap(localState.events, localState.assets); // Re-render to update marker color
        });

        marker.addTo(map);
        mapMarkers[evt.id] = marker;
    });

    updateEdgeMarkers();
}



function buildAiPanelHtml(p) {
    const aiBriefing = localState.aiBriefings && localState.aiBriefings[role];
    
    let html = `
        <div class="mb-3">
            ${aiBriefing && aiBriefing.text ? `<p class="text-base lh-16">${p(aiBriefing.text)}</p>` : '<p class="text-muted">Briefing is currently unavailable.</p>'}
        </div>
    `;

    if (aiBriefing && aiBriefing.seeds && aiBriefing.seeds.length > 0) {
        html += `<h4 class="mb-sm text-secondary">Score Changes</h4>
                 <ul class="list-none p-0 m-0 text-sm text-muted">`;
        aiBriefing.seeds.forEach(seed => {
            html += `<li class="mb-05">• ${p(seed.text)}</li>`;
        });
        html += `</ul>`;
    }
    
    html += `
        <div class="mt-2">
            <button id="btn-request-ai-briefing" class="btn" class="w-100 btn-outline-blue">Request Full Refresh</button>
        </div>
    `;
    
    return html;
}

function buildEventPanelHtml(p) {
    const evt = localState.events.find(e => e.id === currentInfoView.id);
    if (!evt) return null;

    let html = `<div class="card">`;
    if (evt.image) html += `<img src="${evt.image}" alt="${evt.name}" class="wiki-img">`;

    html += `
            <div class="card-title">${evt.name}</div>
            <div class="card-desc">${p(evt.description)}</div>
    `;

    if (evt.roleDescriptions && evt.roleDescriptions[role]) {
        html += `<div class="card-role-desc mt-2"><b>Intel (${role.toUpperCase()}):</b> ${p(evt.roleDescriptions[role])}</div>`;
    }
    html += `<div class="card-meta mt-2">Time: ${new Date(evt.timestamp).toLocaleTimeString()}</div></div>`;

    // Tasks for this event
    const roleTasks = localState.decisionTasks.filter(t => t.eventId === evt.id && (t.role === role || role === 'display'));

    if (roleTasks.length > 0) {
        html += `<h3 class="my-3 text-base text-secondary uppercase border-bottom pb-1">Decision Tasks</h3>`;
        roleTasks.forEach(task => {
            const isResolved = task.status === 'resolved';
            const statusBadge = isResolved
                ? `<span class="text-status-1 text-sm float-right">RESOLVED</span>`
                : `<span class="text-status-4 text-sm float-right">PENDING</span>`;

            html += `<div class="card task-card">${statusBadge}<div class="task-text">${p(task.text)}</div>`;

            if (!isResolved) {
                html += `<div class="task-options">`;
                task.options.forEach(opt => {
                    html += `<button class="btn" onclick="submitDecision('${task.id}', '${opt.id}')">${p(opt.text)}</button>`;
                });
                html += `</div>`;
            } else {
                const selectedOpt = task.options.find(o => o.id === task.selectedOption);
                html += `<div class="card-role-desc" class="mt-sm">Decision Made: ${selectedOpt ? p(selectedOpt.text) : 'Unknown'}</div>`;
            }
            html += `</div>`;
        });
    }

    return html;
}

function buildAssetPanelHtml(p) {
    const asset = localState.assets.find(a => a.id === currentInfoView.id);
    if (!asset) return null;

    let html = `<div class="card wiki-card-blue">`;
    if (asset.image) html += `<img src="${asset.image}" alt="${asset.name}" class="wiki-img">`;

    html += `
            <div class="card-title wiki-title-blue">${asset.name}</div>
            <div class="card-desc">
                <strong>Status:</strong> <span class="uppercase">${asset.state}</span>
            </div>
    `;

    if (asset.briefing) {
        html += `
            <div class="card-role-desc mt-2 border-left-blue">
                <strong>Intelligence Brief:</strong><br>
                ${p(asset.briefing)}
            </div>
        `;
    }

    html += `<div class="card-meta mt-2 flex-center gap-1 flex-wrap">`;
    asset.tags.forEach(tag => {
        html += `<span class="bg-primary p-1 radius-sm border-color text-xs uppercase">${tag}</span>`;
    });
    html += `</div></div>`;

    return html;
}

function buildActionsPanelHtml(p) {
    if (!localState.scenarioConfig || !localState.scenarioConfig.manualActions) {
        return '<p class="text-muted">No manual actions available.</p>';
    }

    let html = '<div class="actions-list">';
    let actionsShown = 0;
    
    localState.scenarioConfig.manualActions.forEach(action => {
        if (!action.initiator.includes(role)) return;

        const isMet = window.checkConditions(action, localState.scores, localState.assets, localState.unlockedEvents, localState.events.map(e => e.templateId));

        actionsShown++;
        
        if (isMet) {
            html += `<div class="card wiki-card-blue mb-2">`;
        } else {
            html += `<div class="card wiki-card-blue mb-2" style="opacity: 0.6; filter: grayscale(1);">`;
        }
        
        if (action.image) {
            html += `<img src="${action.image}" alt="${action.name}" class="wiki-img" class="mb-sm">`;
        }
        html += `<div class="card-title wiki-title-blue">${action.name}</div>
                 <div class="card-desc">${p(action.description)}</div>`;
        
        let approvers = null;
        if (action.requiresApprovalFrom) {
            if (Array.isArray(action.requiresApprovalFrom)) {
                approvers = action.requiresApprovalFrom.filter(r => r !== role).join(' or ');
            } else if (action.requiresApprovalFrom !== role) {
                approvers = action.requiresApprovalFrom;
            }
        }

        if (approvers) {
            html += `<div class="card-meta mt-1 text-status-4" class="text-bold">Requires approval from: ${approvers.toUpperCase()}</div>`;
        } else {
            html += `<div class="card-meta mt-1 text-status-1" style="font-weight:bold;">Immediate Execution</div>`;
        }

        if (isMet) {
            html += `<button class="btn mt-2 w-100" onclick="window.triggerManualAction('${action.id}')">Initiate Action</button>`;
        } else {
            html += `<div class="mt-2 text-status-4 text-xs font-mono">🔒 REQUIREMENTS NOT MET</div>`;
            html += `<button class="btn mt-1 w-100" disabled style="opacity: 0.5; cursor: not-allowed;">Initiate Action</button>`;
        }
        html += `</div>`;
    });
    
    if (actionsShown === 0) {
        html += '<p class="text-muted">No actions currently assigned to your station.</p>';
    }
    html += '</div>';
    
    return html;
}

function refreshInfoPanel() {
    if (!currentInfoView || !localState) return;

    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    if (currentInfoView.type === 'ai') {
        infoContent.innerHTML = buildAiPanelHtml(p);
        document.getElementById('btn-request-ai-briefing').onclick = (e) => {
            socket.emit('request_ai_briefing', role);
            e.target.textContent = 'Requesting...';
            e.target.disabled = true;
            e.target.style.opacity = '0.5';
        };
    } else if (currentInfoView.type === 'event') {
        const html = buildEventPanelHtml(p);
        if (html === null) {
            closePanel();
        } else {
            infoContent.innerHTML = html;
        }
    } else if (currentInfoView.type === 'asset') {
        const html = buildAssetPanelHtml(p);
        if (html === null) {
            closePanel();
        } else {
            infoContent.innerHTML = html;
        }
    } else if (currentInfoView.type === 'wiki') {
        infoContent.innerHTML = window.generateWikiHtml(localState, currentInfoView.category, currentInfoView.itemId);
    } else if (currentInfoView.type === 'actions') {
        infoContent.innerHTML = buildActionsPanelHtml(p);
    }
}



// Add pulse animation for map events dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);
