/**
 * 回到首页
 *
 * @param {string} [type=''] 回到首页类型
 * @returns
 */
export const redirectToReferer = (type = 'home') => {
  switch (type) {
    case 'home':
      window.location.href = process.env.VUE_APP_SITE_OFFCIAL
      break
    case 'home&clear':
      window.location.href = process.env.VUE_APP_SITE_OFFCIAL + '?clear=true'
      break
    case 'login':
      window.location.href = process.env.VUE_APP_SITE_OFFCIAL + process.env.VUE_APP_SITE_OFFCIAL_LOGIN
      break
    case 'login&clear':
      window.location.href = process.env.VUE_APP_SITE_OFFCIAL + process.env.VUE_APP_SITE_OFFCIAL_LOGIN + '?clear=true'
      break
    default:
      window.location.href = process.env.VUE_APP_SITE_OFFCIAL
      break
  }
}
export default {
  redirectToReferer
}
