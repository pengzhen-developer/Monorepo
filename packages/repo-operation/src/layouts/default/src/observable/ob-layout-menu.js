import Vue from 'vue'

const state = Vue.observable({
  // 选中的顶级菜单
  selectedTopMenu: {},

  // 选中的导航菜单
  selectedNavMenu: {}
})

const mutations = {
  /**
   * 设置选中的顶级菜单
   *
   * @param {*} selectedTopMenu
   */
  setSelectedTopMenu(selectedTopMenu) {
    state.selectedTopMenu = selectedTopMenu
  },

  /**
   * 设置选中的导航菜单
   *
   * @param {*} selectedNavMenu
   */
  setSelectedNavMenu(selectedNavMenu) {
    state.selectedNavMenu = selectedNavMenu
  }
}

export default {
  state,

  mutations
}
