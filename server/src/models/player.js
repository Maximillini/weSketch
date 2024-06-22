export const createPlayer = (id, name, score = 0, host = false) => ({
  id,
  name,
  score,
  host,
})

export const updatePlayer = (player, newState) => ({
  ...player,
  ...newState,
})
