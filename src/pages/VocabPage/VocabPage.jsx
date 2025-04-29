import React, { useEffect } from "react";
import "./VocabPage.style.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { useVocabStore } from "../../stores/vocabStore";

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
  const { vocabList, setVocabList, checkedVocab, toggleChecked, clearChecked } =
    useVocabStore();

  // 초기에 목데이터 넣기
  useEffect(() => {
    setVocabList(mockVocabList);
    const initialCheckedVocab = mockVocabList.map((item) => item.word);

    useVocabStore.setState({ checkedVocab: initialCheckedVocab });
  }, []);

  // 체크된 단어 정보만 필터링
  const checkedList = vocabList.filter((item) =>
    checkedVocab.includes(item.word)
  );
  // 체크박스 상태관리
  const handleCheckboxChange = (word) => {
    toggleChecked(word);
  };

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
          <Typography variant="h4" gutterBottom>
            📚 단어장
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearChecked}
              disabled={checkedVocab.length === 0}
            >
              전체 선택 해제
            </Button>
          </Box>
          {checkedList.length === 0 ? (
            <Typography>저장된 단어가 없습니다.</Typography>
          ) : (
            //단어 렌더링 브레이크 포인트 따라 3,2,1
            <Grid container spacing={2} mt={4}>
              {checkedList.map((item) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={item.word || item.id}
                >
                  <Card
                    variant="outlined"
                    sx={{ borderColor: "var(--color-border)" }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="var(--color-text-primary)"
                        >
                          {item.word}
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "var(--color-primary)",
                                "&.Mui-checked": {
                                  color: "var(--color-primary-dark)",
                                },
                              }}
                              checked={checkedVocab.includes(item.word)}
                              onChange={() => handleCheckboxChange(item.word)}
                              color="var(--color-primary-dark)"
                            />
                          }
                        />
                      </Box>
                      <Typography color="var(--color-text-disabled)">
                        {item.meaning}
                      </Typography>
                      <Typography
                        color="var(--color-text-secondary)"
                        sx={{ mt: 1, fontStyle: "italic" }}
                      >
                        {item.example}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {/* <Button variant="outlined" color="secondary" onClick={clearChecked}>
            전체 체크 해제
          </Button> */}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};
export default VocabPage;
