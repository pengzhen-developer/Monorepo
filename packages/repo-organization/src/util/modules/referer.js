/**
 * 回到官网
 *
 * @param {string} [type=''] 回到官网打开方式
 * @returns
 */
export const redirectToReferer = (type = '_self') => {
  switch (type) {
    case '_self':
      window.location.href = process.env.VUE_APP_WEB_SITE
      break
    case '_blank':
      window.open(process.env.VUE_APP_WEB_SITE)
      break
    case 'login':
      window.location.href = process.env.VUE_APP_WEB_SITE + process.env.VUE_APP_WEB_SITE_LOGIN
      break
    default:
      break
  }
}
export default {
  redirectToReferer
}
