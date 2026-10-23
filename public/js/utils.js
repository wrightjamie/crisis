// Utility Functions Shared Between Client and Facilitator

function formatName(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
if (typeof window !== 'undefined') {
    window.formatName = formatName;
}

// Clean up and structure AI briefs for consistent formatting, paragraph spacing, and bullets
function tidyAiBrief(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';

    let text = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

    // Strip regurgitated LLM prompts if the model echoes the prompt (e.g. "Context:... Task:...")
    text = text.replace(/^Context:\s*[\s\S]*?(?:Task|Instructions|Prompt):[^\n]*\n*/i, '').trim();

    // Split into lines
    const rawLines = text.split('\n');
    const cleanedLines = [];

    // Helper to check if a line is a bullet
    const isBulletLine = (line) => /^\s*([•◦▪⁃\*\-]|(?:\d+\.))\s+/.test(line);

    let skippedPreamble = false;

    for (let i = 0; i < rawLines.length; i++) {
        let line = rawLines[i].trim();

        if (!line) {
            // Keep empty lines as paragraph dividers if the last line wasn't already empty
            if (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1] !== '') {
                cleanedLines.push('');
            }
            continue;
        }

        // Strip regurgitated prompt lines like "Context:", "Task:", "Prompt:"
        if (!skippedPreamble && /^(?:Context|Task|Prompt|Instructions):\s*$/i.test(line)) {
            continue;
        }

        // Remove redundant top-level briefing titles (e.g. "EXECUTIVE BRIEFING", "# EXECUTIVE SUMMARY")
        if (cleanedLines.length === 0 || (cleanedLines.length === 1 && cleanedLines[0] === '')) {
            if (/^(?:#+\s*|\*\*)?(?:EXECUTIVE\s+BRIEFING|INTELLIGENCE\s+BRIEFING|MISSION\s+BRIEFING|SITUATION\s+REPORT|EXECUTIVE\s+SUMMARY)(?:\*\*|:)?\s*$/i.test(line)) {
                skippedPreamble = true;
                continue;
            }
        }

        skippedPreamble = true;

        // Standalone section titles like "OVERVIEW", "SITUATION OVERVIEW"
        if (/^(?:#+\s*|\*\*)?(OVERVIEW|SITUATION OVERVIEW|OPERATIONAL PICTURE|EXECUTIVE OVERVIEW)(?:\*\*|:)?\s*$/i.test(line)) {
            const headingText = line.replace(/^[#\*\s]+/, '').replace(/[\*:]+$/, '').trim();
            const formatted = headingText.charAt(0).toUpperCase() + headingText.slice(1).toLowerCase();
            if (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1] !== '') cleanedLines.push('');
            cleanedLines.push(`### ${formatted}`);
            cleanedLines.push('');
            continue;
        }

        // Section headers ending with a colon e.g. "Critical Details and Challenges:" or "Key Highlights:"
        const headerWithColon = line.match(/^(?:#+\s*|\*\*)?([A-Za-z0-9\s/&—–-]{3,50})(?:\*\*)?:\s*$/i);
        if (headerWithColon && !isBulletLine(line)) {
            const rawHeader = headerWithColon[1].trim();
            const formatted = rawHeader.charAt(0).toUpperCase() + rawHeader.slice(1);
            if (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1] !== '') cleanedLines.push('');
            cleanedLines.push(`### ${formatted}`);
            cleanedLines.push('');
            continue;
        }

        // Sub-bullets with white circle (◦) or indented bullets
        if (/^◦\s+(.*)$/.test(line)) {
            const content = line.replace(/^◦\s+/, '').trim();
            cleanedLines.push(`  - ${content}`);
            continue;
        }
        if (/^(\s{2,}|\t)[•◦▪⁃\*\-]\s+(.*)$/.test(rawLines[i])) {
            const content = rawLines[i].replace(/^(\s{2,}|\t)[•◦▪⁃\*\-]\s+/, '').trim();
            cleanedLines.push(`  - ${content}`);
            continue;
        }

        // Top-level bullets: •, ▪, ⁃, *, -
        if (/^[•▪⁃\*\-]\s+(.*)$/.test(line)) {
            let content = line.replace(/^[•▪⁃\*\-]\s+/, '').trim();

            // Auto-bold the leading topic if it has a colon e.g. "Key Installations: Securing..." -> "**Key Installations:** Securing..."
            const colonMatch = content.match(/^([^:*_\n]{2,40}):\s+(.*)$/);
            if (colonMatch && !content.startsWith('**')) {
                content = `**${colonMatch[1].trim()}:** ${colonMatch[2].trim()}`;
            }

            // Ensure a blank line before the first bullet if the previous line is text
            if (cleanedLines.length > 0) {
                const prev = cleanedLines[cleanedLines.length - 1];
                if (prev !== '' && !prev.startsWith('- ') && !prev.startsWith('  - ')) {
                    cleanedLines.push('');
                }
            }

            cleanedLines.push(`- ${content}`);
            continue;
        }

        // Regular paragraph lines
        // If previous line was a bullet, insert blank line before starting a new paragraph
        if (cleanedLines.length > 0) {
            const prev = cleanedLines[cleanedLines.length - 1];
            if (prev !== '' && (prev.startsWith('- ') || prev.startsWith('  - '))) {
                cleanedLines.push('');
            }
        }

        cleanedLines.push(line);
    }

    let result = cleanedLines.join('\n');
    return result.replace(/\n{3,}/g, '\n\n').trim();
}

// Render Markdown with acronym parsing, HTML sanitization, and fallback
function renderBriefingMarkdown(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';
    const p = (t) => (typeof window !== 'undefined' && window.parseAcronyms) ? window.parseAcronyms(t) : t;
    const tidied = tidyAiBrief(rawText);
    const withAcronyms = p(tidied);
    if (typeof window !== 'undefined' && window.marked && window.DOMPurify) {
        return window.DOMPurify.sanitize(window.marked.parse(withAcronyms), { ADD_ATTR: ['onclick'] });
    }
    return withAcronyms.replace(/\n/g, '<br>');
}

if (typeof window !== 'undefined') {
    window.tidyAiBrief = tidyAiBrief;
    window.renderBriefingMarkdown = renderBriefingMarkdown;
    if (window.marked && typeof window.marked.setOptions === 'function') {
        window.marked.setOptions({ breaks: true, gfm: true });
    }
}

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
            html += `<li><button class="btn btn-secondary wiki-asset-btn" onclick="window.showWikiPanel('asset', '${a.id}')">${a.name}</button></li>`;
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
                html += `<li><button class="btn btn-secondary wiki-term-btn" onclick="window.showWikiPanel('term', '${ac}')"><strong>${ac}</strong> - ${item.definition}</button></li>`;
            }
        }
    }
    html += `</ul></div>`;
    return html;
}

