// SignupModal.js
import React from 'react';
import { Box, Button, FormControl, InputLabel, OutlinedInput, Typography, Modal, FormHelperText } from '@mui/material';
import useSignupStore from '../../../stores/signupStore';

const SignupModal = ({ open, onClose, onSignup }) => {
    const {
        newName,
        newEmail,
        newPassword,
        newPasswordConfirm, // 비밀번호 확인 상태
        isNewEmailValid,
        isNewPasswordValid,
        isNewPasswordConfirmValid, // 비밀번호 확인 유효성 상태
        setNewName,
        setNewEmail,
        setNewPassword,
        setNewPasswordConfirm, // 비밀번호 확인 상태 업데이트 함수
        setIsNewEmailValid,
        setIsNewPasswordValid,
        setIsNewPasswordConfirmValid, // 비밀번호 확인 유효성 업데이트 함수
    } = useSignupStore();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 6;
    };

    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNewEmailChange = (event) => {
        const newEmailValue = event.target.value;
        setNewEmail(newEmailValue);
        setIsNewEmailValid(isValidEmail(newEmailValue));
    };

    const handleNewPasswordChange = (event) => {
        const newPasswordValue = event.target.value;
        setNewPassword(newPasswordValue);
        setIsNewPasswordValid(isPasswordValid(newPasswordValue));
        // 비밀번호가 변경되면 비밀번호 확인 유효성 다시 검사
        setIsNewPasswordConfirmValid(newPasswordValue === newPasswordConfirm);
    };

    const handleNewPasswordConfirmChange = (event) => {
        const newPasswordConfirmValue = event.target.value;
        setNewPasswordConfirm(newPasswordConfirmValue);
        setIsNewPasswordConfirmValid(newPassword === newPasswordConfirmValue);
    };

    const handleSignupClick = () => {
        if (
            !newName ||
            !newEmail ||
            !newPassword ||
            !newPasswordConfirm ||
            !isNewEmailValid ||
            !isNewPasswordValid ||
            !isNewPasswordConfirmValid
        ) {
            alert('이름, 이메일, 비밀번호, 비밀번호 확인을 올바르게 입력해주세요.');
            return;
        }
        onSignup(newName, newEmail, newPassword);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                    <InputLabel htmlFor="new-name">이름</InputLabel>
                    <OutlinedInput id="new-name" label="이름" value={newName} onChange={handleNewNameChange} />
                </FormControl>
                <FormControl fullWidth required variant="outlined" color="warning" error={!isNewEmailValid}>
                    <InputLabel htmlFor="new-email">이메일 주소</InputLabel>
                    <OutlinedInput
                        id="new-email"
                        label="이메일 주소"
                        value={newEmail}
                        onChange={handleNewEmailChange}
                    />
                    {!isNewEmailValid && <FormHelperText>올바른 이메일 형식이 아닙니다.</FormHelperText>}
                </FormControl>
                <FormControl fullWidth required variant="outlined" color="warning" error={!isNewPasswordValid}>
                    <InputLabel htmlFor="new-password">비밀번호</InputLabel>
                    <OutlinedInput
                        id="new-password"
                        label="비밀번호"
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    {!isNewPasswordValid && <FormHelperText>비밀번호는 최소 6자 이상이어야 합니다.</FormHelperText>}
                </FormControl>
                <FormControl fullWidth required variant="outlined" color="warning" error={!isNewPasswordConfirmValid}>
                    <InputLabel htmlFor="new-password-confirm">비밀번호 확인</InputLabel>
                    <OutlinedInput
                        id="new-password-confirm"
                        label="비밀번호 확인"
                        type="password"
                        value={newPasswordConfirm}
                        onChange={handleNewPasswordConfirmChange}
                    />
                    {!isNewPasswordConfirmValid && <FormHelperText>비밀번호가 일치하지 않습니다.</FormHelperText>}
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
                    onClick={handleSignupClick}
                >
                    회원가입
                </Button>
                <Button
                    onClick={onClose}
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
    );
};

export default SignupModal;
