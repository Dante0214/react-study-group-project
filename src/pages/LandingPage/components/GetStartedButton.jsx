import { Box, Button, Tooltip } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";

const FixedTooltipButton = () => {
const navigate = useNavigate()
    const handleStartClick=()=>{
        navigate('/login')
    }
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
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)", 
          zIndex: 20,
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
            px: 3,
            py: 1.5,
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

export default FixedTooltipButton;
