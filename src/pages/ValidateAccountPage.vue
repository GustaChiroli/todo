<template>
  <div>
    <h1>Confirmação de E-mail</h1>
    <p>Seu código de validação: {{ codigo }}</p>
    <h1>Confirmação de E-mail</h1>
    <p v-if="validating">Validando código...</p>
    <p v-else-if="isValid">Código validado! Redirecionando...</p>
    <p v-else>Código inválido. Por favor, verifique seu e-mail.</p>
  </div>
</template>

<script>
import { validateEmail } from '../controllers/userController';
// import { mapActions, useStore } from 'vuex';

export default {
  data() {
    return {
      codigo: null,
      validating: true, // Indicador de validação em andamento
      isValid: false, // Indicador se o código é válido ou não
    };
  },
  async created() {
    // const { saveToken } = mapActions('auth', ['setToken']);
    // Captura o código da rota usando o parâmetro de rota ":codigo"
    this.codigo = this.$route.params.code;
    // Aqui você pode fazer chamadas ao backend para validar o código e realizar ações necessárias
    try {
      const response = await validateEmail({ code: this.codigo });
      console.log(response);
      if (response.data.message === 'E-mail validado com sucesso!') {
        // await store.dispatch('auth/setToken', response.data.token);
        this.isValid = true;

        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 3000); // Redireciona após 3 segundos
      } else {
        // Código não é válido
        this.validating = false;
      }
    } catch (error) {
      console.error('Erro ao validar código:', error);
      this.validating = false;
    }
  },
  methods: {},
};
</script>
