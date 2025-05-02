import React, { useRef, useState } from "react";
import "./VocabPage.style.css";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { useVocabStore } from "../../stores/vocabStore";
import VocabSearchBar from "./components/VocabSearchBar";
import VocaCard from "./components/VocaCard";
import { useNavigate } from "react-router-dom";
import VocabTest from "./components/VocaTest";

const VocabPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef("");
  const [isTest, setIsTest] = useState(false);
  const { myVocabList, deleteMyVocab, clearMyVocabList } = useVocabStore();

  // 단어 혹은 뜻 검색
  const searchedList = myVocabList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.includes(searchQuery)
  );

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

  //테스트모드 상태관리
  const toggleTestMode = () => {
    setIsTest((prev) => !prev);
  };

  const handleNavigate = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ""; //입력값 초기화
    }
    setSearchQuery(""); // 검색 상태 초기화
    setIsTest(false);
    navigate("/vocab");
  };

  // console.log(checkedList);
  // console.log(checkedVocab);
  console.log(myVocabList);
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
          <Button
            variant="text" // 텍스트 형태의 버튼
            color="inherit" // 부모의 텍스트 색상 상속
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

          {isTest ? (
            <VocabTest mode="wordToMeaning" onExit={toggleTestMode} />
          ) : (
            <>
              <VocabSearchBar
                searchInputRef={searchInputRef}
                onSearch={executeSearch}
                onTestToggle={toggleTestMode}
                isTest={isTest}
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
