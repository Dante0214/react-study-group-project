import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { useVocabStore } from "../../../stores/vocabStore";
import VocabTestPrep from "./VocabTestPrep";
import VocabTestSession from "./VocabTestSession";
import VocabTestResult from "./VocabTestResult";

const TIME_LIMIT = 10;

const VocabTest = ({ onExit }) => {
  const { myVocabList } = useVocabStore();
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [mode, setMode] = useState("wordToMeaning");
  const inputRef = useRef(null);

  // 테스트 상태: "prep" (준비), "session" (시험 중), "result" (결과)
  const [testState, setTestState] = useState("prep");

  const startTest = () => {
    const shuffled = [...myVocabList].sort(() => Math.random() - 0.5);
    setQuizList(shuffled);
    setCurrentIndex(0);
    setUserAnswer("");
    setScore(0);
    setShowAnswer(false);
    setTimeLeft(TIME_LIMIT);
    setTestState("session");
  };

  const toggleMode = () => {
    setMode((prev) =>
      prev === "wordToMeaning" ? "meaningToWord" : "wordToMeaning"
    );
  };

  const handleCheckAnswer = () => {
    const current = quizList[currentIndex];
    const correct = mode === "wordToMeaning" ? current.meaning : current.name;

    const correctAnswers = correct
      .split(/[,/]/)
      .map((item) => item.trim().toLowerCase());

    if (correctAnswers.includes(userAnswer.trim().toLowerCase())) {
      setScore((prev) => prev + 1);
    }

    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentIndex >= quizList.length - 1) {
      // 마지막 문제이면 결과 페이지로 이동
      setTestState("result");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setShowAnswer(false);
      setTimeLeft(TIME_LIMIT);
    }
  };

  const resetTest = () => {
    setTestState("prep");
  };

  // 현재 상태에 따라 적절한 컴포넌트 렌더링
  return (
    <Box>
      {testState === "prep" && (
        <VocabTestPrep
          startTest={startTest}
          toggleMode={toggleMode}
          mode={mode}
          onExit={onExit}
        />
      )}

      {testState === "session" && (
        <VocabTestSession
          currentIndex={currentIndex}
          quizList={quizList}
          mode={mode}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          TIME_LIMIT={TIME_LIMIT}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
          handleCheckAnswer={handleCheckAnswer}
          handleNext={handleNext}
          inputRef={inputRef}
          onExit={onExit}
        />
      )}

      {testState === "result" && (
        <VocabTestResult
          score={score}
          totalQuestions={quizList.length}
          startTest={startTest}
          toggleMode={toggleMode}
          mode={mode}
          onExit={onExit}
          resetTest={resetTest}
        />
      )}
    </Box>
  );
};

export default VocabTest;
