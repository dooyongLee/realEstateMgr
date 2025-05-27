import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  // 개발 중에는 항상 인증된 상태로 처리
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute; 