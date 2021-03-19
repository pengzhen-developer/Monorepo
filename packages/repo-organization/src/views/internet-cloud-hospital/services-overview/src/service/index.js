export default {
  /**
   * 获取服务概览数据
   *
   * @param {*} params
   */
  getServicesOverview(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/referralCountByStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
