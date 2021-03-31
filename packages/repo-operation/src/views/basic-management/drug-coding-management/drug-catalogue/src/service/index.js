export default {
  /**
   * 药品目录列表
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'psd/Hospital/DrugListInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取药品机构下拉
   * @param {*} params
   */
  getDrugCodeName(params) {
    const isMock = false

    const apiPath = 'psd/Hospital/GetDrugCodeName'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 上传导入药品模板
   * @param {*} params
   */

  uploadFiles(params) {
    const isMock = false
    const apiPath = 'psd/Excel/ImportExcelByDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 下载导出药品模板
   * @param {*} params
   */

  outputExcelByDrug(params) {
    const isMock = false
    const apiPath = 'psd/Excel/OutputExcelByDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  }
}
