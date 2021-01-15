export default {
  /**
   * 获取日志管理列表
   *
   * @param {*} params
   * @returns {Object}
   */
  recordList(params) {
    const isMock = false

    const apiPath = 'admin/log/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
