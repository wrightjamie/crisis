// Scenario Explorer with Filtering, Search, and Dual Tree/Card Views

let currentEventFilter = 'all'; // 'all', 'available', 'pending', 'locked', 'triggered'
let currentEventSearch = '';
let currentExplorerView = 'tree'; // 'tree' or 'list'

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

window.setExplorerView = function(mode) {
    currentExplorerView = mode;
    renderScenarioExplorer();
};

function renderScenarioExplorer() {
    const container = document.getElementById('scenario-explorer-container');
    if (!container) return;
    
    if (typeof allTemplates === 'undefined' || typeof currentState === 'undefined') return;
    
    const triggeredIds = new Set(currentState.events.map(e => e.templateId));
    const stages = currentState.scenarioConfig.stages || [];
    const currentStageIndex = currentState.currentStageIndex || 0;
    const p = (t) => (window.parseAcronyms ? window.parseAcronyms(t) : t);
    
    function getStageIndex(stageId) {
        if (!stageId) return 0;
        const idx = stages.findIndex(s => s.id === stageId);
        return idx !== -1 ? idx : 0;
    }

    function getNodeStatus(template) {
        if (triggeredIds.has(template.id)) {
            return {
                key: 'triggered',
                text: 'TRIGGERED',
                color: 'var(--status-1)',
                borderColor: 'var(--status-1)',
                icon: '✅'
            };
        }
        const prereqsMet = !template.prerequisites || template.prerequisites.every(p => triggeredIds.has(p));
        const conditionsMet = checkConditions(template, currentState.scores, currentState.assets, currentState.unlockedEvents, currentState.events.map(e => e.templateId), currentActiveRoles);
        
        if (prereqsMet && conditionsMet) {
            return {
                key: 'available',
                text: 'AVAILABLE',
                color: 'var(--accent-blue)',
                borderColor: 'var(--accent-blue)',
                icon: '🟢'
            };
        } else if (prereqsMet && !conditionsMet) {
            return {
                key: 'pending',
                text: 'PENDING CONDITIONS',
                color: 'var(--accent-orange)',
                borderColor: 'var(--accent-orange)',
                icon: '⏳'
            };
        }
        return {
            key: 'locked',
            text: 'LOCKED',
            color: 'var(--text-muted)',
            borderColor: 'var(--border-color)',
            icon: '🔒'
        };
    }

    function templateMatchesFilter(template, statusObj) {
        if (currentEventFilter !== 'all' && statusObj.key !== currentEventFilter) {
            return false;
        }
        if (currentEventSearch) {
            const q = currentEventSearch;
            const name = (template.name || '').toLowerCase();
            const desc = (typeof template.description === 'string' ? template.description : '').toLowerCase();
            const notes = (template.facilitatorNotes || '').toLowerCase();
            const stage = (template.stage || '').toLowerCase();
            if (!name.includes(q) && !desc.includes(q) && !notes.includes(q) && !stage.includes(q)) {
                return false;
            }
        }
        return true;
    }

    // 1. Calculate counts for active stages
    const activeStageEvents = allTemplates.filter(t => !t.hidden && getStageIndex(t.stage) <= currentStageIndex);
    let countAll = activeStageEvents.length;
    let countAvailable = 0;
    let countPending = 0;
    let countLocked = 0;
    let countTriggered = 0;

    activeStageEvents.forEach(t => {
        const st = getNodeStatus(t);
        if (st.key === 'triggered') countTriggered++;
        else if (st.key === 'available') countAvailable++;
        else if (st.key === 'pending') countPending++;
        else countLocked++;
    });

    // Update count badges in toolbar
    const countAllEl = document.getElementById('count-all');
    const countAvailEl = document.getElementById('count-available');
    const countPendingEl = document.getElementById('count-pending');
    const countLockedEl = document.getElementById('count-locked');
    const countTriggeredEl = document.getElementById('count-triggered');

    if (countAllEl) countAllEl.textContent = countAll;
    if (countAvailEl) countAvailEl.textContent = countAvailable;
    if (countPendingEl) countPendingEl.textContent = countPending;
    if (countLockedEl) countLockedEl.textContent = countLocked;
    if (countTriggeredEl) countTriggeredEl.textContent = countTriggered;

    // Update active filter button styling
    ['all', 'available', 'pending', 'locked', 'triggered'].forEach(f => {
        const btn = document.getElementById(`filter-btn-${f}`);
        if (btn) {
            if (currentEventFilter === f) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });

    // Update view toggle buttons
    const btnTree = document.getElementById('btn-view-tree');
    const btnList = document.getElementById('btn-view-list');
    if (btnTree && btnList) {
        if (currentExplorerView === 'tree') {
            btnTree.classList.add('active');
            btnList.classList.remove('active');
        } else {
            btnTree.classList.remove('active');
            btnList.classList.add('active');
        }
    }

    // 2. Render Card List View
    if (currentExplorerView === 'list') {
        const matchingEvents = activeStageEvents.filter(t => templateMatchesFilter(t, getNodeStatus(t)));
        
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
                const status = getNodeStatus(template);
                const stageIdx = getStageIndex(template.stage);
                const stageName = stages[stageIdx]?.name || `Stage ${stageIdx + 1}`;
                
                let secretBadge = '';
                if (template.visibleTo || template.hiddenFrom) {
                    secretBadge = `<span class="badge uppercase" style="background: rgba(220, 38, 38, 0.2); color: #f87171; border: 1px solid rgba(220, 38, 38, 0.4);">Secret</span>`;
                }

                let soundBadge = '';
                if (template.sound) {
                    soundBadge = `<span class="badge uppercase" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3);">🔊 ${template.sound}</span>`;
                }

                let condSummary = '';
                if (template.conditions) {
                    const parts = [];
                    if (template.conditions.minScores) {
                        for (const [k, v] of Object.entries(template.conditions.minScores)) parts.push(`Min ${formatName(k)}: ${v}`);
                    }
                    if (template.conditions.visibleAssets) {
                        parts.push(`Visible: ${template.conditions.visibleAssets.join(', ')}`);
                    }
                    if (parts.length > 0) condSummary = parts.join(' • ');
                }

                const descText = typeof template.description === 'function' ? 'Dynamic description' : (template.description || '');

                listHtml += `
                    <div class="fac-event-card" style="--branch-color: ${status.borderColor};" onclick="openEventDetails('${template.id}')">
                        <div>
                            <div class="fac-event-card-header">
                                <span class="badge" style="background: var(--bg-tertiary); color: var(--text-secondary); font-size: 0.7rem;">Stage ${stageIdx + 1}</span>
                                <div class="flex-row items-center gap-xs">
                                    ${soundBadge}
                                    ${secretBadge}
                                    <span class="badge event-status-pill badge-${status.key}">${status.icon} ${status.text}</span>
                                </div>
                            </div>
                            <div class="fac-event-card-title mb-1">${p(template.name)}</div>
                            <div class="fac-event-card-desc">${p(descText)}</div>
                        </div>
                        <div class="fac-event-card-footer">
                            <span class="text-muted text-xs truncate flex-1">${condSummary || 'No special conditions'}</span>
                            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); openEventDetails('${template.id}')">View</button>
                        </div>
                    </div>
                `;
            });
            listHtml += `</div>`;
        }
        listHtml += `</div>`;
        container.innerHTML = listHtml;
        return;
    }

    // 3. Render Tree View
    const renderedNodes = new Set();
    const isFilterActive = currentEventFilter !== 'all' || currentEventSearch.length > 0;

    function hasMatchingDescendant(templateId) {
        const t = allTemplates.find(x => x.id === templateId);
        if (!t) return false;
        const status = getNodeStatus(t);
        if (templateMatchesFilter(t, status)) return true;
        const children = allTemplates.filter(c => !c.hidden && c.prerequisites && c.prerequisites.includes(templateId));
        return children.some(c => hasMatchingDescendant(c.id));
    }

    function renderNode(templateId, isRoot = false) {
        if (renderedNodes.has(templateId)) return '';
        
        const template = allTemplates.find(t => t.id === templateId);
        if (!template) return '';

        const status = getNodeStatus(template);
        const matchesCurrent = templateMatchesFilter(template, status);
        const hasDescendantMatch = hasMatchingDescendant(templateId);

        // If filtering is active and neither this node nor its descendants match, hide from tree
        if (isFilterActive && !hasDescendantMatch) {
            return '';
        }

        renderedNodes.add(templateId);

        // Children filtered by stage
        const children = allTemplates.filter(t => {
            if (t.hidden || !t.prerequisites || !t.prerequisites.includes(templateId)) return false;
            return getStageIndex(t.stage) <= currentStageIndex;
        });

        const hasChildren = children.length > 0;
        const isTriggered = triggeredIds.has(templateId);

        // Auto-expand branches when filtering is active and children contain matches
        const shouldExpand = isFilterActive ? hasChildren : isTriggered;

        let toggleHtml = '';
        if (hasChildren) {
            const btnText = shouldExpand ? '[-]' : '[+]';
            toggleHtml = `<button onclick="event.stopPropagation(); const ul = this.closest('li').querySelector(':scope > ul'); if(ul.classList.contains('d-none')){ul.classList.remove('d-none');this.textContent='[-]'}else{ul.classList.add('d-none');this.textContent='[+]'};" class="scenario-tree-toggle" title="Toggle branch">${btnText}</button>`;
        }

        const isClickable = status.key === 'available' || status.key === 'pending';
        const clickHandler = isClickable ? `onclick="openEventDetails('${templateId}')"` : '';
        const interactivity = isClickable ? 'cursor: pointer;' : 'cursor: not-allowed;';

        const dimClass = (isFilterActive && !matchesCurrent) ? 'filter-dimmed' : '';
        const highlightClass = (isFilterActive && matchesCurrent) ? 'filter-highlight' : '';

        let soundBadge = '';
        if (template.sound) {
            soundBadge = `<span class="badge uppercase ml-1" style="font-size: 0.65rem; background: rgba(14, 165, 233, 0.2); color: #38bdf8;">🔊 ${template.sound}</span>`;
        }

        let nodeHtml = `
            <li class="relative" style="--branch-color: ${status.borderColor};">
                ${toggleHtml}
                <div ${clickHandler} class="scenario-tree-node explorer-node border-color-dynamic ${isClickable ? 'clickable' : ''} ${dimClass} ${highlightClass}" style="--branch-color: ${status.borderColor}; ${interactivity}">
                    <div class="scenario-node-title">${p(template.name)} ${soundBadge}</div>
                    <div class="scenario-node-status status-color" style="--status-color: ${status.color};">${status.icon} ${status.text}</div>
        `;

        if (template.conditions) {
            let condStrs = [];
            if (template.conditions.minScores) {
                for (const [k, v] of Object.entries(template.conditions.minScores)) condStrs.push(`Min ${formatName(k)}: ${v}`);
            }
            if (template.conditions.visibleAssets) {
                condStrs.push(`Visible: ${template.conditions.visibleAssets.join(', ')}`);
            }
            if (condStrs.length > 0) {
                nodeHtml += `<div class="scenario-node-reqs">Cond: ${condStrs.join(', ')}</div>`;
            }
        }

        nodeHtml += `</div>`;

        if (hasChildren) {
            nodeHtml += `<ul class="${shouldExpand ? '' : 'd-none'}">`;
            children.forEach(child => {
                nodeHtml += renderNode(child.id, false);
            });
            nodeHtml += `</ul>`;
        }

        nodeHtml += `</li>`;
        return nodeHtml;
    }

    let html = `<div class="scenario-explorer-container">`;

    if (stages.length === 0) {
        html += `<ul class="scenario-tree pl-lg">`;
        const roots = allTemplates.filter(t => !t.hidden && (!t.prerequisites || t.prerequisites.length === 0));
        roots.forEach(root => { html += renderNode(root.id, true); });
        allTemplates.forEach(t => { if (!t.hidden && !renderedNodes.has(t.id)) html += renderNode(t.id, true); });
        html += `</ul>`;
    } else {
        let totalRenderedInTree = 0;
        for (let i = 0; i <= currentStageIndex; i++) {
            const stage = stages[i];
            if (!stage) continue;
            
            const stageEvents = allTemplates.filter(t => !t.hidden && getStageIndex(t.stage) === i);
            const roots = stageEvents.filter(t => !t.prerequisites || t.prerequisites.length === 0);
            
            // Check if stage has any matching events under active filter
            const stageHasMatches = !isFilterActive || stageEvents.some(t => hasMatchingDescendant(t.id));
            if (!stageHasMatches) continue;

            const isCurrentStage = i === currentStageIndex;
            const toggleText = (isCurrentStage || isFilterActive) ? '[-]' : '[+]';
            const contentDisplayClass = (isCurrentStage || isFilterActive) ? '' : 'd-none';

            let stageContentHtml = '';
            roots.forEach(root => {
                stageContentHtml += renderNode(root.id, true);
            });
            stageEvents.forEach(t => {
                if (!renderedNodes.has(t.id)) {
                    stageContentHtml += renderNode(t.id, true);
                }
            });

            if (stageContentHtml.trim().length > 0) {
                totalRenderedInTree++;
                html += `
                    <div class="scenario-stage-group">
                        <div onclick="const ul = this.nextElementSibling; if(ul.classList.contains('d-none')){ul.classList.remove('d-none');this.querySelector('.toggle').textContent='[-]'}else{ul.classList.add('d-none');this.querySelector('.toggle').textContent='[+]'}" class="scenario-stage-header">
                            <span class="text-bold text-accent-blue">Stage ${i + 1}: ${stage.name}</span>
                            <span class="toggle font-mono">${toggleText}</span>
                        </div>
                        <div class="scenario-stage-content ${contentDisplayClass}">
                            <ul class="scenario-tree pl-md">
                                ${stageContentHtml}
                            </ul>
                        </div>
                    </div>
                `;
            }
        }

        if (totalRenderedInTree === 0) {
            html += `
                <div class="card p-3 text-center">
                    <p class="text-secondary mb-1">No events match the current filter or search criteria.</p>
                    <button class="btn btn-secondary btn-sm" onclick="window.setEventFilter('all'); window.clearEventSearch();">Reset Filters</button>
                </div>
            `;
        }
    }

    html += `</div>`;
    container.innerHTML = html;
}

