import Peace from '@src/library'

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

  setUserCDKey,
  getUserInfo,
  removeUserInfo,
  isSignIn,

  replaceToLogin
}
