const fs = require('fs');

const content = fs.readFileSync('src/socket.js', 'utf8');

// The replacement logic: we need to replace all global io.emit with io.to(gameId).emit,
// and handle dynamic game engine lookup based on socket.data.gameId

let newContent = content.replace(/module\.exports = function setupSockets\(io, engine\) \{/g, "module.exports = function setupSockets(io, gameManager) {");

// Add initial dashboard connections
newContent = newContent.replace(
    "    io.on('connection', (socket) => {\n        console.log(`Client connected: ${socket.id}`);\n\n        // Send initial state upon connection\n        const stateToSend = engine.gameState.status === 'holding' ? engine.getHoldingState() : engine.gameState;\n        socket.emit('initial_state', stateToSend);\n\n        if (engine.gameState.status === 'active') {\n            socket.emit('templates', engine.getScenarioTemplates());\n            socket.emit('active_roles', engine.getActiveRoles());\n        }",
    `    io.on('connection', (socket) => {
        console.log(\`Client connected: \${socket.id}\`);

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
        });`
);

// We need to inject engine lookup to all existing socket handlers
const eventsToRewrite = [
    'open_lobby', 'start_scenario', 'end_scenario', 'register_role', 'leave_role',
    'kick_player', 'approve_player', 'reject_player', 'trigger_event', 'trigger_manual_action',
    'delete_scheduled_event', 'pause_scheduled_event', 'resume_scheduled_event',
    'force_trigger_scheduled', 'submit_decision', 'change_stage', 'dismiss_decision',
    'submit_scenario_summary', 'update_scores', 'reset_game', 'submit_ai_briefing',
    'request_ai_briefing', 'disconnect'
];

eventsToRewrite.forEach(evt => {
    let searchPattern = new RegExp(`socket\\.on\\('${evt}', \\((.*?)\\) => \\{`, 'g');

    // Disconnect is a special case
    if (evt === 'disconnect') {
         newContent = newContent.replace(
            `        socket.on('disconnect', () => {`,
            `        socket.on('disconnect', () => {
            const gameId = socket.data.gameId;
            const engine = gameId ? gameManager.getGame(gameId) : null;
            if (engine) {
                engine.updateActivity();
            }`
        );
        return;
    }

    newContent = newContent.replace(searchPattern, (match, args) => {
        return `${match}\n            const gameId = socket.data.gameId;\n            const engine = gameId ? gameManager.getGame(gameId) : null;\n            if (!engine) return;\n            engine.updateActivity();`;
    });
});

// Update io.emit to io.to(gameId).emit
newContent = newContent.replace(/io\.emit\(/g, "io.to(gameId).emit(");

// Fix disconnect logic
newContent = newContent.replace(
    `            if (engine) {\n                engine.updateActivity();\n            }\n            console.log(\`Client disconnected: \${socket.id}\`);\n            delete engine.connectedClients[socket.id];\n            if (engine.pendingPlayers[socket.id]) {\n                delete engine.pendingPlayers[socket.id];\n                io.to(gameId).emit('pending_players', engine.pendingPlayers);\n            }\n            io.to(gameId).emit('active_roles', engine.getActiveRoles());`,
    `            if (engine) {
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
            console.log(\`Client disconnected: \${socket.id}\`);`
);

// We need to fix io.emit('dashboard_data') that we manually added which should go to everyone
newContent = newContent.replace(/io\.to\(gameId\)\.emit\('dashboard_data'/g, "io.emit('dashboard_data'");

// The scheduler loop inside start_scenario also needs to use io.to(gameId)
newContent = newContent.replace(
    /engine\.startSchedulerLoop\(\(updatedState\) => \{\n                io\.to\(gameId\)\.emit\('state_update', updatedState\);\n            \}\);/g,
    `engine.startSchedulerLoop((updatedState) => {\n                io.to(gameId).emit('state_update', updatedState);\n            });`
);


fs.writeFileSync('src/socket.js', newContent);
console.log('Done');
