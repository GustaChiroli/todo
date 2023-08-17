import * as actionTypes from './action-types';

export const actions = {
  [actionTypes.SAVE_TOKEN]({ commit }, token) {
    commit(actionTypes.SAVE_TOKEN, token);
  },
  [actionTypes.UNSET_TOKEN]({ commit }) {
    commit(actionTypes.UNSET_TOKEN);
  },
  [actionTypes.SAVE_ISVALIDATED]({ commit }, isValidated) {
    commit(actionTypes.SAVE_ISVALIDATED, isValidated);
  },
  [actionTypes.UNSET_ISVALIDATED]({ commit }) {
    commit(actionTypes.UNSET_ISVALIDATED);
  },
};
