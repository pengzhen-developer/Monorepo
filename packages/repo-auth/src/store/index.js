import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tabs from './modules/tabs'
import info from './modules/info'
export default function() {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      user,
      tabs,
      info
    }
  })

  return Store
}
