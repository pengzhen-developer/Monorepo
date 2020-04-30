/*
 * @Author: PengZhen
 * @Description: 程序入口文件
 * @Date: 2017-12-05
 */

import Vue from 'vue'
import store from '@src/store'
import router from '@src/router'

// root component
import App from '@src/App.vue'

// library
import library from '@src/library'
Vue.use(library.install)

// UI
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini' })

// css
import '@src/assets/css/index.scss'

// plugin
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

// initial
const vueAppInstance = new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')

// 兼容 IE 9、10 低版本的 __proto__
Object.setPrototypeOf ? Object.setPrototypeOf($peace, vueAppInstance) : ($peace.__proto__ = vueAppInstance)
