// LoginPage.js
import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Box,
    Button,
    Link,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Checkbox,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';

import './LoginPage.style.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAuthStore from '../../stores/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import GoogleLoginButton from './../../common/components/Buttons/GoogleLoginButton';
import { signInWithGooglePopup, signInWithEmail, createUser, updateUserProfile } from '../../util/firebase';
import SignupModal from './components/SignupModal';
import useSignupStore from '../../stores/signupStore'; // Import the signup store

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberId, setRememberId] = useState(false);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const navigate = useNavigate();
    const { isLoggedIn, setLogin } = useAuthStore();

    // 회원가입 모달 상태
    const [openSignupModal, setOpenSignupModal] = useState(false);
    const {
        setNewName,
        setNewEmail,
        setNewPassword,
        setIsNewEmailValid,
        setIsNewPasswordValid,
        setNewPasswordConfirm,
    } = useSignupStore();

    useEffect(() => {
        const storedEmail = localStorage.getItem('rememberedEmail');
        if (storedEmail) {
            setEmail(storedEmail);
            setRememberId(true);
        }
    }, []);

    if (isLoggedIn) {
        return <Navigate to="/main" replace />;
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberIdChange = (event) => {
        setRememberId(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            emailInputRef.current.focus();
            return;
        }

        if (!password) {
            passwordInputRef.current.focus();
            return;
        }

        try {
            const result = await signInWithEmail(email, password);
            console.log('이메일 로그인 성공:', result.user);
            setLogin();
            navigate('/main', { replace: true });
        } catch (error) {
            console.error('이메일 로그인 실패:', error);
            let errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = '존재하지 않는 이메일 주소입니다.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = '비밀번호가 일치하지 않습니다.';
                    break;
                case 'auth/invalid-login-credentials':
                    errorMessage = '이메일 주소 또는 비밀번호가 올바르지 않습니다.';
                    break;
            }
            alert(errorMessage);
        }

        if (rememberId) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        setEmail('');
        setPassword('');
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGooglePopup();
            const user = result.user;
            console.log('Google 로그인 성공:', user);
            setLogin();
            navigate('/main', { replace: true });
        } catch (error) {
            console.error('Google 로그인 실패:', error);
        }
    };

    // 회원가입 모달 열기
    const handleOpenSignupModal = () => {
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setNewPasswordConfirm('');
        setIsNewEmailValid(true);
        setIsNewPasswordValid(true);
        setOpenSignupModal(true);
    };

    // 회원가입 모달 닫기
    const handleCloseSignupModal = () => {
        setOpenSignupModal(false);
    };

    // 회원가입 처리
    const handleSignup = async (name, newEmail, newPassword) => {
        try {
            const result = await createUser(newEmail, newPassword);
            console.log('회원가입 성공:', result.user);
            await updateUserProfile(result.user, name);
            console.log('프로필 업데이트 성공:', result.user);
            alert(`${result?.user.displayName}님 회원가입이 완료되었습니다. 로그인해주세요.`);
            handleCloseSignupModal();
        } catch (error) {
            console.error('회원가입 실패:', error);
            let errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = '이미 사용 중인 이메일 주소입니다.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = '유효하지 않은 이메일 주소입니다.';
                    break;
                case 'auth/weak-password':
                    errorMessage = '비밀번호가 너무 짧거나 안전하지 않습니다. 6자 이상으로 입력해주세요.';
                    break;
            }
            alert(errorMessage);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <Box className="loginFormBox" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <FormControl fullWidth required margin="normal" variant="outlined" color="warning">
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
                    <FormControl fullWidth required margin="normal" variant="outlined" color="warning">
                        <InputLabel htmlFor="password">비밀번호</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            label="비밀번호"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                            inputRef={passwordInputRef}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'hide the password' : 'display the password'}
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
                        control={
                            <Checkbox
                                value="remember"
                                color="warning"
                                checked={rememberId}
                                onChange={handleRememberIdChange}
                            />
                        }
                        label="아이디 기억하기"
                    />
                    <Box sx={{ mt: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: `var(--color-primary-light)`,
                                borderRadius: 2,
                                minHeight: '56px',
                                fontSize: '1.1rem',
                            }}
                        >
                            로그인
                        </Button>
                        <GoogleLoginButton onClick={handleGoogleLogin} />
                    </Box>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid item xs>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{
                                    color: `var(--color-text-primary)`,
                                    textDecoration: 'none',
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
                                component="button"
                                variant="body2"
                                onClick={handleOpenSignupModal}
                                sx={{
                                    color: `var(--color-text-primary)`,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                회원가입
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* 회원가입 모달 */}
            <SignupModal open={openSignupModal} onClose={handleCloseSignupModal} onSignup={handleSignup} />
        </Container>
    );
};

export default LoginPage;
