import { create } from 'zustand'
import { Player, Chat, ChatType } from '../types/gameTypes'

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
