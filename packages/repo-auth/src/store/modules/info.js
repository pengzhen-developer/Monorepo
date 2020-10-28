const state = {
  //用户管理-侧边栏
  user: {
    productId: ''
  },
  //菜单管理-侧边栏
  menu: {
    clientId: '',
    productId: ''
  },
  //角色管理-侧边栏
  role: {
    clientId: '',
    productId: ''
  },
  //产品管理-侧边栏
  produce: {
    clientId: ''
  }
}
const mutations = {
  setUserInfo(state, data) {
    state.user = data
  },
  setMenuInfo(state, data) {
    state.menu = data
  },
  setRoleInfo(state, data) {
    state.role = data
  },
  setProduceInfo(state, data) {
    state.produce = data
  }
}
export default {
  namespaced: true,

  state,
  mutations
}
