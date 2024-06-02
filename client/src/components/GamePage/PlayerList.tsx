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
        <li className="player-item" key={player.userName}>{player.userName}<span className="player-score" key={player.userName}>{player.score}</span></li>
      ))}
    </ul>
  </div>
  )
}
