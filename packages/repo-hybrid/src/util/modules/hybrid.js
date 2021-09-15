export const platformMap = {
  iOS: 'iOS',
  Android: 'Android',
  H5: 'H5',
  Wechat: 'Wechat',
  PC: 'PC'
}
export const platformAPIMap = {
  [platformMap['iOS']]: process.env.VUE_APP_BASE_API_IOS,
  [platformMap['Android']]: process.env.VUE_APP_BASE_API_ANDROID,
  [platformMap['PC']]: process.env.VUE_APP_BASE_API_PC,
  [platformMap['H5']]: process.env.VUE_APP_BASE_API_H5,
  [platformMap['Wechat']]: process.env.VUE_APP_BASE_API_WECHAT
}

export const ignorePlatFormRouteNameList = ['transferPage']

export default {
  /**
   * 输入平台 Map
   *
   */
  platformMap,

  /**
   * 输入平台 API Map
   *
   */
  platformAPIMap,

  /**
   * 忽略平台参数的Route Name 集合
   *
   */
  ignorePlatFormRouteNameList,

  /**
   * hybrid
   *
   * 获取 platform
   *
   * @returns
   */
  getPlatform() {
    // $peace  is global
    const platform = $peace?.$route?.params?.platform

    return platform
  },

  /**
   * hybrid
   *
   * 根据 platform 获取 uri 前缀
   *
   * @returns
   */
  getURIPrefix() {
    // $peace  is global
    const platform = $peace?.$route?.params?.platform

    const prefix = platformAPIMap[platform]

    return prefix
  },

  /**
   * hybrid
   *
   * 获取 token
   *
   * @returns
   */
  getURIToken() {
    // $peace  is global
    const token = $peace?.$route?.params?.token

    return token
  }
}
