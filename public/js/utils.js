// Utility Functions Shared Between Client and Facilitator

// Format score names (e.g., 'uk_russia' -> 'Uk Russia')
window.formatName = function(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

function generateWikiMainMenu(currentState, p) {
    let html = `<div class="card wiki-card-blue">
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
    return html;
}

function generateWikiAsset(currentState, itemId, p) {
    let html = `<button class="btn wiki-back-btn" onclick="window.showWikiPanel()">← Back to Wiki</button>`;
    const asset = (currentState && currentState.assets) ? currentState.assets.find(a => a.id === itemId) : null;
    if (asset) {
        html += `<div class="card wiki-card-blue">`;
        if (asset.image) html += `<img src="${asset.image}" alt="${asset.name}" class="wiki-img">`;
        html += `<div class="card-title wiki-title-blue">${asset.name}</div>`;
        if (asset.briefing) html += `<div class="card-desc wiki-desc-margin">${p(asset.briefing)}</div>`;
        html += `</div>`;
    } else {
        html += `<p>Asset details not available.</p>`;
    }
    return html;
}

function generateWikiTerm(itemId, p) {
    let html = `<button class="btn wiki-back-btn" onclick="window.showWikiPanel()">← Back to Wiki</button>`;
    const item = window.ACRONYMS ? window.ACRONYMS[itemId] : null;
    if (item) {
        html += `<div class="card wiki-card-orange">
            <div class="card-title wiki-title-orange">${itemId}</div>
            <div class="card-desc wiki-term-def">${item.definition}</div>
            <div class="card-desc wiki-term-wiki">${p(item.wiki)}</div>
        </div>`;
    }
    return html;
}

// Generate HTML for the Knowledge Wiki panel
window.generateWikiHtml = function(currentState, category, itemId) {
    const p = (t) => window.parseAcronyms ? window.parseAcronyms(t) : t;
    if (!category) {
        return generateWikiMainMenu(currentState, p);
    } else if (category === 'asset') {
        return generateWikiAsset(currentState, itemId, p);
    } else if (category === 'term') {
        return generateWikiTerm(itemId, p);
    }
    return '';
};
