import { useEffect } from 'react'
import { GamePage } from './components/GamePage/index'
import { LoginPage } from './components/LoginPage'
import { usePlayerStore } from './stores/playerStore'
import { useSocketStore } from './stores/socketStore'
import './App.css'

function App() {
  const handle = usePlayerStore((state) => state.handle)
  const initializeSocket = useSocketStore((state) => state.initializeSocket)

  useEffect(() => {
    initializeSocket()
  }, [initializeSocket])

  // TODO - Add Routing via React or Tanstack Router
  return <>{handle !== '' ? <GamePage /> : <LoginPage />}</>
}

export default App
