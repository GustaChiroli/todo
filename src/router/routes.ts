import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import RegisterAccountPage from '../pages/RegisterAccountPage.vue';
import ValidateAccountPage from '../pages/ValidateAccountPage.vue';
import TaskPage from '../pages/TaskPage.vue';
import EventsPage from '../pages/EventsPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/validate/:code',
    name: 'validate',
    component: ValidateAccountPage,
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
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskPage,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/events',
    name: 'events',
    component: EventsPage,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
