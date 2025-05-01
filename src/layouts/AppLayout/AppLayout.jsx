import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './AppLayout.module.css';
const AppLayout = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AppLayout;
