const state = {
  notify: {}
}

const mutations = {
  setNotify(state, params) {
    state.notify = params
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
