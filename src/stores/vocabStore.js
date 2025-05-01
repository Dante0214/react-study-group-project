
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



//myVocabList 안에 단어 예시
// {
//   name: "apple",
//   meaning: "사과",
//   class: "명사",
//   example: "I like apple.",
// }

export const useVocabStore = create(
  persist(
    (set, get) => ({
      myVocabList: [],

      // ✅ (name + meaning) 기준 중복 제거하여 병합 저장
      setMyVocabList: (newList) => {
        const currentList = get().myVocabList;

        const merged = [...currentList, ...newList];

        const uniqueByNameMeaning = merged.filter(
          (word, index, self) =>
            index === self.findIndex(
              (w) => w.name === word.name && w.meaning === word.meaning
            )
        );

        set({ myVocabList: uniqueByNameMeaning });
      },

      // ✅ (name + meaning) 기준 정확히 삭제
      deleteMyVocab: (name, meaning) =>
        set((state) => ({
          myVocabList: state.myVocabList.filter(
            (item) => !(item.name === name && item.meaning === meaning)
          ),
        })),

      // ✅ 전체 초기화
      clearMyVocabList: () => set({ myVocabList: [] }),
    }),
    {
      name: "my-vocab-storage", // localStorage key
    }
  )
);
