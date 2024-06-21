import { createPlayer, updatePlayerScore } from '../models/player.js';

const players = {}

const createNewPlayer = (id, name, score) => {
  if (players[id]) return console.log(`Player ${players[id]} already exists, skipping creation`)
  players[id] = createPlayer(id, name, score)
  return players[id]
}

const getPlayerById = (id) => players[id]

const getPlayers = () => players

const removePlayerById = (id) => {
  delete players[id]
}

const updateScore = (playerId, newScore) => {
  if (players[playerId]) {
    updatePlayerScore(players[playerId], newScore)
  }
}

export { createNewPlayer, getPlayerById, getPlayers, removePlayerById }
