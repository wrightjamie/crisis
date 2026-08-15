function renderScenarioExplorer() {
    const container = document.getElementById('scenario-explorer-container');
    if (!container) return;
    
    if (typeof allTemplates === 'undefined' || typeof currentState === 'undefined') return;
    
    const renderedNodes = new Set();
    const triggeredIds = new Set(currentState.events.map(e => e.templateId));
    
    const stages = currentState.scenarioConfig.stages || [];
    const currentStageIndex = currentState.currentStageIndex || 0;
    
    function getStageIndex(stageId) {
        if (!stageId) return 0;
        const idx = stages.findIndex(s => s.id === stageId);
        return idx !== -1 ? idx : 0;
    }
    
    function renderNode(templateId, isRoot = false) {
        if (renderedNodes.has(templateId)) return '';
        renderedNodes.add(templateId);
        
        const template = allTemplates.find(t => t.id === templateId);
        if (!template) return '';
        
        // Determine status
        let statusColor = 'var(--text-muted)';
        let statusText = 'LOCKED';
        let borderColor = 'var(--border-color)';
        let interactivity = 'cursor: not-allowed; opacity: 0.7;';
        let clickHandler = '';
        
        if (triggeredIds.has(templateId)) {
            statusColor = 'var(--status-1)'; 
            statusText = 'TRIGGERED';
            borderColor = 'var(--status-1)';
            interactivity = 'cursor: not-allowed; opacity: 0.85;';
        } else {
            const prereqsMet = !template.prerequisites || template.prerequisites.every(p => triggeredIds.has(p));
            const conditionsMet = checkConditions(template, currentState.scores, currentState.assets, currentState.unlockedEvents, currentState.events.map(e => e.templateId), currentActiveRoles);
            
            if (prereqsMet && conditionsMet) {
                statusColor = 'var(--accent-blue)';
                statusText = 'AVAILABLE';
                borderColor = 'var(--accent-blue)';
                interactivity = 'cursor: pointer; transition: transform 0.1s, border-color 0.2s;';
                clickHandler = `onclick="openEventDetails('${templateId}')"`;
            } else if (prereqsMet && !conditionsMet) {
                statusColor = 'var(--accent-orange)';
                statusText = 'PENDING CONDITIONS';
                borderColor = 'var(--accent-orange)';
                interactivity = 'cursor: pointer; transition: transform 0.1s, border-color 0.2s;';
                clickHandler = `onclick="openEventDetails('${templateId}')"`;
            }
        }
        
        // Filter children by stage
        const children = allTemplates.filter(t => {
            if (t.hidden || !t.prerequisites || !t.prerequisites.includes(templateId)) return false;
            return getStageIndex(t.stage) <= currentStageIndex;
        });
        
        const hasChildren = children.length > 0;
        
        // Determine if node is triggered to set default expansion
        const isTriggered = triggeredIds.has(templateId);
        
        let toggleHtml = '';
        if (hasChildren) {
            const btnText = isTriggered ? '[-]' : '[+]';
            toggleHtml = `<button onclick="event.stopPropagation(); const ul = this.closest('li').querySelector(':scope > ul'); if(ul.style.display==='none'){ul.style.display='block';this.textContent='[-]'}else{ul.style.display='none';this.textContent='[+]'};" class="scenario-tree-toggle" title="Toggle branch">${btnText}</button>`;
        }

        // Semantic list item structure with CSS variables for dynamic branch coloring
        let nodeHtml = `
            <li style="--branch-color: ${borderColor}; position: relative;">
                ${toggleHtml}
                <div ${clickHandler} class="scenario-tree-node ${interactivity ? 'clickable' : ''}" style="border-left-color: ${borderColor};" class="explorer-node">
                    <div class="scenario-node-title">${template.name}</div>
                    <div class="scenario-node-status" style="color: ${statusColor};">${statusText}</div>
        `;
        
        if (template.conditions) {
            let condStrs = [];
            if (template.conditions.minScores) {
                for (const [k, v] of Object.entries(template.conditions.minScores)) condStrs.push(`Min ${formatName(k)}: ${v}`);
            }
            if (condStrs.length > 0) {
                nodeHtml += `<div class="scenario-node-reqs">Cond: ${condStrs.join(', ')}</div>`;
            }
        }
        
        nodeHtml += `</div>`;
        
        // Render children
        if (hasChildren) {
            const displayStyle = isTriggered ? 'block' : 'none';
            // Nested ul
            nodeHtml += `<ul style="display: ${displayStyle};">`;
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
        // Fallback if no stages defined
        html += `<ul class="scenario-tree" class="pl-lg">`;
        const roots = allTemplates.filter(t => !t.hidden && (!t.prerequisites || t.prerequisites.length === 0));
        roots.forEach(root => { html += renderNode(root.id, true); });
        allTemplates.forEach(t => { if (!t.hidden && !renderedNodes.has(t.id)) html += renderNode(t.id, true); });
        html += `</ul>`;
    } else {
        // Render each stage as a collapsible block
        for (let i = 0; i <= currentStageIndex; i++) {
            const stage = stages[i];
            if (!stage) continue;
            
            const stageEvents = allTemplates.filter(t => !t.hidden && getStageIndex(t.stage) === i);
            const roots = stageEvents.filter(t => !t.prerequisites || t.prerequisites.length === 0);
            
            const isCurrentStage = i === currentStageIndex;
            const displayStyle = isCurrentStage ? 'block' : 'none';
            const toggleText = isCurrentStage ? '[-]' : '[+]';
            
            html += `
                <div class="scenario-stage-group">
                    <div onclick="const ul = this.nextElementSibling; if(ul.style.display==='none'){ul.style.display='block';this.querySelector('.toggle').textContent='[-]'}else{ul.style.display='none';this.querySelector('.toggle').textContent='[+]'}" class="scenario-stage-header">
                        <span class="text-bold text-accent-blue">Stage ${i + 1}: ${stage.name}</span>
                        <span class="toggle" class="font-mono">${toggleText}</span>
                    </div>
                    <div class="scenario-stage-content" style="display: ${displayStyle};">
                        <ul class="scenario-tree" class="pl-md">
            `;
            
            roots.forEach(root => {
                html += renderNode(root.id, true);
            });
            
            // Unconnected nodes in this stage (that weren't rendered as children of other roots)
            stageEvents.forEach(t => {
                if (!renderedNodes.has(t.id)) {
                    html += renderNode(t.id, true);
                }
            });
            
            html += `
                        </ul>
                    </div>
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
        
        /* Semantic Tree CSS */
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
            margin-left: 1.5rem; /* Indentation for children */
            padding-top: 1rem;
        }
        .scenario-tree li {
            margin: 0;
            padding: 0 0 1rem 1.5rem;
            position: relative;
        }
        /* Vertical line connecting children */
        .scenario-tree li::before {
            content: "";
            position: absolute;
            top: -1rem; /* Reach up to the parent */
            left: 0;
            bottom: 0;
            border-left: 2px solid var(--branch-color, var(--border-color));
        }
        /* Horizontal branch pointing to the child */
        .scenario-tree li::after {
            content: "";
            position: absolute;
            top: 2rem; /* Align with the vertical center of the node */
            left: 0;
            width: 1.5rem;
            border-top: 2px solid var(--branch-color, var(--border-color));
        }
        /* Stop the vertical line at the last child */
        .scenario-tree li:last-child::before {
            bottom: auto;
            height: 3rem; /* Reaches exactly down to the ::after horizontal line */
        }
        /* Root nodes don't get branch lines */
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
