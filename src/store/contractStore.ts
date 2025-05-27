import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/services/endpoints';
import { PaginatedResponse } from '@/services/types';

interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  totalBookings: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  fetchUserBookings: (page?: number, limit?: number) => Promise<void>;
  fetchBookingById: (id: string) => Promise<void>;
  createBooking: (bookingData: Omit<Booking, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  selectedBooking: null,
  totalBookings: 0,
  currentPage: 1,
  isLoading: false,
  error: null,

  fetchUserBookings: async (page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.get<PaginatedResponse<Booking>>(
        `${API_ENDPOINTS.BOOKINGS.USER_BOOKINGS}?page=${page}&limit=${limit}`
      );
      
      set({
        bookings: response.data,
        totalBookings: response.total,
        currentPage: response.page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '예약 목록을 불러오는데 실패했습니다.',
        isLoading: false,
      });
    }
  },

  fetchBookingById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.get<Booking>(`${API_ENDPOINTS.BOOKINGS.BASE}/${id}`);
      
      set({
        selectedBooking: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '예약 정보를 불러오는데 실패했습니다.',
        isLoading: false,
      });
    }
  },

  createBooking: async (bookingData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.BASE, bookingData);
      
      set((state) => ({
        bookings: [response.data, ...state.bookings],
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '예약 생성에 실패했습니다.',
        isLoading: false,
      });
    }
  },

  cancelBooking: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await apiClient.put(`${API_ENDPOINTS.BOOKINGS.BASE}/${id}/cancel`);
      
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id ? { ...booking, status: 'cancelled' } : booking
        ),
        selectedBooking: state.selectedBooking?.id === id
          ? { ...state.selectedBooking, status: 'cancelled' }
          : state.selectedBooking,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '예약 취소에 실패했습니다.',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
})); 