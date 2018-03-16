const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
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

  socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

socket.on('createMessage', (message, callback) => {
  console.log('createmessage', message);
  io.emit('newMessage', generateMessage(message.from, message.text));
  callback('this is from the server');
});

socket.on('createLocationMessage', (coords) =>  {
  io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
});

socket.on('disconnect', () => {
console.log('Client disconnected');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
