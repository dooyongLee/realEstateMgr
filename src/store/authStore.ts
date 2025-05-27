import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/services/endpoints';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// 개발용 더미 사용자 데이터
const dummyUser: User = {
  id: '1',
  email: 'dev@example.com',
  name: '개발자',
  role: 'admin',
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: dummyUser,
      token: 'dummy-token',
      isAuthenticated: true, // 개발 중에는 항상 인증된 상태
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        // 개발 중에는 로그인 로직 우회
        set({
          user: dummyUser,
          token: 'dummy-token',
          isAuthenticated: true,
          isLoading: false,
        });
      },

      register: async (email: string, password: string, name: string) => {
        // 개발 중에는 회원가입 로직 우회
        set({
          user: dummyUser,
          token: 'dummy-token',
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        // 개발 중에는 로그아웃 시에도 인증 상태 유지
        set({
          user: dummyUser,
          token: 'dummy-token',
          isAuthenticated: true,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore; 