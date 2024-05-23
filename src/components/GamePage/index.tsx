// import { useEffect, useRef, useState } from 'react'
import { Canvas } from './Canvas'
import './styles.scss'

export const GamePage = () => {
  return (
    <div className="game-page">
      <div className="flex-container">
        <div className="flex-container chat-container">
          <div className="player-list">Player List</div>
          <div className="game-chat">Game Chat</div>
          <div className="general-chat">General Chat</div>
        </div>
        <Canvas />
      </div>
    </div>
  )
}
