export default {
  /**
   * 获取药房库存接口
   *
   * @param {*} params
   * @returns {Object}
   */
  GetStockByDrugStoreId(params) {
    const isMock = false

    const apiPath = 'psd/DrugStock/GetStockByDrugStoreId'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取药店货仓字典
   *
   * @param {*} params
   * @returns {Object}
   */
  GetAllDrugStore() {
    const isMock = false

    const apiPath = 'psd/DrugStore/GetAllDrugStore'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  }
}
