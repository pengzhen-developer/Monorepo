/**
 * Vue 入口文件
 *
 * @Date        : 2020-04-22
 * @Author      : PengZhen
 * @Description : 参考 quasar-cli, 使用 boot 解耦初始化逻辑
 */
import Vue from 'vue'

import Boot from './boot/index'

// Viewer
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

const install = async () => {
  Vue.use(Viewer, {
    defaultOptions: {
      zIndex: 9999,
      navbar: false,
      title: false,
      toolbar: false,
      tooltip: false
    }
  })
  const vueAppInstance = await Boot.install()

  // Set Prototype
  Object.setPrototypeOf ? Object.setPrototypeOf($peace, vueAppInstance) : ($peace.__proto__ = vueAppInstance)
}

install()
