import React, { useState, useRef } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Link,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Checkbox,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import logo from "../../assets/yeonguk-logo.png";
import "./LoginPage.style.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useAuthStore from "../../stores/authStore";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, setLogin } = useAuthStore();

  // 로그인 상태이면 메인 페이지로 리디렉트f
  if (isLoggedIn) {
    return <Navigate to="/main" replace />;
  }

  //패스워드 보기 토글
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //로그인 기능
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      emailInputRef.current.focus();
      return;
    }

    if (!password) {
      passwordInputRef.current.focus();
      return;
    }

    console.log("로그인 시도:", { email, password });
    // 실제 로그인 처리 로직
    setLogin();
    // 로그인 성공 시 메인페이지 이동, 로그인 성공시 로그인 페이지로 돌아가기 방지
    navigate("/main", { replace: true });
    // 폼 제출 후 입력 필드 비우기
    setEmail("");
    setPassword("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <figure>
          <img src={logo} alt="딸깍영어 로고" style={{ maxWidth: "250px" }} />
        </figure>
        {/* <Typography component="h1" variant="h5">
                    로그인
                </Typography> */}
        <Box
          className="loginFormBox"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormControl
            fullWidth
            required
            margin="normal"
            variant="outlined"
            color="warning"
          >
            <InputLabel htmlFor="email">이메일 주소</InputLabel>
            <OutlinedInput
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              inputRef={emailInputRef}
            />
          </FormControl>
          <FormControl
            fullWidth
            required
            margin="normal"
            variant="outlined"
            color="warning"
          >
            <InputLabel htmlFor="password">비밀번호</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="비밀번호"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              inputRef={passwordInputRef}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="warning" />}
            label="아이디 기억하기"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: `var(--color-primary-light)` }}
          >
            로그인
          </Button>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: `var(--color-text-primary)`,
                  textDecoration: "none",
                }}
              >
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item xs>
              |
            </Grid>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: `var(--color-text-primary)`,
                  textDecoration: "none",
                }}
              >
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
