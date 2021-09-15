export default {
  /**
   * 获取HIS订单对账列表
   *
   * @param {*} params
   */
  getHisCheckList(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getHisCheckList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
