export default {
  /**
   * 获取发起列表
   *
   * @param {*} params
   */
  getConsultLaunchList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Consult/getOutConsultList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取会诊详情
   *
   * @param {*} params
   */
  getConsultDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Consult/getConsultInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 会诊审核
   *
   * @param {*} params
   */
  examineConsultation(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Consult/auditConsult'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
