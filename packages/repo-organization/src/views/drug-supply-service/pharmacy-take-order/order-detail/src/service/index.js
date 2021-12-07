export default {
  /**
   * 获取订单详情
   *
   * @param {*} params
   */
  getOrderInfo(params) {
    const isMock = false

    const apiPath = 'psd/ReceiveOrder/OrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取物流详情
   *
   * @param {*} params
   */
  GQuery(params) {
    const isMock = false

    const apiPath = 'psd/Logistics/GQuery'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 取消订单
   *
   * @param {*} params
   */
  CancelOrderV2(params) {
    params.Operator = Peace.cache.localStorage.get('user_info')?.custCode
    const isMock = false

    const apiPath = 'psd/Order/CancelOrderV2'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
