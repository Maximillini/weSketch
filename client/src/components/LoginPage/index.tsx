import React, { ChangeEvent, useState } from 'react'
import { faker } from '@faker-js/faker'
import { usePlayerStore } from '../../stores/playerStore'
import { useGameStore } from '../../stores/gameStore'
import { useSocketStore } from '../../stores/socketStore'

const randomName =
  faker.science.chemicalElement().name +
  '_' +
  faker.animal.type() +
  '_' +
  faker.number.int(400)

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

    const submittedName = handleValue || randomName

    setHandle(submittedName)
    addPlayer({ userName: submittedName, score: 0 })

    socket?.emit('register-user', submittedName)
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-box" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder={`${randomName}`}
          value={handleValue}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
