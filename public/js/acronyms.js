const ACRONYMS = {
    "COBRA": {
        definition: "Cabinet Office Briefing Room A - UK Government's emergency response committee",
        wiki: "COBRA (Cabinet Office Briefing Room A) is the crisis response committee of the UK Government, convened to handle matters of national emergency or major disruption. Its meetings are typically held in the Cabinet Office buildings in London and are chaired by the Prime Minister or other senior ministers depending on the nature of the emergency."
    },
    "NATO": {
        definition: "North Atlantic Treaty Organization",
        wiki: "An intergovernmental military alliance between North American and European countries. Its core principle is collective defence, enshrined in Article 5: an attack against one Ally is considered an attack against all."
    },
    "NCSC": {
        definition: "National Cyber Security Centre",
        wiki: "The UK Government's authority on cyber security, providing support to the most critical organizations in the UK, the wider public sector, industry, and the general public."
    },
    "SWIFT": {
        definition: "Society for Worldwide Interbank Financial Telecommunication",
        wiki: "A vast messaging network used by financial institutions to securely transmit information and instructions through a standardized system of codes. Blocking a country from SWIFT is considered a severe financial sanction."
    },
    "DDoS": "Distributed Denial of Service",
    "GCHQ": {
        definition: "Government Communications Headquarters",
        wiki: "An intelligence and security organization responsible for providing signals intelligence (SIGINT) and information assurance to the government and armed forces of the United Kingdom."
    },
    "QEC": "Queen Elizabeth Class (Aircraft Carrier)",
    "RIMPAC": "Rim of the Pacific Exercise",
    "AUKUS": {
        definition: "Australia, UK, US Security Pact",
        wiki: "AUKUS is a trilateral security partnership between Australia, the United Kingdom, and the United States, announced in September 2021. Its primary focus is to support Australia in acquiring conventionally armed, nuclear-powered submarines (SSNs), but it also includes broader cooperation on advanced capabilities such as cyber, artificial intelligence, quantum technologies, and undersea capabilities. It is widely viewed as an effort to counter China's growing influence in the Indo-Pacific region."
    },
    "MOD": "Ministry of Defence",
    "C2": "Command and Control",
    "UK": "United Kingdom",
    "US": "United States",
    "USA": "United States of America",
    "UN": "United Nations",
    "Article 5": {
        definition: "NATO Article 5 - The principle of collective defence",
        wiki: "Article 5 is the cornerstone of NATO, stating that an armed attack against one or more of its members shall be considered an attack against them all. It has only been invoked once, following the 9/11 attacks in the US."
    },
    "CDS": "Chief of the Defence Staff - The professional head of the British Armed Forces"
};

function parseAcronyms(text) {
    if (!text) return text;
    let parsedText = text;
    
    // Sort acronyms by length descending to prevent partial matches 
    const sortedAcronyms = Object.keys(ACRONYMS).sort((a, b) => b.length - a.length);
    
    for (const acronym of sortedAcronyms) {
        const item = ACRONYMS[acronym];
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
    window.ACRONYMS = ACRONYMS;
    
    // Global handler for opening wiki from text
    window.openWikiTerm = function(term) {
        if (window.showWikiPanel) {
            window.showWikiPanel('term', term);
        }
    };
}
