import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNewsStore = create(
  persist(
    (set) => ({
      // 뉴스 관련 상태
      newsObject: {
        title: "",
        content: "",
        date: "",
        source: {
          name: "",
          url: "",
        },
        words: [],
        idioms: [],
      },
      topic: "Any", // 기본 토픽
      lastFetchedTime: null, // 마지막으로 불러온 시간

      // 뉴스 데이터 설정 함수
      setNewsObject: (newsObject) => set({ 
        newsObject,
        lastFetchedTime: new Date().toISOString()
      }),
      
      // 토픽 설정 함수
      setTopic: (topic) => set({ topic }),
      
      // 상태 초기화 함수
      resetNewsState: () => set({
        newsObject: {
          title: "",
          content: "",
          date: "",
          source: {
            name: "",
            url: "",
          },
          words: [],
          idioms: [],
        },
        lastFetchedTime: null
      }),
    }),
    {
      name: 'news-storage', // localStorage에 저장될 키 이름
      partialize: (state) => ({
        // 필요한 상태만 저장
        newsObject: state.newsObject,
        topic: state.topic,
        lastFetchedTime: state.lastFetchedTime,
      }),
    }
  )
); 