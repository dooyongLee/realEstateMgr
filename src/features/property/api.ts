import { apiClient } from '@/lib/api';
import { Property, PropertyFormData, PropertyStats } from './types';

export const propertyApi = {
  // 매물 목록 조회
  getProperties: async () => {
    const response = await apiClient.get<Property[]>('/properties');
    return response.data;
  },

  // 매물 상세 조회
  getProperty: async (id: string) => {
    const response = await apiClient.get<Property>(`/properties/${id}`);
    return response.data;
  },

  // 매물 등록
  createProperty: async (data: PropertyFormData) => {
    const response = await apiClient.post<Property>('/properties', data);
    return response.data;
  },

  // 매물 수정
  updateProperty: async (id: string, data: PropertyFormData) => {
    const response = await apiClient.put<Property>(`/properties/${id}`, data);
    return response.data;
  },

  // 매물 삭제
  deleteProperty: async (id: string) => {
    await apiClient.delete(`/properties/${id}`);
  },

  // 매물 통계 조회
  getPropertyStats: async () => {
    const response = await apiClient.get<PropertyStats>('/properties/stats');
    return response.data;
  },
};
