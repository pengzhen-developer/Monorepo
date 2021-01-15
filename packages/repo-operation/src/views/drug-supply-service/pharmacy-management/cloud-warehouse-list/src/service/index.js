export default {
  /**
   * 获取云仓列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getWarehouseList(params) {
    const isMock = false

    const apiPath = 'psd/DrugStore/cloudWarehouseList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取云仓详情
   *
   * @param {*} params
   * @returns {Object}
   */
  getDetail(params) {
    const isMock = false

    const apiPath = 'psd/CircConfig/GetCustIn3PartByOperate'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
