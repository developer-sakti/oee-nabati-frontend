import types from "./mutation-types";

export default {
  [types.SET_HMI_STATE]: (state, payload) => {
    state.hmi = payload;
  }
};
