/**
 * 回到官网
 *
 * @param {string} [type=''] 回到官网打开方式
 * @returns
 */
export const redirectToReferer = (type = '_self') => {
  switch (type) {
    case '_self':
      window.location.href = process.env.VUE_APP_SITE_OFFCIAL
      break
    case '_blank':
      window.open(process.env.VUE_APP_SITE_OFFCIAL)
      break
    case 'login':
      window.location.href = process.env.VUE_APP_SITE_OFFCIAL + process.env.VUE_APP_SITE_OFFCIAL_LOGIN
      break
    default:
      break
  }
}
export default {
  redirectToReferer
}
