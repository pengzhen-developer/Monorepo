export default {
  /**
   * 相互作用规则列表
   * @param params
   * @returns {*}
   */
  getDdiRuleList(params) {
    const isMock = false

    const apiPath = 'quake/unionCheckPrescription/getDdiRuleList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 规则状态启用、禁用
   * @param params
   */
  changeStatus(params) {
    const isMock = false

    const apiPath = 'quake/unionCheckPrescription/updateDdiRuleStatusById'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取平台的成分列表
   * @param params
   */
  getPlatformDrugChemicalComposition(params) {
    const isMock = false
    const apiPath = 'idic/platformDrugChemicalComposition/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取平台的成分类别列表
   * @param params
   */
  getPlatformDrugAtc(params) {
    const isMock = false
    const apiPath = 'idic/platformDrugAtc/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增相互作用规则
   * @param params
   */
  addDdiRule(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/addDdiRule'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改相互作用规则
   * @param params
   */
  updateDdiRule(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/updateDdiRule'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 查看详情
   * @param params
   */
  getDdiRuleInfoById(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/getDdiRuleInfoById'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取日志
   * @param params
   * @returns {*}
   */
  getLog(params) {
    const isMock = false

    const apiPath = 'quake/log/getUnionInvokeLogById'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
