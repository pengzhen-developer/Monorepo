/*
 * @Author: PengZhen
 * @Description: 基础依赖入口，并以插件形式，向外暴露
 * @Date: 2017-07-05 16:07:33
 */

// prototype
import './prototype/date'
import './prototype/number'
import './prototype/string'

// http
import http from './http'
// util
import util from './util'
// cache
import cache from './cache'
// cache
import validate from './validate'

const install = function(Vue) {
  const peace = { http, util, cache, validate }

  // 暴露全局实例
  Window.$peace = peace
  global.$peace = peace

  // 挂载到 Vue
  Vue.prototype.$peace = peace

  console.log(
    `%c Library %c Done `,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff'
  )
}

export default {
  /** http 请求类 */
  http,

  /** 常用工具类 */
  util,

  /** 缓存工具类 */
  cache,

  /** 验证工具类 */
  validate,

  /** vue plugin */
  install,
}
