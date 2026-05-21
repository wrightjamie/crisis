const ACRONYMS = {
    "COBRA": "Cabinet Office Briefing Room A - UK Government's emergency response committee",
    "NATO": "North Atlantic Treaty Organization",
    "NCSC": "National Cyber Security Centre",
    "SWIFT": "Society for Worldwide Interbank Financial Telecommunication",
    "DDoS": "Distributed Denial of Service",
    "GCHQ": "Government Communications Headquarters",
    "QEC": "Queen Elizabeth Class (Aircraft Carrier)",
    "RIMPAC": "Rim of the Pacific Exercise",
    "AUKUS": "Australia, UK, US Security Pact",
    "MOD": "Ministry of Defence",
    "C2": "Command and Control",
    "UK": "United Kingdom",
    "US": "United States",
    "USA": "United States of America",
    "UN": "United Nations",
    "Article 5": "NATO Article 5 - The principle of collective defence: an attack against one Ally is considered an attack against all",
    "CDS": "Chief of the Defence Staff - The professional head of the British Armed Forces"
};

function parseAcronyms(text) {
    if (!text) return text;
    let parsedText = text;
    
    // Sort acronyms by length descending to prevent partial matches 
    // (e.g. matching "US" inside "USA" if US was evaluated first)
    const sortedAcronyms = Object.keys(ACRONYMS).sort((a, b) => b.length - a.length);
    
    for (const acronym of sortedAcronyms) {
        const definition = ACRONYMS[acronym];
        // Use word boundaries \b to ensure we only match whole words.
        // We use a positive lookbehind/lookahead strategy to ensure we don't 
        // accidentally match acronyms that are already inside HTML attributes.
        // A simple way to avoid HTML is just not replacing if inside a tag.
        const regex = new RegExp(`\\b${acronym}\\b(?![^<]*>)`, 'g');
        parsedText = parsedText.replace(regex, `<span class="acronym-hover" title="${definition}">${acronym}</span>`);
    }
    return parsedText;
}

if (typeof window !== 'undefined') {
    window.parseAcronyms = parseAcronyms;
    window.ACRONYMS = ACRONYMS;
}
