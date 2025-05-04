# 딸깍영어

> AI가 뉴스 기사를 분석해 단어를 자동 추출해주는  
> 대한민국 1위! AI 기반 영어 단어 학습 플랫폼

🌐 [배포 링크 바로가기](https://ddalkkak-english.netlify.app/)

---

## 📱 모바일 UI 미리보기

| 랜딩 | 로그인 | 기사 | 단어장 | 테스트 |
|:--:|:--:|:--:|:--:|:--:|
| ![랜딩](./public/screenshots/landing.jpeg) | ![로그인](./public/screenshots/login.jpeg) | ![기사](./public/screenshots/main.jpeg) | ![단어장](./public/screenshots/vocab.jpeg) | ![테스트](./public/screenshots/test.jpeg) |

> ✨ 주요 기능: 기사 기반 단어 학습 · 단어장 저장 · 단어 테스트 · 구글 로그인 · 반응형 웹


---

## ✨ 주요 기능 요약

- 💡 AI 기사 분석으로 단어 자동 추출
- 📰 카테고리별 기사 필터링
- 📦 단어장 저장 및 검색 기능
- 🧪 테스트 모드 (영→한 / 한→영)
- 🔐 이메일 및 구글 계정 로그인 지원
- 📱💻 반응형 디자인 (모바일/웹 지원)

---

## 🛠️ 기술 스택 상세 설명

| 기술             | 설명 |
|------------------|------|
| **React + Vite** | 빠른 개발 환경 및 번들링 성능을 위해 사용 |
| **MUI**          | Material UI를 통한 반응형 UI 및 시각 일관성 유지 |
| **React Router** | 페이지 이동을 위한 라우팅 처리 |
| **Zustand**      | 간결하고 가벼운 글로벌 상태관리 도구 |
| **Firebase Auth**| 회원가입, 로그인, 구글 OAuth 인증 처리 |
| **Netlify**      | 정적 웹사이트 배포 및 서버리스 처리

---

## 📁 폴더 구조
```
src/
├── assets/ # 이미지 및 공용 리소스
├── common/
│ └── components/
│ └── Buttons/ # 공통 버튼 컴포넌트 (GoogleLogin 등)
├── hooks/ # 커스텀 훅
├── layouts/ # AppLayout (NavBar, Footer 포함)
├── pages/
│ ├── LandingPage/ # 랜딩 페이지
│ ├── LoginPage/ # 로그인 및 회원가입
│ ├── MainPage/ # 기사 기반 학습 메인
│ └── VocabPage/ # 단어장 및 테스트
├── router/ # 라우팅 관련 설정
├── stores/ # Zustand 상태 관리
├── util/ # 유틸리티 함수
├── App.jsx
├── App.css
├── index.css
├── main.jsx
```
---

## 👥 팀원 소개

| 역할         | 이름             |
|--------------|------------------|
| PO           | 한상휘           |
| SM           | 한사라           |
| Developer    | 안치호, 정민지, 박영욱 |

---

## 🚀 사용법

1. [배포 링크](https://ddalkkak-english.netlify.app/)로 이동
2. 플로팅 버튼 클릭 → 구글 로그인 또는 이메일 가입
3. 뉴스 기사 읽고, 단어 체크박스로 단어장에 저장
4. 단어장 페이지에서 복습하고 테스트 진행

---

## 🛡️ 저작권

© 2025 딸깍영어. All rights reserved.
