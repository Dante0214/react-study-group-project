import React from "react";
import "./LandingPage.style.css";
import { Box, Button, Typography, Grid, Container } from "@mui/material";
import bannerImg from "./images/banner.png";
import LandingTextBox from "./components/LandingTextBox";
import WavePattern from "./components/WavePattern";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        bgcolor: "var(--color-text-primary)",
        borderRadius: 4,
        p: 4,
        boxShadow: 3,
        position: "relative",
        mt: 6,
      }}
    >
      <Button
        onClick={handleLoginClick}
        variant="contained"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          bgcolor: "var(--color-primary)",
          color: "var(--color-text-primary)",
          fontWeight: "bold",
          "&:hover": {
            bgcolor: "var(--color-primary-dark)",
          },
        }}
      >
        로그인
      </Button>
      <Box
        component="img"
        src={bannerImg}
        alt="학습 이미지"
        sx={{
          width: "100%",
          height: { xs: 200, md: 400 },
          objectFit: "cover",
          borderRadius: 2,
          mb: 4,
          mt: 6,
        }}
      />
      <Box sx={{ position: "relative", height: "300px", pb: 0 }}>
        <Grid
          container
          spacing={2}
          sx={{ position: "relative", zIndex: 2, height: "100%" }}
          className="borders"
        >
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%" }}>
            <LandingTextBox type="ko" />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <LandingTextBox type="en" />
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            bottom: -6,
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
        >
          <WavePattern className="landing-wave" />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
