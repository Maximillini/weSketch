import { create } from 'zustand'
import { Socket, io } from 'socket.io-client'

type SocketState = {
  socket: null | Socket
  initializeSocket: () => void
}

export const useSocketStore = create<SocketState>((set) => {
  let socket: Socket

  console.log(import.meta.env)

  const initializeSocket = () => {
    console.log('viteSocketServerUrl:', import.meta.env.VITE_SOCKET_SERVER_URL)
    const socketServerUrl =
      import.meta.env.MODE === 'production' ? 'https://wesketch.onrender.com' : 'http://localhost:4000'

    console.log({ socketServerUrl })

    socket = io(socketServerUrl)
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })
    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })
    set({ socket })
  }

  return {
    socket: null,
    initializeSocket,
  }
})
