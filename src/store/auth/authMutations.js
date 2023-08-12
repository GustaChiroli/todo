import * as actionTypes from './action-types'; // Importe as constantes

export const mutations = {
  [actionTypes.SAVE_TOKEN](state, token) {
    state.token = token;
  },
  [actionTypes.UNSET_TOKEN](state) {
    state.token = null;
  },
  [actionTypes.SAVE_ISVALIDATED](state, isValidated) {
    state.isValidated = isValidated;
  },
  [actionTypes.UNSET_ISVALIDATED](state) {
    state.isValidated = null;
  },
};
