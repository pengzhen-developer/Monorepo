/**
 * 回到首页
 *
 * @param {string} [type=''] 回到首页类型
 * @returns
 */
export const redirectToReferer = (type = 'home') => {
  switch (type) {
    case 'home':
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
  redirectToReferer
}
