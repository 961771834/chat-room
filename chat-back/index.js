var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chatServer =require('./chat-server');


server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

let guestNumber = 1;
let currentRoom = {};
let nickNames = {};
let nameUsed = {};

io.on('connection', function (socket) {
  
  guestNumber = chatServer.assginGuestName(socket.guestNumber,nickNames,nameUsed);

  chatServer.joinRoom(io,socket,'Lobby');

  chatServer.handleMessageBroadcasting(socket,nickNames);

  chatServer.handleNameChangeAttemps(socket,nickNames,nameUsed,currentRoom);

  chatServer.handleRoomJoining(io,socket,currentRoom);

  socket.on('rooms',function(){
    socket.emit('rooms',io.sockets.manager.rooms);
  });

  chatServer.handleClientDisconnection(socket,nameUsed,nickNames);
});