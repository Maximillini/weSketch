import { v4 as uuidv4 } from 'uuid'

const createGame = (host) => {
  return {
  id: uuidv4(),
  host: host.id,
  gameState: {
    currentArtist: null,
    wordChoices: [],
    selectedWord: '',
    gameChatLog: [],
    generalChatLog: [],
    gameStarted: false,
  }
}}

const updateGameState = (game, newGameState) => ({
  ...game,
  gameState: {
    ...game.gameState,
    ...newGameState
  }
})

export { createGame, updateGameState }
