export default {
  /**
   * 设置基础配置
   *
   * @param {*} params
   */
  setBaseConfig(params) {
    const isMock = false

    const apiPath = 'client/v1/doctorset/setBaseConfig'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取基础配置
   *
   * @param {*} params
   */
  getBaseConfig(params) {
    const isMock = false

    const apiPath = 'client/v1/doctorset/getBaseConfig'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
