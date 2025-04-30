import { create } from "zustand";

export const useVocabStore = create((set) => ({
  vocabList: [], // 단어 리스트 저장
  checkedVocab: [], // 체크한 단어만 저장

  setVocabList: (newList) => set({ vocabList: newList }),

  // 값의 id를 비교하게 수정
  toggleChecked: (wordobj) =>
    set((state) => {
      const isChecked = state.checkedVocab.includes(wordobj.id);
      return {
        checkedVocab: isChecked
          ? state.checkedVocab.filter((id) => id !== wordobj.id)
          : [...state.checkedVocab, wordobj.id],
      };
    }),

  clearChecked: () => set({ checkedVocab: [] }), // 체크한 단어 초기화
}));
