const express = require('express');
const app = express();

const http = require('http');
const server=http.createServer(app);

const {Server} =require('socket.io');
const io=new Server(server);
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

io.on('connection',(socket)=>{
  console.log('a user connected');

  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });
});

socket.on('chat message',(msg)=>{
  io.emit('chat message',msg);
});         

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});             