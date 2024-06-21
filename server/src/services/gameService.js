import { createGame, updateGameState } from '../models/game.js'
import { getPlayers, removePlayerById } from '../services/playerService.js'

let currentGame = null

export const createNewGame = (host) => {
  if (currentGame) return console.log('game already started', { currentGame })
  
  currentGame = createGame(host)
  return currentGame.id
}

export const startGame = () => {
  if (!currentGame || currentGame.gameState.gameStarted) return

  updateGame({ gameStarted: true })
}

export const getGameChatLog = () => currentGame.gameState.gameChatLog
export const getGeneralChatLog = () => currentGame.gameState.generalChatLog

export const getCurrentGame = () => currentGame

export const currentPlayersToArray = () => Object.values(getPlayers())

export const updateGame = (newGameState) => {
  if (currentGame) {
    currentGame = updateGameState(currentGame, newGameState)
  }
}

export const addGeneralChat = (player, message) => {
  const chats = getGeneralChatLog()
  const chat = { id: player.id, userName: player.name, message }

  updateGame({ generalChatLog: [...chats, chat] })
}

export const addGameChat = (player, message, admin) => {
  const chats = getGameChatLog()
  let chat
  if (player.name === 'admin') {
    chat = { id: 'admin', userName: 'admin', message }
  } else {
    chat = { ...player, message }
  }

  updateGame({ gameChatLog: [...chats, chat] })
}

export const leaveGame = (playerId) => {
  if (currentGame) {
    currentGame = removePlayerById(currentGame, playerId)
  }

  if (getPlayers().length === 0) resetGame()
}

export const resetGame = () => currentGame = null

