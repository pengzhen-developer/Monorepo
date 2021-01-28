export default {
  /**
   * 订单取消
   *
   * @param {*} params
   * @returns {Object}
   */
  ListCustomer(params) {
    const isMock = false

    const apiPath = 'psd/Cust/ListCustomer'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 支持申请订单取消接口
   *
   * @param {*} params
   * @returns {Object}
   */
  UpdateCust(params) {
    const isMock = false

    const apiPath = 'psd/Cust/UpdateCust'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
