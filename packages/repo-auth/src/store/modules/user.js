const state = {
  userInfo: {}
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },

  resetUserInfo(state) {
    state.userInfo = {}
  }
}

export default {
  namespaced: true,

  state,
  mutations
}
