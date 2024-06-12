import { create } from 'zustand'
import { Socket, io } from 'socket.io-client'

type SocketState = {
  socket: null | Socket
  initializeSocket: () => void
}

export const useSocketStore = create<SocketState>((set) => {
  let socket: Socket

  const initializeSocket = () => {
    const socketServerUrl =
      import.meta.env.VITE_SOCKET_SERVER_URL ?? 'http://localhost:4000'

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
