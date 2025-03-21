const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // For handling file paths

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');
  setInterval(() => {
    const logEntry = `Log: Player XYZ performed action at ${new Date().toISOString()}`;
    socket.emit('log', logEntry);
  }, 2000); // Sends a log every 2 seconds
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
