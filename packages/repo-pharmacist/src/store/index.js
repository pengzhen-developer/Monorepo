import Vue from 'vue'
import Vuex from 'vuex'

import notification from './modules/notification'
import pharmacist from './modules/pharmacist'

export default function() {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      notification,
      pharmacist
    }
  })

  return Store
}
