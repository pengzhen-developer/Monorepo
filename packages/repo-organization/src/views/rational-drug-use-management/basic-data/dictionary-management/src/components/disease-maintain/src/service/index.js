export default {
  /**
   * 分页获取机构诊断表
   *
   * @param {*} params
   * @returns {Object}
   */
  getDiseaseList(params) {
    const isMock = false

    const apiPath = 'orgDisease/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
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
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
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
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
