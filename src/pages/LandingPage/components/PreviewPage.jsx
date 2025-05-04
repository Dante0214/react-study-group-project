import { Box, Typography } from '@mui/material'
import React from 'react'
import mainPageImg from "../images/main-page-img.png";
import vocaPageImg from "../images/voca-page-img.png";
import vocaTestImg from "../images/voca-test-img.png"
import { Dialog, DialogContent } from "@mui/material";

const PreviewPage = () => {
    const [openImage, setOpenImage] = React.useState(null);
      
  return (
    <div>
      <Box
  sx={{
    display: { sm: "block", md: "flex" },
    gap: 3,
    flexWrap: "wrap", 
  }}
>
  {[mainPageImg, vocaPageImg, vocaTestImg].map((img, idx) => (
    <Box
      key={idx}
      sx={{
        textAlign: "center",
        my: 1,
        flexBasis: { md: "calc(33.33% - 16px)" }, 
        maxWidth: { md: "calc(33.33% - 16px)" },
        flexGrow: 1,
      }}
    >
      <Box
        component="img"
        src={img}
        alt={`미리보기 ${idx + 1}`}
        onClick={() => setOpenImage(img)}
        sx={{
          cursor: "pointer",
          width: "100%",
          height: { xs: 200, sm: 250 },
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
        color="var(--color-primary)"
        fontWeight="bold"
        fontSize="1em"
      >
        {["뉴스 기반 학습 미리보기", "단어장 기능 미리보기", "단어 테스트 미리보기"][idx]}
      </Typography>
    </Box>
  ))}

</Box>
 {/* 미리보기 모달 */}
 <Dialog
          open={Boolean(openImage)}
          onClose={() => setOpenImage(null)}
          maxWidth="lg"
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
    </div>
  )
}

export default PreviewPage
