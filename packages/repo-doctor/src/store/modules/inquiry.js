const state = {
  sessions: [],
  session: {},
  sessionMessages: []
}

const getters = {
  patientInfo: state => {
    if (state.session && state.session.content) {
      return state.session.content.patientInfo
    } else {
      return {}
    }
  },

  inquiryInfo: state => {
    if (state.session && state.session.content) {
      return state.session.content.inquiryInfo
    } else {
      return {}
    }
  },

  doctorInfo: state => {
    if (state.session && state.session.content) {
      return state.session.content.doctorInfo
    } else {
      return {}
    }
  }
}

const mutations = {
  setInquirySessions(state, params) {
    state.sessions = params
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
  }
}

export default {
  namespaced: true,

  state,
  getters,
  mutations
}
