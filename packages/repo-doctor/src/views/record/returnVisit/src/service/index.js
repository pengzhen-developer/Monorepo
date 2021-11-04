export default {
  /**
   * 获取复诊续方列表
   *
   * @param {*} params
   */
  getReturnVisitList(params) {
    const isMock = false

    const apiPath = 'client/v1/inquiry/getReturnVisitList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取复诊续方详情
   *
   * @param {*} params
   */
  getReturnVisitDetail(params) {
    const isMock = false

    const apiPath = 'client/v1/inquiry/getReturnVisitDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * @description: 获取病历详情
   * @param {*} params
   * @return {*}
   */
  getCaseDetail(params) {
    const isMock = false

    const apiPath = 'ehospital/center/case/getDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {
      params,
      // TODO:
      // 聚合层不需要 token，移除所有 token
      // 更好的办法是兼容 token
      transformRequest: (data, headers) => {
        delete headers.token
        delete headers.accesstoken
      }
    })
  },

  getPrescriptionDetail(params) {
    const isMock = false

    const apiPath = 'ehospital/center/prescription/getDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {
      params,
      // TODO:
      // 聚合层不需要 token，移除所有 token
      // 更好的办法是兼容 token
      transformRequest: (data, headers) => {
        delete headers.token
        delete headers.accesstoken
      }
    })
  }
}
