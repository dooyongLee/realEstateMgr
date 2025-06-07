import { BoardPost, BoardComment } from '@/types/board';

const mockAuthor = {
  id: 1,
  name: '관리자',
  email: 'admin@example.com'
};

export const mockNotices: BoardPost[] = [
  {
    id: 1,
    title: '시스템 점검 안내',
    content: '2024년 3월 20일 02:00 ~ 04:00 동안 시스템 점검이 진행됩니다.',
    author: mockAuthor,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    views: 150,
    comments: 0,
    type: 'NOTICE'
  },
  {
    id: 2,
    title: '신규 기능 업데이트 안내',
    content: '부동산 관리 시스템에 새로운 기능이 추가되었습니다.',
    author: mockAuthor,
    createdAt: '2024-03-14T09:00:00Z',
    updatedAt: '2024-03-14T09:00:00Z',
    views: 120,
    comments: 0,
    type: 'NOTICE'
  }
];

export const mockFaqs: BoardPost[] = [
  {
    id: 1,
    title: '계약서 등록은 어떻게 하나요?',
    content: '계약서 등록 방법에 대한 안내입니다.',
    author: mockAuthor,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    views: 200,
    comments: 0,
    type: 'FAQ'
  },
  {
    id: 2,
    title: '임대료 납부 방법은?',
    content: '임대료 납부 방법에 대한 안내입니다.',
    author: mockAuthor,
    createdAt: '2024-03-14T09:00:00Z',
    updatedAt: '2024-03-14T09:00:00Z',
    views: 180,
    comments: 0,
    type: 'FAQ'
  }
];

export const mockFreePosts: BoardPost[] = [
  {
    id: 1,
    title: '부동산 시장 동향에 대한 의견',
    content: '최근 부동산 시장의 동향에 대해 의견을 나누고 싶습니다.',
    author: {
      id: 2,
      name: '홍길동',
      email: 'hong@example.com'
    },
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    views: 150,
    comments: 5,
    type: 'FREE'
  },
  {
    id: 2,
    title: '전세 계약 관련 질문',
    content: '전세 계약 시 주의해야 할 점이 있을까요?',
    author: {
      id: 3,
      name: '김철수',
      email: 'kim@example.com'
    },
    createdAt: '2024-03-14T09:00:00Z',
    updatedAt: '2024-03-14T09:00:00Z',
    views: 89,
    comments: 3,
    type: 'FREE'
  }
];

export const mockComments: BoardComment[] = [
  {
    id: 1,
    postId: 1,
    content: '좋은 의견 감사합니다. 저도 비슷한 생각을 가지고 있습니다.',
    author: {
      id: 3,
      name: '김철수',
      role: 'USER',
    },
    createdAt: '2024-03-15T11:00:00',
    updatedAt: '2024-03-15T11:00:00',
  },
  {
    id: 2,
    postId: 1,
    content: '다른 관점에서 보면 어떨까요?',
    author: {
      id: 4,
      name: '이영희',
      role: 'USER',
    },
    createdAt: '2024-03-15T12:00:00',
    updatedAt: '2024-03-15T12:00:00',
    parentId: 1,
  },
]; 