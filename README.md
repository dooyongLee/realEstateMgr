# 부동산 관리 시스템

부동산 매물과 계약을 관리하는 웹 애플리케이션입니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- Material-UI
- React Router
- Zustand
- Axios

## 시작하기

### 필수 조건

- Node.js 18 이상
- npm 9 이상

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 프로젝트 구조

```
src/
├── components/     # 공통 컴포넌트
├── features/       # 기능별 컴포넌트
├── hooks/         # 커스텀 훅
├── layouts/       # 레이아웃 컴포넌트
├── pages/         # 페이지 컴포넌트
├── routes/        # 라우팅 설정
├── services/      # API 서비스
├── store/         # 상태 관리
├── types/         # 타입 정의
└── utils/         # 유틸리티 함수
```

## 주요 기능

- 매물 관리
  - 매물 등록/수정/삭제
  - 매물 검색 및 필터링
  - 매물 상세 정보 조회

- 계약 관리
  - 계약 등록/수정/삭제
  - 계약 상태 관리
  - 계약서 생성

- 고객 관리
  - 고객 정보 관리
  - 고객 이력 조회
  - 고객 연락처 관리

## 보안

- XSS 방지
- CSRF 방지
- 입력값 검증
- 파일 업로드 제한

## 접근성

- ARIA 레이블 사용
- 키보드 네비게이션 지원
- 색상 대비 준수
- 스크린 리더 지원

## 성능 최적화

- 코드 스플리팅
- 이미지 최적화
- 번들 크기 최적화
- 캐싱 전략

## 라이선스

MIT License
