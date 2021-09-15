export default {
  /**
   * 分页获取平台基药药品属性列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getPageBaseDrugProperties(params) {
    const isMock = false

    const apiPath = 'platformDrugBaseInfo/pageBaseDrugProperties'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改取平台基药药品属性
   *
   * @param {*} params
   * @returns {Object}
   */
  updateBaseDrugProperties(params) {
    const isMock = false

    const apiPath = 'platformDrugBaseInfo/updateBaseDrugProperties'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
