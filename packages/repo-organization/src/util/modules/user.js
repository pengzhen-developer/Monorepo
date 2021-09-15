/** 用户信息常量 */
const USER_INFO = 'user_info'
const HOSPITAL_INFO = 'hospital_info'
const ACCOUNT_MENU_LIST = 'account_menu_list'

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
 * 清空用户信息（session 缓存）
 *
 * @returns
 */
export const removeSessionUserInfo = () => {
  Peace.cache.sessionStorage.clear()
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
 * 缓存互联网医院信息
 *
 * @param {*} hospitalInfo 互联网医院信息
 * @returns
 */
export const setHospitalInfo = (hospitalInfo) => {
  return Peace.cache.localStorage.set(HOSPITAL_INFO, hospitalInfo)
}

/**
 * 获取互联网医院信息（缓存）
 *
 * @returns
 */
export const getHospitalInfo = () => {
  return Peace.cache.localStorage.get(HOSPITAL_INFO)
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
  Peace.cache.sessionStorage.remove('original-href')
}

export default {
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  removeSessionUserInfo,

  setHospitalInfo,
  getHospitalInfo,

  setAccountMenuList,
  getAccountMenuList,
  removeAccountMenuList
}
