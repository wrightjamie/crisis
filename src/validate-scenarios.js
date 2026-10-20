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
}

function validateAssets(scenario, errors) {
    if (!scenario.assets) return;
    if (!Array.isArray(scenario.assets)) {
        errors.push("'assets' must be an array");
    } else {
        scenario.assets.forEach((asset, index) => {
            const assetPath = `asset[${index}] (${asset.id || 'unknown'})`;
            validateImageReference(asset, assetPath, errors);
        });
    }
}

function validateEventTemplates(scenario, errors) {
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
            if (event.conditions) {
                validateConditions(event.conditions, `${eventPath} (${event.id || 'unknown'})`, errors);
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
    validateImageLibrary
};
