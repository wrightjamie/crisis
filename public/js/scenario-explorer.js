function openExplorer() {
    const panelTitle = document.getElementById('fac-info-title');
    const panelContent = document.getElementById('fac-info-content');
    const panel = document.getElementById('fac-info-panel');
    
    if (typeof allTemplates === 'undefined' || typeof currentState === 'undefined') return;
    
    panelTitle.textContent = 'Scenario Explorer';
    
    // Temporarily expand the panel for the tree view
    panel.style.width = '600px';
    
    let html = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem; background: var(--bg-primary); border-radius: 8px;">
            <p style="color: var(--text-muted); margin-bottom: 1rem; font-size: 0.9rem;">
                Tree visualization of scenario events. Root events are on the left. Indentation implies prerequisites.
            </p>
    `;
    
    const renderedNodes = new Set();
    const triggeredIds = new Set(currentState.events.map(e => e.templateId));
    
    function renderNode(templateId, depth = 0) {
        if (renderedNodes.has(templateId)) return '';
        renderedNodes.add(templateId);
        
        const template = allTemplates.find(t => t.id === templateId);
        if (!template) return '';
        
        // Determine status
        let statusColor = 'var(--text-muted)';
        let statusText = 'LOCKED';
        let borderColor = 'var(--border-color)';
        
        if (triggeredIds.has(templateId)) {
            statusColor = 'var(--status-1)';
            statusText = 'TRIGGERED';
            borderColor = 'var(--status-1)';
        } else {
            const prereqsMet = !template.prerequisites || template.prerequisites.every(p => triggeredIds.has(p));
            const conditionsMet = checkConditions(template, currentState.scores, currentState.assets);
            
            if (prereqsMet && conditionsMet) {
                statusColor = 'var(--accent-blue)';
                statusText = 'AVAILABLE';
                borderColor = 'var(--accent-blue)';
            } else if (prereqsMet && !conditionsMet) {
                statusColor = 'var(--accent-orange)';
                statusText = 'PENDING CONDITIONS';
                borderColor = 'var(--accent-orange)';
            }
        }
        
        let nodeHtml = `
            <div style="margin-left: ${depth * 25}px; border-left: 2px solid ${borderColor}; padding-left: 15px; padding-bottom: 15px; position: relative;">
                <div style="position: absolute; left: 0; top: 12px; width: 10px; height: 2px; background-color: ${borderColor};"></div>
                <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.8rem; border-radius: var(--radius-sm);">
                    <div style="color: var(--text-primary); font-weight: bold; margin-bottom: 0.2rem;">${template.name}</div>
                    <div style="font-size: 0.8rem; color: ${statusColor}; font-weight: bold;">${statusText}</div>
        `;
        
        if (template.conditions) {
            let condStrs = [];
            if (template.conditions.minScores) {
                for (const [k, v] of Object.entries(template.conditions.minScores)) condStrs.push(`Min ${formatName(k)}: ${v}`);
            }
            if (condStrs.length > 0) {
                nodeHtml += `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Conditions: ${condStrs.join(', ')}</div>`;
            }
        }
        
        nodeHtml += `</div></div>`;
        
        // Find children
        const children = allTemplates.filter(t => t.prerequisites && t.prerequisites.includes(templateId));
        children.forEach(child => {
            nodeHtml += renderNode(child.id, depth + 1);
        });
        
        return nodeHtml;
    }
    
    // Find roots
    const roots = allTemplates.filter(t => !t.prerequisites || t.prerequisites.length === 0);
    roots.forEach(root => {
        html += renderNode(root.id, 0);
    });
    
    // Render any unconnected nodes
    allTemplates.forEach(t => {
        if (!renderedNodes.has(t.id)) {
            html += renderNode(t.id, 0);
        }
    });
    
    html += `</div>`;
    
    panelContent.innerHTML = html;
    panel.classList.add('open');
    
    // Ensure we reset width when closed
    const closeBtn = panel.querySelector('button');
    if (closeBtn) {
        const originalOnclick = closeBtn.onclick;
        closeBtn.onclick = function(e) {
            panel.style.width = '400px'; // Revert to standard width
            if (originalOnclick) originalOnclick.call(this, e);
        };
    }
}

// Attach to window so HTML onClick works
window.openExplorer = openExplorer;
