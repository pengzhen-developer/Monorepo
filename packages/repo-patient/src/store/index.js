import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import inquiry from './modules/inquiry'
import appointMent from './modules/appointMent'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    inquiry,
    appointMent
  }
})
