// initial state
const state = {
  userInfo: {}
}

// actions
const actions = {
  restoreUserInfo({ commit }) {
    commit('restoreUserInfo')
  },

  setUserInfo({ commit }, argument) {
    commit('setUserInfo', argument)
  },

  removeUserInfo({ commit }, argument) {
    commit('removeUserInfo', argument)
  }
}

// mutations
const mutations = {
  restoreUserInfo(state) {
    const userInfo = $peace.cache.get('USER')

    state.userInfo = userInfo
  },

  setUserInfo(state, argument) {
    state.userInfo = argument

    $peace.cache.set('USER', state.userInfo)
  },

  removeUserInfo(state) {
    state.userInfo = {}

    $peace.cache.clear()
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
