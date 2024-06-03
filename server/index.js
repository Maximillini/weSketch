import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import http from 'http'
import { Server } from 'socket.io'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
})

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, '../../client/dist')));

console.log(path.join(__dirname, '../../client/dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
});

const activeUsers = {}

io.on('connection', (socket) => {
  console.log('a user connected!', socket.id);

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('clear', () => {
    socket.broadcast.emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    handleLeaveChat(socket, io)
  });

  socket.on('leave chat', () => handleLeaveChat(socket, io));
  
  socket.on('register-user', (handleValue) => {
    console.log({ handleValue })
    
    if (normalizedUsersList().includes(handleValue.toLowerCase())) {
      return socket.emit('validation error', 'existing');
    }
    
    console.log(`${handleValue} has joined!`);
    
    activeUsers[socket.id] = handleValue;
    console.log({ activeUsers })
    // io.emit('register user', Object.values(activeUsers));
    io.emit('user-added', Object.values(activeUsers))
  });

  socket.on('chat message', (chatData) => {
    console.log({ chatData })
    console.log({ activeUsers })
    console.log(socket.id)

    if (chatData.chatType === 'general') return io.emit('general message', { userName: chatData.userName, message: chatData.message })
    
    console.log('this should be showing for game messages only')
    
    io.emit('game message', { userName: chatData.userName, message: chatData.message })
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const normalizedUsersList = () => Object.values(activeUsers).map((user) => user.toLowerCase()) ?? [];

const handleLeaveChat = (socket, io) => {
  if (!activeUsers[socket.id]) return;
  console.log(`${activeUsers[socket.id]} disconnected...`);
  const outboundUser = activeUsers[socket.id]; 
  delete activeUsers[socket.id];
  io.emit('leave chat', Object.values(activeUsers), outboundUser);
}
