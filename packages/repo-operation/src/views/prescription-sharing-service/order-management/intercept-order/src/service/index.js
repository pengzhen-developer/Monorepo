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
   * 拆单详情
   *
   * @param {*} params
   * @returns {Object}
   */
  splitOrderDetails(params) {
    const isMock = false

    const apiPath = 'psd/Order/SplitOrderDetails'
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

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 拆单日志
   *
   * @param {*} params
   * @returns {Object}
   */
  getSplitOrderLog(params) {
    const isMock = false

    const apiPath = 'psd/Order/GetSplitOrderLog'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 放弃流转
   *
   * @param {*} params
   * @returns {Object}
   */
  cancelCirculation(params) {
    const isMock = false

    const apiPath = 'psd/Order/CancelCirculation'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 导出
   *
   * @param {*} params
   * @returns {Object}
   */
  exportFile(params) {
    const isMock = false

    const apiPath = 'psd/Excel/OOrderIntercept'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  }
}
