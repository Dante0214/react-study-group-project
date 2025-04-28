import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      AppLayout : 해더랑 푸터는 컴포넌트로 만들어서 넣는게 좋을것 같음
      앱레이아웃은 랜딩페이지를 제외하고 모든페이지에서 공통으로 적용됨
      <Outlet />
    </div>
  );
};

export default AppLayout;
