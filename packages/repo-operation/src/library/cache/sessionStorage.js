import base64 from './../util/base64'
import signKey from './../util/signKey'

export function set(key, value) {
  if (key !== null && key !== undefined && value !== null && value !== undefined) {
    key = signKey(key)

    const encodeValue = base64.encode(window.unescape(window.encodeURIComponent(JSON.stringify(value))))

    window.sessionStorage.setItem(key, encodeValue)

    return true
  }

  return false
}

export function get(key) {
  if (key !== null && key !== undefined) {
    key = signKey(key)

    const value = window.sessionStorage.getItem(key)

    if (value !== null && value !== undefined) {
      return JSON.parse(window.decodeURIComponent(window.escape(base64.decode(value))))
    }
  }

  return undefined
}

export function remove(key) {
  key = signKey(key)

  window.sessionStorage.removeItem(key)
}

export function clear() {
  window.sessionStorage.clear()
}

export default {
  set,
  get,
  remove,
  clear
}
