var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chatServer = require('./chat-server');


server.listen(80, () => {
    console.log("running...");
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

let guestNumber = 1;

function findRooms(io) {


    return availableRooms;
}

io.on('connection', function (socket) {
    guestNumber = chatServer.assginGuestName(socket, guestNumber);

    chatServer.joinRoom(io, socket, 'Lobby');

    chatServer.handleMessageBroadcasting(socket);

    chatServer.handleNameChangeAttemps(socket);

    chatServer.handleRoomJoining(io, socket);

    socket.on('rooms', function () {
        let availableRooms = [];
        let rooms = Object.keys(io.sockets.adapter.rooms);
        io.clients((error, clients) => {
            for (let i = 0; i < rooms.length; i++) {
                if (clients.indexOf(rooms[i]) === -1) {
                    availableRooms.push(rooms[i])
                }
            }
            socket.emit('rooms', availableRooms);
        });
    });

    chatServer.handleClientDisconnection(socket);
});