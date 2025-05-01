import React from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import "./News.style.css";

const News = ({
  newsObject,
  topic,
  setTopic,
  isLoading,
  hoveredWord,
  loadNews,
}) => {
  // 데이터가 제대로 있는지 확인
  const hasNewsData = newsObject && newsObject.title && newsObject.content;

  // 본문에서 hoveredWord와 일치하는 부분을 하이라이트하는 함수
  const highlightText = (text, wordToHighlight) => {
    if (!text || !wordToHighlight) {
      return text;
    }

    try {
      // 대소문자 구분 없이 검색하기 위한 정규표현식
      const regex = new RegExp(`(${wordToHighlight})`, "gi");

      // 일치하는 부분을 찾아 배열로 분리
      const parts = text.split(regex);

      // 일치하는 부분에 styled span 추가
      return parts.map((part, index) => {
        if (part.toLowerCase() === wordToHighlight.toLowerCase()) {
          return (
            <span key={index} className="highlighted-word">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      });
    } catch (error) {
      console.error("강조 처리 오류:", error);
      return text;
    }
  };

  // 버튼 클릭 핸들러
  const handleLoadNewsClick = () => {
    loadNews(topic);
  };

  // 토픽 표시 텍스트 (토픽이 Any인 경우 "오늘의" 표시)
  const topicDisplayText = topic === "Any" ? "오늘의" : topic;

  return (
    <Box className="news-container">
      <Box className="news-title-container">
        <Typography variant="h1" className="news-title">
          📚 오늘의 기사
        </Typography>

        <FormControl sx={{ minWidth: 100, marginLeft: 1 }}>
          <InputLabel id="topic-select-label">Topic</InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            sx={{ userSelect: "none" }}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            label="Topic"
            variant="outlined"
          >
            <MenuItem value="Any">Any</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Politics">Politics</MenuItem>
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="news-content">
        {isLoading ? (
          <Box className="news-loading-container">
            <CircularProgress
              className="news-loading-spinner"
              sx={{ color: "var(--color-primary)" }}
            />
            <Typography variant="body2" className="news-loading-text">
              기사를 불러오는 중입니다...
            </Typography>
          </Box>
        ) : hasNewsData ? (
          <div className="news-content-container">
            <h2 className="news-content-title">{newsObject.title}</h2>
            <p className="news-content-text">
              {highlightText(newsObject.content, hoveredWord)}
            </p>
            <div className="news-content-footer">
              <span>
                <p className="news-date">{newsObject.date}</p>
              </span>
              <span>
                <span className="news-source">{newsObject.source.name}</span>{" "}
                <a
                  href={newsObject.source.url}
                  className="news-source-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  링크
                </a>
              </span>
            </div>
          </div>
        ) : (
          <Box className="news-empty-container">
            <Typography variant="body1" className="news-empty-text">
              기사를 불러올 수 없습니다. 다시 시도해 주세요.
            </Typography>
          </Box>
        )}
      </Box>
      <Button
        className="news-button"
        variant="contained"
        onClick={handleLoadNewsClick}
      >
        <span className="button-icon">🗞️</span>
        {topicDisplayText} 기사 불러오기
      </Button>
    </Box>
  );
};

export default News;
