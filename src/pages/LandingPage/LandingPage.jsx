import React from "react";
import "./LandingPage.style.css";
import { Box, Typography, Grid, Container } from "@mui/material";
import LandingCardItem from "./components/LandingCardItem";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScrollToTopButton from "../../common/components/Buttons/ScrollToTopButton";
import logoWhite from "./images/logo-white.png";
import iphoneMain from "./images/white-iphone.png";
import LandingBanner from "./components/LandingBanner";
import GetStartedButton from "./components/GetStartedButton";
import PreviewPage from "./components/PreviewPage";



const cardData = [
  {
    title: "습관이 되는 영어",
    description:
      "매일 관심있는 영어 뉴스를 통해 습관처럼 공부하는 루틴을 만드세요.",
    color: "var(--color-text-primary)",
    icon: <InfoIcon sx={{ color: "#fff", fontSize: 30 }} />,
  },
  {
    title: "AI 단어 정리",
    description: "AI가 기사 속 단어들을 자동으로 추출해 리스트로 정리해줘요.",
    color: "var(--color-text-primary)",
    icon: <StarIcon sx={{ color: "#fff", fontSize: 30 }} />,
  },
  {
    title: "손 안의 단어장",
    description:
      "내가 저장한 단어와 예문을 한눈에! 언제 어디서든 복습할 수 있어요.",
    color: "var(--color-text-primary)",
    icon: <CheckCircleIcon sx={{ color: "#fff", fontSize: 30 }} />,
  },
];

const LandingPage = () => {
  

  return (
    <div>
      <ScrollToTopButton />
      <Container
        maxWidth="full"
        disableGutters
        sx={{
          height: "100%",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          p: 0,
          position: "relative",
        }}
      >
        <LandingBanner />
        <GetStartedButton />
        <Box
          sx={{
            flex: "5 1 0%",
            minHeight: { xs: "380px", md: "500px" },
            backgroundColor: "var(--color-primary)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          {/* 버전 2 배너 영역 */}
          <Grid
            container
            sx={{ width: { xs: "100%", md: "60%" } }}
            display="flex"
            justifyContent="center"
            spacing={3}
          >
            <Grid
              size={{ md: 6, sm: 12 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box textAlign="left">
                <Typography variant="body1" color="#Fff" fontWeight="bold">
                  현명한 사람은 꼭 사용하는 AI
                </Typography>
                <Typography
                  variant="body1"
                  color="#Fff"
                  fontWeight="bolder"
                  fontSize="2em"
                >
                  대한민국 1위
                </Typography>
                <Typography
                  variant="body1"
                  color="#Fff"
                  fontWeight="bolder"
                  sx={{
                    fontSize: { xs: "1.5em", md: "2em" },
                    whiteSpace: "nowrap",
                  }}
                >
                  영단어 마스터 플랫폼
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                >
                  <img
                    src={`${logoWhite}`}
                    alt="파비콘화이트로고"
                    srcset=""
                    width={60}
                    color="#fff"
                  />
                  <Typography
                    variant="body1"
                    color="#Fff"
                    fontWeight="bolder"
                    fontSize="2.5em"
                    marginLeft="25px"
                    sx={{
                      transform: "scaleX(1.2)",
                      display: "inline-block",
                    }}
                  >
                    딸깍영어
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/*아이폰 목업 영역 */}
            <Grid
              size={{ md: 6 }}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-start",
                position: "relative",
                minHeight: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: { md: "150px" },
                  left: {md: '20px'},
                  cursor: "pointer",
                  transition: "all 0.4s ease-in-out",
                  borderRadius:'56px',
                  boxShadow:2,
                  "&:hover": {
                    top: { md: "-90px" },
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                }}
              >
                <img src={`${iphoneMain}`} alt="아이폰목업" width="300px" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            flex: "5 1 0%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            gap: 3,
            px: 4,
            py: 3,
            position: "relative",
            zIndex: "10",
            bgcolor: "#fff",
          }}
        >
       
          {/*버전1 카드 데이터 */}
          <Box sx={{ marginTop: { xs: 0, md: 2 } }}>
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
          </Box>
 
         
          <Typography
                  variant="body2"
                  color="var(--color-primary)"
                  fontWeight="bolder"
                  sx={{
                    fontSize: { xs: "1em", md: "1.5em" },
                    whiteSpace: "nowrap",
                  }}
                >

                 🤔 구경하기
                </Typography>
          <PreviewPage/>
     
        </Box>
       
      </Container>
    </div>
  );
};

export default LandingPage;
