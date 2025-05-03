import React from "react";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";

const VocabTestPrep = ({ startTest, toggleMode, mode, onExit }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 4,
          maxWidth: 400,
          width: "100%",
          mx: "auto",
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            py: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>단어 시험</Typography>

          <Stack
            spacing={1.5}
            sx={{ width: "100%" }}
            direction={{ xs: "column", sm: "row" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "var(--color-primary-dark)",
                },
              }}
              onClick={startTest}
              fullWidth
            >
              시험 시작
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "var(--color-primary-dark)",
                },
                whiteSpace: "nowrap",
              }}
              onClick={toggleMode}
              fullWidth
            >
              모드 전환 (
              {mode === "wordToMeaning" ? "뜻 맞추기" : "단어 맞추기"})
            </Button>
          </Stack>
          <Box>
            <Button
              sx={{
                marginTop: 3,

                color: "var(--color-text-secondary)",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "var(--color-text-secondary)",
                },
              }}
              variant="text"
              onClick={onExit}
              fullWidth
            >
              돌아가기
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default VocabTestPrep;
