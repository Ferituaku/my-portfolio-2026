import { create } from 'zustand'

interface State {
  isMenuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

export const useStore = create<State>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}))
