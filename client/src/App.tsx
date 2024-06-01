import { GamePage } from './components/GamePage/index';
import { LoginPage } from './components/LoginPage';
import { usePlayerStore } from './stores/playerStore';
import './App.css'

function App() {
  const handle = usePlayerStore((state) => state.handle)
  // TODO - Add Routing via React or Tanstack Router
  return (
    <>
      {handle !== '' ? <GamePage /> : <LoginPage />}
    </>
  )
}

export default App
