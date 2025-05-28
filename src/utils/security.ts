import DOMPurify from 'dompurify';

// XSS 방지를 위한 입력값 정제
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input);
};

// CSRF 토큰 생성
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// 입력값 검증
export const validateInput = {
  // 이메일 검증
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // 전화번호 검증
  phone: (phone: string): boolean => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phone);
  },

  // 비밀번호 검증 (최소 8자, 대문자, 소문자, 숫자, 특수문자 포함)
  password: (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  // 숫자만 검증
  number: (value: string): boolean => {
    return /^\d+$/.test(value);
  },

  // 한글만 검증
  korean: (value: string): boolean => {
    return /^[가-힣]+$/.test(value);
  },
};

// 파일 확장자 검증
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  const fileType = file.type;
  return allowedTypes.includes(fileType);
};

// 파일 크기 검증
export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
}; 