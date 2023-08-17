<template>
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

    <q-toolbar-title>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
      </q-avatar>

      To-Do List
    </q-toolbar-title>

    <q-btn round>
      <q-avatar>
        <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
        <q-menu
          auto-close
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list bordered>
            <q-item clickable v-ripple style="align-items: center">
              <div class="row full-width">
                <div class="col-3">
                  <q-item-section avatar>
                    <q-icon size="18px" name="person" />
                  </q-item-section>
                </div>
                <div class="col-9">
                  <q-item-sect> Perfil </q-item-sect>
                </div>
              </div>
            </q-item>
            <q-item
              @click="logOut"
              clickable
              v-ripple
              style="align-items: center"
            >
              <div class="row full-width">
                <div class="col-3">
                  <q-item-section avatar>
                    <q-icon size="18px" name="logout" />
                  </q-item-section>
                </div>
                <div class="col-9">
                  <q-item-sect> Sair </q-item-sect>
                </div>
              </div>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple style="align-items: center">
              <div class="row full-width">
                <div class="col-3">
                  <q-item-section avatar>
                    <q-icon size="18px" name="settings" />
                  </q-item-section>
                </div>
                <div class="col-9">
                  <q-item-sect> Configuração </q-item-sect>
                </div>
              </div>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
    </q-btn>
    <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
  </q-toolbar>
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
