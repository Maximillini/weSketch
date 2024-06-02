import { ChangeEvent, useState } from "react"
import { usePlayerStore } from "../../stores/playerStore"
import { io } from 'socket.io-client'
import { useGameStore } from "../../stores/gameStore"

const socket = io('http://localhost:4000')
socket.connect()

export const LoginPage = () => {
  const addPlayer = useGameStore((state) => state.addPlayer)
  const setHandle = usePlayerStore((state) => state.setHandle)
  const [handleValue, setHandleValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHandleValue(e.target.value)
  }

  const handleSubmit = () => {
    setHandle(handleValue)
    addPlayer({ userName: handleValue, score: 0 })
    socket.emit('register-user', handleValue)
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-box">
        <input type="text" placeholder="Handle" value={handleValue} onChange={(e) => handleChange(e)}/>
        <input type="button" value="Submit" onClick={handleSubmit}/>
      </div>
    </div>
  )
}
