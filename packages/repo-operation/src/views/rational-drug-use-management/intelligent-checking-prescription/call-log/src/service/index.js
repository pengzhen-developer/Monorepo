export default {
  /**
   * 调用日志列表
   *
   * @param {*} params
   */
  getInvokeLogs(params) {
    const isMock = false

    const apiPath = 'quake/log/getInvokeLogs'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取错误类型
   *
   * @param {*} params
   */
  getInvokeLogLevelDic() {
    const isMock = false

    const apiPath = 'quake/log/getInvokeLogLevelDic'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },

  /**
   * 查看详情
   *
   * @param {*} params
   */
  getInvokeLogById(params) {
    const isMock = false

    const apiPath = 'quake/log/getInvokeLogById'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取处方信息
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getPrescriptionInfo(params) {
    const isMock = false

    const apiPath = 'psd/Prescription/GetPrescriptionInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
