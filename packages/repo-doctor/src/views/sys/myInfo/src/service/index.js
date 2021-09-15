export default {
  /**
   * 修改手机号
   *
   * 获取验证码
   *
   * @param {*} params
   */
  getSmsCode(params) {
    const isMock = false

    const apiPath = 'client/v1/Personalcenter/getSmsCode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改手机号
   *
   * 验证验证码有效性
   *
   * @param {*} params
   */
  checkOldSmsCode(params) {
    const isMock = false

    const apiPath = 'client/v1/Personalcenter/checkOldSmsCode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改手机号
   *
   * @param {*} params
   */
  updateTel(params) {
    const isMock = false

    const apiPath = 'client/v1/Personalcenter/updateTel'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
