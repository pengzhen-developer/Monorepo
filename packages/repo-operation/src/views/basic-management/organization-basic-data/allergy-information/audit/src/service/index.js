export default {
  /**
   *分页查询机构过敏信息配码审核信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getAllergyInfoReviewByCondition(params) {
    const isMock = false

    const apiPath = 'orgAllergyInfo/getPageMatchCodeReviewByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取过敏信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getAllergyInfoList(params) {
    const isMock = false

    const apiPath = 'orgAllergyInfo/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改机构过敏信息审核状态
   *
   * @param {*} params
   * @returns {Object}
   */
  updateAllergyInfoReviewStatus(params) {
    const isMock = false

    const apiPath = 'orgAllergyInfo/updateReviewStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 过敏信息-审核——跳过
   *
   * @param {*} params
   * @returns {Object}
   */
  allergyInfoNextData(params) {
    const isMock = false
    const apiPath = 'orgAllergyInfo/nextData'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *配码审核记录
   *
   * @param {*} params
   * @returns {Object}
   */
  allergyInfoReviewLog(params) {
    const isMock = false
    const apiPath = 'ReviewLog/getPageByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
