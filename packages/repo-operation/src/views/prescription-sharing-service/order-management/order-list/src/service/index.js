export default {
  /**
   * 获取订单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrderList(params) {
    const isMock = false

    const apiPath = 'psd/Order/OrderListByOperate'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获处方信息
   * @param { string } OrderId 订单号
   * @returns { Object }
   */
  GetPresByOrderId(params) {
    const isMock = false

    const apiPath = 'psd/Prescription/GetPresByOrderId'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
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
   * 获取发货信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getLogisticsInfo(params) {
    const isMock = false

    const apiPath = 'psd/Order/OrderShippingInformation'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  setOrderLogistics(params) {
    const isMock = false

    const apiPath = 'psd/Logistics/SetOrderLogistics'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  exportFile(params) {
    const isMock = false

    const apiPath = 'psd/Excel/OOrderAllField'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  },

  /**
   * 获取订单发货提醒信息详情
   */
  getByCode(params) {
    const isMock = false

    const apiPath = 'psd/Order/GetByCode'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 保存订单发货短信提醒信息
   */
  smsRemindSave(params) {
    const isMock = false

    const apiPath = 'psd/Order/SmsRemindSave'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
