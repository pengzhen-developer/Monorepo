export default {
  /**
   * 获取基础服务
   *
   * @param {*} params
   */
  getAccountDetailInfo(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/bank/getAccountDetailInfo'
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
  changePwd(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/bank/modifyPass'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取短信
   *
   * @param {*} params
   */
  sendCode(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/bank/sendCode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 验证原始手机号的验证码接口
   *
   * @param {*} params
   */
  checkOldCode(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/bank/checkOldCode'
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
  changeModifyTel(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/bank/modifyTel'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
