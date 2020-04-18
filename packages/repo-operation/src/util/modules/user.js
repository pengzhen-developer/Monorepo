import Peace from '@src/library'
import RouterPath from '@src/router/routerPath'
import Router from '@src/router'

/** 用户信息常量 */
const USER_INFO = 'user_info'

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
 * 重定向到登录页，并且记录当前页面地址
 * 请注意，此方法只记录 url 参数
 * 如需做更多自定义操作，请自行记录参数
 *
 * @param {string} [referrer=''] 重定向地址
 * @returns
 */
export const replaceToLogin = (referrer = '') => {
  return Router.router.push({
    name: RouterPath.system.LOGIN,
    query: {
      referrer: referrer || Router.router.history.current.fullPath,
    },
  })
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
  isSignIn,

  replaceToLogin,
}
