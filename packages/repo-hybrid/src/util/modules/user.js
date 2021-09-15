import Peace from '@src/library'

/** 用户信息常量 */
const USER_INFO = '[USER][USER_INFO]'

/**
 * 缓存用户信息
 *
 * @param {*} userInfo 用户信息
 * @returns
 */
export const setUserInfo = (userInfo) => {
  return Peace.cache.localStorage.set(USER_INFO, userInfo)
}

/**
 * 获取用户信息（缓存）
 *
 * @returns
 */
export const getUserInfo = () => {
  return Peace.cache.localStorage.get(USER_INFO)
}

/**
 * 清空用户信息（缓存）
 *
 */
export const removeUserInfo = () => {
  return Peace.cache.localStorage.remove(USER_INFO)
}

/**
 * 是否已登录
 *
 */
export const isSignIn = () => {
  return !!Peace.cache.localStorage.get(USER_INFO)
}

export default {
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  isSignIn
}
