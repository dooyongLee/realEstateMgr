import { ApiError } from '@/types/api';

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // 서버 응답이 있는 경우
    return {
      message: error.response.data.message || '서버 오류가 발생했습니다.',
      status: error.response.status,
      errors: error.response.data.errors,
    };
  } else if (error.request) {
    // 요청은 보냈지만 응답이 없는 경우
    return {
      message: '서버에 연결할 수 없습니다.',
      status: 0,
    };
  } else {
    // 요청 설정 중 오류가 발생한 경우
    return {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      status: 0,
    };
  }
};

export const isApiError = (error: any): error is ApiError => {
  return error && typeof error === 'object' && 'status' in error;
}; 