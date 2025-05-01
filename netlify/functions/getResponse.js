// netlify/functions/getResponse.js
import client from "../utils/client.js";

const getResponse = async (prompt) => {
  try {
    console.log("OpenAI API 호출 시작...");
    console.log("OpenAI 클라이언트:", client);

    // OpenAI 최신 API 호출
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    console.log("OpenAI API 호출 성공!");
    return response;
  } catch (error) {
    console.error("OpenAI API 오류 상세 정보:", error.message);
    console.error("오류 스택:", error.stack);
    throw error;
  }
};

export const handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    console.log("요청 받음:", event.body);
    const { prompt } = JSON.parse(event.body);
    console.log("프롬프트:", prompt);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "프롬프트가 필요합니다" }),
      };
    }

    const response = await getResponse(prompt);
    console.log("응답:", JSON.stringify(response, null, 2));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("오류 발생:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "서버 오류" }),
    };
  }
};
