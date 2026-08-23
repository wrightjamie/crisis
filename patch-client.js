const fs = require('fs');

let content = fs.readFileSync('public/js/client.js', 'utf8');

// Add gameId tracking at top
content = content.replace(
    'let previousAvailableActions = [];',
    `let previousAvailableActions = [];\nlet gameId = new URLSearchParams(window.location.search).get('game');`
);

// Add DOM elements
content = content.replace(
    'const endgameScreen = document.getElementById(\'endgame-screen\');',
    `const endgameScreen = document.getElementById('endgame-screen');\nconst joinGameScreen = document.getElementById('join-game-screen');\nconst gamePausedScreen = document.getElementById('game-paused-screen');\nconst joinGameIdInput = document.getElementById('join-game-id');\nconst btnJoinGame = document.getElementById('btn-join-game');\nconst joinError = document.getElementById('join-error');`
);

// Include join and pause screens in cancel loop
content = content.replace(
    '[holdingScreen, roleSelectionScreen, pendingApprovalScreen, briefingScreen, endgameScreen].forEach',
    `[holdingScreen, roleSelectionScreen, pendingApprovalScreen, briefingScreen, endgameScreen, joinGameScreen, gamePausedScreen].forEach`
);

// Add initialization logic
content = content.replace(
    'socket.on(\'active_roles\', (roles) => {',
    `// Setup Connection
if (gameId) {
    socket.emit('join_game', gameId);
} else {
    switchView('join_game');
}

if (btnJoinGame) {
    btnJoinGame.addEventListener('click', () => {
        const id = joinGameIdInput.value.trim().toLowerCase();
        if (id.length > 0) {
            joinError.style.display = 'none';
            socket.emit('join_game', id);
        }
    });
}

socket.on('game_joined', (joinedId) => {
    gameId = joinedId;
    window.history.replaceState({}, '', \`?game=\${joinedId}\`);
    if (localState) {
        handleStateUpdate(localState);
    }
});

socket.on('game_not_found', () => {
    if (joinError) {
        joinError.textContent = 'Game not found.';
        joinError.style.display = 'block';
    }
});

socket.on('active_roles', (roles) => {`
);

// Add initial_state handler updates
content = content.replace(
    `socket.on('initial_state', (state) => {
    localState = state;
    if (state.status === 'holding') {
        handleHoldingState();
    } else if (state.status === 'lobby') {
        handleLobbyState();
    } else {
        handleActiveState();
    }
});`,
    `socket.on('initial_state', (state) => {
    localState = state;
    if (!gameId) return; // Wait for join_game
    handleStateUpdate(state);
});

function handleStateUpdate(state) {
    if (state.isPaused) {
        switchView('game_paused');
        return;
    }

    if (state.status === 'holding') {
        handleHoldingState();
    } else if (state.status === 'lobby') {
        handleLobbyState();
    } else {
        handleActiveState();
    }
}`
);


// Update state_update handler
content = content.replace(
    `socket.on('state_update', (state) => {
    const statusChanged = (!localState || localState.status !== state.status);
    localState = state;

    if (state.status === 'holding') {
        handleHoldingState();
    } else if (state.status === 'lobby') {
        handleLobbyState();
    } else if (state.status === 'ended') {
        handleEndedState(state);
    } else {
        handleActiveState();
    }

    if (statusChanged && state.status === 'active' && role) {
        if (sessionStorage.getItem('crisis_view_state') === 'map') {
            switchView('map');
        } else if (state.scenarioConfig && state.scenarioConfig.briefings) {
            showBriefing();
        } else {
            switchView('map');
        }
    }
});`,
    `socket.on('state_update', (state) => {
    const statusChanged = (!localState || localState.status !== state.status);
    const pauseChanged = (!localState || localState.isPaused !== state.isPaused);
    localState = state;

    handleStateUpdate(state);

    if (!state.isPaused && (statusChanged || pauseChanged) && state.status === 'active' && role) {
        if (sessionStorage.getItem('crisis_view_state') === 'map') {
            switchView('map');
        } else if (state.scenarioConfig && state.scenarioConfig.briefings) {
            showBriefing();
        } else {
            switchView('map');
        }
    }
});`
);


// Update switchView
content = content.replace(
    `    // Hide all
    if (roleSelectionScreen.open) roleSelectionScreen.close();
    if (holdingScreen.open) holdingScreen.close();
    if (pendingApprovalScreen && pendingApprovalScreen.open) pendingApprovalScreen.close();
    if (briefingScreen.open) briefingScreen.close();
    if (endgameScreen && endgameScreen.open) endgameScreen.close();
    appEl.style.display = 'none';

    // Show requested
    switch (viewName) {
        case 'role_selection':
            if (!roleSelectionScreen.open) roleSelectionScreen.showModal();`,
    `    // Hide all
    if (roleSelectionScreen.open) roleSelectionScreen.close();
    if (holdingScreen.open) holdingScreen.close();
    if (pendingApprovalScreen && pendingApprovalScreen.open) pendingApprovalScreen.close();
    if (briefingScreen.open) briefingScreen.close();
    if (endgameScreen && endgameScreen.open) endgameScreen.close();
    if (joinGameScreen && joinGameScreen.open) joinGameScreen.close();
    if (gamePausedScreen && gamePausedScreen.open) gamePausedScreen.close();
    appEl.style.display = 'none';

    // Show requested
    switch (viewName) {
        case 'join_game':
            if (joinGameScreen && !joinGameScreen.open) joinGameScreen.showModal();
            break;
        case 'game_paused':
            if (gamePausedScreen && !gamePausedScreen.open) gamePausedScreen.showModal();
            break;
        case 'role_selection':
            if (!roleSelectionScreen.open) roleSelectionScreen.showModal();`
);

fs.writeFileSync('public/js/client.js', content);
