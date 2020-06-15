import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tabs from './modules/tabs'

export default function() {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      user,
      tabs
    }
  })

  return Store
}
