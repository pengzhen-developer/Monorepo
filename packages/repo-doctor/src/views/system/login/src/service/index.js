export default {
  /**
   * 发送验证码
   *
   * @param {*} params
   */
  sendSms(params) {
    const isMock = false

    const apiPath = 'client/v1/Login/sendSms'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 登录
   *
   * 验证码登录
   *
   * @param {*} params
   */
  login(params) {
    const isMock = false

    const apiPath = 'client/v1/Login/login'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 登录
   *
   * 密码登录
   *
   * @param {*} params
   */
  loginByPass(params) {
    const isMock = false

    const apiPath = 'client/v1/Login/loginByPass'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改密码
   *
   * 获取验证码
   *
   * @param {*} params
   */
  getSmsCodeByChangePassowrd(params) {
    const isMock = false

    const apiPath = 'client/v1/Login/getSmsCode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改密码
   *
   * 验证验证码有效性
   *
   * @param {*} params
   */
  checkSmsCodeByChangePassowrd(params) {
    const isMock = false

    const apiPath = 'client/v1/login/checkSmsCode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改密码
   *
   * @param {*} params
   */
  updateModify(params) {
    const isMock = false

    const apiPath = 'client/v1/login/updateModify'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
