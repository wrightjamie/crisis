window.ACRONYMS = {};

window.loadScenarioAcronyms = async function(scenarioId) {
    if (!scenarioId) return;
    try {
        const response = await fetch(`/scenarios/${scenarioId}/acronyms.json`);
        if (response.ok) {
            window.ACRONYMS = await response.json();
            console.log(`Loaded acronyms for scenario: ${scenarioId}`);
        } else {
            console.warn(`No acronyms.json found for scenario: ${scenarioId}`);
            window.ACRONYMS = {};
        }
    } catch (err) {
        console.error('Error loading scenario acronyms:', err);
        window.ACRONYMS = {};
    }
};

if (typeof socket !== 'undefined') {
    let currentScenarioId = null;
    socket.on('state_update', (state) => {
        if (state && state.scenarioId && state.scenarioId !== currentScenarioId) {
            currentScenarioId = state.scenarioId;
            window.loadScenarioAcronyms(state.scenarioId);
        } else if (state && !state.scenarioId) {
            currentScenarioId = null;
            window.ACRONYMS = {};
        }
    });
}

function parseAcronyms(text) {
    if (!text || !window.ACRONYMS) return text;
    let parsedText = text;
    
    // Sort acronyms by length descending to prevent partial matches 
    const sortedAcronyms = Object.keys(window.ACRONYMS).sort((a, b) => b.length - a.length);
    
    for (const acronym of sortedAcronyms) {
        const item = window.ACRONYMS[acronym];
        const definition = typeof item === 'object' ? item.definition : item;
        const hasWiki = typeof item === 'object' && item.wiki;
        
        const regex = new RegExp(`\\b${acronym}\\b(?![^<]*>)`, 'g');
        
        if (hasWiki) {
            parsedText = parsedText.replace(regex, `<span class="acronym-hover acronym-wiki-link" title="${definition}" onclick="window.openWikiTerm('${acronym}')">${acronym}</span>`);
        } else {
            parsedText = parsedText.replace(regex, `<span class="acronym-hover" title="${definition}">${acronym}</span>`);
        }
    }
    return parsedText;
}

if (typeof window !== 'undefined') {
    window.parseAcronyms = parseAcronyms;
    
    // Global handler for opening wiki from text
    window.openWikiTerm = function(term) {
        if (window.showWikiPanel) {
            window.showWikiPanel('term', term);
        }
    };
}
