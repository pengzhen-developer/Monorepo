let Notify = {}
let Toast = {}

import { encode, decode } from './base64'

import validate from './../validate'

import platform from './platform'

/** UI library */
if (process.env.VUE_APP_PLATFORM === 'web') {
  Notify = require('element-ui/lib/notification').default
  Toast = require('element-ui/lib/message').default
} else if (process.env.VUE_APP_PLATFORM === 'mobile') {
  Notify = require('vant/lib/notify').default
  Toast = require('vant/lib/toast').default
}

/**
 * 判断数据类型
 *
 * @export
 * @param {*} object
 * @returns
 */
export function type(object) {
  const isNull = '[object Null]'
  const isArray = '[object Array]'
  const isSymbol = '[object Symbol]'
  const isObject = '[object Object]'
  const isNumber = '[object Number]'
  const isString = '[object String]'
  const isBoolean = '[object Boolean]'
  const isUndefined = '[object Undefined]'

  return {
    isNull: Object.prototype.toString.call(object) === isNull,
    isArray: Object.prototype.toString.call(object) === isArray,
    isSymbol: Object.prototype.toString.call(object) === isSymbol,
    isObject: Object.prototype.toString.call(object) === isObject,
    isNumber: Object.prototype.toString.call(object) === isNumber,
    isString: Object.prototype.toString.call(object) === isString,
    isBoolean: Object.prototype.toString.call(object) === isBoolean,
    isUndefined: Object.prototype.toString.call(object) === isUndefined,
  }
}

/**
 * 获取 url 参数
 *
 * @export
 * @param {any} name 需要解析参数的 key
 * @param {any} url 需要解析参数的 url
 * @returns 需要解析参数的参数值
 */
export function queryUrlParam(name, url = window.location.href) {
  if (validate.isEmpty(name)) {
    return console.error('[queryUrlParam]：name is required')
  }

  name = name.replace(/[[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

/**
 * array to tree
 *
 * @export
 * @param {any} nodes
 * @param {string} [idKey='id']
 * @param {string} [pIdKey='pId']
 * @param {string} [childrenKey='children']
 * @returns
 */
export function arrayToTree(nodes, idKey = 'id', pIdKey = 'pId', childrenKey = 'children') {
  let map = {}
  let node
  let roots = []

  nodes.forEach((item, index) => {
    map[item[idKey]] = index
  })
  for (let i = 0; i < nodes.length; i += 1) {
    node = nodes[i]
    if (node[pIdKey] !== '-1' && node[pIdKey] !== '' && nodes[map[node[pIdKey]]]) {
      if (!nodes[map[node[pIdKey]]][childrenKey]) {
        nodes[map[node[pIdKey]]][childrenKey] = []
        nodes[map[node[pIdKey]]][childrenKey].push(node)
      } else {
        nodes[map[node[pIdKey]]][childrenKey].push(node)
      }
    } else {
      roots.push(node)
    }
  }

  return roots
}

/**
 * deep clone
 *
 * @export
 * @param {*} item
 * @returns
 */
export function deepClone(item) {
  if (!item) {
    return item
  } // null, undefined values check

  let types = [Number, String, Boolean]
  let result

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function(type) {
    if (item instanceof type) {
      result = type(item)
    }
  })

  if (typeof result == 'undefined') {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      result = []
      item.forEach(function(child, index) {
        result[index] = deepClone(child)
      })
    } else if (typeof item == 'object') {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode == 'function') {
        result = item.cloneNode(true)
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item)
        } else {
          // it is an object literal
          result = {}
          for (let i in item) {
            result[i] = deepClone(item[i])
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor()
        } else {
          result = item
        }
      }
    } else {
      result = item
    }
  }

  return result
}

/**
 * 消息提示
 *
 * @export
 * @param {*} options
 * @returns
 */
export function alert(options) {
  // 参数为字符串，表现为 toast
  if (type(options).isString) {
    Toast(options)

    return true
  }
  // 参数为对象，表现为 notify
  else if (type(options).isObject) {
    Notify(options)

    return true
  }

  console.warn('参数格式错误')

  return false
}
export function warning(message) {
  // 参数为字符串，表现为 toast
  if (type(message).isString) {
    Toast({ message, type: 'warning' })

    return true
  }
}
export function error(message) {
  // 参数为字符串，表现为 toast
  if (type(message).isString) {
    Toast({ message, type: 'error' })

    return true
  }
}

export default {
  platform,
  encode,
  decode,

  type,

  queryUrlParam,
  arrayToTree,
  deepClone,

  alert,
  warning,
  error,
}
