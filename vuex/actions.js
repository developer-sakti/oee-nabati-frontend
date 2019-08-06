import types from './mutation-types'
export default {
  nuxtServerInit({ commit }) {},
  checkHMI({ commit }, req) {
    const hmi = JSON.parse(localStorage.getItem('hmi'))
    commit(types.SET_HMI_STATE, hmi)
  },
  setHmi({ commit }, payload) {
    commit(types.SET_HMI_STATE, payload)
  },
  saveHmi({ commit }, payload) {
    localStorage.setItem('hmi', JSON.stringify(payload))
    commit(types.SET_HMI_STATE, payload)
  }
}
