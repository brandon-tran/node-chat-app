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
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.emit('newMessage', {
    from: "jesus",
    text: "hi, friend",
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });


});



app.use(express.static(publicPath));




server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
