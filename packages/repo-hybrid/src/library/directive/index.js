import { Drag } from './drag'

const install = (Vue) => {
  Vue.directive(Drag.name, Drag)
}

export default {
  install
}
