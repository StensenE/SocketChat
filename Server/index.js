const express = require("express");
const app = express();
const server = require("http").createServer(app);
const Chance = require("chance");

const io = require("socket.io").listen(server);
const port = 8080;
const chance = new Chance();

io.on("connection", socket => {
  let username = chance.name();
  io.emit("UserConnected", username);
  socket.emit("AssignUsername", username);
  socket.on("MessageSent", message => {
    console.log(message);
    io.emit("MessageReceived", message);
  })
});

server.listen(port, () => {
  console.log("server running on port:" + port);
  console.log(`http:localhost:${port}`);
});
