import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../../assets/yeonguk-logo.png';
import Navbar from '../Navbar/Navbar';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Header = ({ isMobile }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { pathname } = useLocation();

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className={styles['header']}>
      <Link to={'/main'}>
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
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Navbar />
          <Link
            to={'/login'}
            className={`${styles['login-link']} ${'/login' === pathname ? styles['login-link-active'] : ''}`}
          >
            <LoginIcon
              sx={{ color: `${'/login' === pathname ? 'var(--color-text-primary)' : 'var(--color-text-disabled)'}` }}
            />
            <div>로그인</div>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
