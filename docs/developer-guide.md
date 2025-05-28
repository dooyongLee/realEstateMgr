# 개발자 가이드

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상
- Git

### 설치 방법
1. 저장소 클론
```bash
git clone [repository-url]
cd realestatemgr
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── components/         # 재사용 가능한 컴포넌트
│   ├── common/        # 공통 컴포넌트
│   ├── properties/    # 매물 관련 컴포넌트
│   ├── contracts/     # 계약 관련 컴포넌트
│   └── customers/     # 고객 관련 컴포넌트
├── hooks/             # 커스텀 훅
├── pages/             # 페이지 컴포넌트
├── services/          # API 서비스
├── store/             # 상태 관리
├── types/             # TypeScript 타입 정의
└── utils/             # 유틸리티 함수
```

## 코딩 컨벤션

### 파일 명명 규칙
- 컴포넌트: PascalCase (예: PropertyList.tsx)
- 유틸리티: camelCase (예: formatDate.ts)
- 타입 정의: PascalCase (예: Property.ts)

### 컴포넌트 작성 규칙
```tsx
import { FC } from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  title: string;
  onSave: () => void;
}

const Component: FC<Props> = ({ title, onSave }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onSave}>저장</button>
    </div>
  );
};

export default Component;
```

### 상태 관리
- 전역 상태: Zustand 사용
- 컴포넌트 상태: React.useState 사용
- 비동기 상태: React.useEffect 사용

## API 통신

### API 클라이언트 설정
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 설정
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API 호출 예시
```typescript
// GET 요청
const getProperties = async (params: PropertyParams) => {
  const response = await api.get('/properties', { params });
  return response.data;
};

// POST 요청
const createProperty = async (data: PropertyData) => {
  const response = await api.post('/properties', data);
  return response.data;
};
```

## 테스트

### 단위 테스트
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyList from './PropertyList';

describe('PropertyList', () => {
  it('renders property list correctly', () => {
    render(<PropertyList />);
    expect(screen.getByText('매물 목록')).toBeInTheDocument();
  });
});
```

### E2E 테스트
```typescript
import { test, expect } from '@playwright/test';

test('property creation flow', async ({ page }) => {
  await page.goto('/properties');
  await page.click('button:has-text("새 매물")');
  await page.fill('input[name="title"]', '테스트 매물');
  await page.click('button:has-text("저장")');
  await expect(page.locator('text=테스트 매물')).toBeVisible();
});
```

## 배포

### 빌드
```bash
npm run build
```

### 환경 변수
```env
VITE_API_URL=http://api.example.com
VITE_APP_TITLE=부동산 관리 시스템
```

### 배포 체크리스트
1. 환경 변수 설정 확인
2. API 엔드포인트 확인
3. 빌드 오류 확인
4. 성능 최적화 확인
5. 보안 설정 확인

## 성능 최적화

### 코드 스플리팅
```typescript
const PropertyList = lazy(() => import('./pages/PropertyList'));
```

### 이미지 최적화
```typescript
import { Image } from '@/components/common/Image';

<Image
  src={property.image}
  alt={property.title}
  loading="lazy"
  width={300}
  height={200}
/>
```

### 메모이제이션
```typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## 보안

### XSS 방지
```typescript
import DOMPurify from 'dompurify';

const sanitizedHtml = DOMPurify.sanitize(userInput);
```

### CSRF 방지
```typescript
const csrfToken = generateCSRFToken();
api.defaults.headers.common['X-CSRF-Token'] = csrfToken;
```

### 입력값 검증
```typescript
import { z } from 'zod';

const propertySchema = z.object({
  title: z.string().min(1).max(100),
  price: z.number().positive(),
  address: z.string().min(1),
});
```

## 접근성

### ARIA 레이블
```tsx
<button
  aria-label="매물 삭제"
  aria-describedby="delete-description"
  onClick={handleDelete}
>
  삭제
</button>
```

### 키보드 네비게이션
```tsx
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleClick();
  }
};
```

### 색상 대비
```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
  },
});
``` 