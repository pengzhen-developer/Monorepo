import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tabs from './modules/tabs'
import region from './modules/region'

export default function() {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      user,
      tabs,
      region
    }
  })

  return Store
}
