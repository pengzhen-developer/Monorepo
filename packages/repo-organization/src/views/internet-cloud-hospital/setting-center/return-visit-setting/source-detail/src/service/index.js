export default {
  /**
   * 检查是否开通复诊续方
   *
   * @param {*} params
   */
  checkReturnVisitOpen(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/checkReturnVisitIsOpen'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取号源信息
   *
   * @param {*} params
   */
  getSourceInfo(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/bookingSourceItemList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 更新号源状态
   *
   * @param {*} params
   */
  updateSourceStatus(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/updateItemState'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 批量更新号源
   *
   * @param {*} params
   */
  batchModifySource(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/batchModifyBookingState'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
