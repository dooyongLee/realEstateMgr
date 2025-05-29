import { create } from 'zustand';
import { Customer } from '@/types/customer';

interface CustomerStore {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  getCustomers: () => Promise<void>;
  getCustomer: (id: number) => Promise<Customer>;
  createCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Customer>;
  updateCustomer: (id: number, customer: Partial<Customer>) => Promise<Customer>;
  deleteCustomer: (id: number) => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],
  loading: false,
  error: null,

  getCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      set({ customers: data, loading: false });
    } catch (error) {
      set({ error: '고객 목록을 불러오는데 실패했습니다.', loading: false });
    }
  },

  getCustomer: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/customers/${id}`);
      const data = await response.json();
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: '고객 정보를 불러오는데 실패했습니다.', loading: false });
      throw error;
    }
  },

  createCustomer: async (customer) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      set(state => ({
        customers: [...state.customers, data],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: '고객 등록에 실패했습니다.', loading: false });
      throw error;
    }
  },

  updateCustomer: async (id, customer) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      set(state => ({
        customers: state.customers.map(c => c.id === id ? data : c),
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: '고객 수정에 실패했습니다.', loading: false });
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      set(state => ({
        customers: state.customers.filter(c => c.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: '고객 삭제에 실패했습니다.', loading: false });
      throw error;
    }
  },
})); 