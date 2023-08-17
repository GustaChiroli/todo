<template>
  <div class="col-24">
    <q-layout view="hhh lpR fFf">
      <q-header reveal elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
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
      </q-header>
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
          <q-list padding>
            <q-item clickable v-ripple @click="goToPage('tasks')">
              <q-item-section avatar>
                <q-icon name="rule" />
              </q-item-section>

              <q-item-section to="/tasks"> Tasks </q-item-section>
            </q-item>

            <q-item active clickable v-ripple @click="goToPage('events')">
              <q-item-section avatar>
                <q-icon name="calendar_month" />
              </q-item-section>

              <q-item-section> Events </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="alarm_add" />
              </q-item-section>

              <q-item-section> Alarm </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <!-- <q-tabs align="left">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs> -->
      </q-drawer>

      <q-drawer
        v-model="rightDrawerOpen"
        side="right"
        overlay
        behavior="desktop"
        elevated
      >
        <!-- drawer content -->
      </q-drawer>

      <q-page-container>
        <router-view class="full-height" style="height: 100vh" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
// import { mapActions, useStore } from 'vuex';
import { logoutUserController } from './controllers/userController';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const loading = ref(false);
export default defineComponent({
  name: 'App',
  setup() {
    const leftDrawerOpen = ref(false);
    const miniState = ref(true);
    const rightDrawerOpen = ref(false);

    const router = useRouter();
    const store = useStore();
    // const store = useStore();

    const goToPage = (page: string) => {
      router.push({ name: page });
    };
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
      miniState,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      goToPage,
    };
  },
});
</script>
