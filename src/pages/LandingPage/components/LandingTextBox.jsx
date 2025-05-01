import { Box, Button, Typography } from "@mui/material";
import React from "react";

const textContent = {
  ko: [
    "뉴스로 배우는 살아있는 영어!",
    "지문 속 단어를 자동으로",
    "정리해주는 똑똑한 영어 학습 도우미",
    "지금 바로 시작하세요!",
  ],
  en: [
    "Practical English through real-world news!",
    "A smart assistant that extracts and",
    "organizes words from every article.",
  ],
};

const LandingTextBox = ({ type }) => {
  console.log(type);
  const lines = textContent[type] || [];

  return (
    <Box
      sx={{
        bgcolor: "rgba(247,248,252,0.80)",
        borderRadius: 2,
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Typography
        fontWeight="bold"
        color="var(--color-text-primary)"
        sx={{ lineHeight: 4 }}
      >
        {lines.map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Typography>
      {type === "en" && (
        <Button
          className="get-started-btn"
          variant="contained"
          sx={{
            mt: 2,
            position: "absolute",
            bottom: 20,
            right: 20,
            fontWeight: "bold",
            color: "var(--color-text-primary)",
            bgcolor: "var(--color-primary)",
            display: { xs: "none", sm: "block" },
            "&hover": {
              bgcolor: "var(--color primary-dark)",
            },
          }}
        >
          Get started
        </Button>
      )}
    </Box>
  );
};

export default LandingTextBox;
