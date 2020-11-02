/**
 * 清空用户信息（缓存）
 *
 */
export const removeUserInfo = () => {
  // 移除认证信息
  Peace.identity.auth.removeAll()

  window.localStorage.clear()
  window.sessionStorage.clear()
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
  return $peace.$router.push({
    name: '/login',
    query: {
      referer: referer || $peace.$router.history.current.fullPath
    }
  })
}

export default {
  removeUserInfo,

  replaceToLogin
}
