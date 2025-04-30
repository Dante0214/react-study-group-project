import React, { useState } from "react";
import "./MainPage.style.css";
import News from "./components/News/News";
import Words from "./components/Words/index";
import { useGetWebSearch } from "../../hooks/useGPT";

const MainPage = () => {
  const [topic, setTopic] = useState("Any");

  const prompt = `
  주제: ${topic}
  웹 검색을 통해 가장 최근의 영어기사를 찾아 한 문단 정도의 분량으로 '영어로' 보기 쉽게 요약하세요.

  답변 형식은 다음과 같이 json 형식으로 '영어로' 출력해주세요.
  {
    "title": "기사 제목",
    "content": "기사 내용",
    "date": "기사 날짜",
    "source": {
      "name": "기사 출처",
      "url": "기사 출처 URL"
    }
  }
  내용만 주고, 다른 텍스트나 코드블럭, 백틱 등을 절대 추가하지 마.
  `;

  const { data: webSearchData, isLoading: webSearchLoading } =
    useGetWebSearch(prompt);

  const newsText = webSearchData?.output_text;
  
  // 초기값으로 빈 객체를 설정하여 오류 방지
  let newsObject = {
    title: "",
    content: "",
    date: "",
    source: {
      name: "",
      url: ""
    }
  };
  
  // newsText가 있을 때만 JSON 파싱 시도
  try {
    if (newsText) {
      newsObject = JSON.parse(newsText);
      console.log(newsObject);
    }
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
  }

  return (
    <div className="main-page-container">
      <h1 className="main-page-title">영어 학습 대시보드</h1>
      <p className="main-page-description">
        오늘의 기사와 중요 단어를 통해 영어 실력을 향상시키세요
      </p>

      <div className="main-page-content">
        <div className="main-page-item">
          <News newsObject={newsObject} topic={topic} setTopic={setTopic} isLoading={webSearchLoading} />
        </div>
        <div className="main-page-item">
          <Words />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
