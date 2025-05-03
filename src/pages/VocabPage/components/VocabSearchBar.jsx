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
      <Button
        sx={{
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "var(--color-primary-dark)",
          },
        }}
        variant="contained"
        onClick={onSearch}
        startIcon={<SearchIcon />}
      >
        검색
      </Button>
    </Stack>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "var(--color-primary-dark)",
          },
        }}
        onClick={() => {
          if (window.confirm("정말 전체 삭제하시겠습니까?")) {
            onClear();
          }
        }}
        disabled={!hasItems}
      >
        전체 삭제
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "var(--color-primary-dark)",
          },
        }}
        onClick={onTestToggle}
        disabled={!hasItems}
      >
        테스트
      </Button>
    </Stack>
  </Stack>
);

export default VocabSearchBar;
