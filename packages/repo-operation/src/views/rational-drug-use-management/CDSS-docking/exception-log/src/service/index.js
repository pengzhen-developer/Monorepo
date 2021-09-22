export default {
  /**
   * 通用药品规则列表
   * @param params
   * @returns {*}
   */
  getExceptionList(params) {
    const isMock = false

    const apiPath = 'idic/cdss/exception/queryPage'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
