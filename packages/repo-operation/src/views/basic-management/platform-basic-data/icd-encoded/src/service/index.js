export default {
  /**
   * 获取ICD编码列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增ICD编码
   *
   * @param {*} params
   */
  addData(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改ICD编码
   *
   * @param {*} params
   */
  modifyData(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取父级编码
   *
   * @param {*} params
   */
  getPatientList(word) {
    const isMock = false

    const apiPath = `platformDiagnosis/listDiagnosis?code=${word ?? ''}`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取ICD版本
   * @param params
   * @returns {*}
   */
  getIcdVersion(params) {
    const isMock = false

    const apiPath = 'idic/cdss/word/queryIcdVersion'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取平台配置的ICD版本详情
   * @param params
   * @returns {*}
   */
  getPlatIcdVersion() {
    const isMock = false

    const apiPath = 'idic/platformDiagnosis/getIcdVersion'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 平台ICD版本新增、修改
   * @param params
   * @returns {*}
   */
  updatePlatIcdVersion(params) {
    const isMock = false

    const apiPath = 'idic/platformDiagnosis/updateIcdVersion'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
