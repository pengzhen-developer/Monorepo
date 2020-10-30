export default {
  /**
   * 获取药房列表
   *
   * @param {*} params
   * @returns {Object}
   */
  geDrugsCustomerList(params) {
    const isMock = false

    const apiPath = 'psd/DrugStore/DrugsCustomerList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取商品详情列表
   *
   * @param {*} params
   * @returns {Object}
   */
  GetGoodsDetails(params) {
    const isMock = false

    const apiPath = 'psd/Pharmacy/GetGoodsDetails'
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
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
