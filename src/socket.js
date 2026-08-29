module.exports = function setupSockets(io, gameManager) {
    // Socket.io connection handling
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Dashboard specific events
        socket.on('request_dashboard_data', () => {
            socket.emit('dashboard_data', gameManager.getAllGamesInfo());
        });

        socket.on('create_game', (data) => {
            if (!data.gameId || !data.name) return;
            const engine = gameManager.createGame(data.gameId, data.name);
            if (engine) {
                socket.emit('game_created', data.gameId);
                io.emit('dashboard_data', gameManager.getAllGamesInfo());
            } else {
                socket.emit('dashboard_error', 'Game ID already exists.');
            }
        });

        socket.on('delete_game', (gameId) => {
            if (gameManager.deleteGame(gameId)) {
                io.emit('dashboard_data', gameManager.getAllGamesInfo());
            }
        });

        socket.on('join_game', (gameId) => {
            const engine = gameManager.getGame(gameId);
            if (!engine) {
                socket.emit('game_not_found');
                return;
            }

            socket.join(gameId);
            socket.data.gameId = gameId;
            socket.emit('game_joined', gameId);

            // Send initial state
            const stateToSend = engine.gameState.status === 'holding' ? engine.getHoldingState() : engine.gameState;
            socket.emit('initial_state', stateToSend);

            if (engine.gameState.status === 'active' || engine.gameState.status === 'lobby') {
                if (engine.gameState.status === 'active') {
                    socket.emit('templates', engine.getScenarioTemplates());
                }
                socket.emit('active_roles', engine.getActiveRoles());
            }
        });

        // Facilitator opens a lobby
        socket.on('open_lobby', (data) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            const scenarioId = typeof data === 'string' ? data : data.scenarioId;
            const selectedVariants = typeof data === 'object' ? data.selectedVariants : null;

            console.log(`Opening lobby for scenario: ${scenarioId}`);
            engine.createLobby(scenarioId, selectedVariants);

            io.to(gameId).emit('state_update', engine.gameState);
            io.to(gameId).emit('active_roles', engine.getActiveRoles());
        });

        // Facilitator starts a scenario
        socket.on('start_scenario', () => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            const validation = engine.validateScenarioStart(engine.gameState.scenarioId);
            if (!validation.valid) {
                socket.emit('scenario_error', validation.error);
                return;
            }

            console.log(`Starting scenario: ${engine.gameState.scenarioId}`);
            engine.startGame();

            engine.startSchedulerLoop((updatedState) => {
                io.to(gameId).emit('state_update', updatedState);
            });

            io.to(gameId).emit('templates', engine.getScenarioTemplates());
            io.to(gameId).emit('state_update', engine.gameState);
        });

        socket.on('end_scenario', () => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            console.log('Scenario ended');
            engine.stopSchedulerLoop();
            engine.gameState = { status: 'holding', scenarioId: null };
            engine.connectedClients = {};
            io.to(gameId).emit('state_update', engine.getHoldingState());
            io.to(gameId).emit('active_roles', engine.getActiveRoles());
        });

        // Client registers their role
        socket.on('register_role', (role) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (!role) {
                engine.connectedClients[socket.id] = null;
                delete engine.pendingPlayers[socket.id];
                return;
            }

            const takenRoles = engine.getActiveRoles();
            if (role === 'facilitator' && takenRoles.includes('facilitator')) {
                socket.emit('role_error', 'A facilitator is already connected to this game.');
                return;
            }

            if (role !== 'display' && role !== 'facilitator' && takenRoles.includes(role)) {
                socket.emit('role_error', 'Role already taken');
                return;
            }

            // Late join logic
            if (engine.gameState.status === 'active' && role !== 'display' && role !== 'facilitator') {
                engine.pendingPlayers[socket.id] = role;
                socket.emit('role_pending_approval');
                io.to(gameId).emit('pending_players', engine.pendingPlayers);
                return;
            }

            engine.connectedClients[socket.id] = role;
            socket.emit('role_registered', role);
            io.to(gameId).emit('active_roles', engine.getActiveRoles());

            // Resume game if a facilitator joins a paused game
            if (role === 'facilitator' && engine.gameState.isPaused) {
                engine.resumeGame();
                io.to(gameId).emit('state_update', engine.gameState);
            }

            // Queue AI briefing for this newly active user
            if (engine.gameState.status === 'lobby' || engine.gameState.status === 'active') {
                io.to(gameId).emit('generate_ai_briefing', { role: role, mode: 'initial', includeSummary: true });
            }
        });

        // Player leaves their role voluntarily
        socket.on('leave_role', () => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.connectedClients[socket.id]) {
                delete engine.connectedClients[socket.id];
                io.to(gameId).emit('active_roles', engine.getActiveRoles());
            }
            if (engine.pendingPlayers[socket.id]) {
                delete engine.pendingPlayers[socket.id];
                io.to(gameId).emit('pending_players', engine.pendingPlayers);
            }
        });

        // Facilitator kicks a player
        socket.on('kick_player', (roleToKick) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.connectedClients[socket.id] === 'facilitator') {
                const targetSocketId = engine.kickRole(roleToKick);
                if (targetSocketId) {
                    io.to(targetSocketId).emit('kicked');
                    io.to(gameId).emit('active_roles', engine.getActiveRoles());
                }
            }
        });

        socket.on('approve_player', (targetSocketId) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.connectedClients[socket.id] !== 'facilitator') return;
            const role = engine.pendingPlayers[targetSocketId];
            if (role) {
                delete engine.pendingPlayers[targetSocketId];
                engine.connectedClients[targetSocketId] = role;
                io.to(targetSocketId).emit('role_registered', role);
                io.to(gameId).emit('active_roles', engine.getActiveRoles());
                io.to(gameId).emit('pending_players', engine.pendingPlayers);
                io.to(gameId).emit('generate_ai_briefing', { role: role, mode: 'initial', includeSummary: true });
            }
        });

        socket.on('reject_player', (targetSocketId) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.connectedClients[socket.id] !== 'facilitator') return;
            if (engine.pendingPlayers[targetSocketId]) {
                delete engine.pendingPlayers[targetSocketId];
                io.to(targetSocketId).emit('role_rejected');
                io.to(gameId).emit('pending_players', engine.pendingPlayers);
            }
        });

        // Facilitator triggers an event
        socket.on('trigger_event', (eventId) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.triggerScenarioEvent(eventId)) {
                io.to(gameId).emit('state_update', engine.gameState);
            }
        });

        // Client triggers a manual action
        socket.on('trigger_manual_action', (actionId) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            const role = engine.connectedClients[socket.id];
            if (role) {
                if (engine.triggerManualAction(actionId, role)) {
                    io.to(gameId).emit('state_update', engine.gameState);
                }
            }
        });

        // Facilitator Scheduled Event Controls
        socket.on('delete_scheduled_event', (uuid) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            engine.gameState.scheduledEvents = engine.gameState.scheduledEvents.filter(se => se.uuid !== uuid);
            io.to(gameId).emit('state_update', engine.gameState);
        });

        socket.on('pause_scheduled_event', (uuid) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            const se = engine.gameState.scheduledEvents.find(s => s.uuid === uuid);
            if (se && !se.paused) {
                se.paused = true;
                se.timeRemainingMs = se.triggerTimeMs - Date.now();
                io.to(gameId).emit('state_update', engine.gameState);
            }
        });

        socket.on('resume_scheduled_event', (uuid) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            const se = engine.gameState.scheduledEvents.find(s => s.uuid === uuid);
            if (se && se.paused) {
                se.paused = false;
                se.triggerTimeMs = Date.now() + se.timeRemainingMs;
                se.timeRemainingMs = null;
                io.to(gameId).emit('state_update', engine.gameState);
            }
        });

        socket.on('force_trigger_scheduled', (uuid) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            const idx = engine.gameState.scheduledEvents.findIndex(s => s.uuid === uuid);
            if (idx !== -1) {
                const templateId = engine.gameState.scheduledEvents[idx].templateId;
                engine.gameState.scheduledEvents.splice(idx, 1);
                if (engine.triggerScenarioEvent(templateId)) {
                    io.to(gameId).emit('state_update', engine.gameState);
                }
            }
        });

        // Client submits a decision
        socket.on('submit_decision', (data) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            const task = engine.gameState.decisionTasks.find(t => t.id === data.taskId);
            let eventName = 'Unknown Event';
            if (task) {
                const event = engine.gameState.events.find(e => e.id === task.eventId);
                if (event) eventName = event.name;
            }

            const taskInfo = task ? { visibleTo: task.visibleTo, hiddenFrom: task.hiddenFrom } : null;

            const option = engine.resolveTask(data.taskId, data.optionId);
            if (option) {
                const deciderRole = engine.connectedClients[socket.id] || 'Someone';
                io.to(gameId).emit('decision_made', { role: deciderRole, text: option.text, eventName: eventName, taskInfo: taskInfo });
                io.to(gameId).emit('state_update', engine.gameState);
                if (option.effects && option.effects.scores) {
                    io.to(gameId).emit('generate_ai_briefing_all', { context: `The following action was taken: ${option.text}` });
                }
            }
        });

        // Facilitator changes scenario stage
        socket.on('change_stage', (stageIndex) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.setStage(stageIndex)) {
                console.log(`Facilitator advanced scenario to stage index: ${stageIndex}`);
                io.to(gameId).emit('state_update', engine.gameState);
            }
        });

        // Facilitator dismisses a pending decision
        socket.on('dismiss_decision', (taskId) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.dismissTask(taskId)) {
                io.to(gameId).emit('state_update', engine.gameState);
            }
        });

        // Facilitator submits an AI generated executive summary of the scenario
        socket.on('submit_scenario_summary', (data) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.gameState.status === 'active' || engine.gameState.status === 'lobby') {
                console.log(`Received AI scenario summary for ${data.role}`);
                engine.gameState.aiScenarioSummaries[data.role] = {
                    text: data.text,
                    prompt: data.prompt,
                    timestamp: data.timestamp || Date.now()
                };
                io.to(gameId).emit('state_update', engine.gameState);
            }
        });

        // Facilitator manually updates scores
        socket.on('update_scores', (newScores) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            console.log('Scores manually updated by facilitator');
            engine.gameState.scores = { ...engine.gameState.scores, ...newScores };
            io.to(gameId).emit('state_update', engine.gameState);
            io.to(gameId).emit('generate_ai_briefing_all', { context: "The facilitator manually adjusted the operational scores." });
        });

        // Facilitator resets the game
        socket.on('reset_game', () => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.gameState.status !== 'active') return;
            console.log('Game reset by facilitator');
            engine.createLobby(engine.gameState.scenarioId);
            io.to(gameId).emit('state_update', engine.gameState);
        });

        socket.on('submit_ai_briefing', (data) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.gameState.status !== 'active' && engine.gameState.status !== 'lobby') return;
            if (!engine.gameState.aiBriefings) engine.gameState.aiBriefings = {};
            engine.gameState.aiBriefings[data.role] = data;
            io.to(gameId).emit('state_update', engine.gameState);
        });

        socket.on('request_ai_briefing', (role) => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (!engine) return;
            engine.updateActivity();
            if (engine.gameState.status !== 'active') return;
            io.to(gameId).emit('generate_ai_briefing', { role: role, mode: 'initial' });
        });

        socket.on('disconnect', () => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (engine) {
                engine.updateActivity();

                const role = engine.connectedClients[socket.id];
                delete engine.connectedClients[socket.id];
                if (engine.pendingPlayers[socket.id]) {
                    delete engine.pendingPlayers[socket.id];
                    io.to(gameId).emit('pending_players', engine.pendingPlayers);
                }
                io.to(gameId).emit('active_roles', engine.getActiveRoles());

                if (role === 'facilitator') {
                    engine.pauseGame();
                    io.to(gameId).emit('state_update', engine.gameState);
                }
            }
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
