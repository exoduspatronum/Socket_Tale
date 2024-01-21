const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const app = express();
const port = process.env.PORT || 3002;

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

server.listen(port, () => {
  console.log("SERVER IS RUNNING ");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data.EncrytionString);
  });
  socket.on("message_sent", (data) => {
    console.log("encytion", data);
    socket.to(data.EncrytionString).emit("recieve_message", data);
  });
});
