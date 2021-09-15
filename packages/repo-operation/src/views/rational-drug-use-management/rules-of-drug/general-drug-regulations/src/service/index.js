export default {
  /**
   * 通用药品规则列表
   * @param params
   * @returns {*}
   */
  getCustomRulesList(params) {
    const isMock = false

    const apiPath = 'quake/commonRule/pageCommonRule'
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

    const apiPath = 'quake/commonRule/getLog'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 保存规则
   * @param params
   *
   */
  saveRules(params) {
    const isMock = false

    const apiPath = 'quake/drugRules/saveRules'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
