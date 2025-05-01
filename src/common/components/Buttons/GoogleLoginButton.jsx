import { Button, Typography, Box } from "@mui/material";
import GoogleLogo from "./image/google-G-logo.png"; // 이미지 경로에 맞게 수정

const GoogleLoginButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        width: "100%",
        borderRadius: 2,
        py: 1.2,
        px: 2,
        textTransform: "none",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        zIndex: 100,
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box
        component="img"
        src={GoogleLogo}
        alt="Google Logo"
        sx={{ width: 20, height: 20 }}
      />
      <Typography variant="body2" fontWeight="bold">
        Google 계정으로 시작하기
      </Typography>
    </Button>
  );
};

export default GoogleLoginButton;
