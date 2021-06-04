export default {
  /**
   * 获取机构人群
   *
   * @param {*} params
   * @returns {Object}
   */
  getHumanClassList(params) {
    const isMock = false

    const apiPath = 'orgHumanClass/page'
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
  getHumanClassMatchStatistic(params) {
    const isMock = false
    const apiPath = 'orgHumanClass/getPageMatchStatisticsCodeByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取平台人群分类
   *
   * @param {*} params
   * @returns {Object}
   */
  matchPlatformHumanClass(params) {
    const isMock = false
    const apiPath = 'platformHumanClass/matchPlatformHumanClass'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 人群分类-配码——跳过
   *
   * @param {*} params
   * @returns {Object}
   */
  humanClassNextData(params) {
    const isMock = false
    const apiPath = 'orgHumanClass/nextData'
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
  humanClassMatchCode(params) {
    const isMock = false
    const apiPath = 'orgHumanClass/matchCodeOperation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
