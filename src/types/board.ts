export type BoardType = 'NOTICE' | 'FAQ' | 'FREE';

export interface User {
  id: number;
  name: string;
  role: 'ADMIN' | 'USER';
}

export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface BoardPost {
  id: number;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  views: number;
  comments: number;
  type: 'NOTICE' | 'FAQ' | 'FREE';
}

export interface BoardComment {
  id: number;
  postId: number;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  parentId?: number;
}

export interface BoardFormData {
  id?: number;
  type?: BoardType;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
} 