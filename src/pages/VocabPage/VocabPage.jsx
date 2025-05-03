import React, { useRef, useState } from "react";
import "./VocabPage.style.css";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { useVocabStore } from "../../stores/vocabStore";
import VocabSearchBar from "./components/VocabSearchBar";
import VocaCard from "./components/VocaCard";
import { useNavigate } from "react-router-dom";
import VocabTest from "./components/VocaTest";
import { useTestModeStore } from "../../stores/testModeStore";

const VocabPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef("");

  const { myVocabList, deleteMyVocab, clearMyVocabList } = useVocabStore();
  const { isTestMode, toggleTestMode, setTestMode } = useTestModeStore();

  // 단어 혹은 뜻 검색
  const searchedList = myVocabList.filter((item) => {
    // item.name과 item.meaning이 존재하는지 확인 후 .toLowerCase() 호출
    return (
      (item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.meaning &&
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // 삭제 핸들러
  const handleDelete = (item) => {
    deleteMyVocab(item.name, item.meaning);
  };
  // 검색 실행 함수
  const executeSearch = () => {
    setSearchQuery(searchInputRef.current.value);
  };

  // 엔터키 이벤트 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const handleNavigate = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ""; //입력값 초기화
    }
    setSearchQuery(""); // 검색 상태 초기화
    setTestMode(false);
    navigate("/vocab");
  };
  return (
    <Box
      sx={{
        backgroundColor: "var(--color-background)",
        py: 5,
      }}
    >
      <Container>
        <Box
          sx={{
            backgroundColor: "var(--color-background-alt)",
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            borderColor: "var(--color-border)",
            minHeight: "60vh",
          }}
        >
          {isTestMode ? (
            <VocabTest mode="wordToMeaning" onExit={toggleTestMode} />
          ) : (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  variant="text"
                  color="inherit"
                  onClick={handleNavigate}
                  sx={{
                    p: 0,
                    m: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    📚 단어장
                  </Typography>
                </Button>
              </Box>
              <VocabSearchBar
                searchInputRef={searchInputRef}
                onSearch={executeSearch}
                onTestToggle={toggleTestMode}
                isTest={isTestMode}
                handleKeyPress={handleKeyPress}
                onClear={clearMyVocabList}
                hasItems={myVocabList.length > 0}
              />

              {searchedList.length === 0 ? (
                <Box
                  mt={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="30vh"
                >
                  <Typography>저장된 단어가 없습니다.</Typography>
                </Box>
              ) : (
                //단어 렌더링 브레이크 포인트 따라 3,2,1
                <Box minHeight="30vh">
                  <Grid container spacing={2} mt={4} alignItems="stretch">
                    {searchedList.map((item) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.name}>
                        <VocaCard item={item} onDelete={handleDelete} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};
export default VocabPage;
