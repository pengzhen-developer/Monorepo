const state = {
  appointList: [],
  loaded: false
  // unread: 0
}

const getters = {
  appointList: state => {
    return state.appointList
  },
  loaded: state => {
    return state.loaded
  }
}
const mutations = {
  setList(state, params) {
    state.appointList = params
    console.log('setList', state.appointList)
  },
  setLoaded(state, params) {
    state.loaded = params
    console.log('setList', state.appointList)
  }
}
const actions = {
  getList(context) {
    $peace.service.patient.getOrderList({}).then(res => {
      res.data.list.map(item => {
        //   item.time =  15 * 60 * 1000;
        if (item.orderType == 'register') {
          if (item.orderExpireTime > item.currentTime) {
            item.time = (item.orderExpireTime - item.currentTime) * 1000
          }
        } else if (item.orderType == 'inquiry') {
          let inquiryInfo = item.inquiryInfo
          let expireTime =
            inquiryInfo.inquiryStatus == 1
              ? inquiryInfo.orderExpireTime
              : inquiryInfo.orderReceptTime
          if (expireTime > inquiryInfo.currentTime) {
            item.time = (expireTime - inquiryInfo.currentTime) * 1000
          }
        }
      })
      context.commit('setList', res.data.list)
      context.commit('setLoaded', true)
      // context.commit('setList',res.data.list);
      // context.commit('setUnread',res.data.unRead);
      // this.loaded = true;
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
