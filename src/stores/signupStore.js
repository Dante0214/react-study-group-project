import { create } from 'zustand';

const useSignupStore = create((set) => ({
    newName: '',
    newEmail: '',
    resetEmail: '',
    newPassword: '',
    newPasswordConfirm: '', // 비밀번호 확인 상태 추가
    isNewEmailValid: true,
    isNewPasswordValid: true,
    isNewPasswordConfirmValid: true, // 비밀번호 확인 유효성 상태 추가
    setNewName: (name) => set({ newName: name }),
    setNewEmail: (email) => set({ newEmail: email }),
    setResetEmail: (email) => set({ resetEmail: email }),
    setNewPassword: (password) => set({ newPassword: password }),
    setNewPasswordConfirm: (passwordConfirm) => set({ newPasswordConfirm: passwordConfirm }), // 비밀번호 확인 상태 업데이트 함수
    setIsNewEmailValid: (isValid) => set({ isNewEmailValid: isValid }),
    setIsNewPasswordValid: (isValid) => set({ isNewPasswordValid: isValid }),
    setIsNewPasswordConfirmValid: (isValid) => set({ isNewPasswordConfirmValid: isValid }), // 비밀번호 확인 유효성 업데이트 함수
}));

export default useSignupStore;
