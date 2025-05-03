import React from "react";
import { Paper, Typography, Stack, Button, Box } from "@mui/material";

const VocaTestResult = ({
  score,
  totalQuestions,
  onRestart,
  onToggleMode,
  mode,
  onExit,
}) => (
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
        <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
          시험 종료
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          점수: {score} / {totalQuestions}
        </Typography>
      </Box>

      <Stack spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={onRestart}
          sx={{ backgroundColor: "lightgrey", color: "black" }}
        >
          다시 시작
        </Button>
        <Button
          variant="contained"
          onClick={onToggleMode}
          sx={{ backgroundColor: "lightgrey", color: "black" }}
        >
          모드 전환 ({mode === "wordToMeaning" ? "뜻 맞추기" : "단어 맞추기"})
        </Button>
      </Stack>

      <Stack justifyContent="center" direction="row">
        <Button variant="text" color="error" onClick={onExit}>
          종료
        </Button>
      </Stack>
    </Paper>
  </Box>
);

export default VocaTestResult;
