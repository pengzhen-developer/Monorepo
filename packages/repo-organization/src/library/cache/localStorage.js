import signKey from './../util/signKey'
import { LocalStorage } from 'quasar'

export function set(key, value) {
  key = signKey(key)
  return LocalStorage.set(key, value)
}

export function get(key) {
  key = signKey(key)
  return LocalStorage.getItem(key)
}

export function remove(key) {
  key = signKey(key)
  return LocalStorage.remove(key)
}

export function clear() {
  return LocalStorage.clear()
}

export default {
  set,
  get,
  remove,
  clear
}
