import Vue from 'vue'

const state = Vue.observable({
  tabs: [],
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

    Peace.cache.sessionStorage.set('layout-tabs', state.tabs)
  },

  /**
   * 设置 current tab
   *
   * @param {*} tab
   */
  setTab(tab) {
    state.tab = tab

    Peace.cache.sessionStorage.set('layout-tab', tab)
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
  },

  /**
   * 设置 tabs
   *
   * @param {*} tabs
   */
  setTabs(tabs) {
    state.tabs = tabs

    Peace.cache.sessionStorage.set('layout-tabs', tabs)
  },

  /**
   * 从缓存恢复 tabs
   *
   */
  restoreTabs() {
    state.tabs = Peace.cache.sessionStorage.get('layout-tabs') || []
  },

  /**
   * 从缓存恢复 current tab
   *
   */
  restoreTab() {
    state.tab = Peace.cache.sessionStorage.get('layout-tab') || {}
  },

  /**
   * 清空 tabs
   *
   */
  clearTabs() {
    state.tabs = []

    Peace.cache.sessionStorage.remove('layout-tabs')
  },

  /**
   * 清空 tab
   *
   */
  clearTab() {
    state.tab = {}

    Peace.cache.sessionStorage.remove('layout-tab')
  }
}

export default {
  state,

  mutations
}
