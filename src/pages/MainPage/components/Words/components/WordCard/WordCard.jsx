import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  Card,
  CardContent
} from "@mui/material";
import "./WordCard.style.css";

const WordCard = ({ word, isSaved, onSave, onPlaySound, setHoveredWord }) => {
  
  // 마우스가 WordCard 위에 올라갔을 때 호출
  const handleMouseEnter = () => {
    if (word?.name) {
      setHoveredWord(word.name);
    }
  };

  // 마우스가 WordCard를 벗어났을 때 호출
  const handleMouseLeave = () => {
    setHoveredWord(null);
  };
  
  return (
    <Card 
      className="word-item" 
      variant="outlined"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className="word-item-content">
        <Box className="word-item-header">
          <Box className="word-title-container">
            <Typography 
              variant="h6" 
              className="word-text"
              onClick={() => onPlaySound(word.word)}
            >
              {word.name}
              <span 
                className="sound-emoji"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlaySound(word.word);
                }}
              >
                🔊
              </span>
            </Typography>
          </Box>
          <Checkbox
            checked={isSaved}
            onChange={() => onSave(word.name)}
            className="word-checkbox"
            sx={{
              '&.Mui-checked': {
                color: 'var(--color-primary)',
              },
              '&:hover': {
                backgroundColor: 'rgba(250, 182, 71, 0.08)',
              }
            }}
          />
        </Box>
        <Typography variant="body2" className="part-of-speech">
          {word.partOfSpeech}
        </Typography>
        <Typography variant="body1" className="word-meaning">
          <span className="word-class">{word.class}</span> {word.meaning}
        </Typography>
        <Typography variant="body2" className="word-example">
          {word.example}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WordCard; 