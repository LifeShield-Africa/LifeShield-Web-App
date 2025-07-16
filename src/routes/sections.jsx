import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import ProtectedRoute from 'src/protectedRoute';
import DashboardLayout from 'src/layouts/dashboard';

import { PasswordNew } from 'src/sections/PasswordNew';
import { ResetPassword } from 'src/sections/ResetPassword';

export const HomePage = lazy(() => import('src/pages/app'));
export const MedicationsPage = lazy(() => import('src/pages/medications'));
export const CustomersPage = lazy(() => import('src/pages/customers'));
export const ClaimsPage = lazy(() => import('src/pages/claims'));
export const PharmaciesPage = lazy(() => import('src/pages/pharmacies'));
export const ReportsPage = lazy(() => import('src/pages/reports'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const OrdersView = lazy(() => import('src/pages/orders'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (

          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>

      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'medications', element: <MedicationsPage /> },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'claims', element: <ClaimsPage /> },
        { path: 'pharmacies', element: <PharmaciesPage /> },
        { path: 'orders', element: <OrdersView /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: "reset-password/email",
      element: <ResetPassword />
    },
    {
      path: "new-password",
      element: <PasswordNew />
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
