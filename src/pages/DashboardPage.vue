<template>
  <button @click="logOut">deslogar</button>
  <h1>DASHBOARD</h1>
</template>

<script lang="ts">
import { ref, Ref, defineComponent } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import store from '../store/index';

const login = ref('');
const password = ref('');
const confirmPassword = ref('');

const passwordRules = [
  (val: string) =>
    (val && val.length >= 6) || 'Password must be at least 6 characters',
];
const confirmPasswordRules = [
  (val: string) => val && val.length >= 6 && val === password.value,
];

const emailRules = [
  (val: string) => (val && isValidEmail(val)) || 'Invalid email',
];
const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

const loading = ref(false);

export default defineComponent({
  setup() {
    const router = useRouter();
    debugger;
    const logOut = async () => {
      const token = store.getters.getToken;
      if (token !== null) {
        try {
          loading.value = true;
          const response = await axios.post(
            'http://26.122.188.167:5000/logout',
            { token: token }
          );
          console.log(response);
          // Redirect the user to the dashboard or the desired page upon successful login
          router.push({ name: 'login' });
        } catch (error) {
          console.error('register failed', error);
        } finally {
          loading.value = false;
        }
      }
      return 'você não está logado';
    };
    const handleRegister = async () => {
      try {
        loading.value = true;
        const user = { email: login.value, senha: password.value };
        const response = await axios.post(
          'https://sistemagustavo.up.railway.app/cadastro',
          user
        );
        console.log(response);

        // const authToken = response.data.token;

        login.value = '';
        password.value = '';
        confirmPassword.value = '';

        // Redirect the user to the dashboard or the desired page upon successful login
        router.push({ name: 'login' });
      } catch (error) {
        console.error('register failed', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      logOut,
      login,
      password,
      confirmPassword,
      handleRegister,
      emailRules,
      passwordRules,
      confirmPasswordRules,
      loading,

      resetFields() {
        login.value = '';
        password.value = '';
      },
    };
  },
});
</script>
