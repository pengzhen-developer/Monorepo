import { sign } from './../util/tool'
import { getStorage } from './web-storage'

const __sessionStorage = getStorage('session')

export function set(key, value) {
  key = sign(key)

  return __sessionStorage.set(key, value)
}

export function get(key) {
  key = sign(key)

  return __sessionStorage.getItem(key)
}

export function remove(key) {
  key = sign(key)

  return __sessionStorage.remove(key)
}

export function clear() {
  const singKey = sign()

  for (const key in window.sessionStorage) {
    if (key.includes(singKey)) {
      window.sessionStorage.removeItem(key)
    }
  }
}

export default {
  set,
  get,
  remove,
  clear
}
