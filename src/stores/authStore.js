import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            setLogin: () => set({ isLoggedIn: true }),
            setLogout: () => {
                // 로그아웃 시 아이디 기억하기 체크가 안 되어 있다면 저장된 이메일 제거
                if (!localStorage.getItem('rememberedEmail')) {
                    localStorage.removeItem('rememberedEmail');
                }
                set({ isLoggedIn: false });
            },
        }),
        {
            //로그인을 localStorage에 저장하여 페이지 새로고침 후에도 상태를 유지
            name: 'auth-storage', // localStorage에 저장될 key 이름
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
