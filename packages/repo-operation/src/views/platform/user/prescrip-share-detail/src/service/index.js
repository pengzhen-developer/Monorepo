export default {
  /**
   * 处方共享管理详情
   *
   * @param {*} params
   * @returns {Object}
   */
  HosConfigDatas(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/HosConf/HosConfigDatas'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
