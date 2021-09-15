/**
 * library
 *
 * @Date        : 2017-07-05
 * @Description : Vue Plugin，注册常用方法和组件
 *                  1,  tools 工具类
 *                  2， directive 指令库
 *                  3， filter 过滤器
 */

import { name, version } from './package.json'

import createDirective from './packages/directive/index'
import createFilter from './packages/filter/index'
import createTools from './packages/tools/index'
import createHttp from './packages/http/index'

/**
 * 初始化配置项
 *
 * @param {*} options
 * @returns
 */
const initOptions = (options) => {
  const defaultOptions = {
    // config
    config: {
      appName: '',
      appVersion: ''
    },

    // http config
    http: {
      // .e.g
      // requestInterceptor: { then: function() {}, catch: function() {} }
      // responseInterceptor: { then: function() {}, catch: function() {} }
      interceptors: {
        requestInterceptor: undefined,
        responseInterceptor: undefined
      }
    }
  }

  options = Object.assign(defaultOptions, options)

  if (!options.config.appName || !options.config.appVersion) {
    return console.error(`
Check config：
Vue.use(PeaceLibrary, {
  config: {
    appName: 'appName',
    appVersion: 'appVersion'
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
  const peace = window.peace || {}

  // 初始化配置项
  options = initOptions(options)

  // 创建 tools 工具库
  const { util, validate, cache, dayjs, numeral } = createTools({ Vue, options })
  // 创建 http 请求库
  const { http } = createHttp({ Vue, options })
  // 创建 filter 过滤器
  createFilter({ Vue, options })
  // 创建 directive 过滤器
  createDirective({ Vue, options })

  peace.config = options.config
  peace.util = util
  peace.validate = validate
  peace.cache = cache
  peace.dayjs = dayjs
  peace.numeral = numeral
  peace.http = http

  // 挂载 window
  window.peace = peace
  window.Peace = peace
  window.$peace = peace
  window.$Peace = peace

  // 挂载 Vue
  Vue.prototype.peace = peace
  Vue.prototype.Peace = peace
  Vue.prototype.window = window
  Vue.prototype.$peace = peace
  Vue.prototype.$Peace = peace
  Vue.prototype.$window = window

  console.log(
    `%c ${name} %c ${version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}

export default {
  install,

  version
}
