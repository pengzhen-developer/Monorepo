export default {
  /**
   * 获取药品包装信息列表
   *
   * @param {*} params
   */
  getDrugPackagingList(params) {
    const isMock = false

    const apiPath = 'psd/Cust/GetCustDrugList'
    const mockPath = process.env.VUE_APP_API_BASE + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 批量导入药品包装规格信息
   *
   * @param {*} params
   */
  ImportDrugPackagingInformation(params) {
    const isMock = false
    const apiPath = 'psd/Excel/ImportExcelByDrugSpecifications'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 下载导入错误信息
   *
   * @param {*} params
   */
  OutputExcelByDrugError(params) {
    const isMock = false

    const apiPath = 'psd/Excel/OutputExcelByDrugError'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  },
  /**
   * 查询单个包装规格信息
   *
   * @param {*} params
   */
  GetCustDrugByID(params) {
    const isMock = false
    const apiPath = 'psd/Cust/GetCustDrugByID'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改药品包装信息
   *
   * @param {*} params
   */
  updateDrugPackaging(params) {
    const isMock = false
    const apiPath = 'psd/Cust/SaveCustDrug'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
