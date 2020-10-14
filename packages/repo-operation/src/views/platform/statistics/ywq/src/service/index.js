export default {
  /**
   * 医网签调用记录
   * @param {*} params
   */
  getLogListByYwq(params) {
    const isMock = false

    const apiPath = 'operate/Log/getLogListByYwq'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
