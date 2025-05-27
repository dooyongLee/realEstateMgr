import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import PropertyPage from '@/features/property/PropertyPage';
import PropertyLayout from '@/features/property/PropertyLayout';
import PropertyDetail from '@/features/property/PropertyDetail';
import ContractPage from '@/features/contract/ContractPage';
import ContractLayout from '@/features/contract/ContractLayout';
import ContractDetail from '@/features/contract/ContractDetail';
import CustomerPage from '@/features/customer/CustomerPage';
import CustomerLayout from '@/features/customer/CustomerLayout';
import CustomerDetail from '@/features/customer/CustomerDetail';
import AdminPage from '@/features/admin/AdminPage';
import AdminLayout from '@/features/admin/AdminLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/properties',
            element: <PropertyLayout />,
            children: [
              {
                index: true,
                element: <PropertyPage />,
              },
              {
                path: 'new',
                element: <PropertyPage />,
              },
              {
                path: ':id',
                element: <PropertyDetail />,
              },
            ],
          },
          {
            path: '/contracts',
            element: <ContractLayout />,
            children: [
              {
                index: true,
                element: <ContractPage />,
              },
              {
                path: ':id',
                element: <ContractDetail />,
              },
            ],
          },
          {
            path: '/customers',
            element: <CustomerLayout />,
            children: [
              {
                index: true,
                element: <CustomerPage />,
              },
              {
                path: ':id',
                element: <CustomerDetail />,
              },
            ],
          },
          {
            path: '/admin',
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminPage />,
              },
            ],
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router; 