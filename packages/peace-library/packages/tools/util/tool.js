/* eslint-disable */

/**
 * 当前环境签名
 *
 * @export
 * @returns
 */
export function sign(key) {
  const appName = peace.config && peace.config.appName
  const appVersion = peace.config && peace.config.appVersion

  if (key) {
    return `[${appName}]-[${appVersion}]:${key}`
  } else {
    return `[${appName}]-[${appVersion}]:`
  }
}

/**
 * 判断数据类型
 *
 * .e.g
 *
 * isType('string').isString => true
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isType(object) {
  const isNull = '[object Null]'
  const isArray = '[object Array]'
  const isSymbol = '[object Symbol]'
  const isObject = '[object Object]'
  const isNumber = '[object Number]'
  const isString = '[object String]'
  const isBoolean = '[object Boolean]'
  const isFunction = '[object Function]'
  const isUndefined = '[object Undefined]'

  return {
    isNull: Object.prototype.toString.call(object) === isNull,
    isArray: Object.prototype.toString.call(object) === isArray,
    isSymbol: Object.prototype.toString.call(object) === isSymbol,
    isObject: Object.prototype.toString.call(object) === isObject,
    isNumber: Object.prototype.toString.call(object) === isNumber,
    isString: Object.prototype.toString.call(object) === isString,
    isBoolean: Object.prototype.toString.call(object) === isBoolean,
    isFunction: Object.prototype.toString.call(object) === isFunction,
    isUndefined: Object.prototype.toString.call(object) === isUndefined
  }
}

/**
 * 是否 Null
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isNull(object) {
  return isType(object).isNull
}

/**
 * 是否 Array
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isArray(object) {
  return isType(object).isArray
}

/**
 * 是否 Symbol
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isSymbol(object) {
  return isType(object).isSymbol
}

/**
 * 是否 Object
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isObject(object) {
  return isType(object).isObject
}

/**
 * 是否 Number
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isNumber(object) {
  return isType(object).isNumber
}

/**
 * 是否 String
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isString(object) {
  return isType(object).isString
}

/**
 * 是否 Boolean
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isBoolean(object) {
  return isType(object).isBoolean
}

/**
 * 是否 Function
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isFunction(object) {
  return isType(object).isFunction
}

/**
 * 是否 Undefined
 *
 * @export
 * @param {*} object
 * @returns
 */
export function isUndefined(object) {
  return isType(object).isUndefined
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

/**
 * deep compare
 *
 * @export
 * @returns
 */
export function deepCompare() {
  var i, l, leftChain, rightChain

  function compare2Objects(x, y) {
    var p

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString()
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false
    }

    if (x.constructor !== y.constructor) {
      return false
    }

    if (x.prototype !== y.prototype) {
      return false
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false
      } else if (typeof y[p] !== typeof x[p]) {
        return false
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false
      } else if (typeof y[p] !== typeof x[p]) {
        return false
      }

      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x)
          rightChain.push(y)

          if (!compare2Objects(x[p], y[p])) {
            return false
          }

          leftChain.pop()
          rightChain.pop()
          break

        default:
          if (x[p] !== y[p]) {
            return false
          }
          break
      }
    }

    return true
  }

  if (arguments.length < 1) {
    return true //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = [] //Todo: this can be cached
    rightChain = []

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false
    }
  }

  return true
}

/**
 * merge
 *
 * @param {*} target
 * @param  {...any} arg
 */
export function merge(target, ...arg) {
  // check target is object
  if (!isType(target).isObject) {
    return target
  }

  // check arg is object
  let flag = false
  arg.forEach((item) => {
    if (!isType(item).isObject) {
      flag = true
    }
  })
  if (flag) {
    return target
  }

  return arg.reduce((acc, cur) => {
    return Object.keys(cur).reduce((subAcc, key) => {
      const srcVal = cur[key]
      if (isType(srcVal).isObject) {
        subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
      } else if (isType(srcVal).isArray) {
        // series: []，下层数组直接赋值
        subAcc[key] = srcVal.map((item, idx) => {
          if (isType(item).isObject) {
            const curAccVal = subAcc[key] ? subAcc[key] : []
            return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
          } else {
            return item
          }
        })
      } else {
        subAcc[key] = srcVal
      }
      return subAcc
    }, acc)
  }, target)
}

export default {
  isNull,
  isArray,
  isSymbol,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isUndefined,
  isType,

  sign,
  queryUrlParam,
  arrayToTree,
  deepClone,
  deepCompare,
  merge
}
