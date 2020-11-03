/**
 * Vue 入口文件
 *
 * @Date        : 2020-04-22
 * @Author      : PengZhen
 * @Description : 参考 quasar-cli, 使用 boot 解耦初始化逻辑
 */

import Util from '@src/util/'
import Boot from './boot'

const install = async () => {
  const vueAppInstance = await Boot.install()

  // Set Prototype
  Object.setPrototypeOf ? Object.setPrototypeOf($peace, vueAppInstance) : ($peace.__proto__ = vueAppInstance)

  // 从控制台返回，标记清除用户信息
  if (Peace.util.queryUrlParam('clear') === 'true') {
    Util.user.removeUserInfo()

    window.location.href = window.location.href.replace('?clear=true', '').replace('clear=true', '')
  }
}

install()
