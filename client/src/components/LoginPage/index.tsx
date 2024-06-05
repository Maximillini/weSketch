import React, { ChangeEvent, useState } from 'react'
import { usePlayerStore } from '../../stores/playerStore'
import { useGameStore } from '../../stores/gameStore'
import { useSocketStore } from '../../stores/socketStore'

export const LoginPage = () => {
  const socket = useSocketStore((state) => state.socket)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const setHandle = usePlayerStore((state) => state.setHandle)
  const [handleValue, setHandleValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHandleValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setHandle(handleValue)
    addPlayer({ userName: handleValue, score: 0 })
    socket?.emit('register-user', handleValue)
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-box" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Handle"
          value={handleValue}
          onChange={(e) => handleChange(e)}
        />
        <input type="button" value="Submit" />
      </form>
    </div>
  )
}
