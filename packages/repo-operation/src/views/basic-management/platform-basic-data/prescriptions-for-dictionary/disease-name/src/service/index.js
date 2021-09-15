export default {
  /**
   * 平台疾病信息
   *
   * @param {*} params
   * @returns {Object}
   */
  platformDiseasePage(params) {
    const isMock = false

    const apiPath = 'platformDisease/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增平台人群分类
   *
   * @param {*} params
   * @returns {Object}
   */
  addPlatformDisease(params) {
    const isMock = false

    const apiPath = 'platformDisease'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改平台人群分类
   *
   * @param {*} params
   * @returns {Object}
   */
  editPlatformDisease(params) {
    const isMock = false

    const apiPath = 'platformDisease'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取已关联疾病的诊断数据列表接口
   *
   * @param {*} params
   * @returns {Object}
   */
  getPlatformDiseaseDiagnosisList(params) {
    const isMock = false

    const apiPath = 'platformDisease/diagnosisList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 平台ICD10全部信息
   *
   * @param {*} params
   * @returns {Object}
   */
  platformDiagnosisRelationPage(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis/relationPage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 疾病关联诊断统计
   *
   * @param {*} params
   * @returns {Object}
   */
  getRelationCount(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis/getRelationCount'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 确认疾病关联诊断操作接口
   *
   * @param {*} params
   * @returns {Object}
   */
  checkRelation(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis/checkRelation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 确认疾病取消关联诊断操作接口
   *
   * @param {*} params
   * @returns {Object}
   */
  cancelRelation(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis/cancelRelation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
