const scenarios = require('../data/scenarios');
const { validateScenario } = require('./validate-scenarios');
const { checkConditions } = require('../public/js/shared.js');

function applyVariantsToScenario(scenario, selectedVariants, scores, assets, selectedVariantNames, variantBriefings) {
    if (!selectedVariants || !scenario.variantAxes) return;

    for (const axis of scenario.variantAxes) {
        const selectedOptionId = selectedVariants[axis.id];
        if (!selectedOptionId) continue;

        const option = axis.options.find(o => o.id === selectedOptionId);
        if (!option) continue;

        selectedVariantNames.push(`${axis.name}: ${option.name}`);

        if (option.scoreModifiers) {
            for (const [key, delta] of Object.entries(option.scoreModifiers)) {
                if (scores[key] !== undefined) {
                    scores[key] = Math.max(1, Math.min(5, scores[key] + delta));
                }
            }
        }

        if (option.assetModifiers) {
            option.assetModifiers.forEach(modAsset => {
                const existingIdx = assets.findIndex(a => a.id === modAsset.id);
                if (existingIdx !== -1) {
                    assets[existingIdx] = JSON.parse(JSON.stringify(modAsset));
                } else {
                    assets.push(JSON.parse(JSON.stringify(modAsset)));
                }
            });
        }

        variantBriefings.push({
            axisName: axis.name,
            optionName: option.name,
            briefingText: option.briefingText || '',
            roleBriefings: option.roleBriefings || {}
        });
    }
}


class GameEngine {
    constructor() {
        this.scheduleLoopInterval = null;
        this.connectedClients = {}; // socket.id -> role
        this.pendingPlayers = {}; // socket.id -> role

        this.gameState = {
            status: 'holding',
            scenarioId: null,
            scores: {},
            events: [],
            decisionTasks: [],
            assets: [],
            players: [],
            unlockedEvents: [],
            scheduledEvents: [],
            aiBriefings: {},
            aiScenarioSummaries: {},
            currentStageIndex: 0
        };
    }

    getHoldingState() {
        return {
            status: 'holding',
            availableScenarios: scenarios.map(s => {
                const validation = validateScenario(s);
                return {
                    id: s.id,
                    name: s.name,
                    description: s.description,
                    isValid: validation.isValid,
                    validationErrors: validation.errors,
                    variantAxes: (s.variantAxes || []).map(axis => ({
                        id: axis.id,
                        name: axis.name,
                        options: axis.options.map(opt => ({ id: opt.id, name: opt.name }))
                    }))
                };
            })
        };
    }

    getActiveRoles() {
        return [...new Set(Object.values(this.connectedClients))];
    }

    kickRole(roleToKick) {
        let kickedSocketId = null;
        for (const [socketId, role] of Object.entries(this.connectedClients)) {
            if (role === roleToKick) {
                kickedSocketId = socketId;
                delete this.connectedClients[socketId];
                break;
            }
        }
        return kickedSocketId;
    }

    validateScenarioStart(scenarioId) {
        const scenario = scenarios.find(s => s.id === scenarioId);
        if (!scenario) return { valid: false, error: 'Scenario not found.' };

        const activeRoles = this.getActiveRoles().filter(r => r !== 'display' && r !== 'facilitator');
        
        const minUsers = scenario.minUsers !== undefined ? scenario.minUsers : 0;
        if (activeRoles.length < minUsers) {
            return { valid: false, error: `Cannot start scenario: At least ${minUsers} active player(s) required.` };
        }

        const mandatoryRoles = scenario.mandatoryRoles || [];
        for (const role of mandatoryRoles) {
            if (!activeRoles.includes(role)) {
                return { valid: false, error: `Cannot start scenario: The '${role}' role is mandatory.` };
            }
        }

        return { valid: true };
    }

    createLobby(scenarioId, selectedVariants) {
        const scenario = scenarios.find(s => s.id === scenarioId);
        if (!scenario) return null;

        const scores = { ...scenario.initialScores };
        const assets = JSON.parse(JSON.stringify(scenario.assets || []));
        const variantBriefings = [];
        const selectedVariantNames = [];

        if (selectedVariants && scenario.variantAxes) {
            applyVariantsToScenario(scenario, selectedVariants, scores, assets, selectedVariantNames, variantBriefings);
        }

        this.gameState = {
            status: 'lobby',
            scenarioId: scenario.id,
            scenarioConfig: {
                id: scenario.id,
                name: scenario.name,
                description: scenario.description,
                mapConfig: scenario.mapConfig,
                roles: scenario.roles,
                roleNames: scenario.roleNames || {},
                mandatoryRoles: scenario.mandatoryRoles || [],
                minUsers: scenario.minUsers || 1,
                briefings: scenario.briefings || {},
                variantBriefings: variantBriefings,
                selectedVariantNames: selectedVariantNames,
                aiConfig: scenario.aiConfig,
                stages: scenario.stages || []
            },
            scores: scores,
            events: [],
            decisionTasks: [],
            assets: assets,
            players: [],
            unlockedEvents: [],
            scheduledEvents: [],
            aiBriefings: {},
            aiScenarioSummaries: {},
            currentStageIndex: 0
        };

        this.connectedClients = {}; // reset roles
        this.pendingPlayers = {};
        const isRestart = this.gameState.scenarioId === scenarioId;
        return this.gameState;
    }

