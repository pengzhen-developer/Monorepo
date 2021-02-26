export default {
  /**
   * 获取咨询订单
   *
   * @param {*} params
   * @returns {Object}
   */
  getList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/inquiryOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
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
   * 获取所有机构
   *
   * @param {*} params
   * @returns {Object}
   */
  getAllHospitalList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Orderdrug/getAllHosList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取问诊记录
   *
   * @param {*} params inquiryNo
   * @returns {Object}
   */
  getInquiryInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getOneInquiry'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

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
