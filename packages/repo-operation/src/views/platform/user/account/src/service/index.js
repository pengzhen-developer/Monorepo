export default {
  /**
   * 获取账号管理列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/account/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 审核
   *
   * @param {*} params
   */
  doCheck(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/account/doCheck'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 更新账号状态
   *
   * @param {*} params
   */
  updateAccountStatus(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/Account/updateAccountStatus'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
