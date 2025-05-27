import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/services/endpoints';
import { PaginatedResponse } from '@/services/types';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status: string;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

interface PropertyState {
  properties: Property[];
  featuredProperties: Property[];
  selectedProperty: Property | null;
  totalProperties: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  fetchProperties: (page?: number, limit?: number) => Promise<void>;
  fetchFeaturedProperties: () => Promise<void>;
  fetchPropertyById: (id: string) => Promise<void>;
  searchProperties: (query: string) => Promise<void>;
  clearError: () => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  featuredProperties: [],
  selectedProperty: null,
  totalProperties: 0,
  currentPage: 1,
  isLoading: false,
  error: null,

  fetchProperties: async (page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.get<PaginatedResponse<Property>>(
        `${API_ENDPOINTS.PROPERTIES.BASE}?page=${page}&limit=${limit}`
      );
      
      set({
        properties: response.data,
        totalProperties: response.total,
        currentPage: response.page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '부동산 목록을 불러오는데 실패했습니다.',
        isLoading: false,
      });
    }
  },

  fetchFeaturedProperties: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.get<Property[]>(API_ENDPOINTS.PROPERTIES.FEATURED);
      
      set({
        featuredProperties: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '추천 부동산을 불러오는데 실패했습니다.',
        isLoading: false,
      });
    }
  },

  fetchPropertyById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.get<Property>(`${API_ENDPOINTS.PROPERTIES.BASE}/${id}`);
      
      set({
        selectedProperty: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '부동산 정보를 불러오는데 실패했습니다.',
        isLoading: false,
      });
    }
  },

  searchProperties: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.get<PaginatedResponse<Property>>(
        `${API_ENDPOINTS.PROPERTIES.SEARCH}?q=${query}`
      );
      
      set({
        properties: response.data,
        totalProperties: response.total,
        currentPage: response.page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '검색에 실패했습니다.',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
})); 