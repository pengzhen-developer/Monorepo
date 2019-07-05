/*
 * @Author: PengZhen
 * @Description: 基础依赖入口，并以插件形式，向外暴露
 * @Date: 2017-07-05 16:07:33
 */

// prototype
import './prototype/date'
import './prototype/number'
import './prototype/string'

// components
import Table from './components/table'
import Dialog from './components/dialog'

// directive
import drag from './directive/drag'
import focus from './directive/focus'

// http
import http from './http'

// util
import util from './helper/util'
import cache from './helper/cache'
import validate from './helper/validate'

// config
import config from '@src/config'
// type
import type from '@src/type'
// service
import service from '@src/service'

const install = function(Vue) {
  const peace = { http, util, cache, validate, config, type, service }

  // 暴露全局实例
  Window.$peace = peace
  global.$peace = peace

  // 挂载到 Vue
  Vue.prototype.http = http
  Vue.prototype.$peace = peace

  // 注册 component
  const components = [Table, Dialog]
  components.map(component => {
    Vue.use(component)
  })

  // 注册 directive
  const directive = [drag, focus]
  directive.map(directive => {
    Vue.directive(directive.name, directive)
  })

  console.log('-------框架加载完成-------')
  console.log('-------使用内部命令查看详情-------')
}

export default {
  /** http 请求类 */
  http,

  /** 工具类 */
  util,

  /** 缓存类 */
  cache,

  /** 验证类 */
  validate,

  /** 服务类 */
  service,

  /** 配置 */
  config,

  /** 常量 */
  type,

  /** vue plugin */
  install
}
