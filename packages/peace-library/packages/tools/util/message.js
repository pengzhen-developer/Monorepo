import Vue from 'vue'
import { isType } from './tool'

/**
 * 请注意！！！
 * 方法依赖 Element-UI
 *
 * @export
 * @param {*} message
 * @param {*} messageType
 */
export function alert(message, messageType = 'info') {
  const vueInstance = new Vue()

  if (vueInstance.$ELEMENT && vueInstance.$message) {
    if (isType(message).isString) {
      vueInstance.$message({
        message: message,
        type: messageType
      })
    } else {
      vueInstance.$message(message)
    }
  } else {
    if (isType(message).isString) {
      window.alert(message)
    } else {
      window.alert(message.message)
    }

    throw new Error('Element-ui is required, use window.alert instead.')
  }
}

/**
 * 请注意！！！
 * 方法依赖 Element-UI
 *
 * @export
 * @param {*} options
 */
export function warning(options) {
  alert(options, 'warning')
}

/**
 * 请注意！！！
 * 方法依赖 Element-UI
 *
 * @export
 * @param {*} options
 */
export function success(options) {
  alert(options, 'success')
}

/**
 * 请注意！！！
 * 方法依赖 Element-UI
 *
 * @export
 * @param {*} options
 */
export function error(options) {
  alert(options, 'error')
}

export default {
  alert,
  warning,
  success,
  error
}
