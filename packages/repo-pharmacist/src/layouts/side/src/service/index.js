export default {
  /**
   * 获取机构名称
   *
   * @param {*} params
   * @returns {Object}
   */
  getCustName(params) {
    const isMock = false

    const apiPath = 'webapi/api/Pharmacist/CustName'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取用户状态
   *
   * @param {*} params
   * @returns {Object}
   */
  getUserStatus() {
    const isMock = false

    const apiPath = 'admin/user/getUserStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 更新用户状态
   *
   * @param {*} params
   * @returns {Object}
   */
  updateUserStatus(params) {
    const isMock = false

    const apiPath = 'admin/user/updateUserStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 锁方
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  lockPrescription(params) {
    const isMock = false

    const apiPath = 'durprescription/v2/pharmacist/lockPrescription'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取处方审核声音状态
   *
   * @param {*} params
   * @returns {Object}
   */
  getVoiceRemind(params) {
    const isMock = false

    const apiPath = 'admin/voice/getVoiceStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 设置处方审核声音状态
   *
   * @param {*} params
   * @returns {Object}
   */
  setVoiceRemind(params) {
    const isMock = false

    const apiPath = 'admin/voice/updateVoice'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
