export default {
  /**
   * 获取科室
   *
   * @param {*} params
   * @returns {Object}
   */
  getDepartment(params) {
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
   * 获取机构
   *
   * @param {*} params
   * @returns {Object}
   */
  getCustomerTeamRelaction(params) {
    const isMock = false

    const apiPath = 'webapi/api/ApothecaryPrescription/GetCustomerTeamRelaction'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
