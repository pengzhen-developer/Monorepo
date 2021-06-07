export default {
  /**
   * 平台人群分类列表
   *
   * @param {*} params
   * @returns {Object}
   */
  platformHumanClassPage(params) {
    const isMock = false

    const apiPath = 'platformHumanClass/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增平台人群分类
   *
   * @param {*} params
   * @returns {Object}
   */
  addPlatformHumanClass(params) {
    const isMock = false

    const apiPath = 'platformHumanClass'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改平台人群分类
   *
   * @param {*} params
   * @returns {Object}
   */
  editPlatformHumanClass(params) {
    const isMock = false

    const apiPath = 'platformHumanClass'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
