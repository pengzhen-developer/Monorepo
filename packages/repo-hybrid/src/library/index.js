/**
 * library
 *
 * @Date        : 2017-07-05
 * @Author      : PengZhen
 * @Description : 基于 Vue Plugin 形式，注册常用方法和组件
 *                    1， http 请求类
 *                    2,  util 工具类
 *                    3， validate 验证类
 *                    4， cache 缓存类
 *                    5， vue components 公用组件
 *                    6， vue directive 公用指令
 *                    7， vue filters 公用过滤器
 */

// http
import http from './http'
// util
import util from './util'
// validate
import validate from './validate'
// cache
import cache from './cache'
// components
import PeaceCountDown from './components/countdown'
import PeaceDialog from './components/dialog'
import { Table, TableColumn, Pagination } from './components/table'
// directive
import Drag from './directive/drag'

const install = (Vue) => {
  window.$peace = window.$peace || {}
  window.$p = window.$peace
  Vue.prototype.$peace = $peace
  Vue.prototype.$p = $peace

  window.$peace.http = http
  window.$peace.util = util
  window.$peace.cache = cache
  window.$peace.validate = validate

  Vue.component(PeaceCountDown.name, PeaceCountDown)
  Vue.component(PeaceDialog.name, PeaceDialog)
  Vue.component(Table.name, Table)
  Vue.component(TableColumn.name, TableColumn)
  Vue.component(Pagination.name, Pagination)

  Vue.directive(Drag.name, Drag)

  // 处理向下兼容性
  // Set Prototype
  cache.setPrototypeOf ? Object.setPrototypeOf(cache, cache.localStorage) : (cache.__proto__ = cache.localStorage)
}

export default {
  name: 'library',
  version: '1.0.0',

  install,

  http,
  util,
  cache,
  validate
}
