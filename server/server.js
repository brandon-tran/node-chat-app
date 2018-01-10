const path = require('path');
const http = require('http');

const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message');
const express = require('express');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
//app.use(bodyParser.json());
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined!'));

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
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
