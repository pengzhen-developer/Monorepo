import Vue from 'vue'

const state = Vue.observable({
  compareList: [],

  prescriptionTypeList: [],

  warningLevelList: [],

  busiType: [],

  periodType: []
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
