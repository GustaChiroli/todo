import * as actionTypes from './action-types';

export const actions = {
  [actionTypes.SAVE_USER]({ commit }, user) {
    commit(actionTypes.SAVE_USER, user);
  },
  [actionTypes.UNSET_USER]({ commit }) {
    commit(actionTypes.UNSET_USER);
  },
};
