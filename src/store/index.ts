import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { AuthState } from './auth/authState';
import { mutations as authMutations } from './auth/authMutations';
import { actions as authActions } from './auth/authActions';
// import { UserState } from './user/userState'; // Ajuste o nome da interface de estado do usuário
// import { mutations as userMutations } from './user/userMutations';
// import { getters as userGetters } from './user/userGetters';

const store = createStore({
  modules: {
    auth: {
      state: () => ({ token: null } as AuthState),
      mutations: authMutations,
      actions: authActions,
    },
    // user: {
    //   state: UserState,
    //   mutations: userMutations,
    //   getters: userGetters,
    // },
    // Outros módulos aqui...
  },
  plugins: [createPersistedState()],
});

export default store;
