import { create } from "zustand";

export const useVocabStore = create((set) => ({
  vocabList: [], // 단어 리스트 저장
  checkedVocab: [], // 체크한 단어만 저장

  setVocabList: (newList) => set({ vocabList: newList }),

  //word의 중복 가능성이 있으므로 id 값으로 비교
  toggleChecked: (id) =>
    set((state) => {
      const isChecked = state.checkedVocab.includes(id);
      return {
        checkedVocab: isChecked
          ? state.checkedVocab.filter((item) => item !== id)
          : [...state.checkedVocab, id],
      };
    }),

  clearChecked: () => set({ checkedVocab: [] }), // 체크한 단어 초기화
}));
