import loadable from '@loadable/component';

export const routes = [
  {
    path: '/login',
    exact: true,
    component: loadable(() => import('../pages/LoginPage')),
  },
  {
    path: '/',
    exact: true,
    auth: true,
    component: loadable(() => import('../pages/DashboardPage')),
  },
  {
    path: '/apps/staff_profiles',
    exact: true,
    auth: true,
    component: loadable(() => import('../pages/StaffProfileFetcher')),
  },
];
