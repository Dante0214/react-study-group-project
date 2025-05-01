import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../../assets/ddalkkak.png';
import Navbar from '../Navbar/Navbar';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import useAuthStore from '../../../../stores/authStore';
import { useIsMobile } from '../../../../hooks/useIsMobile';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { pathname } = useLocation();

  const isMobile = useIsMobile();

  const { isLoggedIn, setLogout } = useAuthStore();

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    setLogout();
    setShowMenu(false);
    localStorage.removeItem('auth-storage');
  };

  return (
    <header className={styles['header']}>
      <Link to={'/'}>
        <img src={logo} alt='logo' className={styles['logo']} />
      </Link>
      {isMobile ? (
        <>
          <button className={styles['menu-button']} onClick={() => setShowMenu(true)}>
            <MenuIcon sx={{ color: 'var(--color-text-primary)' }} />
          </button>
          {showMenu && (
            <div className={styles['menu']} onClick={handleCloseMenu}>
              <div className={styles['menu-content']} onClick={(event) => event.stopPropagation()}>
                <Navbar handleCloseMenu={handleCloseMenu} />
                {isLoggedIn ? (
                  <button className={styles['logout-button']} onClick={handleLogout}>
                    <LogoutIcon />
                    <div>로그아웃</div>
                  </button>
                ) : (
                  <Link
                    to={'/login'}
                    className={`${styles['login-link']} ${'/login' === pathname ? styles['login-link-active'] : ''}`}
                    onClick={handleCloseMenu}
                  >
                    <LoginIcon
                      sx={{
                        color: `${'/login' === pathname ? 'var(--color-text-primary)' : 'var(--color-text-disabled)'}`,
                      }}
                    />
                    <div>로그인</div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Navbar />
          {isLoggedIn ? (
            <button className={styles['logout-button']} onClick={handleLogout}>
              <LogoutIcon />
              <div>로그아웃</div>
            </button>
          ) : (
            <Link
              to={'/login'}
              className={`${styles['login-link']} ${'/login' === pathname ? styles['login-link-active'] : ''}`}
              onClick={handleCloseMenu}
            >
              <LoginIcon
                sx={{
                  color: `${'/login' === pathname ? 'var(--color-text-primary)' : 'var(--color-text-disabled)'}`,
                }}
              />
              <div>로그인</div>
            </Link>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
