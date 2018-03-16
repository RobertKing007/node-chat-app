var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

});

socket.on('disconnect', () => {
  console.log('disconnected for server');
});

socket.on('newMessage', (message) => {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  console.log('new message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formatedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from} ${formatedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);


});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

var messageTextbox =   jQuery('[name=message]');


  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
  messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation){
    return alert('geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location');

  navigator.geolocation.getCurrentPosition(function(postion){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude: postion.coords.latitude,
      longitude: postion.coords.longitude
    });

  },
  function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('unable to fetch location');
  });
});
