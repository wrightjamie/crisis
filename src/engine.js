const scenarios = require('../data/scenarios');
const scenarioService = require('./db/scenario-service');
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
                    assets[existingIdx] = { ...assets[existingIdx], ...JSON.parse(JSON.stringify(modAsset)) };
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
    constructor(gameId = 'default', name = 'Default Game') {
        this.gameId = gameId;
        this.name = name;
        this.lastActivityTimestamp = Date.now();
        this.isPaused = false;
        this.useDraft = false;
        this.isTestSession = false;

        this.scheduleLoopInterval = null;
        this.connectedClients = {}; // socket.id -> role
        this.pendingPlayers = {}; // socket.id -> role

        this.gameState = {
            status: 'holding',
            isPaused: false,
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
            debugAi: process.env.DEBUG_AI === 'true',
            currentStageIndex: 0
        };
    }

    getScenario(scenarioId = this.gameState?.scenarioId) {
        if (!scenarioId) return null;
        let scenario = null;
        try {
            scenario = scenarioService.getScenario(scenarioId, { useDraft: Boolean(this.useDraft) });
        } catch {}
        if (!scenario) {
            scenario = scenarios.find(s => s.id === scenarioId) || null;
        }
        return scenario;
    }

    _formatScenarioHoldingSummary(summary, full = summary) {
        const validation = full ? validateScenario(full) : { isValid: true, errors: [] };
        const variantAxes = (full && Array.isArray(full.variantAxes) ? full.variantAxes : []).map(axis => ({
            id: axis.id,
            name: axis.name,
            options: axis.options.map(opt => ({ id: opt.id, name: opt.name }))
        }));
        return {
            id: summary.id,
            name: summary.name,
            description: summary.description,
            guideUrl: summary.guideUrl || null,
            minUsers: full ? full.minUsers : summary.minPlayers,
            roles: full ? full.roles : [],
            isValid: validation.isValid,
            validationErrors: validation.errors,
            variantAxes
        };
    }

    getHoldingState() {
        let available = [];
        try {
            const list = scenarioService.listScenarios({ publishedOnly: !this.useDraft });
            if (list && list.length > 0) {
                available = list.map(s => this._formatScenarioHoldingSummary(s, this.getScenario(s.id)));
            }
        } catch {}

        if (available.length === 0) {
            available = scenarios.map(s => this._formatScenarioHoldingSummary(s, s));
        }

        return {
            status: 'holding',
            availableScenarios: available
        };
    }

    updateActivity() {
        this.lastActivityTimestamp = Date.now();
    }

    hasFacilitator() {
        return Object.values(this.connectedClients).includes('facilitator');
    }

    pauseGame(isManual = false) {
        if (!this.isPaused && this.gameState.status === 'active') {
            this.isPaused = true;
            this.isManualPause = isManual;
            this.gameState.isPaused = true;
            this.updateActivity();

            // Pause all scheduled events
            const now = Date.now();
            this.gameState.scheduledEvents.forEach(se => {
                if (!se.paused) {
                    se.paused = true;
                    se.timeRemainingMs = se.triggerTimeMs - now;
                }
            });

            // Pause all timed decisions
            if (this.gameState.decisionTasks) {
                this.gameState.decisionTasks.forEach(task => {
                    if (task.timeLimitMs && !task.paused) {
                        task.paused = true;
                        task.timeRemainingMs = (task.startTime + task.timeLimitMs) - now;
                    }
                });
            }

            // Pause all timed asset deployments
            if (this.gameState.assets) {
                this.gameState.assets.forEach(asset => {
                    if (asset.deployedUntil && !asset.deployPaused) {
                        asset.deployPaused = true;
                        asset.deployRemainingMs = Math.max(0, asset.deployedUntil - now);
                    }
                });
            }

            console.log(`Game ${this.gameId} paused ${isManual ? 'manually by facilitator' : 'due to facilitator disconnect'}.`);
        }
    }

    resumeGame() {
        if (this.isPaused && this.gameState.status === 'active') {
            this.isPaused = false;
            this.isManualPause = false;
            this.gameState.isPaused = false;
            this.updateActivity();

            // Resume all scheduled events
            const now = Date.now();
            this.gameState.scheduledEvents.forEach(se => {
                // Only resume if it was paused by the system (we don't have a specific system-pause flag,
                // but resuming all paused events is the only sensible thing here, or we'd need to differentiate
                // facilitator-paused events from system-paused events. The game has no manual event-pause feature for facilitator yet,
                // except 'pause_scheduled_event' socket event, so resuming them all is fine for now).
                if (se.paused && se.timeRemainingMs !== null) {
                    se.paused = false;
                    se.triggerTimeMs = now + se.timeRemainingMs;
                    se.timeRemainingMs = null;
                }
            });

            // Resume all timed decisions
            if (this.gameState.decisionTasks) {
                this.gameState.decisionTasks.forEach(task => {
                    if (task.timeLimitMs && task.paused && task.timeRemainingMs !== null) {
                        task.paused = false;
                        task.startTime = now - (task.timeLimitMs - task.timeRemainingMs);
                        task.timeRemainingMs = null;
                    }
                });
            }

            // Resume all timed asset deployments
            if (this.gameState.assets) {
                this.gameState.assets.forEach(asset => {
                    if (asset.deployPaused && asset.deployRemainingMs !== null && asset.deployRemainingMs !== undefined) {
                        asset.deployPaused = false;
                        asset.deployedUntil = now + asset.deployRemainingMs;
                        asset.deployRemainingMs = null;
                    }
                });
            }

            console.log(`Game ${this.gameId} resumed.`);
        }
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
        const scenario = this.getScenario(scenarioId);
        if (!scenario) return { valid: false, error: 'Scenario not found.' };

        if (this.isTestSession) {
            return { valid: true };
        }

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

    createLobby(scenarioId, selectedVariants, aiEnabled = true) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario) return null;

        const scores = { ...scenario.initialScores };
        const assets = JSON.parse(JSON.stringify(scenario.assets || []));
        const variantBriefings = [];
        const selectedVariantNames = [];

        if (selectedVariants && scenario.variantAxes) {
            applyVariantsToScenario(scenario, selectedVariants, scores, assets, selectedVariantNames, variantBriefings);
        }

        assets.forEach(a => {
            a.initialState = a.state || 'operational';
        });

        this.gameState = {
            status: 'lobby',
            scenarioId: scenario.id,
            scenarioConfig: {
                id: scenario.id,
                name: scenario.name,
                description: scenario.description,
                guideUrl: scenario.guideUrl || null,
                mapConfig: scenario.mapConfig,
                roles: scenario.roles,
                roleNames: scenario.roleNames || {},
                mandatoryRoles: scenario.mandatoryRoles || [],
                minUsers: scenario.minUsers || 1,
                briefings: scenario.briefings || {},
                variantBriefings: variantBriefings,
                selectedVariantNames: selectedVariantNames,
                scoreConfigs: scenario.scoreConfigs || {},
                aiConfig: scenario.aiConfig,
                stages: scenario.stages || [],
                manualActions: this._getManualActions(scenario),
                canvasLayout: scenario.canvasLayout || null
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
            debugAi: process.env.DEBUG_AI === 'true',
            currentStageIndex: 0,
            aiEnabled: aiEnabled
        };

        this.connectedClients = {}; // reset roles
        this.pendingPlayers = {};
        this.selectedVariants = selectedVariants || null;
        this.isPaused = false;
        this.isManualPause = false;
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
        
        const scenario = this.getScenario();
        if (!scenario) return false;

        const template = (scenario.eventTemplates || []).find(e => e.id === eventId && !e.isManualAction);
        if (!template) return false;

        if (!template.repeatable && this.gameState.events.some(e => e.templateId === eventId)) {
            console.warn(`Event ${eventId} (${template.name}) has already been triggered and is not repeatable. Ignoring duplicate trigger.`);
            this.gameState.scheduledEvents = this.gameState.scheduledEvents.filter(se => se.templateId !== eventId);
            return false;
        }

        // Cancel any pending scheduled occurrences of this event template since it has now been triggered
        if (!template.repeatable) {
            this.gameState.scheduledEvents = this.gameState.scheduledEvents.filter(se => se.templateId !== eventId);
        }

        console.log(`Event triggered: ${template.name}`);

        let eventLocation = template.location;
        if (template.assetLocation && this.gameState.assets) {
            const linkedAsset = this.gameState.assets.find(a => a.id === template.assetLocation);
            if (linkedAsset && linkedAsset.location) {
                eventLocation = linkedAsset.location;
            }
        } else if (template.possibleLocations && template.possibleLocations.length > 0) {
            eventLocation = template.possibleLocations[Math.floor(Math.random() * template.possibleLocations.length)];
        }

        const newEvent = {
            id: `evt_${Date.now()}`,
            templateId: template.id,
            name: template.name,
            location: eventLocation,
            description: typeof template.description === 'function' ? template.description(this.gameState) : template.description,
            roleDescriptions: template.roleDescriptions,
            image: template.image,
            imageId: template.imageId,
            imageMeta: template.imageMeta,
            visibleTo: template.visibleTo,
            hiddenFrom: template.hiddenFrom,
            sound: template.sound,
            isEndGame: Boolean(template.isEndGame),
            timestamp: Date.now()
        };

        this.gameState.events.push(newEvent);

        if (template.isEndGame) {
            this.gameState.status = 'ended';
            this.gameState.endGameEventId = template.id;
        }

        if (template.autoEffects) {
            this.applyEffects(template.autoEffects);
        }

        if (template.triggerEvents) {
            this.applyEffects({ triggerEvents: template.triggerEvents });
        }

        if (template.decisions) {
            template.decisions.forEach(dec => {
                const availableOptions = (dec.options || []).filter(opt =>
                    checkConditions(opt, this.gameState.scores, this.gameState.assets, this.gameState.unlockedEvents, this.gameState.events.map(e => e.templateId), this.getActiveRoles())
                );

                if (availableOptions.length > 0) {
                    let assignedRole = dec.role;
                    const activeRoles = this.getActiveRoles();

                    if (assignedRole !== 'all') {
                        const resolvedRole = this.resolveRoleFallback(assignedRole, activeRoles, scenario.roleFallbacks);
                        if (resolvedRole) {
                            assignedRole = resolvedRole;
                        }
                    }

                    const task = {
                        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                        eventId: newEvent.id,
                        role: assignedRole,
                        text: dec.text,
                        visibleTo: dec.visibleTo,
                        hiddenFrom: dec.hiddenFrom,
                        options: availableOptions,
                        status: 'pending'
                    };

                    if (dec.timeLimitMs !== undefined) {
                        task.timeLimitMs = dec.timeLimitMs;
                        task.defaultOptionId = dec.defaultOptionId;
                        task.startTime = Date.now();
                    }

                    this.gameState.decisionTasks.push(task);
                }
            });
        }
        return true;
    }

    startSchedulerLoop(onStateUpdate) {
        this.stopSchedulerLoop();
        this.scheduleLoopInterval = setInterval(() => {
            if (this.gameState.status !== 'active' || this.isPaused) return;

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

            for (const task of this.gameState.decisionTasks) {
                if (task.status === 'pending' && task.timeLimitMs !== undefined) {
                    if (now >= task.startTime + task.timeLimitMs) {
                        console.log(`Task ${task.id} timed out. Applying default option ${task.defaultOptionId}`);
                        this.resolveTask(task.id, task.defaultOptionId);

                        this.gameState.events.push({
                            id: `evt_timeout_${Date.now()}`,
                            templateId: null,
                            name: `Decision Time Expired`,
                            location: null,
                            description: `Time expired for a decision. A default action was taken.`,
                            timestamp: Date.now()
                        });
                        stateChanged = true;
                    }
                }
            }

            if (this.checkDeployedAssets(now)) {
                stateChanged = true;
            }

            if (stateChanged && onStateUpdate) {
                onStateUpdate(this.gameState);
            }
        }, 1000);
    }

    checkDeployedAssets(now = Date.now()) {
        if (!this.gameState.assets || this.isPaused) return false;
        let changed = false;
        this.gameState.assets.forEach(asset => {
            if (asset.deployedUntil && !asset.deployPaused && now >= asset.deployedUntil) {
                const expectedDeployedState = asset.deployedState || 'deployed';
                const returnState = asset.deployReturnState || asset.initialState || 'operational';
                if (asset.state === expectedDeployedState) {
                    asset.state = returnState;
                    console.log(`Asset deployment completed: ${asset.id} -> ${returnState}`);
                    changed = true;
                }
                delete asset.deployedUntil;
                delete asset.deployedState;
                delete asset.deployReturnState;
                delete asset.deployPaused;
                delete asset.deployRemainingMs;
            }
        });
        if (changed) {
            this.evaluateAutoConditionEvents();
        }
        return changed;
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

        const option = task.options.find(o => o.id === optionId);
        if (!option) return null;

        // Re-verify option conditions at submission time (e.g., asset deployed concurrently)
        if (option.conditions) {
            const triggeredIds = this.gameState.events.map(e => e.templateId);
            if (!checkConditions(option, this.gameState.scores, this.gameState.assets, this.gameState.unlockedEvents, triggeredIds, this.getActiveRoles())) {
                console.log(`Decision option ${optionId} for task ${task.id} rejected: conditions no longer met.`);
                return null;
            }
        }

        console.log(`Decision submitted for task ${task.id}: option ${optionId}`);
        task.status = 'resolved';
        task.selectedOption = optionId;

        if (option.effects) {
            this.applyEffects(option.effects);
        }
        return option;
    }

    _applyScoreEffects(scores) {
        if (!scores) return;
        for (const [scoreName, change] of Object.entries(scores)) {
            if (this.gameState.scores[scoreName] !== undefined) {
                this.gameState.scores[scoreName] += change;

                const scoreConfig = this.gameState.scenarioConfig?.scoreConfigs?.[scoreName];
                const minVal = scoreConfig && scoreConfig.min !== undefined ? scoreConfig.min : 1;
                const maxVal = scoreConfig && scoreConfig.max !== undefined ? scoreConfig.max : 5;

                this.gameState.scores[scoreName] = Math.max(minVal, Math.min(maxVal, this.gameState.scores[scoreName]));
            }
        }
    }

    _applyDeployAssets(deployAssets) {
        if (!deployAssets || typeof deployAssets !== 'object') return;
        const now = Date.now();
        for (const [assetId, cfg] of Object.entries(deployAssets)) {
            const asset = this.gameState.assets.find(a => a.id === assetId);
            if (!asset) continue;
            const isObj = Boolean(cfg && typeof cfg === 'object');
            const durationMs = typeof cfg === 'number' ? cfg : Number(isObj ? cfg.durationMs : NaN);
            if (!Number.isFinite(durationMs) || durationMs <= 0) continue;
            const deployState = (isObj && cfg.state) ? cfg.state : 'deployed';
            const returnState = (isObj && cfg.returnState)
                ? cfg.returnState
                : (asset.initialState || asset.state || 'operational');
            asset.state = deployState;
            asset.deployedState = deployState;
            asset.deployReturnState = returnState;
            asset.deployedUntil = now + durationMs;
            asset.deployPaused = this.isPaused;
            asset.deployRemainingMs = this.isPaused ? durationMs : null;
            console.log(`Asset deployed: ${assetId} -> ${deployState} for ${durationMs}ms (returns to ${returnState})`);
        }
    }

    _applyAssetEffects(effects) {
        if (effects.assetStateChanges) {
            for (const [assetId, newState] of Object.entries(effects.assetStateChanges)) {
                const asset = this.gameState.assets.find(a => a.id === assetId);
                if (asset) {
                    asset.state = newState;
                    // Clear any active deployment timer if an explicit state change occurs
                    delete asset.deployedUntil;
                    delete asset.deployedState;
                    delete asset.deployReturnState;
                    delete asset.deployPaused;
                    delete asset.deployRemainingMs;
                    console.log(`Asset state changed: ${assetId} -> ${newState}`);
                }
            }
        }

        this._applyDeployAssets(effects.deployAssets);

        if (effects.revealAssets) {
            effects.revealAssets.forEach(assetId => {
                const asset = this.gameState.assets.find(a => a.id === assetId);
                if (asset) {
                    asset.hidden = false;
                    console.log(`Asset revealed: ${assetId}`);
                }
            });
        }

        if (effects.hideAssets) {
            effects.hideAssets.forEach(assetId => {
                const asset = this.gameState.assets.find(a => a.id === assetId);
                if (asset) {
                    asset.hidden = true;
                    console.log(`Asset hidden: ${assetId}`);
                }
            });
        }

        if (effects.assetVisibilityChanges) {
            for (const [assetId, isVisible] of Object.entries(effects.assetVisibilityChanges)) {
                const asset = this.gameState.assets.find(a => a.id === assetId);
                if (asset) {
                    asset.hidden = !isVisible;
                    console.log(`Asset visibility changed: ${assetId} -> visible=${Boolean(isVisible)}`);
                }
            }
        }
    }

    _canScheduleEventTemplate(templateId, scenario) {
        const template = scenario?.eventTemplates?.find(e => e.id === templateId);
        if (template && !template.repeatable) {
            const alreadyTriggered = this.gameState.events.some(e => e.templateId === templateId);
            const alreadyScheduled = this.gameState.scheduledEvents.some(se => se.templateId === templateId);
            if (alreadyTriggered || alreadyScheduled) return false;
        }
        return true;
    }

    _enqueueScheduledEvent(templateId, delayMs = 0) {
        this.gameState.scheduledEvents.push({
            uuid: `se_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            templateId,
            triggerTimeMs: Date.now() + (delayMs || 0),
            paused: false,
            timeRemainingMs: null
        });
    }

    _scheduleTriggeredEvents(triggerEvents) {
        if (!triggerEvents) return;
        const scenario = this.getScenario();
        triggerEvents.forEach(te => {
            if (!this._canScheduleEventTemplate(te.id, scenario)) return;
            const roll = Math.random();
            if (roll <= (te.probability !== undefined ? te.probability : 1.0)) {
                this._enqueueScheduledEvent(te.id, te.delayMs);
            }
        });
    }

    _scheduleRandomEvents(randomEvents) {
        if (!Array.isArray(randomEvents) || randomEvents.length === 0) return;
        const scenario = this.getScenario();

        const totalProb = randomEvents.reduce((sum, re) => sum + Math.max(0, Number(re?.probability) || 0), 0);
        const upperBound = Math.max(1.0, totalProb);
        let roll = Math.random() * upperBound;
        for (const re of randomEvents) {
            const p = Math.max(0, Number(re?.probability) || 0);
            if (roll < p) {
                const targetId = re.id || re.event;
                if (this._canScheduleEventTemplate(targetId, scenario)) {
                    this._enqueueScheduledEvent(targetId, re.delayMs);
                }
                break;
            }
            roll -= p;
        }
    }

    applyEffects(effects, _skipAutoEval = false) {
        if (!effects) return;

        // Evaluate conditionalEffects against pre-effect state so base effects
        // don't accidentally flip the condition for their own modifiers.
        const matchedConditionalEffects = [];
        if (Array.isArray(effects.conditionalEffects)) {
            const triggeredIds = this.gameState.events.map(e => e.templateId);
            const activeRoles = this.getActiveRoles();
            effects.conditionalEffects.forEach(entry => {
                if (!entry || !entry.effects) return;
                const met = !entry.conditions || checkConditions(
                    { conditions: entry.conditions },
                    this.gameState.scores,
                    this.gameState.assets,
                    this.gameState.unlockedEvents,
                    triggeredIds,
                    activeRoles
                );
                if (met) {
                    matchedConditionalEffects.push(entry.effects);
                }
            });
        }

        this._applyScoreEffects(effects.scores);

        if (effects.unlockEvents) {
            effects.unlockEvents.forEach(evtId => {
                if (!this.gameState.unlockedEvents.includes(evtId)) {
                    this.gameState.unlockedEvents.push(evtId);
                }
            });
        }

        this._applyAssetEffects(effects);
        this._scheduleTriggeredEvents(effects.triggerEvents);
        this._scheduleRandomEvents(effects.randomEvents);

        matchedConditionalEffects.forEach(ce => {
            this.applyEffects(ce, true);
        });

        if (!_skipAutoEval) {
            this.evaluateAutoConditionEvents();
        }
    }

    evaluateAutoConditionEvents() {
        if (this._evaluatingAutoEvents || this.gameState.status !== 'active') return 0;
        const scenario = this.getScenario();
        if (!scenario || !Array.isArray(scenario.eventTemplates)) return 0;

        this._evaluatingAutoEvents = true;
        let triggeredCount = 0;
        try {
            let pass = 0;
            let didTrigger = true;
            while (didTrigger && pass < 10 && this.gameState.status === 'active') {
                didTrigger = false;
                pass++;
                const activeRoles = this.getActiveRoles();
                for (const template of scenario.eventTemplates) {
                    if (!template || template.isManualAction || !template.autoTriggerOnConditions || !template.conditions) continue;
                    if (!this._canScheduleEventTemplate(template.id, scenario)) continue;
                    const triggeredIds = this.gameState.events.map(e => e.templateId);
                    if (checkConditions(template, this.gameState.scores, this.gameState.assets, this.gameState.unlockedEvents, triggeredIds, activeRoles)) {
                        if (this.triggerScenarioEvent(template.id)) {
                            triggeredCount++;
                            didTrigger = true;
                            if (this.gameState.status !== 'active') break;
                        }
                    }
                }
            }
        } finally {
            this._evaluatingAutoEvents = false;
        }
        return triggeredCount;
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

    _getManualActions(scenario) {
        if (!scenario) return [];
        return (scenario.eventTemplates || []).filter(e => e && e.isManualAction);
    }

    triggerManualAction(actionId, initiatorRole) {
        if (this.gameState.status !== 'active') return false;
        
        const scenario = this.getScenario();
        const manualActions = this._getManualActions(scenario);
        if (!scenario || manualActions.length === 0) return false;

        const action = manualActions.find(a => a.id === actionId);
        if (!action) return false;

        // Verify initiator has permission
        if (!action.initiator.includes(initiatorRole)) return false;

        const triggeredIds = this.gameState.events.map(e => e.templateId);

        // Prevent re-triggering non-repeatable manual actions
        if (!action.repeatable && triggeredIds.includes(action.id)) return false;

        // Verify conditions
        if (!checkConditions(action, this.gameState.scores, this.gameState.assets, this.gameState.unlockedEvents, triggeredIds, this.getActiveRoles())) return false;

        console.log(`Manual Action triggered: ${action.name} by ${initiatorRole}`);

        // Check for required approval (if required, and it's not the initiator themselves)
        let approver = null;
        if (action.requiresApprovalFrom) {
            let possibleApprovers = Array.isArray(action.requiresApprovalFrom) ? action.requiresApprovalFrom : [action.requiresApprovalFrom];
            possibleApprovers = possibleApprovers.filter(r => r !== initiatorRole);
            
            const activeRoles = this.getActiveRoles();
            
            // 1. Try finding a resolved approver from the allowed list (never self-approve)
            for (let pa of possibleApprovers) {
                const resolved = this.resolveRoleFallback(pa, activeRoles, scenario.roleFallbacks);
                if (resolved && resolved !== initiatorRole) {
                    approver = resolved;
                    break;
                }
            }
            
            // 3. Maintain original behavior if no clients are connected (e.g., unit tests)
            if (!approver && activeRoles.length === 0 && possibleApprovers.length > 0) {
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
            const scenario = this.getScenario();
            return scenario ? (scenario.eventTemplates || []).filter(e => e && !e.isManualAction) : [];
        }
        return [];
    }
}

module.exports = GameEngine;
