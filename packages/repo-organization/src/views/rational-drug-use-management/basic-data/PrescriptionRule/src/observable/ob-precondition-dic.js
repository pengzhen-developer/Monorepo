import Vue from 'vue'

const state = Vue.observable({
  utilList: [],

  weightList: [],

  containList: [],

  sexList: [],

  warningLevelList: []
})

const mutations = {
  async set(key, value) {
    state[key] = value
  }
}

export default {
  state,

  mutations
}
