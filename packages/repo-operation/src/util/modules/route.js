/**
 * 重定向到登录页，并且记录当前页面地址
 * 配合 replaceToReffer
 * 请注意，此方法只记录 url 参数
 * 如需做更多自定义操作，请自行记录参数
 *
 * @param {string} [referer=''] 重定向地址
 * @returns
 */
export const replaceToLogin = (referer = '') => {
  const $router = $peace.$router

  return $router.push({
    name: 'login',
    query: {
      referer: referer || $router.history.current.fullPath
    }
  })
}

/**
 * 重定向到来源
 *
 * @returns
 */
export const replaceToReffer = () => {
  const $route = $peace.$route
  const $router = $peace.$router
  const reffer = $route?.query?.referer

  if (reffer) {
    return $router.replace(reffer)
  } else {
    return replaceToHome()
  }
}

/**
 * 重定向到首页
 *
 * @returns
 */
export const replaceToHome = () => {
  const $router = $peace.$router

  return $router.push({
    name: 'home'
  })
}

/**
 * 重定向到 root
 *
 * @returns
 */
export const replaceToRoot = () => {
  const $router = $peace.$router

  return $router.push({
    name: 'root'
  })
}

export default {
  replaceToLogin,
  replaceToReffer,
  replaceToHome,
  replaceToRoot
}
