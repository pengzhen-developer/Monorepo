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

export default {
  removeUserInfo
}
