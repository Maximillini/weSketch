import { create } from 'zustand'
import { Player, Chat, ChatLogType, GameState } from '../types/gameTypes'
import _ from 'lodash'

export type GameStoreState = {
  playerList: Player[]
  gameChatLog: { userName: string; message: string }[]
  generalChatLog: { userName: string; message: string }[]
  gameState: GameState
  setPlayers: (playerList: Player[]) => void
  startGame: () => void
  addPlayer: (newPlayer: Player) => void
  setPlayerList: (updatedPlayers: Player[]) => void
  addChat: (newChat: Chat, chatType: ChatLogType) => void
  setGameState: (newState: Partial<GameState>) => void
  setTimeRemaining: (time: number) => void
}

export const useGameStore = create<GameStoreState>((set) => ({
  playerList: [],
  gameChatLog: [],
  generalChatLog: [],
  gameState: {
    gameStarted: false,
    round: 1,
    currentWordList: ['', '', ''],
    currentArtist: null,
    countdownTimer: 0,
  },
  setPlayers: (playerList) => set({ playerList }),
  startGame: () =>
    set(<Partial<GameStoreState>>{ gameState: { gameStarted: true } }),
  addPlayer: (newPlayer) =>
    set((state) => ({ playerList: [...state.playerList, newPlayer] })),
  setPlayerList: (updatedPlayers) =>
    set((state) => ({
      playerList: { ...state.playerList, ...updatedPlayers },
    })),
  addChat: (newChat, chatType) =>
    set((state) => ({ [chatType]: [...state[chatType], newChat] })),
  setGameState: (newState) => set((state) => ({ ...state, ...newState })),
  setTimeRemaining: (time) =>
    set((state) => ({
      gameState: { ...state.gameState, ...{ countdownTimer: time } },
    })),
}))
