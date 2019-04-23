/*
 * @Author: PengZhen
 * @Description: 程序入口文件
 * @Date: 2018-12-05 11:57:11
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-04-23 16:43:19
 */
import Vue from 'vue'

// library
import library from './library'
Vue.use(library)

import App from './App.vue'
import store from './store'
import router from './router'

import axios from 'axios'

// css
import './assets/css/global.css'

// icon
import './assets/fonts/iconfont.css'

// UI
import ElUI from 'element-ui'
import './assets/css/element-theme.scss'
import './assets/css/element-fix.scss'
Vue.use(ElUI, { size: 'mini' })

Vue.config.productionTip = false

// 获取配置文件方法
const setConfigInstance = () => {
  const configFilePath = `${process.env.BASE_URL}static/config/index.json?t=${new Date()}`

  return axios
    .create()
    .get(configFilePath)
    .then(res => {
      $peace.config = res.data
      $peace.config.api = $peace.config.api[process.env.VUE_APP_MODE] || $peace.config.api[process.env.NODE_ENV]
    })
}

// 实例化 Vue App 方法
const setVueAppInstance = () => {
  $peace.__proto__ = new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')

  // 记录是否初次加载完成
  $peace.isPostBack = true
}

// 初始化操作
setConfigInstance().then(() => {
  setVueAppInstance()
})
