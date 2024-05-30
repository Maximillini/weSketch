import { useState } from 'react'
import { GamePage } from './components/GamePage/index';
import './App.css'

function App() {
  const [playerHandle, setPlayerHandle] = useState<string>('')

  const handleNameSubmit = (value: string) => {

    setPlayerHandle(value)
    console.log({ value })
  }

  return (
    <div className="app-container">
      {/* <h1>Welcome to weSketch! {playerHandle}</h1> */}
      <GamePage />
    </div>
  )
}

export default App
