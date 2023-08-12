<template>
  <div class="q-pa-md flex-center">
    <h1 v-if="validating">Validando código...</h1>
    <h1 v-else-if="isValid">Código validado! Redirecionando...</h1>
    <h1 v-else>Código inválido. Por favor, verifique seu e-mail.</h1>
  </div>
</template>

<script>
import { validateEmail } from '../controllers/userController';
import * as actionTypes from '../store/auth/action-types.js';
import { useStore } from 'vuex';

export default {
  data() {
    return {
      codigo: null,
      validating: true, // Indicador de validação em andamento
      isValid: false, // Indicador se o código é válido ou não
    };
  },
  async created() {
    // Captura o código da rota usando o parâmetro de rota ":codigo"
    const store = useStore();
    this.codigo = this.$route.params.code;
    // Aqui você pode fazer chamadas ao backend para validar o código e realizar ações necessárias
    try {
      const response = await validateEmail({ code: this.codigo });
      console.log(response);
      if (response.data.message === 'E-mail validado com sucesso!') {
        await store.dispatch(actionTypes.SAVE_TOKEN, response.data.token);
        console.log('novo token:', store.getters.GET_TOKEN);
        this.isValid = true;
        await store.dispatch(actionTypes.SAVE_ISVALIDATED, this.isValid);

        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 3000); // Redireciona após 3 segundos
      } else {
        // Código não é válido
        this.validating = false;
        await store.dispatch(actionTypes.SAVE_ISVALIDATED, this.isValid);
      }
    } catch (error) {
      console.error('Erro ao validar código:', error);
      this.validating = false;
    }
  },
  methods: {},
};
</script>
