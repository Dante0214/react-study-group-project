import React from "react";
import { Box, Typography, Button, Badge } from "@mui/material";
import "./WordsHeader.style.css";

const WordsHeader = ({ selectedWordCount, onSaveAllWords }) => {
  return (
    <Box className="words-header">
      <Typography variant="h1" className="words-title">
      📙 오늘의 단어
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
          onClick={onSaveAllWords}
        >
          단어 저장하기
        </Button>
      </Badge>
    </Box>
  );
};

export default WordsHeader; 