// Ensure style element is only injected once
if (!document.getElementById('explorer-node-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'explorer-node-styles';
    styleEl.textContent = `
        .explorer-node:hover {
            border-color: var(--text-muted) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .scenario-tree, .scenario-tree ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .scenario-tree {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .scenario-tree ul {
            margin-left: 1.5rem;
            padding-top: 1rem;
        }
        .scenario-tree li {
            margin: 0;
            padding: 0 0 1rem 1.5rem;
            position: relative;
        }
        .scenario-tree li::before {
            content: "";
            position: absolute;
            top: -1rem;
            left: 0;
            bottom: 0;
            border-left: 2px solid var(--branch-color, var(--border-color));
        }
        .scenario-tree li::after {
            content: "";
            position: absolute;
            top: 2rem;
            left: 0;
            width: 1.5rem;
            border-top: 2px solid var(--branch-color, var(--border-color));
        }
        .scenario-tree li:last-child::before {
            bottom: auto;
            height: 3rem;
        }
        .scenario-tree > li::before,
        .scenario-tree > li::after {
            display: none;
        }
        .scenario-tree > li {
            padding: 0;
            margin-bottom: 0;
        }
    `;
    document.head.appendChild(styleEl);
}

window.renderScenarioExplorer = renderScenarioExplorer;
