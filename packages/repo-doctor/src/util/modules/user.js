import peace from '@src/library'

/** 用户信息常量 */
const USER_INFO = 'userInfo'

/**
 * 获取用户信息（缓存）
 *
 * @returns
 */
export const getUserInfo = () => {
  return peace.cache.get(USER_INFO)
}

/**
 * 缓存用户信息
 *
 * @param {*} userInfo 用户信息
 * @returns
 */
export const setUserInfo = (userInfo) => {
  peace.cache.set(USER_INFO, userInfo)
}

/**
 * 清空用户信息（缓存）
 *
 */
export const removeUserInfo = () => {
  $peace.$store.commit('user/removeUserInfo')

  peace.cache.remove(USER_INFO)
}

/**
 * 重定向到登录页，并且记录当前页面地址
 * 配合 replaceToReffer
 * 请注意，此方法只记录 url 参数
 * 如需做更多自定义操作，请自行记录参数
 *
 * @param {string} [referrer=''] 重定向地址
 * @returns
 */
export const replaceToLogin = (referrer = '') => {
  const $router = $peace.$router

  return $router.push({
    name: '/login',
    query: {
      referrer: referrer || $router.history.current.fullPath
    },
    replace: true
  })
}

/**
 * 重定向到来源
 *
 * @returns
 */
export const replaceToReffer = () => {
  const $route = $peace.$route
  const $router = $peace.$router
  const reffer = $route?.query?.referrer

  if (reffer) {
    return $router.replace(reffer)
  } else {
    return replaceToHome()
  }
}

/**
 * 重定向到首页
 *
 * @returns
 */
export const replaceToHome = () => {
  const $router = $peace.$router

  return $router.push('/')
}

/**
 * 重定向到 root
 *
 * @returns
 */
export const replaceToRoot = () => {
  const $router = $peace.$router

  return $router.push({
    name: '/'
  })
}
/**
 * 是否已登录
 *
 */
export const isSignIn = () => {
  return !!peace.cache.get(USER_INFO)
}

export default {
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  isSignIn,

  replaceToLogin,
  replaceToReffer,
  replaceToHome,
  replaceToRoot
}
