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

  consultInfo: state => {
    if (state.session && state.session.content) {
      return state.session.content.consultInfo
    } else {
      return {}
    }
  }
}

const mutations = {
  setConsultationSessions(state, params) {
    state.sessions = params
  },

  setConsultationSession(state, params) {
    state.session = params
  },

  resetConsultationSession(state) {
    state.session = {}
  },

  setConsultationSessionMessages(state, params) {
    state.sessionMessages = params
  },

  resetConsultationSessionMessages() {
    state.sessionMessages = []
  }
}

export default {
  namespaced: true,

  state,
  getters,
  mutations
}
