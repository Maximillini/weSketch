import { GamePage } from './components/GamePage/index';
import { LoginPage } from './components/LoginPage';
import { usePlayerStore } from './stores/playerStore';
import './App.css'

function App() {
  const handle = usePlayerStore((state) => state.handle)
  return (
    <div className="app-container">
      {handle !== '' ? <GamePage /> : <LoginPage />}
    </div>
  )
}

export default App
