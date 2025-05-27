import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Lazy-loaded components
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Property = lazy(() => import('@/pages/PropertyPage'));
const PropertyDetail = lazy(() => import('@/pages/PropertyDetail'));
const Contracts = lazy(() => import('@/pages/ContractPage'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/properties',
    element: <Property />,
  },
  {
    path: '/properties/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/contracts',
    element: (
      <PrivateRoute>
        <ContractPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]); 