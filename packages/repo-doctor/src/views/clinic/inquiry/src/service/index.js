export default {
  /**
   * 获取预约列表
   *
   * @param {*} params
   */
  getReservationList(params) {
    const isMock = false

    const apiPath = 'client/v1/returnvisit/getReservationList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 接诊
   *
   * @param {*} params
   */
  receiveInquiry(params) {
    const isMock = false

    const apiPath = 'client/v1/patient/receiveInquiry'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 结束
   *
   * @param {*} params
   */
  overInquiry(params) {
    const isMock = false

    const apiPath = 'client/v1/patient/overInquiry'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 退诊
   *
   * @param {*} params
   */
  quitInquiry(params) {
    const isMock = false

    const apiPath = 'client/v1/patient/quitInquiry'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 检查会话有效性
   *
   * @param {*} params
   */
  checkOverInquiry(params) {
    const isMock = false

    const apiPath = 'client/v1/patient/checkOverInquiry'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取病历详情
   *
   * @param {*} params
   */
  getCase(params) {
    const isMock = false

    const apiPath = 'client/v1/inquiry/getCase'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取健康档案
   *
   * @param {*} params
   */
  getOneHealth(params) {
    const isMock = false

    const apiPath = 'client/v1/health/getOneHealth'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
