import { apiClient } from '@/lib/api';
import { Customer, CustomerFormData, CustomerStats } from './types';

export const customerApi = {
  // 고객 목록 조회
  getCustomers: async () => {
    const response = await apiClient.get<Customer[]>('/customers');
    return response.data;
  },

  // 고객 상세 조회
  getCustomer: async (id: string) => {
    const response = await apiClient.get<Customer>(`/customers/${id}`);
    return response.data;
  },

  // 고객 등록
  createCustomer: async (data: CustomerFormData) => {
    const response = await apiClient.post<Customer>('/customers', data);
    return response.data;
  },

  // 고객 수정
  updateCustomer: async (id: string, data: CustomerFormData) => {
    const response = await apiClient.put<Customer>(`/customers/${id}`, data);
    return response.data;
  },

  // 고객 삭제
  deleteCustomer: async (id: string) => {
    await apiClient.delete(`/customers/${id}`);
  },

  // 고객 통계 조회
  getCustomerStats: async () => {
    const response = await apiClient.get<CustomerStats>('/customers/stats');
    return response.data;
  },
};
