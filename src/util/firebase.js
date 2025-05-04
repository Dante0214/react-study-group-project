import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail, // 비밀번호 재설정 함수 추가
    fetchSignInMethodsForEmail, // 이메일 존재 확인 함수 추가
} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

// Firebase 설정 (본인의 Firebase 프로젝트 설정으로 변경해야 합니다!)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
};

export const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = (user, displayName) => {
    return updateProfile(user, {
        displayName: displayName,
    });
};

// 비밀번호 재설정 요청 함수
export const sendPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

// 이메일 존재 확인 함수 (추가)
export const checkEmailExists = (email) => {
    return fetchSignInMethodsForEmail(auth, email);
};
