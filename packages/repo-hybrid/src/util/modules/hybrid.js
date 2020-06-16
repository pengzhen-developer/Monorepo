export const platformMap = {
  iOS: 'iOS',
  Android: 'Android',
  H5: 'H5',
  Wechat: 'Wechat'
}
export const platformAPIMap = {
  [platformMap['iOS']]: 'webapp',
  [platformMap['Android']]: 'webapp',
  [platformMap['H5']]: 'h5',
  [platformMap['Wechat']]: 'Wechat'
}

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
