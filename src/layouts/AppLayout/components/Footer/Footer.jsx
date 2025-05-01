import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useIsMobile } from "../../../../hooks/useIsMobile";

const Footer = () => {
  const isMobile = useIsMobile();

  const { pathname } = useLocation();

  return (
    <footer
      className={styles["footer"]}
      style={{
        marginTop: `${isMobile && pathname === "/" ? "350px" : "40px"}`,
      }}
    >
      <div className={styles["about"]}>
        <h3>습관이 되는 영어</h3>
        <p className={styles["about-content"]}>
          매일 흥미로운 영어 뉴스로 자연스럽게 키워지는 실력
        </p>
        <p className={styles["about-content"]}>
          AI가 도와주는 단어 정리와 언제든 꺼내볼 수 있는 손 안의 단어장
        </p>
      </div>
      <div className={styles["features"]}>
        <h3>주요 기능</h3>
        <ul className={styles["features-list"]}>
          <li className={"features-item"}>
            <strong>AI 단어 정리 :</strong> 기사 속 핵심 단어와 표현을 자동 정리
          </li>
          <li className={"features-item"}>
            <strong>손 안의 단어장 :</strong> 저장한 단어와 예문을 언제 어디서나
            복습
          </li>
          <li className={"features-item"}>
            <strong>매일 새로운 뉴스 :</strong> 관심 분야의 뉴스로 꾸준한 학습
          </li>
        </ul>
      </div>
      <div className={styles["github"]}>
        <div className={styles["github-icon"]}>
          <GitHubIcon sx={{ fontSize: { sm: "29px", xs: "22px" } }} />
          <div className={styles["github-icon-text"]}>Github</div>
        </div>
        <ul className={styles["github-link-list"]}>
          <li className={styles["github-link-item"]}>
            한상휘 (
            <Link
              to={"https://github.com/sangmwi"}
              target="_blank"
              className={styles["github-link"]}
            >
              https://github.com/sangmwi
            </Link>
            )
          </li>
          <li className={styles["github-link-item"]}>
            한사라 (
            <Link
              to={"https://github.com/namee-h"}
              target="_blank"
              className={styles["github-link"]}
            >
              https://github.com/namee-h
            </Link>
            )
          </li>
          <li className={styles["github-link-item"]}>
            안치호 (
            <Link
              to={"https://github.com/Dante0214"}
              target="_blank"
              className={styles["github-link"]}
            >
              https://github.com/Dante0214
            </Link>
            )
          </li>
          <li className={styles["github-link-item"]}>
            정민지 (
            <Link
              to={"https://github.com/calevv"}
              target="_blank"
              className={styles["github-link"]}
            >
              https://github.com/calevv
            </Link>
            )
          </li>
          <li className={styles["github-link-item"]}>
            박영욱 (
            <Link
              to={"https://github.com/mongchongi"}
              target="_blank"
              className={styles["github-link"]}
            >
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
