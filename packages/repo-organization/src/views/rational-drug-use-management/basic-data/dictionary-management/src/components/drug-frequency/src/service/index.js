export default {
  /**
   * 获取给药频次列表
   *
   * @param {*} params
   */
  DrugFrequencyPaging(params) {
    const isMock = false

    const apiPath = 'psd/CustDrug/DrugFrequencyPaging'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增给药频次
   *
   * @param {*} params
   */
  createDrugFrequency(params) {
    const isMock = false
    const apiPath = 'custdict/CustDrugAttr/createDrugFrequency'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
