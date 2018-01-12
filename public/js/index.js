var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  var a = $('<a target="_blank">My current Location</a>')
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'anon',
    text: jQuery('[name=message]').val()
  }, function () {
    //console.log('l');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  //console.log('hey');
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by browser.')
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Can not fetch location');
  });
});
