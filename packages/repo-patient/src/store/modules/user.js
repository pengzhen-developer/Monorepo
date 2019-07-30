const state = {
  userInfo: {}
}

const mutations = {
  setUserInfo(state, params) {
    state.userInfo = params
  },

  restoreUserInfo(state, params) {
    state.userInfo = params
  },

  removeUserInfo(state) {
    state.userInfo = {}
  }
}

export default {
  namespaced: true,

  state,
  mutations
}
