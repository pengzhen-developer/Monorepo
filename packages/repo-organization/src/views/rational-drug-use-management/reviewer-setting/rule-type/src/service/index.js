export default {
  /**
   * 获取规则类型详情
   *
   * @param {*} params
   * @returns {Object}
   */
  getBaseConfig() {
    const isMock = false

    const apiPath = 'quake/ruleCheckcConfig/getBaseConfig'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 基本规则开启、关闭
   *
   * @param {*} params
   * @returns {Object}
   */
  setRuleBaseConfig(params) {
    const isMock = false

    const apiPath = 'quake/ruleCheckcConfig/setRuleBaseConfig'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取药品审查规则项
   *
   * @param {*} params
   * @returns {Object}
   */
  getDrugRuleConfigDetails() {
    const isMock = false

    const apiPath = 'quake/ruleCheckcConfig/getDrugRuleConfigDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取管理规则审查项
   *
   * @param {*} params
   * @returns {Object}
   */
  getManagementRuleConfigDetails() {
    const isMock = false

    const apiPath = 'quake/ruleCheckcConfig/getManagementRuleConfigDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 药品审查规则设置
   *
   * @param {*} params
   * @returns {Object}
   */
  saveDrugRuleConfigDetails(params) {
    const isMock = false

    const apiPath = 'quake/ruleCheckcConfig/saveDrugRuleConfigDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 管理规则设置
   *
   * @param {*} params
   * @returns {Object}
   */
  saveManagementRuleConfigDetails(params) {
    const isMock = false

    const apiPath = 'quake/ruleCheckcConfig/saveManagementRuleConfigDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
