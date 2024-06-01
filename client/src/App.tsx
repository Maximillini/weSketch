import { GamePage } from './components/GamePage/index';
import { LoginPage } from './components/LoginPage';
import { usePlayerStore } from './stores/playerStore';
import './App.css'

function App() {
  const handle = usePlayerStore((state) => state.handle)
  return (
    <>
      {handle !== '' ? <GamePage /> : <LoginPage />}
    </>
  )
}

export default App
