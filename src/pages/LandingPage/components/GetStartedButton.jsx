import { Box, Button, Tooltip } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const GetStartedButton = () => {
  const navigate = useNavigate();
  const [atBottom, setAtBottom] = useState(false);

  const handleStartClick = () => {
    navigate("/login");
  };


  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      setAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Tooltip
      title="3초 회원가입! 그것도 귀찮아? 구글로 시작해봐!"
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "var(--color-primary)",
            color: "#fff",
            fontSize:{md:'15px'},
            whiteSpace: "nowrap",
            fontWeight:'bold'
          },
        },
        arrow: {
          sx: {
            color: "var(--color-primary)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: atBottom ? "unset" : "30px",
          top: atBottom ? "30px" : "unset",
          zIndex: 20,
          transition: "all 0.4s ease-in-out", 
        }}
      >
        <Button
          onClick={handleStartClick}
          variant="contained"
          startIcon={<ThumbUpAltIcon />}
          sx={{
            bgcolor: "var(--color-text-primary)",
            color: "white",
            fontWeight: "bold",
            fontSize:{md:'24px'},
            px: {xs:3,md:5},
            py: {xs:1.5,md:3},
            borderRadius: "999px",
            boxShadow: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
          }}
        >
          딸깍, 한 번에 가입하고 시작
        </Button>
      </Box>
    </Tooltip>
  );
};

export default GetStartedButton;
