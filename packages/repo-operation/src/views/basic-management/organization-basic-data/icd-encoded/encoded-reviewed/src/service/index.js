export default {
  /**
   * ICD编码-配码审核列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getPageMatchCodeReviewByCondition(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/getPageMatchCodeReviewByCondition'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis/getPageMatchCodeReviewByCondition'
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
   * ICD编码-配码审核-审核管理-审核，修改
   *
   * @param {*} params
   * @returns {Object}
   */
  updateReviewStatus(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/updateReviewStatus'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis/updateReviewStatus'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * ICD编码-配码审核-审核记录
   *
   * @param {*} params
   * @returns {Object}
   */
  getPageByCondition(params) {
    const isMock = false

    const apiPath = 'ReviewLog/getPageByCondition'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/ReviewLog/getPageByCondition'
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
  }
}
