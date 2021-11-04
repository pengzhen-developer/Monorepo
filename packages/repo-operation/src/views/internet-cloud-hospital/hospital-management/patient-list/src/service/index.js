export default {
  /**
   *
   * @param {*} params
   */
  getFamilyInfo(params) {
    const apiPath = 'nethospital/operate/hospital/getFamilyInfo'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取问诊记录
   * @param {*} params
   */
  getInquiryInfo(params) {
    const apiPath = 'nethospital/operate/Order/getOneInquiry'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.get(requestApi, { params })
  },

  /**
   * @description: 获取处方详情
   * @param {*}
   * @return {*}
   */
  getPrescriptionDetail(params) {
    const isMock = false

    const apiPath = 'ehospital/center/prescription/getDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {
      params,
      // TODO:
      // 聚合层不需要 token，移除所有 token
      // 更好的办法是兼容 token
      transformRequest: (data, headers) => {
        delete headers.token
        delete headers.accesstoken
      }
    })
  },
  /**
   *
   * @param {*} params
   */
  getOneFamily(params) {
    const apiPath = 'nethospital/operate/hospital/getOneFamily'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  getInquiryByFamily(params) {
    const apiPath = 'nethospital/operate/hospital/getInquiryByFamily'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  getPrescriptionByfamily(params) {
    const apiPath = 'nethospital/operate/hospital/getPrescriptionByfamily'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取原始处方
   * @param {*} params
   */
  getPrescriptionImage(params) {
    const apiPath = 'nethospital/operate/order/getPrescriptionImage'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取会诊订单详情
   * @param {*} params
   */
  getInfo(params) {
    const apiPath = 'nethospital/operate/Order/getConsultInfo'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  }
}
