const http=require("http");
const express=require("express");
const socketio=require("socket.io");
const formatMessage=require("./utils/formatMsg")

const app=express();

const server=http.createServer(app);
const io=socketio(server);

app.use(express.static("public"));
const bot="Mr. ChatBox";
io.on("connection", (socket)=>{
    console.log("New websocket connection");

    socket.emit('message',formatMessage(bot,'welcome to chatboxxx'));

    //when a user enters a room
    socket.broadcast.emit('message',formatMessage(bot,'A user has joined the chat'));

    //when a user leaves a room
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(bot,'A user has left the chat'));
    })

    socket.on('chatMsg',(msg)=>{
        // console.log(msg);
        io.emit('message',formatMessage("USER",msg));
    }) 
})


const port=3000 || process.env.PORT;
server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})