    setStage(stageIndex) {
        if (this.gameState.status !== 'active' && this.gameState.status !== 'lobby') return false;
        if (!this.gameState.scenarioConfig.stages || this.gameState.scenarioConfig.stages.length === 0) return false;
        
        const targetIndex = Math.max(0, Math.min(this.gameState.scenarioConfig.stages.length - 1, parseInt(stageIndex)));
        this.gameState.currentStageIndex = targetIndex;
        return true;
    }

    startGame() {
        if (this.gameState.status !== 'lobby') return false;
        this.gameState.status = 'active';
        return true;
    }

    resolveRoleFallback(targetRole, connectedRoles, roleFallbacks = {}) {
        if (connectedRoles.includes(targetRole)) return targetRole;
        const fallbacks = roleFallbacks[targetRole] || [];
        for (let fb of fallbacks) {
            if (connectedRoles.includes(fb)) return fb;
        }
        return null;
    }



    triggerScenarioEvent(eventId) {
        if (this.gameState.status !== 'active') return false;
        
        const scenario = scenarios.find(s => s.id === this.gameState.scenarioId);
        if (!scenario) return false;

        const template = scenario.eventTemplates.find(e => e.id === eventId);
        if (!template) return false;

        console.log(`Event triggered: ${template.name}`);

        let eventLocation = template.location;
        if (template.possibleLocations && template.possibleLocations.length > 0) {
            eventLocation = template.possibleLocations[Math.floor(Math.random() * template.possibleLocations.length)];
        }

        const newEvent = {
            id: `evt_${Date.now()}`,
            templateId: template.id,
            name: template.name,
            location: eventLocation,
            description: template.description,
            roleDescriptions: template.roleDescriptions,
            timestamp: Date.now()
        };

        this.gameState.events.push(newEvent);

        if (template.isEndGame) {
            this.gameState.status = 'ended';
            this.gameState.endGameEventId = template.id;
        }

        if (template.decisions) {
            template.decisions.forEach(dec => {
                const availableOptions = (dec.options || []).filter(opt =>
                    checkConditions(opt, this.gameState.scores, this.gameState.assets, this.gameState.unlockedEvents, this.gameState.events.map(e => e.templateId))
                );

                if (availableOptions.length > 0) {
                    let assignedRole = dec.role;
                    const activeRoles = Object.values(this.connectedClients);

                    if (assignedRole !== 'all') {
                        const resolvedRole = this.resolveRoleFallback(assignedRole, activeRoles, scenario.roleFallbacks);
                        if (resolvedRole) {
                            assignedRole = resolvedRole;
                        }
                    }

                    this.gameState.decisionTasks.push({
                        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                        eventId: newEvent.id,
                        role: assignedRole,
                        text: dec.text,
                        options: availableOptions,
                        status: 'pending'
                    });
                }
            });
        }
        return true;
    }

    startSchedulerLoop(onStateUpdate) {
        this.stopSchedulerLoop();
        this.scheduleLoopInterval = setInterval(() => {
            if (this.gameState.status !== 'active') return;

            let stateChanged = false;
            const now = Date.now();

            for (let i = this.gameState.scheduledEvents.length - 1; i >= 0; i--) {
                const se = this.gameState.scheduledEvents[i];
                if (!se.paused && now >= se.triggerTimeMs) {
                    this.gameState.scheduledEvents.splice(i, 1);
                    this.triggerScenarioEvent(se.templateId);
                    stateChanged = true;
                }
            }

            if (stateChanged && onStateUpdate) {
                onStateUpdate(this.gameState);
            }
        }, 1000);
    }

    stopSchedulerLoop() {
        if (this.scheduleLoopInterval) {
            clearInterval(this.scheduleLoopInterval);
            this.scheduleLoopInterval = null;
        }
    }

    resolveTask(taskId, optionId) {
        const task = this.gameState.decisionTasks.find(t => t.id === taskId);
        if (!task || task.status !== 'pending') return null;

        console.log(`Decision submitted for task ${task.id}: option ${optionId}`);
        task.status = 'resolved';
        task.selectedOption = optionId;

        const option = task.options.find(o => o.id === optionId);
        if (option && option.effects) {
            this.applyEffects(option.effects);
        }
        return option;
    }

