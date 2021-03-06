export default {
  /**
   * 获取机构列表
   *
   * @param {*} params
   */
  getOrgList(params) {
    const isMock = false

    const apiPath = 'audit/queryAuditInstitutionInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {params}).then((res) => {
      return res
    })
  },


  /**
   * 获取关联应用字典接口
   *
   */
  getApplicationDictionary() {
    const isMock = false

    const apiPath = 'audit/getChannelSource'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  }

}
