import React, { useState, useEffect, useCallback } from "react";
import "./MainPage.style.css";
import News from "./components/News/News";
import Words from "./components/Words/Words";
import { useGetWebSearch } from "../../hooks/useGPT";

const MainPage = () => {
  const [topic, setTopic] = useState("Any");
  const [hoveredWord, setHoveredWord] = useState(null);
  const [shouldLoadNews, setShouldLoadNews] = useState(false);
  const [newsPrompt, setNewsPrompt] = useState("");

  // 프롬프트 생성 함수를 메모이제이션
  const getPrompt = useCallback((currentTopic) => {
    return `
    주제: ${currentTopic}
    당신은 한국인들을 가르치는 영어선생님입니다. 
    웹 검색을 통해 가장 최근의 기사를 찾아 한 페이지 분량으로 '영어로' 가져오세요.
    중요한 핵심 표현 어휘를 단어(words)와 숙어(idioms)로 나누어 최대한 많이 선별해 정리해주세요. 
    meaning과 class는 한글로, 나머지 title이나 content 등은 꼭 영어로 제공해주세요.
    반드시 내용 중에 있는 어휘만 선별해주세요. 없으면 빈 배열로 출력해주세요.
 
    답변 형식은 다음과 같은 json 형식으로 출력해주세요.
  
    {
     title: "Title of the news",
     content: "Content of the news(English, do not include the source)",
     words: [{
      name: "artificial intelligence"
      meaning: "인공 지능"
      class: "명사"
      example: "I'm going to the AI conference next week." 
      }, {
      name: "revolutionize"
      meaning: "혁신하다"
      class: "동사"
      example: "The new AI model will revolutionize the industry." 
      }, {
      name: "healthcare delivery"
      meaning: "의료 서비스 제공"
      class: "명사"
      example: "The new candidate will support the healthcare delivery system." 
      } ...],
     idioms: [{
      name: "break a leg"
      meaning: "좋은 성과를 내다"
      class: "동사"
      example: "I'm sure you'll break a leg at the interview."
      }, {
      name: "hit the books"
      meaning: "공부하다"
      class: "동사"
      example: "I'm going to hit the books for the exam."
      } ...],
     date: "기사 날짜",
     source: {
       name: "기사 출처",
       url: "기사 출처 URL"
      }
    }

    응답은 반드시 텍스트로만 제공하세요.
    받은 응답은 json 형식으로 파싱할 것이므로
    절대로 다른 텍스트나 코드블럭이나 백틱을 출력하지 마세요.
    `;
  }, []);

  // 뉴스 불러오기 함수를 메모이제이션
  const loadNews = useCallback((currentTopic) => {
    setNewsPrompt(getPrompt(currentTopic));
    setShouldLoadNews(true);
  }, [getPrompt]);

  // API 요청 실행
  const { data: webSearchData, isLoading: webSearchLoading } =
    useGetWebSearch(newsPrompt, {
      enabled: shouldLoadNews && newsPrompt !== "",
    });

  // API 호출 완료 후 shouldLoadNews 리셋
  useEffect(() => {
    if (webSearchData && shouldLoadNews) {
      setShouldLoadNews(false);
    }
  }, [webSearchData, shouldLoadNews]);

  // JSON 파싱 및 오류 처리
  const [newsObject, setNewsObject] = useState({
    title: "",
    content: "",
    date: "",
    source: {
      name: "",
      url: "",
    },
    words: [],
    idioms: [],
  });

  useEffect(() => {
    if (webSearchData?.output_text) {
      try {
        const parsedNews = JSON.parse(webSearchData.output_text);
        setNewsObject(parsedNews);
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
      }
    }
  }, [webSearchData]);

  // 디버깅을 위한 로그
  useEffect(() => {
    if (newsObject.content) {
      console.log("뉴스 데이터 로드됨:", newsObject);
    }
  }, [newsObject.content]);

  return (
    <div className="main-page-container">
      <h1 className="main-page-title">영어 학습 대시보드</h1>
      <p className="main-page-description">
        오늘의 기사와 중요 단어를 통해 영어 실력을 향상시키세요!
      </p>

      <div className="main-page-content">
        <div className="main-page-item">
          <News
            newsObject={newsObject}
            topic={topic}
            setTopic={setTopic}
            isLoading={webSearchLoading}
            hoveredWord={hoveredWord}
            loadNews={loadNews}
          />
        </div>
        <div className="main-page-item">
          <Words 
            newsObject={newsObject} 
            isLoading={webSearchLoading}
            setHoveredWord={setHoveredWord}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
