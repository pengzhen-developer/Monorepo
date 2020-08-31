import Peace from '@src/library'

export default {
  /**
   * 药店审核列表
   *
   * @param {*} params
   * @returns {Object}
   */
  listForReview(params) {
    const isMock = false

    const apiPath = 'mds/openapi/webapi/api/PharmacyManage/ListForReviewByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'mds/openapi/webapi/api/Customer/Details'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'mds/openapi/webapi/api/Customer/UpdateExamineStatus'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
