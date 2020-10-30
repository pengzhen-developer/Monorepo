export default {
  /**
   * 药店审核列表
   *
   * @param {*} params
   * @returns {Object}
   */
  listForReview(params) {
    const isMock = false

    const apiPath = 'webapi/api/PharmacyManage/ListForReviewByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 审核药房详情
   *
   * @param {*} params
   * @returns {Object}
   */
  detail(params) {
    const isMock = false

    const apiPath = 'webapi/api/Customer/Details'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 药房审核
   *
   * @param {*} params
   * @returns {Object}
   */
  UpdateExamineStatus(params) {
    const isMock = false

    const apiPath = 'webapi/api/Customer/UpdateExamineStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
