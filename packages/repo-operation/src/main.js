import Package from '@/package.json'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import Library
import Library from '@src/library'
Vue.use(Library)

// Import Vue Page Stack
// https://github.com/hezhongfeng/vue-page-stack
import VuePageStack from 'vue-page-stack'
Vue.use(VuePageStack, { router: router.router, keyName: 'stack' })

// Import CSS
import '@src/assets/css/index.scss'

// Import main
if (process.env.VUE_APP_PLATFORM === 'web') {
  require('./main.web')
} else if (process.env.VUE_APP_PLATFORM === 'mobile') {
  require('./main.mobile')
}

// Set Vue config
Vue.config.productionTip = false

// Install Vue App
const vueAppInstance = new Vue({
  router: router.router,
  store: store,
  render: (h) => h(App),
}).$mount('#app')

// Set Prototype
Object.setPrototypeOf ? Object.setPrototypeOf($peace, vueAppInstance) : ($peace.__proto__ = vueAppInstance)

console.log(
  `%c 互联网医院 %c v${Package.version} %c`,
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
  'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
  'background:transparent'
)
