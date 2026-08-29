require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const GameEngine = require('./src/engine');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory, allowing extensionless URLs
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// Serve static scenario files (images, acronyms, wikis)
app.use('/scenarios', express.static(path.join(__dirname, 'data/scenarios')));

// Basic route to ensure server is running
app.get('/ping', (req, res) => {
    res.send('pong');
});

const engine = new GameEngine();

const setupSockets = require('./src/socket');

// Setup sockets
setupSockets(io, engine);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
