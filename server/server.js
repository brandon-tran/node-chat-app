const path = require('path');
const http = require('http');

const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
//app.use(bodyParser.json());
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', { // ONLY USER
    from: 'Admin',
    text: 'Welcome to the chat room!'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined the chat room!'
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });


  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', { // ALL USERS
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })

    // socket.broadcast.emit('newMessage', { //all can see except creator
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });


});



app.use(express.static(publicPath));




server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
