const state = {
  status: undefined
}

const mutations = {
  setStatus(state, params) {
    state.status = params
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
