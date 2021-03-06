var socket = io();

function scrollToBottom ()  {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  };
};
socket.on('connect', () => {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error!');
    };
  });

});

socket.on('disconnect', () => {
  console.log('disconnected for server');
});

socket.on('updateUserList', function (users){
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user){
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);

})

socket.on('newMessage', (message) => {

  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location');

  navigator.geolocation.getCurrentPosition(function(postion) {
      locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: postion.coords.latitude,
        longitude: postion.coords.longitude
      });

    },
    function() {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('unable to fetch location');
    });
});
