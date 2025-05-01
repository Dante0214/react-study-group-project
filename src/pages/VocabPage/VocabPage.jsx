import React, { useEffect, useRef, useState } from "react";
import "./VocabPage.style.css";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { useVocabStore } from "../../stores/vocabStore";
import VocabSearchBar from "./components/VocabSearchBar";
import VocaCard from "./components/VocaCard";
import { useNavigate } from "react-router-dom";

const mockVocabList = [
  {
    class: "명사",
    word: "abandon",
    meaning: "버리다",
    example: "He abandoned the project.",
  },
  {
    class: "명사",
    word: "benevolent",
    meaning: "자비로운",
    example: "She was a benevolent leader.",
  },
  {
    class: "명사",
    word: "contemplate",
    meaning: "숙고하다",
    example: "He contemplated his future.",
  },
  {
    class: "명사",
    word: "diligent",
    meaning: "근면한",
    example: "She is a diligent worker.",
  },
  {
    class: "명사",
    word: "eloquent",
    meaning: "능변의",
    example: "He gave an eloquent speech.",
  },
  {
    class: "명사",
    word: "fervent",
    meaning: "열렬한",
    example: "She had a fervent desire to succeed.",
  },
  {
    class: "명사",
    word: "grave",
    meaning: "심각한",
    example: "This is a grave situation.",
  },
  {
    class: "명사",
    word: "hilarious",
    meaning: "매우 재미있는",
    example: "The movie was hilarious.",
  },
  {
    class: "명사",
    word: "immense",
    meaning: "거대한",
    example: "The building is of immense size.",
  },
  {
    class: "명사",
    word: "jubilant",
    meaning: "기뻐하는",
    example: "The team was jubilant after winning.",
  },
  {
    class: "명사",
    word: "keen",
    meaning: "날카로운",
    example: "He has a keen intellect.",
  },
  {
    class: "명사",
    word: "lament",
    meaning: "애도하다",
    example: "They lamented the loss of their friend.",
  },
];

const VocabPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef("");
  const [isTest, setIsTest] = useState(false);
  const { myVocabList, setMyVocabList, deleteMyVocab, clearMyVocabList } =
    useVocabStore();

  // 초기에 목데이터 넣기
  useEffect(() => {
    setMyVocabList(mockVocabList);
  }, [setMyVocabList]);

  // 단어 혹은 뜻 검색
  const searchedList = myVocabList.filter(
    (item) =>
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.includes(searchQuery)
  );

  // 삭제 핸들러
  const handleDelete = (item) => {
    deleteMyVocab(item);
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
    navigate("/vocab");
  };

  // console.log(checkedList);
  // console.log(checkedVocab);

  return (
    <Box
      sx={{
        backgroundColor: "var(--color-background)",
        minHeight: "100vh",
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
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="300px"
            >
              <Typography>저장된 단어가 없습니다.</Typography>
            </Box>
          ) : (
            //단어 렌더링 브레이크 포인트 따라 3,2,1
            <Grid container spacing={2} mt={4} alignItems="stretch">
              {searchedList.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.word}>
                  <VocaCard item={item} onDelete={handleDelete} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};
export default VocabPage;
