import Peace from '@src/library'

export default {
  /**
   * 药店列表
   *
   * @param {*} params
   * @returns {Object}
   */
  AllBranchStore(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/DrugStore/AllBranchStoreByZYY'
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

    const apiPath = 'mds/openapi/webapi/api/Customer/GetDetailsByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
