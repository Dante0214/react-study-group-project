import { create } from "zustand";

//myVocabList 안에 단어 예시
// {
//   word: "apple",
//   meaning: "사과",
//   class: "명사",
//   example: "I like apple.",
// }

export const useVocabStore = create((set) => ({
  myVocabList: [], // 단어 목록 (예시 단어 객체 구조에 맞게 저장)

  setMyVocabList: (newList) => set({ myVocabList: newList }), // 단어 목록 설정

  deleteMyVocab: (word) =>
    set((state) => ({
      myVocabList: state.myVocabList.filter((item) => item.word !== word), // 단어 삭제 (단어를 기준으로)
    })),

  clearMyVocabList: () => set({ myVocabList: [] }), // 단어장 초기화
}));
