const fs = require('fs');

let content = fs.readFileSync('public/js/facilitator.js', 'utf8');

content = content.replace(
    'const socket = io();',
    `const socket = io();
let gameId = new URLSearchParams(window.location.search).get('game');`
);

content = content.replace(
    `document.addEventListener('DOMContentLoaded', () => {`,
    `document.addEventListener('DOMContentLoaded', () => {
    // Dashboard Logic
    const dashboardView = document.getElementById('dashboard-view');
    const facilitatorView = document.getElementById('facilitator-view');

    if (gameId) {
        dashboardView.style.display = 'none';
        facilitatorView.style.display = 'block';
        document.getElementById('fac-game-id-display').textContent = gameId;
        socket.emit('join_game', gameId);

        socket.emit('register_role', 'facilitator');
    } else {
        dashboardView.style.display = 'block';
        facilitatorView.style.display = 'none';
        socket.emit('request_dashboard_data');
    }

    const btnCreateGame = document.getElementById('btn-create-game');
    if (btnCreateGame) {
        btnCreateGame.addEventListener('click', () => {
            const id = document.getElementById('new-game-id').value.trim().toLowerCase();
            const name = document.getElementById('new-game-name').value.trim();
            if (id.length > 0 && name.length > 0) {
                document.getElementById('create-error').style.display = 'none';
                socket.emit('create_game', { gameId: id, name });
            } else {
                document.getElementById('create-error').textContent = 'Please enter both ID and Name';
                document.getElementById('create-error').style.display = 'block';
            }
        });
    }

    socket.on('game_created', (newId) => {
        window.location.href = \`?game=\${newId}\`;
    });

    socket.on('dashboard_error', (msg) => {
        if (document.getElementById('create-error')) {
            document.getElementById('create-error').textContent = msg;
            document.getElementById('create-error').style.display = 'block';
        }
    });

    socket.on('dashboard_data', (games) => {
        if (gameId) return; // Ignore if in a game

        const activeList = document.getElementById('games-list');
        const deadList = document.getElementById('dead-games-list');
        if (!activeList || !deadList) return;

        activeList.innerHTML = '';
        deadList.innerHTML = '';

        const now = Date.now();
        const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

        games.forEach(g => {
            const isDead = (now - g.lastActivity) > ONE_WEEK_MS;
            const card = document.createElement('div');
            card.className = 'admin-card';

            const stateText = g.status === 'holding' ? 'Lobby/Holding' : 'Active Scenario';
            const facBadge = g.hasFacilitator ? '<span class="badge bg-status-1 text-black">Facilitator Online</span>' : '<span class="badge bg-accent-orange text-black">Facilitator Offline</span>';
            const dateStr = new Date(g.lastActivity).toLocaleDateString();

            card.innerHTML = \`
                <h3 class="card-title">\${g.name} (ID: \${g.id.toUpperCase()})</h3>
                <p class="text-sm text-secondary mb-1">Status: \${stateText}<br>Last Active: \${dateStr}</p>
                <div class="mb-1">\${facBadge}</div>
                <div class="flex-column gap-05">
                    <button class="btn btn-primary w-100" onclick="window.location.href='?game=\${g.id}'">Join Game</button>
                    \${isDead ? \`<button class="btn btn-secondary w-100 text-red" onclick="deleteGame('\${g.id}')">Delete Game</button>\` : ''}
                </div>
            \`;

            if (isDead) {
                deadList.appendChild(card);
            } else {
                activeList.appendChild(card);
            }
        });

        if (activeList.children.length === 0) activeList.innerHTML = '<p class="text-muted p-1">No active games.</p>';
        if (deadList.children.length === 0) deadList.innerHTML = '<p class="text-muted p-1">No dead games.</p>';
    });

    window.deleteGame = function(id) {
        if (confirm(\`Are you sure you want to permanently delete game \${id}?\`)) {
            socket.emit('delete_game', id);
        }
    };
`
);


fs.writeFileSync('public/js/facilitator.js', content);
