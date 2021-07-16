export default {
  /**
   * 获取通用药品规则审核列表
   *
   * @param {*} params
   * @returns
   */
  get(params) {
    const isMock = false

    const apiPath = 'webapi/api/HospitalManage/List'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    // const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const serverPath = 'https://devdurservice.holoalpha.com/quake/departmentRule/getDepartmentRuleList'

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

    const apiPath = 'webapi/api/HospitalManage/List'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    // const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const serverPath = ' https://devdurservice.holoalpha.com/quake/departmentRule/getDepartmentTree'

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  getT(params) {
    const isMock = false

    const apiPath = 'webapi/api/HospitalManage/List'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    // const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const serverPath = ' https://devdurservice.holoalpha.com/quake/departmentRule/getDrugInfo'

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 保存药品规则
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
  }
}
