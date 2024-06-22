import React, { ChangeEvent, useState } from 'react'
import { usePlayerStore } from '../../stores/playerStore'
import { useSocketStore } from '../../stores/socketStore'
import { getRandomName } from '@/helpers/playerHelpers'

export const LoginPage = () => {
  const randomName = getRandomName()
  const socket = useSocketStore((state) => state.socket)
  const setHandle = usePlayerStore((state) => state.setHandle)
  const [handleValue, setHandleValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHandleValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const submittedName = handleValue || randomName

    setHandle(submittedName)

    socket?.emit('createOrJoinGame', submittedName)
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
