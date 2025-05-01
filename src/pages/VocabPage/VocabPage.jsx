import React, { useEffect, useRef, useState } from "react";
import "./VocabPage.style.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useVocabStore } from "../../stores/vocabStore";
import VocabSearchBar from "./components/VocabSearchBar";
import VocaCard from "./components/VocaCard";
import { useNavigate } from "react-router-dom";

const mockVocabList = [
  {
    id: 1,
    word: "abandon",
    meaning: "버리다",
    example: "He abandoned the project.",
  },
  {
    id: 2,
    word: "benevolent",
    meaning: "자비로운",
    example: "She was a benevolent leader.",
  },
  {
    id: 3,
    word: "contemplate",
    meaning: "숙고하다",
    example: "He contemplated his future.",
  },
  {
    id: 4,
    word: "diligent",
    meaning: "근면한",
    example: "She is a diligent worker.",
  },
  {
    id: 5,
    word: "eloquent",
    meaning: "능변의",
    example: "He gave an eloquent speech.",
  },
  {
    id: 6,
    word: "fervent",
    meaning: "열렬한",
    example: "She had a fervent desire to succeed.",
  },
  {
    id: 7,
    word: "grave",
    meaning: "심각한",
    example: "This is a grave situation.",
  },
  {
    id: 8,
    word: "hilarious",
    meaning: "매우 재미있는",
    example: "The movie was hilarious.",
  },
  {
    id: 9,
    word: "immense",
    meaning: "거대한",
    example: "The building is of immense size.",
  },
  {
    id: 10,
    word: "jubilant",
    meaning: "기뻐하는",
    example: "The team was jubilant after winning.",
  },
  {
    id: 11,
    word: "keen",
    meaning: "날카로운",
    example: "He has a keen intellect.",
  },
  {
    id: 12,
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
  const { vocabList, setVocabList, checkedVocab, toggleChecked, clearChecked } =
    useVocabStore();

  // 초기에 목데이터 넣기
  useEffect(() => {
    setVocabList(mockVocabList);
    const initialCheckedVocab = mockVocabList.map((item) => item.id);

    useVocabStore.setState({ checkedVocab: initialCheckedVocab });
  }, []);

  // 체크된 단어 정보만 필터링
  const checkedList = vocabList.filter((item) =>
    checkedVocab.includes(item.id)
  );
  // 단어 혹은 뜻 검색
  const searchedList = checkedList.filter(
    (item) =>
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.includes(searchQuery)
  );

  // 체크박스 상태관리
  const handleDelete = (item) => {
    toggleChecked(item);
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
        backgroundColor: "var(--color-background-alt)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container>
        <Box
          sx={{
            backgroundColor: "var(--color-background)",
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            borderColor: "var(--color-border)",
          }}
        >
          <Typography variant="h4" onClick={handleNavigate} gutterBottom>
            📚 단어장
          </Typography>
          <VocabSearchBar
            searchInputRef={searchInputRef}
            onSearch={executeSearch}
            onTestToggle={toggleTestMode}
            isTest={isTest}
            handleKeyPress={handleKeyPress}
            onClear={clearChecked}
            hasItems={checkedVocab.length > 0}
          />

          {searchedList.length === 0 ? (
            <Typography>저장된 단어가 없습니다.</Typography>
          ) : (
            //단어 렌더링 브레이크 포인트 따라 3,2,1
            <Grid container spacing={2} mt={4} alignItems="stretch">
              {searchedList.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
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
