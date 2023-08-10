<template>
  <div class="row">
    <div class="col full-height flex-center">
      <q-input
        filled
        ref="fieldRef"
        type="email"
        v-model="login"
        label="Login"
        dense
        :disable="loading"
        :rules="emailRules || 'Email invalido!'"
      />
      <q-input
        ref="fieldRef"
        filled
        v-model="password"
        type="password"
        label="Senha"
        dense
        :disable="loading"
        :rules="passwordRules"
      />
      <q-btn
        color="primary"
        @click="handleLogin"
        label="Entrar"
        dense
        :loading="loading"
        :disable="loading"
      />
      <br />
      <router-link :to="{ name: 'registeraccount' }"
        >registre-se aqui</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent } from 'vue';
import { QInput } from 'quasar';
import { useRouter } from 'vue-router';
import store from '../store/index';
import { loginUserController } from '../controllers/userController';
import loginUserModel from '../models/loginUserModel';

const login = ref('');
const password = ref('');

const passwordRules = [
  (val: string) =>
    (val && val.length >= 6) || 'Password must be at least 6 characters',
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
    const fieldRef: Ref<QInput | null> = ref(null);

    const handleLogin = async () => {
      try {
        loading.value = true;
        const userLogin = new loginUserModel(login.value, password.value);
        const response = await loginUserController(userLogin);
        console.log(response);

        const authToken = response.data.token;

        store.dispatch('saveToken', authToken);
        console.log(store.getters.getToken);

        // Redirect the user to the dashboard or the desired page upon successful login
        router.push({ name: 'dashboard' });
      } catch (error) {
        console.error('Login failed', error);
      } finally {
        loading.value = false;
        resetFields();
        resetValidation();
      }
    };

    const resetValidation = () => {
      if (fieldRef.value) {
        fieldRef.value.resetValidation();
      }
    };

    const resetFields = () => {
      login.value = '';
      password.value = '';
    };

    return {
      login,
      password,
      handleLogin,
      fieldRef,
      emailRules,
      passwordRules,
      loading,
      resetValidation,
      resetFields,
    };
  },
});
</script>
