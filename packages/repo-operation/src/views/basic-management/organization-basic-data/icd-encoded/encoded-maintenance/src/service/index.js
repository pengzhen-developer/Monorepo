export default {
  /**
   * 分页查询疾病（机构ICD10诊断表）统计信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getList(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/page/count'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis/page/count'
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
   * 新增疾病（机构ICD10诊断）
   *
   * @param {*} params
   * @returns {Object}
   */
  addOrgDiagnosis(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis'
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
  updateOrgDiagnosis(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis'
    const mockPath = 'http://devyapi.holoalpha.com/mock/363/orgDiagnosis'
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
