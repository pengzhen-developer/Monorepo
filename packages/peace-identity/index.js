/**
 * identity
 *
 * @Date        : 2020-09-28
 * @Description : Vue Plugin，注册认证授权相关方法
 *
 */
import { name, version } from './package.json'

import Auth from './packages/auth/index'
import Dictionary from './packages/dictionary/index'
import Socket from './packages/socket/index'

/**
 * 初始化配置项
 *
 * @param {*} options
 * @returns
 */
const initOptions = (options) => {
  const defaultOptions = {
    auth: {
      baseApi: ''
    },
    socket: {
      debug: false
    }
  }

  options.auth = peace.util.merge(defaultOptions.auth, options.auth)
  options.socket = peace.util.merge(defaultOptions.socket, options.socket)

  if (!options.auth.baseApi) {
    return console.error(`
Check config：
Vue.use(PeaceIdentity, {
  auth: {
    baseApi: ''
  }
})`)
  }

  return options
}

/**
 * Vue plugin 加载方法
 *
 * @param {*} Vue
 * @param {*} options
 */
const install = (Vue, options) => {
  window.peace = window.peace || Object.create(new Vue())

  window.peace.identity = Object.create({})

  // 初始化配置项
  options = initOptions(options)

  // 基础配置
  const config = options
  // 权限管理
  const auth = Auth.getInstance(options.auth)
  const dictionary = Dictionary.getInstance(options.auth)
  const socket = Socket.getInstance(options.socket)

  const identity = {
    config,
    auth,
    dictionary,
    socket
  }

  // 挂载 window
  window.peace.identity = identity
  window.Peace.identity = identity
  window.$peace.identity = identity
  window.$Peace.identity = identity

  // 挂载 Vue
  Vue.prototype.peace.identity = identity
  Vue.prototype.Peace.identity = identity
  Vue.prototype.window = window
  Vue.prototype.$peace.identity = identity
  Vue.prototype.$Peace.identity = identity
  Vue.prototype.$window = window

  console.log(
    `%c ${name} %c ${version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}

export default {
  version,
  install
}
