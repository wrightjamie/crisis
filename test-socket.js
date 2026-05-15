const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('request_ai_briefing', 'defence');
    console.log('Emitted request_ai_briefing');
});

socket.on('generate_ai_briefing', (data) => {
    console.log('Received generate_ai_briefing:', data);
    process.exit(0);
});

setTimeout(() => {
    console.log('Timeout waiting for generate_ai_briefing');
    process.exit(1);
}, 2000);
