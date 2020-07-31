import Peace from '@src/library'

/** 用户信息常量 */
const USER_INFO = 'user_info'
const USER_CD_KEY = 'user_cd_key'
const ACCOUNT_MENU_LIST = 'account_menu_list'

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
 * 缓存账户菜单信息
 *
 * @param {*} accountMenuList 账户菜单信息
 * @returns
 */
export const setAccountMenuList = (accountMenuList) => {
  return Peace.cache.localStorage.set(ACCOUNT_MENU_LIST, accountMenuList)
}
/**
 * 获取账户菜单信息（缓存）
 *
 * @returns
 */
export const getAccountMenuList = () => {
  return Peace.cache.localStorage.get(ACCOUNT_MENU_LIST)
}
/**
 * 清空账户菜单信息（缓存）
 *
 */
export const removeAccountMenuList = () => {
  Peace.cache.localStorage.remove(ACCOUNT_MENU_LIST)
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
  Peace.cache.sessionStorage.clear()
  Peace.cache.localStorage.remove(USER_INFO)
  Peace.cache.localStorage.remove(USER_CD_KEY)
  Peace.cache.localStorage.remove(ACCOUNT_MENU_LIST)
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
  return $peace.$router.push({
    name: '/login',
    query: {
      referrer: referrer || $peace.$router.history.current.fullPath
    }
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
  getUserCDKey,
  removeUserCDKey,

  setAccountMenuList,
  getAccountMenuList,
  removeAccountMenuList,

  setUserCDKey,
  getUserInfo,
  removeUserInfo,
  isSignIn,

  replaceToLogin
}
