<template>
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
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const avatarMenuOpen = ref(false);

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
      leftDrawerOpen,
      avatarMenuOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.button-content {
  display: flex;
  align-content: center !important;
}
</style>
