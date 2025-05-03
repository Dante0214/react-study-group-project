import React, { useEffect, useRef, useState } from "react";
import { useVocabStore } from "../../../stores/vocabStore";

import VocaTestResult from "./VocaTestResult";
import VocaTestQuiz from "./VocaTestQuiz";
import VocaTestStart from "./VocaTestStart";

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
  const [isCorrect, setIsCorrect] = useState(null);

  // 시험 시작
  const startTest = () => {
    const shuffled = [...myVocabList].sort(() => Math.random() - 0.5);
    setQuizList(shuffled);
    setCurrentIndex(0);
    setUserAnswer("");
    setScore(0);
    setShowAnswer(false);
    setTimeLeft(TIME_LIMIT);
    setIsCorrect(null);
  };

  // 모드 전환
  const toggleMode = () => {
    setMode((prev) =>
      prev === "wordToMeaning" ? "meaningToWord" : "wordToMeaning"
    );
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
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizList, currentIndex, showAnswer]);

  // 시간 초과 처리 함수 추가
  const handleTimeOut = () => {
    setIsCorrect(false);
  };

  const handleCheckAnswer = () => {
    const current = quizList[currentIndex];
    const correct = mode === "wordToMeaning" ? current.meaning : current.name;

    const correctAnswers = correct
      .split(/[,/]/)
      .map((item) => item.trim().toLowerCase()); //답이 2개일 경우도 있어서 하나만 맞아도 정답처리

    const isAnswerCorrect = correctAnswers.includes(
      userAnswer.trim().toLowerCase()
    );

    if (isAnswerCorrect) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setShowAnswer(true);
  };

  // 다음 문제
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setUserAnswer("");
    setShowAnswer(false);
    setTimeLeft(TIME_LIMIT);
    setIsCorrect(null);
    // 다음 문제 로드시 입력창에 포커스 설정은 아래 useEffect에서 처리됨
  };

  const handleUserAnswerChange = (e) => {
    setUserAnswer(e.target.value);
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
      <VocaTestResult
        score={score}
        totalQuestions={quizList.length}
        onRestart={startTest}
        onToggleMode={toggleMode}
        mode={mode}
        onExit={onExit}
      />
    );
  }

  // 문제 화면
  if (quizList.length > 0) {
    const current = quizList[currentIndex];
    const question = mode === "wordToMeaning" ? current.name : current.meaning;
    const correctAnswer =
      mode === "wordToMeaning" ? current.meaning : current.name;

    return (
      <VocaTestQuiz
        currentQuestion={question}
        currentIndex={currentIndex}
        totalQuestions={quizList.length}
        timeLeft={timeLeft}
        TIME_LIMIT={TIME_LIMIT}
        userAnswer={userAnswer}
        onUserAnswerChange={handleUserAnswerChange}
        showAnswer={showAnswer}
        correctAnswer={correctAnswer}
        onCheckAnswer={handleCheckAnswer}
        onNextQuestion={handleNext}
        onExit={onExit}
        inputRef={inputRef}
        isCorrect={isCorrect}
        mode={mode}
      />
    );
  }

  // 시작 화면
  return (
    <VocaTestStart
      onStart={startTest}
      onToggleMode={toggleMode}
      mode={mode}
      onExit={onExit}
    />
  );
};

export default VocabTest;
