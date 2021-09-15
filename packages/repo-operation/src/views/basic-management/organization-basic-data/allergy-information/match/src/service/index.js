export default {
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
   * 获取人群分类配码统计
   *
   * @param {*} params
   * @returns {Object}
   */
  getAllergyInfoMatchStatistic(params) {
    const isMock = false
    const apiPath = 'orgAllergyInfo/getPageMatchStatisticsCodeByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取平台过敏信息
   *
   * @param {*} params
   * @returns {Object}
   */
  matchPlatformAllergyInfo(params) {
    const isMock = false
    const apiPath = 'platformAllergyInfo/matchPlatformAllergyInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 过敏信息-配码——跳过
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
   * 人群分类-配码——保存配吗、无法配码、重置配码
   *
   * @param {*} params
   * @returns {Object}
   */
  allergyInfoMatchCode(params) {
    const isMock = false
    const apiPath = 'orgAllergyInfo/matchCodeOperation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
