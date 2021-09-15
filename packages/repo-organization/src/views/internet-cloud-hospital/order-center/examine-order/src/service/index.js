export default {
  /**
   * 获取检查单列表
   *
   * @param {*} params
   */
  getExamineOrderList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取检查单详情
   *
   * @param {*} params
   */
  getExamineDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getOrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
