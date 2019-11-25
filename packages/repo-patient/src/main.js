/*
 * @Author: PengZhen
 * @Description: 程序入口文件
 * @Date: 2017-12-05
 */

import Vue from 'vue'
import store from '@src/store'
import router from '@src/router'

// Vue Page Stack
import VuePageStack from 'vue-page-stack'
Vue.use(VuePageStack, { router })

// flexible: https://github.com/amfe/lib-flexible
import './flexible'

// root component
import App from '@src/App.vue'

// library
import library from '@src/library'
Vue.use(library.install)

// UI
import Vant from 'vant'
import 'vant/lib/icon/local.css'
import 'vant/lib/index.less'
Vue.use(Vant)

// css
import '@src/assets/css/index.scss'

// initial
const vueAppInstance = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// 兼容 IE 9、10 低版本的 __proto__
Object.setPrototypeOf
  ? Object.setPrototypeOf($peace, vueAppInstance)
  : ($peace.__proto__ = vueAppInstance)
