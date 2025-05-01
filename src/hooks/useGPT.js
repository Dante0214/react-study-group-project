import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

/**
 * 웹 검색 요청을 보내는 함수
 * @param {string} prompt - 검색할 프롬프트
 * @returns {Promise<Object>} 검색 결과
 */
const fetchWebSearch = async (prompt) => {
  try {
    const response = await axios.post('/.netlify/functions/getWebSearch', { prompt });
    return response.data;
  } catch (error) {
    console.error('웹 검색 오류:', error);
    throw new Error(error.response?.data?.message || '웹 검색 중 오류가 발생했습니다');
  }
};

/**
 * GPT API 요청을 보내는 함수
 * @param {string} prompt - GPT에 전송할 프롬프트
 * @returns {Promise<Object>} GPT 응답
 */
const fetchResponse = async (prompt) => {
  try {
    const response = await axios.post('/.netlify/functions/getResponse', { prompt });
    return response.data;
  } catch (error) {
    console.error('응답 오류:', error);
    throw new Error(error.response?.data?.message || '응답 요청 중 오류가 발생했습니다');
  }
};

/**
 * 웹 검색 결과를 가져오는 훅
 * @param {string} prompt - 검색할 프롬프트
 * @param {Object} options - 추가 옵션 (react-query 옵션)
 * @returns {Object} 검색 결과와 상태 정보
 */
export const useGetWebSearch = (prompt, options = {}) => {
  return useQuery({
    queryKey: ['webSearch', prompt],
    queryFn: () => fetchWebSearch(prompt),
    staleTime: 1000 * 60 * 10, // 10분 동안 캐시 데이터 유지
    retry: 3, // 실패 시 1번 재시도
    enabled: !!prompt, // prompt가 존재할 때만 쿼리 실행
    ...options, // 추가 옵션 전달
  });
};

/**
 * GPT API 응답을 가져오는 훅 (react-query 방식)
 * @param {string} prompt - GPT에 전송할 프롬프트
 * @param {Object} options - 추가 옵션 (react-query 옵션)
 * @returns {Object} GPT 응답과 상태 정보
 */
export const useGetGptResponse = (prompt, options = {}) => {
  return useQuery({
    queryKey: ['response', prompt],
    queryFn: () => fetchResponse(prompt),
    staleTime: 1000 * 60 * 10, // 10분 동안 캐시 데이터 유지
    retry: 3, // 실패 시 1번 재시도
    enabled: !!prompt, // prompt가 존재할 때만 쿼리 실행
    ...options, // 추가 옵션 전달
  });
};



