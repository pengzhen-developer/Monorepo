import Peace from '@src/library'

export default {
  /**
   * 发送验证码
   *
   * @param {*} params
   */
  sendCode(params) {
    const isMock = false

    const apiPath = 'hospital/Account/sendCode'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 重置密码
   *
   * @param {*} params
   */
  resetPwd(params) {
    const isMock = false

    const apiPath = 'hospital/Account/resetPwd'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 账号密码登录
   *
   * @param {*} params
   */
  doLogin(params) {
    const isMock = false

    const apiPath = 'hospital/Account/doLogin'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 手机号码 & 验证码登录
   *
   * @param {*} params
   * @returns
   */
  telLogin(params) {
    const isMock = false

    const apiPath = 'hospital/Account/telLogin'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'hospital/Account/getAccountInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
}
