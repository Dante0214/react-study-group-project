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
    Modal, // Modal 컴포넌트 import
} from '@mui/material';

import './LoginPage.style.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAuthStore from '../../stores/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import GoogleLoginButton from './../../common/components/Buttons/GoogleLoginButton';
import { signInWithGooglePopup, signInWithEmail, createUser } from '../../util/firebase'; // Firebase 함수 import

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
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

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
            // 로그인 실패 처리 (예: 에러 메시지 표시)
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
        setOpenSignupModal(true);
    };

    // 회원가입 모달 닫기
    const handleCloseSignupModal = () => {
        setOpenSignupModal(false);
        setNewEmail('');
        setNewPassword('');
    };

    // 새 이메일 상태 업데이트
    const handleNewEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    // 새 비밀번호 상태 업데이트
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    // 회원가입 처리
    const handleSignup = async () => {
        if (!newEmail || !newPassword) {
            // 간단한 유효성 검사
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        try {
            const result = await createUser(newEmail, newPassword);
            console.log('회원가입 성공:', result.user);
            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            handleCloseSignupModal(); // 회원가입 성공 후 모달 닫기
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            // 회원가입 실패 처리 (예: 에러 메시지 표시)
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
                    {/* 이메일, 비밀번호 입력 폼 */}
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
                                onClick={handleOpenSignupModal} // 회원가입 모달 열기 함수 연결
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
            <Modal
                open={openSignupModal}
                onClose={handleCloseSignupModal}
                aria-labelledby="signup-modal-title"
                aria-describedby="signup-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: (theme) => theme.shadows[5],
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography id="signup-modal-title" variant="h6" component="h2">
                        회원가입
                    </Typography>
                    <FormControl fullWidth required variant="outlined" color="warning">
                        <InputLabel htmlFor="new-email">이메일 주소</InputLabel>
                        <OutlinedInput
                            id="new-email"
                            label="이메일 주소"
                            value={newEmail}
                            onChange={handleNewEmailChange}
                        />
                    </FormControl>
                    <FormControl fullWidth required variant="outlined" color="warning">
                        <InputLabel htmlFor="new-password">비밀번호</InputLabel>
                        <OutlinedInput
                            id="new-password"
                            label="비밀번호"
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: `var(--color-primary-light)`,
                            borderRadius: 2,
                            minHeight: '56px',
                            fontSize: '1.1rem',
                        }}
                        onClick={handleSignup}
                    >
                        회원가입
                    </Button>
                    <Button
                        onClick={handleCloseSignupModal}
                        sx={{
                            color: `var(--color-primary-light)`,
                            minHeight: '56px',
                            fontSize: '1.1rem',
                        }}
                    >
                        취소
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default LoginPage;
