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

const News = ({ newsObject, topic, setTopic, isLoading }) => {
  // 데이터가 제대로 있는지 확인
  const hasNewsData = newsObject && newsObject.title && newsObject.content;

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
            <MenuItem value="Any">
              <em>Any</em>
            </MenuItem>
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
            <p className="news-content-text">{newsObject.content}</p>
            <div className="news-content-footer">
              <span>
                <p className="news-date">{newsObject.date}</p>
              </span>
              <span>
                <span className="news-source">{newsObject.source.name}</span>
                {' '}
                <a href={newsObject.source.url} className="news-source-link">
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
      <Button className="news-button" variant="contained">
        <span className="button-icon">🗞️</span>
        오늘의 기사 불러오기
      </Button>
    </Box>
  );
};

export default News;
