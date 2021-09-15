export default {
  /**
   * 机构下的用户数据统计
   * @param {*} params
   */
  getPatientListByOrg(params) {
    const apiPath = 'nethospital/operate/hospital/getPatientListByOrg'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取机构的用户列表信息
   * @param {*} params
   */
  getPatientInfoById(params) {
    const apiPath = 'nethospital/operate/hospital/getPatientInfoById'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 用户列表
   * @param {*} params
   */
  getPatientList(params) {
    const apiPath = 'nethospital/operate/hospital/getPatientList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取服务包详情
   * @param {*} params
   */
  getServiceDetailInfo(params) {
    const apiPath = 'nethospital/operate/servicepackage/recordServicePackageDetail'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.get(requestApi, { params })
  },
  /**
   * 获取用户服务包列表
   * @param {*} params
   */
  getServiceByfamily(params) {
    const apiPath = 'nethospital/operate/servicepackage/recordServicePackage'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取用户家人列表
   * @param {*} params
   */
  getFamilyList(params) {
    const apiPath = 'nethospital/operate/hospital/getfamilyList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取用户处方列表
   * @param {*} params
   */
  getPresList(params) {
    const apiPath = 'nethospital/operate/hospital/getPrescribePrescripList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取用户问诊列表
   * @param {*} params
   */
  getInquiryList(params) {
    const apiPath = 'nethospital/operate/hospital/getInquiryList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 导出
   *
   * @param {*} params
   * @returns {Object}
   */
  exportUserList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/exportPatientInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post')
  }
}
