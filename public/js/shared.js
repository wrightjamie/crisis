// fallow-ignore-file
// Shared code between Client, Facilitator, and Server

function checkConditions(obj, scores, assets, unlockedEvents = [], triggeredEvents = []) {
    const c = obj.conditions;
    if (!c) return true;
    if (c.minScores && !Object.entries(c.minScores).every(([k, v]) => (scores[k] || 0) >= v)) return false;
    if (c.maxScores && !Object.entries(c.maxScores).every(([k, v]) => (scores[k] || 0) <= v)) return false;
    if (c.assets && !Object.entries(c.assets).every(([k, v]) => (assets.find(a => a.id === k) || {}).state === v)) return false;
    if (c.unlockedEvents && !c.unlockedEvents.every(e => unlockedEvents.includes(e))) return false;
    if (c.triggeredEvents && !c.triggeredEvents.every(e => triggeredEvents.includes(e))) return false;
    if (c.highestScoreGroup) {
        let bestGroup = null;
        let bestSum = -1;
        for (const [groupName, keys] of Object.entries(c.highestScoreGroup.groups)) {
            const sum = keys.reduce((acc, k) => acc + (scores[k] || 0), 0);
            if (sum > bestSum) { bestSum = sum; bestGroup = groupName; }
        }
        if (bestGroup !== c.highestScoreGroup.expected) return false;
    }
    return true;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkConditions };
} else if (typeof window !== 'undefined') {
    window.checkConditions = checkConditions;
}
