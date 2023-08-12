import { GetterTree } from 'vuex';
import userModel from '../../models/userModel';
import state from './userState';

const getters: GetterTree<typeof state, userModel> = {
  getUser: (state) => {
    return {
      id: state.id,
      email: state.email,
      name: state.name,
      birthdate: state.birthdate,
      phone: state.phone,
      gender: state.gender,
      isValidated: state.isValidated,
      token: state.token,
    };
  },
  // Outros getters, se necessário
};

export default getters;
