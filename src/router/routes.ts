import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import RegisterAccountPage from '../pages/RegisterAccountPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/registeraccount',
    name: 'registeraccount',
    component: RegisterAccountPage,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
