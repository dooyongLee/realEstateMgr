import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/services/endpoints';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Omit<UserProfile, 'id' | 'email' | 'role' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.get<UserProfile>(API_ENDPOINTS.USERS.PROFILE);
      
      set({
        profile: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '프로필을 불러오는데 실패했습니다.',
        isLoading: false,
      });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.put<UserProfile>(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
      
      set({
        profile: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '프로필 업데이트에 실패했습니다.',
        isLoading: false,
      });
    }
  },

  updateAvatar: async (file) => {
    try {
      set({ isLoading: true, error: null });
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await apiClient.put<UserProfile>(
        `${API_ENDPOINTS.USERS.UPDATE_PROFILE}/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      set({
        profile: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '프로필 이미지 업데이트에 실패했습니다.',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
})); 