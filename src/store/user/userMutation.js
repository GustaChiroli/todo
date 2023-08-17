import * as actionTypes from './action-types';

export const mutations = {
  [actionTypes.SAVE_USER](state, user) {
    state.user = user;
  },
  [actionTypes.UNSET_USER](state) {
    state.user = null;
  },
};
