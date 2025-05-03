import styles from './Footer.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CopyrightIcon from '@mui/icons-material/Copyright';
import logo from '../../../../assets/ddalkkak.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useIsMobile } from '../../../../hooks/useIsMobile';

const Footer = () => {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isMobile = useIsMobile(851);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-container']}>
        <div className={styles['introduction']}>
          <img src={logo} alt='logo' className={styles['logo-image']} />
          {!isMobile && (
            <>
              <p className={styles['introduction-text']}>매일 관심 있는 영어 뉴스로 자연스럽게 공부하세요.</p>
              <p className={styles['introduction-text']}>AI가 정리한 단어장은 언제 어디서든 복습할 수 있어요.</p>
            </>
          )}
        </div>
        {isMobile ? (
          <>
            <div className={styles['terms']}>
              <div className={styles['terms-text']}>이용 약관</div>
              <div className={styles['terms-text']}>개인정보처리방침</div>
            </div>
            <ul className={styles['navigation']}>
              <li>
                <Link
                  to={'/main'}
                  className={`${styles['navigation-link']} ${
                    pathname === '/main' ? styles['navigation-link-active'] : ''
                  }`}
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to={'/vocab'}
                  className={`${styles['navigation-link']} ${
                    pathname === '/vocab' ? styles['navigation-link-active'] : ''
                  }`}
                >
                  나의 단어
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className={styles['navigation']}>
              <li>
                <Link
                  to={'/main'}
                  className={`${styles['navigation-link']} ${
                    pathname === '/main' ? styles['navigation-link-active'] : ''
                  }`}
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to={'/vocab'}
                  className={`${styles['navigation-link']} ${
                    pathname === '/vocab' ? styles['navigation-link-active'] : ''
                  }`}
                >
                  나의 단어
                </Link>
              </li>
            </ul>
            <div className={styles['terms']}>
              <div className={styles['terms-text']}>이용 약관</div>
              <div className={styles['terms-text']}>개인정보처리방침</div>
            </div>
          </>
        )}
        <div>
          <ListItemButton onClick={handleClick} sx={{ width: '255px', borderRadius: '5px' }}>
            <ListItemIcon>
              <GitHubIcon sx={{ fontSize: '28px' }} />
            </ListItemIcon>
            <ListItemText
              primary='Developers'
              primaryTypographyProps={{
                fontSize: '12px',
              }}
            />
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ borderRadius: '5px' }}>
                한상휘 (
                <Link to={'https://github.com/sangmwi'} target='_blank' className={styles['github-link']}>
                  https://github.com/sangmwi
                </Link>
                )
              </ListItemButton>
              <ListItemButton sx={{ borderRadius: '5px' }}>
                한사라 (
                <Link to={'https://github.com/namee-h'} target='_blank' className={styles['github-link']}>
                  https://github.com/namee-h
                </Link>
                )
              </ListItemButton>
              <ListItemButton sx={{ borderRadius: '5px' }}>
                안치호 (
                <Link to={'https://github.com/Dante0214'} target='_blank' className={styles['github-link']}>
                  https://github.com/Dante0214
                </Link>
                )
              </ListItemButton>
              <ListItemButton sx={{ borderRadius: '5px' }}>
                정민지 (
                <Link to={'https://github.com/calevv'} target='_blank' className={styles['github-link']}>
                  https://github.com/calevv
                </Link>
                )
              </ListItemButton>
              <ListItemButton sx={{ borderRadius: '5px' }}>
                박영욱 (
                <Link to={'https://github.com/mongchongi'} target='_blank' className={styles['github-link']}>
                  https://github.com/mongchongi
                </Link>
                )
              </ListItemButton>
            </List>
          </Collapse>
        </div>
      </div>
      <div className={styles['copyright']}>
        <CopyrightIcon sx={{ fontSize: '14px', mt: { sm: '0', xs: '2px' } }} />
        <div>2025 딸깍영어. All rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
