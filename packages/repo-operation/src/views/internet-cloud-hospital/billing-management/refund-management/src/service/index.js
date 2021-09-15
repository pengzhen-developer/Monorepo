export default {
  /**
   * 退款列表
   *
   * @param {string} orderNo 问诊编号
   * @param {string} refundStatus 1退款中 | 2退款中 | 3退款异常 | 4退款关闭
   * @param {string} refundSource 1系统 | 2运营后台
   * @param {string} startTime 开始时间
   * @param {string} endTime 结束时间
   * @returns
   */
  refundList(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Refund/lists'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 退款详情
   *
   * @param {string} {orderNo}
   */
  refundDetail(orderNo) {
    const isMock = false
    const apiPath = 'nethospital/operate/Refund/detail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, { orderNo }).then((res) => {
      return res
    })
  },

  /**
   * 查询退款接口
   *
   * @param {string} {orderNo}
   */
  searchOrder(orderNo) {
    const isMock = false
    const apiPath = 'nethospital/operate/Refund/searchResult'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, { orderNo }).then((res) => {
      return res
    })
  },

  /**
   * 申请退款
   *
   * @param {string} orderNo 订单号
   * @param {number} again 0首次  1再次
   * @param {string} remark 备注
   * @returns
   */
  applyRefund(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Refund/apply'
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
