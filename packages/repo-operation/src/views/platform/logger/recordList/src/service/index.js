export default {
  /**
   * 获取日志列表
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'operate/Log/getLogList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
