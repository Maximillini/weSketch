// import { useEffect, useRef, useState } from 'react'
import { Canvas } from './Canvas'
import './styles.scss'

export const GamePage = () => {
  return (
    <div className="game-page">
      <div className="flex-container">
        <div className="game-chat-container">
          Game Chat
        </div>
        <Canvas />
      </div>
      <div className="flex-container">
        <div className="general-chat">General Chat</div>
      </div>
    </div>
  )
}
