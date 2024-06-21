export const createPlayer = (id, name, score=0) => ({
  id,
  name,
  score
})

export const updatePlayerScore = (player, newScore) => ({
  ...player,
  score: newScore
})
