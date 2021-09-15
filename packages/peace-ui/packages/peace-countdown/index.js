import Countdown from './src/countdown'

const install = (Vue) => {
  Vue.component(Countdown.name, Countdown)
}

export default {
  install
}
