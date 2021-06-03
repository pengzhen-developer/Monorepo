export default {
  /**
   * 疾病名称-配码审核
   *
   * @param {*} params
   * @returns {Object}
   */
  getPageMatchStatisticsCodeByCondition(params) {
    const isMock = false

    const apiPath = 'orgDisease/getPageMatchCodeReviewByCondition'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease/getPageMatchCodeReviewByCondition'
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
   * 疾病名称-配码审核-审核管理-审核，修改
   *
   * @param {*} params
   * @returns {Object}
   */
  updateReviewStatus(params) {
    const isMock = false

    const apiPath = 'orgDisease/updateReviewStatus'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease/updateReviewStatus'
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
  }
}
