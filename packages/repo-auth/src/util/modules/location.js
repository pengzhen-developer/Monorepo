/**
 * 重定向到 path
 *
 * @param {string} URL 可选。打开指定的页面的URL。如果没有指定URL，打开一个新的空白窗口
 * @param {string} type 可选。指定target属性或窗口的名称。支持以下值：
                              _blank - URL加载到一个新的窗口。这是默认
                              _parent - URL加载到父框架
                              _self - URL替换当前页面
                              _top - URL替换任何可加载的框架集
                              name - 窗口名称
 * @param {string} specs 可选。一个逗号分隔的项目列表。
 * @param {string} replace 可选。Optional.Specifies规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持下面的值：
                                true - URL 替换浏览历史中的当前条目。
                                false - URL 在浏览历史中创建新的条目。
 * @returns
 */
export const redirectToPath = (URL, name = '_self', specs, replace) => {
  window.open(URL, name, specs, replace)
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
