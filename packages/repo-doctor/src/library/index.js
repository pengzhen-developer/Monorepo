/*
 * @Author: PengZhen
 * @Description: 基础依赖入口，并以插件形式，向外暴露
 * @Date: 2018-07-05 16:07:33
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-04-10 11:00:22
 */

import axios from './axios'

// prototype
import './prototype/date'
import './prototype/number'
import './prototype/string'

// directive
import has from './directive/has'
import drag from './directive/drag'
import focus from './directive/focus'

// helper
import cache from './helper/cache'
import util from './helper/util'
import valid from './helper/valid'

/**
 * 插件可选属性默认值
 */
const DEFAULT_OPTIONS = {
  axios: {
    // 是否启用 axios
    enable: true,
    // axios 请求超时时间
    timeout: 30000,
    // axios 请求超时时，需要的重试次数 (0: 不重试)
    retry: 4,
    // axios 请求超时时，重试的间隔延迟时间 (默认 1000ms )
    retryDelay: 1000
  }
}

/**
 * 定义插件加载方法
 *
 * @param {*} Vue
 */
const install = function(Vue, options = DEFAULT_OPTIONS) {
  // 挂载内部属性
  const $peace = { cache, util, valid }

  // 暴露全局实例
  Window.$peace = $peace
  global.$peace = $peace

  // 挂载到 Vue 全局属性
  Vue.prototype.$peace = $peace

  if (options.axios.enable) {
    axios.defaults.headers[`Content-Type`] = `application/x-www-form-urlencoded`
    axios.defaults.timeout = options.axios.timeout
    axios.defaults.retry = options.axios.retry
    axios.defaults.retryDelay = options.axios.retryDelay

    Vue.prototype.$http = axios
  }

  // 注册 directive
  const directive = [has, drag, focus]
  directive.map(directive => {
    Vue.directive(directive.name, directive)
  })

  // 注册 component
}

/**
 * 暴露插件加载方法
 */
export default { install }
