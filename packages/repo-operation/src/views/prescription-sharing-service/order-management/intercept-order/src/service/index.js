export default {
  /**
   * 获取拦截订单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getInterceptOrderList(params) {
    const isMock = false

    const apiPath = 'psd/Order/GetOrderInterceptQuery'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
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
  },

  /**
   * 获取拦截订单明细
   *
   * @param {*} params
   * @returns {Object}
   */
  getInterceptOrderDetails(params) {
    const isMock = false

    const apiPath = 'psd/Order/GetOrderInterceptDetails'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 同步订单
   *
   * @param {*} params
   * @returns {Object}
   */
  syncOrderSend(params) {
    const isMock = false

    const apiPath = 'psd/Order/SyncOrderSend'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
