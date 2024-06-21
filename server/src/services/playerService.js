import { createPlayer } from '../models/player.js';

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

export { createNewPlayer, getPlayerById, getPlayers, removePlayerById }
