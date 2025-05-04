import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { sendPasswordReset } from '../../../util/firebase';
import useSignupStore from '../../../stores/signupStore';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

const PasswordResetModal = ({ open, onClose }) => {
    const { resetEmail, setResetEmail } = useSignupStore();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetRequest = async () => {
        setMessage('');
        setError('');
        setIsLoading(true);
        try {
            await sendPasswordReset(resetEmail);
            setMessage('비밀번호 재설정 링크를 해당 이메일로 보냈습니다.');
            alert(message);
            onClose(); // 성공 시 모달 닫기
        } catch (error) {
            setError('비밀번호 재설정 링크를 보내는 데 실패했습니다: ' + error.message);
            alert(error);
        } finally {
            setIsLoading(false);
            setResetEmail('');
        }
        console.log(message || error);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="password-reset-modal-title"
            aria-describedby="password-reset-modal-description"
        >
            <Box sx={style}>
                <Typography id="password-reset-modal-title" variant="h6" component="h2">
                    비밀번호 재설정
                </Typography>
                {message && <Typography color="success">{message}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    color="warning"
                    label="이메일 주소"
                    variant="outlined"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    fullWidth
                />
                <Button
                    onClick={handleResetRequest}
                    variant="contained"
                    sx={{
                        backgroundColor: `var(--color-primary-light)`,
                        borderRadius: 2,
                        minHeight: '56px',
                        fontSize: '1.1rem',
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? '요청 중...' : '비밀번호 재설정 링크 요청'}
                </Button>
                <Button onClick={onClose} color="warning">
                    닫기
                </Button>
            </Box>
        </Modal>
    );
};

export default PasswordResetModal;
