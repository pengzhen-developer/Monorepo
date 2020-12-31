export default {
  /**
   * 订单流转失败列表
   *
   * @param {*} params
   * @returns {Object}
   */
  ErrorOrderListToOrder(params) {
    const isMock = false

    const apiPath = 'psd/Order/ErrorOrderListToOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 订单流转失败接口详情
   *
   * @param {*} params
   * @returns {Object}
   */
  ErrorOrderDetails(params) {
    const isMock = false

    const apiPath = 'psd/Order/ErrorOrderDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
