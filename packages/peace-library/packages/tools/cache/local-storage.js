import { sign } from './../util/tool'
import { getStorage } from './web-storage'

const __LocalStorage = getStorage('local')

export function set(key, value) {
  key = sign(key)

  return __LocalStorage.set(key, value)
}

export function get(key) {
  key = sign(key)

  return __LocalStorage.getItem(key)
}

export function remove(key) {
  key = sign(key)

  return __LocalStorage.remove(key)
}

export function clear() {
  const singKey = sign()

  for (const key in window.localStorage) {
    if (key.includes(singKey)) {
      window.localStorage.removeItem(key)
    }
  }
}

export default {
  set,
  get,
  remove,
  clear
}
