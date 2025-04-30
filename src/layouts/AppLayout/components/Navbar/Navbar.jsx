import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const pages = [
  {
    id: 0,
    name: '홈',
    path: '/main',
  },
  {
    id: 1,
    name: '나의 단어',
    path: '/vocab',
  },
];

const Navbar = ({ handleCloseMenu }) => {
  const { pathname } = useLocation();

  return (
    <nav className={styles['nav']}>
      <ul className={styles['link-list']}>
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              to={page.path}
              className={`${styles['link']} ${page.path === pathname ? styles['link-active'] : ''}`}
              onClick={handleCloseMenu}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
