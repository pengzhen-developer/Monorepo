export default {
  /**
   * 获取日志列表
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/Log/getLogList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
