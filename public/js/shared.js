// Shared code between Client, Facilitator, and Server

function _checkScoreBounds(conditions, scores) {
    if (conditions.minScores && !Object.entries(conditions.minScores).every(([k, v]) => (scores[k] || 0) >= v)) return false;
    if (conditions.maxScores && !Object.entries(conditions.maxScores).every(([k, v]) => (scores[k] || 0) <= v)) return false;
    return true;
}

function _checkAssetConditions(conditions, assets = []) {
    if (conditions.assets && !Object.entries(conditions.assets).every(([k, v]) => (assets.find(a => a.id === k) || {}).state === v)) return false;
    if (conditions.assetStates && !Object.entries(conditions.assetStates).every(([k, v]) => (assets.find(a => a.id === k) || {}).state === v)) return false;
    if (conditions.visibleAssets && !conditions.visibleAssets.every(id => {
        const a = assets.find(x => x.id === id);
        return a && !a.hidden;
    })) return false;
    if (conditions.hiddenAssets && !conditions.hiddenAssets.every(id => {
        const a = assets.find(x => x.id === id);
        return a && a.hidden;
    })) return false;
    if (conditions.assetVisibility && !Object.entries(conditions.assetVisibility).every(([k, v]) => {
        const a = assets.find(x => x.id === k);
        if (!a) return false;
        const isVisible = !a.hidden;
        const expected = (v === true || v === 'visible');
        return isVisible === expected;
    })) return false;
    return true;
}

function _checkEventsAndRoles(conditions, unlockedEvents, triggeredEvents, activeRoles) {
    if (conditions.unlockedEvents && !conditions.unlockedEvents.every(e => unlockedEvents.includes(e))) return false;
    if (conditions.triggeredEvents && !conditions.triggeredEvents.every(e => triggeredEvents.includes(e))) return false;
    if (conditions.notTriggeredEvents && conditions.notTriggeredEvents.some(e => triggeredEvents.includes(e))) return false;
    if (conditions.activeRoles && !conditions.activeRoles.every(r => activeRoles.includes(r))) return false;
    if (conditions.anyActiveRoles && conditions.anyActiveRoles.length > 0 && !conditions.anyActiveRoles.some(r => activeRoles.includes(r))) return false;
    return true;
}

function _checkHighestScoreGroup(highestScoreGroup, scores) {
    if (!highestScoreGroup) return true;
    let bestGroup = null;
    let bestSum = -1;
    for (const [groupName, keys] of Object.entries(highestScoreGroup.groups)) {
        const sum = keys.reduce((acc, k) => acc + (scores[k] || 0), 0);
        if (sum > bestSum) { bestSum = sum; bestGroup = groupName; }
    }
    return bestGroup === highestScoreGroup.expected;
}

function _evaluateConditionNode(c, scores, assets, unlockedEvents, triggeredEvents, activeRoles) {
    if (!c || typeof c !== 'object') return true;
    const leafPass =
        _checkScoreBounds(c, scores) &&
        _checkAssetConditions(c, assets) &&
        _checkEventsAndRoles(c, unlockedEvents, triggeredEvents, activeRoles) &&
        _checkHighestScoreGroup(c.highestScoreGroup, scores);
    if (!leafPass) return false;

    if (Array.isArray(c.all) && !c.all.every(sub => _evaluateConditionNode(sub, scores, assets, unlockedEvents, triggeredEvents, activeRoles))) {
        return false;
    }
    if (Array.isArray(c.any) && c.any.length > 0 && !c.any.some(sub => _evaluateConditionNode(sub, scores, assets, unlockedEvents, triggeredEvents, activeRoles))) {
        return false;
    }
    if (c.not && _evaluateConditionNode(c.not, scores, assets, unlockedEvents, triggeredEvents, activeRoles)) {
        return false;
    }
    return true;
}

function checkConditions(obj, scores = {}, assets = [], unlockedEvents = [], triggeredEvents = [], activeRoles = []) {
    if (obj.requiresUnlock && !unlockedEvents.includes(obj.id)) return false;
    const c = obj.conditions;
    if (!c) return true;
    return _evaluateConditionNode(c, scores, assets, unlockedEvents, triggeredEvents, activeRoles);
}

function canSee(item, role) {
    if (role === 'facilitator') return true;

    if (item.visibleTo || item.hiddenFrom) {
        if (role === 'display') return false;

        if (item.hiddenFrom && item.hiddenFrom.includes(role)) {
            return false;
        }

        if (item.visibleTo && !item.visibleTo.includes(role)) {
            return false;
        }
    }

    return true;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkConditions, canSee };
} else if (typeof window !== 'undefined') {
    window.checkConditions = checkConditions;
    window.canSee = canSee;
}
