// initial state
const state = {
  tabList: [],

  currentTab: ''
}

// mutations
const mutations = {
  restoreTab(state) {
    state.tabList = peace.cache.sessionStorage.get(peace.type.USER.TAB_LIST) || []
  },

  /**
   * 标签页选中
   *
   * @param {*} state
   * @param {*} argument
   */
  selectTab(state, argument) {
    state.currentTab = argument
  },

  /**
   * 标签页新增(添加到尾)
   *
   * @param {*} state
   */
  pushTab(state, argument) {
    if (!state.tabList.find((item) => item.path === argument.path)) {
      state.tabList.push(argument)
    }
  },

  /**
   * 标签页新增(添加到头)
   *
   * @param {*} state
   */
  unshiftTab(state, argument) {
    if (!state.tabList.find((item) => item.path === argument.path)) {
      state.tabList.unshift(argument)
    }
  },

  /**
   * 标签页删除
   *
   * @param {*} state
   */
  removeTab(state, argument) {
    const index = state.tabList.findIndex((item) => item.path === argument)

    if (index !== -1) {
      state.tabList.splice(index, 1)
    }
  },

  /**
   * 标签页清空
   *
   * @param {*} state
   */
  clearTab(state) {
    state.tabList = state.tabList.filter((item) => !item.closable)
  }
}

export default {
  namespaced: true,

  state,
  mutations
}
