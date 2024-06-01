import { ChangeEvent, useState } from "react"
import { usePlayerStore } from "../../stores/playerStore"

export const LoginPage = () => {
  const setHandle = usePlayerStore((state) => state.setHandle)
  const [handleValue, setHandleValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setHandleValue(e.target.value)
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-box">
        <input type="text" placeholder="Handle" value={handleValue} onChange={(e) => handleChange(e)}/>
        <input type="button" value="Submit" onClick={() => { setHandle(handleValue) }}/>
      </div>
    </div>
  )
}
