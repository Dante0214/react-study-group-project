import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  Card,
  CardContent
} from "@mui/material";

const WordCard = ({ word, isSaved, onSave, onPlaySound }) => {
  return (
    <Card className="word-item" variant="outlined">
      <CardContent className="word-item-content">
        <Box className="word-item-header">
          <Box className="word-title-container">
            <Typography 
              variant="h6" 
              className="word-text"
              onClick={() => onPlaySound(word.word)}
            >
              {word.word}
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
            onChange={() => onSave(word.id)}
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
          {word.meaning}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WordCard; 