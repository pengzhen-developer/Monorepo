export default {
  /**
   * 分页获取机构疾病统计
   *
   * @param {*} params
   * @returns {Object}
   */
  getList(params) {
    const isMock = false

    const apiPath = 'orgDisease/count'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease/count'
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
   * 新增疾病（机构ICD10诊断）
   *
   * @param {*} params
   * @returns {Object}
   */
  addOrgDisease(params) {
    const isMock = false

    const apiPath = 'orgDisease'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改疾病（机构ICD10诊断）
   *
   * @param {*} params
   * @returns {Object}
   */
  updateOrgDisease(params) {
    const isMock = false

    const apiPath = 'orgDisease'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDisease'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
