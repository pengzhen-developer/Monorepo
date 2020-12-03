export default {
  /**
   * 获取更改手机验证码
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
   * 修改医生手机号接口
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
  },

  /**
   * 旧手机号验证码有效性验证接口
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
  }
}
