// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Handle drawing events
  socket.on('draw', (data) => {
    io.emit('draw', data); // Broadcast the drawing data to all clients
  });

  // Handle clear event
  socket.on('clear', () => {
    io.emit('clear'); // Broadcast the clear event to all clients
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
