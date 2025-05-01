import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const LandingCardItem = ({ icon, color, title, description }) => {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "visible" /* 아이콘이 튀어나오도록 오버플로우 표시 */,
        textAlign: "center",
        bgcolor: "#fff" /* 카드 배경색: 흰색 (필요에 따라 변경 가능) */,
      }}
    >
      {/* 상단 중앙 아이콘 (스티커) */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {typeof icon === "string" ? (
          <Box component="img" src={icon} alt="" sx={{ width: "60%" }} />
        ) : (
          icon
        )}
      </Box>

      {/* 카드 내용 영역 */}
      <CardContent
        sx={{
          pt: 6,
          wordBreak: "keep-all",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default LandingCardItem;
