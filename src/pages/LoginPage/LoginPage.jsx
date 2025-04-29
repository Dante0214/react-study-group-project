import React, { useState, useRef } from 'react';
import { Container, Box, TextField, Button, Typography, Link, FormControlLabel, Checkbox, Grid } from '@mui/material';
import './LoginPage.style.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

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

        console.log('로그인 시도:', { email, password });
        // 실제 로그인 처리 로직 (API 호출 등)
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <Box className="loginFormBox" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        color="warning"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                        inputRef={emailInputRef}
                    />
                    <TextField
                        color="warning"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        inputRef={passwordInputRef}
                    />
                    <FormControlLabel control={<Checkbox value="remember" color="warning" />} label="아이디 기억하기" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: `var(--color-primary-light)` }}
                    >
                        로그인
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{ color: `var(--color-text-primary)`, textDecoration: 'none' }}
                            >
                                비밀번호를 잊으셨나요?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{ color: `var(--color-text-primary)`, textDecoration: 'none' }}
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
