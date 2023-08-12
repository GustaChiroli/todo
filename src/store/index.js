import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { authState } from './auth/authState';
import { mutations as authMutations } from './auth/authMutations';
import { actions as authActions } from './auth/authActions';
import { getters as authGetters } from './auth/authGetters';

const store = createStore({
  modules: {
    auth: {
      state: authState,
      mutations: authMutations,
      actions: authActions,
      getters: authGetters,
    },
  },
  plugins: [createPersistedState()],
});

export default store;
