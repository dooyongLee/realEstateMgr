import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/services/endpoints';
import { Customer } from '@/types/customer';

interface CustomerStore {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  getCustomers: () => Promise<void>;
  getCustomer: (id: string) => Promise<Customer | undefined>;
  createCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
}

const useCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],
  loading: false,
  error: null,

  getCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient.get<Customer[]>(API_ENDPOINTS.CUSTOMERS.LIST);
      set({ customers: data, loading: false });
    } catch (error) {
      set({ error: '고객 목록을 불러오는데 실패했습니다.', loading: false });
    }
  },

  getCustomer: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient.get<Customer>(API_ENDPOINTS.CUSTOMERS.DETAIL(id));
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: '고객 정보를 불러오는데 실패했습니다.', loading: false });
    }
  },

  createCustomer: async (customer) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient.post<Customer>(API_ENDPOINTS.CUSTOMERS.CREATE, customer);
      set(state => ({
        customers: [...state.customers, data],
        loading: false,
      }));
    } catch (error) {
      set({ error: '고객 등록에 실패했습니다.', loading: false });
    }
  },

  updateCustomer: async (id, customer) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient.put<Customer>(API_ENDPOINTS.CUSTOMERS.UPDATE(id), customer);
      set(state => ({
        customers: state.customers.map(c => c.id === id ? data : c),
        loading: false,
      }));
    } catch (error) {
      set({ error: '고객 수정에 실패했습니다.', loading: false });
    }
  },

  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(API_ENDPOINTS.CUSTOMERS.DELETE(id));
      set(state => ({
        customers: state.customers.filter(c => c.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: '고객 삭제에 실패했습니다.', loading: false });
    }
  },
}));

export default useCustomerStore;
