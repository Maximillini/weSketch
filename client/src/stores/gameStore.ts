import { create } from 'zustand';

type Player = {
  userName: string,
  score: number
}

type Chat = {
  userName: string,
  message: string
}

type ChatType = 'gameChatLog' | 'generalChatLog'

type GameStoreState = {
  playerList: Player[],
  gameChatLog: { userName: string, message: string }[],
  generalChatLog: { userName: string, message: string }[],
  addPlayer: (newPlayer: Player) => void,
  addChat: (newChat: Chat, chatType: ChatType) => void
}

export const useGameStore = create<GameStoreState>((set) => ({
  playerList: [],
  gameChatLog: [],
  generalChatLog: [],
  addPlayer: (newPlayer) => set((state) => ({ playerList: [...state.playerList, newPlayer] })),
  addChat: (newChat, chatType) => set((state) => ({ [chatType]: [...state[chatType], newChat]}))
}))
