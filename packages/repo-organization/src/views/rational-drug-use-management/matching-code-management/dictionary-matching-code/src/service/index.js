export default {
  /**
   * 获取基础服务
   *
   * @param {*} params
   */
  getAccountDetailInfo(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/bank/getAccountDetailInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
