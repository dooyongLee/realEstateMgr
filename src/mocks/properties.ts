import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    type: 'APARTMENT',
    name: '래미안아파트',
    price: 1200000000,
    area: 120,
    floor: 5,
    features: ['주차 2대', '엘리베이터', 'CCTV', '24시간 경비'],
    address: '서울시 강남구 역삼동',
    description: '강남역 도보 5분 거리에 위치한 프리미엄 아파트입니다.',
    images: [
      'https://picsum.photos/800/400?random=1',
      'https://picsum.photos/800/400?random=2',
    ],
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: '2',
    type: 'OFFICETEL',
    name: '푸르지오오피스텔',
    price: 800000000,
    area: 80,
    floor: 3,
    features: ['주차 1대', '엘리베이터', 'CCTV'],
    address: '서울시 송파구 잠실동',
    description: '잠실역 인근의 고급 오피스텔입니다.',
    images: [
      'https://picsum.photos/800/400?random=3',
      'https://picsum.photos/800/400?random=4',
    ],
    createdAt: '2024-03-14T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
  },
]; 