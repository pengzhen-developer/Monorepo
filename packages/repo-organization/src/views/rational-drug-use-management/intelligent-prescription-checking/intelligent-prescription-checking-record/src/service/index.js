export default {
  /**
   * 处方列表
   *
   * @param {*} params
   */
  PrescriptionList(params) {
    const isMock = false

    const apiPath = 'webapi/api/CustPrescription/SmartPrescriptionList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取科室列表
   *
   * @param {*} params
   */
  GetDepartment(params) {
    const isMock = false

    const apiPath = 'webapi/api/ApothecaryPrescription/GetDepartment'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 处方统计
   *
   * @param {*} params
   */
  PrescriptionStatistics(params) {
    const isMock = false

    const apiPath = 'webapi/api/CustPrescription/SmartPrescriptionStatistics'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
