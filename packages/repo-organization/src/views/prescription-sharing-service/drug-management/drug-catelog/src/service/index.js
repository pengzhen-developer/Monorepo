export default {
  /**
   * 获取药品目录列表接口
   *
   * @param {*} params
   */
  GetDrugListPaing(params) {
    const isMock = false
    const apiPath = 'psd/Hospital/DrugListPaging'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 保存药品数据
   *
   * @param {*} params
   */
  SaveDrugList(params) {
    const isMock = false
    const apiPath = 'psd/Hospital/SaveDrugList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 批量导入药品接口
   *
   * @param {*} params
   */
  ImportExcelByZYY(params) {
    const isMock = false
    const apiPath = 'psd/Excel/ImportExcelByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
