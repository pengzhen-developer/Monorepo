import Peace from '@src/library'

export default {
  /**
   * 获取售后订单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrderCancelApplyList(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/Order/OrderCancelApplyList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取售后订单结果记录
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrderCancelRecord(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/Order/OrderCancelRecord'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'mds/openapi/psd/Order/GetOrderInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  exportFile(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/Excel/OOrderCancelAllField'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  }
}
