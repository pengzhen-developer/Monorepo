export default {
  /**
   * 获取待办事项统计
   *
   * @param {*} params
   */
  getDashboard(params) {
    const isMock = false

    const apiPath = 'client/v1/personalcenter/getDashboard'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, params).then((res) => {
      return res
    })
  }
}
