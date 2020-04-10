import peace from '@src/library'
import constants from '@src/constants'
import router from '@src/router'
import routerPath from '@src/router/routerPath'

/**
 * 缓存用户信息
 *
 * @param {*} userInfo 用户信息
 * @returns
 */
export const setUserInfo = userInfo => {
  return peace.cache.localStorage.set(constants.USER.USER_INFO, userInfo)
}

/**
 * 获取用户信息（缓存）
 *
 * @returns
 */
export const getUserInfo = () => {
  return peace.cache.localStorage.get(constants.USER.USER_INFO)
}

/**
 * 清空用户信息（缓存）
 *
 */
export const removeUserInfo = () => {
  return peace.cache.localStorage.remove(constants.USER.USER_INFO)
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
  return router.router.push({
    name: routerPath.system.LOGIN,
    query: {
      referrer: referrer || router.router.history.current.fullPath
    }
  })
}

/**
 * 是否已登录
 *
 */
export const isSignIn = () => {
  return !!peace.cache.localStorage.get(constants.USER.USER_INFO)
}

export default {
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  isSignIn,

  replaceToLogin
}
