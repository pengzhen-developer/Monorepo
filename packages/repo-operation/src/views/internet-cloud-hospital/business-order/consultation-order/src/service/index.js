export default {
  /**
   * 获取会诊订单
   *
   * @param {*} params
   * @returns {Object}
   */
  getList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getConsultList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取会诊订单详情
   *
   * @param {*} params consultNo
   * @returns {Object}
   */
  getInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getConsultInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
