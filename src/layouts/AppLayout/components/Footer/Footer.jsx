import styles from './Footer.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import logo from '../../../../assets/ddalkkak.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['logo-container']}>
        <img src={logo} alt='logo' className={styles['logo-image']} />
      </div>
      <div className={styles['github-link-container']}>
        <div className={styles['github-icon-container']}>
          <GitHubIcon sx={{ fontSize: '32px' }} />
          <div>Github</div>
        </div>
        <ul className={styles['github-link-list']}>
          <li className={styles['github-link-item']}>
            한상휘 (
            <Link to={'https://github.com/sangmwi'} target='_blank' className={styles['github-link']}>
              https://github.com/sangmwi
            </Link>
            )
          </li>
          <li className={styles['github-link-item']}>
            한사라 (
            <Link to={'https://github.com/namee-h'} target='_blank' className={styles['github-link']}>
              https://github.com/namee-h
            </Link>
            )
          </li>
          <li className={styles['github-link-item']}>
            안치호 (
            <Link to={'https://github.com/Dante0214'} target='_blank' className={styles['github-link']}>
              https://github.com/Dante0214
            </Link>
            )
          </li>
          <li className={styles['github-link-item']}>
            정민지 (
            <Link to={'https://github.com/calevv'} target='_blank' className={styles['github-link']}>
              https://github.com/calevv
            </Link>
            )
          </li>
          <li className={styles['github-link-item']}>
            박영욱 (
            <Link to={'https://github.com/mongchongi'} target='_blank' className={styles['github-link']}>
              https://github.com/mongchongi
            </Link>
            )
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
