import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 4000

let allowedOrigins = ['http://localhost:5173', 'http://localhost:4000']

if (NODE_ENV === 'production') {
  allowedOrigins = ['https://wesketch.onrender.com', 'http://localhost:4000']
}

console.log({ env: NODE_ENV, initialEnv: process.env.NODE_ENV })
console.log({ allowedOrigins })

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

const clientDistPath = path.join(__dirname, '../../src/client/dist')

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

// Serve static files from the "dist" directory
app.use(
  express.static(clientDistPath, {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript')
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css')
      }
    },
  })
)

app.get('*', (req, res) => {
  res.sendFile(clientDistPath, 'index.html')
})

const activeUsers = {}
const chatMessages = []

io.on('connection', (socket) => {
  console.log('a user connected!', socket.id)

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data)
  })

  socket.on('clear', () => {
    socket.broadcast.emit('clear')
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    handleLeaveChat(socket, io)
  })

  socket.on('leave chat', () => handleLeaveChat(socket, io))

  socket.on('register-user', (handleValue) => {
    console.log({ handleValue })

    if (normalizedUsersList().includes(handleValue.toLowerCase())) {
      return socket.emit('validation error', 'existing')
    }

    console.log(`${handleValue} has joined!`)

    activeUsers[socket.id] = handleValue
    console.log({ activeUsers })
    // io.emit('register user', Object.values(activeUsers));
    io.emit('user-added', Object.values(activeUsers))
  })

  socket.on('chat message', (chatData) => {
    console.log({ chatData })
    console.log({ activeUsers })
    console.log(socket.id)

    if (chatData.chatType === 'general')
      return io.emit('general message', {
        userName: chatData.userName,
        message: chatData.message,
      })

    console.log('this should be showing for game messages only')

    io.emit('game message', {
      userName: chatData.userName,
      message: chatData.message,
    })
  })
})

const normalizedUsersList = () =>
  Object.values(activeUsers).map((user) => user.toLowerCase()) ?? []

const handleLeaveChat = (socket, io) => {
  if (!activeUsers[socket.id]) return
  console.log(`${activeUsers[socket.id]} disconnected...`)
  const outboundUser = activeUsers[socket.id]
  delete activeUsers[socket.id]
  io.emit('leave chat', Object.values(activeUsers), outboundUser)
}
