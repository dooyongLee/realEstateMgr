import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { CircularProgress, Box } from '@mui/material';

// Lazy-loaded components
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Property = lazy(() => import('@/pages/PropertyPage'));
const PropertyDetail = lazy(() => import('@/pages/PropertyDetail'));
const ContractPage = lazy(() => import('@/features/contract/ContractPage'));
const ContractDetail = lazy(() => import('@/features/contract/ContractDetail'));
const ContractEdit = lazy(() => import('@/features/contract/ContractEdit'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

// Route wrapper with Suspense
const RouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteWrapper><Home /></RouteWrapper>,
  },
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <RouteWrapper><Login /></RouteWrapper>,
      },
    ],
  },
  {
    path: '/register',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <RouteWrapper><Register /></RouteWrapper>,
      },
    ],
  },
  {
    path: '/properties',
    element: <RouteWrapper><Property /></RouteWrapper>,
  },
  {
    path: '/properties/:id',
    element: <RouteWrapper><PropertyDetail /></RouteWrapper>,
  },
  {
    path: '/contracts',
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <RouteWrapper><ContractPage /></RouteWrapper>,
      },
      {
        path: ':id',
        element: <RouteWrapper><ContractDetail /></RouteWrapper>,
      },
      {
        path: ':id/edit',
        element: <RouteWrapper><ContractEdit /></RouteWrapper>,
      },
    ],
  },
  {
    path: '/profile',
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <RouteWrapper><Profile /></RouteWrapper>,
      },
    ],
  },
  {
    path: '*',
    element: <RouteWrapper><NotFound /></RouteWrapper>,
  },
]);

export default router; 