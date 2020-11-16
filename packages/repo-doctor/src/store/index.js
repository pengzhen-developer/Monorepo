import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tabs from './modules/tabs'
import layout from './modules/layout'
import inquiry from './modules/inquiry'
import consultation from './modules/consultation'
import notification from './modules/notification'

export default function() {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      user,
      tabs,
      layout,
      inquiry,
      consultation,
      notification
    }
  })

  return Store
}
