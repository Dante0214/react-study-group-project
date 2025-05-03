import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const pages = [
  {
    id: 0,
    name: "홈",
    path: "/main",
  },
  {
    id: 1,
    name: "나의 단어",
    path: "/vocab",
  },
];

const Navbar = ({ handleCloseMenu, setTestMode }) => {
  const { pathname } = useLocation();

  const handleVocabClick = () => {
    // "나의 단어" 클릭 시 테스트 모드를 해제
    setTestMode(false);
    handleCloseMenu(); // 메뉴 닫기
  };

  return (
    <nav className={styles["nav"]}>
      <ul className={styles["link-list"]}>
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              to={page.path}
              className={`${styles["link"]} ${
                page.path === pathname ? styles["link-active"] : ""
              }`}
              onClick={
                page.name === "나의 단어" ? handleVocabClick : handleCloseMenu
              }
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
