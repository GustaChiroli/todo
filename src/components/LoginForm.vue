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
        class="q-mb-md"
        :rules="emailRules || 'Email invalido!'"
      />
      <q-input
        ref="fieldRef"
        filled
        v-model="password"
        type="password"
        label="Senha"
        dense
        class="q-mb-md"
        :rules="passwordRules"
      />
      <q-btn
        color="primary"
        @click="handleLogin"
        label="Login"
        dense
        class="q-mt-md"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from 'vue';
import { QInput } from 'quasar';
import axios from 'axios';

const fieldRef: Ref<QInput | null> = ref(null);

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
  // Use a simple regex to check for a valid email format
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};
const handleLogin = async () => {
  try {
    const user = { email: login.value, senha: password.value };
    const response = await axios.post(
      'https://sistemagustavo.up.railway.app/login',
      user
    );
    console.log(response);

    // Assuming the server returns a response with a token upon successful login
    const authToken = response.data.token;
    // You can store the authToken in Vuex or local storage to maintain the login state

    // Clear the login and password fields after successful login
    login.value = '';
    password.value = '';

    // Redirect the user to the dashboard or the desired page upon successful login
    // Example: this.$router.push('/dashboard');
  } catch (error) {
    // Handle login error
    console.error('Login failed', error);
  }
};

export default {
  setup() {
    return {
      login,
      password,
      handleLogin,
      fieldRef,
      emailRules,
      passwordRules,

      resetValidation() {
        if (fieldRef.value) {
          fieldRef.value.resetValidation();
        }
      },
      resetFields() {
        login.value = '';
        password.value = '';
      },
    };
  },
};
</script>
