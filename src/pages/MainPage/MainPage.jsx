import React, { useState, useEffect, useCallback } from "react";
import "./MainPage.style.css";
import News from "./components/News/News";
import Words from "./components/Words/Words";
import { useGetWebSearch } from "../../hooks/useGPT";
import { useNewsStore } from "../../stores/newsStore";
import ScrollToTopButton from "../../common/components/Buttons/ScrollToTopButton";
const MainPage = () => {
  // newsStore에서 상태와 액션 가져오기
  const { 
    newsObject: storedNewsObject, 
    topic, 
    setTopic, 
    setNewsObject 
  } = useNewsStore();

  const [hoveredWord, setHoveredWord] = useState(null);
  const [shouldLoadNews, setShouldLoadNews] = useState(false);
  const [newsPrompt, setNewsPrompt] = useState("");

  // 프롬프트 생성 함수를 메모이제이션
  const getPrompt = useCallback((currentTopic) => {
    return `
당신은 한국인들을 가르치는 영어선생님입니다. 

Web search tool을 이용해, 주제: ${currentTopic}와 관련된 가장 최근의 기사를 찾아 500자~1000자 분량으로 '영어로' 가져오세요.

기사에서 사용된 중요한 어휘와 표현을 다음과 같이 정리해주세요:
1. 단어(words): 영어 학습에 유용한 핵심 단어들 (명사, 동사, 형용사, 부사 등)
2. 숙어(idioms): 기사에 등장한 관용구, 숙어 표현, 또는 주요 명사구/동사구 표현

다음 가이드라인을 반드시 따라주세요:
- 반드시 기사 내용에 실제로 등장한 표현만 선별할 것
- 각 단어/숙어마다 한글 의미와 품사, 예문 제공
- 숙어 표현이 없을 경우 중요 구문이라도 추출하고, 정말 없다면 빈 배열로 표시
- 반드시 제목(title)과 내용(content)은 영어로, 의미(meaning)와 품사(class)는 한글로 제공
- 예문은 기사 내용과 연관되게 작성하거나 실제 기사에서 발췌

응답은 다음 JSON 형식으로만 제공하세요:

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

주의사항:
- JSON 형식 외의 어떤 텍스트나 코드 블록, 백틱도 포함하지 마세요
- 응답은 파싱되어 사용될 것이므로 정확한 JSON 형식을 유지해야 합니다
- 반드시 현재 존재하는 기사를 검색해주고 그 출처와 발행 날짜를 정확히 기재해주세요
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

  // JSON 파싱 및 오류 처리 - 전역 상태에 저장
  useEffect(() => {
    if (webSearchData?.output_text) {
      try {
        const cleanedText = webSearchData.output_text
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
          
        const parsedNews = JSON.parse(cleanedText);
        
        // 전역 상태에 저장
        setNewsObject(parsedNews);
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
        console.log("파싱 시도한 텍스트:", webSearchData.output_text);
      }
    }
  }, [webSearchData, setNewsObject]);

  return (
    <div className="main-page-container">
      <ScrollToTopButton />
      <h1 className="main-page-title">딸깍으로 완성하는 영어 학습</h1>
      <p className="main-page-description">
        오늘의 기사와 중요 단어를 통해 영어 실력을 향상시키세요 🚀
      </p>

      <div className="main-page-content">
        <div className="main-page-item">
          <News
            newsObject={storedNewsObject}
            topic={topic}
            setTopic={setTopic}
            isLoading={webSearchLoading}
            hoveredWord={hoveredWord}
            loadNews={loadNews}
          />
        </div>
        <div className="main-page-item">
          <Words 
            newsObject={storedNewsObject} 
            isLoading={webSearchLoading}
            setHoveredWord={setHoveredWord}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

