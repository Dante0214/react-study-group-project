import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import logo from "../../../../public/ddalkkak.ico";

const LandingBanner = () => {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          bgcolor: "var(--color-text-primary)",
          textAlign: "center",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={`${logo}`} alt="파비콘로고" srcset="" width={80} />
          <Typography variant="body1" color="#fff" fontWeight="bold">
            AI와 함께 관심 있는 영어 뉴스를 통해 자연스럽게 공부하는 루틴
          </Typography>
        </Grid>
      </Box>
    </div>
  );
};

export default LandingBanner;
