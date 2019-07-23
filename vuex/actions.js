import types from "./mutation-types";
export default {
  nuxtServerInit({ commit }) {
    const hmi = JSON.parse(localStorage.getItem("hmi"));
    commit(types.SET_HMI_STATE, hmi);
  },
  checkHMI({ commit }, req) {
    const hmi = JSON.parse(localStorage.getItem("hmi"));
    commit(types.SET_HMI_STATE, hmi);
  },
  setHmi({ commit }, payload) {
    localStorage.setItem("hmi", JSON.stringify(payload));
    commit(types.SET_HMI_STATE, payload);
  }
};