function generateWikiAsset(currentState, itemId, p) {
    let html = `<button class="btn btn-secondary wiki-back-btn" onclick="window.showWikiPanel()">← Back to Wiki</button>`;
    const asset = (currentState && currentState.assets) ? currentState.assets.find(a => a.id === itemId) : null;
    if (asset) {
        html += `<div class="card wiki-card-blue">`;
        if (asset.image) {
            const altText = asset.imageMeta?.title || asset.name;
            const titleText = asset.imageMeta?.description || altText;
            html += `<img src="${asset.image}" alt="${altText}" title="${titleText}" class="wiki-img">`;
        }
        html += `<div class="card-title wiki-title-blue">${asset.name}</div>`;
        if (asset.briefing) html += `<div class="card-desc wiki-desc-margin">${p(asset.briefing)}</div>`;
        html += `</div>`;
    } else {
        html += `<p>Asset details not available.</p>`;
    }
    return html;
}

function generateWikiTerm(itemId, p) {
    let html = `<button class="btn btn-secondary wiki-back-btn" onclick="window.showWikiPanel()">← Back to Wiki</button>`;
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
function generateWikiHtml(currentState, category, itemId) {
    const p = (t) => (typeof window !== 'undefined' && window.parseAcronyms) ? window.parseAcronyms(t) : t;
    if (!category) {
        return generateWikiMainMenu(currentState, p);
    } else if (category === 'asset') {
        return generateWikiAsset(currentState, itemId, p);
    } else if (category === 'term') {
        return generateWikiTerm(itemId, p);
    }
    return '';
}
if (typeof window !== 'undefined') {
    window.generateWikiHtml = generateWikiHtml;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatName,
        generateWikiHtml,
        tidyAiBrief,
        renderBriefingMarkdown
    };
}
