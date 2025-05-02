import { Box, Grid, keyframes, Typography } from "@mui/material";
import React from "react";
import logo from "../../../../public/ddalkkak.ico";

const messages = [
  "AI와 함께 매일 5분, 살아있는 영어를 읽자!",
  "관심 있는 뉴스로 영어 공부, 습관처럼 자연스럽게",
  "영단어 암기? 이제 AI에게 맡기세요.",
  "딸깍영어로 하루 한 편! 영어가 습관이 됩니다.",
];
// 슬라이드 애니메이션 키프레임 정의
const slideUp = keyframes`
  0% { transform: translateY(0%); }
  100% { transform: translateY(-50%); }  // 총 높이의 절반만큼 위로 이동
`;

const LandingBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        bgcolor: "var(--color-text-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <img src={logo} alt="로고" width={80} style={{ marginRight: 12 }} />
        <Box
          sx={{
            height: "30px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              animation: `${slideUp} 15s linear infinite`,
            }}
          >
            {/* 문구 2배로 반복해서 자연스럽게 무한 루프 */}
            {[...messages, ...messages].map((msg, i) => (
              <Typography
                key={i}
                variant="body1"
                color="#fff"
                fontWeight="bold"
                height="24px"
                marginY="5px"
              >
                {msg}
              </Typography>
            ))}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default LandingBanner;
