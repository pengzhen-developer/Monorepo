/*
 * @Author: PengZhen
 * @Description: 缓存
 * @Date: 2018-07-06 11:23:58
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-04-10 09:26:40
 */

import { encode, decode } from './util'

/**
 * set cache
 *
 * @export
 * @param {string} [key='']
 * @param {*} value
 * @param {string} [type='localStorage']
 */
export function set(key = '', value, type = 'localStorage') {
  const encodeKey = encode(key)

  if (!$peace.valid.isEmpty(value)) {
    const encodeValue = encode(window.unescape(window.encodeURIComponent(JSON.stringify(value))))

    window[type].setItem(encodeKey, encodeValue)
  }
}

/**
 *
 * get cache
 *
 * @export
 * @param {string} [key='']
 * @param {string} [type='localStorage']
 * @returns
 */
export function get(key = '', type = 'localStorage') {
  const encodeKey = encode(key)

  const value = window[type].getItem(encodeKey)

  if (!$peace.valid.isEmpty(value)) {
    return JSON.parse(window.decodeURIComponent(window.escape(decode(value))))
  }
}

/**
 * remove cache
 *
 * @export
 * @param {string} [key='']
 * @param {string} [type='localStorage']
 */
export function remove(key = '', type = 'localStorage') {
  window[type].removeItem(decode(key))
}

/**
 * clear cache
 *
 * @export
 */
export function clear() {
  window.sessionStorage.clear()
  window.localStorage.clear()
}

export default {
  set,
  get,
  remove,
  clear
}
