const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// List of random names
const names = [
  "Player1", "ShadowHunter", "PixelWarrior", "DragonSlayer", "GhostRider",
  "CyberKnight", "SkyFury", "BlazeMaster", "StormBringer", "RogueStar"
];

// List of 30+ game prompts
const actions = [
  "collected a health pack", "joined the battle", "defeated an enemy", 
  "captured a flag", "completed a mission", "unlocked an achievement",
  "picked up a power-up", "revived a teammate", "dodged an attack", 
  "launched a special move", "left the game", "created an online room", 
  "scored a critical hit", "crafted an item", "found a rare treasure", 
  "upgraded their weapon", "engaged in PvP combat", "healed a teammate",
  "set a trap", "avoided a critical hit", "started a quest", "rescued a player", 
  "captured a territory", "discovered a secret area", "earned bonus XP", 
  "challenged another player to a duel", "achieved a high score", "joined a guild", 
  "defeated a boss", "earned a new title"
];

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to get a random name
const getRandomName = () => names[Math.floor(Math.random() * names.length)];

// Function to get a random action
const getRandomAction = () => actions[Math.floor(Math.random() * actions.length)];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Set the interval to a very fast pace (100 milliseconds)
  setInterval(() => {
    const randomName = getRandomName(); // Generate a random name
    const randomAction = getRandomAction(); // Generate a random action
    const logEntry = `Log: ${randomName} ${randomAction} at ${new Date().toISOString()}`;
    socket.emit('log', logEntry); // Emit the log to connected clients
  }, 100); // Fast-paced interval: 100 milliseconds
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
