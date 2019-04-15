// initial state
const state = {
  menuList: [
    { id: 1, pid: null, closable: false, name: '首页', path: '/home', icon: 'el-icon-location-outline' },
    { id: 2, pid: null, closable: true, name: '诊室', path: '/clinic', icon: 'el-icon-location-outline' },
    { id: 3, pid: null, closable: true, name: '记录', path: '123123', icon: 'el-icon-location-outline' },
    { id: 31, pid: 3, closable: true, name: '问诊记录', path: '/record/inquiry', icon: 'el-icon-location-outline' },
    { id: 32, pid: 3, closable: true, name: '处方记录', path: '/record/prescription', icon: 'el-icon-location-outline' },
    { id: 4, pid: null, closable: true, name: '我的', path: '', icon: 'el-icon-location-outline' },
    { id: 41, pid: 4, closable: true, name: '信息查看', path: '/sys/myInfo', icon: 'el-icon-location-outline' },
    { id: 42, pid: 4, closable: true, name: '我的介绍', path: '/sys/myIntroduce', icon: 'el-icon-location-outline' },
    { id: 43, pid: 4, closable: true, name: '出诊时间', path: '/sys/myTime', icon: 'el-icon-location-outline' },
    { id: 44, pid: 4, closable: true, name: '服务设置', path: '/sys/myService', icon: 'el-icon-location-outline' },
    { id: 5, pid: null, closable: true, name: '帮助', path: '/help', icon: 'el-icon-location-outline' }
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
    const index = state.tabList.findIndex(item => item.path === argument)

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
    state.tabList = state.tabList.filter(item => !item.closable)
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
