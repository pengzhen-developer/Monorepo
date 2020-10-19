/** 用户信息常量 */
const USER_INFO = 'user_info'
const USER_TOKEN = 'user_token'
const ACCOUNT_MENU_LIST = 'account_menu_list'

/**
 * 缓存用户 token
 *
 * @param {*} token
 * @returns
 */
export const setUserToken = (token) => {
  return Peace.cache.localStorage.set(USER_TOKEN, token)
}
/**
 * 获取用户 token
 *
 * @returns
 */
export const getUserToken = () => {
  return Peace.cache.localStorage.get(USER_TOKEN)
}

/**
 * 清空用户 token
 *
 */
export const removeUserToken = () => {
  return Peace.cache.localStorage.remove(USER_TOKEN)
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
  Peace.cache.localStorage.remove(USER_TOKEN)

  // 请查看 boot/boot_configuration/index.js

  // window.open() 会传递 session
  // 在退出登陆时，清除 original-href，确保下次进入的是控制台
  window.sessionStorage.removeItem('original-href')
}

/**
 * 缓存账户菜单信息
 *
 * @param {*} accountMenuList 账户菜单信息
 * @returns
 */
export const setAccountMenuList = (accountMenuList) => {
  return Peace.cache.sessionStorage.set(ACCOUNT_MENU_LIST, accountMenuList)
}
/**
 * 获取账户菜单信息（缓存）
 *
 * @returns
 */
export const getAccountMenuList = () => {
  return Peace.cache.sessionStorage.get(ACCOUNT_MENU_LIST)
}
/**
 * 清空账户菜单信息（缓存）
 *
 */
export const removeAccountMenuList = () => {
  Peace.cache.sessionStorage.remove(ACCOUNT_MENU_LIST)
}

/**
 * 清除站点缓存（缓存）
 *
 * @returns
 */
export const removeOriginalHref = () => {
  window.sessionStorage.removeItem('original-href')
}

/**
 * 是否已登录
 *
 */
export const isSignIn = () => {
  return !!getUserInfo() && !!getAccountMenuList()
}

export default {
  setUserInfo,
  getUserInfo,
  removeUserInfo,

  setUserToken,
  getUserToken,
  removeUserToken,

  setAccountMenuList,
  getAccountMenuList,
  removeAccountMenuList,

  isSignIn
}
