<template>
  <button @click="logOut">deslogar</button>
  <h1>DASHBOARD</h1>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import store from '../store/index';
import { logoutUserController } from '../controllers/userController';

const loading = ref(false);

export default defineComponent({
  setup() {
    const logOut = async () => {
      const token = store.getters.getToken;
      if (token !== null) {
        try {
          loading.value = true;
          const response = logoutUserController();
          console.log(response);
        } catch (error) {
          console.error('register failed', error);
        } finally {
          loading.value = false;
        }
      }
      return 'você não está logado';
    };

    return {
      logOut,
      loading,
    };
  },
});
</script>
