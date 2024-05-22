// import { useEffect, useRef, useState } from 'react'
import { Canvas } from './Canvas'
import './styles.scss'

export const GamePage = () => {
  return (
    <div className="game-page">
      <h1>Game Room</h1>
      <Canvas />
    </div>
  )
}
