export default {
  /**
   * 获取接单列表
   *
   * @param {*} params
   */
  getReceiveOrderList(params) {
    const isMock = false

    const apiPath = 'psd/ReceiveOrder/List'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取待处理数量
   *
   * @param {*} params
   */
  getBubbleInfo(params) {
    const isMock = false

    const apiPath = 'psd/ReceiveOrder/GetBubbleInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 更新订单信息
   *
   * @param {*} params
   */
  UpdateOrderStatus(params) {
    const isMock = false

    const apiPath = 'psd/ReceiveOrder/UpdateOrderStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 更新快递信息
   *
   * @param {*} params
   */
  UpdateOrderExpressInfo(params) {
    const isMock = false

    const apiPath = 'psd/ReceiveOrder/UpdateOrderExpressInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
