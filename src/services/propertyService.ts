import axios from 'axios';

export interface Property {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// 임시 목업 데이터
const mockProperties: Property[] = [
  {
    id: 1,
    name: '강남 아파트',
    address: '서울특별시 강남구 테헤란로 123',
    latitude: 37.5665,
    longitude: 126.9780,
  },
  {
    id: 2,
    name: '송파 오피스텔',
    address: '서울특별시 송파구 올림픽로 456',
    latitude: 37.5139,
    longitude: 127.1006,
  },
  {
    id: 3,
    name: '마포 상가',
    address: '서울특별시 마포구 홍대입구로 789',
    latitude: 37.5575,
    longitude: 126.9255,
  },
  {
    id: 4,
    name: '용산 빌라',
    address: '서울특별시 용산구 이태원로 101',
    latitude: 37.5316,
    longitude: 126.9904,
  },
  {
    id: 5,
    name: '종로 상가',
    address: '서울특별시 종로구 인사동길 202',
    latitude: 37.5737,
    longitude: 126.9830,
  },
];

export const getProperties = async (): Promise<Property[]> => {
  // API 서버가 구현되면 아래 주석을 해제하고 목업 데이터 부분을 제거
  // const response = await axios.get('/api/properties');
  // return response.data;
  
  // 임시로 목업 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProperties);
    }, 500); // API 호출을 시뮬레이션하기 위한 지연
  });
}; 