import Peace from '@src/library'

/** 站点常量 */
const REFERER_SITE = 'referer_site'

/**
 * 缓存来源站点信息
 *
 * @param {*} setReferer 来源站点信息
 * @returns
 */
export const setReferer = (Referer) => {
  return Peace.cache.sessionStorage.set(REFERER_SITE, Referer)
}

/**
 * 获取来源站点信息（缓存）
 *
 * @returns
 */
export const getReferer = () => {
  return Peace.cache.sessionStorage.get(REFERER_SITE)
}

/**
 * 清空来源站点信息（缓存）
 *
 */
export const removeReferer = () => {
  return Peace.cache.sessionStorage.remove(REFERER_SITE)
}

/**
 * 重定向到来源站点或者首页
 *
 * @param {string} [referer=''] 重定向地址
 * @returns
 */
export const replaceToReferer = (referer = getReferer()) => {
  if (Peace.validate.isUrl(referer)) {
    window.location.href = referer
  } else {
    window.location.href = process.env.VUE_APP_RELEASE_FLODER_PATH
  }
}

export default {
  setReferer,
  getReferer,
  removeReferer,

  replaceToReferer
}
