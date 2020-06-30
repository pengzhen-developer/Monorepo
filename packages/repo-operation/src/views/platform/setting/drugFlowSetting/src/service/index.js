import Peace from '@src/library'

export default {
  /**
   * 获取流向配置列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'operate/account/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
