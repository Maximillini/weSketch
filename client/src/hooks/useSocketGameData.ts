import { useEffect } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { useSocketStore } from '@/stores/socketStore'
import { GameState } from '@/types/gameTypes'

export const useSocketGameData = () => {
  const game = useGameStore((state) => state)
  const socket = useSocketStore((state) => state.socket)

  useEffect(() => {
    console.log({ game })
    if (!socket) return

    socket.on('gameChatLogUpdate', (chat) => game.addChat(chat, 'gameChatLog'))

    socket.on('generalChatLogUpdate', (chat) =>
      game.addChat(chat, 'generalChatLog')
    )

    socket.on('joinGame', (players) => {
      const updatedPlayers = [...game.playerList, ...players]

      socket.emit(
        'globalMessage',
        `${players[players.length - 1].name} has joined the game`
      )

      if (players.length < 2) {
        socket.emit(
          'globalMessage',
          'Game will begin when another player joins'
        )
      }

      if (players.length >= 2 && !game.gameState.gameStarted) {
        socket.emit('globalMessage', 'Game will begin in 10 seconds')
        socket.emit('startGame')
      }

      debugger
      game.setPlayerList(updatedPlayers)
    })

    socket.on('updateGame', (updatedGameState: Partial<GameState>) => {
      console.log({ updatedGameState })

      game.setGameState(updatedGameState)
      return
    })

    socket.on('leave game', (updatedPlayers, leavingPlayer) => {
      socket.emit('globalMessage', `${leavingPlayer} has left the game`)
      game.setPlayerList(updatedPlayers)
    })
  }, [socket])

  return { socket, game }
}
