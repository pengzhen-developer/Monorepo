export default {
  /**
   * 获取通用药品规则审核列表
   *
   * @param {*} params
   * @returns
   */
  get(params) {
    const isMock = false

    const apiPath = 'quake/departmentRule/getDepartmentRuleList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * @description: 获取科室树
   * @param {*} params
   * @return {*}
   */
  getDeptTree(params) {
    const isMock = false

    const apiPath = 'quake/departmentRule/getDepartmentTree'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  getT(params) {
    const isMock = false

    const apiPath = 'quake/departmentRule/getDrugInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 保存科室规则
   *
   * @param {*} params
   */
  saveRules(params) {
    const isMock = false
    const apiPath = 'quake/drugRules/saveRules'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除科室规则
   *
   * @param {*} params
   */
  deleteDepartmentRule(params) {
    const isMock = false
    const apiPath = 'quake/departmentRule/deleteDepartmentRule'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.delete(requestApi, { params }).then((res) => {
      return res
    })
  }
}
