export default {
  /**
   * 获取订单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrders(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Register/getOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
