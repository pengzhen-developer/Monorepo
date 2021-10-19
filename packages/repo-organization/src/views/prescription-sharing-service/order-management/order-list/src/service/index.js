export default {
  /**
   * 获取订单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrderList(params) {
    const isMock = false

    const apiPath = 'psd/Order/OrderListByCust'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获处方详情
   * @param { string } prescribeId 处方编号
   * @returns { Object }
   */
  getPrescriptionDetail(params) {
    const isMock = false

    const apiPath = 'psd/Prescription/GetPrescriptionInfo'
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

  exportFile(params) {
    const isMock = false

    const apiPath = 'psd/Excel/OOrderAllFieldByCust'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  }
}
