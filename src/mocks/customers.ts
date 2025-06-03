export interface Customer {
  id: number;
  customerNumber: string;
  name: string;
  type: '매수자' | '매도자' | '임차인' | '임대인';
  phone: string;
  email: string;
  address: string;
  status: '활성' | '비활성' | '블랙리스트';
  createdAt: string;
  lastModified: string;
  contracts: Array<{
    id: number;
    contractNumber: string;
    type: '매매' | '임대';
    propertyTitle: string;
    status: '진행중' | '완료' | '취소';
    contractDate: string;
  }>;
  notes?: string;
  documents: Array<{
    name: string;
    status: '완료' | '진행중';
    uploadedAt?: string;
  }>;
  preferences?: {
    propertyTypes: string[];
    locations: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export const customers: Customer[] = [
  {
    id: 1,
    customerNumber: 'CUST-2024-001',
    name: '홍길동',
    type: '매수자',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    address: '서울시 강남구 역삼동 123-45',
    status: '활성',
    createdAt: '2024-03-15',
    lastModified: '2024-03-20',
    contracts: [
      {
        id: 1,
        contractNumber: 'CT-2024-001',
        type: '매매',
        propertyTitle: '강남 아파트',
        status: '진행중',
        contractDate: '2024-03-15',
      },
    ],
    notes: '강남 지역 아파트 선호',
    documents: [
      { name: '신분증', status: '완료', uploadedAt: '2024-03-15' },
      { name: '재직증명서', status: '완료', uploadedAt: '2024-03-15' },
      { name: '소득증명서', status: '진행중' },
    ],
    preferences: {
      propertyTypes: ['아파트', '오피스텔'],
      locations: ['강남구', '서초구'],
      priceRange: {
        min: 500000000,
        max: 1500000000,
      },
    },
  },
  {
    id: 2,
    customerNumber: 'CUST-2024-002',
    name: '김철수',
    type: '임차인',
    phone: '010-2345-6789',
    email: 'kim@example.com',
    address: '서울시 송파구 잠실동 456-78',
    status: '활성',
    createdAt: '2024-03-10',
    lastModified: '2024-03-25',
    contracts: [
      {
        id: 2,
        contractNumber: 'CT-2024-002',
        type: '임대',
        propertyTitle: '송파 오피스텔',
        status: '완료',
        contractDate: '2024-03-10',
      },
    ],
    notes: '월세 선호, 주차 필요',
    documents: [
      { name: '신분증', status: '완료', uploadedAt: '2024-03-10' },
      { name: '재직증명서', status: '완료', uploadedAt: '2024-03-10' },
      { name: '소득증명서', status: '완료', uploadedAt: '2024-03-10' },
    ],
    preferences: {
      propertyTypes: ['오피스텔', '아파트'],
      locations: ['송파구', '강남구'],
      priceRange: {
        min: 300000000,
        max: 800000000,
      },
    },
  },
  {
    id: 3,
    customerNumber: 'CUST-2024-003',
    name: '이영희',
    type: '매도자',
    phone: '010-3456-7890',
    email: 'lee@example.com',
    address: '서울시 마포구 합정동 789-12',
    status: '활성',
    createdAt: '2024-03-05',
    lastModified: '2024-03-18',
    contracts: [
      {
        id: 3,
        contractNumber: 'CT-2024-003',
        type: '매매',
        propertyTitle: '마포 상가',
        status: '진행중',
        contractDate: '2024-03-05',
      },
    ],
    notes: '상가 매매 희망',
    documents: [
      { name: '신분증', status: '완료', uploadedAt: '2024-03-05' },
      { name: '소유권증명서', status: '완료', uploadedAt: '2024-03-05' },
      { name: '등기부등본', status: '진행중' },
    ],
  },
  {
    id: 4,
    customerNumber: 'CUST-2024-004',
    name: '박지민',
    type: '임대인',
    phone: '010-4567-8901',
    email: 'park@example.com',
    address: '서울시 용산구 이태원동 345-67',
    status: '활성',
    createdAt: '2024-03-01',
    lastModified: '2024-03-15',
    contracts: [
      {
        id: 4,
        contractNumber: 'CT-2024-004',
        type: '임대',
        propertyTitle: '용산 사무실',
        status: '완료',
        contractDate: '2024-03-01',
      },
    ],
    notes: '사무실 임대 전문',
    documents: [
      { name: '신분증', status: '완료', uploadedAt: '2024-03-01' },
      { name: '소유권증명서', status: '완료', uploadedAt: '2024-03-01' },
      { name: '등기부등본', status: '완료', uploadedAt: '2024-03-01' },
    ],
  },
  {
    id: 5,
    customerNumber: 'CUST-2024-005',
    name: '최민수',
    type: '매수자',
    phone: '010-5678-9012',
    email: 'choi@example.com',
    address: '서울시 서초구 서초동 234-56',
    status: '비활성',
    createdAt: '2024-02-25',
    lastModified: '2024-03-10',
    contracts: [],
    notes: '주택 매매 희망',
    documents: [
      { name: '신분증', status: '완료', uploadedAt: '2024-02-25' },
      { name: '재직증명서', status: '완료', uploadedAt: '2024-02-25' },
      { name: '소득증명서', status: '완료', uploadedAt: '2024-02-25' },
    ],
    preferences: {
      propertyTypes: ['주택', '아파트'],
      locations: ['서초구', '강남구'],
      priceRange: {
        min: 800000000,
        max: 2000000000,
      },
    },
  },
];

export const customerStats = {
  total: 25,
  active: 18,
  inactive: 5,
  blacklist: 2,
  trends: {
    total: { value: 8, isPositive: true },
    active: { value: 5, isPositive: true },
    inactive: { value: 2, isPositive: false },
    blacklist: { value: 1, isPositive: false },
  },
}; 