const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'template')));

app.get('/chat/:room', (req, res) => {
  res.sendFile(path.join(__dirname, 'template', 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room);
    socket.on('chat-message', (msg) => {
      io.to(room).emit('chat-message', msg);
    });
  });
});

http.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
