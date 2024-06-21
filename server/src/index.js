import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { gameController } from './controllers/gameController.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 4000
dotenv.config({ path: `.env.${NODE_ENV}` })

let allowedOrigins = ['http://localhost:5173', 'http://localhost:4000']

if (NODE_ENV === 'production') {
  allowedOrigins = ['https://wesketch.onrender.com']
}

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

const clientDistPath =
  NODE_ENV === 'production'
    ? path.join(__dirname, '../../client/dist')
    : path.join(__dirname, '../client')

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log({ env: NODE_ENV, initialEnv: process.env.NODE_ENV })
  console.log({ allowedOrigins })
  console.log('VITE_SOCKET_SERVER_URL', process.env.VITE_SOCKET_SERVER_URL)
  console.log(process.env)
})

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
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected!', socket.id)

  gameController(io, socket)
})
