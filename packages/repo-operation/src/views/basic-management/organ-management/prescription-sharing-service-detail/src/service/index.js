export default {
  /**
   * 处方共享管理详情
   *
   * @param {*} params
   * @returns {Object}
   */
  HosConfigDatas(params) {
    const isMock = false

    const apiPath = 'psd/HosConf/HosConfigDatas'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
