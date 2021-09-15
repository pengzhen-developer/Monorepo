export default {
  /**
   * 获取服务开通列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/service/getList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/service/doCheck'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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
  getReason(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/service/getCheckInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
