import { BoardPost, BoardComment, BoardFormData } from '@/types/board';
import { mockNotices, mockFaqs, mockFreePosts, mockComments } from '@/mocks/board';

// 게시글 목록 조회
export const getPosts = async (type: 'NOTICE' | 'FAQ' | 'FREE'): Promise<BoardPost[]> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // const response = await fetch(`/api/board/${type.toLowerCase()}`);
  // return response.json();

  // Mock 데이터 반환
  switch (type) {
    case 'NOTICE':
      return mockNotices;
    case 'FAQ':
      return mockFaqs;
    case 'FREE':
      return mockFreePosts;
    default:
      return [];
  }
};

// 게시글 상세 조회
export const getPost = async (type: 'NOTICE' | 'FAQ' | 'FREE', id: number): Promise<BoardPost | null> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // const response = await fetch(`/api/board/${type.toLowerCase()}/${id}`);
  // return response.json();

  // Mock 데이터 반환
  const posts = await getPosts(type);
  return posts.find(post => post.id === id) || null;
};

// 게시글 작성
export const createPost = async (type: 'NOTICE' | 'FAQ' | 'FREE', data: BoardFormData): Promise<BoardPost> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // const response = await fetch(`/api/board/${type.toLowerCase()}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // Mock 데이터 생성
  const { type: _, ...postData } = data; // Remove type from data to avoid conflict
  const newPost: BoardPost = {
    id: Date.now(),
    type,
    ...postData,
    author: {
      id: 1, // 실제로는 현재 로그인한 사용자 정보 사용
      name: '관리자',
      role: 'ADMIN',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 0,
  };

  return newPost;
};

// 게시글 수정
export const updatePost = async (type: 'NOTICE' | 'FAQ' | 'FREE', id: number, data: BoardFormData): Promise<BoardPost> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // const response = await fetch(`/api/board/${type.toLowerCase()}/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // Mock 데이터 수정
  const post = await getPost(type, id);
  if (!post) {
    throw new Error('Post not found');
  }

  return {
    ...post,
    ...data,
    updatedAt: new Date().toISOString(),
  };
};

// 게시글 삭제
export const deletePost = async (type: 'NOTICE' | 'FAQ' | 'FREE', id: number): Promise<void> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // await fetch(`/api/board/${type.toLowerCase()}/${id}`, {
  //   method: 'DELETE',
  // });

  // Mock 데이터에서는 아무것도 하지 않음
  return;
};

// 댓글 목록 조회
export const getComments = async (postId: number): Promise<BoardComment[]> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // const response = await fetch(`/api/board/comments/${postId}`);
  // return response.json();

  // Mock 데이터 반환
  return mockComments.filter(comment => comment.postId === postId);
};

// 댓글 작성
export const createComment = async (postId: number, content: string): Promise<BoardComment> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // const response = await fetch(`/api/board/comments`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ postId, content }),
  // });
  // return response.json();

  // Mock 데이터 생성
  const newComment: BoardComment = {
    id: Date.now(),
    postId,
    content,
    author: {
      id: 1, // 실제로는 현재 로그인한 사용자 정보 사용
      name: '관리자',
      role: 'ADMIN',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newComment;
};

// 댓글 수정
export const updateComment = async (id: number, content: string): Promise<BoardComment> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // const response = await fetch(`/api/board/comments/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ content }),
  // });
  // return response.json();

  // Mock 데이터 수정
  const comment = mockComments.find(c => c.id === id);
  if (!comment) {
    throw new Error('Comment not found');
  }

  return {
    ...comment,
    content,
    updatedAt: new Date().toISOString(),
  };
};

// 댓글 삭제
export const deleteComment = async (id: number): Promise<void> => {
  // 실제 API 연동 시에는 아래와 같이 구현
  // await fetch(`/api/board/comments/${id}`, {
  //   method: 'DELETE',
  // });

  // Mock 데이터에서는 아무것도 하지 않음
  return;
}; 