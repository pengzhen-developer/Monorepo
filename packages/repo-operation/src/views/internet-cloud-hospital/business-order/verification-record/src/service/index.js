export default {
  /**
   * 获取核销订单
   *
   * @param {*} params
   * @returns {Object}
   */
  writeRecordList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/writeRecordList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取咨询订单详情
   *
   * @param {*} params inquiry_no
   * @returns {Object}
   */
  writeRecordInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/writeRecordInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
