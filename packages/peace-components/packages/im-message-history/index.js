import IMMessageHistory from './src/index.vue'

IMMessageHistory.install = (Vue) => {
  Vue.component(IMMessageHistory.name, IMMessageHistory)
}

export default IMMessageHistory
