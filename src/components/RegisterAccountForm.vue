<template>
  <div class="row" style="max-width: 300px">
    <div class="col-12">
      <q-input
        filled
        ref="fieldRef"
        type="email"
        v-model="email"
        label="E-mail"
        dense
        :disable="loading"
        :rules="emailRules || 'Email invalido!'"
      />
      <q-input
        filled
        ref="fieldRef"
        type="text"
        v-model="name"
        label="Nome"
        dense
        :disable="loading"
        :rules="nameRules || 'Nome invalido!'"
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
      <q-input
        ref="fieldRef"
        filled
        v-model="confirmPassword"
        type="password"
        label="Confirme sua senha"
        dense
        :disable="loading"
        :rules="confirmPasswordRules"
      />
      <q-input
        filled
        ref="fieldRef"
        type="text"
        v-model="birthdate"
        label="Data de nascimento"
        dense
        :disable="loading"
        :rules="birthdateRules || 'Data invalida!'"
        mask="##/##/####"
        placeholder="DD/MM/AAAA"
      />
      <q-input
        filled
        ref="fieldRef"
        type="text"
        v-model="ddi"
        label="Codigo do país"
        dense
        :disable="loading"
        :rules="ddiRules || 'DDI invalido'"
        mask="+###"
        placeholder="(+55) Brasil"
      />
      <q-input
        filled
        ref="fieldRef"
        type="text"
        v-model="cellphone"
        label="Celular"
        dense
        :disable="loading"
        :rules="cellphoneRules || 'O campo celular é obrigatório'"
        mask="(##) #####-####"
        placeholder="(99) 99999-9999"
      />
      <q-select
        ref="fieldRef"
        v-model="gender"
        :options="options"
        :disable="loading"
        :rules="genderRules || 'O camp Gender é obrigatório'"
        filled
        dense
        label="Genero"
      />
    </div>
    <div class="col-12 flex-center">
      <q-btn
        color="primary"
        @click="handleRegister"
        label="Criar Conta"
        dense
        filled
        :loading="loading"
        :disable="loading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent } from 'vue';
import { QInput } from 'quasar';
import axios from 'axios';
import { useRouter } from 'vue-router';
import userModel from '../models/userModel';
import { registerUserController } from '../controllers/userController';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const gender = ref('');
const birthdate = ref('');
const cellphone = ref('');
const ddi = ref('');
const options: string[] = ['masculino', 'feminino', 'prefiro não informar'];

const passwordRules = [
  (val: string) =>
    (val && val.length >= 6) || 'a senha precisa ter 6 digitos no minimo',
];
const confirmPasswordRules = [
  (val: string) =>
    (val && val.length >= 6 && val === password.value) ||
    'precisa ser igual a senha',
];
const emailRules = [
  (val: string) => (val && isValidEmail(val)) || 'email invalido',
];
const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};
const nameRules = [
  (val: string) =>
    (val && val.length <= 35) || 'nome não pode ter mais de 35 caracteres',
];
const birthdateRules = [
  (val: string) => (val && val.length === 10) || 'data invalida',
];
const ddiRules = [
  (val: string) =>
    (val && val.length <= 4) || 'ddi precisa ter no maximo 3 caracteres',
];
const cellphoneRules = [
  (val: string) => (val && val !== '') || 'telefone invalido',
];
const genderRules = [
  (val: string) => (val && val !== '') || 'é necessário selecionar o genero',
];

const loading = ref(false);

export default defineComponent({
  setup() {
    const router = useRouter();
    const fieldRef: Ref<QInput | null> = ref(null);

    const handleRegister = async () => {
      debugger;
      try {
        debugger;
        loading.value = true;
        const phone: string = ddi.value.concat(cellphone.value);

        const user = new userModel(
          email.value,
          password.value,
          name.value,
          birthdate.value,
          phone,
          gender.value
        );
        console.log(user);
        const response = await registerUserController(user);
        console.log(response);

        // Redirect the user to the dashboard or the desired page upon successful login
        router.push({ name: 'login' });
      } catch (error) {
        console.error('register failed', error);
      } finally {
        loading.value = false;
        resetValidation();
        resetFields();
      }
    };

    const resetValidation = () => {
      if (fieldRef.value) {
        fieldRef.value.resetValidation();
      }
    };
    const resetFields = () => {
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      name.value = '';
      gender.value = '';
      birthdate.value = '';
      cellphone.value = '';
      ddi.value = '';
    };

    return {
      email,
      password,
      confirmPassword,
      name,
      gender,
      options,
      birthdate,
      cellphone,
      ddi,
      handleRegister,
      fieldRef,
      emailRules,
      passwordRules,
      confirmPasswordRules,
      nameRules,
      birthdateRules,
      ddiRules,
      genderRules,
      cellphoneRules,
      loading,
      resetValidation,
    };
  },
});
</script>
