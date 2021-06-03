export default {
  /**
   * 疾病名称-疾病配码
   *
   * @param {*} params
   * @returns {Object}
   */
  getPageMatchStatisticsCodeByCondition(params) {
    const isMock = false

    const apiPath = 'orgDisease/getPageMatchStatisticsCodeByCondition'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease/getPageMatchStatisticsCodeByCondition'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 分页获取机构疾病表
   *
   * @param {*} params
   * @returns {Object}
   */
  getListByOrganizationId(params) {
    const isMock = false

    const apiPath = 'orgDisease/page'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease/page'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 疾病名称-疾病配码-查询
   *
   * @param {*} params
   * @returns {Object}
   */
  matchPlatformDisease(params) {
    const isMock = false

    const apiPath = 'platformDisease/matchPlatformDisease'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/platformDisease/matchPlatformDisease'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 疾病名称-编码配码-配码-审核——跳过
   *
   * @param {*} params
   * @returns {Object}
   */
  nextData(params) {
    const isMock = false

    const apiPath = 'orgDisease/nextData'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease/nextData'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 疾病名称-编码配码-配码-保存，无法，重置
   *
   * @param {*} params
   * @returns {Object}
   */
  matchCodeOperation(params) {
    const isMock = false

    const apiPath = 'orgDisease/matchCodeOperation'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease/matchCodeOperation'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
