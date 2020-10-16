export default {
  /**
   * 获取基础服务
   *
   * @param {*} params
   */
  getAccountDetailInfo(params) {
    const isMock = false

    const apiPath = 'console/bank/getAccountDetailInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
