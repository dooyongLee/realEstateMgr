import { apiClient } from '@/services/apiClient';
import { Contract, ContractFormData, ContractStats } from './types';

const BASE_URL = '/contracts';

export const contractApi = {
  // 계약 목록 조회
  getContracts: async () => {
    const response = await apiClient.get<Contract[]>(BASE_URL);
    return response.data;
  },

  // 계약 상세 조회
  getContract: async (id: string) => {
    const response = await apiClient.get<Contract>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // 계약 생성
  createContract: async (data: ContractFormData) => {
    const response = await apiClient.post<Contract>(BASE_URL, data);
    return response.data;
  },

  // 계약 수정
  updateContract: async (id: string, data: Partial<ContractFormData>) => {
    const response = await apiClient.put<Contract>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // 계약 삭제
  deleteContract: async (id: string) => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },

  // 계약 통계 조회
  getContractStats: async () => {
    const response = await apiClient.get<ContractStats>(`${BASE_URL}/stats`);
    return response.data;
  },
};
