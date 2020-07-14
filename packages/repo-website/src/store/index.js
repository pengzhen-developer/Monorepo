import Vue from 'vue'
import Vuex from 'vuex'

export default function() {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {}
  })

  return Store
}
