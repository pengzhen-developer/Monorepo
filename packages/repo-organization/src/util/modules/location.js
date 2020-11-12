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
export const redirectToPath = async (URL, name = '_self', specs, replace) => {
  window.open(URL, name, specs, replace)

  if (name === '_self') {
    throw new Error('等待重定向.......')
  }
}

/**
 * 重定向到索引页
 *
 * '/' 路由
 *
 */
export const redirectToIndex = () => {
  const URL = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH

  redirectToPath(URL)
}

/**
 * 重定向到首页
 *
 * '/home' 路由
 */
export const redirectToHome = () => {
  const URL = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'home'

  redirectToPath(URL)
}

/**
 * 重定向到登录页
 *
 * '/login' 路由
 */
export const redirectToLogin = () => {
  const URL = process.env.VUE_APP_SITE_OFFCIAL + 'login'

  redirectToPath(URL)
}

/**
 * 重定向到登录页，并且标记清除信息
 *
 * '/login' 路由
 */
export const redirectToLoginAndClear = () => {
  const URL = process.env.VUE_APP_SITE_OFFCIAL + 'login?clear=true'

  redirectToPath(URL)
}

/**
 * 重定向到官网首页
 *
 * '/login' 路由
 */
export const redirectToWebSite = () => {
  const URL = process.env.VUE_APP_SITE_OFFCIAL

  redirectToPath(URL)
}

export default {
  redirectToPath,

  redirectToIndex,
  redirectToHome,
  redirectToLogin,
  redirectToWebSite,
  redirectToLoginAndClear
}
