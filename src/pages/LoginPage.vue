<template>
  <q-card class="login-card">
    <auth-layout
      class="col-12 q-justify-center q-items-center full-height"
      style="height: 100vh"
    >
      <div class="q-pa-md flex-center">
        <h1 class="text-h5 q-mb-lg">Login</h1>
        <login-form />
      </div>
    </auth-layout>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import LoginForm from '../components/LoginForm.vue';

export default defineComponent({
  components: {
    AuthLayout,
    LoginForm,
  },
});
</script>

<style>
.login-card {
  max-width: 800px !important;
  min-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
