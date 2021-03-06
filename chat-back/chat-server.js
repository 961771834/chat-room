
let currentRoom = {};
let nickNames = {};
let nameUsed = [];

function assginGuestName(socket,guestNumber){
  const name = 'Guest ' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult',{
    success:true,
    name
  });
  nameUsed.push(name);
  return guestNumber+1;
}

function joinRoom(io,socket,room){
  socket.join(room);
  currentRoom[socket.id] = room;
  socket.emit('joinResult',{room});
  socket.broadcast.to(room).emit('message',{
    text:nickNames[socket.id] + ' has joined   ' + room + '.'
  });

  io.to(room).clients((error, clients) => {
      if (error) throw error;
      let userInRoom = clients;
      let userInRoomSummary = 'Users currently in  ' + room + ':'
      if(userInRoom.length > 1){
          for(let index in userInRoom){
              const userSocketId = userInRoom[index];
              if(userSocketId != socket.id){
                  userInRoomSummary += nickNames[userSocketId] + ',';
              }
          }
      }

      userInRoomSummary += '.';
      socket.emit('message', { text: userInRoomSummary});
  });
  

}

function handleNameChangeAttemps(socket){
  socket.on('nameAttempt',function(name){
    if(name.indexOf('Guest') === 0){
      socket.emit('nameResult',{
        success:false,
        message:'Names cannot begin with "Guest".'
      })
    }else{
      if(nameUsed.indexOf(name) == -1){
        const previousName = nickNames[socket.id];
        const previousNameIndex = nameUsed.indexOf(previousName);
        nameUsed.push(name);
        nickNames[socket.id] = name;
        delete nameUsed[previousNameIndex];
        socket.emit('nameResult',{
          success:true,
          name:name
        });

        socket.broadcast.to(currentRoom[socket.id]).emit('message',{
          text:previousName + ' is now known as '+'name'+'.'
        })
      }else{
        socket.emit('nameResult',{
          success:false,
          message:'That name is already in use.'
        })
      }
    }
  })
}

function handleMessageBroadcasting(socket){
  socket.on('message',function(message){
    socket.broadcast.to(message.room).emit('message',{
      text:nickNames[socket.id] + ':' + message.text 
    })
  })
}

function handleRoomJoining(io,socket){
  socket.on('join',function(room){
      socket.leave(currentRoom[socket.id]);
      joinRoom(io, socket, room.newRoom);
  })
}


function handleClientDisconnection(socket){
  socket.on('disconnect',function(){
    const nameIndex = nameUsed.indexOf(nickNames[socket.id]);

    delete nameUsed[nameIndex];

    delete nickNames[socket.id];
  })
}



module.exports = {
  handleNameChangeAttemps,
  handleMessageBroadcasting,
  handleRoomJoining,
  assginGuestName,
  joinRoom,
  handleClientDisconnection
}