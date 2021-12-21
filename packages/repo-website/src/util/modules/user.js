/** 用户信息常量 */
const USER_INFO = 'user_info'

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
 * 是否已登录
 *
 */
export const isSignIn = () => {
  return !!Peace.cache.sessionStorage.get(USER_INFO)
}

export default {
  getUserInfo,
  setUserInfo,
  updateUserInfo,
  removeUserInfo,

  isSignIn
}
