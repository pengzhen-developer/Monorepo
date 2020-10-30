export default {
  /**
   * 凭证分配列表
   * @param {*} params
   */
  getConfigureList(params) {
    const isMock = false

    const apiPath = 'zyy-psd/configure/list'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
