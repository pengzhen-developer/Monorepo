import Vue from 'vue'
import Vuex from 'vuex'

import notification from './modules/notification'

export default function() {
  Vue.use(Vuex)

  return new Vuex.Store({
    modules: {
      notification
    }
  })
}
