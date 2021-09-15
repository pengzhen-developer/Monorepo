export default {
  /**
   * 获取退单列表
   *
   * @param {*} params
   */
  getOrderChargebackList(params) {
    const isMock = false

    const apiPath = 'psd/Order/OrderChargebackList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 同意/拒绝取消
   *
   * @param {*} params
   */
  HasWaitReceiveOrder(params) {
    const isMock = false

    const apiPath = 'psd/Order/IsAgreeCancel'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取订单详情
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrderInfo(params) {
    const isMock = false

    const apiPath = 'psd/Order/GetOrderInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
