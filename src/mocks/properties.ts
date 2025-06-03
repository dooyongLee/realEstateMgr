export interface Property {
  id: number;
  name: string;
  type: string;
  address: string;
  price: number;
  status: string;
  description: string;
  features: string[];
  availableDate: string;
  agent: string;
  contact: string;
  registeredAt: string;
  viewCount: number;
  interestCount: number;
}

export const properties: Property[] = [
  {
    id: 1,
    name: '강남 아파트',
    type: '아파트',
    address: '서울시 강남구 역삼동 123-45',
    price: 1200000000,
    status: '임대중',
    description: '강남역 5분 거리, 역세권 프리미엄 아파트',
    features: ['주차장', 'CCTV', '엘리베이터', '보안시스템'],
    availableDate: '2024-04-01',
    agent: '김부동',
    contact: '010-1234-5678',
    registeredAt: '2024-03-15',
    viewCount: 156,
    interestCount: 23,
  },
  {
    id: 2,
    name: '송파 오피스텔',
    type: '오피스텔',
    address: '서울시 송파구 잠실동 456-78',
    price: 800000000,
    status: '계약대기',
    description: '잠실역 3분 거리, 신축 오피스텔',
    features: ['주차장', 'CCTV', '엘리베이터', '보안시스템', '헬스장'],
    availableDate: '2024-03-25',
    agent: '이부동',
    contact: '010-2345-6789',
    registeredAt: '2024-03-14',
    viewCount: 98,
    interestCount: 15,
  },
  {
    id: 3,
    name: '마포 상가',
    type: '상가',
    address: '서울시 마포구 합정동 789-12',
    price: 500000000,
    status: '임대가능',
    description: '합정역 2분 거리, 상권 좋은 상가',
    features: ['주차장', 'CCTV', '보안시스템'],
    availableDate: '2024-03-20',
    agent: '박부동',
    contact: '010-3456-7890',
    registeredAt: '2024-03-13',
    viewCount: 75,
    interestCount: 12,
  },
  {
    id: 4,
    name: '용산 사무실',
    type: '사무실',
    address: '서울시 용산구 이태원동 345-67',
    price: 300000000,
    status: '임대중',
    description: '이태원역 1분 거리, 프리미엄 사무실',
    features: ['주차장', 'CCTV', '엘리베이터', '보안시스템', '회의실'],
    availableDate: '2024-03-18',
    agent: '최부동',
    contact: '010-4567-8901',
    registeredAt: '2024-03-12',
    viewCount: 120,
    interestCount: 18,
  },
  {
    id: 5,
    name: '서초 주택',
    type: '주택',
    address: '서울시 서초구 서초동 234-56',
    price: 1500000000,
    status: '임대가능',
    description: '서초역 4분 거리, 넓은 주택',
    features: ['주차장', 'CCTV', '정원', '테라스'],
    availableDate: '2024-03-22',
    agent: '정부동',
    contact: '010-5678-9012',
    registeredAt: '2024-03-11',
    viewCount: 85,
    interestCount: 14,
  },
]; 