    applyEffects(effects) {
        if (!effects) return;
        
        if (effects.scores) {
            for (const [scoreName, change] of Object.entries(effects.scores)) {
                if (this.gameState.scores[scoreName] !== undefined) {
                    this.gameState.scores[scoreName] += change;
                    this.gameState.scores[scoreName] = Math.max(1, Math.min(5, this.gameState.scores[scoreName]));
                }
            }
        }

        if (effects.unlockEvents) {
            effects.unlockEvents.forEach(evtId => {
                if (!this.gameState.unlockedEvents.includes(evtId)) {
                    this.gameState.unlockedEvents.push(evtId);
                }
            });
        }

        if (effects.triggerEvents) {
            effects.triggerEvents.forEach(te => {
                const roll = Math.random();
                if (roll <= (te.probability !== undefined ? te.probability : 1.0)) {
                    this.gameState.scheduledEvents.push({
                        uuid: `se_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                        templateId: te.id,
                        triggerTimeMs: Date.now() + (te.delayMs || 0),
                        paused: false,
                        timeRemainingMs: null
                    });
                }
            });
        }

        if (effects.randomEvents) {
            const totalWeight = effects.randomEvents.reduce((sum, re) => sum + (re.weight || 1), 0);
            let roll = Math.random() * totalWeight;
            for (const re of effects.randomEvents) {
                if (roll < (re.weight || 1)) {
                    this.gameState.scheduledEvents.push({
                        uuid: `se_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                        templateId: re.id,
                        triggerTimeMs: Date.now() + (re.delayMs || 0),
                        paused: false,
                        timeRemainingMs: null
                    });
                    break;
                }
                roll -= (re.weight || 1);
            }
        }
    }

    dismissTask(taskId) {
        const task = this.gameState.decisionTasks.find(t => t.id === taskId);
        if (task && task.status === 'pending') {
            task.status = 'resolved';
            task.selectedOption = 'Dismissed';
            return true;
        }
        return false;
    }

    triggerManualAction(actionId, initiatorRole) {
        if (this.gameState.status !== 'active') return false;
        
        const scenario = scenarios.find(s => s.id === this.gameState.scenarioId);
        if (!scenario || !scenario.manualActions) return false;

        const action = scenario.manualActions.find(a => a.id === actionId);
        if (!action) return false;

        // Verify initiator has permission
        if (!action.initiator.includes(initiatorRole)) return false;

        // Verify conditions
        if (!checkConditions(action, this.gameState.scores, this.gameState.assets, this.gameState.unlockedEvents, this.gameState.events.map(e => e.templateId))) return false;

        console.log(`Manual Action triggered: ${action.name} by ${initiatorRole}`);

        // Check for required approval (if required, and it's not the initiator themselves)
        let approver = null;
        if (action.requiresApprovalFrom) {
            let possibleApprovers = Array.isArray(action.requiresApprovalFrom) ? action.requiresApprovalFrom : [action.requiresApprovalFrom];
            possibleApprovers = possibleApprovers.filter(r => r !== initiatorRole);
            
            const activeRoles = Object.values(this.connectedClients);
            
            // 1. Try finding a resolved approver from the allowed list
            for (let pa of possibleApprovers) {
                const resolved = this.resolveRoleFallback(pa, activeRoles, scenario.roleFallbacks);
                if (resolved) {
                    approver = resolved;
                    break;
                }
            }
            
            // 3. Maintain original behavior if no clients are connected (e.g., unit tests)
            if (!approver && possibleApprovers.length > 0) {
                approver = possibleApprovers[0];
            }
        }

        if (approver) {
            const actionEvent = {
                id: `evt_action_${Date.now()}`,
                templateId: action.id,
                name: `Action Pending: ${action.name}`,
                location: null,
                description: `The ${initiatorRole} role has initiated: ${action.name}. Awaiting approval from ${approver}.`,
                timestamp: Date.now()
            };
            this.gameState.events.push(actionEvent);

            this.gameState.decisionTasks.push({
                id: `task_action_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                eventId: actionEvent.id,
                role: approver,
                text: `The ${initiatorRole} role requests authorization to execute: ${action.name}. Do you approve?`,
                options: [
                    { id: 'approve', text: 'Approve', effects: action.effects },
                    { id: 'veto', text: 'Veto', effects: {} }
                ],
                status: 'pending'
            });
        } else {
            // Immediate execution
            const actionEvent = {
                id: `evt_action_${Date.now()}`,
                templateId: action.id,
                name: `Action Executed: ${action.name}`,
                location: null,
                description: `The ${initiatorRole} role has executed: ${action.name}.`,
                timestamp: Date.now()
            };
            this.gameState.events.push(actionEvent);
            this.applyEffects(action.effects);
        }

        return true;
    }

    getScenarioTemplates() {
        if (this.gameState.status === 'active') {
            const scenario = scenarios.find(s => s.id === this.gameState.scenarioId);
            return scenario ? scenario.eventTemplates : [];
        }
        return [];
    }
}

module.exports = GameEngine;
