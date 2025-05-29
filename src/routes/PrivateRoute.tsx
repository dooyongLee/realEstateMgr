import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  console.log('PrivateRoute rendered', {
    isAuthenticated,
    location: location.pathname,
  });

  // 개발 중에는 항상 인증된 상태로 처리
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  console.log('Rendering protected route content');
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute; 