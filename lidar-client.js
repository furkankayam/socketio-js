const io = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("lidar_data", (data) => {
  console.log(data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
