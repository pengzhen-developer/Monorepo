export default {
  /**
   * 获取机构列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'webapi/api/PrescriptionsTeam/CheckOptionHospitalList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取审方机构列表
   *
   * @param {*} params
   */
  getReviewList(params) {
    const isMock = false

    const apiPath = 'webapi/api/PrescriptionsTeam/CheckHospitalList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 得到审方团队
   *
   * @param {*} params
   */
  getTeamRelaction(params) {
    const isMock = false

    const apiPath = 'webapi/api/PrescriptionsTeam/GetCustomerTeamRelaction'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 保存审方团队配置
   *
   * @param {*} params
   */
  save(params) {
    const isMock = false

    const apiPath = 'webapi/api/PrescriptionsTeam/SavePrescriptionTeam'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
