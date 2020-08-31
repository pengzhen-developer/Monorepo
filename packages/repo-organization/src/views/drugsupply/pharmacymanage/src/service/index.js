import Peace from '@src/library'

export default {
  /**
   * 获取药房列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getStoreList(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/DrugStore/BranchStoreListByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'mds/openapi/psd/Dict/AreaDictList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'mds/openapi/psd/Upload/Image'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
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

    const apiPath = 'mds/openapi/psd/Cust/UpdateEnableStatusByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'mds/openapi/webapi/api/Customer/GetDetailsByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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

    const apiPath = 'mds/openapi/webapi/api/Customer/RegisterForProveByZYY'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
