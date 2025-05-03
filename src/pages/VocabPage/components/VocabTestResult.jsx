import React from "react";
import { Button, Typography, Paper, Stack, Box } from "@mui/material";

const VocabTestResult = ({
  score,
  totalQuestions,
  startTest,
  toggleMode,
  mode,
  onExit,
  resetTest,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 4,
          maxWidth: 400,
          width: "100%",
          mx: "auto",
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            py: 1.5,
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "var(--color-text-primary)" }}
            gutterBottom
          >
            시험 종료
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "var(--color-text-primary)" }}
            gutterBottom
          >
            점수: {score} / {totalQuestions}
          </Typography>
        </Box>
        <Stack spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-primary)",
            }}
            onClick={startTest}
          >
            다시 시작
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-primary)",
            }}
            onClick={toggleMode}
          >
            모드 전환 ({mode === "wordToMeaning" ? "뜻 맞추기" : "단어 맞추기"})
          </Button>
        </Stack>

        <Stack justifyContent="center" direction="row">
          <Button
            sx={{
              color: "var(--color-text-secondary)",
              "&:hover": {
                backgroundColor: "transparent",
                color: "var(--color-text-secondary)",
              },
            }}
            variant="text"
            onClick={onExit}
          >
            단어장으로
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default VocabTestResult;
