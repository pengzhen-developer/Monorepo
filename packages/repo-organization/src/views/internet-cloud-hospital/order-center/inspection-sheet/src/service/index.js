export default {
  /**
   * 获取检验单列表
   *
   * @param {*} params
   */
  getItemOrderList(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getItemOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取检验申请单详情
   *
   * @param {*} params
   */
  getItemOrderInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getItemOrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
