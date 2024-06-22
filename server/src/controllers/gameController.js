import {
  createNewGame,
  addGeneralChat,
  addGameChat,
  getCurrentGame,
  leaveGame,
  updateGame,
  getGameChatLog,
  getGeneralChatLog,
  resetGame,
  currentPlayersToArray,
  startGame,
} from '../services/gameService.js'
import {
  createNewPlayer,
  getPlayerById,
  getPlayers,
  getRandomPlayer,
  removePlayerById,
} from '../services/playerService.js'

export const gameController = (io, socket) => {
  const handleChatMessage = (message, eventName, callbackFn) => {
    const player = getPlayerById(socket.id)

    if (player) {
      io.to(getCurrentGame().id).emit(eventName, {
        userName: player.name,
        message,
      })
      callbackFn(player, message)
    } else {
      console.error('Player does not exist! How did you get here??')
    }
  }

  socket.on('createOrJoinGame', (name, callbackFn) => {
    const playerId = socket.id

    let gameId = getCurrentGame()?.id
    // if there's no game, create a player and a game
    if (!gameId) {
      const player = createNewPlayer(playerId, name)
      gameId = createNewGame(player)
      socket.emit('gameCreated', gameId, playerId)
    }

    if (!getPlayerById(playerId)) createNewPlayer(playerId, name)

    socket.join(gameId)
    io.emit('joinGame', currentPlayersToArray())
    // callbackFn(gameId, playerId)
  })

  socket.on('startRound', () => {
    if (!getCurrentGame().gameState.gameStarted) {
      startGame()
    }

    const nextArtist = getRandomPlayer()
    const message = `Next artist: ${nextArtist.name}`

    updateGame({
      currentArtist: nextArtist,
      round: getCurrentGame().gameState.round + 1,
    })

    socket.emit('gameChatLogUpdate', {
      userName: 'admin',
      message,
    })

    addGameChat({ message })
    io.emit('updateGame', getCurrentGame())
  })

  socket.on('startTimer', (seconds) => {
    updateGame({ countdownTimer: seconds })
  })

  socket.on('wordSelected', (word) => {
    updateGame({ selectedWord: word })
    io.to(socket.id).emit('selectedWordUpdate', word)
  })

  socket.on('gameChatMessage', (message) => {
    handleChatMessage(message, 'gameChatLogUpdate', addGameChat)
  })

  socket.on('generalChatMessage', (message) => {
    handleChatMessage(message, 'generalChatLogUpdate', addGeneralChat)
  })

  socket.on('globalMessage', (message) => {
    socket.emit('gameChatLogUpdate', { userName: 'admin', message })
    addGameChat({ message })
  })

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data)
  })

  socket.on('clearCanvas', () => {
    socket.broadcast.emit('clear')
  })

  socket.on('debug', () => {
    const game = getCurrentGame()
    console.log({ game })
    console.log({ players: getCurrentPlayers() })
    console.log({
      gameChats: getGameChatLog(),
      generalChats: getGeneralChatLog(),
    })
  })

  socket.on('disconnect', () => {
    console.log(`Player ${socket.id} disconnected`)
    removePlayerById(socket.id)
    const players = getPlayers()
    updateGame({ players })
    leaveGame(socket.id)
    io.emit('leave game', players)
    if (players.length === 0) resetGame()
  })
}
