import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const VocaCard = ({ item, onDelete }) => {
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
          <Typography variant="h6" color="var(--color-text-primary)">
            {item.word}
          </Typography>
          <Button
            variant="text"
            sx={{
              color: "var(--color-primary)",
              "&:hover": {
                color: "var(--color-primary-dark)",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => onDelete(item.id)}
          >
            삭제
          </Button>
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
  );
};

export default VocaCard;
