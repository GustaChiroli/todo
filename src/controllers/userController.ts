import api from './axiosInstance';
import store from '../store/index';
import userModel from '../models/userModel';
import loginUserModel from '../models/loginUserModel';
import { useRouter } from 'vue-router';

function redirectToLogin() {
  const router = useRouter();
  router.push({ name: 'login' });
}

/**
 * A function that register a user in the DataBase
 * @param {JSON} user A JSON with email and password to the API
 * @returns {JSON} A JSON with a message
 */
export async function registerUserController(user: userModel) {
  let request = await api.post('/criar_login', user);
  return request;
}

/**
 * A function that login a user
 * @param {JSON} user A JSON with email and password to the API
 * @returns {JSON} A JSON with a message and token
 */
export async function loginUserController(user: loginUserModel) {
  let request = await api.post('/login', user);
  await store.dispatch('saveToken', request.data.token);
  return request;
}

/** A function that logout a user
 * @return {JSON} A JSON with a message
 */
export async function logoutUserController() {
  let token = store.getters.getToken;
  let request = await api.post('/logout', { token: token });
  await store.dispatch('unSaveToken');
  redirectToLogin();
  return request;
}
