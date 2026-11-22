const fs = require('fs');
const path = require('path');
const { getImage, getImageLibrary } = require('./image-library');

function validateImageReference(item, itemPath, errors) {
    if (!item || item.image === undefined || item.image === null) return;
    const refId = item.imageId || item.image;
    if (typeof refId !== 'string' || !refId.trim()) {
        errors.push(`${itemPath} has invalid 'image' reference`);
        return;
    }
    if (!getImage(refId)) {
        errors.push(`${itemPath} references unknown image ID '${refId}'`);
    }
}

function validateImageLibrary(library = getImageLibrary()) {
    const errors = [];
    if (!library || typeof library !== 'object' || Array.isArray(library)) {
        errors.push('Image library must be a JSON object keyed by image ID');
        return { isValid: false, errors };
    }

    const publicDir = path.join(__dirname, '..', 'public');
    for (const [key, entry] of Object.entries(library)) {
        const entryPath = `imageLibrary['${key}']`;
        if (!entry || typeof entry !== 'object') {
            errors.push(`${entryPath} must be an object`);
            continue;
        }
        if (entry.id !== key) {
            errors.push(`${entryPath} 'id' ('${entry.id}') must match key '${key}'`);
        }
        if (!entry.file || typeof entry.file !== 'string') {
            errors.push(`${entryPath} missing or invalid 'file'`);
        } else {
            const diskPath = path.join(publicDir, entry.file.replace(/^\//, ''));
            if (!fs.existsSync(diskPath)) {
                errors.push(`${entryPath} file not found on disk: '${entry.file}'`);
            }
        }
        if (!entry.title || typeof entry.title !== 'string') {
            errors.push(`${entryPath} missing or invalid 'title'`);
        }
        if (!entry.description || typeof entry.description !== 'string') {
            errors.push(`${entryPath} missing or invalid 'description'`);
        }
        if (!Array.isArray(entry.tags) || entry.tags.length === 0 || !entry.tags.every(t => typeof t === 'string' && t.trim().length > 0)) {
            errors.push(`${entryPath} 'tags' must be a non-empty array of strings`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

function validateBasicStructure(scenario, errors) {
    if (!scenario.id || typeof scenario.id !== 'string') errors.push("Missing or invalid 'id'");
    if (!scenario.name || typeof scenario.name !== 'string') errors.push("Missing or invalid 'name'");
    if (!scenario.description || typeof scenario.description !== 'string') errors.push("Missing or invalid 'description'");
}

function validateMapConfig(scenario, errors) {
    if (!scenario.mapConfig || !Array.isArray(scenario.mapConfig.center) || scenario.mapConfig.center.length !== 2) {
        errors.push("Missing or invalid 'mapConfig.center'");
    }
}

function validateRoles(scenario, errors) {
    if (!scenario.roles || !Array.isArray(scenario.roles)) {
        errors.push("Missing or invalid 'roles' array");
    }

    if (!scenario.roleNames || typeof scenario.roleNames !== 'object') {
        errors.push("Missing or invalid 'roleNames' object");
    } else if (scenario.roles && Array.isArray(scenario.roles)) {
        scenario.roles.forEach(role => {
            if (!scenario.roleNames[role] || typeof scenario.roleNames[role] !== 'string') {
                errors.push(`Missing or invalid 'roleNames' entry for role: '${role}'`);
            }
        });
    }
}

function validateInitialScores(scenario, errors) {
    if (!scenario.initialScores || typeof scenario.initialScores !== 'object') {
        errors.push("Missing or invalid 'initialScores'");
    } else {
        for (const [key, value] of Object.entries(scenario.initialScores)) {
            if (typeof value !== 'number') {
                errors.push(`Invalid score value for '${key}'`);
            }
        }
    }
}

function validateScoreConfigs(scenario, errors) {
    if (scenario.scoreConfigs) {
        if (typeof scenario.scoreConfigs !== 'object') {
            errors.push("'scoreConfigs' must be an object");
        } else {
            for (const [key, config] of Object.entries(scenario.scoreConfigs)) {
                if (typeof config !== 'object') {
                    errors.push(`'scoreConfigs.${key}' must be an object`);
                } else {
                    if (config.min !== undefined && typeof config.min !== 'number') {
                        errors.push(`'scoreConfigs.${key}.min' must be a number`);
                    }
                    if (config.max !== undefined && typeof config.max !== 'number') {
                        errors.push(`'scoreConfigs.${key}.max' must be a number`);
                    }
                    if (config.unit !== undefined && typeof config.unit !== 'string') {
                        errors.push(`'scoreConfigs.${key}.unit' must be a string`);
                    }
                    if (config.visibleToPlayers !== undefined && typeof config.visibleToPlayers !== 'boolean') {
                        errors.push(`'scoreConfigs.${key}.visibleToPlayers' must be a boolean`);
                    }
                    if (config.promptAI !== undefined && typeof config.promptAI !== 'boolean') {
                        errors.push(`'scoreConfigs.${key}.promptAI' must be a boolean`);
                    }
                }
            }
        }
    }
}

function validateConditions(conditions, path, errors) {
    if (!conditions) return;
    if (typeof conditions !== 'object') {
        errors.push(`${path} 'conditions' must be an object`);
        return;
    }
    if (conditions.activeRoles && !Array.isArray(conditions.activeRoles)) {
        errors.push(`${path}.conditions 'activeRoles' must be an array`);
    }
    if (conditions.anyActiveRoles && !Array.isArray(conditions.anyActiveRoles)) {
        errors.push(`${path}.conditions 'anyActiveRoles' must be an array`);
    }
    if (conditions.visibleAssets && !Array.isArray(conditions.visibleAssets)) {
        errors.push(`${path}.conditions 'visibleAssets' must be an array`);
    }
    if (conditions.hiddenAssets && !Array.isArray(conditions.hiddenAssets)) {
        errors.push(`${path}.conditions 'hiddenAssets' must be an array`);
    }
    if (conditions.assetVisibility && typeof conditions.assetVisibility !== 'object') {
        errors.push(`${path}.conditions 'assetVisibility' must be an object`);
    }
    if (conditions.triggeredEvents && !Array.isArray(conditions.triggeredEvents)) {
        errors.push(`${path}.conditions 'triggeredEvents' must be an array`);
    }
    if (conditions.notTriggeredEvents && !Array.isArray(conditions.notTriggeredEvents)) {
        errors.push(`${path}.conditions 'notTriggeredEvents' must be an array`);
    }
    if (conditions.all !== undefined) {
        if (!Array.isArray(conditions.all)) {
            errors.push(`${path}.conditions 'all' must be an array`);
        } else {
            conditions.all.forEach((sub, idx) => validateConditions(sub, `${path}.conditions.all[${idx}]`, errors));
        }
    }
    if (conditions.any !== undefined) {
        if (!Array.isArray(conditions.any)) {
            errors.push(`${path}.conditions 'any' must be an array`);
        } else {
            conditions.any.forEach((sub, idx) => validateConditions(sub, `${path}.conditions.any[${idx}]`, errors));
        }
    }
    if (conditions.not !== undefined) {
        if (!conditions.not || typeof conditions.not !== 'object' || Array.isArray(conditions.not)) {
            errors.push(`${path}.conditions 'not' must be an object`);
        } else {
            validateConditions(conditions.not, `${path}.conditions.not`, errors);
        }
    }
}

function validateAssets(scenario, errors) {
    if (!scenario.assets) return;
    if (!Array.isArray(scenario.assets)) {
        errors.push("'assets' must be an array");
    } else {
        scenario.assets.forEach((asset, index) => {
            const assetPath = `asset[${index}] (${asset.id || 'unknown'})`;
            validateImageReference(asset, assetPath, errors);
            if (asset.hidden !== undefined && typeof asset.hidden !== 'boolean') {
                errors.push(`${assetPath} 'hidden' must be a boolean`);
            }
        });
    }
}

function validateDeployAssetEntry(assetId, cfg, path, assetIds, errors) {
    if (assetIds.size > 0 && !assetIds.has(assetId)) {
        errors.push(`${path}.effects.deployAssets references unknown asset '${assetId}'`);
    }
    if (typeof cfg === 'number') {
        if (!Number.isFinite(cfg) || cfg <= 0) {
            errors.push(`${path}.effects.deployAssets['${assetId}'] durationMs must be a positive number`);
        }
        return;
    }
    if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) {
        errors.push(`${path}.effects.deployAssets['${assetId}'] must be a positive durationMs number or config object`);
        return;
    }
    if (typeof cfg.durationMs !== 'number' || !Number.isFinite(cfg.durationMs) || cfg.durationMs <= 0) {
        errors.push(`${path}.effects.deployAssets['${assetId}'].durationMs must be a positive number`);
    }
    if (cfg.state !== undefined && typeof cfg.state !== 'string') {
        errors.push(`${path}.effects.deployAssets['${assetId}'].state must be a string`);
    }
    if (cfg.returnState !== undefined && typeof cfg.returnState !== 'string') {
        errors.push(`${path}.effects.deployAssets['${assetId}'].returnState must be a string`);
    }
}

function validateEffects(effects, path, assetIds, errors) {
    if (!effects || typeof effects !== 'object') return;
    if (effects.deployAssets !== undefined) {
        if (!effects.deployAssets || typeof effects.deployAssets !== 'object' || Array.isArray(effects.deployAssets)) {
            errors.push(`${path}.effects 'deployAssets' must be an object`);
        } else {
            for (const [assetId, cfg] of Object.entries(effects.deployAssets)) {
                validateDeployAssetEntry(assetId, cfg, path, assetIds, errors);
            }
        }
    }
    if (effects.conditionalEffects !== undefined) {
        if (!Array.isArray(effects.conditionalEffects)) {
            errors.push(`${path}.effects 'conditionalEffects' must be an array`);
        } else {
            effects.conditionalEffects.forEach((entry, idx) => {
                const entryPath = `${path}.effects.conditionalEffects[${idx}]`;
                if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
                    errors.push(`${entryPath} must be an object`);
                    return;
                }
                if (entry.conditions !== undefined) {
                    validateConditions(entry.conditions, entryPath, errors);
                }
                if (!entry.effects || typeof entry.effects !== 'object' || Array.isArray(entry.effects)) {
                    errors.push(`${entryPath} missing or invalid 'effects' object`);
                } else {
                    validateEffects(entry.effects, entryPath, assetIds, errors);
                }
            });
        }
    }
}

function validateEventTemplates(scenario, errors) {
    const assetIds = new Set(Array.isArray(scenario.assets) ? scenario.assets.map(a => a && a.id).filter(Boolean) : []);
    if (!scenario.eventTemplates || !Array.isArray(scenario.eventTemplates)) {
        errors.push("Missing or invalid 'eventTemplates'");
    } else {
        scenario.eventTemplates.forEach((event, index) => {
            const eventPath = `eventTemplate[${index}]`;
            if (!event.id) errors.push(`${eventPath} missing 'id'`);
            if (!event.name) errors.push(`${eventPath} missing 'name'`);
            validateImageReference(event, `${eventPath} (${event.id || 'unknown'})`, errors);
            if (event.location && (!Array.isArray(event.location) || event.location.length !== 2)) {
                errors.push(`${eventPath} (${event.id || 'unknown'}) invalid 'location' array`);
            }
            if (event.visibleTo && !Array.isArray(event.visibleTo)) {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'visibleTo' must be an array`);
            }
            if (event.hiddenFrom && !Array.isArray(event.hiddenFrom)) {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'hiddenFrom' must be an array`);
            }
            if (event.sound && typeof event.sound !== 'string') {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'sound' must be a string`);
            }
            if (event.isOpeningEvent !== undefined && typeof event.isOpeningEvent !== 'boolean') {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'isOpeningEvent' must be a boolean`);
            }
            if (event.isManualAction !== undefined && typeof event.isManualAction !== 'boolean') {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'isManualAction' must be a boolean`);
            }
            if (event.isManualAction === true && (!event.initiator || !Array.isArray(event.initiator))) {
                errors.push(`${eventPath} (${event.id || 'unknown'}) manual action missing or invalid 'initiator' array`);
            }
            if (event.autoTriggerOnConditions !== undefined && typeof event.autoTriggerOnConditions !== 'boolean') {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'autoTriggerOnConditions' must be a boolean`);
            }
            if (event.conditions) {
                validateConditions(event.conditions, `${eventPath} (${event.id || 'unknown'})`, errors);
            }
            if (event.effects) {
                validateEffects(event.effects, `${eventPath} (${event.id || 'unknown'})`, assetIds, errors);
            }
            if (event.autoEffects) {
                validateEffects(event.autoEffects, `${eventPath} (${event.id || 'unknown'}).autoEffects`, assetIds, errors);
            }
            if (event.decisions && !Array.isArray(event.decisions)) {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'decisions' must be an array`);
            } else if (event.decisions) {
                event.decisions.forEach((dec, decIndex) => {
                    const decPath = `${eventPath}.decisions[${decIndex}]`;
                    if (dec.visibleTo && !Array.isArray(dec.visibleTo)) {
                        errors.push(`${decPath} 'visibleTo' must be an array`);
                    }
                    if (dec.hiddenFrom && !Array.isArray(dec.hiddenFrom)) {
                        errors.push(`${decPath} 'hiddenFrom' must be an array`);
                    }
                    if (dec.timeLimitMs !== undefined) {
                        if (typeof dec.timeLimitMs !== 'number') {
                            errors.push(`${decPath} 'timeLimitMs' must be a number`);
                        }
                        if (dec.defaultOptionId === undefined || typeof dec.defaultOptionId !== 'string') {
                            errors.push(`${decPath} 'defaultOptionId' is missing or invalid, required when 'timeLimitMs' is provided`);
                        }
                    }

                    if (dec.options && Array.isArray(dec.options)) {
                        let hasDefaultOption = false;
                        dec.options.forEach((opt, optIndex) => {
                            if (opt.id === dec.defaultOptionId) {
                                hasDefaultOption = true;
                            }
                            if (opt.conditions) {
                                validateConditions(opt.conditions, `${decPath}.options[${optIndex}]`, errors);
                            }
                            if (opt.effects) {
                                validateEffects(opt.effects, `${decPath}.options[${optIndex}]`, assetIds, errors);
                            }
                        });
                        if (dec.timeLimitMs !== undefined && !hasDefaultOption) {
                            errors.push(`${decPath} 'defaultOptionId' "${dec.defaultOptionId}" not found in options`);
                        }
                    }
                });
            }
        });
    }
}

function validateVariantAxes(scenario, errors) {
    if (!scenario.variantAxes) return;
    if (!Array.isArray(scenario.variantAxes)) {
        errors.push("'variantAxes' must be an array");
    } else {
        scenario.variantAxes.forEach((axis, index) => {
            const axisPath = `variantAxis[${index}]`;
            if (!axis.id) errors.push(`${axisPath} missing 'id'`);
            if (!axis.name) errors.push(`${axisPath} missing 'name'`);
            if (!axis.options || !Array.isArray(axis.options)) {
                errors.push(`${axisPath} missing or invalid 'options'`);
            } else {
                axis.options.forEach((opt, optIndex) => {
                    const optPath = `${axisPath}.options[${optIndex}]`;
                    if (!opt.id) errors.push(`${optPath} missing 'id'`);
                    if (!opt.name) errors.push(`${optPath} missing 'name'`);
                    if (Array.isArray(opt.assetModifiers)) {
                        opt.assetModifiers.forEach((asset, assetIdx) => {
                            validateImageReference(asset, `${optPath}.assetModifiers[${assetIdx}] (${asset.id || 'unknown'})`, errors);
                        });
                    }
                });
            }
        });
    }
}

function validateManualActions(scenario, errors) {
    if (!scenario.manualActions) return;
    if (!Array.isArray(scenario.manualActions)) {
        errors.push("'manualActions' must be an array");
    } else {
        scenario.manualActions.forEach((action, index) => {
            const actionPath = `manualAction[${index}]`;
            if (!action.id) errors.push(`${actionPath} missing 'id'`);
            if (!action.name) errors.push(`${actionPath} missing 'name'`);
            validateImageReference(action, `${actionPath} (${action.id || 'unknown'})`, errors);
            if (!action.initiator || !Array.isArray(action.initiator)) {
                errors.push(`${actionPath} (${action.id || 'unknown'}) missing or invalid 'initiator' array`);
            }
            if (action.conditions) {
                validateConditions(action.conditions, `${actionPath} (${action.id || 'unknown'})`, errors);
            }
        });
    }
}

function validateAiConfig(scenario, errors) {
    if (scenario.aiConfig) {
        if (!scenario.aiConfig.systemPrompt) {
            errors.push("aiConfig missing 'systemPrompt'");
        }
        if (!scenario.aiConfig.scoreLabels || typeof scenario.aiConfig.scoreLabels !== 'object') {
            errors.push("aiConfig missing or invalid 'scoreLabels'");
        }
        if (!scenario.aiConfig.roleContexts || typeof scenario.aiConfig.roleContexts !== 'object') {
            errors.push("aiConfig missing or invalid 'roleContexts'");
        }
        if (!scenario.aiConfig.scores || typeof scenario.aiConfig.scores !== 'object') {
            errors.push("aiConfig missing or invalid 'scores'");
        }
    }
}

function _extractConditionRefs(cond) {
    if (!cond || typeof cond !== 'object') return [];
    const refs = [];
    if (Array.isArray(cond.prerequisites)) refs.push(...cond.prerequisites);
    if (Array.isArray(cond.triggeredEvents)) refs.push(...cond.triggeredEvents);
    if (Array.isArray(cond.unlockedEvents)) refs.push(...cond.unlockedEvents);
    if (Array.isArray(cond.all)) cond.all.forEach(sub => refs.push(..._extractConditionRefs(sub)));
    if (Array.isArray(cond.any)) cond.any.forEach(sub => refs.push(..._extractConditionRefs(sub)));
    return refs.filter(Boolean);
}

function validateScenarioGraph(scenario, errors) {
    const allTemplates = Array.isArray(scenario.eventTemplates) ? scenario.eventTemplates : [];
    const events = allTemplates.filter(e => e && !e.isManualAction);
    const actions = allTemplates.filter(e => e && e.isManualAction);
    if (events.length === 0) return;

    const openingEvents = events.filter(e => e && e.isOpeningEvent === true);
    if (openingEvents.length > 1) {
        errors.push(`Multiple opening events found (${openingEvents.map(e => e.id).join(', ')}); only 1 event may have 'isOpeningEvent: true'`);
        return;
    }

    const startEvent = openingEvents[0]
        || events.find(e => e && (e.id === 'ev_start' || e.id === 'evt_initial'))
        || (events.length === 1 && actions.length === 0 ? events[0] : null);

    if (!startEvent) {
        if (events.length > 1 || actions.length > 0) {
            errors.push("Scenario must designate an opening event with 'isOpeningEvent: true'");
        }
        return;
    }

    const adj = new Map();
    const allNodes = [...events, ...actions].filter(n => n && n.id);
    allNodes.forEach(n => adj.set(n.id, new Set()));
    const addEdge = (u, v) => {
        if (u && v && u !== v && adj.has(u) && adj.has(v)) adj.get(u).add(v);
    };

    const addEffectEdges = (sourceId, effects) => {
        if (!effects || typeof effects !== 'object') return;
        (effects.triggerEvents || []).forEach(tr => addEdge(sourceId, typeof tr === 'string' ? tr : (tr?.id || tr?.event)));
        (effects.randomEvents || []).forEach(rn => addEdge(sourceId, typeof rn === 'string' ? rn : (rn?.id || rn?.event)));
        (effects.unlockEvents || []).forEach(u => addEdge(sourceId, u));
        (effects.conditionalEffects || []).forEach(ce => {
            if (ce && ce.effects) addEffectEdges(sourceId, ce.effects);
        });
    };

    events.forEach(ev => {
        if (!ev || !ev.id) return;
        (ev.triggerEvents || []).forEach(tr => addEdge(ev.id, typeof tr === 'string' ? tr : tr?.id));
        (ev.decisions || []).forEach(dec => {
            (dec.options || []).forEach(opt => {
                if (Array.isArray(opt.triggerEvents)) {
                    opt.triggerEvents.forEach(tr => addEdge(ev.id, typeof tr === 'string' ? tr : tr?.id));
                }
                addEffectEdges(ev.id, opt.effects);
            });
        });
        addEffectEdges(ev.id, ev.effects);
        addEffectEdges(ev.id, ev.autoEffects);
        [...(Array.isArray(ev.prerequisites) ? ev.prerequisites : []), ..._extractConditionRefs(ev.conditions)].forEach(p => addEdge(p, ev.id));
        if (ev.autoTriggerOnConditions && ev.conditions && (ev.conditions.minScores || ev.conditions.maxScores || ev.conditions.assetStates || ev.conditions.assets || ev.conditions.visibleAssets || ev.conditions.hiddenAssets)) {
            addEdge(startEvent.id, ev.id);
        }
    });

    actions.forEach(act => {
        if (!act || !act.id) return;
        [...(Array.isArray(act.events) ? act.events : []), ..._extractConditionRefs(act.conditions)].forEach(p => addEdge(p, act.id));
        addEffectEdges(act.id, act.effects);
    });

    const visited = new Set([startEvent.id]);
    const queue = [startEvent.id];
    while (queue.length > 0) {
        const curr = queue.shift();
        for (const next of (adj.get(curr) || [])) {
            if (!visited.has(next)) {
                visited.add(next);
                queue.push(next);
            }
        }
    }

    events.forEach(ev => {
        if (ev && ev.id && !visited.has(ev.id)) {
            errors.push(`Event '${ev.name || ev.id}' (${ev.id}) does not trace back to opening event '${startEvent.name || startEvent.id}'`);
        }
    });
    actions.forEach(act => {
        if (act && act.id && !visited.has(act.id)) {
            errors.push(`Manual action '${act.name || act.id}' (${act.id}) does not trace back to opening event '${startEvent.name || startEvent.id}'`);
        }
    });
}

function validateScenario(scenario) {
    const errors = [];

    validateBasicStructure(scenario, errors);
    validateMapConfig(scenario, errors);
    validateRoles(scenario, errors);
    validateInitialScores(scenario, errors);
    validateScoreConfigs(scenario, errors);
    validateAssets(scenario, errors);
    validateEventTemplates(scenario, errors);
    validateVariantAxes(scenario, errors);
    validateManualActions(scenario, errors);
    validateAiConfig(scenario, errors);
    validateScenarioGraph(scenario, errors);

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = {
    validateScenario,
    validateBasicStructure,
    validateRoles,
    validateAssets,
    validateEventTemplates,
    validateManualActions,
    validateAiConfig,
    validateScoreConfigs,
    validateImageReference,
    validateImageLibrary,
    validateScenarioGraph
};
