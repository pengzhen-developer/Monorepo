export default {
  /**
   * 获取机构下已开通服务机构的列表
   *
   */
  getServiceConfig() {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/serviceList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取机构下已开通服务机构的列表
   *
   */
  setServiceConfig(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/changeOpen'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 排序开通服务接口
   *
   */
  sortServiceConfig(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/setting/setServiceSort'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
