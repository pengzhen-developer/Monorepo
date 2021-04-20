export default {
  /**
   * 检查是否开通挂号
   *
   * @param {*} params
   */
  checkRegisterOpen(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/isOpenRegister'
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
  }
}
