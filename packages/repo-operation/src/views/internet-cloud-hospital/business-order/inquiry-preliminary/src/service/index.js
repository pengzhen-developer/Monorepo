export default {
  /**
   * 获取诊疗记录列表
   *
   * @param {*} params inquiryNo
   * @returns {Object}
   */
  getFirstOptionList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getFirstOptionList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
