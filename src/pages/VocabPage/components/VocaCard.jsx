import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useCallback } from "react";

const VocaCard = ({ item, onDelete }) => {
  const handlePlaySound = useCallback((word) => {
    // TTS API 사용
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  }, []);
  return (
    <Card
      variant="outlined"
      sx={{ borderColor: "var(--color-border)", height: "100%" }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              color="var(--color-text-primary)"
              sx={{ mr: 0.5 }}
            >
              {item.name}
            </Typography>
            <Box
              component="span"
              sx={{
                fontSize: "14px",
                lineHeight: 1,
                cursor: "pointer",
                verticalAlign: "middle",
                display: "inline-flex",
                alignItems: "center",
                // ← 여백 설정
              }}
              onClick={(e) => {
                e.stopPropagation();
                handlePlaySound(item.name);
              }}
            >
              🔊
            </Box>
          </Box>

          <Button
            variant="text"
            sx={{
              color: "var(--color-primary)",
              "&:hover": {
                color: "var(--color-primary-dark)",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => onDelete(item)}
          >
            삭제
          </Button>
        </Box>
        <Typography
          variant="body2"
          color="var(--color-text-disabled)"
          gutterBottom
        >
          {item.class}
        </Typography>
        <Typography variant="body3" color="var(--color-text-primary)">
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
  );
};

export default VocaCard;
