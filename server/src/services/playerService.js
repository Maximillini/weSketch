import { createPlayer, updatePlayer } from '../models/player.js'

const players = {}

export const createNewPlayer = (id, name, score) => {
  if (players[id])
    return console.log(
      `Player ${players[id]} already exists, skipping creation`
    )
  if (serializePlayers().length === 0) {
    players[id] = createPlayer(id, name, score, true)
    return players[id]
  }

  players[id] = createPlayer(id, name, score)
  return players[id]
}

export const getPlayerById = (id) => players[id]

export const getPlayers = () => players

export const serializePlayers = () => Object.values(players)

export const getRandomPlayer = () => {
  const playersArray = serializePlayers()
  const randomPlayer =
    playersArray[Math.floor(Math.random() * playersArray.length)]
  return randomPlayer
}

export const getCurrentHost = () => {
  return serializePlayers().find((player) => player.host)
}

export const removePlayerById = (id) => {
  delete players[id]
}

export const updateScore = (playerId, newScore) => {
  if (players[playerId]) {
    updatePlayer(players[playerId], { score: newScore })
  }
}

export const updatePlayerState = (playerId, newState) => {
  if (players[playerId]) {
    updatePlayer(players[playerId], newState)
  }
}
