// Utility Functions Shared Between Client and Facilitator

// Format score names (e.g., 'uk_russia' -> 'Uk Russia')
window.formatName = function(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Generate HTML for the Knowledge Wiki panel
window.generateWikiHtml = function(currentState, category, itemId) {
    let html = '';
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;

    if (!category) {
        // Main menu
        html += `<div class="card wiki-card-blue">
            <div class="card-title wiki-card-title">Assets</div>
            <ul class="wiki-menu-list">`;
        
        if (currentState && currentState.assets && currentState.assets.length > 0) {
            // Deduplicate assets by name for the wiki
            const uniqueAssets = [];
            const seenAssetNames = new Set();
            currentState.assets.forEach(a => {
                if (!seenAssetNames.has(a.name)) {
                    seenAssetNames.add(a.name);
                    uniqueAssets.push(a);
                }
            });
            
            // Sort alphabetically
            uniqueAssets.sort((a, b) => a.name.localeCompare(b.name)).forEach(a => {
                html += `<li><button class="btn wiki-asset-btn" onclick="window.showWikiPanel('asset', '${a.id}')">${a.name}</button></li>`;
            });
        } else {
            html += `<li class="wiki-empty-msg">No assets currently deployed.</li>`;
        }
        html += `</ul></div>`;
        
        html += `<div class="card wiki-card-orange">
            <div class="card-title wiki-card-title">Terminology</div>
            <ul class="wiki-menu-list">`;
        
        if (window.ACRONYMS) {
            const sortedAcronyms = Object.keys(window.ACRONYMS).sort();
            for (const ac of sortedAcronyms) {
                const item = window.ACRONYMS[ac];
                const hasWiki = typeof item === 'object' && item.wiki;
                if (hasWiki) {
                    html += `<li><button class="btn wiki-term-btn" onclick="window.showWikiPanel('term', '${ac}')"><strong>${ac}</strong> - ${item.definition}</button></li>`;
                }
            }
        }
        html += `</ul></div>`;
        
    } else if (category === 'asset') {
        const asset = (currentState && currentState.assets) ? currentState.assets.find(a => a.id === itemId) : null;
        html += `<button class="btn wiki-back-btn" onclick="window.showWikiPanel()">← Back to Wiki</button>`;
        if (asset) {
            html += `<div class="card wiki-card-blue">`;
            if (asset.image) html += `<img src="${asset.image}" alt="${asset.name}" class="wiki-img">`;
            html += `<div class="card-title wiki-title-blue">${asset.name}</div>`;
            if (asset.briefing) html += `<div class="card-desc wiki-desc-margin">${p(asset.briefing)}</div>`;
            html += `</div>`;
        } else {
            html += `<p>Asset details not available.</p>`;
        }
    } else if (category === 'term') {
        const term = itemId;
        const item = window.ACRONYMS ? window.ACRONYMS[term] : null;
        html += `<button class="btn wiki-back-btn" onclick="window.showWikiPanel()">← Back to Wiki</button>`;
        if (item) {
            html += `<div class="card wiki-card-orange">
                <div class="card-title wiki-title-orange">${term}</div>
                <div class="card-desc wiki-term-def">${item.definition}</div>
                <div class="card-desc wiki-term-wiki">${p(item.wiki)}</div>
            </div>`;
        }
    }
    return html;
};

// Check conditions for events and actions
window.checkConditions = function(obj, scores, assets, unlockedEvents = [], triggeredEvents = []) {
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
    if (obj.conditions.unlockedEvents) {
        for (const evtId of obj.conditions.unlockedEvents) {
            if (!unlockedEvents.includes(evtId)) return false;
        }
    }
    if (obj.conditions.triggeredEvents) {
        for (const evtId of obj.conditions.triggeredEvents) {
            if (!triggeredEvents.includes(evtId)) return false;
        }
    }
    return true;
};
