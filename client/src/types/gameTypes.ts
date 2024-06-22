export type Player = {
  id: string
  name: string
  score: number
  host: boolean
}

export type Chat = {
  userName: string
  message: string
}

export type ChatType = 'game' | 'general'

export type ChatLogType = 'gameChatLog' | 'generalChatLog'

export type GameState = {
  countdownTimer: number
  round: number
  gameStarted: boolean
  currentWordList: string[]
  currentArtist: Player | null
}
