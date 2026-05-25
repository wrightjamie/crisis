// Client Logic
const socket = io();

// Global state and view tracking
let role = null;
let activeRolesList = [];
let localState = null;
let previousScores = null;
let previousAiBriefingTimestamp = null;
let currentInfoView = null;

// DOM Elements
const appEl = document.getElementById('app');
const holdingScreen = document.getElementById('holding-screen');
const roleSelectionScreen = document.getElementById('role-selection-screen');
const roleButtonsContainer = document.getElementById('role-buttons');
const briefingScreen = document.getElementById('briefing-screen');

const roleDisplay = document.getElementById('role-display');
const mainContent = document.getElementById('main-content');
const infoPanelTitle = document.getElementById('info-panel-title');
const infoContent = document.getElementById('info-content');
const btnCloseInfo = document.getElementById('btn-close-info');
const btnAiBriefing = document.getElementById('btn-ai-briefing');
const btnWiki = document.getElementById('btn-wiki');

// Socket events for roles
socket.on('active_roles', (roles) => {
    activeRolesList = roles;
    if (localState && localState.status === 'active' && !role) {
        renderRoleSelection();
    }
});

socket.on('role_registered', (registeredRole) => {
    role = registeredRole;
    roleDisplay.textContent = role.toUpperCase();
    if (role === 'display') {
        document.body.classList.add('role-display');
    }

    roleSelectionScreen.style.display = 'none';

    // Update map view using scenario config
    if (localState.scenarioConfig && localState.scenarioConfig.mapConfig) {
        map.setView(localState.scenarioConfig.mapConfig.center, localState.scenarioConfig.mapConfig.zoom);
    }

    // Show briefing if available, otherwise go straight to map
    if (localState.scenarioConfig && localState.scenarioConfig.briefings) {
        showBriefing();
    } else {
        enterMap();
    }
});

socket.on('role_error', (msg) => {
    alert(msg);
});

if (btnWiki) {
    btnWiki.addEventListener('click', () => {
        if (window.showWikiPanel) window.showWikiPanel();
    });
}

