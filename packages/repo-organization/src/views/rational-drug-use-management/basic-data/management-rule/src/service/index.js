export default {
  saveRules(params) {
    const isMock = false

    const apiPath = 'quake/manageRule/saveManageRule'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取管理规则列表
   * @param {*} params
   */
  getManageRuleList(params) {
    const isMock = false

    const apiPath = 'quake/manageRule/getManageRuleList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 新增管理规则
   * @param {*} params
   */
  addManageRuleBasicInfo(params) {
    const isMock = false

    const apiPath = 'quake/manageRule/addManageRule'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 编辑管理规则
   * @param {*} params
   */
  modifyManageRuleBasicInfo(params) {
    const isMock = false

    const apiPath = 'quake/manageRule/updateManageRuleBaseInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.patch(requestApi, params).then((res) => {
      return res
    })
  }
}
