export default {
  /**
   * 从服务端获取数据
   *
   * @param {*} params
   */
  fetch(params) {
    const isMock = false

    const apiPath = 'fetch'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
