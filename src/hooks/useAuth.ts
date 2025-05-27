import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuthStore();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        await login(email, password);
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [login, navigate]
  );

  const handleRegister = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        await register(email, password, name);
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    [register, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
  };
};

export default useAuth; 