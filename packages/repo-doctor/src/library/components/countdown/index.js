import Countdown from './src/countdown'

Countdown.install = function(Vue) {
  Vue.component(Countdown.name, Countdown)
}

export default Countdown
