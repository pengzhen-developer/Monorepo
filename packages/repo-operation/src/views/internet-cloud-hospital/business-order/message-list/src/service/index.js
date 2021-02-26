export default {
  /**
   * 获取病历
   *
   * @param {*} params inquiryNo
   * @returns {Object}
   */
  getRecordInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getCaseInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 检查单详情
   *
   * @param {*} params
   * @returns {Object}
   */
  getOrderDetail(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Checklist/getOrderDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取会诊订单详情
   *
   * @param {*} params consultNo
   * @returns {Object}
   */
  getInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getConsultInfo'
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
   * 获取转诊订单 referral_no
   *
   * @param {*} params
   * @returns {Object}
   */
  getReferralInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/referralOrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
