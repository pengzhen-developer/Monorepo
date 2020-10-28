/**
 * Vue 入口文件
 *
 * @Date        : 2020-04-22
 * @Description : 参考 quasar-cli, 使用 boot 解耦初始化逻辑
 */

import Boot from './boot'
const install = async () => {
  const vueAppInstance = await Boot.install()

  // Set Prototype
  Object.setPrototypeOf ? Object.setPrototypeOf(peace, vueAppInstance) : (peace.__proto__ = vueAppInstance)
}

install()
