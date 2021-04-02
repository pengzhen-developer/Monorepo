import Vue from 'vue'

const state = Vue.observable({
  // 用户信息
  accountInfo: {},

  // 用户菜单 List
  accountMenu: [],

  // 用户菜单 Tree
  accountMenuTree: []
})

const mutations = {
  async getAccountInfo() {
    state.accountInfo = await Peace.identity.auth.getAccountInfo()
  },

  async getAccountMenu() {
    state.accountMenu = await Peace.identity.auth.getAccountMenu()
  },

  async getAccountMenuTree() {
    const accountMenu = await Peace.identity.auth.getAccountMenu()
    const cloneAccountMenu = Peace.util.deepClone(accountMenu)
    const filterAccountMenu = cloneAccountMenu.filter((item) => !item.virtual)

    state.accountMenuTree = Peace.util.arrayToTree(filterAccountMenu, 'id', 'parentId', 'children')
  }
}

export default {
  state,

  mutations
}
