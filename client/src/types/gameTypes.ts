export type Player = {
  userName: string,
  score: number
}

export type ServerPlayer = {
  id: string,
  name: string
}

export type Chat = {
  userName: string
  message: string
}

export type ChatType = 'gameChatLog' | 'generalChatLog'
