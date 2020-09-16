import signKey from '../util/signKey'
import { SessionStorage } from 'quasar'

export function set(key, value) {
  key = signKey(key)
  return SessionStorage.set(key, value)
}

export function get(key) {
  key = signKey(key)
  return SessionStorage.getItem(key)
}

export function remove(key) {
  key = signKey(key)
  return SessionStorage.remove(key)
}

export function clear() {
  return SessionStorage.clear()
}

export default {
  set,
  get,
  remove,
  clear
}
