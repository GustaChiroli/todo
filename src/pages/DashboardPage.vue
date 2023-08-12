<template>
  <button @click="logOut">deslogar</button>
  <h1>DASHBOARD</h1>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
// import { mapActions, useStore } from 'vuex';
import { logoutUserController } from '../controllers/userController';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const loading = ref(false);

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    // const store = useStore();
    const logOut = async () => {
      const token = await store.getters.GET_TOKEN;

      console.log(token);
      if (token !== null) {
        try {
          loading.value = true;
          const response = logoutUserController();
          console.log(response);
        } catch (error) {
          console.error('register failed', error);
        } finally {
          loading.value = false;
          router.push({ name: 'login' });
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
