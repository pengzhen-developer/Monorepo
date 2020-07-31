import Peace from '@src/library'

/** 站点常量 */
const REFERRER_SITE = 'referrer_site'

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
 * 重定向到来源站点或者首页
 *
 * @param {string} [referrer=''] 重定向地址
 * @returns
 */
export const replaceToReferrer = (referrer = getReferrer()) => {
  if (Peace.validate.isUrl(referrer)) {
    window.location.href = referrer
  } else {
    window.location.href = process.env.VUE_APP_RELEASE_FLODER_PATH
  }
}

export default {
  setReferrer,
  getReferrer,
  removeReferrer,

  replaceToReferrer
}
