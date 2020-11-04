/**
 * 重定向到 path
 *
 * @param {string} [referer=''] 重定向地址
 * @returns
 */
export const redirectToPath = (path) => {
  if (Peace.validate.isUrl(path)) {
    window.location.href = path
  }
}

/**
 * 重定向到索引页
 *
 * '/' 路由
 *
 */
export const redirectToIndex = () => {
  const indexPath = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH

  redirectToPath(indexPath)
}

/**
 * 重定向到首页
 *
 * '/home' 路由
 */
export const redirectToHome = () => {
  const indexPath = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'home'

  redirectToPath(indexPath)
}

/**
 * 重定向到登录页
 *
 * '/login' 路由
 */
export const redirectToLogin = () => {
  const indexPath = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'login'

  redirectToPath(indexPath)
}

export default {
  redirectToPath,

  redirectToIndex,
  redirectToHome,
  redirectToLogin
}
