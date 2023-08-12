<template>
  <div>
    <div class="row q-col-gutter-x-md">
      <div class="col-6">
        <q-input
          filled
          ref="fieldRef"
          type="text"
          v-model="name"
          label="Nome"
          dense
          :disable="loading"
          :rules="nameRules"
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
      </div>
      <div class="col-6">
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
          ref="fieldRef"
          filled
          v-model="confirmPassword"
          :type="passwordFieldType"
          label="Confirme sua senha"
          dense
          :disable="loading"
          :rules="confirmPasswordRules"
        >
          <template #append>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </q-input>
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
      <div class="row q-col-gutter-x-sm">
        <div class="col-4">
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
        </div>
        <div class="col-5">
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
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 20px">
      <div class="col-12 flex-center">
        <q-btn
          color="primary"
          @click="handleRegister"
          label="Criar Conta"
          block
          :loading="loading"
          :disable="loading"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent, computed } from 'vue';
import { QInput } from 'quasar';
import { useRouter } from 'vue-router';
import userModelRegister from '../models/userModelRegister';
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
  (val: string) => {
    if (!val) {
      return 'digite o nome';
    } else if (val.length >= 35) {
      return 'nome não pode ter mais de 35 caracteres';
    }
    return true;
  },
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

const showConfirmPassword = ref(false);

const loading = ref(false);

export default defineComponent({
  setup() {
    const router = useRouter();
    const fieldRef: Ref<QInput | null> = ref(null);

    const passwordFieldType = computed(() => {
      return showConfirmPassword.value ? 'text' : 'password';
    });

    const handleRegister = async () => {
      if (await !validate()) {
        return;
      }
      try {
        loading.value = true;
        const phone: string = ddi.value.concat(cellphone.value);

        const user = new userModelRegister(
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
    const validate = () => {
      const validators = [
        fieldRef.value?.validate(),
        emailRules[0](email.value),
        passwordRules[0](password.value),
        confirmPasswordRules[0](confirmPassword.value),
        nameRules[0](name.value),
        birthdateRules[0](birthdate.value),
        ddiRules[0](ddi.value),
        cellphoneRules[0](cellphone.value),
        genderRules[0](gender.value),
      ];

      const isValid = validators.every(
        (validator) => validator === true || validator === ''
      );

      return isValid;
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
      showConfirmPassword,
      passwordFieldType,
    };
  },
});
</script>
../models/userModelRegister
