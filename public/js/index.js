var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

});

socket.on('disconnect',  ()  => {
  console.log('disconnected for server');
});

socket.on('newMessage',  (message)  => {
  console.log('new message', message);
});
