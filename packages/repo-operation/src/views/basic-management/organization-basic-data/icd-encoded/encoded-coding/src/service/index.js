export default {
  /**
   * ICD编码-编码配码列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getPageMatchStatisticsCodeByCondition(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/getPageMatchStatisticsCodeByCondition'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis/getPageMatchStatisticsCodeByCondition'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 分页获取机构ICD编码
   *
   * @param {*} params
   * @returns {Object}
   */
  getListByOrganizationId(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/page'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis/page'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * ICD编码-配码-查询
   *
   * @param {*} params
   * @returns {Object}
   */
  matchPlatformDiagnosis(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis/matchPlatformDiagnosis'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/platformDiagnosis/matchPlatformDiagnosis'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * ICD编码-配码-跳过
   *
   * @param {*} params
   * @returns {Object}
   */
  nextData(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/nextData'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis/nextData'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * ICD编码-配码-保存，无法，重置
   *
   * @param {*} params
   * @returns {Object}
   */
  matchCodeOperation(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/matchCodeOperation'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis/matchCodeOperation'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
