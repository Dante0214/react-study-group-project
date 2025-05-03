import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  LinearProgress,
  Paper,
} from "@mui/material";

const VocaTestQuiz = ({
  currentQuestion,
  currentIndex,
  totalQuestions,
  timeLeft,
  TIME_LIMIT,
  userAnswer,
  onUserAnswerChange,
  showAnswer,
  correctAnswer,
  onCheckAnswer,
  onNextQuestion,
  onExit,
  inputRef,
  isCorrect,
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
        backgroundColor: showAnswer
          ? isCorrect === true
            ? "#e8f5e9"
            : "#ffebee"
          : "background.paper",
        transition: "background-color 0.3s ease",
      }}
    >
      <Box
        sx={{
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>단어 시험</Typography>
        <Typography variant="body2" color="text.secondary">
          {currentIndex + 1}/{totalQuestions}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(timeLeft / TIME_LIMIT) * 100}
        sx={{ height: 10, borderRadius: 5, my: 2 }}
      />

      <Box
        sx={{
          p: 3,
          bgcolor: showAnswer
            ? isCorrect === true
              ? "#e8f5e9" // 연한 초록
              : "#ffebee" // 연한 빨강
            : "#f9f9f9", // 기본
          transition: "background-color 0.3s ease",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
            {currentQuestion?.name && "영어 단어"}
            {currentQuestion?.meaning && "우리말 뜻"}
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {currentQuestion}
        </Typography>

        <TextField
          inputRef={inputRef}
          fullWidth
          label="정답 입력"
          value={userAnswer}
          onChange={onUserAnswerChange}
          disabled={showAnswer}
          autoFocus
        />

        <Typography mt={2} color="text.secondary">
          남은 시간: {timeLeft}초
        </Typography>

        <Box mt={3} display="flex" flexDirection="column">
          {showAnswer && (
            <Typography>
              정답: <strong>{correctAnswer}</strong>
            </Typography>
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              sx={{ backgroundColor: "lightgrey", color: "black" }}
              onClick={onExit}
            >
              종료
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                marginLeft: "auto",
              }}
              onClick={showAnswer ? onNextQuestion : onCheckAnswer}
            >
              {showAnswer ? "다음 문제" : "확인"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  </Box>
);

export default VocaTestQuiz;
