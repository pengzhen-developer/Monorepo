export default {
  /**
   * 发送验证码
   *
   * @param {*} params
   */
  sendCode(params) {
    params = {
      mobile: params.tel,
      clientId: process.env.VUE_APP_AUTH_CLIENT_ID
    }

    const isMock = false

    const apiPath = `admin/mobile`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_AUTH + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params })
  },

  /**
   * 重置密码
   *
   * @param {*} params
   */
  resetPwd(params) {
    const isMock = false

    const apiPath = 'hospital/Account/resetPwd'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取用户信息
   *
   * @param {*} params
   * @returns
   */
  getAccountInfo(params) {
    const isMock = false

    const apiPath = 'hospital/v070/Account/getAccountInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
