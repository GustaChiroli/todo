import { MutationTree } from 'vuex';
import userModel from '../../models/userModel';
import state from './userState';

const mutations: MutationTree<typeof state> = {
  setUser(state, user: userModel) {
    state.id = user.id;
    state.email = user.email;
    state.name = user.name;
    state.birthdate = user.birthdate;
    state.phone = user.phone;
    state.gender = user.gender;
    state.isValidated = user.isValidated;
    state.token = user.token;
  },
  unSetUser(state) {
    state.id = null;
    state.email = null;
    state.name = null;
    state.birthdate = null;
    state.phone = null;
    state.gender = null;
    state.isValidated = false;
    state.token = null;
  },
};

export default mutations;
