export default {
  /**
   * 获取服务包订单
   *
   * @param {*} params
   * @returns {Object}
   */
  getList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getServicePackageOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取机构下的二级科室列表接口
   *
   * @param {*} params
   * @returns {Object}
   */
  getDeptList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/getChildDeptByOrg'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取订单详情
   *
   * @param {*} params inquiry_no
   * @returns {Object}
   */
  getServicePackageOrderInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getServicePackageOrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取所有机构
   *
   * @param {*} params
   * @returns {Object}
   */
  getHosList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getHosList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 取消订单（同意退款、拒绝退款）
   *
   * @param {*} params
   * @returns {Object}
   */
  cancelOrder(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/cancelOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  exportFile(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/data/exportServicePackageOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, { params }, 'get').then((res) => {
      return res
    })
  }
}
