import { create } from 'zustand'
import { Player, Chat, ChatType } from '../types/gameTypes';

type GameStoreState = {
  playerList: Player[],
  gameChatLog: { userName: string, message: string }[],
  generalChatLog: { userName: string, message: string }[],
  gameState: {
    hasStarted: boolean,
    currentRound: number,
    currentWordList: string[],
    currentArtist: Player | null
  },
  setPlayers: (playerList: Player[]) => void
  startGame: () => void
  addPlayer: (newPlayer: Player) => void,
  addChat: (newChat: Chat, chatType: ChatType) => void,
}

export const useGameStore = create<GameStoreState>((set) => ({
  playerList: [],
  gameChatLog: [],
  generalChatLog: [],
  gameState: {
    hasStarted: false,
    currentRound: 1,
    currentWordList: ['', '', ''],
    currentArtist: null,
  },
  setPlayers: (playerList) => set({ playerList }),
  startGame: () => set(<Partial<GameStoreState>>({ gameState: { hasStarted: true }})),
  addPlayer: (newPlayer) => set((state) => ({ playerList: [...state.playerList, newPlayer] })),
  addChat: (newChat, chatType) => set((state) => ({ [chatType]: [...state[chatType], newChat]}))
}))
