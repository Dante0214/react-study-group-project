import OpenAI from "openai";

console.log("OpenAI 클라이언트 생성 중...");
console.log(
  "API 키 설정 여부:",
  process.env.VITE_OPENAI_API_KEY ? "설정됨" : "설정되지 않음"
);

const client = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

console.log("OpenAI 클라이언트 생성 완료");

export default client;
