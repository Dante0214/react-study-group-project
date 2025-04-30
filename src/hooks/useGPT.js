import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
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
 * @returns {Object} 검색 결과와 상태 정보
 */
export const useGetWebSearch = (prompt) => {
  return useQuery({
    queryKey: ['webSearch', prompt],
    queryFn: () => fetchWebSearch(prompt),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 데이터 유지
    retry: 1, // 실패 시 1번 재시도
    enabled: !!prompt, // prompt가 존재할 때만 쿼리 실행
  });
};

/**
 * GPT API 응답을 가져오는 훅 (react-query 방식)
 * @param {string} prompt - GPT에 전송할 프롬프트
 * @returns {Object} GPT 응답과 상태 정보
 */
export const useGetGptResponse = (prompt) => {
  return useQuery({
    queryKey: ['response', prompt],
    queryFn: () => fetchResponse(prompt),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 데이터 유지
    retry: 1, // 실패 시 1번 재시도
    enabled: !!prompt, // prompt가 존재할 때만 쿼리 실행
  });
};

/**
 * GPT API 응답을 가져오는 훅 (useState + mutation 방식)
 * 기존 useGetResponse와 호환되는 인터페이스 제공
 * @returns {Object} GPT 응답 함수와 상태 정보
 */
export const useGetResponse = () => {
  const [error, setError] = useState(null);
  
  const mutation = useMutation({
    mutationFn: fetchResponse,
    onError: (err) => {
      setError(err.message || '응답을 가져오는 중 오류가 발생했습니다.');
    }
  });

  /**
   * 프롬프트를 전송하고 GPT API 응답을 받아오는 함수
   * @param {string} prompt - GPT에 전송할 프롬프트
   * @returns {Promise<string>} GPT의 응답 텍스트
   */
  const getResponse = useCallback(async (prompt) => {
    try {
      const response = await mutation.mutateAsync(prompt);
      return response.output_text;
    } catch (err) {
      console.error('응답 요청 오류:', err);
      throw err;
    }
  }, [mutation]);

  return {
    getResponse,
    isLoading: mutation.isPending,
    error
  };
};

