import Vue from 'vue'

const state = Vue.observable({
  /** 当前视图 */
  view: 'OrganizationList',

  /** 选中的机构信息 */
  institution: {}
})

const mutations = {
  setView(view) {
    state.view = view
  },

  setInstitution(institution) {
    state.institution = institution
  }
}

export default {
  state,

  mutations
}
