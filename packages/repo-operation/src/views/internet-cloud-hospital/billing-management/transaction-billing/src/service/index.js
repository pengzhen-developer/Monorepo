export default {
  /**
   * 获取交易账单列表
   *
   * @param {*} params i
   * @returns {Object}
   */
  getBillsList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/bills/lists'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取咨询订单详情
   *
   * @param {*} params inquiry_no
   * @returns {Object}
   */
  getAdvisoryInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/inquiryOrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
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
  }
}
