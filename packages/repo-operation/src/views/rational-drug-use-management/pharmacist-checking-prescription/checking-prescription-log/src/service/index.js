export default {
  /**
   * 调用日志列表
   *
   * @param {*} params
   */
  getInvokeLogs(params) {
    const isMock = false

    const apiPath = 'prescription/pharmaceutistLog/getLogs'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
