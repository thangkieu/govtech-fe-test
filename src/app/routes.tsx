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
    component: loadable(() => import('../pages/DashboardPage')),
  },
];
