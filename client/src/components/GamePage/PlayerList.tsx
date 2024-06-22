import { Player } from '@/types/gameTypes'
import { useEffect } from 'react'

type PlayerListProps = {
  playerList: Player[]
  currentArtist: Player | null
}

export const PlayerList = ({ playerList, currentArtist }: PlayerListProps) => {
  // TODO - account for when all players have 0 points
  const topScore = Math.max(...playerList.map((player) => player.score))

  // TODO - update player list order by score
  useEffect(() => {}, [topScore])

  return (
    <div className="player-list">
      <div className="player-count">Users ({playerList.length})</div>
      <ul>
        {playerList.map((player) => (
          <li
            className={`player-item ${player.host ? 'host' : ''} ${
              currentArtist?.id === player.id ? 'artist' : ''
            }`}
            key={player.id}
          >
            {player.name}
            <span className="player-score" key={player.id}>
              {player.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
