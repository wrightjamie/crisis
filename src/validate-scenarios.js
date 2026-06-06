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

function validateEventTemplates(scenario, errors) {
    if (!scenario.eventTemplates || !Array.isArray(scenario.eventTemplates)) {
        errors.push("Missing or invalid 'eventTemplates'");
    } else {
        scenario.eventTemplates.forEach((event, index) => {
            const eventPath = `eventTemplate[${index}]`;
            if (!event.id) errors.push(`${eventPath} missing 'id'`);
            if (!event.name) errors.push(`${eventPath} missing 'name'`);
            if (!event.location || !Array.isArray(event.location) || event.location.length !== 2) {
                errors.push(`${eventPath} (${event.id || 'unknown'}) missing or invalid 'location'`);
            }
            if (event.decisions && !Array.isArray(event.decisions)) {
                errors.push(`${eventPath} (${event.id || 'unknown'}) 'decisions' must be an array`);
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
                    if (!opt.id) errors.push(`${axisPath}.options[${optIndex}] missing 'id'`);
                    if (!opt.name) errors.push(`${axisPath}.options[${optIndex}] missing 'name'`);
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
            if (!action.initiator || !Array.isArray(action.initiator)) {
                errors.push(`${actionPath} (${action.id || 'unknown'}) missing or invalid 'initiator' array`);
            }
        });
    }
}

function validateScenario(scenario) {
    const errors = [];

    validateBasicStructure(scenario, errors);
    validateMapConfig(scenario, errors);
    validateRoles(scenario, errors);
    validateInitialScores(scenario, errors);
    validateEventTemplates(scenario, errors);
    validateVariantAxes(scenario, errors);
    validateManualActions(scenario, errors);

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = { validateScenario, validateBasicStructure, validateRoles };
