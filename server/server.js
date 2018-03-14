
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

const express = require('express');
//oldway
//console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));



io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.emit('welcomeMessage', (welcomeMessage) =>{
    console.log('welcomeMessage', welcomeMessage);
    io.emit ('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app'
    });
  });

  socket.broadcast.emit ('newMessage', {
       from: 'Admin',
       text: 'New User Joined!',
       createdAt: new Date().getTime()
  });

socket.on('createMessage', (message) => {
  console.log('createmessage', message);
  io.emit('newMessage', {
    from: message.from,
    text: message.text,
    createdAt: new Date().getTime()
  });
});

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
