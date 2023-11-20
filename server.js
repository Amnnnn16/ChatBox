const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/formatMsg");
const {userJoin,getCurrentUser,getRoomUsers,userLeave}=require("./utils/users");


const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("public"));
const bot = "Mr. ChatBox";
io.on("connection", (socket) =>
 {

  socket.on("joinRoom", ({ username, room }) =>
   {

    const user=userJoin(socket.id,username,room);
    socket.join(user.room);

    socket.emit("message", formatMessage(bot, `Welcome ${username} to ${room}`));

    //when a user enters a room
    socket.broadcast.to(user.room).emit(
      "message",
      formatMessage(bot, `${user.username} has joined the chat`)
    );

    //users in the room
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)

    });
  }) ;
  
//   console.log("New websocket connection");


  //when a user leaves a room
  socket.on("disconnect", () => {
    const user=userLeave(socket.id);

    if(user){
    io.to(user.room).emit("message", formatMessage(bot, `${user.username} has left the chat` ));
     //users in the room
     io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)

    });
    }
  });

  socket.on("chatMsg", (msg) => {

    const user=getCurrentUser(socket.id)
    // console.log(msg);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

});

const port = 3000 || process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
