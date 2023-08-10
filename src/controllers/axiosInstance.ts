import axios from 'axios';
import store from '../store/index'; //importa a instancia do vuex
import { useRouter } from 'vue-router';

axios.defaults.baseURL = 'http://26.122.188.167:5000'; //ip leo
// axios.defaults.baseURL = 'https://sistemagustavo.up.railway.app'; //ip railway
// axios.defaults.baseURL = 'http://127.0.0.1:5000';
// axios.defaults.baseURL = 'http://26.117.159.23:5000'; //ip lari
axios.defaults.headers.common['Content-Type'] = 'application/json';

const router = useRouter();

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

//Usa o interceptor do axios para adicionar o token do vuex ao header de autorização
api.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers['Authorization'] = `${token}`; //adiciona o token ao header de autorização
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Use o interceptor do Axios para verificar se o token está expirado
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 498) {
      // Token expirado ou inválido, fala o logout do usuário
      store.commit('logout'); // Chama a mutação de logout no Vuex store
      router.push('/'); // redireciona o usuário para a pagina de login
    }
    return Promise.reject(error);
  }
);

export default api;
