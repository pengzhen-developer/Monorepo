import Vue from 'vue'
import Vuex from 'vuex'

import notification from './modules/notification'

export default function() {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      notification
    }
  })

  return Store
}
