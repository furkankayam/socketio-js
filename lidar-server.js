// Import required modules
const http = require("http");
const socketio = require("socket.io");

// Create a basic HTTP server
const server = http.createServer();

// Attach Socket.IO to the HTTP server
const io = socketio(server);

// Event handler for Socket.IO connections
io.on("connection", (socket) => {
  console.log("A client connected.");

  scan_data = [];

  scan_data.push({ distance: 60, angle: 45 });
  scan_data.push({ distance: 50, angle: 10 });
  scan_data.push({ distance: 70, angle: 70 });

  const scan_data_json = JSON.stringify(scan_data);

  function sendHelloWorld() {
    socket.emit("lidar_data", scan_data_json);
  }

  const interval = setInterval(sendHelloWorld, 1500);

  // Event handler for disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected.");
    clearInterval(interval); // Clear the interval when client disconnects
  });
});

// Start the server and listen on port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
