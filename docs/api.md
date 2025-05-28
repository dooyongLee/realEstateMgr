# API 문서

## 인증 API

### 로그인
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### 로그아웃
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

### 토큰 갱신
```http
POST /api/auth/refresh
Authorization: Bearer {token}
```

## 매물 API

### 매물 목록 조회
```http
GET /api/properties
Query Parameters:
  - page: number (기본값: 1)
  - size: number (기본값: 10)
  - search: string (검색어)
  - type: string (매물 유형)
  - status: string (매물 상태)
```

### 매물 상세 조회
```http
GET /api/properties/{id}
```

### 매물 등록
```http
POST /api/properties
Content-Type: application/json

{
  "title": "string",
  "type": "string",
  "price": number,
  "address": "string",
  "description": "string",
  "images": File[]
}
```

### 매물 수정
```http
PUT /api/properties/{id}
Content-Type: application/json

{
  "title": "string",
  "type": "string",
  "price": number,
  "address": "string",
  "description": "string",
  "images": File[]
}
```

### 매물 삭제
```http
DELETE /api/properties/{id}
```

## 계약 API

### 계약 목록 조회
```http
GET /api/contracts
Query Parameters:
  - page: number
  - size: number
  - search: string
  - status: string
```

### 계약 상세 조회
```http
GET /api/contracts/{id}
```

### 계약 등록
```http
POST /api/contracts
Content-Type: application/json

{
  "propertyId": number,
  "customerId": number,
  "type": "string",
  "startDate": "string",
  "endDate": "string",
  "deposit": number,
  "rent": number,
  "documents": File[]
}
```

### 계약 수정
```http
PUT /api/contracts/{id}
Content-Type: application/json

{
  "type": "string",
  "startDate": "string",
  "endDate": "string",
  "deposit": number,
  "rent": number,
  "documents": File[]
}
```

### 계약 삭제
```http
DELETE /api/contracts/{id}
```

## 고객 API

### 고객 목록 조회
```http
GET /api/customers
Query Parameters:
  - page: number
  - size: number
  - search: string
```

### 고객 상세 조회
```http
GET /api/customers/{id}
```

### 고객 등록
```http
POST /api/customers
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "phone": "string",
  "type": "string"
}
```

### 고객 수정
```http
PUT /api/customers/{id}
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "phone": "string",
  "type": "string"
}
```

### 고객 삭제
```http
DELETE /api/customers/{id}
``` 