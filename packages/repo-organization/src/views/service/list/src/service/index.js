import Peace from '@src/library'

export default {
  /**
   * 获取我的服务列表接口
   *
   * @param {*} params
   */
  getMyServiceList(params) {
    const isMock = false

    const apiPath = 'console/Service/getMyServiceList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
