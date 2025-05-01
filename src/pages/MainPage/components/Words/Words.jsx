import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "./Words.style.css";

// 컴포넌트 불러오기
import WordsHeader from "./components/WordsHeader/WordsHeader";
import WordsTabs from "./components/WordsTabs/WordsTabs";
import WordsList from "./components/WordsList/WordsList";

const Words = ({ newsObject, isLoading, setHoveredWord }) => {
  const [tabValue, setTabValue] = useState(0);
  const [savedWords, setSavedWords] = useState({});
  // 샘플 단어 데이터
  const [words, setWords] = useState(newsObject?.words);
  const [idioms, setIdioms] = useState(newsObject?.idioms);

  useEffect(() => {
    setWords(newsObject?.words);
    setIdioms(newsObject?.idioms);
  }, [newsObject]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePlaySound = (word) => {
    // TTS API 사용
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  const handleSaveWord = (id) => {
    setSavedWords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSaveAllWords = () => {
    // 현재 체크된 모든 단어를 저장하는 함수
    console.log(
      "저장된 단어:",
      Object.keys(savedWords).filter((id) => savedWords[id])
    );
    setSavedWords({});
  };

  // 선택된 단어 개수 계산
  const selectedWordCount = Object.values(savedWords).filter(Boolean).length;

  return (
    <Box className="words-container">
      {/* 헤더 컴포넌트 */}
      <WordsHeader
        selectedWordCount={selectedWordCount}
        onSaveAllWords={handleSaveAllWords}
      />

      {/* 탭 컴포넌트 */}
      <WordsTabs tabValue={tabValue} onTabChange={handleTabChange} />

      {/* 단어 목록 컴포넌트 */}
      <WordsList
        tabValue={tabValue}
        words={words}
        idioms={idioms}
        savedWords={savedWords}
        onSaveWord={handleSaveWord}
        onPlaySound={handlePlaySound}
        setHoveredWord={setHoveredWord}
      />
    </Box>
  );
};

export default Words;
