export default {
  /**
   * 检查是否开通复诊开药
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
   * 获取号源
   *
   * @param {*} params
   */
  getSource(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/bookingSourceList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取科室列表
   *
   * @param {*} params
   */
  getDeptList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/realDeptList'
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
  },
  /**
   * 加减号源
   *
   * @param {*} params
   */
  modifyBookingSourceNum(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/modifyBookingSourceNum'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