window.showWikiPanel = function(category = null, itemId = null) {
    currentInfoView = { type: 'wiki', category, itemId };
    openPanel('Knowledge Wiki');
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
        if (vb.briefingText) {
            html += `
                <div class="briefing-section briefing-variant">
                    <div class="briefing-section-label">${vb.axisName}</div>
                    ${p(vb.briefingText)}
                </div>
            `;
        }
        // Role-specific variant briefing
        if (vb.roleBriefings && vb.roleBriefings[role]) {
            html += `
                <div class="briefing-section briefing-role">
                    <div class="briefing-section-label">${vb.axisName} — ${role.toUpperCase()} Intel</div>
                    ${p(vb.roleBriefings[role])}
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
        <div class="briefing-section briefing-ai" style="border-left: 3px solid var(--status-1);">
            <div class="briefing-section-label">Executive Summary</div>
            <div id="briefing-ai-summary-text" class="pre-wrap"><em>Writing your brief... Please wait.</em></div>
        </div>
    `;
    
    document.getElementById('briefing-body').innerHTML = html;
    briefingScreen.style.display = 'flex';
}

function enterMap() {
    briefingScreen.style.display = 'none';
    appEl.style.display = 'block';
    setTimeout(() => {
        map.invalidateSize();
    }, 10);
    updateUI();
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

// Register role on connect
socket.on('connect', () => {
    socket.emit('register_role', role);
});

// Socket events
socket.on('initial_state', (state) => {
    handleStateUpdate(state);
});

socket.on('state_update', (state) => {
    handleStateUpdate(state);
});

function handleStateUpdate(state) {
    localState = state;

    if (state.status === 'holding') {
        role = null;
        holdingScreen.style.display = 'flex';
        roleSelectionScreen.style.display = 'none';
        appEl.style.display = 'none';

        // Clear markers when returning to hold
        for (let id in mapMarkers) {
            map.removeLayer(mapMarkers[id]);
        }
        mapMarkers = {};
        viewedEvents.clear();

    } else if (state.status === 'active') {
        holdingScreen.style.display = 'none';

        if (!role) {
            roleSelectionScreen.style.display = 'flex';
            appEl.style.display = 'none';
            renderRoleSelection();
        } else {
            roleSelectionScreen.style.display = 'none';
            appEl.style.display = 'block';
            updateUI();
        }
    }
}

function renderRoleSelection() {
    if (!localState || !localState.scenarioConfig) return;

    roleButtonsContainer.innerHTML = '';
    const roles = localState.scenarioConfig.roles;

    roles.forEach(r => {
        const isTaken = activeRolesList.includes(r);
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.style.padding = '1.5rem';
        btn.style.fontSize = '1.1rem';
        btn.style.textTransform = 'uppercase';
        btn.style.backgroundColor = isTaken ? 'var(--bg-tertiary)' : 'var(--bg-secondary)';
        btn.style.color = isTaken ? 'var(--text-muted)' : 'var(--text-primary)';
        btn.style.border = `1px solid ${isTaken ? 'var(--border-color)' : 'var(--accent-blue)'}`;
        btn.textContent = r;

        if (isTaken) {
            btn.textContent += ' (Taken)';
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
        } else {
            btn.onclick = () => socket.emit('register_role', r);
            btn.style.cursor = 'pointer';
        }

        roleButtonsContainer.appendChild(btn);
    });
}

// Main UI Update Function
function updateUI() {
    if (!localState) return;

    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    if (localState.aiScenarioSummaries && localState.aiScenarioSummaries[role]) {
        const aiSummaryText = document.getElementById('briefing-ai-summary-text');
        if (aiSummaryText && aiSummaryText.innerHTML.includes('Writing')) {
            const summaryData = localState.aiScenarioSummaries[role];
            let html = p(summaryData.text);
            if (summaryData.prompt) {
                html += `\n\n<details class="mt-2 border-top pt-1">
                    <summary class="cursor-pointer text-muted text-sm outline-none">View Prompt Context</summary>
                    <pre class="text-xs text-muted mt-1 bg-primary p-1 radius-sm pre-wrap font-inherit">${p(summaryData.prompt)}</pre>
                </details>`;
            }
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
        const iconHtml = `<div class="bg-blue w-12 h-12 radius-full border-white"></div>`;
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
        
        const bgColor = isResolved ? 'var(--text-muted)' : 'var(--accent-red)';
        const animation = isResolved ? '' : 'animation: pulse 2s infinite;';
        
        const iconHtml = `<div style="background-color: ${bgColor}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; ${animation}"></div>`;
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
}



function refreshInfoPanel() {
    if (!currentInfoView || !localState) return;

    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    if (currentInfoView.type === 'ai') {
        const aiBriefing = localState.aiBriefings && localState.aiBriefings[role];
        
        let html = `
            <div class="mb-3">
                ${aiBriefing && aiBriefing.text ? `<p class="text-base lh-16">${p(aiBriefing.text)}</p>` : '<p class="text-muted">Briefing is currently unavailable.</p>'}
            </div>
        `;

        if (aiBriefing && aiBriefing.seeds && aiBriefing.seeds.length > 0) {
            html += `<h4 style="margin-bottom: 0.5rem; color: var(--text-secondary);">Score Changes</h4>
                     <ul class="list-none p-0 m-0 text-sm text-muted">`;
            aiBriefing.seeds.forEach(seed => {
                html += `<li class="mb-05">• ${p(seed.text)}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `
            <div class="mt-2">
                <button id="btn-request-ai-briefing" class="btn" style="width: 100%; border: 1px solid var(--accent-blue); background: none; color: var(--accent-blue);">Request Full Refresh</button>
            </div>
        `;
        
        infoContent.innerHTML = html;
        
        document.getElementById('btn-request-ai-briefing').onclick = (e) => {
            socket.emit('request_ai_briefing', role);
            e.target.textContent = 'Requesting...';
            e.target.disabled = true;
            e.target.style.opacity = '0.5';
        };

    } else if (currentInfoView.type === 'event') {
        const evt = localState.events.find(e => e.id === currentInfoView.id);
        if (!evt) {
            closePanel();
            return;
        }

        let html = `
            <div class="card">
        `;
        
        if (evt.image) {
            html += `<img src="${evt.image}" alt="${evt.name}" class="wiki-img">`;
        }

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
                    html += `<div class="card-role-desc" style="margin-top: 0.5rem;">Decision Made: ${selectedOpt ? p(selectedOpt.text) : 'Unknown'}</div>`;
                }
                html += `</div>`;
            });
        }

        infoContent.innerHTML = html;

    } else if (currentInfoView.type === 'asset') {
        const asset = localState.assets.find(a => a.id === currentInfoView.id);
        if (!asset) {
            closePanel();
            return;
        }

        let html = `
            <div class="card wiki-card-blue">
        `;
        
        if (asset.image) {
            html += `<img src="${asset.image}" alt="${asset.name}" class="wiki-img">`;
        }

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

        infoContent.innerHTML = html;
    } else if (currentInfoView.type === 'wiki') {
        infoContent.innerHTML = window.generateWikiHtml(localState, currentInfoView.category, currentInfoView.itemId);
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
