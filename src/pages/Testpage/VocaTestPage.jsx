import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  LinearProgress,
  Alert,
} from "@mui/material";
import { useVocabStore } from "../../stores/vocabStore";
import { useNavigate } from "react-router-dom";

const VocabTestPage = () => {
  const { vocabList, checkedVocab, toggleChecked } = useVocabStore();
  const navigate = useNavigate();
  console.log(checkedVocab);

  // 테스트에 사용할 단어 목록 (체크된 단어만)
  const [testWords, setTestWords] = useState([]);
  // 현재 문제
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // 사용자 입력
  const [userAnswer, setUserAnswer] = useState("");
  // 타이머
  const [timeLeft, setTimeLeft] = useState(10);
  // 정답 여부 메시지
  const [feedback, setFeedback] = useState(null);
  // 테스트 완료 여부
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  // 점수
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // 테스트에 사용할 체크된 단어 목록 초기화
  useEffect(() => {
    const checkedWords = vocabList.filter((item) =>
      checkedVocab.includes(item.word)
    );
    if (checkedWords.length === 0) {
      // 체크된 단어가 없으면 알림 후 단어장 페이지로 이동
      alert(
        "테스트할 단어가 선택되지 않았습니다. 단어장에서 테스트할 단어를 선택해주세요."
      );
      navigate("/vocab");
      return;
    }

    // 문제 순서 섞기
    const shuffled = [...checkedWords].sort(() => Math.random() - 0.5);
    setTestWords(shuffled);
  }, [vocabList, checkedVocab, navigate]);

  // 새로운 문제 생성
  const generateQuestion = () => {
    if (testWords.length === 0) {
      setIsTestCompleted(true);
      return;
    }

    const nextWord = testWords[0];
    const isWordBlank = Math.random() > 0.5; // 50% 확률로 단어 또는 의미를 빈칸으로

    setCurrentQuestion({
      id: nextWord.id,
      word: nextWord.word,
      meaning: nextWord.meaning,
      example: nextWord.example,
      type: isWordBlank ? "word" : "meaning", // 무엇을 테스트할지 (word: 단어 빈칸, meaning: 의미 빈칸)
      answer: isWordBlank ? nextWord.word : nextWord.meaning,
    });

    setUserAnswer("");
    setTimeLeft(10);
    setFeedback(null);

    // 이전 타이머 정리
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // 새 타이머 시작
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 입력 필드에 포커스
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 첫 문제 생성
  useEffect(() => {
    if (testWords.length > 0 && !currentQuestion) {
      generateQuestion();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testWords]);

  // 시간 초과 처리
  const handleTimeout = () => {
    setFeedback({
      isCorrect: false,
      message: `시간 초과! 정답은 "${currentQuestion.answer}" 입니다.`,
    });
    setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));

    // 3초 후 다음 문제
    setTimeout(() => {
      // 현재 문제 단어 제거
      setTestWords((prev) => prev.slice(1));
      generateQuestion();
    }, 3000);
  };

  // 정답 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 타이머 정지
    clearInterval(timerRef.current);

    // 정답 확인 - 대소문자 구분 없이, 앞뒤 공백 제거
    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      currentQuestion.answer.trim().toLowerCase();

    setFeedback({
      isCorrect,
      message: isCorrect
        ? "정답입니다!"
        : `오답입니다. 정답은 "${currentQuestion.answer}" 입니다.`,
    });

    // 점수 업데이트
    setScore((prev) => ({
      ...prev,
      [isCorrect ? "correct" : "incorrect"]:
        prev[isCorrect ? "correct" : "incorrect"] + 1,
    }));

    // 정답이면 단어 체크 해제
    if (isCorrect) {
      toggleChecked(currentQuestion.word);
    }

    // 잠시 후 다음 문제
    setTimeout(() => {
      // 현재 문제 단어 제거
      setTestWords((prev) => prev.slice(1));
      generateQuestion();
    }, 2000);
  };

  // 다시 테스트하기
  const handleRestartTest = () => {
    const checkedWords = vocabList.filter((item) =>
      checkedVocab.includes(item.word)
    );
    if (checkedWords.length === 0) {
      alert(
        "테스트할 단어가 선택되지 않았습니다. 단어장에서 테스트할 단어를 선택해주세요."
      );
      navigate("/vocab");
      return;
    }

    // 문제 순서 섞기
    const shuffled = [...checkedWords].sort(() => Math.random() - 0.5);
    setTestWords(shuffled);
    setCurrentQuestion(null);
    setIsTestCompleted(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--color-background-alt)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "var(--color-background)",
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            borderColor: "var(--color-border)",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            📝 단어 테스트
          </Typography>

          {/* 점수 표시 */}
          <Box
            sx={{ mb: 4, display: "flex", justifyContent: "center", gap: 4 }}
          >
            <Typography variant="h6" color="success.main">
              맞힌 문제: {score.correct}
            </Typography>
            <Typography variant="h6" color="error.main">
              틀린 문제: {score.incorrect}
            </Typography>
          </Box>

          {isTestCompleted ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                테스트 완료!
              </Typography>
              <Typography variant="h6" gutterBottom>
                최종 점수: {score.correct}점 / {score.correct + score.incorrect}
                문제
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRestartTest}
                >
                  다시 테스트하기
                </Button>
                <Button variant="outlined" onClick={() => navigate("/vocab")}>
                  단어장으로 돌아가기
                </Button>
              </Box>
            </Box>
          ) : currentQuestion ? (
            <>
              {/* 타이머 */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" align="right">
                  남은 시간: {timeLeft}초
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(timeLeft / 10) * 100}
                  color={timeLeft > 3 ? "primary" : "error"}
                />
              </Box>

              <Card
                variant="outlined"
                sx={{
                  borderColor: "var(--color-border)",
                  mb: 4,
                }}
              >
                <CardContent>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    {currentQuestion.type === "word" ? (
                      <>
                        <Typography variant="body1" color="text.secondary">
                          이 단어의 영어 표현은?
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 1 }}>
                          {currentQuestion.meaning}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="body1" color="text.secondary">
                          이 단어의 한국어 의미는?
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 1 }}>
                          {currentQuestion.word}
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Typography
                    color="var(--color-text-secondary)"
                    sx={{ mt: 1, fontStyle: "italic", textAlign: "center" }}
                  >
                    예문: {currentQuestion.example}
                  </Typography>
                </CardContent>
              </Card>

              {/* 피드백 표시 */}
              {feedback && (
                <Alert
                  severity={feedback.isCorrect ? "success" : "error"}
                  sx={{ mb: 3 }}
                >
                  {feedback.message}
                </Alert>
              )}

              {/* 답변 입력 폼 */}
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="답 입력"
                    variant="outlined"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={!!feedback}
                    inputRef={inputRef}
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!!feedback || !userAnswer.trim()}
                  >
                    제출
                  </Button>
                </Box>
              </form>
            </>
          ) : (
            <Typography align="center">로딩 중...</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default VocabTestPage;
