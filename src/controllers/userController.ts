import api from './axiosInstance';
import userModelRegister from '../models/userModelRegister';
import loginUserModel from '../models/loginUserModel';
// import { mapActions, useStore } from 'vuex';
import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';
import store from '../store/index.js';
import * as actionTypes from '../store/auth/action-types.js';

// const store = useStore();

/**
 * A function that register a user in the DataBase
 * @param {JSON} user A JSON with email and password to the API
 * @returns {JSON} A JSON with a message
 */
export async function registerUserController(user: userModelRegister) {
  const request = await api.post('/criar_login', user);
  return request;
}

/**
 * A function that login a user
 * @param {JSON} user A JSON with email and password to the API
 * @returns {JSON} A JSON with a message and token
 */
export async function loginUserController(user: loginUserModel) {
  const request = await api.post('/login', user);
  return request;
}

/** A function that logout a user
 * @return {JSON} A JSON with a message
 */
export async function logoutUserController() {
  const token = await store.state.auth.token;
  const request = await api.post('/logout', { token: token });
  store.dispatch(actionTypes.UNSET_TOKEN);
  store.dispatch(actionTypes.UNSET_ISVALIDATED);

  return request;
}

export async function validateEmail(code: string) {
  const request = await api.post('/verificar_email', code);
  return request;
}
