export default {
  /**
   * 获取检验挂号订单列表
   *
   * @param {*} params
   */
  getRegisteringOrder(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getRegisteringOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 组套字典列表的二级科室
   *
   * @param {*} params
   */
  getDeptList() {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getDeptList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取检验挂号订单详情
   *
   * @param {*} params
   */
  getRegisteringOrderDetail(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getRegisteringOrderDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
