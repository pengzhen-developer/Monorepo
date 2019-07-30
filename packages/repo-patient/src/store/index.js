import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import inquiry from './modules/inquiry'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    inquiry
  }
})
