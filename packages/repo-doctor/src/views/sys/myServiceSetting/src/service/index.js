export default {
  /**
   * 获取服务信息
   *
   * @param {*} params
   */
  getServiceList(params) {
    const isMock = false

    const apiPath = 'client/v1/Doctorset/doctorServiceSetList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 设置医生是否开启图文和视频服务
   *
   * @param {*} params
   */
  setInquiryStatus(params) {
    const isMock = false

    const apiPath = 'client/v1/Doctorset/setInquiryStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 设置医生图文和视频服务的价格
   *
   * @param {*} params
   */
  setInquiryPrice(params) {
    const isMock = false

    const apiPath = 'client/v1/Doctorset/setInquiryPrice'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
