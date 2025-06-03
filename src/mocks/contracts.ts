export interface Contract {
  id: number;
  contractNumber: string;
  type: '매매' | '임대';
  property: {
    id: number;
    title: string;
    type: string;
    address: string;
    size: string;
    price: string;
  };
  customer: {
    id: number;
    name: string;
    type: string;
    phone: string;
    email: string;
  };
  status: '진행중' | '완료' | '취소';
  contractDate: string;
  startDate: string;
  endDate: string | null;
  deposit: string;
  monthlyRent: string | null;
  commission: string;
  commissionStatus: '미지급' | '지급완료';
  documents: Array<{
    name: string;
    status: '완료' | '진행중';
  }>;
  agent: string;
  notes: string;
  createdAt: string;
  lastModified: string;
  description?: string;
  terms?: string[];
  propertyFloor?: string;
  propertyDirection?: string;
  propertyYear?: string;
  propertyStructure?: string;
}

export const contracts: Contract[] = [
  {
    id: 1,
    contractNumber: 'CT-2024-001',
    type: '매매',
    property: {
      id: 1,
      title: '강남 아파트',
      type: '아파트',
      address: '서울시 강남구 역삼동 123-45',
      size: '120평',
      price: '12억',
    },
    customer: {
      id: 1,
      name: '홍길동',
      type: '매수자',
      phone: '010-1234-5678',
      email: 'hong@example.com',
    },
    status: '진행중',
    contractDate: '2024-03-15',
    startDate: '2024-04-01',
    endDate: null,
    deposit: '5억',
    monthlyRent: null,
    commission: '1200만원',
    commissionStatus: '미지급',
    documents: [
      { name: '매매계약서', status: '완료' },
      { name: '소유권이전등기', status: '진행중' },
    ],
    agent: '김부동',
    notes: '계약금 입금 예정',
    createdAt: '2024-03-15',
    lastModified: '2024-03-20',
    description: '강남역 도보 5분 거리에 위치한 3룸 아파트입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 15만원',
      '주차: 1대 가능',
      '반려동물: 불가능',
    ],
    propertyFloor: '3층',
    propertyDirection: '남향',
    propertyYear: '2015년',
    propertyStructure: '철근콘크리트',
  },
  {
    id: 2,
    contractNumber: 'CT-2024-002',
    type: '임대',
    property: {
      id: 2,
      title: '송파 오피스텔',
      type: '오피스텔',
      address: '서울시 송파구 잠실동 456-78',
      size: '80평',
      price: '8억',
    },
    customer: {
      id: 2,
      name: '김철수',
      type: '임차인',
      phone: '010-2345-6789',
      email: 'kim@example.com',
    },
    status: '완료',
    contractDate: '2024-03-10',
    startDate: '2024-03-25',
    endDate: '2025-03-24',
    deposit: '3억',
    monthlyRent: '150만원',
    commission: '800만원',
    commissionStatus: '지급완료',
    documents: [
      { name: '임대차계약서', status: '완료' },
      { name: '전입신고', status: '완료' },
    ],
    agent: '이부동',
    notes: '월세 자동이체 설정 완료',
    createdAt: '2024-03-10',
    lastModified: '2024-03-25',
    description: '잠실역 도보 3분 거리에 위치한 2룸 오피스텔입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 10만원',
      '주차: 불가능',
      '반려동물: 가능',
    ],
    propertyFloor: '2층',
    propertyDirection: '북향',
    propertyYear: '2010년',
    propertyStructure: '콘크리트',
  },
  {
    id: 3,
    contractNumber: 'CT-2024-003',
    type: '매매',
    property: {
      id: 2,
      title: '송파 오피스텔',
      type: '오피스텔',
      address: '서울시 송파구 잠실동 456-78',
      size: '80평',
      price: '8억',
    },
    customer: {
      id: 2,
      name: '김철수',
      type: '매수인',
      phone: '010-2345-6789',
      email: 'kim@example.com',
    },
    status: '완료',
    contractDate: '2024-03-10',
    startDate: '2024-03-25',
    endDate: '2025-03-24',
    deposit: '3억',
    monthlyRent: '150만원',
    commission: '800만원',
    commissionStatus: '지급완료',
    documents: [
      { name: '임대차계약서', status: '완료' },
      { name: '전입신고', status: '완료' },
    ],
    agent: '이부동',
    notes: '월세 자동이체 설정 완료',
    createdAt: '2024-03-10',
    lastModified: '2024-03-25',
    description: '잠실역 도보 3분 거리에 위치한 2룸 오피스텔입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 10만원',
      '주차: 불가능',
      '반려동물: 가능',
    ],
    propertyFloor: '2층',
    propertyDirection: '북향',
    propertyYear: '2010년',
    propertyStructure: '콘크리트',
  },
  {
    id: 4,
    contractNumber: 'CT-2024-004',
    type: '매매',
    property: {
      id: 1,
      title: '강남 아파트',
      type: '아파트',
      address: '서울시 강남구 역삼동 123-45',
      size: '120평',
      price: '12억',
    },
    customer: {
      id: 1,
      name: '홍길동',
      type: '매수자',
      phone: '010-1234-5678',
      email: 'hong@example.com',
    },
    status: '진행중',
    contractDate: '2024-03-15',
    startDate: '2024-04-01',
    endDate: null,
    deposit: '5억',
    monthlyRent: null,
    commission: '1200만원',
    commissionStatus: '미지급',
    documents: [
      { name: '매매계약서', status: '완료' },
      { name: '소유권이전등기', status: '진행중' },
    ],
    agent: '김부동',
    notes: '계약금 입금 예정',
    createdAt: '2024-03-15',
    lastModified: '2024-03-20',
    description: '강남역 도보 5분 거리에 위치한 3룸 아파트입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 15만원',
      '주차: 1대 가능',
      '반려동물: 불가능',
    ],
    propertyFloor: '3층',
    propertyDirection: '남향',
    propertyYear: '2015년',
    propertyStructure: '철근콘크리트',
  },
];

export const contractStats = {
  total: 24,
  ongoing: 8,
  completed: 14,
  canceled: 2,
  trends: {
    total: { value: 12, isPositive: true },
    ongoing: { value: 5, isPositive: true },
    completed: { value: 8, isPositive: true },
    canceled: { value: 3, isPositive: false },
  },
}; 