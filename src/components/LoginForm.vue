<template>
  <div>
    <div class="row q-col-gutter-x-md">
      <div class="col-12">
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
          :type="passwordFieldType"
          label="Senha"
          dense
          :disable="loading"
          :rules="passwordRules"
        >
          <template #append>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12 flex-center">
        <q-btn
          color="primary"
          @click="handleLogin"
          label="Entrar"
          block
          :loading="loading"
          :disable="loading"
        />
        <br />
        <router-link :to="{ name: 'registeraccount' }"
          >registre-se aqui</router-link
        >
        <!-- <q-btn
          color="primary"
          @click="handleteste"
          label="Entrar"
          block
          :loading="loading"
          :disable="loading"
        /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent, computed } from 'vue';
import { QInput } from 'quasar';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { loginUserController } from '../controllers/userController';
import loginUserModel from '../models/loginUserModel';
import * as actionTypes from '../store/auth/action-types.js';
// import * as actionTypesa from '../store/user/action-types';
// import userModel from '../models/userModel';

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
const showConfirmPassword = ref(false);

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const fieldRef: Ref<QInput | null> = ref(null);

    const passwordFieldType = computed(() => {
      return showConfirmPassword.value ? 'text' : 'password';
    });

    // const handleteste = async () => {
    //   const teste = new userModel(
    //     '10',
    //     'gusta@gmail.com',
    //     'gustavo',
    //     '19/06/1994',
    //     '5548988647787',
    //     'male',
    //     false,
    //     'aehhaseo29nf238998qwd89h213984781298hwd'
    //   );
    //   await store.dispatch(actionTypesa.SAVE_USER, teste);
    //   const user = await store.getters.GET_USER;
    //   console.log('user here:', user);
    // };

    const handleLogin = async () => {
      debugger;
      try {
        loading.value = true;
        const userLogin = new loginUserModel(login.value, password.value);
        const response = await loginUserController(userLogin);
        console.log(response);

        const authToken = response.data.token;
        console.log('AuthToken:', authToken);
        store.dispatch(actionTypes.SAVE_TOKEN, authToken);

        const isValidated = response.data.isValidated;
        const token = store.getters.GET_TOKEN;
        console.log('Token from getter:', token);

        store.dispatch(actionTypes.SAVE_ISVALIDATED, isValidated);
        if (isValidated === false) {
          router.push('/validate/225588');
        } else if (isValidated === true) {
          router.push({ name: 'dashboard' });
        }
        // Redirect the user to the dashboard or the desired page upon successful login
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
      showConfirmPassword,
      passwordFieldType,
      // handleteste,
    };
  },
});
</script>
