import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const VocabSearchBar = ({
  searchInputRef,
  onSearch,
  onTestToggle,
  isTest,
  onClear,
  hasItems,
}) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={2}
    justifyContent="space-between"
  >
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <TextField
        placeholder="단어 검색"
        variant="outlined"
        size="small"
        inputRef={searchInputRef}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button variant="contained" onClick={onSearch} startIcon={<SearchIcon />}>
        검색
      </Button>
    </Stack>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onClear}
        disabled={!hasItems}
      >
        전체 삭제
      </Button>
      <Button
        variant={isTest ? "outlined" : "contained"}
        color="warning"
        onClick={onTestToggle}
      >
        {isTest ? "돌아가기" : "테스트 모드"}
      </Button>
    </Stack>
  </Stack>
);

export default VocabSearchBar;
