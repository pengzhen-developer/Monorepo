import Vue from 'vue'

const CONSTANT = {
  // 所有打开的标签页
  LAYOUT_TABS: 'layout-tabs',

  // 当前标签页
  LAYOUT_TAB: 'layout-tab'
}

const state = Vue.observable({
  // 所有标签页
  tabs: [],

  // 当前标签页
  tab: {}
})

const mutations = {
  /**
   * 新增 tab
   *
   * @param {*} tab
   */
  addTab(tab) {
    const index = state.tabs.findIndex((item) => item.id === tab.id)

    if (index === -1) {
      state.tabs.push(tab)
    } else {
      state.tabs[index] = tab
    }

    Peace.cache.sessionStorage.set(CONSTANT.LAYOUT_TABS, state.tabs)
  },

  /**
   * 设置 current tab
   *
   * @param {*} tab
   */
  setTab(tab) {
    state.tab = tab

    Peace.cache.sessionStorage.set(CONSTANT.LAYOUT_TAB, tab)
  },

  /**
   * 删除 tab
   *
   * @param {*} tab
   */
  removeTab(tab) {
    const index = state.tabs.findIndex((item) => item.id === tab.id)

    if (index !== -1) {
      state.tabs.splice(index, 1)
    }

    this.setTabs(state.tabs)
  },

  /**
   * 设置 tabs
   *
   * @param {*} tabs
   */
  setTabs(tabs) {
    state.tabs = tabs

    Peace.cache.sessionStorage.set(CONSTANT.LAYOUT_TABS, tabs)
  },

  /**
   * 从缓存恢复 tabs
   *
   */
  restoreTabs() {
    state.tabs = Peace.cache.sessionStorage.get(CONSTANT.LAYOUT_TABS) || []
  },

  /**
   * 从缓存恢复 current tab
   *
   */
  restoreTab() {
    state.tab = Peace.cache.sessionStorage.get(CONSTANT.LAYOUT_TAB) || {}
  },

  /**
   * 清空 tabs
   *
   */
  clearTabs() {
    state.tabs = []

    Peace.cache.sessionStorage.remove(CONSTANT.LAYOUT_TABS)
  },

  /**
   * 清空 tab
   *
   */
  clearTab() {
    state.tab = {}

    Peace.cache.sessionStorage.remove(CONSTANT.LAYOUT_TAB)
  }
}

export default {
  state,

  mutations
}
