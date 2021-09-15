import platform from './platform'

import { encode, decode } from './base64'
import {
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
} from './tool'
import { alert, warning, success, error } from './message'
import { formatDate, formatTime } from './format'
import { formatLabel, formatLabelFuzzy, formatValue, formatValueFuzzy } from './dictionary'

export default {
  platform,

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
  merge,

  encode,
  decode,

  alert,
  warning,
  success,
  error,

  formatDate,
  formatTime,

  formatLabel,
  formatLabelFuzzy,
  formatValue,
  formatValueFuzzy
}
