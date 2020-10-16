export default {
  /**
   * 获取我的服务服务凭证列表
   *
   * @param {*} params
   */
  getMyCertificationList(params) {
    const isMock = false

    const apiPath = 'console/Service/getMyCertificationList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
