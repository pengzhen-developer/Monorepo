export default {
  /**
   * 药品规则列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false
    const apiPath = 'quake/DrugContent/getOrganDrugContentInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
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
