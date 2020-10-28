export default {
  /**
   * 订单概览
   *
   * @param {*} params
   * @returns {Object}
   */
  GetOrderInformation(params) {
    const isMock = false

    const apiPath = 'psd/Order/GetOrderInformation'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 订单概览-导出
   *
   * @param {*} params
   * @returns {Object}
   */
  exportFile(params) {
    const isMock = false

    const apiPath = 'psd/Excel/OOrderInformation'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  }
}
