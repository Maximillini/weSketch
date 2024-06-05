import { create } from 'zustand'
import { Socket, io } from 'socket.io-client'

type SocketState = {
  socket: null | Socket
  initializeSocket: () => void
}

export const useSocketStore = create<SocketState>((set) => {
  let socket: Socket

  const initializeSocket = () => {
    socket = io('http://localhost:4000') // Adjust to your server URL
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
