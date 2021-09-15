export default {
  /**
   * 我的服务包列表
   *
   * @param {*} params
   */
  getMyList(params) {
    const isMock = false

    const apiPath = 'client/v1/package/getMyList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 我的服务包详情
   *
   * @param {*} params
   */
  getDetail(params) {
    const isMock = false

    const apiPath = 'client/v1/package/getDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 服务包订单列表
   *
   * @param {*} params
   */
  getOrderList(params) {
    const isMock = false

    const apiPath = 'client/v1/package/getOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 服务包订单详情
   *
   * @param {*} params
   */
  getOrderDetail(params) {
    const isMock = false

    const apiPath = 'client/v1/package/getOrderDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
