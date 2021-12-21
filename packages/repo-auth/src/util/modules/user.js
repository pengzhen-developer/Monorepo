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
  return Peace.cache.sessionStorage.set(USER_CD_KEY, cdkey)
}
/**
 * 获取用户 cdkey
 *
 * @returns
 */
export const getUserCDKey = () => {
  return Peace.cache.sessionStorage.get(USER_CD_KEY)
}

/**
 * 清空用户 cdkey
 *
 */
export const removeUserCDKey = () => {
  return Peace.cache.sessionStorage.remove(USER_CD_KEY)
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
 * 缓存用户信息
 *
 * @param {*} userInfo 用户信息
 * @returns
 */
export const setUserInfo = (userInfo) => {
  return Peace.cache.sessionStorage.set(USER_INFO, userInfo)
}
/**
 * 获取用户信息（缓存）
 *
 * @returns
 */
export const getUserInfo = () => {
  return Peace.cache.sessionStorage.get(USER_INFO)?.user_info
}
/**
 * 获取全量用户信息（缓存）
 *
 * @returns
 */
export const getAllUserInfo = () => {
  return Peace.cache.sessionStorage.get(USER_INFO)
}
/**
 * 清空用户信息（缓存）
 *
 */
export const removeUserInfo = () => {
  // To be optimized
  // 一些业务需要持久化信息，例如登录账号等
  // 因此只需要清除用户相关信息，而非所有数据

  // 移除当前站点所有 localStorage 存储的数据
  // 移除当前站点所有 sessionStorage 存储的数据
  Peace.cache.localStorage.clear()
  Peace.cache.sessionStorage.clear()
}

/**
 * 重定向到登录页，并且记录当前页面地址
 * 请注意，此方法只记录 url 参数
 * 如需做更多自定义操作，请自行记录参数
 *
 * @param {string} [referer=''] 重定向地址
 * @returns
 */
export const replaceToLogin = (referer = '') => {
  return Peace.$router.push({
    name: '/login',
    query: {
      referer: referer || Peace.$router.history.current.fullPath
    }
  })
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
  getAllUserInfo,
  removeUserInfo,

  setUserCDKey,
  getUserCDKey,
  removeUserCDKey,

  setAccountMenuList,
  getAccountMenuList,
  removeAccountMenuList,

  isSignIn,

  replaceToLogin
}
