import { createContext } from 'react';
import { useAuthStore } from '@/store';

export const AuthContext = createContext<ReturnType<typeof useAuthStore> | null>(null);
