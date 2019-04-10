// initial state
const state = {
  menuList: [
    { closable: false, name: '首页', path: '/home', icon: 'el-icon-location-outline' },
    { closable: true, name: '诊室', path: '/clinic', icon: '' },
    {
      closable: true,
      name: '记录',
      path: '',
      icon: '',
      children: [
        { closable: false, name: '记录1', path: '/记录1', icon: 'el-icon-location-outline' },
        { closable: false, name: '记录2', path: '/记录2', icon: 'el-icon-location-outline' }
      ]
    },
    { closable: true, name: '我的', path: '/about', icon: '' },
    { closable: true, name: '帮助', path: '/help', icon: '' }
  ],

  tabList: [],

  selectTab: ''
}

// actions
const actions = {
  selectTab({ commit }, argument) {
    commit('selectTab', argument)
  },

  pushTab({ commit }, argument) {
    commit('pushTab', argument)
  },

  unshiftTab({ commit }, argument) {
    commit('unshiftTab', argument)
  },

  removeTab({ commit }, argument) {
    commit('removeTab', argument)
  },

  clearTab({ commit }, argument) {
    commit('clearTab', argument)
  }
}

// mutations
const mutations = {
  /**
   * 标签页选中
   *
   * @param {*} state
   * @param {*} argument
   */
  selectTab(state, argument) {
    state.selectTab = argument
  },

  /**
   * 标签页新增(添加到尾)
   *
   * @param {*} state
   */
  pushTab(state, argument) {
    if (!state.tabList.find(item => item.path === argument.path)) {
      state.tabList.push(argument)
    }
  },

  /**
   * 标签页新增(添加到头)
   *
   * @param {*} state
   */
  unshiftTab(state, argument) {
    if (!state.tabList.find(item => item.path === argument.path)) {
      state.tabList.unshift(argument)
    }
  },

  /**
   * 标签页删除
   *
   * @param {*} state
   */
  removeTab(state, argument) {
    console.log(state, argument)
  },

  /**
   * 标签页清空
   *
   * @param {*} state
   */
  clearTab(state, argument) {
    console.log(state, argument)
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
