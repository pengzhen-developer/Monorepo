import Peace from '@src/library'
import RouterPath from '@src/router/generateRoutes'
import Router from '@src/router'

/** 用户信息常量 */
const USER_INFO = 'user_info'
const USER_CD_KEY = 'user_cd_key'

/**
 * 缓存用户 cdkey
 *
 * @param {*} userInfo cdkey
 * @returns
 */
export const setUserCDKey = (cdkey) => {
  return Peace.cache.localStorage.set(USER_CD_KEY, cdkey)
}
/**
 * 获取用户 cdkey
 *
 * @returns
 */
export const getUserCDKey = () => {
  return Peace.cache.localStorage.get(USER_CD_KEY)
}

/**
 * 清空用户 cdkey
 *
 */
export const removeUserCDKey = () => {
  return Peace.cache.localStorage.remove(USER_CD_KEY)
}

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
 * 更新用户信息
 *
 * @param {*} userInfo 用户信息
 * @returns
 */
export const updateUserInfo = (userInfo) => {
  const oldUserInfo = getUserInfo()
  const newUserInfo = userInfo

  const updatedUserInfo = Object.assign({}, oldUserInfo, newUserInfo)

  return setUserInfo(updatedUserInfo)
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
  Peace.cache.localStorage.remove(USER_INFO)
  Peace.cache.localStorage.remove(USER_CD_KEY)
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
      referrer: referrer || Router.router.history.current.fullPath
    }
  })
}

/**
 * 跳转控制台
 *
 */
export const redirectToConsole = () => {
  const CONSOLE_SITE_PATH = process.env.VUE_APP_CONSOLE_SITE + '?cdkey=' + getUserCDKey()

  window.open(CONSOLE_SITE_PATH)
}
/**
 * 跳转医生工作台
 *
 */
export const redirectToDoctorWorkbench = () => {
  const CONSOLE_DOCTOR_WORKBENCH_PATH = process.env.VUE_APP_DOCTOR_WORKBENCH_SITE

  window.open(CONSOLE_DOCTOR_WORKBENCH_PATH)
}
/**
 * 跳转药师工作台
 *
 */
export const redirectTOPharmacistWorkbench = () => {
  const CONSOLE_PHARMACIST_WORKBENCH_PATH = process.env.VUE_APP_PHARMACIST_WORKBENCH_SITE

  window.open(CONSOLE_PHARMACIST_WORKBENCH_PATH)
}
/**
 * 是否已登录
 *
 */
export const isSignIn = () => {
  return !!Peace.cache.localStorage.get(USER_INFO)
}

export default {
  getUserInfo,
  setUserInfo,
  updateUserInfo,
  removeUserInfo,
  isSignIn,

  getUserCDKey,
  setUserCDKey,
  removeUserCDKey,

  replaceToLogin,
  redirectToConsole,
  redirectToDoctorWorkbench,
  redirectTOPharmacistWorkbench
}
