import peace from '@src/library'

/**
 * 验证登录状态
 *
 * @returns
 */
const hasLogin = () => {
  return peace.cache.get(peace.type.USER.INFO)
}

export default {
  /** 验证登录状态 */
  hasLogin
}
