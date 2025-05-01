import React from "react";
import "./LandingPage.style.css";
import { Box, Button, Typography, Grid, Container } from "@mui/material";
import bannerImg from "./images/landing-page-book.png";
import mainPageImg from "./images/main-page-img.png";
import vocaPageImg from "./images/voca-page-img.png";
import { useNavigate } from "react-router-dom";
import LandingCardItem from "./components/LandingCardItem";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Dialog, DialogContent } from "@mui/material";
import ScrollToTopButton from "../../common/components/Buttons/ScrollToTopButton";

const cardData = [
  {
    title: "습관이 되는 영어",
    description:
      "매일 관심 있는 영어 뉴스를 통해 자연스럽게 공부하는 루틴을 만드세요.",
    color: "var(--color-primary-light)",
    icon: <InfoIcon sx={{ color: "#fff", fontSize: 30 }} />,
  },
  {
    title: "AI 단어 정리",
    description:
      "AI가 기사 속 단어와 숙어를 자동으로 추출해 단어장에 정리해줘요.",
    color: "var(--color-primary)",
    icon: <StarIcon sx={{ color: "#fff", fontSize: 30 }} />,
  },
  {
    title: "손 안의 단어장",
    description:
      "내가 저장한 단어와 예문을 한눈에! 언제 어디서든 복습할 수 있어요.",
    color: "var(--color-primary-dark)",
    icon: <CheckCircleIcon sx={{ color: "#fff", fontSize: 30 }} />,
  },
];

const LandingPage = () => {
  const [openImage, setOpenImage] = React.useState(null);
  const navigate = useNavigate();
  // const isMobile = useMediaQuery("(max-width:425px)");

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing-body">
      <ScrollToTopButton />
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          height: "100%",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          borderRadius: 4,
          boxShadow: 3,
          p: 0,
          marginTop: 4,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 0, left: 25 }}>
          <Button
            variant="contained"
            onClick={handleStartClick}
            sx={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              bgcolor: "var(--color-primary)",
              color: "var(--color-text-primary)",
              fontWeight: "bold",
              zIndex: 10,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            Get started
          </Button>
        </Box>

        <Box
          sx={{
            flex: "6 1 0%",
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              zIndex: 2,
              justifyContent: "center",
              pt: { xs: 4, md: 0 },
            }}
          >
            {cardData.map((card, index) => (
              <Grid size={{ xs: 12, sm: 4 }} key={index}>
                <LandingCardItem
                  title={card.title}
                  description={card.description}
                  color={card.color}
                  icon={card.icon}
                />
              </Grid>
            ))}
          </Grid>
          ;
        </Box>
        <Box
          sx={{
            flex: "4 1 0%",
            width: "100%",
            bgcolor: "var(--color-primary)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            gap: 3,
            px: 4,
            py: 3,
          }}
        >
          {/* 메인 페이지 이미지 */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={mainPageImg}
              alt="메인페이지"
              onClick={() => setOpenImage(mainPageImg)}
              sx={{
                cursor: "pointer",
                width: { xs: "100%", sm: 300 },
                height: 200,
                borderRadius: 3,
                boxShadow: 3,
                mb: 1,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            />
            <Typography
              variant="body2"
              color="var(--color-text-primary)"
              fontWeight="bold"
            >
              뉴스 기반 학습 페이지
            </Typography>
          </Box>

          {/* 단어장 페이지 이미지 */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={vocaPageImg}
              alt="단어장페이지"
              onClick={() => setOpenImage(vocaPageImg)}
              sx={{
                cursor: "pointer",
                width: { xs: "100%", sm: 300 },
                height: 200,
                borderRadius: 3,
                boxShadow: 3,
                mb: 1,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            />
            <Typography
              variant="body2"
              color="var(--color-text-primary)"
              fontWeight="bold"
            >
              단어장 기능 미리보기
            </Typography>
          </Box>
        </Box>
        {/* 미리보기 모달 */}
        <Dialog
          open={Boolean(openImage)}
          onClose={() => setOpenImage(null)}
          maxWidth="md"
        >
          <DialogContent sx={{ p: 0 }}>
            <Box
              component="img"
              src={openImage}
              alt="미리보기 이미지"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default LandingPage;
