export default {
  /**
   * 获取途径配码列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/getPageMatchStatisticsCodeByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取途径配码管理列表
   *
   * @param {*} params
   */
  getManagementList(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取平台给药途径
   *
   * @param {*} params
   */
  getPlatFormList(params) {
    const isMock = false

    const apiPath = 'platformUseDrugRoute/matchPlatformUseDrugRoute'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 配码
   *
   * @param {*} params
   */
  matchCode(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/matchCodeOperation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 下一条
   *
   * @param {*} params
   */
  nextData(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/nextData'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
