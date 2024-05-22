import { useState } from 'react'
import './App.css'

function App() {
  const [playerHandle, setPlayerHandle] = useState<string>('')

  const handleNameSubmit = (value: string) => {

    setPlayerHandle(value)
    console.log({ value })
  }

  return (
    <>
      <h1>Welcome to weSketch! {playerHandle}</h1>
    </>
  )
}

export default App
