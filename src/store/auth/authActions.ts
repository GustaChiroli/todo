import { ActionTree } from 'vuex';
import { AuthState } from './authState';
import { mutations as authMutations } from './authMutations'; // Importe as mutações corretamente

export const actions: ActionTree<AuthState, AuthState> = {
  saveToken({ commit }, token) {
    commit('saveToken', token);
    console.log('entrou no actions');
  },
  unsaveToken({ commit }) {
    commit('unsetToken');
  },
};
