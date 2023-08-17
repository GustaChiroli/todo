import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { authState } from './auth/authState';
import { mutations as authMutations } from './auth/authMutations';
import { actions as authActions } from './auth/authActions';
import { getters as authGetters } from './auth/authGetters';
import { userState } from './user/userState';
import { mutations as userMutations } from './user/userMutation';
import { actions as userActions } from './user/userActions';
import { getters as userGetters } from './user/userGetters';

const store = createStore({
  modules: {
    // auth: {
    //   state: authState,
    //   mutations: authMutations,
    //   actions: authActions,
    //   getters: authGetters,
    // },
    user: {
      state: userState,
      mutations: userMutations,
      actions: userActions,
      getters: userGetters,
    },
  },
  plugins: [createPersistedState()],
});

export default store;
