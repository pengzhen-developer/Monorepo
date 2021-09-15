export default {
  /**
   * 获取购药列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrderDrugList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Orderdrug/orderDrugList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取购药渠道
   *
   * @param {*} params
   * @returns {Object}
   */
  getChannel(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Orderdrug/getChannel'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取筛选条件数据
   *
   * @param {*} params
   * @returns {Object}
   */
  getCondition(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Orderdrug/getOrgInfos'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取购药订单
   *
   * @param {*} params orderNo
   * @returns {Object}
   */
  getPurchases(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Orderdrug/detail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取处方
   *
   * @param {*} params prescribeId
   * @returns {Object}
   */
  getPresInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getPrescripInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取原始处方
   *
   * @param {*} params
   * @returns {Object}
   */
  getPrescriptionImage(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/getPrescriptionImage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
