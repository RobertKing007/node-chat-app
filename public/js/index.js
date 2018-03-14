var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'dummby test 2',
    text: 'responding to dummby test 1'
  });
});

socket.on('disconnect',  ()  => {
  console.log('disconnected for server');
});

socket.on('newMessage',  (message)  => {
  console.log('new message', message);
});
