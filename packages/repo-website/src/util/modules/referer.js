/** 站点常量 */
const REFERRER_SITE = 'referer_site'

/**
 * 缓存来源站点信息
 *
 * @param {*} setReferrer 来源站点信息
 * @returns
 */
export const setReferrer = (Referrer) => {
  return Peace.cache.sessionStorage.set(REFERRER_SITE, Referrer)
}

/**
 * 获取来源站点信息（缓存）
 *
 * @returns
 */
export const getReferrer = () => {
  return Peace.cache.sessionStorage.get(REFERRER_SITE)
}

/**
 * 清空来源站点信息（缓存）
 *
 */
export const removeReferrer = () => {
  return Peace.cache.sessionStorage.remove(REFERRER_SITE)
}

/**
 * 回到官网
 *
 * @param {string} [type=''] 回到官网打开方式
 * @returns
 */
export const redirectToReferer = (type = '_self') => {
  switch (type) {
    case '_self':
      window.location.href = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH
      break
    case 'login':
      window.location.href = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'login'
      break
    default:
      break
  }
}

export default {
  setReferrer,
  getReferrer,
  removeReferrer,

  redirectToReferer
}
