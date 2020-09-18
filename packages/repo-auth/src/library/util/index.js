import platform from './platform'
import { encode, decode } from './base64'
import { Message } from 'element-ui'

/**
 *
 *
 * @export
 * @param {*} options
 */
export function alert(options, type = 'info') {
  if (this.type(options).isString) {
    Message({
      message: options,
      type: type
    })
  } else {
    Message(options)
  }
}
export function warning(options) {
  this.alert(options, 'warning')
}
export function success(options) {
  this.alert(options, 'success')
}
export function error(options) {
  this.alert(options, 'error')
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
    isUndefined: Object.prototype.toString.call(object) === isUndefined
  }
}

/**
 * 获取时间间隔
 *
 * @export
 * @param {*} bgTime
 * @param {*} endTime
 * @returns
 */
export function getDuration(bgTime, endTime) {
  const totalSecs = (endTime - bgTime) / 1000

  const dd = Math.floor(totalSecs / 3600 / 24)
  const HH = Math.floor((totalSecs - dd * 24 * 3600) / 3600)
  const mm = Math.floor((totalSecs - dd * 24 * 3600 - HH * 3600) / 60)
  const ss = Math.floor(totalSecs - dd * 24 * 3600 - HH * 3600 - mm * 60)

  return {
    dd,
    HH,
    mm,
    ss
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
  if (name === undefined || name === null || name === '') {
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

export default {
  alert,
  warning,
  success,
  error,

  platform,
  encode,
  decode,

  type,

  getDuration,

  queryUrlParam,
  arrayToTree,
  deepClone
}
