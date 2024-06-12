import { create } from 'zustand'

type PlayerStore = {
  handle: string
  score: number
  setHandle: (newHandle: string) => void
  increaseScore: () => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  handle: '',
  score: 0,
  setHandle: (newHandle) => set({ handle: newHandle }),
  increaseScore: () => set((state) => ({ score: state.score + 1 })),
}))
