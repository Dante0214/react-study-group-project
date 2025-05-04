// firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';
import {
    getAuth, // authentication 설정
    signInWithPopup, // google 로그인을 팝업창에 띄우기 위해
    GoogleAuthProvider, // google login 기능
    signInWithEmailAndPassword, // 이메일 로그인
    createUserWithEmailAndPassword, // 이메일 회원가입
    updateProfile, // 프로필 업데이트 함수 추가
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

// auth 설정 필수!!
const auth = getAuth(app);

// Google 로그인 제공자 인스턴스 생성
const provider = new GoogleAuthProvider();

// Google 로그인 함수 (팝업)
export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
};

// 이메일 로그인 함수
export const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// 이메일 회원가입 함수
export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// 사용자 프로필 업데이트 함수 (displayName 업데이트)
export const updateUserProfile = (user, displayName) => {
    return updateProfile(user, {
        displayName: displayName,
    });
};
