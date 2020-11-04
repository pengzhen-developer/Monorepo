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

export default {
  removeUserInfo
}
