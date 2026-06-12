const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const GameEngine = require('./src/engine');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route to ensure server is running
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Clean route for facilitator
app.get('/facilitator', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'facilitator.html'));
});

const engine = new GameEngine();

const setupSockets = require('./src/socket');

// Setup sockets
setupSockets(io, engine);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
