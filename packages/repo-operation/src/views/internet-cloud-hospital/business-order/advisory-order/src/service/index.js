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
   * 筛选订单信息
   *
   * @param {*} params
   * @returns {Object}
   */
  checkOrder(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/data/isExistList'
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
  exportOrder(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/data/exportOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params).then((res) => {
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
  }
}
