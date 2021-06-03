export default {
  /**
   * 获取途径配码审核列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/getPageMatchCodeReviewByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取审核管理列表
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
   * 记录
   *
   * @param {*} params
   */
  record(params) {
    const isMock = false

    const apiPath = 'ReviewLog/getPageByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 审核
   *
   * @param {*} params
   */
  audit(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/updateReviewStatus'
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
