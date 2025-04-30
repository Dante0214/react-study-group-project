import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import VocabPage from "../pages/VocabPage/VocabPage";
import AppLayout from "../layouts/AppLayout";
import VocabTestPage from "../pages/Testpage/VocaTestPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* 랜딩페이지 */}
      <Route path="/" element={<LandingPage />} />

      <Route element={<AppLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/vocab" element={<VocabPage />} />
        <Route path="/test" element={<VocabTestPage />} />
      </Route>

      {/* 잘못된 경로 접근 시 랜딩페이지 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
