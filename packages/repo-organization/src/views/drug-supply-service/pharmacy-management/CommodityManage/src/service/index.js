export default {
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
  },

  /**
   * 获取判断是不是系统对接
   *
   * @param {*} params
   */
  getServiceInfo(params) {
    params.custCode = Peace.cache.localStorage.get('user_info')?.custCode
    const isMock = false

    const apiPath = 'zyyconsole/external/service/getServiceInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 修改库存和价格
   *
   * @param {*} params
   */
  UpdateDrugStock(params) {
    const isMock = false

    const apiPath = 'psd/Pharmacy/UpdateDrugStock'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
