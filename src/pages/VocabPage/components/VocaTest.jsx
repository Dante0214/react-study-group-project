import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  LinearProgress,
  Paper,
  Stack,
} from "@mui/material";
import { useVocabStore } from "../../../stores/vocabStore";

const TIME_LIMIT = 10;

const VocabTest = ({ onExit }) => {
  const { myVocabList } = useVocabStore();

  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [mode, setMode] = useState("wordToMeaning"); // "wordToMeaning" or "meaningToWord"
  const inputRef = useRef(null);

  // 시험 시작
  const startTest = () => {
    const shuffled = [...myVocabList].sort(() => Math.random() - 0.5);
    setQuizList(shuffled);
    setCurrentIndex(0);
    setUserAnswer("");
    setScore(0);
    setShowAnswer(false);
    setTimeLeft(TIME_LIMIT);
  };

  // 모드 전환
  const toggleMode = () => {
    setMode((prev) =>
      prev === "wordToMeaning" ? "meaningToWord" : "wordToMeaning"
    );
    // startTest(); // 모드 전환 시 시험도 새로 시작
  };

  // 첫 문제가 렌더링될 때를 감지하여 포커스 설정
  useEffect(() => {
    if (
      quizList.length > 0 &&
      currentIndex === 0 &&
      !showAnswer &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, [quizList.length, currentIndex, showAnswer]);

  // 타이머
  useEffect(() => {
    if (quizList.length === 0 || showAnswer) return;

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
  }, [quizList, currentIndex, showAnswer]);

  // 정답 체크
  const handleCheckAnswer = () => {
    const current = quizList[currentIndex];
    const correct = mode === "wordToMeaning" ? current.meaning : current.name;

    const correctAnswers = correct
      .split(/[,/]/)
      .map((item) => item.trim().toLowerCase()); //답이 2개일 경우도 있어서 하나만 맞아도 정답처리

    if (correctAnswers.includes(userAnswer.trim().toLowerCase())) {
      setScore((prev) => prev + 1);
    }

    setShowAnswer(true);
  };

  // 다음 문제
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setUserAnswer("");
    setShowAnswer(false);
    setTimeLeft(TIME_LIMIT);
    // 다음 문제 로드시 입력창에 포커스 설정은 아래 useEffect에서 처리됨
  };

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        if (quizList.length === 0) return;

        if (showAnswer) {
          handleNext();
        } else {
          handleCheckAnswer();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [quizList, showAnswer]);

  // showAnswer 상태가 false로 변경될 때 (다음 문제 로드 시) 포커스 설정
  useEffect(() => {
    if (!showAnswer && inputRef.current && quizList.length > 0) {
      // 약간의 지연을 주어 렌더링이 완료된 후 포커스가 적용되도록 함
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  }, [currentIndex, showAnswer, quizList.length]);

  // 시험 종료 화면
  if (quizList.length > 0 && currentIndex >= quizList.length) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: "center" }}>
        <Typography variant="h5">시험 종료!</Typography>
        <Typography sx={{ my: 2 }}>
          점수: {score} / {quizList.length}
        </Typography>

        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Button variant="outlined" onClick={startTest}>
            다시 시작
          </Button>
          <Button variant="contained" onClick={toggleMode}>
            모드 전환 ({mode === "wordToMeaning" ? "뜻 맞추기" : "단어 맞추기"})
          </Button>
        </Stack>

        <Stack justifyContent="center" direction="row">
          <Button variant="text" color="error" onClick={onExit}>
            종료
          </Button>
        </Stack>
      </Paper>
    );
  }

  // 문제 화면
  if (quizList.length > 0) {
    const current = quizList[currentIndex];
    const question = mode === "wordToMeaning" ? current.name : current.meaning;
    const correctAnswer =
      mode === "wordToMeaning" ? current.meaning : current.name;

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
            maxWidth: 400, // 작게
            width: "100%", // 반응형
            mx: "auto", // 중앙 정렬
            borderRadius: 4, // 둥글게
            boxShadow: 3, // 그림자
            backgroundColor: "background.paper", // 카드 배경색
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
              {currentIndex + 1}/{quizList.length}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / TIME_LIMIT) * 100}
            sx={{ height: 10, borderRadius: 5, my: 2 }}
          />

          <Box sx={{ p: 3, bgcolor: "#f9f9f9" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mr: 0.5 }}
              >
                영어 단어
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              {question}
            </Typography>

            <TextField
              inputRef={inputRef}
              fullWidth
              label="정답 입력"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
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
                  onClick={showAnswer ? handleNext : handleCheckAnswer}
                >
                  {showAnswer ? "다음 문제" : "확인"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  // 시작 화면
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
          }}
        >
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>단어 시험</Typography>

          <Stack
            spacing={1.5}
            sx={{ width: "100%" }}
            direction={{ xs: "column", sm: "row" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
              }}
              onClick={startTest}
              fullWidth
            >
              시험 시작
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                whiteSpace: "nowrap",
              }}
              onClick={toggleMode}
              fullWidth
            >
              모드 전환 (
              {mode === "wordToMeaning" ? "뜻 맞추기" : "단어 맞추기"})
            </Button>
          </Stack>
          <Box>
            <Button
              sx={{ marginTop: 3 }}
              variant="text"
              color="error"
              onClick={onExit}
              fullWidth
            >
              돌아가기
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default VocabTest;
