import express from "express";
import http from "http";

const app=express();
const port=3000 || process.env.PORT;
const server=http.createServer(app);
app.use(express.static("public"));

server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})