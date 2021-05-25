import peace from '@src/library'

const state = {
  sessions: [],
  sessionsFamily: {},
  session: {},
  sessionMessages: [],
  hasSetInfo: false,
  serviceRemind: {
    list: [],
    readNum: 0,
    total: 0,
    unreadNum: 0
  }
}

const getters = {
  patientInfo: (state) => {
    if (state.session && state.session.content) {
      return state.session.content.patientInfo
    } else {
      return {}
    }
  },

  inquiryInfo: (state) => {
    if (state.session && state.session.content) {
      return state.session.content.inquiryInfo
    } else {
      return {}
    }
  },

  doctorInfo: (state) => {
    if (state.session && state.session.content) {
      return state.session.content.doctorInfo
    } else {
      return {}
    }
  },

  sessionList: (state) => {
    let sessions = []
    Object.keys(state.sessionsFamily).forEach((item) => {
      if (state.sessionsFamily[item] && state.sessionsFamily[item].sessions && state.sessionsFamily[item].sessions.length > 0) {
        sessions = sessions.concat(state.sessionsFamily[item].sessions)
      }
    })
    // 按时间排序
    sessions.sort(function(a, b) {
      var val1 = a.updateTime
      var val2 = b.updateTime
      return val2 - val1
    })

    return sessions
  }
}

const mutations = {
  setInquirySessionsFamily(state, params) {
    state.sessionsFamily = null
    state.sessionsFamily = params
    state.hasSetInfo = true
  },
  setInquirySessions(state, params) {
    state.sessions = state.sessions.concat(params)
  },

  setInquirySession(state, params) {
    state.session = params
  },

  resetInquirySession(state) {
    state.session = {}
  },

  setInquirySessionMessages(state, params) {
    state.sessionMessages = params
  },

  resetInquirySessionMessages() {
    state.sessionMessages = []
  },

  setServiceRemind(state, params) {
    state.serviceRemind = params
  }
}

const actions = {
  getServiceRemind({ commit }) {
    return new Promise((resolve) => {
      let params = {
        p: 1,
        size: 10,
        hideLoad: true,
        tag: 'yz'
      }
      peace.http
        .post('client/v1/notice/getMsgList', params, {
          headers: {
            post: { 'Content-Type': 'application/json' }
          }
        })
        .then((res) => {
          commit('setServiceRemind', res.data)
          resolve(res.data)
        })
    })
  }
}

export default {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
