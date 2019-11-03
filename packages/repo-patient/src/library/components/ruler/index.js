import Ruler from './src/index.vue'

Ruler.install = function(Vue) {
  Vue.component(Ruler.name, Ruler)
}

export default Ruler
