import { MutationTree } from 'vuex';
import { AuthState } from './authState';

export const mutations: MutationTree<AuthState> = {
  saveToken(state, token) {
    state.token = token;
    console.log('entrou mutations');
  },
  unsetToken(state) {
    state.token = null;
  },
};
