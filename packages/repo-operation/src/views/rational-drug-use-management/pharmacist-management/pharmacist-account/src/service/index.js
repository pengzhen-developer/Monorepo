export default {
  /**
   * 获取药师账号
   *
   * @param {*} params
   * @returns {Object}
   */
  getPharmacistList(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/GetPharmacistList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取药师详情
   *
   * @param {*} params
   * @returns {Object}
   */
  getPharmacistInfoByID(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/GetPharmacistInfoByID'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
