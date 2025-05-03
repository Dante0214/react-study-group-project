import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  LinearProgress,
  Paper,
} from "@mui/material";

const VocabTestSession = ({
  currentIndex,
  quizList,
  mode,
  timeLeft,
  setTimeLeft,
  TIME_LIMIT,
  userAnswer,
  setUserAnswer,
  showAnswer,
  setShowAnswer,
  handleCheckAnswer,
  handleNext,
  inputRef,
  onExit,
}) => {
  const current = quizList[currentIndex];
  const question = mode === "wordToMeaning" ? current.name : current.meaning;
  const correctAnswer =
    mode === "wordToMeaning" ? current.meaning : current.name;

  const headerText = () => {
    switch (mode) {
      case "wordToMeaning":
        return "뜻 맞추기";
      case "meaningToWord":
        return "단어 맞추기";
      default:
        return "단어 시험";
    }
  };

  // showAnswer 상태가 변경될 때마다 로그 출력
  useEffect(() => {
    console.log("showAnswer 상태:", showAnswer);
  }, [showAnswer]);

  // 타이머 설정
  useEffect(() => {
    if (showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, showAnswer, setShowAnswer, setTimeLeft]);

  // 자동 포커스 설정
  useEffect(() => {
    if (!showAnswer && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  }, [showAnswer, inputRef]);

  // Enter 키로 다음 문제 넘어가기 처리
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showAnswer && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showAnswer, handleNext]);

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
          maxWidth: 400,
          width: "100%",
          mx: "auto",
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: showAnswer
            ? userAnswer.trim() === correctAnswer
              ? "#e8f5e9" // 맞았을 때 연한 초록
              : "#ffebee" // 틀렸을 때 연한 빨강
            : "background.paper",
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
          <Typography
            sx={{ fontWeight: "bold", color: "var(--color-text-primary)" }}
          >
            단어 시험
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--color-text-disabled)" }}
          >
            {currentIndex + 1}/{quizList.length}
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
            backgroundColor: showAnswer
              ? userAnswer.trim() === correctAnswer
                ? "#e8f5e9" // 맞았을 때 연한 초록
                : "#ffebee" // 틀렸을 때 연한 빨강
              : "#f9f9f9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "var(--color-text-disabled)", mr: 0.5 }}
            >
              {headerText()}
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: "var(--color-text-primary)",

              fontSize: {
                xs: "1.8rem",
                sm: "2.5rem",
                md: "3rem",
              },
            }}
          >
            {question}
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckAnswer();
            }}
          >
            <TextField
              inputRef={inputRef}
              fullWidth
              label="정답 입력"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showAnswer}
              autoFocus={!showAnswer}
            />
          </form>

          <Typography mt={2} sx={{ color: "var(--color-text-disabled)" }}>
            남은 시간: {timeLeft}초
          </Typography>

          <Box mt={3} display="flex" flexDirection="column">
            {showAnswer && (
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                정답: <strong>{correctAnswer}</strong>
              </Typography>
            )}
            <Box
              mt={2}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              gap={3}
            >
              <Button
                sx={{
                  backgroundColor: "var(--color-primary-light)",
                  color: "var(--color-text-secondary)",
                }}
                onClick={onExit}
              >
                종료
              </Button>
              <Button
                sx={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-text-primary)",
                }}
                variant="contained"
                onClick={showAnswer ? handleNext : handleCheckAnswer}
              >
                {showAnswer
                  ? currentIndex === quizList.length - 1
                    ? "결과"
                    : "다음"
                  : "확인"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default VocabTestSession;
