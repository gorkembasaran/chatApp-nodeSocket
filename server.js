const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());

let messages = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('chatHistory', messages);

  socket.on('sendMessage', (message) => {
    messages.push(message);
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3131;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
