import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LoginPage,
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
