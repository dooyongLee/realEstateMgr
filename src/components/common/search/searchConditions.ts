import { SearchCondition } from './SearchPanel';

// 매물 관리 검색 조건
export const propertySearchConditions: SearchCondition[] = [
  {
    field: 'type',
    label: '매물 종류',
    type: 'select',
    options: [
      { value: 'apartment', label: '아파트' },
      { value: 'house', label: '주택' },
      { value: 'commercial', label: '상가' },
      { value: 'office', label: '사무실' },
      { value: 'land', label: '토지' }
    ]
  },
  {
    field: 'status',
    label: '상태',
    type: 'select',
    options: [
      { value: 'available', label: '매물 있음' },
      { value: 'reserved', label: '예약중' },
      { value: 'sold', label: '계약 완료' }
    ]
  },
  {
    field: 'priceRange',
    label: '가격대',
    type: 'select',
    options: [
      { value: 'under_100', label: '1억 미만' },
      { value: '100_300', label: '1억~3억' },
      { value: '300_500', label: '3억~5억' },
      { value: '500_1000', label: '5억~10억' },
      { value: 'over_1000', label: '10억 이상' }
    ]
  }
];

// 계약 관리 검색 조건
export const contractSearchConditions: SearchCondition[] = [
  {
    field: 'status',
    label: '계약 상태',
    type: 'select',
    options: [
      { value: 'pending', label: '대기중' },
      { value: 'in_progress', label: '진행중' },
      { value: 'completed', label: '완료' },
      { value: 'cancelled', label: '취소' }
    ]
  },
  {
    field: 'type',
    label: '계약 종류',
    type: 'select',
    options: [
      { value: 'sale', label: '매매' },
      { value: 'lease', label: '임대' },
      { value: 'deposit', label: '전세' },
      { value: 'monthly', label: '월세' } 
    ]
  },
  {
    field: 'period',
    label: '계약 기간',
    type: 'select',
    options: [
      { value: '6month', label: '6개월' },
      { value: '1year', label: '1년' },
      { value: '2year', label: '2년' },
      { value: '3year', label: '3년' },
      { value: 'over3year', label: '3년 이상' }
    ]
  }
];

// 고객 관리 검색 조건
export const customerSearchConditions: SearchCondition[] = [
  {
    field: 'type',
    label: '고객 유형',
    type: 'select',
    options: [
      { value: 'buyer', label: '매수자' },
      { value: 'seller', label: '매도자' },
      { value: 'tenant', label: '임차인' },
      { value: 'landlord', label: '임대인' }
    ]
  },
  {
    field: 'grade',
    label: '고객 등급',
    type: 'select',
    options: [
      { value: 'vip', label: 'VIP' },
      { value: 'gold', label: '골드' },
      { value: 'silver', label: '실버' },
      { value: 'bronze', label: '브론즈' }
    ]
  },
  {
    field: 'status',
    label: '상태',
    type: 'select',
    options: [
      { value: 'active', label: '활성' },
      { value: 'inactive', label: '비활성' },
      { value: 'blacklist', label: '블랙리스트' }
    ]
  }
];

// 공지사항 검색 조건
export const noticeSearchConditions: SearchCondition[] = [
  {
    field: 'type',
    label: '공지 유형',
    type: 'select',
    options: [
      { value: 'general', label: '일반' },
      { value: 'important', label: '중요' },
      { value: 'event', label: '이벤트' },
      { value: 'maintenance', label: '시스템 점검' }
    ]
  },
  {
    field: 'status',
    label: '상태',
    type: 'select',
    options: [
      { value: 'active', label: '활성' },
      { value: 'expired', label: '만료' },
      { value: 'draft', label: '임시저장' }
    ]
  }
];

// 예약 관리 검색 조건
export const bookingSearchConditions: SearchCondition[] = [
  {
    field: 'status',
    label: '예약 상태',
    type: 'select',
    options: [
      { value: 'pending', label: '대기중' },
      { value: 'confirmed', label: '확정' },
      { value: 'cancelled', label: '취소' },
      { value: 'completed', label: '완료' }
    ]
  },
  {
    field: 'type',
    label: '예약 종류',
    type: 'select',
    options: [
      { value: 'viewing', label: '매물 보기' },
      { value: 'consultation', label: '상담' },
      { value: 'contract', label: '계약' }
    ]
  }
];

// 기본 검색 조건 (공통)
export const defaultSearchConditions: SearchCondition[] = [
  {
    field: 'dateRange',
    label: '기간',
    type: 'select',
    options: [
      { value: 'today', label: '오늘' },
      { value: 'week', label: '이번 주' },
      { value: 'month', label: '이번 달' },
      { value: 'quarter', label: '분기' },
      { value: 'year', label: '올해' },
      { value: 'custom', label: '직접 입력' }
    ]
  }
]; 