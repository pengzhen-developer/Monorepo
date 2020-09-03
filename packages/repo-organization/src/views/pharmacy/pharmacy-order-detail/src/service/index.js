import Peace from '@src/library'

export default {
  /**
   * 获取订单详情
   *
   * @param {*} params
   */
  getOrderInfo(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/ReceiveOrder/OrderInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
