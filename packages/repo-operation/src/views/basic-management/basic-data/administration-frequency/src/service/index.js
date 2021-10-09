export default {
  /**
   * 频次字典（平台）
   * @param params
   */
  getPlatformUseDrugFrequencyPage(params) {
    const isMock = false
    const apiPath = 'idic/platformUseDrugFrequency/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 给药频次新增和修改
   * @param params
   */
  addOrModifyDrugFrequency(params) {
    const isMock = false
    const apiPath = 'idic/platformUseDrugFrequency/addOrModifyDrugFrequency'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
