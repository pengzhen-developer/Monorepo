export default {
  /**
   * 获取机构详情
   *
   * @param {*} params
   */
  getOrgDetail(params) {
    const isMock = false

    const apiPath = 'audit/queryAuditInstitutionDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {params}).then((res) => {
      return res
    })
  },

  /**
   * 审核机构
   *
   * @param {*} params
   */
  checkOrg(params) {
    const isMock = false

    const apiPath = 'audit/examineInstitution'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }


}
