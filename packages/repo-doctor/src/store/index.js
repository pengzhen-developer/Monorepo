import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import layout from './modules/layout'
import inquiry from './modules/inquiry'
import consultation from './modules/consultation'
import notification from './modules/notification'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    layout,
    inquiry,
    consultation,
    notification
  }
})
