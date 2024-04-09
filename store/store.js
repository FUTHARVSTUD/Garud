import { create } from 'zustand'

export const useLoginModalState = create((set) => ({
  isOpen: false,
  updateOpen: (newOpen) => set({ isOpen: newOpen }),
  whichSection: "home",
  updateWhichSection: (newSection) => set({ whichSection: newSection }),
}))