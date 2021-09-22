export default {
  /**
   * 重复用药规则列表
   * @param params
   * @returns {*}
   */
  getDupRuleList(params) {
    const isMock = false

    const apiPath = 'quake/unionCheckPrescription/getDupRuleList'
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

    const apiPath = 'quake/unionCheckPrescription/updateDupRuleStatusById'
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
   * 新增重复用药规则
   * @param params
   */
  addDupRule(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/addDupRule'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改重复用药规则
   * @param params
   */
  updateDupRule(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/updateDupRule'
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
  getDupRuleInfoById(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/getDupRuleInfoById'
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
