/**
 * 重定向到来源站点或者首页
 *
 * @param {string} [referer=''] 重定向地址
 * @returns
 */
export const replaceToReferer = (referer) => {
  if (Peace.validate.isUrl(referer)) {
    window.location.href = referer
  } else {
    window.location.href = process.env.VUE_APP_RELEASE_FLODER_PATH
  }
}

export default {
  replaceToReferer
}
