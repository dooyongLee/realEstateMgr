import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import PropertyPage from '@/features/property/PropertyPage';
import PropertyLayout from '@/features/property/PropertyLayout';
import PropertyDetail from '@/features/property/PropertyDetail';
import PropertyEdit from '@/features/property/PropertyEdit';
import ContractPage from '@/features/contract/ContractPage';
import ContractLayout from '@/features/contract/ContractLayout';
import ContractDetail from '@/features/contract/ContractDetail';
import ContractEdit from '@/features/contract/ContractEdit';
import ContractForm from '@/features/contract/ContractForm';
import CustomerPage from '@/features/customer/CustomerPage';
import CustomerLayout from '@/features/customer/CustomerLayout';
import CustomerDetail from '@/features/customer/CustomerDetail';
import AdminPage from '@/features/admin/AdminPage';
import AdminLayout from '@/features/admin/AdminLayout';
import RealtorManagement from '@/features/admin/RealtorManagement';

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
              {
                path: ':id/edit',
                element: <PropertyEdit />,
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
                path: 'new',
                element: <ContractForm />,
              },
              {
                path: ':id',
                element: <ContractDetail />,
              },              {
                path: ':id/edit',
                element: <ContractEdit />,
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
              {
                path: 'realtors',
                element: <RealtorManagement />,
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