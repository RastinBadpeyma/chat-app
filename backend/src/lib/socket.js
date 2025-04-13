import http from "http";
import express from "express";
import {Server} from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server , {
   cors: {
      origin: ["http://localhost:5173"]
   }
});

const userSocket = {};


io.on("connection" , (socket) => {
 console.log("A user connected" , socket.id);

 const userId = socket.handshake.query.userId;
 if (userId) userSocket[userId] = socket.id

  io.emit("getOnlineUsers" , Object.keys(userSocket));

 socket.on("disconnect" , () => {
   console.log("A user disconnect" , socket.id);
   delete userSocket[userId];
   io.emit("getOnlineUsers" , Object.keys(userSocket));
});
})

export {io , app , server};