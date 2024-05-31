type PlayerListProps = {
  playerList: {
    userName: string,
    score: number
  }[]
}

export const PlayerList = ({ playerList }: PlayerListProps) => {
  return (
  <div className="player-list">
    <div className="player-count">Users ({playerList.length})</div>
    <ul>
      {playerList.map((player) => (
        <li className="player-item">{player.userName}<span className="player-score">{player.score}</span></li>
      ))}
    </ul>
  </div>
  )
}
