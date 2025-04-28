import { create } from "zustand";

export const useVocabStore = create((set) => ({
  vocabList: [], // 단어 리스트 저장
  checkedVocab: [], // 체크한 단어만 저장

  setVocabList: (newList) => set({ vocabList: newList }),

  toggleChecked: (word) =>
    set((state) => {
      const isChecked = state.checkedVocab.includes(word);
      return {
        checkedVocab: isChecked
          ? state.checkedVocab.filter((item) => item !== word)
          : [...state.checkedVocab, word],
      };
    }),

  clearChecked: () => set({ checkedVocab: [] }), // 체크한 단어 초기화
}));
