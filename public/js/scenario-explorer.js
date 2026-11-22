// Scenario Explorer with Interactive Network Diagram (FlowGraph), Filtering, Search, and Card View
(function() {
    'use strict';

    let currentEventFilter = 'all'; // 'all', 'active', 'available', 'pending', 'locked', 'complete', 'endgame'
    let currentEventSearch = '';
    let currentExplorerView = 'network'; // 'network' or 'list'
    let showManualActions = true;

    // Persistent canvas state across live state_update broadcasts
    let panZoomController = null;
    let lastFittedScenarioId = null;
    let lastPositionsMap = new Map();

    const escapeHtml = (str) => {
        if (window.common && typeof window.common.escapeHtml === 'function') {
            return window.common.escapeHtml(str);
        }
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    window.setEventFilter = function(filter) {
        currentEventFilter = filter;
        renderScenarioExplorer();
    };

    window.setEventSearch = function(query) {
        currentEventSearch = (query || '').toLowerCase().trim();
        const clearBtn = document.getElementById('fac-event-search-clear');
        if (clearBtn) {
            clearBtn.style.display = currentEventSearch.length > 0 ? 'block' : 'none';
        }
        renderScenarioExplorer();
    };

    window.clearEventSearch = function() {
        const searchInput = document.getElementById('fac-event-search');
        if (searchInput) searchInput.value = '';
        window.setEventSearch('');
    };

    window.toggleManualActionsFilter = function() {
        showManualActions = !showManualActions;
        renderScenarioExplorer();
    };

    window.setExplorerView = function(mode) {
        if (mode !== 'network' && mode !== 'list') mode = 'network';
        currentExplorerView = mode;
        if (mode !== 'network' && panZoomController) {
            panZoomController.destroy();
            panZoomController = null;
        }
        renderScenarioExplorer();
    };

    function buildRuntimeMaps() {
        const triggeredIds = new Set();
        const eventInstancesByTemplate = new Map();
        (currentState.events || []).forEach(ev => {
            if (!ev.templateId) return;
            triggeredIds.add(ev.templateId);
            if (!eventInstancesByTemplate.has(ev.templateId)) {
                eventInstancesByTemplate.set(ev.templateId, []);
            }
            eventInstancesByTemplate.get(ev.templateId).push(ev.id);
        });

        const scheduledIds = new Set((currentState.scheduledEvents || []).map(se => se.templateId));

        // Map eventInstanceId -> tasks, and templateId -> { hasPending, chosenOptions: Set }
        const tasksByEventId = new Map();
        (currentState.decisionTasks || []).forEach(task => {
            if (!tasksByEventId.has(task.eventId)) tasksByEventId.set(task.eventId, []);
            tasksByEventId.get(task.eventId).push(task);
        });

        const templateTaskState = new Map();
        eventInstancesByTemplate.forEach((eventIds, templateId) => {
            let hasPending = false;
            const chosenOptions = new Set();
            eventIds.forEach(eid => {
                (tasksByEventId.get(eid) || []).forEach(t => {
                    if (t.status !== 'resolved') hasPending = true;
                    if (t.status === 'resolved' && t.selectedOption) chosenOptions.add(t.selectedOption);
                });
            });
            templateTaskState.set(templateId, { hasPending, chosenOptions });
        });

        return { triggeredIds, scheduledIds, templateTaskState };
    }

    function getNodeStatus(template, maps) {
        const { triggeredIds, scheduledIds, templateTaskState } = maps;

        if (triggeredIds.has(template.id)) {
            const taskInfo = templateTaskState.get(template.id);
            if (taskInfo && taskInfo.hasPending) {
                return {
                    key: 'active',
                    text: 'ACTIVE',
                    borderColor: 'var(--accent-blue)',
                    icon: '⚡'
                };
            }
            return {
                key: 'complete',
                text: 'COMPLETE',
                borderColor: 'var(--accent-purple)',
                icon: '✅'
            };
        }

        if (scheduledIds.has(template.id)) {
            return {
                key: 'active',
                text: 'SCHEDULED',
                borderColor: 'var(--accent-blue)',
                icon: '⏱️'
            };
        }

        const prereqsMet = !template.prerequisites || template.prerequisites.every(pId => triggeredIds.has(pId));
        const conditionsMet = checkConditions(
            template,
            currentState.scores,
            currentState.assets,
            currentState.unlockedEvents,
            (currentState.events || []).map(e => e.templateId),
            typeof currentActiveRoles !== 'undefined' ? currentActiveRoles : []
        );

        if (prereqsMet && conditionsMet) {
            return {
                key: 'available',
                text: 'AVAILABLE',
                borderColor: 'var(--accent-green)',
                icon: '🟢'
            };
        }
        if (prereqsMet && !conditionsMet) {
            return {
                key: 'pending',
                text: 'PENDING',
                borderColor: 'var(--accent-orange)',
                icon: '⏳'
            };
        }
        return {
            key: 'locked',
            text: 'LOCKED',
            borderColor: 'var(--border-color)',
            icon: '🔒'
        };
    }

    function getActionStatus(act) {
        const triggeredIds = (currentState.events || []).map(e => e.templateId);
        if (!act.repeatable && triggeredIds.includes(act.id)) {
            return { key: 'complete', text: 'USED', icon: '✅' };
        }
        const conditionsMet = checkConditions(
            act,
            currentState.scores,
            currentState.assets,
            currentState.unlockedEvents,
            triggeredIds,
            typeof currentActiveRoles !== 'undefined' ? currentActiveRoles : []
        );
        return conditionsMet
            ? { key: 'available', text: 'READY', icon: '🟢' }
            : { key: 'pending', text: 'GATED', icon: '⏳' };
    }

    function templateMatchesFilter(template, statusObj) {
        if (currentEventFilter === 'endgame') {
            if (!template.isEndGame) return false;
        } else if (currentEventFilter !== 'all' && statusObj.key !== currentEventFilter) {
            return false;
        }

        if (currentEventSearch) {
            const q = currentEventSearch;
            const id = (template.id || '').toLowerCase();
            const name = (template.name || '').toLowerCase();
            const desc = (typeof template.description === 'string' ? template.description : '').toLowerCase();
            const notes = (template.facilitatorNotes || '').toLowerCase();
            const stage = (template.stage || '').toLowerCase();
            if (!id.includes(q) && !name.includes(q) && !desc.includes(q) && !notes.includes(q) && !stage.includes(q)) {
                return false;
            }
        }
        return true;
    }

    function buildConditionSummary(template) {
        if (!template.conditions) return '';
        const parts = [];
        if (template.conditions.minScores) {
            for (const [k, v] of Object.entries(template.conditions.minScores)) {
                parts.push(`Min ${formatName(k)}: ${v}`);
            }
        }
        if (template.conditions.maxScores) {
            for (const [k, v] of Object.entries(template.conditions.maxScores)) {
                parts.push(`Max ${formatName(k)}: ${v}`);
            }
        }
        if (template.conditions.visibleAssets) {
            parts.push(`Visible: ${template.conditions.visibleAssets.join(', ')}`);
        }
        return parts.join(' • ');
    }

    function ensureNetworkShell(container) {
        let shell = document.getElementById('fac-canvas-shell');
        if (shell && container.contains(shell)) return shell;

        if (panZoomController) {
            panZoomController.destroy();
            panZoomController = null;
        }

        const defsMarkup = window.FlowGraph ? window.FlowGraph.getSvgDefsMarkup('fac-') : '';

        container.innerHTML = `
            <div id="fac-canvas-shell" class="fac-canvas-shell">
                <div id="fac-canvas-wrapper" class="canvas-stage-wrapper fac-canvas-stage-wrapper">
                    <div id="fac-canvas-plane" class="canvas-transform-plane">
                        <svg id="fac-canvas-svg" class="canvas-svg-layer">
                            ${defsMarkup}
                            <g id="fac-canvas-edges-group"></g>
                        </svg>
                        <div id="fac-canvas-nodes-layer" class="canvas-nodes-layer"></div>
                    </div>
                    <div id="fac-network-float-bar" class="floating-bar fac-canvas-floating-bar" role="toolbar" aria-label="Network Zoom Controls">
                        <button type="button" id="fac-btn-zoom-out" class="floating-bar-btn" title="Zoom Out" aria-label="Zoom Out">−</button>
                        <button type="button" id="fac-btn-zoom-reset" class="floating-bar-btn" title="Reset Zoom to 100%" aria-label="Reset Zoom to 100%">
                            <span id="fac-canvas-zoom-label">100%</span>
                        </button>
                        <button type="button" id="fac-btn-zoom-in" class="floating-bar-btn" title="Zoom In" aria-label="Zoom In">+</button>
                        <span class="floating-bar-divider" aria-hidden="true"></span>
                        <button type="button" id="fac-btn-zoom-fit" class="floating-bar-btn" title="Fit diagram to viewport">Fit</button>
                        <button type="button" id="fac-btn-zoom-reset-view" class="floating-bar-btn" title="Reset pan and zoom">Reset</button>
                    </div>
                </div>
            </div>
        `;

        const wrapperEl = document.getElementById('fac-canvas-wrapper');
        const planeEl = document.getElementById('fac-canvas-plane');
        const zoomLabelEl = document.getElementById('fac-canvas-zoom-label');

        if (window.FlowGraph && wrapperEl && planeEl) {
            panZoomController = window.FlowGraph.createPanZoomController({
                wrapperEl,
                planeEl,
                zoomLabelEl,
                canStartPan: (e) => !e.target.closest('.canvas-node') && !e.target.closest('.floating-bar')
            });
        }

        document.getElementById('fac-btn-zoom-in')?.addEventListener('click', () => panZoomController?.zoomIn());
        document.getElementById('fac-btn-zoom-out')?.addEventListener('click', () => panZoomController?.zoomOut());
        document.getElementById('fac-btn-zoom-reset')?.addEventListener('click', () => panZoomController?.reset());
        document.getElementById('fac-btn-zoom-reset-view')?.addEventListener('click', () => panZoomController?.reset());
        document.getElementById('fac-btn-zoom-fit')?.addEventListener('click', () => panZoomController?.fitToView(lastPositionsMap));

        return document.getElementById('fac-canvas-shell');
    }

    function renderNetworkView(container, activeStageEvents, stages, maps, p) {
        if (!window.FlowGraph) return;

        ensureNetworkShell(container);

        const nodesLayer = document.getElementById('fac-canvas-nodes-layer');
        const edgesGroup = document.getElementById('fac-canvas-edges-group');
        if (!nodesLayer || !edgesGroup) return;

        const manualActions = showManualActions ? (currentState.scenarioConfig?.manualActions || []) : [];
        const savedPositions = currentState.scenarioConfig?.canvasLayout?.positions || {};

        const posMap = window.FlowGraph.computeLayout(activeStageEvents, manualActions, { savedPositions });
        lastPositionsMap = posMap;

        const isFilterActive = currentEventFilter !== 'all' || currentEventSearch.length > 0;
        const matchingIds = new Set();

        const getStageIdx = (stageId) => {
            if (!stageId || stages.length === 0) return 0;
            const idx = stages.findIndex(s => s.id === stageId);
            return idx !== -1 ? idx : 0;
        };

        const eventsHtml = activeStageEvents.map((ev) => {
            const pos = posMap.get(ev.id) || { x: 60, y: 60 };
            const status = getNodeStatus(ev, maps);
            const matches = templateMatchesFilter(ev, status);
            if (matches) matchingIds.add(ev.id);

            const taskInfo = maps.templateTaskState.get(ev.id);
            const chosenOptions = taskInfo ? taskInfo.chosenOptions : new Set();

            const nodeClasses = [
                'canvas-node',
                `status-${status.key}`,
                ev.isEndGame ? 'endgame-node' : '',
                isFilterActive ? (matches ? 'filter-highlight' : 'filter-dimmed') : ''
            ].filter(Boolean).join(' ');

            const stageIdx = getStageIdx(ev.stage);
            const condSummary = buildConditionSummary(ev);

            let optionsHtml = '';
            if (Array.isArray(ev.decisions) && ev.decisions.length > 0) {
                const pills = [];
                ev.decisions.forEach(dec => {
                    (dec.options || []).forEach(opt => {
                        const optTriggers = window.FlowGraph.getHelperTriggers(opt);
                        const linkedCount = optTriggers.length;
                        const isChosen = chosenOptions.has(opt.id);
                        pills.push(`
                            <div class="canvas-option-pill${isChosen ? ' chosen' : ''}" title="${escapeHtml(opt.text || opt.id)}">
                                <span class="truncate">${isChosen ? '✓ ' : ''}${escapeHtml(opt.text || opt.id)}</span>
                                ${linkedCount > 0 ? `<span class="badge badge-decision">→ ${linkedCount}</span>` : ''}
                            </div>
                        `);
                    });
                });
                if (pills.length > 0) {
                    optionsHtml = `<div class="canvas-decision-pills">${pills.join('')}</div>`;
                }
            }

            return `
                <div class="${nodeClasses}" data-event-id="${escapeHtml(ev.id)}" style="left: ${pos.x}px; top: ${pos.y}px;">
                    <div class="canvas-node-header">
                        <span class="badge badge-${status.key}">${status.icon} ${status.text}</span>
                        <div class="inline-flex items-center gap-xs">
                            ${ev.isEndGame ? `<span class="badge badge-endgame">🏁 End Game</span>` : ''}
                            ${stages.length > 0 ? `<span class="badge badge-stage">S${stageIdx + 1}</span>` : ''}
                        </div>
                    </div>
                    <div class="canvas-node-title">${p(ev.name || ev.title || ev.id)}</div>
                    <div class="canvas-node-meta">
                        ${ev.requiresUnlock ? `<span class="badge badge-inject">Inject</span>` : ''}
                        ${ev.sound ? `<span class="badge badge-sound">🔊 ${escapeHtml(ev.sound)}</span>` : ''}
                        ${(ev.visibleTo || ev.hiddenFrom) ? `<span class="badge badge-secret">Secret</span>` : ''}
                    </div>
                    ${condSummary ? `<div class="canvas-node-reqs">${escapeHtml(condSummary)}</div>` : ''}
                    ${optionsHtml}
                </div>
            `;
        }).join('');

        const actionsHtml = manualActions.map((act) => {
            const pos = posMap.get(act.id) || { x: 60, y: 260 };
            const actStatus = getActionStatus(act);
            const matchesSearch = !currentEventSearch ||
                (act.name || '').toLowerCase().includes(currentEventSearch) ||
                (act.id || '').toLowerCase().includes(currentEventSearch) ||
                (act.description || '').toLowerCase().includes(currentEventSearch);

            const matchesActionFilter = (currentEventFilter === 'all' || currentEventFilter === actStatus.key) && matchesSearch;
            if (matchesActionFilter) matchingIds.add(act.id);

            const nodeClasses = [
                'canvas-node',
                'action-node',
                isFilterActive ? (matchesActionFilter ? 'filter-highlight' : 'filter-dimmed') : ''
            ].filter(Boolean).join(' ');

            const initiators = Array.isArray(act.initiator) ? act.initiator.join(', ').toUpperCase() : (act.initiator ? String(act.initiator).toUpperCase() : 'ANY');

            return `
                <div class="${nodeClasses}" data-action-id="${escapeHtml(act.id)}" style="left: ${pos.x}px; top: ${pos.y}px;">
                    <div class="canvas-node-header">
                        <span class="badge badge-action">⚡ Manual Action</span>
                        <span class="badge badge-${actStatus.key}">${actStatus.icon} ${actStatus.text}</span>
                    </div>
                    <div class="canvas-node-title">${p(act.name || act.id)}</div>
                    <div class="canvas-node-meta">
                        <span class="badge badge-stage">Role: ${escapeHtml(initiators)}</span>
                    </div>
                </div>
            `;
        }).join('');

        nodesLayer.innerHTML = eventsHtml + actionsHtml;

        edgesGroup.innerHTML = window.FlowGraph.buildEdgesSvg(activeStageEvents, manualActions, posMap, {
            escapeHtml,
            markerPrefix: 'fac-',
            getEdgeClass: (edge) => {
                const classes = [];
                if (edge.type === 'decision' && edge.optionId) {
                    const taskInfo = maps.templateTaskState.get(edge.sourceId);
                    if (taskInfo && taskInfo.chosenOptions.has(edge.optionId)) {
                        classes.push('edge-chosen');
                    }
                }
                if (isFilterActive && !matchingIds.has(edge.sourceId) && !matchingIds.has(edge.targetId)) {
                    classes.push('edge-dimmed');
                }
                return classes.join(' ');
            }
        });

        nodesLayer.querySelectorAll('.canvas-node[data-event-id]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (panZoomController && panZoomController.wasPanning()) return;
                const evId = el.getAttribute('data-event-id');
                if (evId && typeof window.openEventDetails === 'function') {
                    window.openEventDetails(evId);
                }
            });
        });

        nodesLayer.querySelectorAll('.canvas-node[data-action-id]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (panZoomController && panZoomController.wasPanning()) return;
                const actId = el.getAttribute('data-action-id');
                if (actId && typeof window.openManualActionDetails === 'function') {
                    window.openManualActionDetails(actId);
                }
            });
        });

        // Auto-fit when a new scenario loads or when event templates arrive for the first time
        const scenarioId = currentState.scenarioId || currentState.scenarioConfig?.id || 'default';
        const fitKey = `${scenarioId}:${activeStageEvents.length > 0 ? 'full' : 'partial'}`;
        if (posMap.size > 0 && lastFittedScenarioId !== fitKey && panZoomController) {
            requestAnimationFrame(() => {
                const wrapperEl = document.getElementById('fac-canvas-wrapper');
                const rect = wrapperEl ? wrapperEl.getBoundingClientRect() : null;
                if (rect && rect.width >= 40 && rect.height >= 40) {
                    lastFittedScenarioId = fitKey;
                    panZoomController?.fitToView(posMap);
                }
            });
        }
    }

    function renderCardListView(container, activeStageEvents, stages, maps, p) {
        const getStageIdx = (stageId) => {
            if (!stageId || stages.length === 0) return 0;
            const idx = stages.findIndex(s => s.id === stageId);
            return idx !== -1 ? idx : 0;
        };

        const matchingEvents = activeStageEvents.filter(t => templateMatchesFilter(t, getNodeStatus(t, maps)));

        let listHtml = `<div class="scenario-explorer-container">`;
        if (matchingEvents.length === 0) {
            listHtml += `
                <div class="card p-3 text-center">
                    <p class="text-secondary mb-1">No events match the current filter or search criteria.</p>
                    <button class="btn btn-secondary btn-sm" onclick="window.setEventFilter('all'); window.clearEventSearch();">Reset Filters</button>
                </div>
            `;
        } else {
            listHtml += `<div class="scenario-card-grid">`;
            matchingEvents.forEach(template => {
                const status = getNodeStatus(template, maps);
                const stageIdx = getStageIdx(template.stage);
                const secretBadge = (template.visibleTo || template.hiddenFrom)
                    ? `<span class="badge badge-secret">Secret</span>`
                    : '';
                const soundBadge = template.sound
                    ? `<span class="badge badge-sound">🔊 ${escapeHtml(template.sound)}</span>`
                    : '';
                const endGameBadge = template.isEndGame
                    ? `<span class="badge badge-endgame">🏁 End Game</span>`
                    : '';
                const condSummary = buildConditionSummary(template);
                const descText = typeof template.description === 'function' ? 'Dynamic description' : (template.description || '');
                const cardClass = template.isEndGame ? 'fac-event-card endgame-card' : 'fac-event-card';

                listHtml += `
                    <div class="${cardClass}" style="--branch-color: ${status.borderColor};" onclick="openEventDetails('${escapeHtml(template.id)}')">
                        <div>
                            <div class="fac-event-card-header">
                                <span class="badge badge-stage">Stage ${stageIdx + 1}</span>
                                <div class="flex-row items-center gap-xs flex-wrap">
                                    ${endGameBadge}
                                    ${soundBadge}
                                    ${secretBadge}
                                    <span class="badge event-status-pill badge-${status.key}">${status.icon} ${status.text}</span>
                                </div>
                            </div>
                            <div class="fac-event-card-title mb-1">${p(template.name)}</div>
                            <div class="fac-event-card-desc">${p(descText)}</div>
                        </div>
                        <div class="fac-event-card-footer">
                            <span class="text-muted text-xs truncate flex-1">${escapeHtml(condSummary) || 'No special conditions'}</span>
                            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); openEventDetails('${escapeHtml(template.id)}')">View</button>
                        </div>
                    </div>
                `;
            });
            listHtml += `</div>`;
        }
        listHtml += `</div>`;
        container.innerHTML = listHtml;
    }

    function renderScenarioExplorer() {
        const container = document.getElementById('scenario-explorer-container');
        if (!container) return;
        if (typeof allTemplates === 'undefined' || typeof currentState === 'undefined' || !currentState) return;

        const stages = currentState.scenarioConfig?.stages || [];
        const currentStageIndex = currentState.currentStageIndex || 0;
        const p = (t) => (window.parseAcronyms ? window.parseAcronyms(t) : t);

        const getStageIndex = (stageId) => {
            if (!stageId) return 0;
            const idx = stages.findIndex(s => s.id === stageId);
            return idx !== -1 ? idx : 0;
        };

        const maps = buildRuntimeMaps();
        const activeStageEvents = allTemplates.filter(t => !t.hidden && getStageIndex(t.stage) <= currentStageIndex);

        // 1. Update toolbar counts
        const manualActionsCount = (currentState.scenarioConfig?.manualActions || []).length;
        const counts = {
            all: activeStageEvents.length,
            active: 0,
            available: 0,
            pending: 0,
            locked: 0,
            complete: 0,
            endgame: 0,
            actions: manualActionsCount
        };

        activeStageEvents.forEach(t => {
            const st = getNodeStatus(t, maps);
            if (counts[st.key] !== undefined) counts[st.key]++;
            if (t.isEndGame) counts.endgame++;
        });

        Object.entries(counts).forEach(([key, val]) => {
            const el = document.getElementById(`count-${key}`);
            if (el) el.textContent = val;
        });

        // 2. Update active filter button styling
        ['all', 'active', 'available', 'pending', 'locked', 'complete', 'endgame'].forEach(f => {
            const btn = document.getElementById(`filter-btn-${f}`);
            if (btn) btn.classList.toggle('active', currentEventFilter === f);
        });
        const actionsFilterBtn = document.getElementById('filter-btn-actions');
        if (actionsFilterBtn) actionsFilterBtn.classList.toggle('active', showManualActions);

        // 3. Update view toggle buttons
        const btnNetwork = document.getElementById('btn-view-network');
        const btnList = document.getElementById('btn-view-list');
        if (btnNetwork && btnList) {
            btnNetwork.classList.toggle('active', currentExplorerView === 'network');
            btnList.classList.toggle('active', currentExplorerView === 'list');
        }

        // 4. Render selected view
        container.classList.toggle('fac-network-mode', currentExplorerView === 'network');
        if (currentExplorerView === 'list') {
            renderCardListView(container, activeStageEvents, stages, maps, p);
        } else {
            renderNetworkView(container, activeStageEvents, stages, maps, p);
        }
    }

    window.renderScenarioExplorer = renderScenarioExplorer;
})();
