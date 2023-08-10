import { createStore } from 'vuex';

interface State {
  token: string | null;
  pendingProducts: any[] | null;
}

const store = createStore<State>({
  state: {
    token: null,
    pendingProducts: null,
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    unSetToken(state) {
      state.token = null;
    },
    setPendingProducts(state, pendingProducts: any[]) {
      state.pendingProducts = pendingProducts;
    },
  },
  actions: {
    saveToken({ commit }, token: string) {
      commit('setToken', token);
    },
    unSaveToken({ commit }) {
      commit('unSetToken');
    },
    savePendingProducts({ commit }, pendingProducts: any[]) {
      commit('setPendingProducts', pendingProducts);
    },
  },
  getters: {
    getToken: (state) => state.token,
    hasAuthToken: (state) => !!state.token,
    pendingProducts: (state) => state.pendingProducts,
  },
});

export default store;
