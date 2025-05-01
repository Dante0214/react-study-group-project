import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLogin: () => set({ isLoggedIn: true }),
      setLogout: () => set({ isLoggedIn: false }),
    }),
    {
      //로그인을 localStorage에 저장하여 페이지 새로고침 후에도 상태를 유지
      name: "auth-storage", // localStorage에 저장될 key 이름
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
