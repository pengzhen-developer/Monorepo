export default {
  /**
   * 获取用户基本信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getPersonBaseInfo(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/account/getPersonBaseInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改个人账户密码
   *
   * @param {*} params
   * @returns {Object}
   */
  modifyPass(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/account/modifyPass'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
