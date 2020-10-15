export default {
  /**
   * 发送验证码
   *
   * @param {*} params
   */
  sendSms(params) {
    const isMock = false

    const apiPath = 'client/v1/Login/sendSms'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 登录
   *
   * @param {*} params
   */
  login(params) {
    const isMock = false

    const apiPath = 'client/v1/Login/login'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
