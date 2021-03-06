export default {
  /**
   * 获取药房列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getStoreList(params) {
    const isMock = false

    const apiPath = 'psd/DrugStore/BranchStoreListByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取省市区
   *
   * @param {*} params
   */
  getRegion(params) {
    const isMock = false

    const apiPath = 'psd/Dict/AreaDictList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 上传凭证
   *
   * @param {*} params
   */
  uploadImage(formData) {
    const isMock = false

    const apiPath = 'psd/Upload/Image'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, formData).then((res) => {
      return res
    })
  },
  /**
   * 启用、停用
   *
   * @param {*} params
   * @returns {Object}
   */
  updateEnableStatus(params) {
    const isMock = false

    const apiPath = 'psd/Cust/UpdateEnableStatusByZYY'
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
  getDetails(params) {
    const isMock = false

    const apiPath = 'webapi/api/Customer/GetDetailsByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 保存药房
   *
   * @param {*} params
   * @returns {Object}
   */
  registerForProve(params) {
    const isMock = false

    const apiPath = 'webapi/api/Customer/RegisterForProveByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取药房运营信息
   *
   * @param {*} params
   * @returns {Object}
   */
  GetOperationInfoByZYY(params) {
    const isMock = false

    const apiPath = 'psd/Pharmacy/GetOperationInfoByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 保存药房运营信息
   *
   * @param {*} params
   * @returns {Object}
   */
  SaveOperationInfoByZYY(params) {
    const isMock = false

    const apiPath = 'psd/Pharmacy/SaveOperationInfoByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
