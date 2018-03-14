
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

//date format
var dt = new Date();
var utcDate = dt.toUTCString();
//

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.emit('newMessage', {
    from: 'Test dummby 1',
    text: 'test dummby say hi',
    createdAt: utcDate
  });


socket.on('createMessage', (newMessage) => {
  console.log('createmessage', newMessage);
});
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
