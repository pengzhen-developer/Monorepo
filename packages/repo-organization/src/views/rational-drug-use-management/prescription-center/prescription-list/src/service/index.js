export default {
  /**
   * 处方列表
   *
   * @param {*} params
   */
  getPreList(params) {
    const isMock = false

    const apiPath = 'prescription/prescription/getPreList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 审方机构名称列表
   *
   * @param {*} params
   */
  GetCustomerTeamRelaction(params) {
    const isMock = false

    const apiPath = 'webapi/api/PrescriptionsTeam/GetCustomerTeamRelaction'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 审方药师
   *
   * @param {*} params
   */
  CustPharmacistDicts(params) {
    const isMock = false

    const apiPath = 'webapi/api/PrescriptionProject/CustPharmacistDicts'
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
   * 处方统计结果
   *
   * @param {*} params
   */
  getPreStatisticResults(params) {
    const isMock = false

    const apiPath = 'prescription/prescription/getPreStatisticResults'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
