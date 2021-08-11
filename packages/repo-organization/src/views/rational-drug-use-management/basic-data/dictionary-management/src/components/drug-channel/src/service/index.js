export default {
  /**
   * 获取给药途径列表
   *
   * @param {*} params
   */
  DrugRoutePaging(params) {
    const isMock = false

    const apiPath = 'psd/CustDrug/DrugRoutePaging'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增给药途径列表
   *
   * @param {*} params
   */
  addDrugChannel(params) {
    const isMock = false
    const apiPath = 'custdict/CustDrugAttr/createDrugRoute'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
