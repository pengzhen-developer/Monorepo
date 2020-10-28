export default {
  /**
   * 药店列表
   *
   * @param {*} params
   * @returns {Object}
   */
  AllBranchStore(params) {
    const isMock = false

    const apiPath = 'psd/DrugStore/AllBranchStoreByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改药方状态
   *
   * @param {*} params
   * @returns {Object}
   */
  changeStatus(params) {
    const isMock = false

    const apiPath = 'mds/openapi/webapi/api/Customer/GetDetailsByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 药房详情
   *
   * @param {*} params
   * @returns {Object}
   */
  detail(params) {
    const isMock = false

    const apiPath = 'webapi/api/Customer/GetDetailsByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 运营详情
   *
   * @param {*} params
   * @returns {Object}
   */
  operate(params) {
    const isMock = false

    const apiPath = 'mds/openapi/webapi/api/Customer/GetDetailsByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
