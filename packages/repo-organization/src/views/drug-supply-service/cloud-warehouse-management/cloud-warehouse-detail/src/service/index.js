export default {
  /**
   * 获取云仓列表
   *
   * @param {*} params
   */
  getCloudList(params) {
    const isMock = false

    const apiPath = 'psd/DrugStore/custCloudWarehouseList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取云仓详情
   *
   * @param {*} params
   */
  getInfo(params) {
    const isMock = false

    const apiPath = 'psd/CircConfig/GetCustIn3PartByCust'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增云仓或机构开户信息
   *
   * @param {*} params
   */
  InsertCircconfig(params) {
    const isMock = false

    const apiPath = 'psd/CircConfig/Insert'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改机构开户信息
   *
   * @param {*} params
   */
  updateCircconfig(params) {
    const isMock = false

    const apiPath = 'psd/CircConfig/Update'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改云仓信息
   *
   * @param {*} params
   */
  updateWarehouseInfo(params) {
    const isMock = false

    const apiPath = 'psd/CircConfig/Update'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除云仓机构
   *
   * @param {*} params
   */
  deleteWarehouseOrg(params) {
    const isMock = false

    const apiPath = 'psd/CircConfig/Delete'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 加载机构下拉框
   *
   * @param {*} params
   */
  getCustlist() {
    const isMock = false

    const apiPath = 'psd/Cust/GetCodeNameByHome'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },

  /**
   * 修改云仓信息
   *
   * @param {*} params
   */
  saveInformedConsentInfo(params) {
    const isMock = false

    const apiPath = 'psd/CircConfig/SaveInformedConsentInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取商品列表
   *
   * @param {*} params
   */
  getGoodsList(params) {
    const isMock = false

    const apiPath = 'psd/Pharmacy/GetDrugStockListV2'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 商品上下架
   *
   * @param {*} params
   */
  updateGoodsStatus(params) {
    const isMock = false

    const apiPath = 'psd/DrugStock/OnShelvesV3'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
