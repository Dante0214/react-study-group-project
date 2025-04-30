import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import WordCard from "./components/WordCard";
import "./Words.style.css";

// 샘플 단어 데이터
const sampleWords = [
  {
    id: 1,
    word: "artificial intelligence",
    partOfSpeech: "noun",
    meaning: "인공지능: 학습, 추론, 자가개선 등 인간의 지능을 모방하도록 설계된 컴퓨터",
  },
  {
    id: 2,
    word: "revolutionize",
    partOfSpeech: "verb",
    meaning: "혁명적으로 바꾸다: 완전히 새롭고 개선된 방식으로 변화시키다",
  },
  {
    id: 3,
    word: "healthcare delivery",
    partOfSpeech: "noun phrase",
    meaning: "의료 서비스 제공: 환자에게 의료 서비스를 제공하는 시스템과 과정",
  },
];

const Words = () => {
  const [tabValue, setTabValue] = useState(0);
  const [savedWords, setSavedWords] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePlaySound = (word) => {
    // 실제 구현에서는 TTS API를 사용하거나 오디오 파일을 재생
    console.log(`Playing sound for ${word}`);
    
    // TTS API 사용
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleSaveWord = (id) => {
    setSavedWords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveAllWords = () => {
    // 현재 체크된 모든 단어를 저장하는 함수
    console.log("저장된 단어:", Object.keys(savedWords).filter(id => savedWords[id]));
    setSavedWords({})

  };


  // 선택된 단어 개수 계산
  const selectedWordCount = Object.values(savedWords).filter(Boolean).length;

  // 저장된 단어 목록 가져오기
  const savedWordsList = sampleWords.filter(word => savedWords[word.id]);

  return (
    <Box className="words-container">
      <Box className="words-header">
        <Typography variant="h1" className="words-title">
          📚 오늘의 단어
        </Typography>
        <Badge 
          badgeContent={selectedWordCount} 
          color="primary" 
          className="word-count-badge"
          sx={{ "& .MuiBadge-badge": { bgcolor: 'var(--color-primary)' } }}
        >
          <Button 
            variant="contained" 
            className="save-all-button"
            onClick={handleSaveAllWords}
          >
            단어 저장하기
          </Button>
        </Badge>
      </Box>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        className="words-tabs"
        variant="fullWidth"
        TabIndicatorProps={{ 
          sx: { 
            backgroundColor: 'var(--color-primary)',
            height: 3
          } 
        }}
      >
        <Tab 
          label="단어" 
          className={`word-tab ${tabValue === 0 ? 'active-tab' : ''}`}
          sx={{
            '&.Mui-selected': {
              color: 'var(--color-primary)',
              fontWeight: 600
            },
            textTransform: 'none',
            fontSize: 16,
            color: 'var(--color-text-secondary)',
            minWidth: 100
          }}
        />
        <Tab 
          label="숙어" 
          className={`word-tab ${tabValue === 1 ? 'active-tab' : ''}`}
          sx={{
            '&.Mui-selected': {
              color: 'var(--color-primary)',
              fontWeight: 600
            },
            textTransform: 'none',
            fontSize: 16,
            color: 'var(--color-text-secondary)',
            minWidth: 100
          }}
        />
      </Tabs>

      <Box className="words-content">
        {tabValue === 0 && (
          <Box className="words-list">
            {sampleWords.map((word) => (
              <WordCard 
                key={word.id}
                word={word}
                isSaved={!!savedWords[word.id]}
                onSave={handleSaveWord}
                onPlaySound={handlePlaySound}
              />
            ))}
          </Box>
        )}
        {tabValue === 1 && (
          <Box className="words-empty">
            <Typography variant="body1">
              준비 중입니다...
            </Typography>
          </Box>
        )}
        {tabValue === 2 && (
          <Box className="words-empty">
            <Typography variant="body1">
              준비 중입니다...
            </Typography>
          </Box>
        )}
      </Box>


    </Box>
  );
};

export default Words; 