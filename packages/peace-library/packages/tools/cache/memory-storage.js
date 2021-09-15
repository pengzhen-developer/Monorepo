import { sign } from './../util/tool'
import { encode, decode } from './web-storage'

let __memoryStorage = {}

export function set(key, value) {
  key = sign(key)
  value = encode(value)

  return (__memoryStorage[key] = value)
}

export function get(key) {
  key = sign(key)

  return __memoryStorage[key] ? decode(__memoryStorage[key]) : null
}

export function remove(key) {
  key = sign(key)

  return (__memoryStorage[key] = undefined)
}

export function clear() {
  return (__memoryStorage = {})
}

export default {
  set,
  get,
  remove,
  clear
}
