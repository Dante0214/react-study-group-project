import { create } from "zustand";

export const useTestModeStore = create((set) => ({
  isTestMode: false,
  toggleTestMode: () => set((state) => ({ isTestMode: !state.isTestMode })),
  setTestMode: (value) => set({ isTestMode: value }),
}));
