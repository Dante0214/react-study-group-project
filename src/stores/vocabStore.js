import { create } from "zustand";

//myVocabList 안에 단어 예시
// {
//   word: "apple",
//   meaning: "사과",
//   class: "명사",
//   example: "I like apple.",
// }



export const useVocabStore = create((set) => ({
  myVocabList: [],

  setMyVocabList: (newList) => set((state) => ({ myVocabList: newList })),

  deleteMyVocab: (word) =>
    set((state) => ({
      myVocabList: state.myVocabList.filter((item) => item !== word),
    })),

  clearMyVocabList: () => set({ myVocabList: [] }),
}));
