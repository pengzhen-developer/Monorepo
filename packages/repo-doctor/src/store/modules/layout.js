// initial state
const state = {
  menuList: [
    { id: 1, pid: null, closable: false, name: '首页', title: '首页', path: '/home', icon: 'icon_nav_icon_homecopy' },
    { id: 2, pid: null, closable: true, name: '诊室', title: '我的诊室', path: '/clinic', icon: 'icon_ic_consultingroom' },
    { id: 3, pid: null, closable: true, name: '问诊', path: '问诊', icon: 'icon_ic_inquiry' },
    { id: 31, pid: 3, closable: true, name: '问诊记录', title: '问诊记录', path: '/record/inquiry', icon: 'el-icon-location-outline' },
    { id: 32, pid: 3, closable: true, name: '处方记录', title: '处方记录', path: '/record/prescription', icon: 'el-icon-location-outline' },
    { id: 4, pid: null, closable: true, name: '我的', path: '我的', icon: 'icon_ic_my' },
    { id: 41, pid: 4, closable: true, name: '信息查看', title: '信息查看', path: '/sys/myInfo', icon: 'el-icon-location-outline' },
    { id: 42, pid: 4, closable: true, name: '我的介绍', title: '我的介绍', path: '/sys/myIntroduce', icon: 'el-icon-location-outline' },
    { id: 43, pid: 4, closable: true, name: '出诊时间', title: '出诊时间', path: '/sys/myTime', icon: 'el-icon-location-outline' },
    { id: 44, pid: 4, closable: true, name: '服务设置', title: '服务设置', path: '/sys/myService', icon: 'el-icon-location-outline' },
    { id: 5, pid: null, closable: true, name: '帮助', path: '/help', icon: 'icon_ic_help' }
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
