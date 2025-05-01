import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import "./Words.style.css";
import { useVocabStore } from "../../../../stores/vocabStore";

// 컴포넌트 불러오기
import WordsHeader from "./components/WordsHeader/WordsHeader";
import WordsTabs from "./components/WordsTabs/WordsTabs";
import WordsList from "./components/WordsList/WordsList";

const Words = ({ newsObject, isLoading, setHoveredWord }) => {
  const [tabValue, setTabValue] = useState(0);
  // 체크된 단어들을 탭별로 배열로 관리
  const [savedWordNames, setSavedWordNames] = useState({
    words: [], // 단어 탭의 체크된 단어 이름 배열
    idioms: [], // 숙어 탭의 체크된 단어 이름 배열
  });

  // 단어와 숙어 데이터
  const [words, setWords] = useState(newsObject?.words || []);
  const [idioms, setIdioms] = useState(newsObject?.idioms || []);

  const { setMyVocabList, myVocabList } = useVocabStore();

  console.log(myVocabList);

  // newsObject가 변경되면 단어와 숙어 목록 업데이트
  useEffect(() => {
    setWords(newsObject?.words || []);
    setIdioms(newsObject?.idioms || []);
    // 새 단어 목록이 로드될 때 저장된 단어 상태 초기화
    setSavedWordNames({
      words: [],
      idioms: [],
    });
  }, [newsObject]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePlaySound = useCallback((word) => {
    // TTS API 사용
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  }, []);

  // 체크박스 토글 처리 함수 (메모이제이션)
  const handleSaveWord = useCallback(
    (word) => {
      if (!word || !word.name) return;

      // 현재 탭에 따라 적절한 배열 업데이트
      const type = tabValue === 0 ? "words" : "idioms";

      setSavedWordNames((prev) => {
        const currentArray = prev[type];
        const isAlreadySaved = currentArray.includes(word.name);

        return {
          ...prev,
          [type]: isAlreadySaved
            ? currentArray.filter((name) => name !== word.name) // 이미 있으면 제거
            : [...currentArray, word.name], // 없으면 추가
        };
      });
    },
    [tabValue]
  );

  // 저장 버튼 클릭 시 체크된 단어들을 저장소에 추가 (메모이제이션)
  const handleSaveAllWords = useCallback(() => {
    // 현재 탭에 따라 적절한 단어 목록과 체크 상태 선택
    const currentList = tabValue === 0 ? words : idioms;
    const currentSavedNames =
      tabValue === 0 ? savedWordNames.words : savedWordNames.idioms;

    if (!currentSavedNames || currentSavedNames.length === 0) {
      alert("저장할 항목을 선택해주세요.");
      return;
    }

    try {
      // 체크된 단어 객체들 찾기
      const checkedItems = currentList?.filter(
        (item) => item && item.name && currentSavedNames.includes(item.name)
      );

      if (!checkedItems || checkedItems.length === 0) {
        alert("저장할 항목을 선택해주세요.");
        return;
      }

      // 이미 저장된 단어는 제외하고 새로운 단어만 추가
      const newItems = checkedItems.filter(
        (item) => !myVocabList.some((vocab) => vocab.name === item.name)
      );

      if (newItems.length === 0) {
        alert(
          `선택한 ${checkedItems.length}개의 ${
            tabValue === 0 ? "단어" : "숙어"
          }은 이미 저장되어 있습니다.`
        );
        return;
      }

      // 저장소에 새 항목 추가
      setMyVocabList([...newItems]);

      // 알림 메시지
      alert(
        `${
          checkedItems.length - newItems.length === 0
            ? ""
            : "이미 저장된 " + (checkedItems.length - newItems.length) + "개의 " + (tabValue === 0 ? "단어" : "숙어") + "을 제외하고"
        } ${newItems.length}개의 ${
          tabValue === 0 ? "단어" : "숙어"
        }가 저장되었습니다.`
      );

      // 체크 상태 초기화 (현재 탭만)
      setSavedWordNames((prev) => ({
        ...prev,
        [tabValue === 0 ? "words" : "idioms"]: [],
      }));
    } catch (error) {
      console.error("단어 저장 중 오류 발생:", error);
      alert("단어 저장 중 오류가 발생했습니다.");
    }
  }, [tabValue, words, idioms, savedWordNames, myVocabList, setMyVocabList]);

  // 선택된 단어 개수 계산
  const selectedWordCount = useCallback(() => {
    const currentArray =
      tabValue === 0 ? savedWordNames.words : savedWordNames.idioms;
    return currentArray.length;
  }, [tabValue, savedWordNames]);

  // 현재 탭에 해당하는 체크된 단어 이름 배열
  const currentSavedNames =
    tabValue === 0 ? savedWordNames.words : savedWordNames.idioms;

  return (
    <Box className="words-container">
      {/* 헤더 컴포넌트 */}
      <WordsHeader
        selectedWordCount={selectedWordCount()}
        onSaveAllWords={handleSaveAllWords}
      />

      {/* 탭 컴포넌트 */}
      <WordsTabs tabValue={tabValue} onTabChange={handleTabChange} />

      {/* 단어 목록 컴포넌트 */}
      <WordsList
        tabValue={tabValue}
        words={words}
        idioms={idioms}
        savedWords={currentSavedNames}
        onSaveWord={handleSaveWord}
        onPlaySound={handlePlaySound}
        setHoveredWord={setHoveredWord}
      />
    </Box>
  );
};

export default Words;
