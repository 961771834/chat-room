var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chatServer =require('./chat-server');


server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

let guestNumber = 1;

io.on('connection', function (socket) {
  guestNumber = chatServer.assginGuestName(socket,guestNumber);

  chatServer.joinRoom(io,socket,'Lobby');

  chatServer.handleMessageBroadcasting(socket);

  chatServer.handleNameChangeAttemps(socket);

  chatServer.handleRoomJoining(io,socket);

  socket.on('rooms',function(){
    socket.emit('rooms',io.sockets.manager.rooms);
  });

  chatServer.handleClientDisconnection(socket);
});