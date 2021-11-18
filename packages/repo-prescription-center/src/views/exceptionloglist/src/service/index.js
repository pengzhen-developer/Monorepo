export default {
  /**
   * 日志列表
   *
   * @param {*} params
   */
  getLogList(params) {
    const isMock = false

    const apiPath = 'prescriptionCenter/getOperationLogList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取关联应用字典接口
   *
   */
  getLogDetail(params) {
    const isMock = false

    const apiPath = 'prescriptionCenter/getOperationLogDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
