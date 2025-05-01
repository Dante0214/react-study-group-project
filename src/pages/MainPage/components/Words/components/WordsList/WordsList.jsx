import React from "react";
import { Box, Typography } from "@mui/material";
import WordCard from "../WordCard/WordCard";
import "./WordsList.style.css";

const WordsList = ({ 
  tabValue, 
  words, 
  idioms, 
  savedWords, 
  onSaveWord, 
  onPlaySound,
  setHoveredWord
}) => {
  // 단어 배열이 비어있는지 확인
  const isWordsEmpty = !words || words.length === 0;
  // 숙어 배열이 비어있는지 확인
  const isIdiomsEmpty = !idioms || idioms.length === 0;

  return (
    <Box className="words-content">
      {tabValue === 0 && (
        <Box className="words-list">
          {isWordsEmpty ? (
            <Box className="words-empty">
              <Typography variant="body1">
                단어 표현이 없습니다
              </Typography>
            </Box>
          ) : (
            words.map((word) => (
              <WordCard 
                key={word?.name}
                word={word}
                isSaved={savedWords.includes(word?.name)}
                onSave={onSaveWord}
                onPlaySound={onPlaySound}
                setHoveredWord={setHoveredWord}
              />
            ))
          )}
        </Box>
      )}
      {tabValue === 1 && (
        <Box className="idioms-list">
          {isIdiomsEmpty ? (
            <Box className="words-empty">
              <Typography variant="body1">
                숙어 표현이 없습니다
              </Typography>
            </Box>
          ) : (
            idioms.map((idiom) => (
              <WordCard 
                key={idiom?.name}
                word={idiom}
                isSaved={savedWords.includes(idiom?.name)}
                onSave={onSaveWord}
                onPlaySound={onPlaySound}
                setHoveredWord={setHoveredWord}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default WordsList; 